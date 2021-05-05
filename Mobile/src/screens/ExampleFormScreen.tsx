import React, { FunctionComponent } from 'react';
import { AppNavigation } from '../AppNavigation';
import { CustomButton } from '../components/CustomButton';
import { Form, SelectOption } from '../components/FormElement';
import { Paper } from '../components/Surfaces';
import { Typography } from '../components/Typography';
import { NavigationProps } from '../helpers/NavigationProps';
import { FormModel } from '../utils/FormModel';
import { ErrorResponse } from '../utils/Response';
import Validation from '../utils/Validation';
const { Title } = Typography;

enum RadioType {
    One = "One",
    Two = "Two",
    Three = "Three",
}

class Example extends FormModel {
    @Validation.Rule({ required: true, message: "Email is required"})
    @Validation.Rule({ pattern: Validation.Email, message: "That is not a valid email"})
    public input: string = "one@two.com";    

    @Validation.Rule({ required: true, message: "Select is required"})
    @Validation.Rule({ pattern: Validation.OneOf("option-1"), message: "That is not a valid option"})
    public select: string = "";    
    
    @Validation.Rule({ required: true, message: "Must be switched"})
    public switch: boolean = false;
    
    @Validation.Rule({ pattern: Validation.OneOf(RadioType.One, RadioType.Three), message: "Must be one or three"})
    @Validation.Rule({ enum: RadioType, message: "Must be a RadioType"})
    public radio = RadioType.Three;
    
    @Validation.Rule({ required: false, message: "Cannot be checked"})
    public checkbox: boolean = false;
}

export interface ExampleScreenProps {}

interface Props extends NavigationProps<AppNavigation, "Example"> {}

const ExampleFormScreen: FunctionComponent<Props> = props => {
    const options: SelectOption[] = Array.from(new Array(50).keys()).map<SelectOption>(n => ({
        value: `option-${n}`,
        label: `Select ${n}`
    }));

    const example = new Example();

    const handleSubmit = () => {
        return new Promise((resolve, reject) => {

            console.log("submitted");
            

            const errorResponse = ErrorResponse.Build({
                input: [ "Thats not good!!" ]
            });
 
            reject(errorResponse);
        })
        .then(() => console.log(example));
    }

    return (
        <Paper>
            <Title level={4} align="center">Example Form</Title>

            <Form model={example} onSubmit={handleSubmit}>
                <Form.Item field="input">
                    <Form.Input label="Input" helperText="foo"/>
                </Form.Item>

                <Form.Item field="select">
                    <Form.Select label="Select" helperText="foo" options={options}/>
                </Form.Item>

                <Form.Item field="switch">
                    <Form.Switch label="Switch" labelPlacement="top" helperText="foo" />
                </Form.Item>

                <Form.Item field="radio">
                    <Form.RadioGroup label="Radio group" helperText="baz" options={[
                        <Form.Radio type={RadioType.One} labelPlacement="right" />,
                        <Form.Radio type={RadioType.Two} labelPlacement="right" />,
                        <Form.Radio type={RadioType.Three} labelPlacement="right" />,
                        <Form.Radio type="Narp" labelPlacement="right" />
                    ]}/>
                </Form.Item>

                <Form.Item field="checkbox">
                    <Form.Checkbox label="Checkbox" labelPlacement="top" value={false} />
                </Form.Item>

                <Form.Item field="submit">
                    <CustomButton>Submit</CustomButton>
                </Form.Item>
            </Form>
            
        </Paper>
    );
}

export { ExampleFormScreen };
