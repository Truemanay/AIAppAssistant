import { Slot, usePathname } from "expo-router";
import { useDispatch, withRedux } from "../redux";
import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useCallback, useEffect, useState } from "react";
import { useSuperSelector } from "../util/customComparators";
import { aNav, submitData } from "../redux/appState/thunkActions";
import { _goBack, _login } from "../functions";
import Animated, {
  Easing,
  ReduceMotion,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { Flint } from "../util/components/Flint";

const App = () => {
  const dispatch = useDispatch();
  const rAppStates = useSuperSelector((state) => state.AppReducer);
  const rStartAnimation = useSuperSelector((state) => state.AppReducer.rStartAnimation);
  const rStartX = useSuperSelector((state) => state.AppReducer.rStartX);
  const rStartY = useSuperSelector((state) => state.AppReducer.rStartY);
  const rIsThinking = useSuperSelector((state) => state.AppReducer.rIsThinking);
  const aPathName = usePathname();
  const [goal, setGoal] = useState("");

  const _handleSubmitData = useCallback(() => {
    submitData({ goal: goal, state: rAppStates }, dispatch).catch((err) => {
      console.log(err);
    });
  }, [dispatch, goal, rAppStates]);
  const _handleGoBack = useCallback(() => {
    dispatch(aNav("/"));
  }, [dispatch]);

  const positionX = useSharedValue(rStartX);
  const positionY = useSharedValue(rStartY);
  const scale = useSharedValue(1);

  const _handleScale = useCallback(() => {
    scale.value = withSequence(
      withSpring(0.5, { damping: 10, stiffness: 100 }),
      withSpring(1, { damping: 10, stiffness: 100 }),
    );
  }, [scale]);

  useEffect(() => {
    if (rStartAnimation) {
      positionX.value = withTiming(rStartX, {
        duration: 1000,
        easing: Easing.inOut(Easing.cubic),
        reduceMotion: ReduceMotion.System,
      });
      positionY.value = withTiming(rStartY, {
        duration: 1000,
        easing: Easing.inOut(Easing.cubic),
        reduceMotion: ReduceMotion.System,
      });
      setTimeout(() => {
        _handleScale();
      }, 1000);
    }
  }, [_handleScale, positionX, positionY, rStartAnimation, rStartX, rStartY]);

  const _resetAnim = useCallback(() => {
    positionX.value = withTiming(300, {
      duration: 1000,
      easing: Easing.inOut(Easing.cubic),
      reduceMotion: ReduceMotion.System,
    });
    positionY.value = withTiming(300, {
      duration: 1000,
      easing: Easing.inOut(Easing.cubic),
      reduceMotion: ReduceMotion.System,
    });
  }, [positionX, positionY]);
  const opacity1 = useSharedValue(0);
  const opacity2 = useSharedValue(0);
  const opacity3 = useSharedValue(0);

  useEffect(() => {
    if (rIsThinking) {
      const animationDuration = 700; // Duration for the fade in and fade out
      const delayDuration = 300; // Delay between animations

      // Dot 1 Animation
      opacity1.value = withRepeat(
        withSequence(
          withTiming(1, { duration: animationDuration }),
          withTiming(0, { duration: animationDuration }),
          withDelay(delayDuration, withTiming(0, { duration: 0 })),
        ),
        -1,
        true,
      );

      // Dot 2 Animation
      opacity2.value = withRepeat(
        withSequence(
          withDelay(delayDuration, withTiming(1, { duration: animationDuration })),
          withTiming(0, { duration: animationDuration }),
          withDelay(delayDuration, withTiming(0, { duration: 0 })),
        ),
        -1,
        true,
      );

      // Dot 3 Animation
      opacity3.value = withRepeat(
        withSequence(
          withDelay(delayDuration * 2, withTiming(1, { duration: animationDuration })),
          withTiming(0, { duration: animationDuration }),
          withDelay(delayDuration, withTiming(0, { duration: 0 })),
        ),
        -1,
        true,
      );
    }
  }, [opacity1, opacity2, opacity3, rIsThinking, rStartAnimation]);

  const animatedStyleDot1 = useAnimatedStyle(() => {
    return {
      opacity: opacity1.value,
    };
  });
  const animatedStyleDot2 = useAnimatedStyle(() => {
    return {
      opacity: opacity2.value,
    };
  });
  const animatedStyleDot3 = useAnimatedStyle(() => {
    return {
      opacity: opacity3.value,
    };
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: positionX.value }, { translateY: positionY.value }, { scale: scale.value }],
    };
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.overlay}>
        {/* <TouchableOpacity onPress={_login} style={styles.button}>
          <Text style={styles.text}>Test</Text>
        </TouchableOpacity> */}
        {aPathName !== "/" && (
          <TouchableOpacity onPress={_handleGoBack} style={styles.button}>
            <Text style={styles.text}>Back</Text>
          </TouchableOpacity>
        )}
        <TextInput onChangeText={setGoal} style={styles.textInput} />
        <TouchableOpacity onPress={_handleSubmitData} style={styles.button}>
          <Text style={styles.text}>Submit</Text>
        </TouchableOpacity>
      </View>
      <Slot />
      <Animated.View style={[styles.icon, animatedStyle]}>
        <TouchableOpacity onPress={_resetAnim} activeOpacity={1}>
          <Flint />
          {rIsThinking && (
            <View style={styles.thinkingBubble}>
              <Animated.View style={[styles.dot, animatedStyleDot1]} />
              <Animated.View style={[styles.dot, animatedStyleDot2]} />
              <Animated.View style={[styles.dot, animatedStyleDot3]} />
            </View>
          )}
        </TouchableOpacity>
      </Animated.View>
    </SafeAreaView>
  );
};

export default withRedux(App);

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: "#129340",
    borderRadius: 12,
    justifyContent: "center",
  },
  container: {
    backgroundColor: "black",
    flex: 1,
  },
  dot: {
    backgroundColor: "black",
    borderRadius: 5,
    height: 8,
    width: 8,
    // Additional styling as needed
  },
  icon: {
    // backgroundColor: "red",
    height: 20,
    position: "absolute",
    width: 20,
  },
  overlay: {
    alignItems: "center",
    flexDirection: "row",
    height: 50,
    justifyContent: "center",
  },
  text: {
    fontSize: 16,
    margin: 10,
  },
  textInput: {
    backgroundColor: "white",
    borderRadius: 12,
    flexGrow: 1,
    height: 30,
    marginHorizontal: 10,
    paddingHorizontal: 10,
  },
  thinkingBubble: {
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 18,
    flexDirection: "row",
    height: 24,
    justifyContent: "space-around",
    paddingHorizontal: 2,
    position: "absolute",
    top: -20,
    width: 36,
  },
});
