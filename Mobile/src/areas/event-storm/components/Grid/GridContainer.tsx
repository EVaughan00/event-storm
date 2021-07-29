import React, {
  createContext,
  FunctionComponent,
  useEffect,
  useState,
} from "react";
import { StyleSheet, View } from "react-native";
import { AppStore } from "../../../../AppStore";
import { CustomButton } from "../../../../components/CustomButton";
import { Typography } from "../../../../components/Typography";
import EventStormViewModel from "../../../../services/eventStorm/models/EventStormViewModel";
import { GridBuilder, GridSettings } from "../../helpers/GridBuilder";
import { IGridContext, GridContext } from "./Grid";
import { GridNode } from "./GridNode";

interface Props {
  loading: boolean;
  eventStorm: EventStormViewModel | undefined;
  onCreatingEventBlock: (creating: boolean) => void;
}

const settings = new GridSettings();
const gridBuilder = new GridBuilder({ settings });

export const GridContainer: FunctionComponent<Props> = (props) => {
  const [zoomed, setZoomed] = useState(false);
  const [panning, setPanning] = useState(false);
  const [showGridArrows, setShowGridArrows] = useState(false);
  const [showCreateBlockButton, setShowCreateBlockButton] = useState(false);
  const [selectedNode, selectNode] = useState<GridNode | undefined>(undefined);

  const [state, actions] = AppStore.eventStorm.use()

  const gridContext = {
    zoomed: zoomed,
    panning: panning,
    settings: settings,
    selectedNode: selectedNode,
    showGridArrows: showGridArrows,
    setZoomed: setZoomed,
    selectNode: selectNode,
    setPanning: setPanning,
    setShowGridArrows: setShowGridArrows,
  };

  useEffect(() => {
    const node = gridContext.selectedNode;
    if (node) setShowCreateBlockButton(true);
  }, [gridContext.selectedNode]);

  const handleCreateEventBlock = () => {
    actions.setCurrentGridNode(selectedNode!);
    props.onCreatingEventBlock(true);
  };

  useEffect(() => {
    if (props.eventStorm)
      gridBuilder.updateNodes(props.eventStorm.blocks)
  }, [props.eventStorm])

  return (
    <View style={styles.container}>
      {props.loading ? (
        <Typography.Paragraph style={styles.loading}>
          Loading grid...
        </Typography.Paragraph>
      ) : (
        <GridContext.Provider value={gridContext}>
          {gridBuilder.build()}
        </GridContext.Provider>
      )}
      {showCreateBlockButton && (
        <View style={styles.buttonContainer}>
          <CustomButton onPress={handleCreateEventBlock}>
            Create New Event Block
          </CustomButton>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#C4C4C4",
    overflow: "hidden",
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    position: "absolute",
    top: "85%",
    width: "80%",
  },
  loading: {
    alignSelf: "center",
  },
});
