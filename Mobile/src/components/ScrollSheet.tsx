import { View, StyleSheet, Dimensions, ScrollView } from "react-native";
import React from "react";

interface SheetProps {
  children?: any;
}

export default function ScrollSheet(props: SheetProps) {
  return (
    <View style={styles.container}>
      {props.children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: Dimensions.get("window").width,
    minHeight: Dimensions.get("window").height - 240,
    alignItems: 'center',
    backgroundColor: "#FFF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingVertical: 20
  },
});
