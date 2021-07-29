import React, { FunctionComponent, useCallback, useEffect, useRef, useState } from "react";
import { useMemo } from "react";
import {
  Animated,
  Keyboard,
  PanResponder,
  PanResponderGestureState,
  StyleSheet,
  View,
} from "react-native";
import Coordinate, { ICoordinate } from "../../../services/eventStorm/models/Coordinate";

interface Props {
  size: number
  panToCoordinate: Coordinate | undefined;
  defaultCoordinate: Coordinate
  zoomScale: number;
  zoomed: boolean;
}

const PanWrapper: FunctionComponent<Props> = (props) => {

  const pan = useRef(new Animated.ValueXY()).current;
  const scale = useRef(new Animated.Value(1)).current;

  const [currentPosition, setCurrentPosition] = useState<ICoordinate>(props.defaultCoordinate);

  useEffect(() => {
    Animated.timing(scale, {
      toValue: props.zoomed ? props.zoomScale : 1,
      duration: 300,
      useNativeDriver: false,
    }).start(() => {});
  }, [props.zoomed]);

  useEffect(() => {
    if (props.panToCoordinate) {
      Animated.timing(pan, {
        toValue: props.zoomed
          ? props.panToCoordinate
            .scaledCartesian(props.zoomScale, props.size)
          : props.panToCoordinate
            .cartesian(props.size),
        duration: 300,
        useNativeDriver: false,
      }).start(() => {
        setCurrentPosition(
          props.panToCoordinate!
            .cartesian(props.size))
      });
    }
  }, [props.panToCoordinate, props.zoomed]);

  const handleDragBoundaries = (x: number, y: number) => {

    const totalOffset: ICoordinate = {
      x: currentPosition.x + x,
      y: currentPosition.y + y,
    };

    if (inBounds(totalOffset.x))
      pan.setValue({ x, y: (pan.y as any)._value });

    if (inBounds(totalOffset.y))
      pan.setValue({ x: (pan.x as any)._value, y });
  };

  const handleBoundariesOnRelease = (gesture: PanResponderGestureState) => {
    let finalOffset = {
      x: gesture.dx + currentPosition.x,
      y: gesture.dy + currentPosition.y,
    };
    let updatedOffset: ICoordinate = { x: 0, y: 0 };
    let newPosition: ICoordinate = { x: 0, y: 0};

    // If drag is in bounds horizontally
    if (inBounds(finalOffset.x)) {
      newPosition.x = finalOffset.x;
      // If moved to the left
      if (gesture.dx < 0) {
        updatedOffset.x = (currentPosition.x - newPosition.x) * -1;
      }
      // If moved to the right
      else if (gesture.dx > 0) {
        updatedOffset.x = newPosition.x - currentPosition.x;
      } else {
        updatedOffset.x = 0;
      }
    } else {
      // If gesture.dx is positive
      if (gesture.dx > 0) {
        newPosition.x = props.size/2;
        updatedOffset.x = props.size/2 - currentPosition.x;
      }
      // If gesture.dx is the same or negative
      else {
        newPosition.x = -props.size/2;
        updatedOffset.x = -props.size/2 - currentPosition.x;
      }
    }

    // If drag is in bounds vertically
    if (inBounds(finalOffset.y)) {
      // Set newPosition to that of finalOffset
      newPosition.y = finalOffset.y;
      if (gesture.dy < 0) {
        // if moved down
        updatedOffset.y = (currentPosition.y - newPosition.y) * -1;
      }
      // If moved up
      else if (gesture.dy > 0) {
        updatedOffset.y = newPosition.y - currentPosition.y;
      } else {
        updatedOffset.y = 0;
      }
    } else {
      // If gesture.dx is positive
      if (gesture.dy > 0) {
        newPosition.y = props.size/2;
        updatedOffset.y = props.size/2 - currentPosition.y;
      }

      // If gesture.dy is positive
      if (gesture.dy > 0) {
        newPosition.y = props.size/2;
        updatedOffset.y = props.size/2 - currentPosition.y;
      }
      // If gesture.dy is the same or negative
      else {
        newPosition.y = -props.size/2;
        updatedOffset.y = -props.size/2 - currentPosition.y;
      }
    }

    pan.setValue(updatedOffset);
    setCurrentPosition(newPosition);
    pan.flattenOffset();
  };

  const inBounds = (value: number) => {
    return value >= -props.size/2 && value <= props.size/2;
  };

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderGrant: () => {
          Keyboard.dismiss()
          pan.setOffset({
            x: (pan.x as any)._value,
            y: (pan.y as any)._value,
          });
          pan.setValue({x: 0, y: 0})
        },
        onPanResponderMove: (e, gestureState) => {
          const { dx, dy } = gestureState;

          handleDragBoundaries(dx, dy);

          return Animated.event(
            [
              null,
              {
                dx: pan.x,
                dy: pan.y,
              },
            ],
            { 
              useNativeDriver: false,
            }
          );
        },
        onPanResponderRelease: (e, gestureState) => {
          handleBoundariesOnRelease(gestureState);
        },
      }),
    [currentPosition]
  );

  return (
    <View style={styles.container}>
      <Animated.View
        style={{
          transform: [
            { translateX: pan.x },
            { translateY: pan.y },
            { scale: scale },
          ],
        }}
        {...panResponder.panHandlers}
      >
        {props.children}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  titleText: {
    fontSize: 14,
    lineHeight: 24,
    fontWeight: "bold",
  },
  box: {
    height: 150,
    width: 150,
    backgroundColor: "blue",
    borderRadius: 5,
  },
});

export default PanWrapper;
