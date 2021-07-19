import React, { FunctionComponent, useEffect, useState } from "react";
import {
  StyleSheet,


  View
} from "react-native";
import { AppStore } from "../../../AppStore";
import { CustomButton } from "../../../components/CustomButton";
import { EventStormService } from "../../../services/eventStorm/EventStormService";
import { EventStormDTO } from "../../../services/eventStorm/models/EventStormDTO";
import EventStormViewModel from "../../../services/eventStorm/models/EventStormViewModel";
import { Grid } from "./Grid/Grid";
import { GridNode } from "./Grid/GridNode";

interface Props {
}

export const GridContainer: FunctionComponent<Props> = props => {

  const [showCreateBlockButton, setShowCreateBlockButton] = useState(false);
  const [selectedNode, setSelectedNode] = useState<GridNode | undefined>(undefined);
  const [eventStorm, setEventStorm] = useState<EventStormViewModel | undefined>(undefined);
  const [state, actions] = AppStore.eventStorm.use()

  useEffect(() => {
    if (state.updatedEventStorm) 
      EventStormService.getBySolution(state.currentSolution.id)
          .then((data) => {
            setEventStorm(new EventStormDTO().copy(data.model.result).Map())
          }
        )
  }, [state.updatedEventStorm])

  const handleNodeSelected = (node: GridNode | undefined) => {
    if (node) {
      setSelectedNode(node);
      setShowCreateBlockButton(!node.hasBlock && node.isSelected);
    } else {
      setShowCreateBlockButton(false)
    }
  }

  const handleCreateEventBlock = () => {
    selectedNode!.hasBlock=true
    setShowCreateBlockButton(false)
  };

  return (
    <View style={styles.container}>
        <Grid
          eventStorm={undefined}
          onSelectNode={handleNodeSelected}
        />
        {showCreateBlockButton && (
          <View style={styles.buttonContainer}>
            <CustomButton onPress={handleCreateEventBlock}>
              <>Create New Event Block</>
            </CustomButton>
          </View>
        )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: "black",
    backgroundColor: "grey",
    overflow: "hidden",
    height: '90%',
    width: '90%'
  },
  buttonContainer: {
    position: 'absolute',
    justifyContent: 'center',
    top: "90%",
    width: '100%'
  }
});
