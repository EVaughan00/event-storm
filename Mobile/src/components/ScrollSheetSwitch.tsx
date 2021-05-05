import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import { View, StyleSheet, Dimensions, NativeSyntheticEvent, NativeScrollEvent } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { AppStore } from "../AppStore";
import { HomeLists } from "../helpers/consts";
import { SelectableViewModel } from "../models/ViewModel";
import { BaseStore, IActions, IState } from "../utils/BaseStore";
import Card from "./Card";
import { MaterialInput } from "./Form/Material/MaterialInput";
import ScrollSheet from "./ScrollSheet";
import { Typography } from "./Typography";

interface Props {
  scrollSheets: string[];
  justifyContent?: "center" | "space-evenly" | "space-between" | "space-around";
  currentSheet: number
  selectSheet: (sheetIndex: number) => void
}

const ScrollSheetSwitch: FunctionComponent<Props> = (props) => {
  const [searchValue, setSearchValue] = useState("");
  const [manualScroll, setManualScroll] = useState(false);
  const scrollView = useRef<ScrollView>(null);

  const dynamicStyles = {
    container: {
      justifyContent: props.justifyContent
        ? props.justifyContent
        : "space-around",
    },
  };

  const mapScrollSheets = (current: number) => {
    return props.scrollSheets.map((selection: string, index: number) => (
      <ScrollSheet key={index}>
        <MaterialInput
          size={"small"}
          style={styles.input}
          value={searchValue}
          onChangeText={setSearchValue}
          label={"Search for " + selection + "..."}
        />
        <Card item={new SelectableViewModel("example")} onPress={() => {}} />
        <Card item={new SelectableViewModel("example")} onPress={() => {}} />
      </ScrollSheet>
    ));
  };

  useEffect(() => {
    if (scrollView.current !== null && !manualScroll) {
      scrollView.current.scrollTo({
        x: Dimensions.get("window").width * props.currentSheet,
        animated: true,
      });
    }
  }, [props.currentSheet]);

  const handleManualScroll = (
    event: NativeSyntheticEvent<NativeScrollEvent>
  ) => {
      if (manualScroll) {

        var index = Math.max(Math.floor(event.nativeEvent.contentOffset.x/(Dimensions.get("window").width/2)),0)

        if (index != props.currentSheet) {
          props.selectSheet(index);
          setManualScroll(false)
        }
      }
  };


  return (
    <ScrollView
      contentContainerStyle={[styles.container, dynamicStyles.container]}
      horizontal={true}
      snapToOffsets={[0, Dimensions.get("window").width]}
      ref={scrollView}
      onScrollBeginDrag={() => setManualScroll(true)}
      onMomentumScrollEnd={() => setManualScroll(false)}
      onScroll={handleManualScroll}
      bounces={false}
      alwaysBounceHorizontal={false}
    >
      {mapScrollSheets(props.currentSheet)}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 220,
    flexDirection: "row",
    justifyContent: "space-around",
    width: 2 * Dimensions.get("window").width,
  },
  listContainer: {
  },
  input: {
    width: 350,
    backgroundColor: "#fff",
    borderRadius: 4,
    elevation: 10
  },
  selector: {
    color: "white",
  },
});

export { ScrollSheetSwitch };
