import React, { FunctionComponent, ReactElement } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ImageDetail from "./ImageDetail";


interface Props {
  titleElements: ReactElement
  image: ReactElement
  onPress: () => void;
}

export const CardWrapper: FunctionComponent<Props> = props => {

  return (
    <TouchableOpacity
      style={styles.touchableOpacity}
      onPress={() => props.onPress()}
    >
      <View style={styles.container}>
          <View style={styles.containerTop}>
            {props.titleElements}
          </View>
          <View style={styles.containerBottom}>
            {props.image}
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
  containerTop: {
    width: "100%",
    flex: 1,
    paddingHorizontal: 5,
  },
  containerBottom: {
    width: "100%",
    flex: 3,
    alignItems: "center",
    backgroundColor: "#AAA",
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
  },
});
