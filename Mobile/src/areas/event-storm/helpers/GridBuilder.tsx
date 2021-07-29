import * as React from "react";
import { RefObject } from "react";
import Coordinate from "../../../services/eventStorm/models/Coordinate";
import EventBlockViewModel from "../../../services/eventStorm/models/EventBlockViewModel";
import EventStormViewModel from "../../../services/eventStorm/models/EventStormViewModel";
import { Grid } from "../components/Grid/Grid";
import { GridNode, MemoizedGridNode } from "../components/Grid/GridNode";

interface Props {
  settings: GridSettings
}

interface State {
  nodes: JSX.Element[]
}

export class GridBuilder extends React.Component<Props, State> {

  private _settings: GridSettings;
  private _coordinates: Coordinate[] = [];

  constructor(props: Props) {
    super(props);

    console.log("Constructed builder")

    this._settings = props.settings
    this.buildCoordinates()

    this.state = {
      nodes: this.buildNodes()
    }
  }

  public buildCoordinates = () => {
    for (var row = 0; row < this._settings.rows; row++) {
      for (var col = 0; col < this._settings.columns; col++) {
        this._coordinates.push(new Coordinate(
          row * this._settings.nodePixelOffset + this._settings.nodePixelOffset / 2,
          col * this._settings.nodePixelOffset + this._settings.nodePixelOffset / 2
        ));
      }
    }
  }

  public buildNodes = () => {
    console.log("Building nodes");

    var nodes: JSX.Element[] = [];
    var index = 0;

    for (var row = 0; row < this._settings.rows; row++) {
      for (var col = 0; col < this._settings.columns; col++) {

        nodes.push(
          <MemoizedGridNode
            key={index}
            block={undefined}
            coordinate={this._coordinates[index]}
          />
        );
        index++;
      }
    }
    return nodes;
  };

  public updateNodes = (blocks: EventBlockViewModel[]) => {
    console.log("Updating nodes");

    if (!blocks || blocks.length < 1)
      return this.state.nodes

    this._coordinates.forEach((coordinate, index) => {

      blocks.forEach((block) => {
        if (block.coordinate.equals(coordinate) && this.state.nodes[index]) {
          this.state.nodes[index] = (
            <MemoizedGridNode key={index} block={block} coordinate={block.coordinate} />
          );
        }
      });
    });

    return this.state.nodes;
  };

  shouldComponentUpdate(previousProps, previousState) {
    return previousState.nodes != this.state.nodes
  }

  public build() {
    return <Grid nodes={this.state.nodes} />
  }
  // static buildEdges = (context: IGridContext) => {

  //   var edges: GridEdge[] = []

  //   // if (storm != undefined)
  //   //   storm.edges.forEach(edge => {
  //   //     edges.push(new GridEdge({edge}))
  //   //   })

  //   return edges
  // }
}

export class GridSettings {
  public nodePixelOffset: number = 100;
  public rows: number = 8;
  public columns: number = 8;

  public get size(): number {
    return (
      this.nodePixelOffset *
      Math.sqrt(this.rows * this.columns)
    );
  }
}
