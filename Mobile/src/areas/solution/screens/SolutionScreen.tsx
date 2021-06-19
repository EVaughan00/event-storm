
import React, { FC, useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, View } from 'react-native';
import { Divider } from 'react-native-paper';
import { AppNavigation } from '../../../AppNavigation';
import { AppStore } from '../../../AppStore';
import { FloatingAddButton } from '../../../components/FloatingAddButton';
import { Paper } from '../../../components/Surfaces';
import { Typography } from '../../../components/Typography';
import { NavigationProps } from '../../../helpers/NavigationProps';
import SvgBackArrow from '../../../icons/BackArrow';
import Dots from '../../../icons/Dots';
import { AuthenticationContext } from '../../../providers/AuthenticationProvider';
import SolutionViewModel from '../../../services/solution/models/SolutionViewModel';
import theme from '../../../theme';
import AreaStack from '../components/AreaStack';


export interface SolutionScreenProps {
  solution: SolutionViewModel
}

const SolutionScreen: FC<NavigationProps<AppNavigation, "Solution">> = props => {

  const { navigate } = props.navigation;
  const authContext = React.useContext(AuthenticationContext);
  const { solution } = props.route.params

  useEffect(() => {
      if (!authContext.authenticated)
        navigate("Authenticated", {});

  }, [authContext.authenticated])

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollView}
      >
        <Paper>
          <View style={styles.headerContainer}>
            <SvgBackArrow style={{color: 'grey'}} width={"20"} height={"20"} onPress={() => props.navigation.pop(1)}/>
            <Typography.Title level={2}>{solution.name}</Typography.Title>
            <Dots onPress={() => {}} width={"30"} height={"30"}></Dots>
          </View>
          <Divider style={styles.divider} />
          <AreaStack
            type={"select"}
          ></AreaStack>
        </Paper>
      </ScrollView>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    paddingHorizontal: 0,
  },
  headerContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: 'center',
    marginBottom: theme.unit * 1
  },
  scrollView: {
    backgroundColor: "#fff",
    paddingHorizontal: 0,
    marginHorizontal: 0,
  },
  text: {
    textAlign: "left",
    fontSize: 30,
  },
  divider: {
    borderWidth: 1,
    opacity: 0.2,
    marginBottom: theme.unit * 2
}
});

export default SolutionScreen;