import React, { FunctionComponent } from 'react';
import { KeyboardAvoidingView, StyleSheet } from 'react-native';
import { CustomButton } from '../../../components/CustomButton';
import { MaterialInput } from '../../../components/Form/Material/MaterialInput';
import { MaterialSelectDropdown } from '../../../components/Form/Material/MaterialSelectDropdown';
import { Form } from '../../../components/FormElement';
import { EventStormService } from '../../../services/eventStorm/EventStormService';
import { CoordinateDTO } from '../../../services/eventStorm/models/Coordinate';
import { EventBlockDTO } from '../../../services/eventStorm/models/EventBlockDTO';
import SolutionViewModel from '../../../services/solution/models/SolutionViewModel';
import theme from '../../../theme';
import { GridNode } from '../components/Grid/GridNode';
import { BlockTypeOptions, DefaultBlockTypeOption } from '../helpers/consts';

interface Props {
    solution: SolutionViewModel
    gridNode: GridNode
    onFinish: () => void
}

const CreateEventBlock: FunctionComponent<Props> = props => {

    const [ eventBlock ]  = React.useState(new EventBlockDTO());
    const {gridNode, solution} = props
    
    const handleSubmit = () => {  
        
        const coordinate = new CoordinateDTO()
        coordinate.x = gridNode.coordinate.x
        coordinate.y = gridNode.coordinate.y

        eventBlock.solutionId = solution.id
        eventBlock.coordinate = coordinate

        return EventStormService.createEventBlock(eventBlock)
            .then(() => props.onFinish());
    }

    return (
        <KeyboardAvoidingView behavior="height">
            <Form model={eventBlock} onSubmit={handleSubmit}>
                <Form.Item field="name">
                    <MaterialInput size="small" autoCapitalize="none" label="Name" />
                </Form.Item>
                <Form.Item field="type">
                    <MaterialSelectDropdown default={DefaultBlockTypeOption} options={BlockTypeOptions} />
                </Form.Item>
                <Form.Item field="submit">
                    <CustomButton ripple size="default" >Submit</CustomButton>
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
    form: {
        display: "flex",
        height: "100%",
        flexDirection: "column",
        justifyContent: "space-between"
    },
    developerToolbox: {
        marginBottom: theme.unit * 1,
        fontWeight: 'bold'
    }
});

export { CreateEventBlock };

