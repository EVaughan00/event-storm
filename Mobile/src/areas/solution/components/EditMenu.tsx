import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import { FunctionComponent } from "react";
import { StyleSheet, View } from "react-native";

interface Props {
}

export const EditMenu: FunctionComponent<Props> = (props) => {

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 200,
    width: 300,
    borderRadius: 20,
    backgroundColor: 'white'
  },
});
