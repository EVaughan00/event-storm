import { useNavigation } from "@react-navigation/native";
import React, { FunctionComponent, useState } from "react";
import { View } from "react-native";
import { AppStore } from "../../../AppStore";
import { FloatingAddButton } from "../../../components/FloatingAddButton";
import { Popup } from "../../../components/Popup";
import { SolutionDTO } from "../../../services/solution/models/SolutionDTO";
import { SolutionService } from "../../../services/solution/SolutionService";
import { CreateSolution } from "../forms/CreateSolutionForm";

interface Props {}

const HomeFooter: FunctionComponent<Props> = (props) => {
  const [creatingSolution, viewCreateSolutionForm] = useState(false);
  const [home, homeActions] = AppStore.home.use();
  const navigation = useNavigation()

  const handleCreateSolution = name => {
    viewCreateSolutionForm(false)
    homeActions.updateSolutionCards(true)

    SolutionService.getSolutionByName(name)
      .then(data => {
          navigation.navigate("Solution", {
            solution: new SolutionDTO().copy(data.model.result).Map()
          }
        )
      }
    )
  }

  return (
    <View>
      <Popup
        title={`New Solution`}
        visible={creatingSolution}
        onClose={() => viewCreateSolutionForm(false)}
        scrollable
      >
        <CreateSolution onFinish={handleCreateSolution} />
      </Popup>

      <FloatingAddButton
        onPress={() => viewCreateSolutionForm(true)}
        hide={home.currentCardSection != 0}
        showOnUpdate={home.currentCardSection}
        beginScroll={home.beginVerticalScroll}
        activeScroll={(home.verticalScroll as any)._value}
      />
    </View>
  );
};

export { HomeFooter };
