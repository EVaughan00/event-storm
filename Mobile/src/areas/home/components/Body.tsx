import React, { FunctionComponent, useEffect, useState } from "react";
import { Dimensions, SafeAreaView, StyleSheet, View } from "react-native";
import { AppStore } from "../../../AppStore";
import { CardSection } from "../../../components/CardSection";
import { CardSectionSwitch } from "../../../components/CardSectionSwitch";
import SolutionViewModel from "../../../services/solution/models/SolutionViewModel";
import { SolutionDTO } from "../../../services/solution/models/SolutionDTO";
import { SolutionService } from "../../../services/solution/SolutionService";
import TemplateViewModel from "../../../services/template/models/TemplateViewModel";
import { TemplateDTO } from "../../../services/template/models/TemplateDTO";
import { TemplateService } from "../../../services/template/SolutionService";
import { useNavigation } from "@react-navigation/native";
import { AppStack } from "../../../AppNavigation";

interface Props {}

const HomeBody: FunctionComponent<Props> = (props) => {
  const [home, homeActions] = AppStore.home.use();
  const [solutions, setSolutions] = useState<Array<SolutionViewModel>>([]);
  const [templates, setTemplates] = useState<Array<TemplateViewModel>>([]);

  const [loadingSolutions, setLoadingSolutions] = useState(false);
  const [loadingTemplates, setLoadingTemplates] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    setLoadingSolutions(true);
    SolutionService.getSolutions()
      .then((data) =>
        setSolutions(
          data.model.result.map((dto) => new SolutionDTO().copy(dto).Map())
        )
      )
      .then(() => setLoadingSolutions(false));
    return homeActions.updateSolutionCards(false);
  }, [home.updatedSolutionCards]);

  useEffect(() => {
    setLoadingTemplates(true);
    TemplateService.getTemplates()
      .then((data) =>
        setTemplates(
          data.model.result.map((dto) => new TemplateDTO().copy(dto).Map())
        )
      )
      .then(() => setLoadingTemplates(false));
    return homeActions.updateTemplateCards(false);
  }, [home.updatedTemplateCards]);

  const handleSolutionCardSelection = (solution) => {
    navigation.navigate("Solution", { solution: solution });
  };

  const handleTemplateCardSelection = (template) => {};

  return (
    <View style={[style.container]}>
      <CardSectionSwitch
        currentSection={home.currentCardSection}
        collapseOffset={Dimensions.get("window").height * 0.2}
        selectSection={homeActions.selectCardSection}
        onScroll={homeActions.updateVerticalScroll}
        onScrollBegin={homeActions.updateBeginVerticalScroll}
      >
        <CardSection
          onSelectCard={handleSolutionCardSelection}
          index={0}
          name={"solution"}
          data={solutions}
          loading={loadingSolutions}
        />
        <CardSection
          onSelectCard={handleTemplateCardSelection}
          index={1}
          name={"template"}
          data={templates}
          loading={loadingTemplates}
        />
      </CardSectionSwitch>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    marginTop: 100,
  },
});

export { HomeBody };
