import { StackHeaderProps } from "@react-navigation/stack";
import React, { FunctionComponent, useEffect, useRef } from "react";
import { Animated, Dimensions } from "react-native";
import { StatusBar, StyleSheet, View } from "react-native";
import { Easing } from "react-native";
import { AppStore } from "../../../AppStore";
import { LargeHeader } from "../../../components/Header";
import { Typography } from "../../../components/Typography";
import { SvgLightning } from "../../../icons/Lightning";
import { CardSection } from "../../../components/CardSection";
import theme from "../../../theme";
import { TabSwitch } from "../../../components/SelectionSwitch";

interface HomeHeaderProps {
}

interface MiddleRowContentProps {
  title: string;
  subTitle: string;
}

const HomeHeader: FunctionComponent<HomeHeaderProps> = (props) => {

  const [home] = AppStore.home.use();

  const dynamicStyles = {
    interactables: {
    }
  };

  return (
    <View>
      <Animated.View style={[styles.interactables, dynamicStyles.interactables]}>
        <TopRowContent></TopRowContent>
      </Animated.View>
      <LargeHeader
        scrolling={
            home.verticalScroll.contentOffset ? 
            home.verticalScroll.contentOffset.y > 20 :
            false
          }
      > 
      <MiddleRowContent 
            title={"Event Storming For The"}
            subTitle={"modern.developer;"}
         ></MiddleRowContent>
        <SvgLightning />
      </LargeHeader>
    </View>
  );
};

const TopRowContent: FunctionComponent = () => { 

  const [home, homeActions] = AppStore.home.use()

  const tabs: string[] = ["Solutions", "Templates"]

  return (
    <Animated.View style={[styles.topContainer]}>
      <TabSwitch
        tabs={tabs}
        justifyContent={"space-between"}
        currentTab={home.currentCardSection}
        setTab={homeActions.selectCardSection}
      ></TabSwitch>
    </Animated.View>
  );
};

const MiddleRowContent: FunctionComponent<MiddleRowContentProps> = (props) => {
  return (
    <View style={styles.middleContainer}>
      <Typography.Title style={styles.title} level={2}>
        {props.title}
      </Typography.Title>
      <Typography.SubTitle style={styles.subTitle} level={3}>
        {props.subTitle}
      </Typography.SubTitle>
    </View>
  );
};

const styles = StyleSheet.create({
  interactables: {
    width: "100%",
    position: 'absolute',
    zIndex: 1,
    justifyContent: 'flex-start',
  },
  topContainer: {
    flex: 1,
    marginTop: StatusBar.currentHeight ? StatusBar.currentHeight : 0,
    height: 70
  },
  middleContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    marginTop: 120
  },
  title: {
    color: "white",
    marginBottom: 0,
  },
  subTitle: {
    color: "#00B2FF",
  },
});

export { HomeHeader };
