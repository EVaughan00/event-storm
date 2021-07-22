import { useNavigation } from "@react-navigation/native";
import React, { FunctionComponent, useCallback, useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { AppStore } from "../../../AppStore";
import { CardSection } from "../../../components/CardSection";
import { CardSectionSwitch } from "../../../components/CardSectionSwitch";
import { useSolutionMapper, useTemplateMapper } from "../../../helpers/hooks";

interface Props {}

const HomeBody: FunctionComponent<Props> = (props) => {
  const [home, homeActions] = AppStore.home.use();

  const [loadingSolutions, setLoadingSolutions] = useState(false);
  const [loadingTemplates, setLoadingTemplates] = useState(false);

  const navigation = useNavigation();

  const solutions = useSolutionMapper(() => {
    if (home.updatedSolutionCards) homeActions.updateSolutionCards(false);
    setLoadingSolutions(false);
  }, [home.updatedSolutionCards]);

  const templates = useTemplateMapper(() => {
    if (home.updatedTemplateCards) homeActions.updateTemplateCards(false);
    setLoadingTemplates(false);
  }, [home.updatedTemplateCards]);

  const onRefreshSolutions = useCallback(() => {
    setLoadingSolutions(true);
    homeActions.updateSolutionCards(true);
  }, []);

  const onRefreshTemplates = useCallback(() => {
    setLoadingTemplates(true);
    homeActions.updateTemplateCards(true);
  }, []);

  const handleSolutionCardSelection = (solution) => {
    navigation.navigate("Solution", { solution: solution });
  };

  const handleTemplateCardSelection = (template) => {};

  return (
    <View style={[style.container]}>
      <CardSectionSwitch
        currentSection={home.currentCardSection}
        onScroll={homeActions.updateVerticalScroll}
        selectSection={homeActions.selectCardSection}
        onScrollEnd={homeActions.updateEndVerticalScroll}
        onScrollBegin={homeActions.updateBeginVerticalScroll}
        collapseOffset={Dimensions.get("window").height * 0.2}
      >
        <CardSection
          index={0}
          data={solutions}
          name={"solution"}
          loading={loadingSolutions}
          onRefresh={onRefreshSolutions}
          onSelectCard={handleSolutionCardSelection}
        />
        <CardSection
          index={1}
          data={templates}
          name={"template"}
          loading={loadingTemplates}
          onRefresh={onRefreshTemplates}
          onSelectCard={handleTemplateCardSelection}
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
