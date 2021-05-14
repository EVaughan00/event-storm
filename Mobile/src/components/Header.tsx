import { useNavigation } from "@react-navigation/native";
import { StackHeaderProps } from "@react-navigation/stack";
import React, {
  Component,
  FunctionComponent,
  useEffect,
  useRef,
  useState,
} from "react";
import { Easing, NativeScrollPoint } from "react-native";
import { Animated } from "react-native";
import { Dimensions, StyleSheet, View } from "react-native";
import { AppStore } from "../AppStore";
import theme, { Areas } from "../theme";
import { Typography } from "./Typography";

interface LargeHeaderProps {
  themeColor?: Areas;
}

const EmptyHeader: FunctionComponent<StackHeaderProps> = (props) => <></>;

const AppHeader: FunctionComponent<StackHeaderProps> = (props) => {
  const { previous, scene } = props;

  return (
    <View>
      <Typography.Paragraph>{scene.descriptor.render}</Typography.Paragraph>
    </View>
  );
};

const LargeHeader: FunctionComponent<LargeHeaderProps> = (props) => {
  const [fadeScale, setFadeScale] = useState(1);

  const navigation = useNavigation();

  const dynamicStyles = {
    container: {
      backgroundColor: props.themeColor
        ? theme.areaColors[props.themeColor]
        : theme.colors.primary,
    },
  };

  return (
    <Animated.View style={[styles.container, dynamicStyles.container]}>
      {props.children}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "flex-start",
    height: Dimensions.get("screen").height,
    width: "100%",
    position: "absolute",
    zIndex: -1,
  },
});

export { EmptyHeader, AppHeader, LargeHeader };
