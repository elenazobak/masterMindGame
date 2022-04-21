import { StatusBar } from "expo-status-bar";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  Alert,
  SafeAreaView,
  TouchableOpacity,
  //TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

import React, { useEffect, useState, useRef } from "react";
const axios = require("axios");
import { useDispatch } from "react-redux";
import CodeInput from "react-native-code-input";
import HistoryCell from "./HistoryCell";
import MyTimer from "./MyTimer";

import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";

export default function App({ route, navigation }) {
  const [randomNumber, setRandomNumber] = useState();
  const ATTEMPTS = route.params.attempts;
  const CELL_COUNT = route.params.codeLength;
  const [attempts, setAttempts] = useState(ATTEMPTS);
  const [userInput, setUserInput] = useState("");
  const [numAndLocation, setNumAndLocation] = useState(0);
  const [correctNum, setCorrectNum] = useState(0);
  const [value, setValue] = useState("");
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  const [history, setHistory] = useState([]);

  //Get the random number
  const fetchNumber = async () => {
    const { data: random } = await axios.get(
      `https://www.random.org/integers/?num=${CELL_COUNT}&min=0&max=7&col=4&base=10&format=plain&rnd=new`
    );

    setRandomNumber(random.replace(/\s/g, ""));
  };

  useEffect(() => {
    fetchNumber();
    if (!randomNumber) {
      setRandomNumber("1234");
    }
  }, []);

  //Checking submission
  const checkSubmitUpdateState = (tempUserInput, randomNumber) => {
    let numberObj = {};
    for (let i = 0; i < randomNumber.length; i++) {
      //Counts the well positioned numbers, replaces them with null in the tempInput array
      if (randomNumber[i] === tempUserInput[i]) {
        setNumAndLocation((numAndLocation) => numAndLocation + 1);
        tempUserInput[i] = null;
        //The rest placed in randomNumber Object with their quantity
      } else {
        if (numberObj[randomNumber[i]]) {
          numberObj[randomNumber[i]]++;
        } else numberObj[randomNumber[i]] = 1;
      }
    }
    //Correct numbers with wrong location
    for (let j = 0; j < tempUserInput.length; j++) {
      if (numberObj[tempUserInput[j]]) {
        setCorrectNum((correctNum) => correctNum + 1);
        numberObj[tempUserInput[j]]--;
      }
    }
  };

  // When Submit button clicked
  const clickHandler = () => {
    setCorrectNum(0);
    setNumAndLocation(0);
    Keyboard.dismiss();

    if (userInput) {
      if (userInput.length === CELL_COUNT) {
        let tempUserInput = userInput;
        //Checking the submission with temp user input
        checkSubmitUpdateState(tempUserInput, randomNumber);
        // Checking attempts and game over
        if (attempts === 1 && userInput !== randomNumber) {
          Alert.alert(`You Lost! The number was: ${randomNumber}`, `:(`, [
            {
              text: "Quit",
              onPress: () => navigation.goBack(),
              style: "cancel",
            },
            { text: "Play Again", onPress: () => resetGame() },
          ]);
        } else {
          setAttempts((attempts) => attempts - 1);
        }
      } else Alert.alert(`Please enter a ${CELL_COUNT} digit number`);
    } else {
      Alert.alert(`Please enter a ${CELL_COUNT} digit number`);
    }
  };

  //Checking if user input is in range (0-7)
  const checkInput = (text) => {
    if (text % 10 < 8) {
      setUserInput(text);
    } else {
      alert("Enter numbers between 0-7");
    }
  };

  //Reset Game
  const resetGame = () => {
    fetchNumber();
    setNumAndLocation(0);
    setHistory([]);
    setAttempts(ATTEMPTS);
    setUserInput("");
  };

  //Sets history array
  useEffect(() => {
    console.log(randomNumber);
    if (numAndLocation === CELL_COUNT) {
      Alert.alert("GOOD JOB!", ":)", [
        {
          text: "Quit",
          onPress: () => navigation.goBack(),
          style: "cancel",
        },
        { text: "Play Again", onPress: () => resetGame() },
      ]);
    } else if (attempts < ATTEMPTS) {
      let historyObj = { num: userInput, result: [numAndLocation, correctNum] };
      setHistory([...history, historyObj]);
      setUserInput("");
    }
  }, [attempts]);

  return (
    <SafeAreaView style={styles.container}>
      {/* <MyTimer />  */}
      {/* <Text style={styles.text}>{randomNumber}</Text> */}
      <Text style={styles.text}>Attempts left: {attempts}</Text>
      <Text style={styles.title}>Guess your number</Text>
      <CodeField
        ref={ref}
        {...props}
        value={userInput.toString()}
        onChangeText={checkInput}
        cellCount={CELL_COUNT}
        rootStyle={styles.codeFieldRoot}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        renderCell={({ index, symbol, isFocused }) => (
          <Text
            key={index}
            style={[styles.cell, isFocused && styles.focusCell]}
            onLayout={getCellOnLayoutHandler(index)}
          >
            {symbol || (isFocused ? <Cursor /> : null)}
          </Text>
        )}
      />
      <TouchableOpacity style={styles.button} onPress={clickHandler}>
        <Text>Submit</Text>
      </TouchableOpacity>
      <ScrollView keyboardShouldPersistTaps="handled">
      {/* <View style={styles.resultsTextWrapper}>
           <Text style={styles.resultsText}>Correct and well placed: </Text>
           <Text style={styles.resultsText}>Correct and wrongly placed: </Text>

      </View> */}
        <View style={styles.history}>
          {history
            .slice(0)
            .reverse()
            .map((obj, index) => (
              <HistoryCell key={index} number={obj.num} result={obj.result} />
            ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F3F3",
  },
  button: {
    width: "20%",
    backgroundColor: "#D1F8F3",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    marginLeft: 150,
  },
  
  
  history: {
    paddingTop: 10,
    paddingHorizontal: 20,
  },
  text: {
    color: "teal",
    fontSize: 20,
    margin: 10,
    textAlign: "center",
    justifyContent: "space-evenly",
  },
  title: { textAlign: "center", fontSize: 30 },
  codeFieldRoot: {
    margin: 30,
    justifyContent: "space-evenly",
  },
  cell: {
    width: 30,
    height: 30,
    fontSize: 20,
    borderWidth: 2,
    borderColor: "#20BAD7",
    textAlign: "center",
  },
  focusCell: {
    borderColor: "#1B90A5",
  },
});
