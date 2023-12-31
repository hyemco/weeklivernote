package com.ohyes.soolsool.user.domain;

import com.ohyes.soolsool.drink.domain.Category;
import com.ohyes.soolsool.drink.domain.Diary;
import com.ohyes.soolsool.location.domain.Location;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;


@Getter
@Setter
@ToString
@NoArgsConstructor
@EntityListeners(AuditingEntityListener.class)
@Entity
public class User {

    @Id
    @Column(name = "social_id")
    private String socialId;

    @Column(name = "nickname")
    private String nickname;

    @Column(name = "profile_img")
    private String profileImg;

    @Column(name = "custom_profile_img")
    private String customProfileImg;

    @Column(name = "address")
    private String address;

    @Column(name = "gender")
    private String gender;

    @Column(name = "height")
    private int height;

    @Column(name = "weight")
    private int weight;

    @Column(name = "alcohol_limit")
    private float alcoholLimit;

    @Column(name = "drink_category")
    private String drinkCategory;

    @Column(name = "drink_unit")
    private String drinkUnit;

    @Column(name = "drink_amount")
    private float drinkAmount;

    @Column(name = "refresh_token")
    private String refreshToken;

    @Column(name = "max_nonalcohol_period")
    private int maxNonalcoholPeriod;

    @Column(name = "start_nonalcohol_date")
    private LocalDate startNonalcoholDate;

    @Column(name = "today_blood_alcohol", columnDefinition = "float default 0.0")
    private float todayBloodAlcohol;

    @Column(name = "today_liver_alcohol", columnDefinition = "float default 0.0")
    private float todayLiverAlcohol;

    @CreatedDate
    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @LastModifiedDate
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    // 연관 관계
    @ManyToOne
    @JoinColumn(name = "category_pk")
    private Category category;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Diary> diaries = new ArrayList<>();

    @OneToOne(cascade = CascadeType.REMOVE, orphanRemoval = true)
    @JoinColumn(name = "location_pk")
    private Location location;

    // 생성자
    @Builder
    public User(String socialId, Category category, String nickname, String profileImg,
        String customProfileImg, String address, String gender, int height, int weight,
        float alcoholLimit, String refreshToken, int maxNonalcoholPeriod,
        LocalDate startNonalcoholDate, float todayBloodAlcohol, float todayLiverAlcohol) {
        this.socialId = socialId;
        this.category = category;
        this.nickname = nickname;
        this.profileImg = profileImg;
        this.customProfileImg = customProfileImg;
        this.address = address;
        this.gender = gender;
        this.height = height;
        this.weight = weight;
        this.alcoholLimit = alcoholLimit;
        this.refreshToken = refreshToken;
        this.maxNonalcoholPeriod = maxNonalcoholPeriod;
        this.startNonalcoholDate = startNonalcoholDate;
        this.todayBloodAlcohol = todayBloodAlcohol;
        this.todayLiverAlcohol = todayLiverAlcohol;
    }

    public void updateRefreshToken(String updateRefreshToken) {
        this.refreshToken = updateRefreshToken;
    }
}
