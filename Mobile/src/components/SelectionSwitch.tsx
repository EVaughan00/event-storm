import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import { Animated, Dimensions, StyleSheet, View } from "react-native";
import { AppStore } from "../AppStore";
import { SelectionDivivder } from "../icons/Divider";
import { Typography } from "./Typography";

interface Props {
  selections: string[];
  animated?: boolean;
  justifyContent?: "center" | "space-evenly" | "space-between" | "space-around";
  currentSelection: number;
  setSelection: (selectionIndex: number) => void;
}

export const SelectionSwitch: FunctionComponent<Props> = (props) => {
  const horizontalPosition = useRef(new Animated.Value(0)).current;
  const [windowWidth, setWindowWidth] = useState(
    Dimensions.get("window").width
  );

  React.useEffect(() => {
    Animated.timing(horizontalPosition, {
      toValue: props.currentSelection,
      duration: 100,
      useNativeDriver: true,
    }).start(() => {});
  }, [props.currentSelection]);

  React.useEffect(() => {
    function handleWindowResize() {
      setWindowWidth(Dimensions.get("window").width);
    }
    Dimensions.addEventListener("change", handleWindowResize);
    return () => {
      Dimensions.removeEventListener("change", handleWindowResize);
    };
  });

  if (props.animated) {
    var inputRange: number[];
    var outputRange: number[];

    props.selections.forEach((selection: string, index: number) => {
      inputRange.push(index);
      outputRange.push((index * windowWidth) / 3);
    });
  }

  const dynamicStyles = {
    container: {
      justifyContent: props.justifyContent
        ? props.justifyContent
        : "space-around",
    },
    animatedContainer: {
      transform: [
        {
          translateX: horizontalPosition.interpolate({
            inputRange: [1, 2, 3],
            outputRange: [
              0,
              (windowWidth - windowWidth * 0.1) / 3,
              (2 * (windowWidth - windowWidth * 0.1)) / 3,
            ],
          }),
        },
      ],
    },
  };

  const mapSelections = (current: number) => {
    return props.selections.map((selection: string, index: number) => (
      <View key={index}>
        <Typography.Selector
          active={index == current}
          style={styles.selector}
          index={index}
          onPress={props.setSelection}
        >
          {selection}
        </Typography.Selector>
        {index == current && <SelectionDivivder />}
      </View>
    ));
  };

  useEffect(() => {
    return () => {};
  }, [props.currentSelection]);

  return (
    <View style={[styles.container, dynamicStyles.container]}>
      {mapSelections(props.currentSelection)}
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
  selector: {
    color: "white",
  },
});
