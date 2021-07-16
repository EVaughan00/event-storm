import React, { Component } from "react";
import {
  StyleSheet,
  View
} from "react-native";
import { Circle, Rect } from "react-native-svg";
import Coordinate from "../../../services/eventStorm/models/Coordinate";
import EventBlockViewModel from "../../../services/eventStorm/models/EventBlockViewModel";
import { GridContext, IGridContext } from "../helpers/GridBuilder";


interface State {
  lastPress: number;
  isBlock: boolean;
  scaled: boolean;
}

export default class GridNode extends Component<{}, State> {

  state: State = {
    lastPress: -400,
    isBlock: false,
    scaled: false
  };

  private _isSelected = false
  private _block: EventBlockViewModel
  private _id: number

  private _coordinate: Coordinate

  constructor(coordinate: Coordinate, index: number) {
    super(coordinate);

    this._id = index
    this._coordinate = coordinate
  }

  public get coordinate(): Coordinate {
    return this._coordinate;
  }
  public set coordinate(coord: Coordinate) {
    this._coordinate = coord;
  }
  public get isSelected(): boolean {
    return this._isSelected;
  }
  public set isSelected(status: boolean) {
    this._isSelected = status
    this.scale()
  }
  public get block(): EventBlockViewModel {
    return this._block;
  }
  public set block(block: EventBlockViewModel) {
    this._block = block
    this.blockify()
  }

  handlePress = (context: IGridContext) => {
    this.isSelected=!this._isSelected
    context.onNodePress(this)
  };

  handleDoublePress = (context: IGridContext) => {
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
      scaled: this._isSelected
    })
  }

  blockify = () => {
    this.setState({
      ...this.state,
      isBlock: this._block != undefined
    })
  }

  node = () => {
    return (
      <Circle
        cx={this._coordinate.x}
        cy={this._coordinate.y}
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
  }

  render() {
    return (
      <GridContext.Consumer key={this._id}>
        {(context) =>
          <View style={[StyleSheet.absoluteFill, styles.wrapper]}>
            {this.state.isBlock ? this.eventBlock() : this.node()}
            <Rect
              x={this._coordinate.x - 20}
              y={this._coordinate.y - 20}
              width="40"
              height="40"
              onPress={() => {
                this.handlePress(context)
              }}
              onStartShouldSetResponder={() => 
                this.handleDoublePress(context)
              }
            />
          </View>
        }
      </GridContext.Consumer>
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
