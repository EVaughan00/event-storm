import React, { FunctionComponent, useEffect, useRef } from "react";
import {
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { AppStore } from "../../../AppStore";
import { ScrollSheetSwitch } from "../../../components/ScrollSheetSwitch";
import { sleep } from "../../../helpers/sleep";
import { Selections } from "./Header";

interface Props {}

const HomeBody: FunctionComponent<Props> = (props) => {
  const [home, homeActions] = AppStore.home.use();

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={style.container}
      onScroll={({ nativeEvent }) =>
        homeActions.updateVerticalScrollEvent(nativeEvent)
      }
      onMomentumScrollEnd={({ nativeEvent }) =>
        homeActions.updateVerticalScrollEvent(nativeEvent)
      }
    >
      <ScrollSheetSwitch
        scrollSheets={Selections}
        justifyContent={"center"}
        currentSheet={home.currentList}
        selectSheet={homeActions.selectList}
      />
    </ScrollView>
  );
};

const style = StyleSheet.create({
  container: {},
});

export { HomeBody };
