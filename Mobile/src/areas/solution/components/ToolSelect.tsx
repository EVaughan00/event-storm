import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Divider } from "react-native-paper";
import { AppStore } from "../../../AppStore";
import { Typography } from "../../../components/Typography";
import theme from "../../../theme";

interface Props {
  area?: "event-storm" | "model-repository" | "task-stack";
}

const ToolSelect: React.FunctionComponent<Props> = (props) => {
  const [color, setColor] = React.useState(theme.colors.default);
  const [title, setTitle] = React.useState("");
  const [store, actions] = AppStore.solution.use();
  const navigation = useNavigation();

  React.useEffect(() => {
    switch (props.area) {
      case "event-storm":
        setTitle("Event Storm");
        setColor(theme.areaColors.eventStorm);
        break;
      case "model-repository":
        setTitle("Model Repository");
        setColor(theme.areaColors.modelRepository);
        break;
      case "task-stack":
        setTitle("Task Stack");
        setColor(theme.areaColors.taskStack);
        break;
    }
  }, []);

  const handleToolSelected = () => {
    navigation.navigate("EventStorm", {solution: store.currentSolution})
  }

  return (
    <TouchableOpacity
      style={styles.touchableOpacity}
      onPress={handleToolSelected}
    >
      <View style={styles.containerLeft}>
        <Divider style={[styles.divider, { backgroundColor: color }]}></Divider>
        <Typography.SubTitle style={styles.text} level={3}>
          {title}
        </Typography.SubTitle>
      </View>
      <View style={styles.containerRight}>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  touchableOpacity: {
    borderWidth: 0.5,
    borderRadius: 8,
    borderColor: "#DBDBDB",
    width: "100%",
    height: 100,
    padding: 5,
    backgroundColor: "white",
    elevation: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: theme.unit * 1,
  },
  containerLeft: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  containerRight: {
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    paddingBottom: 3,
    marginLeft: 10,
    fontWeight: "bold",
    lineHeight: 24,
    letterSpacing: 0.15,
    color: "rgba(0, 0, 0, 0.87)",
  },
  divider: {
    backgroundColor: "#AAA",
    height: 90,
    borderRadius: 8,
    width: 10,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 5,
    borderWidth: 2,
    marginRight: 10
  },
  checkIcon: {
    width: 20,
    height: 20,
    position: "relative",
    top: -3,
    left: -2,
  },
});

export { ToolSelect };
