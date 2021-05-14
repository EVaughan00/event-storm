
import React, { FC, useEffect } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { AppNavigation } from '../../../AppNavigation';
import { FloatingAddButton } from '../../../components/FloatingAddButton';
import { NavigationProps } from '../../../helpers/NavigationProps';
import { AuthenticationContext } from '../../../providers/AuthenticationProvider';
import { HomeBody } from '../components/Body';
import { HomeFooter } from '../components/Footer';
import { HomeHeader } from '../components/Header';

export interface HomeScreenProps {
}

const HomeScreen: FC<NavigationProps<AppNavigation, "Home">> = props => {
  const { navigate } = props.navigation;
  const authContext = React.useContext(AuthenticationContext);

  useEffect(() => {
      if (!authContext.authenticated)
        navigate("Authenticated", {});

  }, [authContext.authenticated])

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeAreaView}>
        <HomeHeader  />
        <HomeBody />
        <HomeFooter />
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

export default HomeScreen;