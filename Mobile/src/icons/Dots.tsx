import * as React from "react";
import { StyleSheet, View } from "react-native";
import { TouchableOpacity } from "react-native";
import { Svg, Circle } from "react-native-svg";

interface DotsStyleProps {
  color?: string;
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

  const radius = Math.sqrt(parseInt(props.height) * parseInt(props.width)) / 10

  return (
    <TouchableOpacity style={styles.button} onPress={props.onPress}>
      <View>
        <Svg
          height={props.height}
          width={props.width}
          style={styles.icon}
        >
          <Circle cx={parseInt(props.width) / 2} cy={parseInt(props.height) - parseInt(props.height)/6} r={radius} fill={props.style?.color ? props.style.color : "black"} />
          <Circle cx={parseInt(props.width) / 2} cy={parseInt(props.height) / 2} r={radius} fill={props.style?.color ? props.style.color : "black"}/>
          <Circle cx={parseInt(props.width) / 2} cy={parseInt(props.height)/6} r={radius} fill={props.style?.color ? props.style.color : "black"} />
        </Svg>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  icon: {
    opacity: 1.0,
  },
  button: {
    // paddingLeft: 10,
    alignContent: 'center',
    justifyContent: 'center'
  }
});
