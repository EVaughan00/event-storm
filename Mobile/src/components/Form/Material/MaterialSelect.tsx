import { FontAwesome } from "@expo/vector-icons";
import React, { FunctionComponent } from 'react';
import { Animated, Easing, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Ripple from "react-native-material-ripple";
import theme from '../../../theme';
import { FloatingPopup } from '../../FloatingPopup';
import { FormItemProps, SelectOption } from "../../FormElement";

interface Props extends FormItemProps<string> {
    size?: "small" | "default" | "large",
    options: SelectOption[],
}

const MaterialSelect: FunctionComponent<Props> = props => {
    const size = props.size ?? "default";
    const { label, errorText, helperText, options } = props;
    const initialValue = options.find(o => o.value == props.value);
    const inputRef = React.useRef<TextInput>(null);
    const focusAnimation = React.useRef(new Animated.Value(0)).current;    

    const [ isFocused, setFocused ] = React.useState(false);
    const [ visibleOptions, showOptions ] = React.useState(false);
    const [ selected, selectOption ] = React.useState<SelectOption | undefined>(initialValue);

    React.useEffect(() => {
        Animated.timing(focusAnimation, {
            toValue: !!selected ? 1 : 0,
            duration: 300,
            easing: Easing.bezier(0.4, 0, 0.2, 1),
            useNativeDriver: true,
        }).start();
    }, [focusAnimation, selected ]);

    const handleSelect = (option?: SelectOption) => {
        selectOption(option == selected ? undefined : option);
        setFocused(option?.value != "");
        setTimeout(() => {
            showOptions(false);            
            props.onUpdate?.(option?.value ?? "");
        }, 300);
    }

    let offset = {
        x: size == "small" ? 10 : size == "default" ? 10 : 10,
        y: size == "small" ? 12 : size == "default" ? 17 : 24
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

    let color = isFocused ? theme.colors.strong : theme.colors.default;

    if (errorText)
        color = theme.colors.error;

    const extraStyles = {
        borderColor: color,
        padding: size == "small" ? theme.unit * 1.5 :
                size == "large" ? theme.unit * 3 :
                theme.unit * 2,
        paddingLeft: 18
    }    

    return (
        <View style={styles.container}>
            <Ripple onPress={() => showOptions(true)}>
                <TextInput 
                    style={[ styles.input, extraStyles]}
                    ref={inputRef}
                    value={selected?.value ?? ""}
                    onBlur={() => setFocused(selectOption != undefined)}
                    onFocus={() => setFocused(true)}
                />
            </Ripple>

            <View style={styles.dropDownIcon}>
                <FontAwesome name="caret-down" size={16} color={theme.colors.default} />
            </View>
            
            <TouchableWithoutFeedback onPress={() => inputRef.current?.focus()}>
                <Animated.View style={[ styles.labelContainer, { transform }]}>
                    <Text style={[ styles.label, { color }]}>
                        { label }{ errorText ? "*" : "" }
                    </Text>
                </Animated.View>
            </TouchableWithoutFeedback>
            
            {!!errorText && <Text style={styles.error}>{errorText}</Text>}
            {!errorText && !!helperText &&  <Text style={styles.helper}>{helperText}</Text>}

            <FloatingPopup visible={visibleOptions} onDismiss={() => {
                showOptions(false); selectOption(undefined); }}>
                { props.options.map((option, n)=> 
                    <Ripple key={n} onPress={() => {
                        if (selected?.value == option.value)
                            handleSelect(undefined);
                        else
                            handleSelect(option);
                    }}>
                        <View style={styles.selectItem}>
                            <Text>Select {n}</Text> 
                            { selected?.value == option.value && 
                                <FontAwesome name="check" size={16} color={theme.colors.default} />
                            }
                        </View>
                    </Ripple>              
                )}
            </FloatingPopup>
        </View>
    );
}

const styles = StyleSheet.create({
    selectItem: {
        padding: theme.unit * 2,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    container: {
        position: "relative",
        marginBottom: theme.unit  * 3,
        zIndex: 2
    },
    input: {
        padding: theme.unit * 3,
        borderWidth: 1,
        borderRadius: 4,
        // fontFamily: 'Avenir-Medium',
        fontSize: 16,
      },
      dropDownIcon: {
        position: "absolute",
        right: 20,
        top: 30
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

MaterialSelect.defaultProps = {
    _type: "FormItem"
}

export { MaterialSelect };

