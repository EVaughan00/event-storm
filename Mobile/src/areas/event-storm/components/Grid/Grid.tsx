import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import Svg from "react-native-svg";
import Coordinate from "../../../../services/eventStorm/models/Coordinate";
import EventStormViewModel from "../../../../services/eventStorm/models/EventStormViewModel";
import { INodeActions, NodeActions } from "../../helpers/GridActions";
import { GridBuilder } from "../../helpers/GridBuilder";
import PanWrapper from "../../helpers/PanWrapper";
import { ArrowNavigation, Direction } from "./ArrowNavigation";
import { GridNode } from "./GridNode";
import { GridSettings } from "./GridSettings";

interface Props {
  eventStorm: EventStormViewModel | undefined;
  onSelectNode: (node: GridNode | undefined) => void;
}

interface State {
  currentGridNode: GridNode;
  zoomed: boolean;
  panning: boolean;
  showArrows: boolean;
}

export class Grid extends Component<Props, State> {

  private _nodeActions: INodeActions;
  private _eventStorm: EventStormViewModel | undefined;
  private _nodes: JSX.Element[];

  constructor(props: Props) {
    super(props);

    this._nodeActions = {
      onNodePress: this.handleGridNodeSelection,
      onNodeDoublePress: this.handleNodeDoublePress,
    };

    this.state = {
      currentGridNode: {} as GridNode,
      zoomed: false,
      panning: false,
      showArrows: false,
    };

    this._eventStorm = props.eventStorm;
    this._nodes = GridBuilder.buildNodes(this._eventStorm?.blocks);
  }

  handleNodeDoublePress = (node: GridNode) => {};

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

    this.props.onSelectNode(node.isSelected ? node : undefined);
  };

  handleArrowNavigation = (direction: Direction) => {
    console.log(direction);
    if (!this.handleAvailableDirection(direction)) return;
  };

  handleAvailableDirection = (direction: Direction) => {
    switch (direction) {
      case Direction.right:
        return (
          this.state.currentGridNode.coordinate.x <
          GridSettings.size - GridSettings.nodePixelOffset
        );
      case Direction.left:
        return (
          this.state.currentGridNode.coordinate.x > GridSettings.nodePixelOffset
        );
      case Direction.up:
        return (
          this.state.currentGridNode.coordinate.y > GridSettings.nodePixelOffset
        );
      default:
        return (
          this.state.currentGridNode.coordinate.y <
          GridSettings.size - GridSettings.nodePixelOffset
        );
    }
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
                this.state.currentGridNode.coordinate.y
              )
            }
          />
        )}
        <NodeActions.Provider value={this._nodeActions}>
          <View style={styles.grid}>
            <Svg>{this._nodes}</Svg>
          </View>
        </NodeActions.Provider>
      </PanWrapper>
    );
  }
}

const styles = StyleSheet.create({
  grid: {
    zIndex: -1,
    width: GridSettings.size,
    height: GridSettings.size,
  },
});