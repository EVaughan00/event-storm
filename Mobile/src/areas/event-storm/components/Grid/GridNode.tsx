import React, { Component } from "react";
import { Keyboard, StyleSheet, View } from "react-native";
import { Circle, Rect } from "react-native-svg";
import { AuthenticationContext } from "../../../../providers/AuthenticationProvider";
import { WebSocketContext } from "../../../../providers/WebSocketProvider";
import Coordinate from "../../../../services/eventStorm/models/Coordinate";
import EventBlockViewModel from "../../../../services/eventStorm/models/EventBlockViewModel";
import { GridContext, IGridContext } from "./Grid";

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

    this.setState({
      ...this.state,
      scaled: this._isSelected,
    });
  }

  public get block(): EventBlockViewModel | undefined {
    return this._block;
  }

  public set block(block: EventBlockViewModel | undefined) {
    this._block = block
    
    this.setState({
      ...this.state,
      hasBlock: block != undefined,
    });
  }

  handlePress = (context: IGridContext) => {
    Keyboard.dismiss()
    this.isSelected = !this.isSelected
    context.selectNode(this)

    if (!this._isSelected)
      context.setZoomed(false)
    else
      context.setZoomed(true)

  };

  // handleDoublePress = (context) => {
  //   const time = new Date().getTime();
  //   const delta = time - this.state.lastPress;

  //   const DOUBLE_PRESS_DELAY = 400;
  //   if (delta < DOUBLE_PRESS_DELAY) {
  //     context.onNodeDoublePress(this);
  //   }
  //   this.setState({
  //     ...this.state,
  //     lastPress: time,
  //   });

  //   return true;
  // };
  componentDidMount() {
    // const { notifications  } = this.context.service.connections;

    // const handleBlockCreated = (id: string) => {

    //   console.log(id)
    // }

    // notifications.on("blockCreated", handleBlockCreated)
  }

  shouldComponentUpdate(previousProps: Props) {
    return previousProps.block != this.props.block
  }

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
      <Circle
        cx={this._coordinate.x}
        cy={this._coordinate.y}
        r={this.state.scaled ? "10" : "6"}
        stroke="#EB5A5A"
        strokeWidth="1"
        fill="#EB5A5A"
      />
    );
  };

  render() {
    return (
      <GridContext.Consumer>
        {(actions) => (
          <View style={[StyleSheet.absoluteFill, styles.wrapper]}>
            {this.state.hasBlock ? this.eventBlock() : this.node()}
            <Rect
              x={this._coordinate.x - 20}
              y={this._coordinate.y - 20}
              width="40"
              height="40"
              onPress={() => this.handlePress(actions!)}
              // onStartShouldSetResponder={() => this.handleDoublePress(actions!)}
            />
          </View>
        )}
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


function nodesAreEqual(prevNode, nextNode) {
  return prevNode.block == nextNode.block
}

export const MemoizedGridNode = React.memo(GridNode, nodesAreEqual)