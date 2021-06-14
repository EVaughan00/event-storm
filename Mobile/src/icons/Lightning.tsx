import * as React from "react";
import {StyleSheet} from 'react-native';
import { Svg, Path }  from "react-native-svg";

interface LightningProps {

}

function SvgLightning(props: LightningProps) {
  return (
    <Svg height={"300"} width={"100%"} style={styles.icon}
      viewBox="2.5 2 18 25"
    >
      <Path 
        d="M20.972 0L5.076 15.803h5.896L6.44 27.793l16.276-15.804h-5.897z"
        fill="black"
        opacity="0.1"
      />
    </Svg>
  );
}

export {SvgLightning}

const styles = StyleSheet.create({
  icon: {
    position: "absolute",
    zIndex: -1,
  }
})