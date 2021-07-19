import * as React from 'react';
import Coordinate from "../../../services/eventStorm/models/Coordinate";
import EventBlockViewModel from "../../../services/eventStorm/models/EventBlockViewModel";
import { GridNode } from "../components/Grid/GridNode";
import { GridSettings } from "../components/Grid/GridSettings";

export class GridBuilder {

    static buildNodes = (blocks: EventBlockViewModel[] | undefined) => {

      var nodes: JSX.Element[] = [];
      var index = 0;

      console.log("Building points")

      for (var row = 0; row < GridSettings.rows; row++) {
        for (var col = 0; col < GridSettings.columns; col++) {

          if (blocks)
            var block = blocks.find(block => block.coordinate.equals({x: row, y: col}))

          var coordinate = new Coordinate(
            row * GridSettings.nodePixelOffset + GridSettings.nodePixelOffset / 2,
            col * GridSettings.nodePixelOffset + GridSettings.nodePixelOffset / 2,
          )

          nodes.push(
            <GridNode
              key={index}
              block={block}
              coordinate={coordinate}
            />
          );

          index++;
        }
      }
      return nodes;
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

