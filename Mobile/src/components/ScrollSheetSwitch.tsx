import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import {
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Solution from "../models/Solution";
import { SearchableItem, SearchableScrollSheet } from "./ScrollSheet";

interface Props {
  scrollSheets: string[];
  currentSheet: number;
  selectSheet: (sheetIndex: number) => void;
  collapseOffset: number;
  searchable?: boolean;
  onScroll?: (event: NativeScrollEvent) => void;
  onScrollBegin?: (event: NativeScrollEvent) => void;
}

const ScrollSheetSwitch: FunctionComponent<Props> = (props) => {
  const [manualScroll, setManualScroll] = useState(false);
  const [syncronizedCollapseOffset, setSyncronizedCollapseOffset] = useState(0);

  const scrollView = useRef<ScrollView>(null);

  const solutions: SearchableItem[] = [
    new Solution("Solution 123"),
    new Solution("Solution abc"),
    new Solution("Solution xyz"),
  ];

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
      var index = Math.max(
        Math.floor(
          event.nativeEvent.contentOffset.x /
            (Dimensions.get("window").width / 2)
        ),
        0
      );

      if (index != props.currentSheet) {
        props.selectSheet(index);
        setManualScroll(false);
      }
    }
  };

  const mapScrollSheets = (current: number) => {
    return props.scrollSheets.map((selection: string, index: number) => (
      <SearchableScrollSheet
        key={index}
        items={solutions}
        searchLabel={"Search for " + selection + "..."}
        emptySearchResult={"Oops.. couldn't find any"}
        syncronizedCollapseOffset={syncronizedCollapseOffset}
        updateSynchronizedCollapseOffset={setSyncronizedCollapseOffset}
        active={index == current}
        collapseOffset={props.collapseOffset}
        onScroll={props.onScroll}
        onScrollBegin={props.onScrollBegin}
      ></SearchableScrollSheet>
    ));
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      snapToOffsets={[0, Dimensions.get("window").width]}
      ref={scrollView}
      onScrollBeginDrag={() => setManualScroll(true)}
      onMomentumScrollEnd={() => setManualScroll(false)}
      onScroll={handleManualScroll}
    >
      {mapScrollSheets(props.currentSheet)}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: 2 * Dimensions.get("window").width,
  },
  listContainer: {},
  selector: {
    color: "white",
  },
});

export { ScrollSheetSwitch };
