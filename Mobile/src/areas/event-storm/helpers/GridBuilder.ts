import { createContext, useContext } from "react";
import { View } from "react-native";
import Coordinate from "../../../services/eventStorm/models/Coordinate";
import EventBlockViewModel from "../../../services/eventStorm/models/EventBlockViewModel";
import EventStormViewModel from "../../../services/eventStorm/models/EventStormViewModel";
import { Grid } from "../components/Grid";
import GridEdge from "../components/GridEdge";
import GridNode from "../components/GridNode";

export interface IGridContext {
  rows: number
  columns: number
  onNodePress:(node: GridNode) => void
  onNodeDoublePress:(node: GridNode) => void
}

export const GridContext = createContext<IGridContext>({} as IGridContext)

export default class GridBuilder {

    private static _nodePixelOffset: number = 125
    private static _rows: number = 8
    private static _columns: number = 8

    static buildNodes = (storm: EventStormViewModel) => {
        var nodes: GridNode[] = [];
        var index = 0;
    
        for (var row = 0; row < GridBuilder._rows; row++) {
          for (var col = 0; col < GridBuilder._columns; col++) {

            var node = new GridNode(new Coordinate(
              col * GridBuilder._nodePixelOffset + GridBuilder._nodePixelOffset / 2,
              row * GridBuilder._nodePixelOffset + GridBuilder._nodePixelOffset / 2
            ), index)
            var block = storm.GetBlockByCoordinate(node.coordinate)

            if (block != undefined)
              node.block = block

            nodes.push(node)
            index++;
          }
        }
        return nodes;
    }

    static buildEdges = (storm: EventStormViewModel) => {

      var edges: GridEdge[] = []

      storm.edges.forEach(edge => {
        edges.push(new GridEdge({edge}))
      })

      return edges 
    }

    static Build = (storm: EventStormViewModel) => {

        const nodes = GridBuilder.buildNodes(storm);
        const edges = GridBuilder.buildEdges(storm);

        return new Grid(nodes, edges)
    }
}

