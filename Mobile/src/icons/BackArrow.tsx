import * as React from "react";
import { StyleProp, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native";
import { Svg, Line } from "react-native-svg";

interface BackArrowStyleProps {
  color?: string;
}

export interface BackArrowProps {
  height: string;
  width: string;
  style?: BackArrowStyleProps;
  onPress: () => void
}

function SvgBackArrow(props: BackArrowProps) {
  const viewBox = `-1 0 ${props.width} ${props.height}`;

  return (
    <TouchableOpacity onPress={() => props.onPress()}>
      <Svg
        height={props.height}
        width={props.width}
        style={styles.backArrow}
        viewBox={viewBox}
      >
        <Line
          x1="2"
          y1={parseInt(props.height) / 2}
          x2={props.width}
          y2={parseInt(props.height) / 2}
          stroke={
            props.style?.color ? props.style.color : "black"
          }
          strokeWidth="3"
        />
        <Line
          x1="0"
          y1={parseInt(props.height) / 2 + 1}
          x2={parseInt(props.width) / 2}
          y2="0"
          stroke={
            props.style?.color ? props.style.color : "black"
          }
          strokeWidth="3"
        />
        <Line
          x1="0"
          y1={parseInt(props.height) / 2 - 1}
          x2={parseInt(props.width) / 2}
          y2={parseInt(props.height)}
          stroke={
            props.style?.color ? props.style.color : "black"
          }
          strokeWidth="3"
        />
      </Svg>
    </TouchableOpacity>
  );
}

export default SvgBackArrow;

const styles = StyleSheet.create({
  backArrow: {
  },
});
