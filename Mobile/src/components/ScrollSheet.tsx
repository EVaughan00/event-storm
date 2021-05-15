import {
  View,
  StyleSheet,
  Dimensions,
  NativeScrollEvent,
  SafeAreaView,
  NativeSyntheticEvent,
} from "react-native";
import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import { MaterialInput } from "./Form/Material/MaterialInput";
import Card from "./Card";
import { Typography } from "./Typography";
import { ScrollView } from "react-native-gesture-handler";
import { AppStore } from "../AppStore";
import { Animated } from "react-native";

interface Props {
  active: boolean;
  syncronizedCollapseOffset: number;
  updateSynchronizedCollapseOffset: (value: number) => void;
  onScroll?: (event: NativeScrollEvent) => void
  onScrollBegin?: (event: NativeScrollEvent) => void
  collapseOffset: number;
  children?: any;
}

interface SearchableItem {
  name: string;
  id?: string;
}

interface SearchableScrollSheetProps extends Props {
  items: SearchableItem[];
  searchLabel: string;
  emptySearchResult: string;
}

const SearchableScrollSheet: FunctionComponent<SearchableScrollSheetProps> = (
  props
) => {
  const [renderedItems, setRenderedItems] = useState(props.items);
  const [searchFilter, setSearchFilter] = useState("");

  useEffect(() => {
    setRenderedItems(
      props.items.filter((entity) =>
        entity.name.includes(searchFilter ? searchFilter : "")
      )
    );
    return () => {};
  }, [searchFilter]);

  return (
    <ScrollSheet {...props}>
      <MaterialInput
        size={"small"}
        style={styles.input}
        value={searchFilter}
        onUpdate={setSearchFilter}
        label={props.searchLabel}
      />
      {renderedItems.length > 0 ? (
        renderedItems.map((item: SearchableItem, index: number) => (
          <Card key={index} onPress={() => {}} item={item}></Card>
        ))
      ) : (
        <Typography.SubTitle level={2}>
          {props.emptySearchResult}
        </Typography.SubTitle>
      )}
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

  const handleBeginScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (props.onScrollBegin != undefined) {
      props.onScrollBegin(event.nativeEvent)
    } 
  }

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (props.onScrollBegin != undefined) {
      props.onScrollBegin(event.nativeEvent)
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
    backgroundColor: "#FFF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    minHeight: Dimensions.get('screen').height - 144
  },
  input: {
    width: 350,
    backgroundColor: "#fff",
    borderRadius: 4,
    elevation: 10,
  },
});

export { ScrollSheet, SearchableScrollSheet, SearchableItem };
