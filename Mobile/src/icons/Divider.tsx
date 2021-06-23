import * as React from "react";
import { FunctionComponent } from "react";
import {StyleProp, View, ViewStyle} from 'react-native';
import { Svg, Line }  from "react-native-svg";

interface DividerProps {
  vertical?: boolean
  color?: string
  width?: number
  opacity?: number
  style?: StyleProp<ViewStyle>
}

const Divider: FunctionComponent<DividerProps> = props => {

  const height = props.width ? props.width.toString() : "1"

  return (
    <View {...props.style}>
      <Svg height={height} width={"100%"}>
        <Line 
          x1="0" y1={parseInt(height) / 2} x2="100%" y2={parseInt(height) / 2}
          stroke={props.color ? props.color : "black"}
          strokeWidth={parseInt(height)}
          opacity={props.opacity ? props.opacity : "1"}
          strokeLinecap="round"
        />
      </Svg>
    </View>
  );
}

export { Divider };
