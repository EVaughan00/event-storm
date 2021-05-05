import React, { FunctionComponent } from 'react';
import { Animated, Easing, StyleSheet, Text, View } from 'react-native';
import Ripple from "react-native-material-ripple";
import theme, { Colors } from '../../../theme';
import { Typography } from '../../Typography';
import { FormItemProps } from "../../FormElement";

const WIDTH = 60;

interface Props extends FormItemProps<boolean> {
    color?: Colors
}

const MaterialSwitch: FunctionComponent<Props> = props => {
    const [ isEnabled, setEnabled ] = React.useState(props.defaultValue ?? false);
    const toggleAnimation = React.useRef(new Animated.Value(0)).current; 
    let { label, labelPlacement, errorText, helperText } = props;

    if (!labelPlacement)
        labelPlacement = "top";

    React.useEffect(() => {
        Animated.timing(toggleAnimation, {
            toValue: isEnabled ? 1 : 0,
            duration: 200,
            easing: Easing.bezier(0.4, 0, 0.2, 1),
            useNativeDriver: true,
        }).start();
    }, [toggleAnimation, isEnabled]);

    const handleChange = (state: boolean) => {
        setEnabled(state);
        props.onUpdate?.(state);
    }

    const transform = [{
        translateX: toggleAnimation.interpolate({
            inputRange: [0, 1],
            outputRange: [0, WIDTH -15],  
        })
    }];

    const color = theme.colors[props.color ?? "primary"];

    let textColor = theme.colors.strong;

    if (errorText)
        textColor = theme.colors.error;    

    const trackStyle = {
        backgroundColor: color, 
        opacity: .5
    }    

    const nodeStyle = {
        backgroundColor: color        
    }
    
    const Label = () => (
        <Typography.Title level={5} style={[styles.label, { color: textColor }]}>
            { label }{ errorText ? "*" : "" }
        </Typography.Title>
    );

    const flexDirection = (
        labelPlacement == "left" || labelPlacement == "right" ? "row" : "column"
    );

    return (
        <View style={styles.groupContainer}>
            <View style={[ styles.container, { flexDirection }]} >

                { !!label && (labelPlacement == "left" || labelPlacement == "top") && <Label />}

                <View style={styles.switchContainer}>
                    <View style={[styles.track]}>
                        <View style={[styles.track, trackStyle]}></View>
                        <Animated.View style={[ styles.rippleContainer, { transform }]}>
                            <Ripple style={styles.ripple} onPress={() => handleChange(!isEnabled)}>
                                <View style={[ styles.node, nodeStyle ]}/>
                            </Ripple>
                        </Animated.View>
                    </View>
                </View>

                { !!label && (labelPlacement == "right" || labelPlacement == "bottom") && <Label />}
            </View>

            {!!errorText && <Text style={styles.error}>{errorText}</Text>}
            {!errorText && !!helperText &&  <Text style={styles.helper}>{helperText}</Text>}
        </View>
    )
}

const styles = StyleSheet.create({
    groupContainer: {
        position: "relative",
        marginBottom: theme.unit  * 3,
        zIndex: 1,
    },
    label: {
      // fontFamily: 'Avenir-Heavy',
      margin: theme.unit, 
      marginLeft: 0,
      marginBottom: theme.unit,
      fontWeight: "600",
      color: theme.colors.strong,
      fontSize: 16,
    },
    container: {
        display: "flex",
        marginTop: theme.unit,
        marginBottom: theme.unit
    },
    switchContainer: {
        width: WIDTH,
        height: 20,
        position: "relative",
        margin: theme.unit
    },
    track: {
        borderRadius: theme.unit * 2,
        width: "100%", 
        height: "100%"
    },
    rippleContainer: {
        position: "absolute",
        left: -15,
        top: -15,
        borderRadius: 30,
        overflow: 'hidden',
    },  
    ripple: {
        padding: 10,
        width: "100%",
        height: "100%" 
    },  
    node: {
        width: 30,
        height: 30,
        borderRadius: 20,
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: .3,
        shadowRadius: 4,
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

MaterialSwitch.defaultProps = {
    _type: "FormItem"
}

export { MaterialSwitch };
