import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import { FunctionComponent } from "react";
import { StyleSheet, View } from "react-native";
import { useTheme } from "react-native-paper";
import { ToolCheckbox } from "../../../components/Form/Custom/ToolCheckbox";
import { Typography } from "../../../components/Typography";
import SvgBackArrow from "../../../icons/BackArrow";
import Dots from "../../../icons/Dots";
import theme from "../../../theme";
import AreaStack from "./AreaStack";

interface Props {
}

export const EditMenu: FunctionComponent<Props> = (props) => {

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 200,
    width: 300,
    borderRadius: 20,
    backgroundColor: 'white'
  },
});
