import React, { FunctionComponent } from 'react';
import { KeyboardAvoidingView, StyleSheet } from 'react-native';
import { AppStore } from '../../../AppStore';
import { CustomButton } from '../../../components/CustomButton';
import { TemplateSelector } from '../../../components/Form/Custom/TemplateSelector';
import { Form } from '../../../components/FormElement';
import { Typography } from '../../../components/Typography';
import { SolutionDTO } from '../../../services/solution/models/SolutionDTO';
import SolutionViewModel from '../../../services/solution/models/SolutionViewModel';
import { SolutionService } from '../../../services/solution/SolutionService';
import TemplateViewModel from '../../../services/template/models/TemplateViewModel';
import theme from '../../../theme';

interface Props {
    onFinish: (solutionId: string) => void
}

const CreateSolution: FunctionComponent<Props> = props => {

    const [ solution ]  = React.useState(new SolutionDTO());
    const [selectedTemplate, setSelectedTemplate] = React.useState<TemplateViewModel>()

    const handleSubmit = () => {  
        return SolutionService.createSolution(solution)
            .then(() => props.onFinish(solution.name));
    }

    const handleSelectedTemplate = template => {
        solution.templateId = template.id
        setSelectedTemplate(template)
    }   

    return (
        <KeyboardAvoidingView behavior="height">
            <TemplateSelector selected={selectedTemplate} onSelect={handleSelectedTemplate}/>
            <Form model={solution} onSubmit={handleSubmit}>
                <Form.Item field="name">
                    <Form.Input defaultValue={selectedTemplate?.name} size="small" autoCapitalize="none" label="Name" />
                </Form.Item>
                <Form.Item field="description">
                    <Form.TextArea defaultValue={selectedTemplate?.description} size="large" label="Description" />
                </Form.Item>
                <Typography.SubTitle style={styles.developerToolbox} level={2}>Developer Toolbox</Typography.SubTitle>
                <Form.Item field="useEventStorm">
                    <Form.ToolCheckbox defaultValue={selectedTemplate?.useEventStorm} area="event-storm" />
                </Form.Item>
                <Form.Item field="useModelRepository">
                    <Form.ToolCheckbox defaultValue={selectedTemplate?.useTaskStack} area="model-repository" />
                </Form.Item>
                <Form.Item field="useTaskStack">
                    <Form.ToolCheckbox defaultValue={selectedTemplate?.useModelRepository} area="task-stack" />
                </Form.Item>
                <Form.Item field="submit">
                    <CustomButton ripple size="default" >Submit</CustomButton>
                </Form.Item>
            </Form>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    info: {
        opacity: .7,
    },
    link: {
        position: "relative",
        top: -theme.unit * 2,
        marginBottom: theme.unit * 2
    },
    form: {
        display: "flex",
        height: "100%",
        flexDirection: "column",
        justifyContent: "space-between"
    },
    developerToolbox: {
        marginBottom: theme.unit * 1,
        fontWeight: 'bold'
    }
});

export { CreateSolution };

