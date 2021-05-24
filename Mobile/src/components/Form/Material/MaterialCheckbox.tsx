import React, { FunctionComponent } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FontAwesome } from "@expo/vector-icons";
import { Typography } from '../../Typography';
import theme, { Colors } from '../../../theme';
import { FormItemProps } from "../../FormElement";
import Ripple from "react-native-material-ripple";

const { Title } = Typography;

interface Props extends FormItemProps<boolean> {
    color?: Colors
}

const MaterialCheckbox: FunctionComponent<Props> = props => {
    const [ isChecked, setChecked ] = React.useState(props.value ?? false);
    let { label, errorText, labelPlacement, helperText } = props;

    if (!labelPlacement)
        labelPlacement = "right";

    const color = theme.colors[props.color ?? "primary" ];
        
    const handleChange = (value: boolean) => {
        setChecked(value);
        props.onUpdate?.(value);
    }
    
    const Label = () => (
        <Title level={5} style={[styles.label, { color: props.errorText ? theme.colors.error : theme.colors.strong }]}>
            { label }{ errorText ? "*" : "" }
        </Title> 
    );

    const flexDirection = (
        labelPlacement == "left" || labelPlacement == "right" ? "row" : "column"
    );

    const containerStyle: any = {
        display: "flex", 
        flexDirection, 
        alignItems: flexDirection == "row" ? "center" : "flex-start",
        marginBottom: theme.unit
    }

    return (
        <View style={styles.container}>
            <View style={containerStyle}>
                { !!label && (labelPlacement == "left" || labelPlacement == "top") && <Label  />}
                <Ripple onPress={() => handleChange(!isChecked) } style={[styles.ripple, {
                    marginLeft: labelPlacement == "left" ? 1 : undefined, 
                    marginRight: labelPlacement == "right" ? 1 : undefined,
                }]}>
                    <View style={[ styles.checkbox, { borderColor: color }]}>
                        { isChecked &&
                            <FontAwesome style={styles.checkIcon} name="check-square" size={22} color={color} ></FontAwesome>
                        }
                    </View>
                </Ripple>

                { !!label && (labelPlacement == "right" || labelPlacement == "bottom") && <Label />}
            </View>

            {!!errorText && <Text style={styles.error}>{errorText}</Text>}
            {!errorText && !!helperText &&  <Text style={styles.helper}>{helperText}</Text>}

        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        position: "relative",
        marginBottom: theme.unit  * 3,
        zIndex: 1,
    },
    label: {
        fontWeight: "600",
        color: theme.colors.strong,
        marginTop: theme.unit,
        marginBottom: theme.unit,
        fontSize: 16,
    },
    checkbox: {
        width: 20,
        height: 20,
        borderRadius: 5,
        borderWidth: 2,
    },
    checkIcon: {
        width: 20,
        height: 20,
        position: "relative",
        top: -3,
        left: -2
    },
    ripple: {
        padding: 10,
        height: 40,
        width: 40,
        overflow: "hidden",
        borderRadius: 40,
        margin: -10
    },   
    error: {
        marginTop: 4,
        marginLeft: 0,
        fontSize: 12,
        color: theme.colors.error,
        // fontFamily: 'Avenir-Medium',
      },
      helper: {
        marginTop: 4,
        marginLeft: 0,
        fontSize: 12,
        color: theme.colors.default,
        // fontFamily: 'Avenir-Medium',
      },
});

MaterialCheckbox.defaultProps = {
    _type: "FormItem"
}

export { MaterialCheckbox }