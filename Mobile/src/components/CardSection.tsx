import React, {
  FunctionComponent,
  ReactElement,
  useEffect,
  useState,
} from "react";
import { StyleSheet, View } from "react-native";
import { Card, CardableItem } from "./Card";
import { Synchronized } from "./CardSectionSwitch";
import { SearchableScrollSheet } from "./ScrollSheet";
import { Typography } from "./Typography";

export interface CardSectionProps {
  name: string;
  index: number;
  data: CardableItem[];
  loading: boolean;
  onRefresh: () => void
  onSelectCard: (item: CardableItem) => void;
}

export const CardSection: FunctionComponent<CardSectionProps> = (props) => {
  const [cards, setCards] = useState<JSX.Element[]>([]);
  const [searchFilter, setSearchFilter] = useState("");
  const [dataFetched, setDataFetched] = useState(false);

  useEffect(() => {
    if (props.data.length > 0) {
      MapCards(searchFilter);
    }
    setDataFetched(true);
  }, [props.data, searchFilter]);

  const MapCards = (filter: string) => {
    setCards(
      props.data
        .filter((cardable: CardableItem) =>
          cardable.name.toLowerCase().includes(filter.toLowerCase())
        )
        .map((item, index) => (
          <Card
            item={item}
            key={index}
            onPress={() => props.onSelectCard(item)}
          />
        ))
    );
  };

  return (
    <Synchronized.Consumer>
      {(value) => (
        <View>
          <SearchableScrollSheet
            name={props.name}
            onScroll={value.onScroll}
            refreshing={props.loading}
            searchFilter={searchFilter}
            onRefresh={props.onRefresh}
            onScrollEnd={value.onScrollEnd}
            setSearchFilter={setSearchFilter}
            onScrollBegin={value.onScrollBegin}
            collapseOffset={value.collapseOffset}
            active={props.index == value.currentSection}
            syncronizedCollapseOffset={value.currentSynchronizedCollapseOffset}
            updateSynchronizedCollapseOffset={value.updateCurrentSynchronizedCollapseOffset}
          >
            { dataFetched && props.data.length == 0 ? (
              <Typography.SubTitle level={3}>
                New {props.name}s will show up here!
              </Typography.SubTitle>
            ) : (
              cards
            )}
          </SearchableScrollSheet>
        </View>
      )}
    </Synchronized.Consumer>
  );
};

const styles = StyleSheet.create({
  input: {
    width: 350,
    backgroundColor: "#fff",
    borderRadius: 4,
    elevation: 10,
  },
});
