import * as React from "react";
import { FunctionComponent } from "react";
import { StyleSheet, View } from "react-native";
import theme from "../../../theme";

interface Props {}

export const SolutionHeader: FunctionComponent<Props> = (props) => {


  return (
    <View>
 
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
  title: {
    fontWeight: "normal",
  },
});
