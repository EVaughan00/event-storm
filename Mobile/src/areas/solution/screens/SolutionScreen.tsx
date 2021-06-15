
import React, { FC, useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { AppNavigation } from '../../../AppNavigation';
import { AppStore } from '../../../AppStore';
import { FloatingAddButton } from '../../../components/FloatingAddButton';
import { NavigationProps } from '../../../helpers/NavigationProps';
import { AuthenticationContext } from '../../../providers/AuthenticationProvider';


export interface SolutionScreenProps {
}

const SolutionScreen: FC<NavigationProps<AppNavigation, "Solution">> = props => {

  const { navigate } = props.navigation;
  const authContext = React.useContext(AuthenticationContext);

  useEffect(() => {
      if (!authContext.authenticated)
        navigate("Authenticated", {});

  }, [authContext.authenticated])

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeAreaView}>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    backgroundColor: '#000',
    alignItems: 'center',
  },
  safeAreaView: {
    width: "100%",
    height: "100%",
  },
  text: {
    fontSize: 30
  },
});

export default SolutionScreen;