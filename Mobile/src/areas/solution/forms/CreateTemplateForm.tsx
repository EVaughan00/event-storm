import React, { FunctionComponent } from 'react';
import { KeyboardAvoidingView, StyleSheet } from 'react-native';
import { CustomButton } from '../../../components/CustomButton';
import { Form } from '../../../components/FormElement';
import { Typography } from '../../../components/Typography';
import SolutionViewModel from '../../../services/solution/models/SolutionViewModel';
import { TemplateDTO } from '../../../services/template/models/TemplateDTO';
import { TemplateService } from '../../../services/template/TemplateService';
import theme from '../../../theme';

interface Props {
    solution: SolutionViewModel
    onFinish:() => void
}

const CreateTemplate: FunctionComponent<Props> = props => {

    const [ template ]  = React.useState(new TemplateDTO());
    const solution = props.solution
    
    const handleSubmit = () => {  
        template.solutionId = solution.id
        return TemplateService.createTemplate(template)
            .then(() => props.onFinish());
    }

    return (
        <KeyboardAvoidingView behavior="height">
            <Form model={template} onSubmit={handleSubmit}>
                <Form.Item field="name">
                    <Form.Input defaultValue={solution.name + " Template"} size="small" autoCapitalize="none" label="Name" />
                </Form.Item>
                <Form.Item field="description">
                    <Form.TextArea defaultValue={solution.description} size="large" label="Description" />
                </Form.Item>
                <Typography.SubTitle style={styles.developerToolbox} level={2}>Remember</Typography.SubTitle>
                { solution.useEventStorm &&
                    <Form.Item  field="useEventStorm">
                        <Form.ToolCheckbox defaultValue={true} area="event-storm" />
                    </Form.Item>
                }
                { solution.useModelRepository && 
                    <Form.Item field="useModelRepository">
                        <Form.ToolCheckbox defaultValue={true} area="model-repository" />
                    </Form.Item>
                }
                { solution.useTaskStack &&
                    <Form.Item field="useTaskStack">
                        <Form.ToolCheckbox defaultValue={true} area="task-stack" />
                    </Form.Item>
                }
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

export { CreateTemplate };

