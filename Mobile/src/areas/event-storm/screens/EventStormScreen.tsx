
import React, { FC, useEffect } from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { AppNavigation } from '../../../AppNavigation';
import { AppStore } from '../../../AppStore';
import { NavigationProps } from '../../../helpers/NavigationProps';
import { AuthenticationContext } from '../../../providers/AuthenticationProvider';
import SolutionViewModel from '../../../services/solution/models/SolutionViewModel';
import theme from '../../../theme';
import { EventStormBody } from '../components/Body';


export interface EventStormScreenProps {
  solution: SolutionViewModel
}

const EventStormScreen: FC<NavigationProps<AppNavigation, "Solution">> = props => {

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
      <View style={styles.gridContainer}>
        <EventStormBody/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    paddingHorizontal: 0,
  },
  gridContainer: {
    justifyContent: 'center',
    alignItems: 'center'
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
  },
  button: {
    position: "absolute",
    alignSelf: "center",
    height: 30,
    width: "90%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "purple",
    borderRadius: 8,
    top: "90%",
  },
});

export default EventStormScreen;