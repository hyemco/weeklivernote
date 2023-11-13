import { Text, View, StyleSheet, Alert } from "react-native";
import { Button, HelperText, TextInput } from "react-native-paper";
import React, { useState, useEffect } from "react";

function BodyDetail({ navigation, gender, socialId }) {
  const [height, setHeight] = React.useState(null);
  const [weight, setWeight] = React.useState(null);

  const goToNextStep = () => {
    if (gender && weight && height) {
      // gender가 null이 아니면 다음 단계로 이동
      if (weight < 30 || weight > 200 || height < 120 || height > 220) {
        Alert.alert("알림", "체중 및 신장 데이터가 적합하지 않습니다.");
      } else {
        navigation.navigate("AddInfoStep2", {
          height: parseInt(height),
          weight: parseInt(weight),
          gender: gender,
          socialId: socialId,
        });
      }
    } else {
      Alert.alert("알림", "모든 항목을 선택해주세요.");
    }
  };

  const hasWeightErrors = () => {
    // console.log("durl", parseInt(weight));
    return parseInt(weight) < 30;
  };

  const hasHeightErrors = () => {
    // console.log("durl", parseInt(weight));
    return parseInt(height) < 110;
  };

  useEffect(() => {
    console.log("체중", weight);
    console.log("신장", height);
  }, [weight, height]);

  return (
    <View style={styles.mainContainer}>
      <View style={styles.subContainer}>
        <View style={styles.contentContainer}>
          <Text>체중</Text>
          <View style={styles.rowContainer}>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={weight}
              onChangeText={(value) => setWeight(value)}
            />
            <Text>kg</Text>
          </View>
          <HelperText type="error" visible={hasWeightErrors()}>
            올바른 숫자를 입력해주세요
          </HelperText>
          {/* <ProgressBar
            progress={weightProgress}
            style={styles.progressBar}
            color="#007aff"
          /> */}
        </View>
        <View style={styles.contentContainer}>
          <Text>신장</Text>
          <View style={styles.rowContainer}>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={height}
              onChangeText={(value) => setHeight(value)}
            />
            <Text>cm</Text>
            {/* <ProgressBar
            progress={heightProgress}
            style={styles.progressBar}
            color="#007aff"
          /> */}
          </View>
          <HelperText type="error" visible={hasHeightErrors()}>
            올바른 숫자를 입력해주세요
          </HelperText>
        </View>
      </View>
      <Button mode="contained" buttonColor={"#363C4B"} onPress={goToNextStep}>
        Next
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    // backgroundColor: "#FFFF",
    flexDirection: "column",
    gap: 15,
    borderRadius: 20,
  },
  text: {
    fontSize: 20,
    fontFamily: "LineRegular",
  },
  input: {
    height: 40,
    backgroundColor: "#DBEBF5",
    // borderColor: "gray",
    // borderWidth: 1,
    width: "70%",
    marginBottom: 10,
  },
  progressBar: {},
  subContainer: {
    display: "flex",
    flexDirection: "row",
    // borderWidth: 1,
    // borderColor: "green",
    justifyContent: "space-between",
  },
  contentContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
    width: "48%",
  },
  rowContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
});

export default BodyDetail;