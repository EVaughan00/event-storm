import React, { FunctionComponent } from "react";
import { StyleProp, StyleSheet, Text, TextStyle, View } from "react-native";
import { SelectionDivivder } from "../icons/Divider";
import theme from "../theme";

type TextAlign = "left" | "right" | "center";

interface TitleProps {
  style?: StyleProp<TextStyle>;
  align?: TextAlign;
  level: 1 | 2 | 3 | 4 | 5;
}

interface ParagraphProps {
  style?: StyleProp<TextStyle>;
  align?: TextAlign;
}

interface SelectorProps {
  style?: StyleProp<TextStyle>;
  align?: TextAlign;
  active: boolean;
  index: number;
  onPress: (index: number) => void
}

const Title: FunctionComponent<TitleProps> = (props) => {
  const fontSizes = [0, 32, 24, 18, 16, 14];

  const extraStyles = {
    fontSize: fontSizes[props.level],
    textAlign: props.align,
  };

  return (
    <Text style={[styles.title, extraStyles, props.style]}>
      {props.children}
    </Text>
  );
};

const SubTitle: FunctionComponent<TitleProps> = (props) => {
  const fontSizes = [0, 32, 24, 18, 16, 14];

  const extraStyles = {
    fontSize: fontSizes[props.level],
    textAlign: props.align,
  };

  return (
    <Text style={[styles.subTitle, extraStyles, props.style]}>
      {props.children}
    </Text>
  );
};

const Selector: FunctionComponent<SelectorProps> = (props) => {

  const extraStyles = {
    textAlign: props.align,
  };

  return (
    <View style={styles.selectorContainer}>
    <Text
      style={
        props.active
          ? [styles.selector, extraStyles, props.style, styles.activeSelector]
          : [styles.selector, extraStyles, props.style]
      }
      onPress={() => props.onPress(props.index)}
    >
      {props.children}
    </Text>
    {props.active && <SelectionDivivder/>}
    </View>

  );
};

const Paragraph: FunctionComponent<ParagraphProps> = (props) => {
  const extraStyles = {
    textAlign: props.align,
  };

  return (
    <Text style={[styles.text, extraStyles, props.style]}>
      {props.children}
    </Text>
  );
};

const styles = StyleSheet.create({
  title: {
    marginBottom: theme.unit * 2,
    fontWeight: "600",
  },
  subTitle: {},
  text: {
    fontSize: 16,
    opacity: 0.6,
    marginBottom: theme.unit * 2,
  },
  selectorContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  selector: {
    fontSize: 18,
    opacity: 0.6,
    textTransform: "uppercase",
  },
  activeSelector: {
    opacity: 1.0,
  },
});

export const Typography = {
  Title,
  SubTitle,
  Selector,
  Paragraph,
};
