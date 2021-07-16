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
  active: boolean;
  name: string;
  syncronizedCollapseOffset: number;
  collapseOffset: number;
  children?: any;
  refreshing?: boolean
  updateSynchronizedCollapseOffset: (value: number) => void;
  onScroll?: (event: NativeScrollEvent) => void;
  onScrollBegin?: (event: NativeScrollEvent) => void;
  onRefresh?: () => void
}

interface SearchableScrollSheetProps extends Props {
  searchFilter: string
  setSearchFilter: (value: string) => void
}

const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
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
      if (props.syncronizedCollapseOffset > props.collapseOffset) {
        offset = Math.max(props.collapseOffset, scrollOffset)
      } else {
        offset = props.syncronizedCollapseOffset
      }
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
    if (props.onScroll != undefined && props.active)
      props.onScroll(event.nativeEvent);
    if (props.active)
      props.updateSynchronizedCollapseOffset(event.nativeEvent.contentOffset.y);      
    setScrollOffset(event.nativeEvent.contentOffset.y);
  };

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const dynamicStyles = {
    scrollView: {
      paddingTop: props.collapseOffset ? props.collapseOffset : 0,
    },
  };

  return (
    <Animated.View style={styles.container}>
      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={dynamicStyles.scrollView}
        bouncesZoom={false}
        overScrollMode={"never"}
        ref={scrollRef}
        onScroll={handleScroll}
        onScrollBeginDrag={handleBeginScroll}
        scrollEventThrottle={16}
        refreshControl={
          <RefreshControl 
            refreshing={props.refreshing!}
            onRefresh={props.onRefresh}
            progressViewOffset={props.collapseOffset/2}
            colors={[theme.colors.primary]}
          />
        }
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
