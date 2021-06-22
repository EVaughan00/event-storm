
import React, { FC, useEffect } from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { Divider } from 'react-native-paper';
import { AppNavigation } from '../../../AppNavigation';
import { AppStore } from '../../../AppStore';
import { ScrollPaper } from '../../../components/Surfaces';
import { NavigationProps } from '../../../helpers/NavigationProps';
import { AuthenticationContext } from '../../../providers/AuthenticationProvider';
import SolutionViewModel from '../../../services/solution/models/SolutionViewModel';
import theme from '../../../theme';
import { SolutionBody } from '../components/Body';
import { SolutionHeader } from '../components/Header';


export interface SolutionScreenProps {
  solution: SolutionViewModel
}

const SolutionScreen: FC<NavigationProps<AppNavigation, "Solution">> = props => {

  const { navigate } = props.navigation;
  const authContext = React.useContext(AuthenticationContext);
  const [store, storeActions] = AppStore.solution.use()

  useEffect(() => {
    storeActions.setCurrentSolution(props.route.params.solution)
}, [props.route.params.solution])

  useEffect(() => {
      if (!authContext.authenticated)
        navigate("Authenticated", {});

  }, [authContext.authenticated])

  return (
    <View style={styles.container}>
        <ScrollPaper
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollView}
        >
          <SolutionHeader />
          <Divider style={styles.divider} />
          <SolutionBody />
        </ScrollPaper>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    paddingHorizontal: 0,
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