import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import { FunctionComponent, useState } from "react";
import { StyleSheet, View } from "react-native";
import { AppStore } from "../../../AppStore";
import { CustomButton } from "../../../components/CustomButton";
import { Grid } from "./Grid/Grid";
import { GridNode } from "./Grid/Node";

interface Props {}

export const EventStormBody: FunctionComponent<Props> = (props) => {
  const navigation = useNavigation();

  const [showCreateBlockButton, setShowCreateBlockButton] = useState(false);
  const [store, actions] = AppStore.eventStorm.use();

  // useEffect(() => {
    // EventStormService.getBySolution(store.currentSolution.id).then((data) => {
    //   const eventStorm = new EventStormDTO().copy(data.model.result).Map()

    // });
  //   return actions.updateGrid(false);
  // }, [store.updatedGrid]);

  // useEffect(() => {
  //   const node = store.selectedNode;

  //   if (node) {
  //     setShowCreateBlockButton(!node.block && node.isSelected);
  //   }
  // }, [store.selectedNode]);

  const handleNodeSelected = (node: GridNode) => {
    
    setShowCreateBlockButton(!node.hasBlock && node.isSelected)

  }

  const handleCreateEventBlock = () => {
    setShowCreateBlockButton(false);
    // actions.updateGrid(true);
  };

  return (
    <View style={styles.container}>
      <Grid 
        onSelectGridNode={handleNodeSelected}
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
    height: "80%",
    width: "90%"
  },
  buttonContainer: {
    position: 'absolute',
    justifyContent: 'center',
    top: "90%",
    width: '100%'
  }
});
