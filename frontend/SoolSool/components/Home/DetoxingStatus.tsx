import { StyleSheet, View, Text } from "react-native";
import Wave from "./Wave";

interface DetoxingStatusProps {
  alcoholInGrams: number;
  requiredTimeForDetox: number;
  alcoholAt5: number;
  currentAlcohol: number;
}

const DetoxingStatus = ({
  alcoholInGrams,
  alcoholAt5,
  currentAlcohol,
  requiredTimeForDetox,
}: DetoxingStatusProps) => {
  let detoxingInProgress: number;

  if (alcoholInGrams + alcoholAt5 !== 0) {
    detoxingInProgress = (currentAlcohol / (alcoholInGrams + alcoholAt5)) * 100;
  } else {
    detoxingInProgress = 0;
  }

  return (
    <View style={styles.statusContainer}>
      <Text style={styles.titleContainer}>
        {currentAlcohol.toLocaleString()}g
      </Text>
      {currentAlcohol <= 0 ? (
        <Text style={styles.subtitleContainer}>
          <Text style={styles.periodContainer}>간 상태가 아주 깨끗해요!</Text>
        </Text>
      ) : (
        <Text style={styles.subtitleContainer}>
          해독까지{"  "}
          <Text style={styles.periodContainer}>
            {requiredTimeForDetox.toFixed(1)}
          </Text>
          시간
        </Text>
      )}

      <Wave size={200} progress={detoxingInProgress} />
    </View>
  );
};

const styles = StyleSheet.create({
  statusContainer: {
    width: "80%",
    marginTop: "15%",
    marginVertical: 24,
    padding: 4,
    display: "flex",
    alignItems: "center",
    gap: 10,
  },
  titleContainer: {
    fontSize: 40,
    fontFamily: "LineRegular",
    color: "white",
  },
  subtitleContainer: {
    fontSize: 20,
    fontFamily: "LineRegular",
    color: "white",
    marginBottom: 20,
  },
  periodContainer: {
    fontSize: 24,
    fontFamily: "LineRegular",
    color: "white",
  },
});

export default DetoxingStatus;
