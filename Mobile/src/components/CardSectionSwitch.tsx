import React, { Dispatch, FunctionComponent, ReactElement, useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";

interface Props {
  currentSection: number;
  collapseOffset: number;
  children: ReactElement[];
  onScroll?: (value: number) => void;
  onScrollEnd?: (value: number) => void;
  onScrollBegin?: (value: number) => void;
  selectSection: (sectionIndex: number) => void;
  onScrollDeltaSurpassed?: (surpassed: boolean) => void
}

export interface CardSectionSyncronizer {
  currentSection: number;
  collapseOffset: number;
  onScroll?: (value: number) => void;
  onScrollEnd?: (value: number) => void;
  onScrollBegin?: (value: number) => void;
  currentSynchronizedCollapseOffset: Animated.Value;
  updateCurrentSynchronizedCollapseOffset: (value: number) => void;
}

export const Synchronized = React.createContext<CardSectionSyncronizer>({} as CardSectionSyncronizer)

const CardSectionSwitch: FunctionComponent<Props> = (props) => {

  const scrollView = useRef<ScrollView>(null);
  const [manualScroll, setManualScroll] = useState(false);
  const [scrollOffsets, setScrollOffsets] = useState<number[]>([]);
  const [syncronizedCollapseOffset, setSyncronizedCollapseOffset] = useState(0)
  const currentSyncronizedCollapseOffset = new Animated.Value(syncronizedCollapseOffset);

  const syncronizer: CardSectionSyncronizer = {
    currentSection: props.currentSection,
    collapseOffset: props.collapseOffset,
    currentSynchronizedCollapseOffset: currentSyncronizedCollapseOffset,
    onScroll: props.onScroll,
    onScrollEnd: props.onScrollEnd,
    onScrollBegin: props.onScrollBegin,
    updateCurrentSynchronizedCollapseOffset: setSyncronizedCollapseOffset
  }

  useEffect(() => {
    var scrollOffsets: number[] = []
    props.children?.forEach((_, index) => {
      scrollOffsets.push(index * Dimensions.get("window").width)
    });
    setScrollOffsets(scrollOffsets)
  }, [])

  useEffect(() => {
    if (scrollView.current !== null && !manualScroll) {
      scrollView.current.scrollTo({
        x: Dimensions.get("window").width * props.currentSection,
        animated: true,
      });
    }
  }, [props.currentSection]);

  const handleScrollSnap = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (manualScroll) {
      var nextIndex = Math.max(Math.min(Math.floor(
        event.nativeEvent.contentOffset.x /
          (Dimensions.get("window").width / 2)
      ), props.children.length - 1), 0)
  
      if (nextIndex != props.currentSection) {
        props.selectSection(nextIndex);
      }
      setManualScroll(false)
    }
  }

  var dynamicStyles = {
    container: {
      width: props.children.length * Dimensions.get("window").width
    }
  }

  return (
    <ScrollView
      ref={scrollView}
      horizontal={true}
      decelerationRate="fast"
      snapToOffsets={scrollOffsets}
      showsHorizontalScrollIndicator={false}
      onMomentumScrollEnd={handleScrollSnap}
      onScrollBeginDrag={() => setManualScroll(true)}
      contentContainerStyle={[styles.container, dynamicStyles.container]}
    >
      <Synchronized.Provider value={syncronizer}>
        { props.children }
      </Synchronized.Provider>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: Dimensions.get("window").width,
  }, 
  listContainer: {},
  selector: {
    color: "white",
  },
});

export { CardSectionSwitch };
