import React, { FunctionComponent, useEffect, useRef } from "react";
import { Animated, Dimensions, Easing, StyleSheet, View } from "react-native";
import { AppStore } from "../../../AppStore";
import { ScrollSheetSwitch } from "../../../components/ScrollSheetSwitch";
import { Selections } from "./Header";

interface Props {}

const HomeBody: FunctionComponent<Props> = (props) => {

  const [home, homeActions] = AppStore.home.use();

  return (
    <View style={[style.container]}>
      <ScrollSheetSwitch
        scrollSheets={Selections}
        currentSheet={home.currentList}
        selectSheet={homeActions.selectList}
        onScrollBegin={homeActions.updateBeginVerticalScroll}
        onScroll={homeActions.updateVerticalScroll}
      />
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    marginTop: 100,
  },
});

export { HomeBody };
