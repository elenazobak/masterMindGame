import React, {useState} from 'react';

// import all the components we are going to use
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Alert
} from 'react-native';

// importing library to use Stopwatch and Timer
import {Timer} from 'react-native-stopwatch-timer';
import StopWatch from 'react-native-stopwatch-timer/lib/stopwatch';

const MyTimer = (props, navigation) => {
  const [isTimerStart, setIsTimerStart] = useState(true);
  
  const [timerDuration, setTimerDuration] = useState(5000);
  const [resetTimer, setResetTimer] = useState(false);
 

  return (
        <View >
          <Timer
            totalDuration={timerDuration}
            secs
            // Time Duration
            start={isTimerStart}
            // To start
            reset={resetTimer}
            // To reset
            options={options}
            // Options for the styling
            handleFinish={() => {
              
              setIsTimerStart(!isTimerStart)
              //props.resetGame()
              console.log(props)

            }}
            // Can call a function On finish of the time
            getTime={(time) => {
              console.log(time);
            }}
          />
          <TouchableHighlight
            onPress={() => {
              setIsTimerStart(!isTimerStart);
              setResetTimer(false);
            }}>
            <Text style={styles.buttonText}>
              {!isTimerStart ? 'START' : 'STOP'}
            </Text>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={() => {
              setIsTimerStart(false);
              setResetTimer(true);
            }}>
            <Text style={styles.buttonText}>RESET</Text>
          </TouchableHighlight>
        </View>
  );
};

export default MyTimer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const options = {
  container: {
    backgroundColor: '#7EE2D6 ',
    padding: 5,
    borderRadius: 5,
    width: 200,
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    color: '#28A3FB',
    marginLeft: 7,
  },
};