import React, { FunctionComponent } from 'react';
import { KeyboardAvoidingView, StyleSheet, View, Platform } from 'react-native';
import { CustomButton, Link } from '../../../components/CustomButton';
import { Form } from '../../../components/FormElement';
import { Typography } from '../../../components/Typography';
import { AccountService } from '../../../services/account/AccountService';
import { Login } from '../../../services/account/models/Login';
import theme from '../../../theme';

interface Props {
    onFinish:() => void
}

const LoginForm: FunctionComponent<Props> = props => {
    const [ loginForm ]  = React.useState(new Login());

    const handleSubmit = () => {          
        return AccountService.loginUser(loginForm)
            .then(() => props.onFinish());
    }

    return (
        <KeyboardAvoidingView behavior="height">
            <Form  model={loginForm} onSubmit={handleSubmit}>
                    <Form.Item field="email">
                        <Form.Input size="large" autoCapitalize="none" label="Email" />
                    </Form.Item>
                    <Form.Item field="password">
                        <Form.Input size="large" label="Password" clearTextOnFocus={false} secureTextEntry />
                    </Form.Item>
                    <Form.Item field="remember">
                        <Form.Checkbox label="Remember me" labelPlacement="right" />
                    </Form.Item>
                    <Link style={styles.link}>Forgot your password?</Link>
                    <Form.Item field="submit">
                        <CustomButton ripple size="default">Submit</CustomButton>
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
});

export { LoginForm };

