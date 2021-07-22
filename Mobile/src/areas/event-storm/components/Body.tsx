import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import { FunctionComponent, useState } from "react";
import { StyleSheet, View } from "react-native";
import { MaterialInput } from "../../../components/Form/Material/MaterialInput";
import { GridContainer } from "./GridContainer";

interface Props {}

export const EventStormBody: FunctionComponent<Props> = (props) => {
  const navigation = useNavigation();

  const [showCreatingEventBlock, setShowCreatingEventBlock] = useState(false)
  const [searchFilter, setSearchFilter] = useState("")

  return (
    <View style={styles.container}>
      <MaterialInput 
        size="small"
        borderless
        style={styles.input}
        value={searchFilter}
        onUpdate={setSearchFilter}
        label="Search for an event block..."
      />
      <GridContainer 
        onCreatingEventBlock={setShowCreatingEventBlock}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '90%',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  input: {
    marginTop: 20,
    width: "90%",
    elevation: 10,
    backgroundColor: "#fff",
    borderRadius: 8
  }
});
