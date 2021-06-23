import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import { FunctionComponent } from "react";
import { StyleSheet, View } from "react-native";
import { Link } from "../../../components/CustomButton";
import { Divider } from "../../../icons/Divider";

interface Props {
  onEdit: () => void
  onTemplate: () => void
  onDelete: () => void
}

export const EditMenu: FunctionComponent<Props> = (props) => {

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Link align='center' size="default" color="primary" onClick={props.onEdit}>Edit</Link>
      <Divider opacity={1} width={1} />
      <Link align='center' size="default" color="primary" onClick={props.onTemplate}>Template</Link>
      <Divider opacity={1} width={1} />
      <Link align='center' size="default" color="error" onClick={props.onDelete}>Delete</Link>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 200,
    width: 300,
    padding: 20,
    borderRadius: 20,
    backgroundColor: 'white',
    justifyContent: 'space-between',
  },
});
