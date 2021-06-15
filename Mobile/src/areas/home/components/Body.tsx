import React, { FunctionComponent, useEffect, useState } from "react";
import { Dimensions, SafeAreaView, StyleSheet, View } from "react-native";
import { AppStore } from "../../../AppStore";
import { CardSection } from "../../../components/CardSection";
import { CardSectionSwitch } from "../../../components/CardSectionSwitch";
import Solution from "../../../services/solution/viewmodels/Solution";
import { SolutionDTO } from "../../../services/solution/models/SolutionDTO";
import { SolutionService } from "../../../services/solution/SolutionService";
import Template from "../../../services/template/models/Template";
import { TemplateDTO } from "../../../services/template/models/TemplateDTO";
import { TemplateService } from "../../../services/template/SolutionService";

interface Props {
}

const HomeBody: FunctionComponent<Props> = (props) => {

  const [home, homeActions] = AppStore.home.use();
  const [solutions, setSolutions] = useState<Array<Solution>>([])
  const [templates, setTemplates] = useState<Array<Template>>([])

  const [loadingSolutions, setLoadingSolutions] = useState(false)
  const [loadingTemplates, setLoadingTemplates] = useState(false)


  useEffect(() => {
    setLoadingSolutions(true)
    var solutions = new Array<Solution>()
    SolutionService.getSolutions()
    .then(data => data.model.result.forEach(solution => {
        solutions.push(new SolutionDTO().copy(solution).Map())
    }))
    .then(() => setSolutions(solutions))
    .then(() => setLoadingSolutions(false))
    return homeActions.updateSolutionCards(false)
  }, [home.updatedSolutionCards])


  useEffect(() => {
    setLoadingTemplates(true)
    var templates = new Array<Template>()
    TemplateService.getTemplates()
    .then(data => data.model.result.forEach(template => {
        templates.push(new TemplateDTO().copy(template).Map())
    }))
    .then(() => setTemplates(templates))
    .then(() => setLoadingTemplates(false))
    return homeActions.updateTemplateCards(false)
  }, [home.updatedTemplateCards])


  return (
    <View style={[style.container]}>
      <SafeAreaView>
      <CardSectionSwitch
        currentSection={home.currentCardSection}
        collapseOffset={Dimensions.get('window').height * 0.2}
        selectSection={homeActions.selectCardSection}
        onScroll={homeActions.updateVerticalScroll}
        onScrollBegin={homeActions.updateBeginVerticalScroll}
      >
        <CardSection index={0} name={"solution"} data={solutions} loading={loadingSolutions}/>
        <CardSection index={1} name={"template"} data={templates} loading={loadingTemplates}/>
      </CardSectionSwitch>
      </SafeAreaView>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    marginTop: 100,
  },
});

export { HomeBody };
