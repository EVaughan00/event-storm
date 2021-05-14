import React, { FunctionComponent, useEffect, useState } from "react";
import { NativeScrollPoint, View } from "react-native";
import { AppStore } from "../../../AppStore";
import { FloatingAddButton } from "../../../components/FloatingAddButton";

interface Props {}

const HomeFooter: FunctionComponent<Props> = (props) => {
  
  const [home] = AppStore.home.use();

  return (
    <View>
      <FloatingAddButton
        showOnUpdate={home.currentList}
        beginScroll={home.beginVerticalScroll.contentOffset}
        activeScroll={home.verticalScroll.contentOffset}
      />
    </View>
  );
};

export { HomeFooter };
