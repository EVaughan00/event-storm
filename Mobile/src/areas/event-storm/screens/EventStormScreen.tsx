
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
  const [store, storeActions] = AppStore.eventStorm.use()

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
    backgroundColor: 'white'
  },
  gridContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default EventStormScreen;