import { StackHeaderProps } from "@react-navigation/stack";
import React, { FunctionComponent, useEffect, useRef } from "react";
import { Animated, Dimensions } from "react-native";
import { StatusBar, StyleSheet, View } from "react-native";
import { Easing } from "react-native";
import { AppStore } from "../../../AppStore";
import { LargeHeader } from "../../../components/Header";
import { SelectionSwitch } from "../../../components/SelectionSwitch";
import { Typography } from "../../../components/Typography";
import { SvgLightning } from "../../../icons/Lightning";

export const Selections: string[] = ["solutions", "templates"];

interface HomeHeaderProps {}

interface MiddleRowContentProps {
  title: string;
  subTitle: string;
}

const HomeHeader: FunctionComponent<HomeHeaderProps> = (props) => {

  const [home] = AppStore.home.use();

  const slowScrollAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (home.verticalScrollEvent.contentOffset != undefined) {
      Animated.timing(slowScrollAnimation, {
        toValue: -home.verticalScrollEvent.contentOffset.y*0.3,
        duration: 1,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start(() => {});
    }
    return () => {};
  }, [home.verticalScrollEvent.contentOffset]);

  const dynamicStyles = {
    interactables: {
      transform: [
        {
          translateY: slowScrollAnimation
        },
      ],
    }
  };

  return (
    <View>
      <Animated.View style={[styles.interactables, dynamicStyles.interactables]}>
        <TopRowContent></TopRowContent>
      </Animated.View>
      <LargeHeader > 
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

  return (
    <Animated.View style={[styles.topContainer]}>
      <SelectionSwitch
        selections={Selections}
        justifyContent={"space-between"}
        currentSelection={home.currentList}
        setSelection={homeActions.selectList}
      ></SelectionSwitch>
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
    zIndex: 1
  },
  topContainer: {
    flex: 1,
    marginTop: StatusBar.currentHeight ? StatusBar.currentHeight + 10 : 0 + 10,
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
