import * as React from 'react';
import { StyleSheet, TouchableOpacity, View} from 'react-native';
import { Card } from 'react-native-elements'
import { Divider } from 'react-native-paper';
import { MaterialCheckbox } from '../../../components/Form/Material/MaterialCheckbox';
import { Form } from '../../../components/FormElement';
import { Typography } from '../../../components/Typography';
import theme, { Areas } from '../../../theme';


interface Props {
    area: "event-storm" | "model-repository" | "task-stack"
}


export const ToolCheckbox : React.FunctionComponent<Props> = props => {

    const [checked, setChecked] = React.useState(false);
    const [color, setColor] = React.useState(theme.colors.default)
    const [title, setTitle] = React.useState("")

    React.useEffect(() => {
        switch(props.area) {
            case "event-storm":
                setTitle("Event Storm")
                setColor(theme.areaColors.eventStorm)
                break
            case "model-repository":
                setTitle("Model Repository")
                setColor(theme.areaColors.modelRepository)
                break            
            case "task-stack": 
                setTitle("Task Stack")
                setColor(theme.areaColors.taskStack)
                break        
            }
    }, [])

    return (
      <TouchableOpacity
        style={styles.touchableOpacity}
        onPress={() => setChecked(!checked)}
      >
          <View style={styles.containerLeft}>
            <Divider
              style={[styles.divider, { backgroundColor: color }]}
            ></Divider>
            <Typography.SubTitle style={styles.text} level={3}>{title}</Typography.SubTitle>
          </View>
          <View style={styles.containerRight}>
            <Form.Checkbox checked={checked} color="primary" />
          </View>
      </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    touchableOpacity: {
        borderWidth: 0.5,
        borderRadius: 8,
        borderColor: "#DBDBDB",
        width: "100%",
        height: 100,
        padding: 15,
        backgroundColor: "white",
        elevation: 5,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginVertical: 5
      },
      containerLeft: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: 'center'
      },
      containerRight: {
        alignItems: "center",
        justifyContent: 'center'
      },
      text: {
        paddingBottom: 3,
        marginLeft: 10,
        fontWeight: "bold",
        lineHeight: 24,
        letterSpacing: 0.15,
        color: "rgba(0, 0, 0, 0.87)",
      },
      divider: {
        backgroundColor: "#AAA",
        height: 90,
        borderRadius: 8,
        width: 10,
      },
})