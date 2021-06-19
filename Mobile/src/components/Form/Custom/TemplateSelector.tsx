import * as React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Title } from "react-native-paper";
import { TemplateDTO } from "../../../services/template/models/TemplateDTO";
import TemplateViewModel from "../../../services/template/models/TemplateViewModel";
import { TemplateService } from "../../../services/template/SolutionService";
import theme from "../../../theme";
import { FormItemProps } from "../../FormElement";
import { List } from "../../List";
import { Popup } from "../../Popup";
import { Typography } from "../../Typography";

interface Props {
  onSelect: (template: TemplateViewModel) => void;
  selected?: TemplateViewModel;
}

const TemplateSelector: React.FunctionComponent<Props> = (props) => {
  const [selectingTemplate, setSelectingTemplate] = React.useState(false);
  const [templates, setTemplates] = React.useState<TemplateViewModel[]>([]);

  const handleSelectTemplate = (id) => {
    props.onSelect(templates.find((template) => template.id == id)!);
    handleClosePopup();
  };

  const handleClosePopup = () => {
    setSelectingTemplate(false);
  };

  React.useEffect(() => {
    TemplateService.getTemplates().then((data) => {
      setTemplates(
        data.model.result.map((dto) => new TemplateDTO().copy(dto).Map())
      );
    });
  }, [selectingTemplate]);

  const dynamicStyles = {
    container: {
      backgroundColor: props.selected ? "white" : "#CCCCCC"
    }
  }

  return (
    <View>
      <Popup
        title={`New Solution`}
        visible={selectingTemplate}
        onClose={() => handleClosePopup()}
        scrollable
      >
        <List
          data={templates}
          onSelect={handleSelectTemplate}
          searchLabel="Find a template..."
        />
      </Popup>

      <TouchableOpacity
        style={[styles.container, dynamicStyles.container]}
        onPress={() => setSelectingTemplate(true)}
      >
        { props.selected ? 
          <Selected template={props.selected}/>
          :
          <Unselected />
        }
      </TouchableOpacity>
    </View>
  );
};

interface SelectedProps { template: TemplateViewModel }

const Selected: React.FunctionComponent<SelectedProps> = props => {

    return (
      <>
        <View style={styles.containerLeft}></View>
        <View style={styles.containerRight}>
          <Typography.Title style={styles.title} level={2}>
            {props.template.name}
          </Typography.Title>
        </View>
      </>
    )
}


interface Unselected {}

const Unselected: React.FunctionComponent<Unselected> = props => {

    return (
      <>
          <View style={styles.containerLeft}>
            <Title style={styles.plus}>+</Title>
          </View>
          <View style={styles.containerRight}>
            <Typography.Title style={styles.title} level={2}>
              Select a Template
            </Typography.Title>
          </View>
      </>
    )
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 0.5,
    borderRadius: 8,
    borderColor: "#DBDBDB",
    width: "100%",
    height: 100,
    padding: 5,
    elevation: 5,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginBottom: theme.unit * 2,
  },
  containerLeft: {
    marginLeft: 10,
    height: 80,
    width: 80,
    backgroundColor: "#BBBBBB",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  containerRight: {
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 20,
  },
  plus: {
    fontSize: 40,
    color: "#AAAAAA",
    lineHeight: 40,
  },
  title: {
    marginBottom: 0,
    opacity: 0.7,
  },
});

export { TemplateSelector };
