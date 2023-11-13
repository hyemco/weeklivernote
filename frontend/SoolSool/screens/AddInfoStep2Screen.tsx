import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-paper";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import DotIndicator from "../components/AddInfo/DotIndicator ";
import Toast from "react-native-root-toast";

function AddInfoStep2Screen({ navigation, route }) {
  const { height, weight, gender, socialId } = route.params;

  // console.log("!키:", height);
  // console.log("!몸무게:", weight);
  // console.log("!성별:", gender);

  const [selectedAddress, setSelectedAddress] = useState("address");

  const autoCompleteHandler = (data, details = null) => {
    // data는 검색결과에 대한 간략한 정보
    // details는 검색결과에 대한 자세한 값 예) 평점, 사진, 주소 등등
    // console.log("여기뭐가들어오는거지", data, details);
    // 실행할 함수
    // ex) setPlace(data.블라블라)
  };

  const goToNextStep = () => {
    if (selectedAddress) {
      navigation.navigate("AddInfoStep3", {
        address: selectedAddress,
        height: height,
        weight: weight,
        gender: gender,
        socialId: socialId,
      });
    } else {
      alert("주소를 선택해주세요");
    }
  };

  const goToPreviousStep = () => {
    navigation.navigate("AddInfo");
  };
  console.log("내 구글 api key...", process.env.GOOGLE_API_KEY);

  // useEffect(() => {
  // console.log("주소가들어오나?", selectedAddress);
  // }, [selectedAddress]);

  return (
    <View style={styles.mainContainer}>
      <DotIndicator activeIndex={2} />
      <View style={styles.nextTime}>
        <Text style={styles.text}>추후 주소 정보를 입력 받습니다.</Text>
        <Text style={styles.text}>현재는 Next를 눌러</Text>
        <Text style={styles.text}>다음 단계로 이동해주세요.</Text>
      </View>
      {/* <PlacesInput
        googleApiKey={process.env.GOOGLE_API_KEY}
        onSelect={(address) => setSelectedAddress(address)}
        placeholder="주소 검색"
      /> */}
      {/* <GooglePlacesAutocomplete
        placeholder="여기에 주소를 검색하세요"
        minLength={2}
        keyboardShouldPersistTaps={"handled"}
        fetchDetails={true}
        onPress={autoCompleteHandler}
        onFail={(error) => console.log(error)}
        onNotFound={() => console.log("no results")}
        keepResultsAfterBlur={true}
        query={{
          key: process.env.GOOGLE_API_KEY,
          language: "ko",
          components: "country:kr",
        }}
        enablePoweredByContainer={false}
        styles={{
          textInputContainer: {
            // backgroundColor: "red",
            flexDirection: "row",
          },
          textInput: {
            backgroundColor: "lightblue",
            borderRadius: 50,
            height: 44,
            fontSize: 16,
            paddingVertical: 9,
            paddingHorizontal: 12,
          },
          predefinedPlacesDescription: {
            color: "#1faadb",
          },
          listView: {
            backgroundColor: "lightblue",
            borderRadius: 10,
            paddingHorizontal: 10,
            elevation: 8,
            shadowColor: "#6164BB",
          },
          row: {
            paddingVertical: 20,
          },
          separator: {
            height: 2,
            backgroundColor: "red",
          },
          description: {
            fontSize: 15,
          },
          loader: {
            flexDirection: "row",
            justifyContent: "flex-end",
            height: 20,
          },
        }}
      /> */}
      <View style={styles.buttonContainer}>
        <Button
          mode="outlined"
          // buttonColor={"#363C4B"}
          onPress={goToPreviousStep}
        >
          Previous
        </Button>
        <Button mode="contained" buttonColor={"#363C4B"} onPress={goToNextStep}>
          Next
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    justifyContent: "space-between",
    width: "90%",
    paddingBottom: 20,
    marginRight: "auto",
    marginLeft: "auto",
  },
  text: {
    fontSize: 20,
    // fontFamily: "LineRegular",
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 5,
  },
  nextTime: {
    display: "flex",
    alignItems: "center",
    // textAlign: "center",
  },
});

export default AddInfoStep2Screen;