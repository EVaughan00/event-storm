import React, {
  FunctionComponent,
  ReactElement,
  useEffect,
  useState
} from "react";
import { StyleSheet, View } from "react-native";
import { CardableItem } from "../services/general/models/CardItem";
import { Synchronized } from "./CardSectionSwitch";
import { SearchableScrollSheet } from "./ScrollSheet";
import { Typography } from "./Typography";

export interface CardSectionProps {
  name: string;
  index: number;
  data: CardableItem[];
  loading: boolean;
}

export const CardSection: FunctionComponent<CardSectionProps> = (props) => {
  const [cards, setCards] = useState<Array<ReactElement>>();
  const [searchFilter, setSearchFilter] = useState("");

  useEffect(() => {
    if (props.data.length > 0) {
      setCards(MapCards(searchFilter));
    }
  }, [props.data, searchFilter]);

  function MapCards(filter: string): ReactElement[] {
    var cards: ReactElement[] = [];

    props.data
      .filter((item: CardableItem) => item.name.includes(filter))
      .map((card, index) => {
        cards.push(card.renderCard(index));
      });

    return cards;
  }

  return (
    <Synchronized.Consumer>
      {(value) => (
        <View>
          <SearchableScrollSheet
            active={props.index == value.currentSection}
            name={props.name}
            syncronizedCollapseOffset={value.currentSynchronizedCollapseOffset}
            updateSynchronizedCollapseOffset={
              value.updateCurrentSynchronizedCollapseOffset
            }
            collapseOffset={value.collapseOffset}
            onScroll={value.onScroll}
            onScrollBegin={value.onScrollBegin}
            searchFilter={searchFilter}
            setSearchFilter={setSearchFilter}
          >
            {props.loading && 
              <Typography.SubTitle level={3}>Loading...</Typography.SubTitle>
            }
            {!props.loading && props.data.length == 0 ? (
              <Typography.SubTitle level={3}>New {props.name}s will show up here!</Typography.SubTitle>
            ) : 
              cards
            }
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
