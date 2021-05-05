import React, { Component, FunctionComponent } from 'react';
import { Keyboard, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { MaterialCheckbox } from './Form/Material/MaterialCheckbox';
import { MaterialInput } from './Form/Material/MaterialInput';
import { MaterialRadio, MaterialRadioGroup } from './Form/Material/MaterialRadio';
import { MaterialSelect } from './Form/Material/MaterialSelect';
import { MaterialSwitch } from './Form/Material/MaterialSwitch';
import { FormError, FormErrors, FormModel } from '../utils/FormModel';
import { ErrorResponse } from '../utils/Response';
import theme from '../theme'; 

type FormContextState = { 
    model: FormModel, 
    errors: FormErrors, 
    handleSubmit: () => Promise<any>
};

const FormContext = React.createContext<FormContextState | undefined>(undefined);

export interface SelectOption {
    label: string,
    value: string
}

interface FormProps {
    style?: StyleProp<ViewStyle>,
    model: FormModel,
    onSubmit: (model: FormModel) => Promise<any>
}

interface ItemProps {
    field: string,
    style?: StyleProp<ViewStyle>,
}

export interface FormItemProps<T> {
    _type?: "FormItem",
    _controlled?: boolean,
    value?: T,
    defaultValue?: T,
    errorText?: string,
    helperText?: string,
    label?: string, 
    labelPlacement?: "top" | "bottom" | "left" | "right",
    onUpdate?: (value: T) => void,
}

const FormRender: FunctionComponent<FormProps> = props => {
    const [ model, setModel ] = React.useState<FormModel>(props.model);
    const [ errors, setErrors ] = React.useState<FormErrors>(props.model.validation.errors);
    const { validation } = props.model;

    const handleServerErrors = (response: ErrorResponse) => {     
        validation.serverErrors = FormError.map(response.errors);
        validation.validateAll();        
        
        setErrors(validation.errors);
    }

    const handleSubmit = () => {
        validation.serverErrors = {};
        validation.disabled = false;
        validation.validateAll();       
        
        if (validation.hasErrors) {      
            setErrors(validation.errors);
            return new Promise(r => r(true));
        }

        return props.onSubmit(props.model).catch(handleServerErrors);
    }

    React.useEffect(() => {
        validation.disabled = true;

        setModel(props.model)
    }, [props.model])

    return (            
        <FormContext.Provider value={{model, errors, handleSubmit}}>
            <View style={[styles.form, props.style]} onTouchStart={() => Keyboard.dismiss()}>
                { props.children }
            </View>
        </FormContext.Provider>
    );
}

const FormItem: FunctionComponent<ItemProps> = props => {
    const modelContext = React.useContext(FormContext);
    const [ value, setValue ] = React.useState<any | undefined>(undefined);
    const [ defaultValue, setDefaultValue ] = React.useState<any | undefined>(undefined);    

    React.useEffect(() => {
        const initialValue = modelContext?.model?.[props.field];
        
        if (defaultValue == undefined && initialValue != undefined){
            setValue(initialValue);
            setDefaultValue(initialValue);
        }
        
    }, [value]);

    const mappedChildren = (state?: FormContextState) => React.Children.map(props.children, child => {
        if (!state || !React.isValidElement(child))
            return child;

        const { model } = state;

        if (props.field == "submit") {
            return React.cloneElement(child, {
                onPress: () => {
                    child.props.onPress?.();
                    state.handleSubmit();            
                }
            });          
        }

        if (child.props["_type"] && child.props._type == "FormItem") {
            return React.cloneElement(child, {
                ...child.props,
                _controlled: true,
                value: value,
                defaultValue: defaultValue,
                errorText: model.validation.validate(props.field).last,
                onUpdate: (value) => {            
                    model[props.field] = value;       
                    delete model.validation.serverErrors[props.field];              
                    setValue(value);                    
                    child.props.onUpdate?.(value);
                }
            })
        }

        return child;
    });    

    return (
        <FormContext.Consumer>
            {(formState) => 
                <View style={props.style}>
                    {mappedChildren(formState)}
                </View>
             }
        </FormContext.Consumer>
    )
}

export class Form extends Component<FormProps> {
    public static Input = MaterialInput;
    public static Select = MaterialSelect;
    public static RadioGroup = MaterialRadioGroup;
    public static Radio = MaterialRadio;
    public static Switch = MaterialSwitch;
    public static Checkbox = MaterialCheckbox;
    public static Item = FormItem;
    public render = () => <FormRender {...this.props} />;
}

const styles = StyleSheet.create({
    form: {
        paddingTop: theme.unit * 2,
        position: "relative"
    }
});