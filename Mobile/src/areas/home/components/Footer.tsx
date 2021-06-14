import React, { FunctionComponent, useEffect, useState } from "react";
import { NativeScrollPoint, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { AppStore } from "../../../AppStore";
import { FloatingAddButton } from "../../../components/FloatingAddButton";
import { Popup } from "../../../components/Popup";
import { HomeLists } from "../../../helpers/consts";
import { CreateSolution } from "../forms/CreateSolutionForm";

interface Props {}

const HomeFooter: FunctionComponent<Props> = (props) => {
  const [creatingSolution, viewCreateSolutionForm] = useState(false);
  const [home, homeActions] = AppStore.home.use();


  const handleClosePopup = () => {
    viewCreateSolutionForm(false)
    homeActions.updateCardSections(true)
  }

  return (
    <View>
      <Popup
        title={`Create new solution`}
        visible={creatingSolution}
        onClose={() => viewCreateSolutionForm(false)}
        scrollable
      >
        <CreateSolution onFinish={handleClosePopup} />
      </Popup>

      <FloatingAddButton
        onPress={() => viewCreateSolutionForm(true)}
        hide={home.currentCardSection != 0}
        showOnUpdate={home.currentCardSection}
        beginScroll={home.beginVerticalScroll.contentOffset}
        activeScroll={home.verticalScroll.contentOffset}
      />
    </View>
  );
};

export { HomeFooter };
