import React from "react";
import Reat, { FunctionComponent, useEffect, useRef, useState } from "react";
import { NativeScrollPoint, TouchableOpacity } from "react-native";
import { Animated, Dimensions, StyleSheet } from "react-native";
import { set } from "react-native-reanimated";
import { Typography } from "./Typography";

interface Props {
  showOnUpdate: any;
  hide?: boolean;
  scrollThreshold?: number;
  onPress: () => void
  beginScroll?: number
  activeScroll?: number
}

const FloatingAddButton: FunctionComponent<Props> = (props) => {
  const [showPlusButton, setShowPlusButton] = useState(true);
  const plusButtonPosition = useRef(new Animated.Value(0)).current;

  const threshold = props.scrollThreshold ? props.scrollThreshold : 20

  var activeScrollOffset = 0
  var initialScrollOffset = 0

  useEffect(() => {
      Animated.timing(plusButtonPosition, {
        toValue: showPlusButton ? 0 : 1,
        duration: 100,
        useNativeDriver: true,
      }).start(() => {});
  }, [showPlusButton]);

  useEffect(() => {
      setShowPlusButton(!props.hide)
  }, [props.showOnUpdate]);

  useEffect(() => {
    initialScrollOffset = props.beginScroll ? props.beginScroll : 0
  }, [props.beginScroll])

  useEffect(() => {
    activeScrollOffset = props.activeScroll ? props.activeScroll : 0

    const scrollDelta = activeScrollOffset - initialScrollOffset

    if (scrollDelta < threshold && !props.hide)
      setShowPlusButton(true);
    
    if (scrollDelta > threshold)
      setShowPlusButton(false);
  
  }, [props.activeScroll]);

  const dynamicStyle = {
    plusButton: {
      transform: [
        {
          translateY: plusButtonPosition.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 90],
          }),
        },
      ],
    },
  };

  return (
    <Animated.View style={[styles.plusButton, dynamicStyle.plusButton]}>
      <TouchableOpacity onPress={props.onPress} style={styles.plusButtonOpacity}>
        <Typography.SubTitle level={2} style={styles.plus}>
          +
        </Typography.SubTitle>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  plusButton: {
    borderRadius: 35,
    height: 70,
    width: 70,
    position: "absolute",
    backgroundColor: "rgb(98, 0, 238)",
    bottom: 20,
    right: 20,
    elevation: 10,

  },
  plusButtonOpacity: {
    height: "100%",
    width: "100%",
    alignSelf: 'center',
    alignItems: "center",
    justifyContent: "center",    
  },
  plus: {
    fontSize: 25,
    color: "white",
    marginBottom: 0
  },
});

export { FloatingAddButton }