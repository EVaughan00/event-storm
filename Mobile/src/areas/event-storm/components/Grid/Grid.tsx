import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import Svg from "react-native-svg";
import Coordinate from "../../../../services/eventStorm/models/Coordinate";
import PanWrapper from "../../helpers/PanWrapper";
import { ArrowNavigation, Direction } from "./ArrowNavigation";
import { GridNode } from "./Node";
import { GridSettings } from "./Settings";

interface Props {
  onSelectGridNode: (node: GridNode) => void;
}

interface State {
  currentGridNode: GridNode;
  zoomed: boolean;
  panning: boolean;
  showArrows: boolean;
}

export class Grid extends Component<Props, State> {

  state: State = {
    currentGridNode: {} as GridNode,
    zoomed: false,
    panning: false,
    showArrows: false,
  };

  constructor(props: Props) {
    super(props);
  }


 handleGridNodeSelection = (node: GridNode) => {
  let zoom = false;

  if (this.state.currentGridNode != node) {
    zoom = true;
    this.state.currentGridNode.isSelected = false;
  } else if (this.state.currentGridNode == node && !this.state.zoomed) {
    zoom = true;
  }

  this.setState({
    ...this.state,
    zoomed: zoom,
    currentGridNode: node,
    showArrows: node.isSelected,
  });

  this.props.onSelectGridNode(node);
};

  handleArrowNavigation = (direction: Direction) => {

    if (!this.handleAvailableDirection(direction))
      return

    
  }

  handleAvailableDirection = (direction: Direction) => {

    switch (direction) {
      case Direction.right:
        return this.state.currentGridNode.coordinate.x < GridSettings.size - GridSettings.nodePixelOffset
      case Direction.left:
        return this.state.currentGridNode.coordinate.x > GridSettings.nodePixelOffset;
      case Direction.up:
        return this.state.currentGridNode.coordinate.y > GridSettings.nodePixelOffset;
      default:
        return this.state.currentGridNode.coordinate.y < GridSettings.size - GridSettings.nodePixelOffset
    }
  };

  mappedPoints = () => {
    var points: JSX.Element[] = [];
    var index = 0;

    for (var row = 0; row < GridSettings.rows; row++) {
      for (var col = 0; col < GridSettings.columns; col++) {
        points.push(
          <GridNode
            onPress={this.handleGridNodeSelection}
            onDoublePress={() => {}}
            key={index}
            coordinate={
              new Coordinate(
                row * GridSettings.nodePixelOffset + GridSettings.nodePixelOffset / 2,
                col * GridSettings.nodePixelOffset + GridSettings.nodePixelOffset / 2,
              )
            }
          />
        );
        index++;
      }
    }
    return points;
  };

  dynamicStyles = {
    grid: {
      width: GridSettings.size,
      height: GridSettings.size,
    },
  };

  render() {
    return (
      <PanWrapper
        size={GridSettings.size}
        zoomScale={1.5}
        zoomed={this.state.zoomed}
        panToCoordinate={this.state.currentGridNode.coordinate}
      >
        {this.state.zoomed && (
          <ArrowNavigation
            canMoveDirection={this.handleAvailableDirection}
            scale={1}
            onPress={this.handleArrowNavigation}
            coordinate={
              new Coordinate(
                this.state.currentGridNode.coordinate.x,
                this.state.currentGridNode.coordinate.y,
              )
            }
          />
        )}
        <View style={[styles.grid, this.dynamicStyles.grid]}>
          <Svg>{this.mappedPoints()}</Svg>
        </View>
      </PanWrapper>
    );
  }
}

const styles = StyleSheet.create({
  grid: {
    zIndex: -1,
  },
});
