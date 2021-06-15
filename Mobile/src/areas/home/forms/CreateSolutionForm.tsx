import React, { FunctionComponent } from 'react';
import { KeyboardAvoidingView, StyleSheet } from 'react-native';
import { AppStore } from '../../../AppStore';
import { CustomButton } from '../../../components/CustomButton';
import { Form } from '../../../components/FormElement';
import { Typography } from '../../../components/Typography';
import { SolutionDTO } from '../../../services/solution/models/SolutionDTO';
import { SolutionService } from '../../../services/solution/SolutionService';
import theme from '../../../theme';
import { ToolCheckbox } from './ToolCheckbox';

interface Props {
    onFinish:() => void
}

const CreateSolution: FunctionComponent<Props> = props => {

    const [ solution ]  = React.useState(new SolutionDTO());

    const [ account ] = AppStore.account.use();

    const handleSubmit = () => {          

        var userId = account.user ? account.user.id : ""
        
        return SolutionService.createSolution(solution)
            .then(() => props.onFinish());
    }

    return (
        <KeyboardAvoidingView behavior="height">
            <Form model={solution} onSubmit={handleSubmit}>
                <Form.Item field="name">
                    <Form.Input size="small" autoCapitalize="none" label="Name" />
                </Form.Item>
                <Form.Item field="description">
                    <Form.TextArea size="large" label="Description" />
                </Form.Item>
                <Typography.Title level={2}>Developer Toolbox</Typography.Title>
                <Form.Item field="useEventStorm">
                    <ToolCheckbox area="event-storm" />
                </Form.Item>
                <Form.Item field="useModelRepository">
                    <ToolCheckbox area="model-repository" />
                </Form.Item>
                <Form.Item field="useTaskStack">
                    <ToolCheckbox area="task-stack" />
                </Form.Item>
                <Form.Item field="submit">
                    <CustomButton ripple size="small" >Submit</CustomButton>
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
    }
});

export { CreateSolution };

