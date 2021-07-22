import React, { FunctionComponent, ComponentProps } from 'react';
import { Text, TextInput, StyleSheet, View, Animated, Easing, TouchableWithoutFeedback } from 'react-native';
import { FormItemProps} from "../../FormElement";
import theme from '../../../theme';

interface Props extends ComponentProps<typeof TextInput>, FormItemProps<string> {
    size?: "small" | "default" | "large"
    elevated?: number,
    borderless?: boolean
}

const MaterialInput: FunctionComponent<Props> = props => {
    const size = props.size ?? "default";
    const { label, errorText, helperText, style, onBlur, onFocus, ...rest } = props;
    const [ isFocused, setFocused ] = React.useState(false);
    const [ value, setValue ] = React.useState("");
    const inputRef = React.useRef<TextInput>(null);
    const focusAnimation = React.useRef(new Animated.Value(0)).current;    
    
    React.useEffect(() => {
        handleChangeText(props.defaultValue ?? "")
        setFocused(!!props.defaultValue);
    }, [props.defaultValue])

    React.useEffect(() => {
        Animated.timing(focusAnimation, {
            toValue: isFocused || !!value ? 1 : 0,
            duration: 300,
            easing: Easing.bezier(0.4, 0, 0.2, 1),
            useNativeDriver: true,
        }).start();
    }, [focusAnimation, isFocused, value]);

    const handleChangeText = text => {
        props.onUpdate?.(text)
        setValue(text);
    }

    const handleBlur = event => {
        setFocused(false);
        onBlur?.(event);
    }

    const handleFocus = event => {
        setFocused(true);
        onFocus?.(event);
    }

    let offset = {
        x: size == "small" ? 10 : size == "default" ? 10 : 10,
        y: size == "small" ? 14 : size == "default" ? 18 : 20
    }

    let transform = [
        {
            scale: focusAnimation.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 0.75],
            }),
        }, {
            translateY: focusAnimation.interpolate({
                inputRange: [0, 1],
                outputRange: [offset.y, -12],
            }),
        }, {
            translateX: focusAnimation.interpolate({ 
                inputRange: [0, 1],
                outputRange: [offset.x, 0],
            })
        }
    ];

    let color = isFocused ? theme.colors.primary : theme.colors.default;

    if (errorText)
        color = theme.colors.error;

    const extraStyles = {
        borderColor: color,
        borderWidth: props.borderless ? 0 : 1,
        padding: size == "small" ? theme.unit * 1.5 :
                size == "large" ? theme.unit * 2.5 :
                theme.unit * 2,
        paddingLeft: 18,
    }

    return (
        <View style={[ styles.container, style ]}>
            <TextInput 
                style={[ styles.input, extraStyles]}
                ref={inputRef}
                {...rest}
                value={undefined}
                onChangeText={handleChangeText}
                onFocus={handleFocus}
                onBlur={handleBlur}
            />
            <TouchableWithoutFeedback onPress={() => inputRef.current?.focus()}>
                <Animated.View style={[ styles.labelContainer, { transform }]}>
                    <Text style={[ styles.label, { color }]}>
                        { label }{ errorText ? "*" : "" }
                    </Text>
                </Animated.View>
            </TouchableWithoutFeedback>
            {!!errorText && <Text style={styles.error}>{errorText}</Text>}
            {!errorText && !!helperText &&  <Text style={styles.helper}>{helperText}</Text>}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: "relative",
        marginBottom: theme.unit  * 2,
        zIndex: 1,
    },
    input: {
        padding: theme.unit * 3,
        borderWidth: 1,
        borderRadius: 4,
        // fontFamily: 'Avenir-Medium',
        fontSize: 16,
      },
      labelContainer: {
        position: 'absolute',
        paddingHorizontal: theme.unit,
        backgroundColor: 'white',
      },
      label: {
        // fontFamily: 'Avenir-Heavy',
        fontWeight: "600",
        fontSize: 16,
      },
      error: {
        marginTop: 4,
        marginLeft: 12,
        fontSize: 12,
        color: theme.colors.error,
        // fontFamily: 'Avenir-Medium',
      },
      helper: {
        marginTop: 4,
        marginLeft: 12,
        fontSize: 12,
        color: theme.colors.default,
        // fontFamily: 'Avenir-Medium',
      },
});

MaterialInput.defaultProps = {
    _type: "FormItem"
}

export { MaterialInput }

