import * as React from "react";
import { StyleSheet, View } from "react-native";
import { Card } from "react-native-elements";
import { TouchableOpacity } from "react-native";
import { useTheme } from "react-native-paper";
import Dots from "../../../icons/Dots";

interface AreaSelectCardProps {
  areaTitle: string;
  areaColor: string;
  type: "creation" | "select";
  onPress: () => void;
}

export default function AreaSelectCard(props: AreaSelectCardProps) {
  const [checked, setChecked] = React.useState(false);

  const { roundness } = useTheme();

  const dynamicStyle = StyleSheet.create({
    divider: {
      backgroundColor: props.areaColor,
    },
  });

  return (
    <TouchableOpacity
      style={styles.touchableOpacity}
      onPress={() => props.onPress()}
    >
      <View style={styles.container}>
        <View style={styles.dotsContainer}>
          <Dots onPress={() => {}} width={"30"} height={"30"} />
        </View>

        <Card.Title style={styles.title}>{props.areaTitle}</Card.Title>
        <Card.Divider style={[styles.divider, dynamicStyle.divider]} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  touchableOpacity: {
    alignSelf: "center",
    alignItems: "center",
    margin: 10,
    borderWidth: 0.5,
    borderRadius: 8,
    borderColor: "#DBDBDB",
    width: 375,
    height: 115,
    padding: 10,
    backgroundColor: "white",
    elevation: 5,
  },
  container: {
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    paddingLeft: "5%",
  },
  dotsContainer: {
    alignSelf: "flex-end",
    paddingRight: 5,
    paddingTop: 5,
  },
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
  verticalDivider: {
    height: "90%",
    borderRadius: 8,
    width: 12,
  },
});
