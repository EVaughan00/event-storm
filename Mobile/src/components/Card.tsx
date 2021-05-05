import React, { Component } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Solution from '../models/Solution';
import { SelectableViewModel } from '../models/ViewModel';

export interface CardProps {
    item: SelectableViewModel
    onPress: () => void
    activeOpacity?: boolean
}

class Card extends Component<CardProps> {

    constructor(props: CardProps) {
        super(props);
    }

    render() {
        return (
            <TouchableOpacity
            style={styles.touchableOpacity}
            onPress={() => this.props.onPress()}
            activeOpacity={this.props.activeOpacity? 0.2 : 1}
            delayPressIn={100}
          >
            <View style={styles.container}>
              <View style={styles.containerTop}>
                <Text style={styles.text}>{this.props.item.name}</Text>
                {/* <Chip
                  onPress={() => {}}
                  icon="information"
                  mode={"outlined"}
                  style={styles.chip}
                >
                  STATUS
                </Chip> */}
              </View>
              <View style={styles.containerMiddle}>
                <View style={styles.iconContainer}>
            
                  <Text style={styles.iconInfo}>
                  {/* { this.props.item instanceof Solution
                       ? this.props.item.metrics.completedEvents + "/" + this.props.item.metrics.events
                       : this.props.item.metrics.events
                      } */}
                  </Text>
                </View>
                <View style={styles.iconContainer}>
                 
                  <Text style={styles.iconInfo}>
                  {/* { this.props.item instanceof Solution
                       ? this.props.item.metrics.completedTasks + "/" + this.props.item.metrics.tasks
                       : this.props.item.metrics.tasks
                      } */}
                </Text>
                </View>
                <View style={styles.iconContainer}>
               
                  <Text style={styles.iconInfo}>
                  {/* { this.props.item instanceof Solution
                       ? this.props.item.metrics.completedModels + "/" + this.props.item.metrics.models
                       : this.props.item.metrics.models
                      }                   */}
                    </Text>
                </View>
              </View>
              <View style={styles.containerBottom}></View>
            </View>
          </TouchableOpacity>
        )
    }

}

const styles = StyleSheet.create({
    touchableOpacity: {
      alignSelf: "center",
      alignItems: "center",
      borderWidth: 0.5,
      borderRadius: 8,
      borderColor: "#9E9E9E",
      width: 350,
      height: 350,
      margin: 10,
      padding: 5,
      backgroundColor: "white",
      overflow: "visible",
      elevation: 5,
    },
    container: {
      height: "100%",
      width: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      alignItems: "center",
    },
    containerTop: {
      width: "100%",
      flex: 1,
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: 5,
    },
    containerMiddle: {
      width: "100%",
      flex: 1,
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignContent: "center",
      paddingHorizontal: 20,
    },
    containerBottom: {
      width: "100%",
      flex: 3,
      alignItems: "center",
      backgroundColor: "#AAA",
      borderBottomLeftRadius: 8,
      borderBottomRightRadius: 8,
    },
    text: {
      textAlign: "left",
      marginLeft: 10,
      fontFamily: "Roboto",
      fontStyle: "normal",
      fontWeight: "700",
      fontSize: 24,
      lineHeight: 24,
      letterSpacing: 0.15,
      color: "rgba(0, 0, 0, 0.87)",
    },
    iconContainer: {
      flexDirection: "row",
      alignItems: "center",
    },
    iconInfo: {
      textAlign: "left",
      fontFamily: "Roboto",
      fontStyle: "normal",
      fontWeight: "normal",
      fontSize: 14,
      lineHeight: 20,
      letterSpacing: 0.25,
      color: "rgba(0, 0, 0, 0.6)",
      margin: 5
    },
    chip: {
      height: 30,
      backgroundColor: "#00B3A6",
      alignItems: "center",
      borderRadius: 4,
      borderWidth: 1
    },
  });

export default Card