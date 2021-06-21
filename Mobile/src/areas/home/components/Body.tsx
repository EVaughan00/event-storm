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
      homeActions.updateSolutionCards(false)
      setLoadingSolutions(false)
    },[home.updatedSolutionCards])

  const templates = useTemplateMapper(() => {
        homeActions.updateTemplateCards(false)
        setLoadingTemplates(false)
      },[home.updatedTemplateCards])

  const onRefreshSolutions = useCallback(() => {
        setLoadingSolutions(true)
        homeActions.updateSolutionCards(true)
      },[],
  )
  const onRefreshTemplates = useCallback(() => {
      setLoadingTemplates(true)
      homeActions.updateTemplateCards(true)
    },[],
  )

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
          onRefresh={onRefreshSolutions}
        />
        <CardSection
          onSelectCard={handleTemplateCardSelection}
          index={1}
          name={"template"}
          data={templates}
          loading={loadingTemplates}
          onRefresh={onRefreshTemplates}
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
