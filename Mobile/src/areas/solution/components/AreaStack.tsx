import * as React from "react";
import { StyleSheet, View } from "react-native";
import { useTheme } from "react-native-paper";
import { ToolCheckbox } from "../../../components/Form/Custom/ToolCheckbox";

interface AreaSelectStackProps {
  type: "creation" | "select";
}

export default function AreaSelectStack(props: AreaSelectStackProps) {
  const { colors } = useTheme();

  if (props.type == "creation") {
    return (
      <View>
        <ToolCheckbox area="event-storm" />
        <ToolCheckbox area="model-repository" />
        <ToolCheckbox area="task-stack" />
      </View>
    );
  }

  return (
    <View>
        <ToolCheckbox area="event-storm" />
        <ToolCheckbox area="model-repository" />
        <ToolCheckbox area="task-stack" />
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    textAlign: "left",
    paddingBottom: 0,
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: 20,
    lineHeight: 24,
    letterSpacing: 0.15,
    color: "rgba(0, 0, 0, 0.87)",
  },
  divider: {
    marginTop: -13,
    height: 8,
    borderRadius: 8,
    width: "95%",
  },
});
