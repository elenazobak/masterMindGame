import { StyleSheet, Text, View } from "react-native";
import React from "react";

const HistoryCell = (props) => {
  return (
    <View style={styles.container}>
    <View style={styles.item}>
      <View >
        <Text style={styles.itemText}>{props.number}</Text>
      </View>
    </View>
    <View style={styles.item2}>
           <Text style={styles.resultsText1}>Correct and well placed: </Text>
           <Text style={styles.resultsNumText1}>{props.result[0]}</Text>
      </View>
      <View style={styles.item2}>
           <Text style={styles.resultsText2}>Correct and wrongly placed: </Text>
           <Text style={styles.resultsNumText2}>{props.result[1]}</Text>
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
    padding: 5,
  },
  itemText: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#28A8B3",
    fontFamily: "Avenir",
  },
  resultsText1:{
    color: "#28A8B3",
    fontSize: 13,
    width: 50,
    lineHeight: 13,
    textAlign: "center",
  },
  resultsNumText1:{
    color: "#28A8B3",
    fontSize: 21,
    fontWeight: "bold",
  },
  resultsText2:{
    color: "#8b9698",
    fontSize: 13,
    width: 50,
    lineHeight: 13,
    textAlign: "center",
  },
  resultsNumText2:{
    color: "#8b9698",
    fontSize: 21,
    fontWeight: "bold",
  },
});
