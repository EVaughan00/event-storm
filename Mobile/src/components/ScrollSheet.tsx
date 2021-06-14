import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  View
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { MaterialInput } from "./Form/Material/MaterialInput";

interface Props {
  active: boolean;
  name: string;
  syncronizedCollapseOffset: number;
  updateSynchronizedCollapseOffset: (value: number) => void;
  onScroll?: (event: NativeScrollEvent) => void;
  onScrollBegin?: (event: NativeScrollEvent) => void;
  collapseOffset: number;
  children?: any;
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
  const [scrollOffset, setScrollOffset] = useState(0);

  const scrollRef = useRef<ScrollView>(null);
  var offset: number;

  useEffect(() => {
    if (scrollRef.current != null && !props.active) {
      offset =
        props.syncronizedCollapseOffset > props.collapseOffset
          ? Math.max(props.collapseOffset, scrollOffset)
          : props.syncronizedCollapseOffset;
      scrollRef.current.scrollTo({
        y: offset,
        animated: false,
      });
    }
  }, [props.syncronizedCollapseOffset]);

  const handleBeginScroll = (
    event: NativeSyntheticEvent<NativeScrollEvent>
  ) => {
    if (props.onScrollBegin != undefined && props.active) {
      props.onScrollBegin(event.nativeEvent);
    }
  };

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (props.onScroll != undefined && props.active) {
      props.onScroll(event.nativeEvent);
    }
    if (props.active) {
      props.updateSynchronizedCollapseOffset(event.nativeEvent.contentOffset.y);
    }
    setScrollOffset(event.nativeEvent.contentOffset.y);
  };

  const dynamicStyle = {
    scrollView: {
      paddingTop: props.collapseOffset ? props.collapseOffset : 0,
    },
  };

  return (
    <View style={styles.container}>
      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={dynamicStyle.scrollView}
        bouncesZoom={false}
        overScrollMode={"never"}
        ref={scrollRef}
        onScroll={handleScroll}
        onScrollBeginDrag={handleBeginScroll}
        scrollEventThrottle={16}
      >
        <View style={styles.sheet}>{props.children}</View>
      </Animated.ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    width: Dimensions.get("window").width - 6,
    marginHorizontal: 3,
  },
  sheet: {
    alignItems: "center",
    paddingVertical: 20,
    backgroundColor: "#FAFAFA",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    minHeight: Dimensions.get("screen").height - 144,
  },
  input: {
    width: 350,
    backgroundColor: "#fff",
    borderRadius: 4,
    elevation: 10,
  },
});

export { ScrollSheet, SearchableScrollSheet };
