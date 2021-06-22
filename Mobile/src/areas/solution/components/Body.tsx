import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import { FunctionComponent, useState } from "react";
import { StyleSheet, View } from "react-native";
import { AppStore } from "../../../AppStore";
import { CustomButton } from "../../../components/CustomButton";
import { Popup } from "../../../components/Popup";
import { TemplateService } from "../../../services/template/TemplateService";
import theme from "../../../theme";
import { CreateTemplate } from "../forms/CreateTemplateForm";
import AreaStack from "./AreaStack";

interface Props {}

export const SolutionBody: FunctionComponent<Props> = (props) => {
  const navigation = useNavigation();
  const [store, storeActions] = AppStore.solution.use();
  const [home, homeActions] = AppStore.home.use();
  const [creatingTemplate, viewCreateTemplateForm] = useState(false);

  const handleClosePopup = () => {
    homeActions.updateTemplateCards(true)
    viewCreateTemplateForm(false);
  };

  return (
    <View>
      <Popup
        title={`Template Solution`}
        visible={creatingTemplate}
        onClose={() => viewCreateTemplateForm(false)}
        scrollable
      >
        <CreateTemplate
          solution={store.currentSolution}
          onFinish={handleClosePopup}
        />
      </Popup>
      <CustomButton onPress={() => viewCreateTemplateForm(true)} size="small">
        Template Solution
      </CustomButton>
      <AreaStack type={"select"}></AreaStack>
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
});
