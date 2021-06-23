import React, { FunctionComponent, useEffect, useState } from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import { Button } from "react-native-paper";
import { limitStringToSize } from "../helpers/nameShortner";
import { Divider } from "../icons/Divider";
import { MaterialInput } from "./Form/Material/MaterialInput";
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
      <View style={styles.listItemRow}>
        <View style={styles.listItemLeftContainer}>
          <View style={styles.image}></View>
          <Typography.Title style={styles.title} level={3}>
            {limitStringToSize(props.name, 24)}
          </Typography.Title>
        </View>
        <Button  onPress={() => props.onSelect(props.id)}>Select</Button>
      </View>
      <Divider style={styles.listItemDivider} opacity={0.2} width={1} />
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
        .filter((item) =>
          item.name.toLowerCase().includes(filter.toLowerCase())
        )
        .map((listItem: IListableItem, index) => (
          <ListItem
            key={index}
            onSelect={props.onSelect}
            name={listItem.name}
            id={listItem.id}
            image={""}
          />
        ))
    );
  };

  return (
    <View>
      <MaterialInput
        size={"small"}
        value={searchFilter}
        onUpdate={setSearchFilter}
        label={props.searchLabel}
      />
      {items}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    maxWidth: 500,
    width: "100%",
  },
  listItem: {
    flexDirection: "column",
    justifyContent: 'space-between',
    width: "100%",
    height: 55,
  },
  listItemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    height: 55,
  },
  title: {
    marginBottom: 0,
    marginLeft: 5,
  },
  listItemLeftContainer: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
  },
  image: {
    height: 50,
    width: 50,
    backgroundColor: "grey",
  },
  listItemDivider: {
    // width: "100%",
    // alignSelf: 'flex-end',
    // borderWidth: 0.2,
    // opacity: 1,
  }
});

export { List };
