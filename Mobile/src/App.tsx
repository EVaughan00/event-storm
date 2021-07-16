import { NavigationContainer } from "@react-navigation/native";
import React, { FunctionComponent } from "react";
import { Header } from "react-native/Libraries/NewAppScreen";
import { AppStack } from "./AppNavigation";
import { AuthenticatedScreen } from "./areas/account/screens/AuthenticatedScreen";
import { RegisterScreen } from "./areas/account/screens/RegisterScreen";
import EventStormScreen from "./areas/event-storm/screens/EventStormScreen";
import { HomeHeader } from "./areas/home/components/Header";
import HomeScreen from "./areas/home/screens/HomeScreen";
import SolutionScreen from "./areas/solution/screens/SolutionScreen";
import { EmptyHeader } from "./components/Header";
import { ENV } from "./env";
import { AuthenticationProvider } from "./providers/AuthenticationProvider";
import { WebSocketProvider } from "./providers/WebSocketProvider";
import { WelcomeScreen } from "./screens/WelcomeScreen";
import { HealthCheckService } from "./services/support/HealthCheckService";

const App: FunctionComponent = (props) => {
  HealthCheckService.checkServer().then((hc) => {
    if (hc.healthy) console.log("Server available");
    else console.error("Server unavailable...");
  });

  return (
    <AuthenticationProvider>
      <WebSocketProvider>
        <NavigationContainer
          documentTitle={{
            enabled: true,
            formatter: (o, route) =>
              `${ENV.titleSuffix} | ${route?.name ?? "Home"}`,
          }}
        >
          <AppStack.Navigator initialRouteName="Welcome" headerMode="none">
            <AppStack.Screen
              name="Welcome"
              component={WelcomeScreen}
            />

            <AppStack.Screen
              name="Home"
              component={HomeScreen}
            />

            <AppStack.Screen
              name="Solution"
              component={SolutionScreen}
            />

            <AppStack.Screen
              name="EventStorm"
              component={EventStormScreen}
            />

            <AppStack.Screen name="Register" component={RegisterScreen} />

            <AppStack.Screen
              name="Authenticated"
              component={AuthenticatedScreen}
            />
          </AppStack.Navigator>
        </NavigationContainer>
      </WebSocketProvider>
    </AuthenticationProvider>
  );
};

export { App };
