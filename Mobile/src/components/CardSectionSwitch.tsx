import React, { Dispatch, FunctionComponent, ReactElement, useEffect, useRef, useState } from "react";
import {
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";

interface Props {
  currentSection: number;
  children: ReactElement[];
  selectSection: (sectionIndex: number) => void;
  collapseOffset: number;
  onScroll?: (event: NativeScrollEvent) => void;
  onScrollBegin?: (event: NativeScrollEvent) => void;
}

export interface CardSectionSyncronizer {
  currentSection: number;
  collapseOffset: number;
  currentSynchronizedCollapseOffset: number;
  updateCurrentSynchronizedCollapseOffset: Dispatch<React.SetStateAction<number>>;
  onScroll?: (event: NativeScrollEvent) => void;
  onScrollBegin?: (event: NativeScrollEvent) => void;
}

export const Synchronized = React.createContext<CardSectionSyncronizer>({} as CardSectionSyncronizer)

const CardSectionSwitch: FunctionComponent<Props> = (props) => {

  const [manualScroll, setManualScroll] = useState(false);
  const [scrollOffsets, setScrollOffsets] = useState<number[]>([]);
  const [currentSyncronizedCollapseOffset, updateCurrentSynchronizedCollapseOffset] = useState(0);

  const syncronizer: CardSectionSyncronizer = {
    currentSection: props.currentSection,
    collapseOffset: props.collapseOffset,
    currentSynchronizedCollapseOffset: currentSyncronizedCollapseOffset,
    onScroll: props.onScroll,
    onScrollBegin: props.onScrollBegin,
    updateCurrentSynchronizedCollapseOffset: updateCurrentSynchronizedCollapseOffset,
  }

  const scrollView = useRef<ScrollView>(null);

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
        setManualScroll(false);
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
      contentContainerStyle={[styles.container, dynamicStyles.container]}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      snapToOffsets={scrollOffsets}
      ref={scrollView}
      decelerationRate="fast"
      onScrollBeginDrag={() => setManualScroll(true)}
      onMomentumScrollEnd={handleScrollSnap}
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
