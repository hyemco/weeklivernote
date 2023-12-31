package com.ohyes.soolsool.gps.application;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ohyes.soolsool.gps.dto.GpsInfo;
import com.ohyes.soolsool.location.application.LocationService;
import com.ohyes.soolsool.location.dao.LocationRepository;
import com.ohyes.soolsool.location.domain.Location;
import com.ohyes.soolsool.location.dto.AlarmTime;
import com.ohyes.soolsool.location.dto.LocationRequestDto;
import com.ohyes.soolsool.user.domain.User;
import java.util.Collections;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Slf4j
@Service
@RequiredArgsConstructor
public class GpsService {

    @Value("${kakao.client-id}")
    private String API_KEY;
    private static final String API_URL = "https://dapi.kakao.com/v2/local/search/address.json?query=";
    private final LocationRepository locationRepository;
    private final LocationService locationService;

    // 주소에서 위도/경도 정보 조회 후 저장
    public GpsInfo getDestinationGpsInfo(Location location, String address, User user) {
        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));
        headers.set("Authorization", "KakaoAK " + API_KEY);

        HttpEntity<String> entity = new HttpEntity<>("body", headers);

        ResponseEntity<String> response = restTemplate.exchange(API_URL + address, HttpMethod.GET,
            entity, String.class);

        GpsInfo gpsInfo = GpsInfo.builder()
            .latitude(0)
            .longitude(0)
            .build();
        if (response.getStatusCode() == HttpStatus.OK) {
            try {
                ObjectMapper mapper = new ObjectMapper();
                JsonNode root = mapper.readTree(response.getBody());
                JsonNode documents = root.path("documents");

                double latitude = documents.get(0).path("road_address").path("y").asDouble();
                double longitude = documents.get(0).path("road_address").path("x").asDouble();

                location.setHomeLat(latitude);
                location.setHomeLong(longitude);

                locationRepository.save(location);
                log.info("[GPS] 사용자 주소지의 위도/경도가 저장되었습니다.");

                gpsInfo = GpsInfo.builder()
                    .latitude(latitude)
                    .longitude(longitude)
                    .build();

                // 유저의 현재 위치 정보 갱신 될 때 마다 막차 경로 조회 및 저장
                LocationRequestDto locationRequestDto = LocationRequestDto.builder()
                    .homeLat(latitude)
                    .homeLong(longitude)
                    .nowLat(user.getLocation().getNowLat())
                    .nowLong(user.getLocation().getNowLong())
                    .build();

                // 도착지 정보 변경시 막차 조회 다시 시작
                locationService.saveLastChance(locationRequestDto, user.getSocialId());
                return gpsInfo;

            } catch (Exception e) {
                log.error("Error: " + e.getMessage());
            }
        } else {
            log.error("Error: " + response.getStatusCode());
        }
        return gpsInfo;
    }

    // 유저의 현재 위치 정보 수정
    public AlarmTime addUserNowGpsInfo(User user, GpsInfo gpsInfo) throws Exception {
        Location location = user.getLocation();

        location.setNowLat(gpsInfo.getLatitude());
        location.setNowLong(gpsInfo.getLongitude());

        locationRepository.save(location);
        log.info("[GPS] 사용자의 현재 위치가 저장되었습니다.");

        // 유저의 현재 위치 정보 갱신 될 때 마다 막차 경로 조회 및 저장
        LocationRequestDto locationRequestDto = LocationRequestDto.builder()
            .homeLat(user.getLocation().getHomeLat())
            .homeLong(user.getLocation().getHomeLong())
            .nowLat(gpsInfo.getLatitude())
            .nowLong(gpsInfo.getLongitude())
            .build();

        // 막차 알림 시간 반환
        return locationService.saveLastChance(locationRequestDto, user.getSocialId());
    }
}
