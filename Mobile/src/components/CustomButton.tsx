import React, { FunctionComponent } from 'react';
import { FlexAlignType, StyleProp, StyleSheet, Text, TextStyle, TouchableOpacity } from 'react-native';
import theme, { Colors } from '../theme';
import Ripple from "react-native-material-ripple";

interface ButtonProps {
    color?: Colors,
    ripple?: boolean,
    size?: "small" | "default" | "large"
    onPress?: () => any
}

interface LinkProps {
    color?: Colors,
    style?: StyleProp<TextStyle>,
    align?: FlexAlignType,
    size?: "small" | "default" | "large"
    onClick?: () => any
}

const CustomButton: FunctionComponent<ButtonProps> = props => {
    const size = props.size ? props.size : "default";
    const extraStyles = {
        backgroundColor: theme.colors[props.color ?? "primary"],
        padding: size == "small" ? theme.unit :
            size == "large" ? theme.unit * 2.1 :
            theme.unit * 1.8
    }

    const Button = () => (        
        <TouchableOpacity style={[styles.button, extraStyles]} onPress={props.onPress}>
            <Text style={[styles.buttonText, { fontSize: size == "large" ? 18 : 14}]}>{ props.children }</Text>
        </TouchableOpacity>
    )

    if (props.ripple)
        return <Ripple onPress={props.onPress}><Button /></Ripple>;

    return (<Button />);
}

const Link: FunctionComponent<LinkProps> = props => {
    const size = props.size ? props.size : "default";
    const extraStyles = {
        color: theme.colors[props.color ?? "primary"],
        fontSize: size == "small" ? 14 :
            size == "large" ? 18 :
            16
    }
    
    return (
        <TouchableOpacity style={[styles.link, { alignItems: props.align ?? "flex-start" }]} onPress={props.onClick}>
            <Text style={[ styles.linkText, extraStyles, props.style ]}>{ props.children }</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({ 
    button: {
        alignItems: "center",
        borderRadius: 12,
        padding: theme.unit * 2
    },
    buttonText: {
        fontWeight: "600",
        color: "white"
    },
    link: {
        alignItems: "center",
        padding: 10
    },
    linkText: {
        opacity: .7,
        fontSize: 18
    }
});

export { CustomButton, Link }
