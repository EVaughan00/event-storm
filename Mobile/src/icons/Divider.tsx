import * as React from "react";
import {StyleProp, ViewStyle} from 'react-native';
import { Svg, Line }  from "react-native-svg";

export interface DividerProps {
  style?: StyleProp<ViewStyle>
}

function SelectionDivivder(props: DividerProps) {

  return (
    <Svg height={"10"} width={"100%"} style={props.style}>
      <Line 
        x1="0" y1="5" x2="100%" y2="5"
        stroke="white"
        strokeWidth="3"
        opacity="1.0"
        strokeLinecap="round"
      />
    </Svg>
  );
}

export { SelectionDivivder };
