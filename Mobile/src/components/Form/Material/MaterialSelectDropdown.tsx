import React, { FunctionComponent, useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { set } from 'react-native-reanimated';
import { BlockType } from '../../../services/eventStorm/models/EventBlockDTO';
import theme from '../../../theme';
import { FormItemProps, SelectOption } from "../../FormElement";

interface Props extends FormItemProps<string> {
    size?: "small" | "default" | "large",
    options: SelectOption[],
    default: SelectOption
}

const MaterialSelectDropdown: FunctionComponent<Props> = props => {

    const { label, errorText, helperText, options } = props;
    const initialOption = props.default;
    const [value, setValue] = useState<string>(initialOption ? initialOption.value : "")

    useEffect(() => {
        handleSelection(initialOption.value)
    }, [initialOption])

    const handleSelection = (value: string) => {
        props.onUpdate?.(value)
        setValue(value)
    }

    let color = theme.colors.strong;

    if (errorText)
        color = theme.colors.error;

    return (
        <View style={[styles.container, {borderColor: color}]}>

            {!!errorText && <Text style={styles.error}>{errorText}</Text>}
            {!errorText && !!helperText &&  <Text style={styles.helper}>{helperText}</Text>}

            <RNPickerSelect
                placeholder={initialOption}
                onValueChange={handleSelection}
                items={props.options}
                style={{inputAndroid: {color: color}}}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: "relative",
        marginBottom: theme.unit  * 3,
        zIndex: 2,
        borderColor: 'black',
        borderBottomWidth: 1
        // elevation: 3,
    },
    input: {
        color: 'black'
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

MaterialSelectDropdown.defaultProps = {
    _type: "FormItem"
}

export { MaterialSelectDropdown };

