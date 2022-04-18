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

import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";

export default function App({ navigation }) {
  const [randomNumber, setRandomNumber] = useState();
  const ATTEMPTS = 10;
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
  const CELL_COUNT = 4;
  const CODE_LENGTH = 4;

  //Get the random number
  const fetchNumber = async () => {
    const { data: random } = await axios.get(
      `https://www.random.org/integers/?num=${CODE_LENGTH}&min=0&max=7&col=4&base=10&format=plain&rnd=new`
    );
    setRandomNumber(random.replace(/\s/g, ""));
  };

  useEffect(() => {
    fetchNumber();
  }, []);

  //Check submition
  const checkSubmitUpdateState = (inputStr, randomNumber) => {
    let correctsObj = {};
    let numAndLocObj = {};
    let inputObj = {};
    let numberObj = {};
    for (let i = 0; i < randomNumber.length; i++) {
      
      numberObj[randomNumber[i]] = 'not checked'; //number and if checked
      if (randomNumber[i] === inputStr[i]) { //same location
        setNumAndLocation((numAndLocation) => numAndLocation + 1);
        numberObj[randomNumber[i]] = 'checked';
        console.log("numAndLocation", inputStr[i])
        inputStr[i] = null;
        //numberObj[inputStr[j]] = 99
      
    }}

    for (let j = 0; j < inputStr.length; j++) {
      if ((numberObj[inputStr[j]]) && (numberObj[inputStr[j]] !=='checked')) {
        setCorrectNum((correctNum) => correctNum + 1);

      }
    }

    console.log(numberObj)
    // for (let i = 0; i < inputStr.length; i++) {
    //   if (randomNumber[i] === inputStr[i]) {
    //     numAndLocObj[inputStr[i]] = 1
    //     setNumAndLocation((numAndLocation) => numAndLocation + 1);
    //   } else if ((randomNumber.indexOf(inputStr[i]) !== -1 ) && (correctsObj[inputStr[i]] !== 1) && (numAndLocObj[inputStr[i]] !== 1)) {
    //     correctsObj[inputStr[i]] = 1
        

    //     setCorrectNum((correctNum) => correctNum + 1);
    //   }
    // }
    

    // for (let j = 0; j < inputStr.length; j++) {
    //   console.log("inside of for:", inputStr[j])
    //   if (numberObj[inputStr[j]] !== undefined) {//if exists
    //     console.log("exists", inputStr[j])
    //     if (randomNumber[j] === inputStr[j]) { //same location
    //       setNumAndLocation((numAndLocation) => numAndLocation + 1);
    //       console.log("numAndLocation", inputStr[j])
    //       //numberObj[inputStr[j]] = 99

    //     } else if (numberObj[inputStr[j]] !== j) {
    //       setCorrectNum((correctNum) => correctNum + 1);
    //       //numberObj[inputStr[j]] = 99

    //     }
    //   }
    // }

  };
  // On Click
  const clickHandler = () => {
    Keyboard.dismiss();
    if (userInput) {
      let inputStr = userInput.toString();
      if (inputStr.length === CODE_LENGTH) {
        setCorrectNum(0);
        setNumAndLocation(0);
        checkSubmitUpdateState(inputStr, randomNumber);
        //Attepts - game over
        if (attempts === 1) {
          Alert.alert("YOU LOST, The number_ is:", randomNumber, ":)", [
            {
              text: "Bye!",
              onPress: () => navigation.goBack(),
              style: "cancel",
            },
            { text: "Try Again", onPress: () => resetGame() },
          ]);
        } else {
          setAttempts((attempts) => attempts - 1);
        }
      } else Alert.alert(`Please enter a ${CODE_LENGTH} digit number`);
    } else {
      Alert.alert(`Please enter a ${CODE_LENGTH} digit number`);
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
    if (numAndLocation === CODE_LENGTH) {
      Alert.alert("GOOD JOB! You Won CutiePie!", ":)", [
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
      <Text style={styles.text}>The number is: {randomNumber}</Text> 
      <Text style={styles.text}>Attempts left: {attempts}</Text>
      <Text style={styles.title}>Guess your number</Text>
      <CodeField
        ref={ref}
        {...props}
        value={userInput.toString()}
        onChangeText={setUserInput}
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
        <View style={styles.history}>
          {history.map((obj, index) => (
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
