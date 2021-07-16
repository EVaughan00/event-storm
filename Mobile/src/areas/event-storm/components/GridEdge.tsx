import React, { Component } from "react";
import {
  StyleSheet,
  View
} from "react-native";
import EventEdgeViewModel from "../../../services/eventStorm/models/EventEdgeViewModel";

interface Props {
  edge: EventEdgeViewModel
}

interface State {

}

export default class GridEdge extends Component<Props, State> {

  state: State = {
 
  };

  constructor(props: Props) {
    super(props);
  }


  render() {
    return (
      <View style={[StyleSheet.absoluteFill, styles.wrapper]}>
        {/* <Rect
          x={this._coordinate.x - 20}
          y={this._coordinate.y - 20}
          width="40"
          height="40"
          onPress={this.handlePress}
          onStartShouldSetResponder={() => this.handleDoublePress()}
        /> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  svg: {
    height: 8,
    width: 8,
  },
  wrapper: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
});
