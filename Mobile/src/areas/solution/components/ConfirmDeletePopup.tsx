import * as React from "react";
import { FunctionComponent } from "react";
import { StyleSheet, View } from "react-native";
import { AppStore } from "../../../AppStore";
import { CustomButton } from "../../../components/CustomButton";
import { Typography } from "../../../components/Typography";

interface Props {
  onConfirm: () => void;
}

export const ConfirmDeletePopup: FunctionComponent<Props> = (props) => {
  const [store, storeActions] = AppStore.solution.use();

  return (
    <View style={styles.container}>
      <Typography.Title align="center" level={3}>
        Are you sure you'd like to delete {store.currentSolution.name}?
      </Typography.Title>
      <CustomButton size="default" color="primary" onPress={props.onConfirm}>
        Confirm
      </CustomButton>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 200,
    width: 300,
    padding: 20,
    borderRadius: 20,
    backgroundColor: "white",
    justifyContent: "space-evenly",
  },
});
