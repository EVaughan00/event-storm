import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import {
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { CardableItem } from "../services/general/models/CardItem";
import { SearchableScrollSheet } from "./ScrollSheet";

interface Props {
  scrollSheets: CardSection[];
  currentSheet: number;
  selectSheet: (sheetIndex: number) => void;
  collapseOffset: number;
  data: Array<CardableItem>;
  loading: boolean;
  searchable?: boolean;
  onScroll?: (event: NativeScrollEvent) => void;
  onScrollBegin?: (event: NativeScrollEvent) => void;
}

const ScrollSheetSwitch: FunctionComponent<Props> = (props) => {
  const [manualScroll, setManualScroll] = useState(false);
  const [syncronizedCollapseOffset, setSyncronizedCollapseOffset] = useState(0);

  const scrollView = useRef<ScrollView>(null);

  var snapToScrollOffsets: number[] = []

  props.scrollSheets.forEach((sheet, index) => {
    snapToScrollOffsets.push(index * Dimensions.get("window").width)
  });

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
    return props.scrollSheets.map((section: CardSection, index: number) => (
      <SearchableScrollSheet
        key={index}
        name={section.name}
        items={props.data}
        loading={props.loading}
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
      snapToOffsets={snapToScrollOffsets}
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
    height: "100%",
    backgroundColor: 'white'
  },
  listContainer: {},
  selector: {
    color: "white",
  },
});

export { ScrollSheetSwitch };
