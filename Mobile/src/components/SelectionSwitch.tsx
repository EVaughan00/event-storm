import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import { Animated, Dimensions, StyleSheet, View } from "react-native";
import { AppStore } from "../AppStore";
import { SelectionDivivder } from "../icons/SectionDivider";
import theme from "../theme";
import { CardSection } from "./CardSection";
import { Typography } from "./Typography";

interface Props {
  tabs: string[];
  animated?: boolean;
  justifyContent?: "center" | "space-evenly" | "space-between" | "space-around";
  currentTab: number;
  setTab: (tab: number) => void;
}

export const TabSwitch: FunctionComponent<Props> = (props) => {
  const horizontalPosition = useRef(new Animated.Value(0)).current;
  const [windowWidth, setWindowWidth] = useState(
    Dimensions.get("window").width
  );
  const [animatedInputRange, setAnimatedInputRange] = useState<number[]>()
  const [animatedOutputRange, setAnimatedOutputRange] = useState<number[]>()

  React.useEffect(() => {
    Animated.timing(horizontalPosition, {
      toValue: props.currentTab,
      duration: 100,
      useNativeDriver: true,
    }).start(() => {});
  }, [props.currentTab]);

  React.useEffect(() => {
    if (props.animated) {
      var inputRange: number[] = [];
      var outputRange: number[] = []; 
  
      props.tabs.forEach((tab: string, index: number) => {
        inputRange.push(index);
        outputRange.push((index * windowWidth) / props.tabs.length);
      });
      console.log(outputRange)
      setAnimatedInputRange(inputRange)
      setAnimatedOutputRange(outputRange)
    }
  },[]);

  const dynamicStyles = {
    container: {
      justifyContent: props.justifyContent
        ? props.justifyContent
        : "space-around",
    },
    animatedContainer: {
      // transform: [
      //   {
      //     translateX: horizontalPosition.interpolate({
      //       inputRange: animatedInputRange ? animatedInputRange : [0],
      //       outputRange: animatedOutputRange ? animatedOutputRange : [0]
      //     }),
      //   },
      // ],
    },
  };

  const mapTabs = (current: number) => {
    return props.tabs.map((tab: string, index: number) => (
      <View key={index}>
        <Typography.Selector
          active={index == current}
          style={styles.selector}
          index={index}
          onPress={props.setTab}
        >
          {tab}
        </Typography.Selector>
        {index == current && !props.animated && <SelectionDivivder />}
      </View>
    ));
  };

  useEffect(() => {
    return () => {};
  }, [props.currentTab]);

  return (
    <View style={[styles.container, dynamicStyles.container]}>
      {mapTabs(props.currentTab)}
      {props.animated &&
        <Animated.View style={[styles.animatedContainer, dynamicStyles.animatedContainer]}>
          <SelectionDivivder />
        </Animated.View>
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 15,
  },
  animatedContainer: {
    position: "absolute",
  },
  selector: {
    color: "white",
  },
});
