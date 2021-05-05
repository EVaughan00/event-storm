import React, { FunctionComponent, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { AppStore } from "../AppStore";
import { Typography } from "./Typography";

interface Props {
  selections: string[];
  justifyContent?: 'center' | 'space-evenly' | 'space-between' | 'space-around'
  currentSelection: number
  setSelection: (selectionIndex: number) => void
}

export const SelectionSwitch: FunctionComponent<Props> = (props) => {

  const dynamicStyles = { 
      container: {
          justifyContent: props.justifyContent ? props.justifyContent : 'space-around'
      }
  }

  const mapSelections = (current: number) => {
    return (
        props.selections.map((selection: string, index: number) => (
          <Typography.Selector
            active={index == current}
            style={styles.selector}
            index={index}
            key={index}
            onPress={props.setSelection}
          >
            {selection}
          </Typography.Selector>
        ))
    );
  };

  useEffect(() => {

    return () => {
    }
  }, [props.currentSelection])


  return <View style={[styles.container, dynamicStyles.container]}>{mapSelections(props.currentSelection)}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 15
  },
  selector: {
    color: "white",
  },
});
