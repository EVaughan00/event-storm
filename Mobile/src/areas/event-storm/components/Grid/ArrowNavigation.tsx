import React, { FunctionComponent } from "react";
import { StyleProp, StyleSheet, ViewStyle } from "react-native";
import Svg, { Path, Rect } from "react-native-svg";
import Coordinate, { ICoordinate } from "../../../../services/eventStorm/models/Coordinate";

interface ArrowProps {
  rotation: Direction
  style?: StyleProp<ViewStyle>
  scale: number
  coordinate: ICoordinate
  onPress: (direction: Direction) => void
}

export enum Direction {
  up=270,
  down=90,
  left=180,
  right=0
}

export const Arrow: FunctionComponent<ArrowProps> = props => {

  const dynamicStyles = {
    container: {
      translateX: props.coordinate.x,
      translateY: props.coordinate.y
    },
  };

  return (

    <Svg
      style={[styles.arrow, props.style]}
      width={props.scale * 31.3}
      height={props.scale * 22}
      fill="none"
      stroke="red"
      color="green"
      opacity='0.7'
      rotation={props.rotation}
      onPress={() => props.onPress(props.rotation)}
      {...dynamicStyles.container}
    >
      <Path 
        d="M 0,5 20,5 20,0 30,10 20,20 20,15 0,15 0,5 z"
        stroke="blue" 
        strokeWidth="1" 
        fill="#347aeb"
        stroke-linecap="round"
        scale={props.scale}
        translateX={0.5}
        translateY={1}
      />
    </Svg>
  );
};

interface Props {
  coordinate: Coordinate
  scale: number
  canMoveDirection: (direction: Direction) => boolean
  onPress: (direction: Direction) => void
}

export const ArrowNavigation: FunctionComponent<Props> = props => {
    
  const scale = (value: number) => {
    return value * props.scale
  }

  const rightArrowOffset = () => {
    let translate: ICoordinate = {x: 0, y: 0}

    translate.x = props.coordinate.x + scale(40)
    translate.y = props.coordinate.y - scale(11.5)

    return translate
  } 

  const leftArrowOffset = () => {
    let translate: ICoordinate = {x: 0, y: 0}

    translate.x = props.coordinate.x - scale(70)
    translate.y = props.coordinate.y - scale(11.5)

    return translate
  } 

  const upArrowOffset = () => {
    let translate: ICoordinate = {x: 0, y: 0}

    translate.x = props.coordinate.x - scale(15.5)
    translate.y = props.coordinate.y - scale(70)

    return translate
  } 

  const downArrowOffset = () => {
    let translate: ICoordinate = {x: 0, y: 0}

    translate.y = props.coordinate.y + scale(50)
    translate.x = props.coordinate.x - scale(15.5)

    return translate
  } 

  return (   
    <> 
     {
       props.canMoveDirection(Direction.right) && 
       <Arrow scale={props.scale} coordinate={rightArrowOffset()} onPress={props.onPress} rotation={Direction.right} />
     }         
     {
      props.canMoveDirection(Direction.left) && 
      <Arrow scale={props.scale} coordinate={leftArrowOffset()} onPress={props.onPress} rotation={Direction.left} />
     }
     {
       props.canMoveDirection(Direction.up) &&
      <Arrow scale={props.scale} coordinate={upArrowOffset()} onPress={props.onPress} rotation={Direction.up} />
     } 
     {
      props.canMoveDirection(Direction.down) &&
      <Arrow scale={props.scale} coordinate={downArrowOffset()} onPress={props.onPress} rotation={Direction.down} />
     }
    </>
  )
}

export const Grid: FunctionComponent = () => {
  return (
    <Svg>
      <Path d="M10 0 V100" scale={2} strokeWidth="1" />
      <Path d="M20 0 V100" scale={2} strokeWidth="1" />
      <Path d="M30 0 V100" scale={2} strokeWidth="1" />
      <Path d="M40 0 V100" scale={2} strokeWidth="1" />
      <Path d="M50 0 V100" scale={2} strokeWidth="1" />
      <Path d="M60 0 V100" scale={2} strokeWidth="1" />
      <Path d="M70 0 V100" scale={2} strokeWidth="1" />
      <Path d="M80 0 V100" scale={2} strokeWidth="1" />
      <Path d="M90 0 V100" scale={2} strokeWidth="1" />

      <Path d="M0 10 H100" scale={2} strokeWidth="1" />
      <Path d="M0 20 H100" scale={2} strokeWidth="1" />
      <Path d="M0 30 H100" scale={2} strokeWidth="1" />
      <Path d="M0 40 H100" scale={2} strokeWidth="1" />
      <Path d="M0 50 H100" scale={2} strokeWidth="1" />
      <Path d="M0 60 H100" scale={2} strokeWidth="1" />
      <Path d="M0 70 H100" scale={2} strokeWidth="1" />
      <Path d="M0 80 H100" scale={2} strokeWidth="1" />
      <Path d="M0 90 H100" scale={2} strokeWidth="1" />
      <Rect 
        width="100"
        height="100"
        stroke="blue"
        strokeWidth="2"
        scale={2}
      />
    </Svg>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    height: '100%',
    width: '100%'
  },
  arrow: {
    position: 'absolute',
  }
});
