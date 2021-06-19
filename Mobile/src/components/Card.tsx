import React, { FunctionComponent } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Chip } from "react-native-paper";
import { Typography } from "./Typography";

export interface CardableItem {
  name: string
  id: string;
  image?: string;
}

interface Props {
  item: CardableItem
  onPress: () => void;
}

export const Card: FunctionComponent<Props> = props => {

  return (
    <TouchableOpacity
      style={styles.touchableOpacity}
      onPress={() => props.onPress()}
    >
      <View style={styles.container}>
          <View style={styles.containerTop}>
            <Typography.Title level={2}>{props.item.name}</Typography.Title>
            <Chip style={styles.chip}>STATUS</Chip>
        </View>
          <View style={styles.containerBottom}>
            {props.item.image}
          </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  touchableOpacity: {
    alignItems: "center",
    borderWidth: 0,
    borderRadius: 8,
    borderColor: "#9E9E9E",
    width: 350,
    height: 350,
    marginVertical: 15,
    backgroundColor: "white",
    elevation: 10,
  },
  container: {
    height: "100%",
    width: "100%",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
  },
  containerBottom: {
    width: "100%",
    flex: 3,
    alignItems: "center",
    backgroundColor: "#AAA",
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
  },
  chip: {
    backgroundColor: "#00B3A6",
    alignItems: "center",
  },
  titleContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
  },
  containerTop: {
    width: "100%",
    flex: 1,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    alignItems: "center",
  },
});
