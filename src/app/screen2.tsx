import { SafeAreaView, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch } from "../redux";
import { useSuperSelector } from "../util/customComparators";
import { AIPressable } from "../components/AIPressable";

export default function Screen2() {
  const [name, setName] = useState("");
  const aNameRef = useRef<TextInput>(null);
  const aPasswordRef = useRef<TextInput>(null);
  const [password, setPassword] = useState("");
  const rName = useSuperSelector((state) => state.AppReducer.rName);
  const rPassword = useSuperSelector((state) => state.AppReducer.rPassword);
  const rFocusPassword = useSuperSelector((state) => state.AppReducer.rFocusPassword);
  const rFocusName = useSuperSelector((state) => state.AppReducer.rFocusName);
  const dispatch = useDispatch();

  const _changeName = useCallback(() => {
    dispatch({ rName: name, type: "SET_APP_STATE" });
  }, [dispatch, name]);

  const _changePassword = useCallback(() => {
    dispatch({ rPassword: password, type: "SET_APP_STATE" });
  }, [dispatch, password]);

  useEffect(() => {
    if (rFocusName && aNameRef.current) {
      aNameRef.current.focus();
    }
    if (rFocusPassword && aPasswordRef.current) {
      aPasswordRef.current.focus();
    }
  }, [rFocusName, rFocusPassword]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.textWhite}>Settings</Text>
      </View>
      <View style={styles.innerContainer2}>
        <Text style={styles.text}>{`Name:`}</Text>
        <TextInput placeholder={rName} ref={aNameRef} onChangeText={setName} style={styles.textInput} />
        <AIPressable accessible accessibilityLabel="Change username" style={styles.button} onPress={_changeName}>
          <Text style={styles.text2}>Edit</Text>
        </AIPressable>
      </View>
      <View style={styles.innerContainer2}>
        <Text style={styles.text}>{`Password: `}</Text>
        <TextInput placeholder={rPassword} ref={aPasswordRef} style={styles.textInput} onChangeText={setPassword} />
        <AIPressable accessible accessibilityLabel="Change password" style={styles.button} onPress={_changePassword}>
          <Text style={styles.text2}>Edit</Text>
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
  },
  container: {
    flex: 1,
    marginHorizontal: 10,
  },
  innerContainer2: {
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 10,
  },
  text: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
  text2: {
    fontSize: 16,
    margin: 10,
  },
  textContainer: {
    justifyContent: "center",
    marginBottom: 10,
    marginTop: 20,
  },
  textInput: {
    backgroundColor: "white",
    borderRadius: 12,
    flexGrow: 1,
    height: 30,
    marginHorizontal: 10,
    paddingHorizontal: 10,
  },
  textWhite: {
    color: "white",
    fontSize: 36,
    fontWeight: "bold",
  },
});
