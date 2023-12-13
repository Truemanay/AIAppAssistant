import { SafeAreaView, StyleSheet, Text, TouchableOpacity } from "react-native";
import { useSuperSelector } from "../util/customComparators";
import { useDispatch } from "../redux";
import { useCallback } from "react";
import { _callFunction, _goBack } from "../functions";

export default function Screen1() {
  const dispatch = useDispatch();
  const rLoggedIn = useSuperSelector((state) => state.AppReducer.rLoggedIn);
  const _login = useCallback(() => {
    dispatch({ rLoggedIn: !rLoggedIn, type: "SET_APP_STATE" });
  }, [dispatch, rLoggedIn]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.textWhite}>You are {rLoggedIn ? "Logged in" : "Logged out"}</Text>
      <TouchableOpacity style={styles.button} onPress={_login}>
        <Text style={styles.text}>{rLoggedIn ? "Logout" : "Login"}</Text>
      </TouchableOpacity>
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
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    margin: 10,
  },
  textWhite: {
    color: "white",
    fontSize: 36,
    fontWeight: "bold",
    marginBottom: 20,
  },
});
