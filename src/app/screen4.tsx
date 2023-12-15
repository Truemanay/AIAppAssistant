import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { submitData } from "../functions";
import { router } from "expo-router";

export default function Screen4() {
  const pressArray: Array<{ buttonName: string; buttonFunc: string }> = [];

  const onPress = ({ buttonName, buttonFunc }: { buttonName: string; buttonFunc: string }) => {
    pressArray.push({ buttonFunc, buttonName });
  };

  const aBack = () => {
    router.back();
  };

  const onSubmit = () => {
    submitData(pressArray);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ height: 50, justifyContent: "center" }}>
        <Text style={styles.text}>Screen 4</Text>
      </View>
      <View style={styles.innerContainer}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              aBack();
            }}
          >
            <Text style={styles.text}>Back</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            alignItems: "center",
            flex: 1,
            justifyContent: "space-evenly",
          }}
        >
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              onPress({
                buttonFunc:
                  "Enhances the range and clarity of voice commands for virtual assistants in noisy or spacious environments.",
                buttonName: "6",
              });
            }}
          >
            <Text style={styles.text}>Push Me6</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          onSubmit();
        }}
      >
        <Text style={styles.text}>submit</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: "#129340",
    borderRadius: 12,
    height: 100,
    justifyContent: "center",
    width: 150,
  },
  buttonContainer: {
    alignItems: "center",
    flex: 1,
    justifyContent: "space-evenly",
  },
  container: {
    alignItems: "center",
    backgroundColor: "#125",
    flex: 1,
    justifyContent: "center",
  },
  innerContainer: {
    flex: 1,
    flexDirection: "row",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
