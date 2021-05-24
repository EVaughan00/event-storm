import React, { FunctionComponent } from 'react';
import { KeyboardAvoidingView, StyleSheet } from 'react-native';
import { AppStore } from '../../../AppStore';
import { CustomButton } from '../../../components/CustomButton';
import { Form } from '../../../components/FormElement';
import { SolutionBlueprint } from '../../../services/solution/models/SolutionBlueprint';
import { SolutionService } from '../../../services/solution/SolutionService';
import theme from '../../../theme';

interface Props {
    onFinish:() => void
}

const CreateSolution: FunctionComponent<Props> = props => {

    const [ blueprint ]  = React.useState(new SolutionBlueprint());

    const [ account ] = AppStore.account.use();

    const handleSubmit = () => {          

        var userId = account.user ? account.user.id : ""
        
        return SolutionService.createSolution(blueprint.ToDto(userId))
            .then(() => props.onFinish());
    }

    return (
        <KeyboardAvoidingView behavior="height">
            <Form model={blueprint} onSubmit={handleSubmit}>
                <Form.Item field="name">
                    <Form.Input size="small" autoCapitalize="none" label="Name" />
                </Form.Item>
                <Form.Item field="description">
                    <Form.Input size="small" label="Description" />
                </Form.Item>
                <Form.Item field="eventStorm">
                    <Form.Checkbox label="Event Storm" color={"primary"} labelPlacement="right" />
                </Form.Item>
                <Form.Item field="modelRepository">
                    <Form.Checkbox label="Model Repository" color={"primary"} labelPlacement="right" />
                </Form.Item>
                <Form.Item field="taskStack">
                    <Form.Checkbox label="Task Stack" color={"primary"} labelPlacement="right" />
                </Form.Item>
                <Form.Item field="contributorName">
                    <Form.Input size="small" label="Contributor Name" />
                </Form.Item>
                <Form.Item field="contributorEmail">
                    <Form.Input size="small" label="Contributor Email" />
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

