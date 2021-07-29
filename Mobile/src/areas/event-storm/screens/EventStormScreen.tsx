
import React, { FC, useEffect } from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { AppNavigation } from '../../../AppNavigation';
import { AppStore } from '../../../AppStore';
import { NavigationProps } from '../../../helpers/NavigationProps';
import { AuthenticationContext } from '../../../providers/AuthenticationProvider';
import SolutionViewModel from '../../../services/solution/models/SolutionViewModel';
import { EventStormBody } from '../components/Body';
import { EventStormHeader } from '../components/Header';


export interface EventStormScreenProps {
  solution: SolutionViewModel
}

const EventStormScreen: FC<NavigationProps<AppNavigation, "Solution">> = props => {

  const { navigate } = props.navigation;
  const authContext = React.useContext(AuthenticationContext);
  const [store, storeActions] = AppStore.eventStorm.use()

  useEffect(() => {
    storeActions.setCurrentSolution(props.route.params.solution)
    storeActions.updateEventStorm(true)
}, [props.route.params.solution])

  useEffect(() => {
      if (!authContext.authenticated)
        navigate("Authenticated", {});

  }, [authContext.authenticated])

  return (
    <View style={styles.container}>
      <EventStormHeader />
      <EventStormBody/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: StatusBar.currentHeight,
    paddingHorizontal: 0,
    backgroundColor: 'white',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    height: '100%',
    width: '100%'
  },
});

export default EventStormScreen;