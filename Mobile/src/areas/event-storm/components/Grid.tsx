import React, {
  Component,
  FunctionComponent,
  useEffect,
  useState,
} from "react";
import { render } from "react-dom";
import { StyleSheet, View } from "react-native";
import Svg from "react-native-svg";
import { AppStore } from "../../../AppStore";
import Coordinate from "../../../services/eventStorm/models/Coordinate";
import EventStormViewModel from "../../../services/eventStorm/models/EventStormViewModel";
import GridBuilder, { GridContext, IGridContext } from "../helpers/GridBuilder";
import { ArrowNavigation, Direction } from "./ArrowNavigation";
import GridEdge from "./GridEdge";
import GridNode from "./GridNode";
import PanWrapper from "./PanWrapper";

interface GridProps {
  nodes: Array<GridNode>;
  edges: Array<GridEdge>;
}

interface MovementProps {}

export class Grid extends Component<{}> {
  private _gridContext: IGridContext;
  private _nodes: Array<GridNode>;
  private _edges: Array<GridEdge>;

  constructor(nodes: Array<GridNode>, edges: Array<GridEdge>) {
    super({});

    this._nodes = nodes;
    this._edges = edges;

    this._gridContext = {
      rows: Math.sqrt(this._nodes.length),
      columns: Math.sqrt(this._nodes.length),
      onNodePress: this.handleNodePressed,
      onNodeDoublePress: this.handleNodeDoublePressed,
    };
  }

  handleNodePressed = (node: GridNode) => {};

  handleNodeDoublePressed = (node: GridNode) => {};

  renderNodes = () => {
    return this._nodes.map((node) => {
      return node.render();
    });
  };

  renderEdges = () => {
    return this._edges.map((edge) => {
      return edge.render();
    });
  };

  render() {
    return (
      <GridContext.Provider value={this._gridContext}>
        <PanWrapper
          size={Math.sqrt(this._gridContext.columns) * this._nodes.length}
          zoomScale={1.5}
        >
          <GridMovementHandler>
            {/* {this.renderEdges()} */}
            {this.renderNodes()}
          </GridMovementHandler>
        </PanWrapper>
      </GridContext.Provider>
    );
  }
}

export const GridMovementHandler: FunctionComponent<MovementProps> = (
  props
) => {
  const [store, actions] = AppStore.eventStorm.use();

  const [showArrows, setShowArrows] = useState(false);

  const handleGridNodeSelection = (node: GridNode) => {
    let zoom = false;

    if (store.selectedNode != node) {
      zoom = true;
      store.selectedNode.isSelected = false;
    } else if (store.selectedNode == node && !store.zoomed) {
      zoom = true;
    }

    actions.setZoomed(zoom);
    actions.s;
    this.setState({
      ...this.state,
      zoomed: zoom,
      selectedNode: node,
      showArrows: node.isSelected,
    });
  };

  const handleArrowNavigation = (
    direction: Direction,
    context: IGridContext
  ) => {
    switch (direction) {
      case Direction.right:
        if (canMoveRight()) {
          console.log("Moving right");
        } else {
          console.log("Cannot move right");
        }
        break;
      case Direction.left:
        if (canMoveLeft()) {
          console.log("Moving left");
        } else {
          console.log("Cannot move left");
        }
        break;
      case Direction.up:
        if (canMoveUp()) {
          console.log("Moving up");
        } else {
          console.log("Cannot move up");
        }
        break;
      default:
        if (canMoveDown()) {
          console.log("Moving down");
        } else {
          console.log("Cannot move down");
        }
    }
  };

  const canMoveRight = () => {
    return store.selectedNode.coordinate.x < this.props.size - this.nodeOffset;
  };

  const moveRight = () => {};

  const canMoveLeft = () => {
    return store.selectedNode.coordinate.x > this.nodeOffset;
  };

  const canMoveUp = () => {
    return store.selectedNode.coordinate.y > this.nodeOffset;
  };

  const canMoveDown = () => {
    return store.selectedNode.coordinate.y < this.props.size - this.nodeOffset;
  };

  dynamicStyles = {
    grid: {
      width: this.props.size,
      height: this.props.size,
    },
  };

  return (
    <GridContext.Consumer>
      {(context) =>
        store.zoomed && (
          <ArrowNavigation
            onPress={(direction) => handleArrowNavigation(direction, context)}
            coordinate={
              new Coordinate(
                store.selectedNode.coordinate.x,
                store.selectedNode.coordinate.y
              )
            }
          />
        )
      }
    </GridContext.Consumer>
  );
};

const styles = StyleSheet.create({
  grid: {
    zIndex: -1,
  },
});
