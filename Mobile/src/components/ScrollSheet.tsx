import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
  RefreshControl,
  StyleSheet,
  View
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import theme from "../theme";
import { MaterialInput } from "./Form/Material/MaterialInput";

interface Props {
  name: string;
  active: boolean;
  children?: any;
  refreshing?: boolean
  collapseOffset: number;
  syncronizedCollapseOffset: Animated.Value;
  onRefresh?: () => void;
  onScroll?: (value: number) => void
  onScrollEnd?: (value: number) => void
  onScrollBegin?: (value: number) => void
  updateSynchronizedCollapseOffset: (value: number) => void;
}

interface SearchableScrollSheetProps extends Props {
  searchFilter: string
  setSearchFilter: (value: string) => void
}

const SearchableScrollSheet: FunctionComponent<SearchableScrollSheetProps> = (
  props
) => {

  return (
    <ScrollSheet {...props}>
        <MaterialInput
          borderless
          size={"small"}
          style={styles.input}
          value={props.searchFilter}
          onUpdate={props.setSearchFilter}
          label={"Search for your " + props.name + "..."}
        />
        {props.children}
    </ScrollSheet>
  );
};

const ScrollSheet: FunctionComponent<Props> = (props) => {

  const [scrollOffset,] = useState(new Animated.Value(0));
  const [surpassedDelta, setSurpassedDelta] = useState(false);

  const scrollRef = useRef<ScrollView>(null);

  useEffect(() => {
    var offset: number;
    if (scrollRef.current != null && !props.active) {
      if ((props.syncronizedCollapseOffset as any)._value > props.collapseOffset) {
        offset = Math.max(props.collapseOffset, (scrollOffset as any)._value)
      } else {
        offset = (props.syncronizedCollapseOffset as any)._value
      }
      scrollRef.current.scrollTo({
        y: offset,
        animated: false,
      });
    }
  }, [(props.syncronizedCollapseOffset as any)._value]);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    props.onScroll?.(event.nativeEvent.contentOffset.y)
  }

  const handleScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (props.active)
      props.updateSynchronizedCollapseOffset(event.nativeEvent.contentOffset.y); 

      props.onScrollEnd?.(event.nativeEvent.contentOffset.y)
  }

  const handleScrollBegin = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    props.onScrollBegin?.(event.nativeEvent.contentOffset.y)
  }

  const dynamicStyles = {
    scrollView: {
      paddingTop: props.collapseOffset ? props.collapseOffset : 0,
    },
  };

  return (
    <Animated.View style={styles.container}>
      <Animated.ScrollView
        ref={scrollRef}
        bouncesZoom={false}
        overScrollMode={"never"}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={dynamicStyles.scrollView}
        onMomentumScrollEnd={handleScrollEnd}
        onScrollBeginDrag={handleScrollBegin}
        refreshControl={
          <RefreshControl 
            onRefresh={props.onRefresh}
            refreshing={props.refreshing!}
            colors={[theme.colors.primary]}
            progressViewOffset={props.collapseOffset/2}

          />
        }
        onScroll={Animated.event([{
          nativeEvent: {contentOffset: {y: scrollOffset}},
          }], {
              listener: (event: NativeSyntheticEvent<NativeScrollEvent>) => {
                handleScroll(event)
              },
              useNativeDriver: false,
          })}
      >
        <View style={styles.sheet}>{props.children}</View>
      </Animated.ScrollView>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    width: Dimensions.get("window").width - 6,
    marginHorizontal: 3,
  },
  sheet: {
    alignItems: "center",
    paddingVertical: 25,
    backgroundColor: "#FAFAFA",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    minHeight: Dimensions.get("screen").height - 150,
  },
  input: {
    width: 350,
    backgroundColor: "#fff",
    borderRadius: 4,
    elevation: 10,
  },
});

export { ScrollSheet, SearchableScrollSheet };
