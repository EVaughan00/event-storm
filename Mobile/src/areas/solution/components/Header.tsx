import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import { FunctionComponent, useState } from "react";
import { StyleSheet, View } from "react-native";
import { useTheme } from "react-native-paper";
import { FloatingPopup } from "../../../components/FloatingPopup";
import { ToolCheckbox } from "../../../components/Form/Custom/ToolCheckbox";
import { Typography } from "../../../components/Typography";
import SvgBackArrow from "../../../icons/BackArrow";
import Dots from "../../../icons/Dots";
import theme from "../../../theme";
import { EditMenu } from "./EditMenu";

interface Props {
  title: string
}

export const SolutionHeader: FunctionComponent<Props> = (props) => {

  const [showEditMenu, setShowEditMenu] = useState(false)

  const navigation = useNavigation();

  const handleCloseEditMenu = () => {
    setShowEditMenu(false)
  }

  return (
    <View>
      <FloatingPopup
        visible={showEditMenu}
        onDismiss={handleCloseEditMenu}
      >
        <EditMenu />
      </FloatingPopup>
      <View style={styles.container}>
        <SvgBackArrow
          style={{ color: "grey" }}
          width={"25"}
          height={"25"}
          onPress={() => navigation.goBack()}
        />
        <Typography.Title level={2}>{props.title}</Typography.Title>
        <Dots onPress={() => setShowEditMenu(true)} width={"30"} height={"30"}></Dots>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: 'center',
    marginBottom: theme.unit * 1
  },
});
