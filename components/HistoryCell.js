import { StyleSheet, Text, View } from "react-native";
import React from "react";

const HistoryCell = (props) => {
  return (
    <View style={styles.container}>
    <View style={styles.item}>
      <View style={styles.itemLeft}>
        <Text style={styles.itemText}>{props.number}</Text>
      </View>
    </View>
    <View style={styles.item2}>
           <Text style={styles.resultsText}>Correct and well placed: </Text>
           <Text style={styles.resultsNumText}>{props.result[0]}</Text>
      </View>
      <View style={styles.item2}>
           <Text style={styles.resultsText}>Correct and wrongly placed: </Text>
           <Text style={styles.resultsNumText}>{props.result[1]}</Text>
      </View>
    </View>
  );
};

export default HistoryCell;

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
  item: {
    backgroundColor: "#FFFF",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 5,
    width: '45%',
  },
  item2: {
    backgroundColor: "#FFFF",
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    marginBottom: 5,
    width: '25%',
  },
  itemLeft: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  itemText: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#28A8B3",
    fontFamily: "Avenir",
  },
  resultsText:{
    color: "#357F2F",
    fontSize: 13,
    width: 50,
    lineHeight: 13,
    textAlign: "center",
  },
  resultsNumText:{
    color: "#FB3E28",
    fontSize: 20,
    fontWeight: "bold",
  },
});
