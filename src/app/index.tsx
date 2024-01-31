import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { aNav } from "../redux/appState/thunkActions";
import { useDispatch } from "../redux";
import { useCallback } from "react";
import { AIPressable } from "../../src/components/AIPressable";
import { useSuperSelector } from "../util/customComparators";

export default function Home() {
  const dispatch = useDispatch();
  const rCurrentScreen = useSuperSelector((state) => state.AppReducer.rCurrentScreen);

  const aNavtoScreen1 = useCallback(() => {
    dispatch(aNav("/screen1"));
  }, [dispatch]);

  const aNavtoScreen2 = useCallback(() => {
    dispatch(aNav("/screen2"));
  }, [dispatch]);

  // const aNavtoScreen3 = () => {
  //   router.push("/screen3")
  // }
  // const aNavtoScreen4 = () => {
  //   router.push("/screen4")
  // }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.textWhite}>Home</Text>
      </View>
      <View style={styles.buttonContainer}>
        <AIPressable currentState={rCurrentScreen} accessible accessibilityLabel="login screen" style={styles.button} onPress={aNavtoScreen1}>
          <Text style={styles.text}>Go to login</Text>
        </AIPressable>
        <AIPressable currentState={rCurrentScreen} accessible accessibilityLabel="settings screen" style={styles.button} onPress={aNavtoScreen2}>
          <Text style={styles.text}>Go Settings</Text>
        </AIPressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: "#129340",
    borderRadius: 12,
    justifyContent: "center",
    marginHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: "row",
  },
  container: {
    alignItems: "center",
    flex: 1,
    marginHorizontal: 10,
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    margin: 10,
  },
  textContainer: {
    justifyContent: "center",
    marginBottom: 10,
    marginTop: 20,
  },
  textWhite: {
    color: "white",
    fontSize: 36,
    fontWeight: "bold",
  },
});
