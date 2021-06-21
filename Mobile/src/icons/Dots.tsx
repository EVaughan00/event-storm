import * as React from "react";
import { StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native";
import { Svg, Circle } from "react-native-svg";

interface DotsStyleProps {
  backgroundColor?: string;
  opacity?: number;
}

interface DotsProps {
  height: string;
  width: string;
  style?: DotsStyleProps;
  onPress: () => void;
}

export default function Dots(props: DotsProps) {
  const dynamicStyle = StyleSheet;

  return (
    <TouchableOpacity onPress={props.onPress}>
      <Svg
        height={props.height}
        width={props.width}
        viewBox="0 0 20 90"
        style={styles.icon}
      >
        <Circle cx="45" cy="15" r="10" fill={props.style?.backgroundColor ? props.style.backgroundColor : "#9E9E9E"} />
        <Circle cx="45" cy="45" r="10" fill={props.style?.backgroundColor ? props.style.backgroundColor : "#9E9E9E"}/>
        <Circle cx="45" cy="75" r="10" fill={props.style?.backgroundColor ? props.style.backgroundColor : "#9E9E9E"} />
      </Svg>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  icon: {
    opacity: 1.0,
  },
});
