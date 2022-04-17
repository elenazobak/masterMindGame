import { StyleSheet, Text, View } from "react-native";
import React from "react";

const HistoryCell = (props) => {
  let num = 1;
  let numAndLocation = 2;
  //console.log("props from game", props)

  return (
    <View style={styles.item}>
      <View style={styles.itemLeft}>
        <Text style={styles.itemText}>{props.number}</Text>
      </View>
      <View style={styles.results}>
        <Text>correct and well placed: {props.result[0]}</Text>
        <Text>correct and wrongly placed: {props.result[1]}</Text>
      </View>
    </View>
  );
};

export default HistoryCell;

const styles = StyleSheet.create({
  item: {
    backgroundColor: "#FFFF",
    padding: 15,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  itemLeft: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  resultText: {
      
  },
  itemText: {
    fontWeight: "bold",
    fontSize: 20,
    color: "teal",
    fontFamily: "Avenir",
    marginLeft: 20,
  },
});
