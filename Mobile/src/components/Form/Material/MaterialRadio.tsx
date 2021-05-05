import React, { FunctionComponent, ReactElement } from 'react';
import { Animated, Easing, StyleSheet, Text, View } from 'react-native';
import Ripple from "react-native-material-ripple";
import theme from '../../../theme';
import { FormItemProps } from "../../FormElement";
import { Typography } from '../../Typography';

const { Title } = Typography;

interface Props extends FormItemProps<string> {
    type: string,    
}

interface GroupProps extends FormItemProps<string> {
    options: ReactElement<Props>[]
}

const MaterialRadioGroup: FunctionComponent<GroupProps> = props => {
    const [ value, setValue ] = React.useState(props.defaultValue);
    const { label, errorText, helperText } = props;
    let color = theme.colors.strong;

    const onSelect = (value: string) => {
        setValue(value);
        props.onUpdate?.(value);
    }

    if (errorText)
        color = theme.colors.error;

    return (
        <View style={styles.groupContainer}>
            { !!label && <Title level={5} style={[styles.label, { color }]}>
                { label }{ errorText ? "*" : "" }
            </Title> }
            
            { props.options.map((element, i) => React.cloneElement(element, { 
                ...element.props, 
                key: i, 
                value: props._controlled ? props.value : value,
                onUpdate: onSelect
            })) }

            {!!errorText && <Text style={styles.error}>{errorText}</Text>}
            {!errorText && !!helperText &&  <Text style={styles.helper}>{helperText}</Text>}
        </View>
    );      
}

const MaterialRadio: FunctionComponent<Props> = props => {
    let { type, value, defaultValue, labelPlacement } = props;
    const toggleAnimation = React.useRef(new Animated.Value(0)).current;    

    if (!labelPlacement)
        labelPlacement = "right";

    React.useEffect(() => {
        Animated.timing(toggleAnimation, {
            toValue: type === value ? 1 : 0,
            duration: 200,
            easing: Easing.bezier(0.4, 0, 0.2, 1),
            useNativeDriver: true,
        }).start();
    }, [toggleAnimation, type, value]);

    const handleChange = () => {
        props.onUpdate?.(type);      
    }
    
    const Label = () => (
        <Title level={5} style={styles.radioLabel}>{ type }</Title>
    );

    const flexDirection = (
        labelPlacement == "left" || labelPlacement == "right" ? "row" : "column"
    );

    const transform = [{
        scale: toggleAnimation.interpolate({
            inputRange: [0, 1],
            outputRange: [0.01, 1],  
        })
    }];

    return (
        <View onTouchStart={handleChange}>
            <View style={[ styles.container, { flexDirection }]}>
                { (labelPlacement == "left" || labelPlacement == "top") && <Label />}
                
                <Ripple style={styles.ripple} onPress={handleChange}>
                    <View style={styles.selector}>
                        <Animated.View style={[styles.status, { transform }]}/>
                    </View>
                </Ripple>

                { (labelPlacement == "right" || labelPlacement == "bottom") && <Label />}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    groupContainer: {
        position: "relative",
        marginBottom: theme.unit  * 3,
        zIndex: 1,
    },
    label: {
        fontWeight: "600",
        color: theme.colors.strong,
        marginBottom: theme.unit /2,
        fontSize: 16,
    },
    radioLabel: {
      margin: theme.unit, 
      marginTop: theme.unit + 4,
      marginBottom: theme.unit / 4,
      fontWeight: "300",
      color: theme.colors.strong,
      fontSize: 14,
    },
    container: {
        display: "flex"
    },
    selector: {
        borderRadius: 30,
        padding: 3,
        height: 20,
        width: 20,
        borderWidth: 2,
        borderColor: theme.colors.primary
    },
    status: {
        borderRadius: 30,
        height: "100%",
        width: "100%",
        transform: [
            { scale: 0.5 }
        ],
        backgroundColor: theme.colors.primary
    },
    ripple: {
        padding: 10,
        height: 40,
        width: 40,
        overflow: "hidden",
        borderRadius: 40,
        marginRight: -8,
        marginLeft: -4,
    },    
    error: {
        marginTop: 4,
        marginLeft: 8,
        fontSize: 12,
        color: theme.colors.error,
        // fontFamily: 'Avenir-Medium',
      },
      helper: {
        marginTop: 4,
        marginLeft: 8,
        fontSize: 12,
        color: theme.colors.default,
        // fontFamily: 'Avenir-Medium',
      },
});

MaterialRadioGroup.defaultProps = {
    _type: "FormItem"
}

export { MaterialRadio, MaterialRadioGroup };
