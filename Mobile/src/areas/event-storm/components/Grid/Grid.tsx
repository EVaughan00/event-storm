import React, {
  createContext,
  FunctionComponent,
  useContext,
  useEffect,
  useState
} from "react";
import { StyleSheet, View } from "react-native";
import Svg from "react-native-svg";
import { AppStore } from "../../../../AppStore";
import { WebSocketContext } from "../../../../providers/WebSocketProvider";
import { EventStormService } from "../../../../services/eventStorm/EventStormService";
import Coordinate from "../../../../services/eventStorm/models/Coordinate";
import { EventBlockDTO } from "../../../../services/eventStorm/models/EventBlockDTO";
import { GridSettings } from "../../helpers/GridBuilder";
import PanWrapper from "../../helpers/PanWrapper";
import { ArrowNavigation, Direction } from "./ArrowNavigation";
import { GridNode } from "./GridNode";

interface Props {
  nodes: JSX.Element[];
}

export interface IGridContext {
  zoomed: boolean
  selectedNode: GridNode | undefined
  panning: boolean
  showGridArrows: boolean
  settings: GridSettings
  setZoomed: (zoomed: boolean) => void
  selectNode: (node: GridNode) => void
  setPanning: (panning: boolean) => void
  setShowGridArrows: (showArrows: boolean) => void
}

export const GridContext = createContext<IGridContext>({} as IGridContext)

export const Grid: FunctionComponent<Props> = (props) => {

  const gridContext = useContext(GridContext);
  const [previousNode, setPreviousNode] = useState<GridNode | undefined>(undefined);

  useEffect(() => {
    const node = gridContext.selectedNode;

    if (node) {
      if (previousNode && previousNode != node)
        previousNode.isSelected = false

      gridContext.setShowGridArrows(node.isSelected);
      setPreviousNode(node);
    }

  }, [gridContext.selectedNode]);

  const handleArrowNavigation = (direction: Direction) => {
    console.log(direction);
    if (!handleAvailableDirection(direction)) return;
  };

  const handleAvailableDirection = (direction: Direction) => {
    switch (direction) {
      case Direction.Right:
        return (
          gridContext.selectedNode!.coordinate.x <
          gridContext.settings.size - gridContext.settings.nodePixelOffset
        );
      case Direction.Left:
        return (
          gridContext.selectedNode!.coordinate.x > gridContext.settings.nodePixelOffset
        );
      case Direction.Up:
        return (
          gridContext.selectedNode!.coordinate.y > gridContext.settings.nodePixelOffset
        );
      default:
        return (
          gridContext.selectedNode!.coordinate.y <
          gridContext.settings.size - gridContext.settings.nodePixelOffset
        );
    }
  };

  const styles = StyleSheet.create({
    grid: {
      zIndex: -1,
      width: gridContext.settings.size,
      height: gridContext.settings.size,
    },
  });

  return (
    <PanWrapper
      size={gridContext.settings.size}
      zoomScale={1.5}
      zoomed={gridContext.zoomed}
      defaultCoordinate={previousNode ? previousNode.coordinate : new Coordinate(0,0)}
      panToCoordinate={gridContext.selectedNode?.coordinate}
    >
      {gridContext.zoomed && (
          <ArrowNavigation
            canMoveDirection={handleAvailableDirection}
            scale={1}
            onPress={handleArrowNavigation}
            coordinate={
              new Coordinate(
                gridContext.selectedNode!.coordinate.x,
                gridContext.selectedNode!.coordinate.y
              )
            }
          />
        )}
      <View style={styles.grid}>
        <Svg>{props.nodes}</Svg>
      </View>
    </PanWrapper>
  );
};
