import React from "react";
import { AppNavigation } from "../../../AppNavigation";
import { CustomButton } from "../../../components/CustomButton";
import { Form } from "../../../components/FormElement";
import { Paper } from "../../../components/Surfaces";
import { Typography } from "../../../components/Typography";
import { NavigatedFC } from "../../../helpers/NavigationProps";
import { AccountService } from "../../../services/account/AccountService";
import { Registration } from "../../../services/account/models/Registration";

const { Title } = Typography;

export interface RegisterScreenProps {

}

const RegisterScreen: NavigatedFC<AppNavigation, "Register"> = props => {
    const [ registrationForm ] = React.useState(new Registration());
    

    const handleSubmit = () => {        
        // console.log(registrationForm.formData);         

        return AccountService.registerUser(registrationForm);
    }

    return (
        <Paper style={{ paddingTop: 8 }}>
            <Title level={3}>Create your account</Title>
            <Form model={registrationForm} onSubmit={handleSubmit}>
                <Form.Item field="firstName">
                    <Form.Input autoFocus label="First Name"/>
                </Form.Item>
                <Form.Item field="lastName">
                    <Form.Input label="Last Name"/>
                </Form.Item>
                <Form.Item field="email">
                    <Form.Input size="large" autoCapitalize="none" label="Email" />
                </Form.Item>
                <Form.Item field="password">
                    <Form.Input clearTextOnFocus={false} secureTextEntry label="Password"/>
                </Form.Item>
                <Form.Item field="passwordConfirm">
                    <Form.Input clearTextOnFocus={false} secureTextEntry label="Password"/>
                </Form.Item>
                <Form.Item field="submit" style={{ marginTop: 16 }}>
                    <CustomButton ripple>Submit</CustomButton>
                </Form.Item>
            </Form>
        </Paper>
    );
}

export { RegisterScreen }