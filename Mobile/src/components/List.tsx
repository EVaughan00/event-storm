import React, { FunctionComponent, useEffect, useState } from "react";
import { View, ViewStyle, StyleSheet, StyleProp } from "react-native";
import { Button } from "react-native-paper";
import { MaterialInput } from "./Form/Material/MaterialInput";
import { Paper } from "./Surfaces";
import { Typography } from "./Typography";

export interface IListableItem {
  id: string;
  image: string;
  name: string;
}

interface ListableItemProps extends IListableItem {
  onSelect: (id: string) => void;
}

interface ListProps {
  style?: StyleProp<ViewStyle>;
  data: Array<IListableItem>;
  searchLabel: string;
  onSelect: (id: string) => void;
}

const ListItem: FunctionComponent<ListableItemProps> = (props) => {

  return (
    <View style={styles.listItem}>
      <View style={styles.listItemLeftContainer}>
        <View style={styles.image}></View>
        <Typography.Title level={3}>{props.name}</Typography.Title>
      </View>

      <Button onPress={() => props.onSelect(props.id)}>Select</Button>
    </View>
  );
};

const List: FunctionComponent<ListProps> = (props) => {
  const [searchFilter, setSearchFilter] = useState("");
  const [items, setItems] = useState<JSX.Element[]>([]);

  useEffect(() => {
    mapItems(searchFilter);
  }, [searchFilter]);

  const mapItems = (filter: string) => {
    setItems(
      props.data
        .filter((item) => item.name.toLowerCase().includes(filter.toLowerCase()))
        .map((listItem: IListableItem, index) =>
          <ListItem 
            key={index} 
            onSelect={props.onSelect}
            name={listItem.name}
            id={listItem.id}
            image={""}
          />
        )
    );
  };

  return (
    <Paper>
      <MaterialInput
        size={"small"}
        value={searchFilter}
        onUpdate={setSearchFilter}
        label={props.searchLabel}
      />
      {items}
    </Paper>
  );
};

const styles = StyleSheet.create({
  view: {
    backgroundColor: "white",
    height: "100%",
    display: "flex",
    alignItems: "center",
  },
  container: {
    padding: 16,
    maxWidth: 500,
    width: "100%",
  },
  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    height: 60,
  },
  listItemLeftContainer: {
    flexDirection: "row",
    flex: 1,
  },
  image: {
    height: 60,
    width: 60,
    backgroundColor: "grey",
  },
});

export { List };
