import React from "react";
import { StyleSheet, View } from "react-native";
import { Chip } from "react-native-paper";
import { CardWrapper } from "../../../components/Card";
import { Typography } from "../../../components/Typography";
import { CardableItem } from "../../general/models/CardItem";

export default class Template implements CardableItem{

  private _id: string
  private _name: string;
  private _description: string;
  private _codeBase: string;

  constructor() {
  }

  public get id(): string {
    return this._id;
  }
  public get name(): string {
    return this._name;
  }
  public get description(): string {
    return this._description;
  }
  public get codeBase(): string {
    return this._codeBase;
  }

  public set id(id: string) {
    this._id = id;
  }
  public set name(name: string) {
    this._name = name;
  }
  public set description(name: string) {
    this._description = name;
  }
  public set codeBase(name: string) {
    this._codeBase = name;
  }


  public renderCard = (index: number) => {
    return (
    <CardWrapper
      key={index}
      titleElements={
        <View style={styles.titleContainer}>
            <View style={styles.containerTop}>
            <Typography.Title level={2}>{this.name}</Typography.Title>
            <Chip style={styles.chip}>STATUS</Chip>
            </View>
            {/* <View style={styles.containerTop}>
            <Typography.Title level={3}>{this.name}</Typography.Title>
            </View> */}
        </View>

      }
      image={
          <View>

          </View>
      }

      onPress={
          () => console.log("Selected solution: " + this.name)
      }
    />
    )
  };
}

const styles = StyleSheet.create({
  chip: {
    backgroundColor: "#00B3A6",
    alignItems: "center",
  },
  titleContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
  },
  containerTop: {
    width: "100%",
    flex: 1,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    alignItems: "center",
  },
});
