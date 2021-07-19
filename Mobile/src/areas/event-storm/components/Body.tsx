import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import { FunctionComponent } from "react";
import { StyleSheet, View } from "react-native";
import { GridContainer } from "./GridContainer";

interface Props {}

export const EventStormBody: FunctionComponent<Props> = (props) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <GridContainer/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
    width: '100%',
    height: '90%',
    justifyContent: 'center',
    alignItems: 'center'
  },
});
