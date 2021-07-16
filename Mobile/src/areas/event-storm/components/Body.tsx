import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import { FunctionComponent, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { AppStore } from "../../../AppStore";
import { CustomButton } from "../../../components/CustomButton";
import { Popup } from "../../../components/Popup";
import { EventStormService } from "../../../services/eventStorm/EventStormService";
import { EventStormDTO } from "../../../services/eventStorm/models/EventStormDTO";
import EventStormViewModel from "../../../services/eventStorm/models/EventStormViewModel";
import theme from "../../../theme";
import HomeScreen from "../../home/screens/HomeScreen";
import GridBuilder, { GridContext } from "../helpers/GridBuilder";
import { Grid } from "./Grid";
import GridNode from "./GridNode";

interface Props {}

export const EventStormBody: FunctionComponent<Props> = (props) => {
  const navigation = useNavigation();

  const [showCreateBlockButton, setShowCreateBlockButton] = useState(false);
  const [grid, setGrid] = useState<Grid | undefined>(undefined);
  const [store, actions] = AppStore.eventStorm.use();

  useEffect(() => {
    EventStormService.getBySolution(store.currentSolution.id).then((data) => {
      const eventStorm = new EventStormDTO().copy(data.model.result).Map()
      setGrid(
        GridBuilder.Build(eventStorm)
      );
    });
    return actions.updateGrid(false);
  }, [store.updatedGrid]);

  useEffect(() => {
    const node = store.selectedNode;

    if (node) {
      setShowCreateBlockButton(!node.hasBlock && node.isSelected);
    }
  }, [store.selectedNode]);

  const handleCreateEventBlock = () => {
    store.selectedNode!.hasBlock = true;
    setShowCreateBlockButton(false);
    actions.updateGrid(true);
  };

  return (
    <View>
      {grid}
      {showCreateBlockButton && (
        <CustomButton onPress={handleCreateEventBlock}>
          <>Create New Event Block</>
        </CustomButton>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: theme.unit * 1,
  },
});
