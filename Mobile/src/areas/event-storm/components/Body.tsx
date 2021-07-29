import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import { FunctionComponent, useContext, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { AppStore } from "../../../AppStore";
import { MaterialInput } from "../../../components/Form/Material/MaterialInput";
import { Popup } from "../../../components/Popup";
import { WebSocketContext } from "../../../providers/WebSocketProvider";
import { EventStormService } from "../../../services/eventStorm/EventStormService";
import { EventStormDTO } from "../../../services/eventStorm/models/EventStormDTO";
import EventStormViewModel from "../../../services/eventStorm/models/EventStormViewModel";
import theme from "../../../theme";
import { CreateEventBlock } from "../forms/CreateEventBlock";
import { GridContainer } from "./Grid/GridContainer";

interface Props {}

export const EventStormBody: FunctionComponent<Props> = (props) => {
  const navigation = useNavigation();

  const [showCreatingEventBlock, setShowCreatingEventBlock] = useState(false)
  const [loadingEventStorm, setLoadingEventStorm] = useState(true)
  const [eventStorm, setEventStorm] = useState<EventStormViewModel | undefined>()
  const [searchFilter, setSearchFilter] = useState("")
  const socketContext = useContext(WebSocketContext);
  const { notifications } = socketContext.service.connections;
  const [state, actions] = AppStore.eventStorm.use()

  useEffect(() => {
    // console.log(state.currentSolution)
    if (state.updatedEventStorm) {
      setLoadingEventStorm(true)
      EventStormService.getBySolution(state.currentSolution!.id)
        .then((data) => {
          setEventStorm(new EventStormDTO().copy(data.model).Map());
        })
        .catch((reason) => {
          console.log(reason)
        })
        .finally(() => {
          setLoadingEventStorm(false)
        })
      return actions.updateEventStorm(false);
    }
  }, [state.updatedEventStorm]);

  useEffect(() => {
    notifications.on("blockCreated", 
      () => actions.updateEventStorm(true))
  }, [])

  const handleClosePopup = () => {
    setShowCreatingEventBlock(false)
    // actions.updateEventStorm(true)
  }

  return (
    <View style={styles.container}>
      <Popup
        title={`New Block`}
        visible={showCreatingEventBlock}
        onClose={() => setShowCreatingEventBlock(false)}
        scrollable
      >
        <CreateEventBlock
          solution={state.currentSolution!}
          gridNode={state.currentGridNode}
          onFinish={handleClosePopup}
        />
      </Popup>
      <GridContainer 
        loading={loadingEventStorm}
        eventStorm={eventStorm}
        onCreatingEventBlock={setShowCreatingEventBlock}
      />
      {/* <KeyboardAvoidingView 
        behavior='height'
        style={styles.inputContainer}
        > */}
        <MaterialInput 
          size="small"
          borderless
          style={styles.input}
          value={searchFilter}
          onUpdate={setSearchFilter}
          label="Search for an event block..."
        />
      {/* </KeyboardAvoidingView> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '73%',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  inputContainer: {
    width: '100%',
    height: '100%',
    alignItems: 'center'
  },  
  input: {
    marginTop: theme.unit*2,
    width: "90%",
    elevation: 5,
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'grey'
  }
});
