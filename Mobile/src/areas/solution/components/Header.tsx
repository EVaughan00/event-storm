import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import { FunctionComponent, useState } from "react";
import { StyleSheet, View } from "react-native";
import { AppStore } from "../../../AppStore";
import { FloatingPopup } from "../../../components/FloatingPopup";
import { Typography } from "../../../components/Typography";
import { sleep } from "../../../helpers/sleep";
import SvgBackArrow from "../../../icons/BackArrow";
import Dots from "../../../icons/Dots";
import { SolutionService } from "../../../services/solution/SolutionService";
import theme from "../../../theme";
import { ConfirmDeletePopup } from "./ConfirmDeletePopup";
import { EditMenu } from "./EditMenu";

interface Props {}

export const SolutionHeader: FunctionComponent<Props> = (props) => {
  const [showEditMenu, setShowEditMenu] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [store, storeActions] = AppStore.solution.use();
  const [home, homeActions] = AppStore.home.use();

  const navigation = useNavigation();

  const handleConfirmDelete = () => {
    setShowConfirmDelete(true)
  };

  const handleDeleteSolution = () => {
    setShowConfirmDelete(false)
    setShowEditMenu(false)

    SolutionService.deleteSolution(store.currentSolution.id)
      .then(() => homeActions.updateSolutionCards(true))
      .then(() => navigation.goBack())
  }

  return (
    <View>
      <FloatingPopup 
        visible={showEditMenu} 
        onDismiss={() => setShowEditMenu(false)}>
        <EditMenu 
          onEdit={() => {}}
          onTemplate={() => {}}
          onDelete={handleConfirmDelete}
        />
      </FloatingPopup>
      <FloatingPopup 
        visible={showConfirmDelete} 
        onDismiss={() => setShowConfirmDelete(false)}>
        <ConfirmDeletePopup 
          onConfirm={handleDeleteSolution}
        />
      </FloatingPopup>
      <View style={styles.container}>
        <SvgBackArrow
          style={{ color: theme.colors.strong }}
          width={"25"}
          height={"25"}
          onPress={() => navigation.goBack()}
        />
        <Typography.Title style={styles.title} level={2}>
          {store.currentSolution.name}
        </Typography.Title>
        <Dots
          style={{ color: theme.colors.strong }}
          onPress={() => setShowEditMenu(true)}
          width={"30"}
          height={"30"}
        ></Dots>
      </View>
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
