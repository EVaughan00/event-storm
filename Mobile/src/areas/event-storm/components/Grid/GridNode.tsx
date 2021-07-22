import React, { Component } from "react";
import { Keyboard, StyleSheet, View } from "react-native";
import { Circle, Rect } from "react-native-svg";
import Coordinate from "../../../../services/eventStorm/models/Coordinate";
import EventBlockViewModel from "../../../../services/eventStorm/models/EventBlockViewModel";
import { INodeActions, NodeActions } from "../../helpers/GridActions";

interface Props {
  coordinate: Coordinate;
  block: EventBlockViewModel | undefined;
}

interface State {
  lastPress: number;
  hasBlock: boolean;
  scaled: boolean;
}

export class GridNode extends Component<Props, State> {

  private _isSelected = false;
  private _hasBlock = false;
  private _coordinate = new Coordinate(0,0)
  private _block: EventBlockViewModel | undefined = undefined

  constructor(props: Props) {
    super(props);

    this._coordinate = props.coordinate
    this._block = props.block

    this.state = {
      lastPress: -400,
      hasBlock: props.block != undefined,
      scaled: false,
    };
  }

  public get coordinate(): Coordinate {
    return this._coordinate;
  }

  public get isSelected(): boolean {
    return this._isSelected;
  }

  public set isSelected(status: boolean) {
    this._isSelected = status;
    this.scale()
  }

  public get block(): EventBlockViewModel | undefined {
    return this._block;
  }

  public set block(block: EventBlockViewModel | undefined) {
    this.block = block
    this.blockify()
  }

  handlePress = (context: INodeActions) => {
    Keyboard.dismiss()
    this.isSelected = !this.isSelected
    context.onNodePress(this);
  };

  handleDoublePress = (context: INodeActions) => {
    const time = new Date().getTime();
    const delta = time - this.state.lastPress;

    const DOUBLE_PRESS_DELAY = 400;
    if (delta < DOUBLE_PRESS_DELAY) {
      context.onNodeDoublePress(this);
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
      scaled: this._isSelected,
    });
  };

  blockify = () => {
    this.setState({
      ...this.state,
      hasBlock: this._hasBlock,
    });
  };

  node = () => {
    return (
      <Circle
        cx={this._coordinate.x}
        cy={this._coordinate.y}
        r={this.state.scaled ? "6" : "3"}
        stroke="grey"
        strokeWidth="1"
        fill="grey"
      />
    );
  };

  eventBlock = () => {
    return (
      <Rect
        x={
          this.state.scaled
            ? this._coordinate.x - 25
            : this._coordinate.x - 20
        }
        y={
          this.state.scaled
            ? this._coordinate.y - 12.5
            : this._coordinate.y - 10
        }
        width={this.state.scaled ? "50" : "40"}
        height={this.state.scaled ? "25" : "20"}
        fill="green"
      />
    );
  };

  render() {
    return (
      <NodeActions.Consumer>
        {(actions) => (
          <View style={[StyleSheet.absoluteFill, styles.wrapper]}>
            {this.state.hasBlock ? this.eventBlock() : this.node()}
            <Rect
              x={this._coordinate.x - 20}
              y={this._coordinate.y - 20}
              width="40"
              height="40"
              onPress={() => this.handlePress(actions!)}
              onStartShouldSetResponder={() => this.handleDoublePress(actions!)}
            />
          </View>
        )}
      </NodeActions.Consumer>
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
