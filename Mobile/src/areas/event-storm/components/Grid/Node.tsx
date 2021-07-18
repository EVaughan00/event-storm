import React, { Component } from "react";
import {
  StyleSheet,

  View
} from "react-native";
import { Circle, Rect } from "react-native-svg";
import Coordinate from "../../../../services/eventStorm/models/Coordinate";

interface Props {
  coordinate: Coordinate;
  onPress: (node: GridNode) => void;
  onDoublePress: (node: GridNode) => void;
}

interface State {
  lastPress: number;
  isBlock: boolean;
  scaled: boolean;
}

export class GridNode extends Component<Props, State> {
  state: State = {
    lastPress: -400,
    isBlock: false,
    scaled: false
  };

  private _isSelected = false
  private _hasBlock = false

  constructor(props: Props) {
    super(props);
  }

  public get coordinate(): Coordinate {
    return this.props.coordinate;
  }
  public get isSelected(): boolean {
    return this._isSelected;
  }
  public set isSelected(status: boolean) {
    this._isSelected = status
    this.scale()
  }

  public get hasBlock(): boolean {
    return this._hasBlock;
  }

  public set hasBlock(status: boolean) {
    this._hasBlock = status
    this.blockify()
  }

  handlePress = () => {
    this.isSelected=!this._isSelected
    this.props.onPress(this);
  };

  handleDoublePress = () => {
    const time = new Date().getTime();
    const delta = time - this.state.lastPress;

    const DOUBLE_PRESS_DELAY = 400;
    if (delta < DOUBLE_PRESS_DELAY) {
      this.props.onDoublePress(this);
    }
    this.setState({
      ...this.state,
      lastPress: time,
    });

    return true;
  };

  scale = () => {
    this.setState({
      ...this.state,
      scaled: this._isSelected
    })
  }

  blockify = () => {
    this.setState({
      ...this.state,
      isBlock: this._hasBlock
    })
  }

  node = () => {
    return (
      <Circle
        cx={this.props.coordinate.x}
        cy={this.props.coordinate.y}
        r={this.state.scaled ? "8" : "5"}
        stroke="black"
        strokeWidth="2"
        fill="red"
      />
    );
  };

  eventBlock = () => {
    return (
      <Rect
        x={
          this.state.scaled
            ? this.props.coordinate.x - 25
            : this.props.coordinate.x - 20
        }
        y={
          this.state.scaled
            ? this.props.coordinate.y - 12.5
            : this.props.coordinate.y - 10
        }
        width={this.state.scaled ? "50" : "40"}
        height={this.state.scaled ? "25" : "20"}
        fill="green"
      />
    );
  }

  render() {
    return (
      <View style={[StyleSheet.absoluteFill, styles.wrapper]}>
        {this.state.isBlock ? this.eventBlock() : this.node()}
        <Rect
          x={this.props.coordinate.x - 20}
          y={this.props.coordinate.y - 20}
          width="40"
          height="40"
          onPress={this.handlePress}
          onStartShouldSetResponder={() => this.handleDoublePress()}
        />
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
