import { StyleSheet, Text, View, Button, TouchableOpacity, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { borderLeftColor } from "react-native/Libraries/Components/View/ReactNativeStyleAttributes";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

export default function Home ({ route, navigation }) => {
  const [attempts, setAttepts] = useState(10);
  const [codeLength, setCodeLength] = useState(4);
  const [minutes, setMinutes] = useState(1);
  const bulbPic = require('../assets/bulb.png');
  const didWin = route;

//   useEffect(() => {
//     console.log(route.params)
//   }, []);
  


  const decreaseCodeLength = () => {
    if (codeLength > 1) {
      setCodeLength(() => codeLength - 1);
      console.log(route.params)
    }
  };
  const increaseCodeLength = () => {
    if (codeLength < 8) {
      setCodeLength(() => codeLength + 1);
    }
  };
  const decreaseAttempts = () => {
    if (attempts > 1) {
      setAttepts(() => attempts - 1);
    }
  };
  const increaseAttempts = () => {
    if (attempts < 20) {
      setAttepts(() => attempts + 1);
    }
  };
  const decreaseMinutes = () => {
    if (minutes > 0) {
      setMinutes(() => minutes - 1);
    }
  };
  const increaseMinutes = () => {
    if (minutes < 20) {
      setMinutes(() => minutes + 1);
    }
  };

 const userDidWin = () => {
    if (didWin) {
        return 
         <View></View>
          
    } 
 }

  return (
    <View style={styles.container}>
        <Text style={styles.title}>Mastermind</Text>
        {/* {route.params.didWin ? <Button title={'hey'} /> : null} */}
        <View style={styles.image} >
            
            <Image style={styles.image}  source={bulbPic}/>

        </View>
      <View style={styles.attempts}>
        <Text style={styles.text}>Number of attempts </Text>
        <View style={styles.buttons}>
        <TouchableOpacity style={styles.smallButton} onPress={decreaseAttempts}>
          <FontAwesome5 name={"minus"} size={18} color={"white"}></FontAwesome5>
        </TouchableOpacity>
        <Text style={styles.text}> {attempts} </Text>
        <TouchableOpacity style={styles.smallButton} onPress={increaseAttempts}>
          <FontAwesome5 name={"plus"} size={18} color={"white"}></FontAwesome5>
        </TouchableOpacity>
        </View>
      </View>
      <View style={styles.attempts}>
        <Text style={styles.text}>Code length </Text>
        <View style={styles.buttons}>
        <TouchableOpacity
          style={styles.smallButton}
          onPress={decreaseCodeLength}
        >
          <FontAwesome5 name={"minus"} size={18} color={"white"}></FontAwesome5>
        </TouchableOpacity>
        <Text style={styles.text}> {codeLength} </Text>
        <TouchableOpacity
          style={styles.smallButton}
          onPress={increaseCodeLength}
        >
          <FontAwesome5 name={"plus"} size={18} color={"white"}></FontAwesome5>
        </TouchableOpacity>
        </View>
      </View>
      {/* <View style={styles.attempts}>
        <Text style={styles.text}>Set game timer in minutes </Text>
        <TouchableOpacity style={styles.smallButton} onPress={decreaseMinutes}>
          <FontAwesome5 name={"minus"} size={18} color={"white"}></FontAwesome5>
        </TouchableOpacity>
        <Text style={styles.text}> {minutes} </Text>
        <TouchableOpacity style={styles.smallButton} onPress={increaseMinutes}>
          <FontAwesome5 name={"plus"} size={18} color={"white"}></FontAwesome5>
        </TouchableOpacity>
      </View> */}
      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          navigation.navigate("Game", {
            attempts: attempts,
            codeLength: codeLength,
            timer: minutes,
          })
        }
      >
        <Text style={styles.text}>Play</Text>
      </TouchableOpacity>
    </View>
  );
};

// export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#b1f1fb",
    alignItems: "center",
    justifyContent: "center",
    //alignContent: 'center',
    
  },
  title: {
    fontSize: 50,
    fontWeight: "bold",
    color: "#ffffff",
    fontFamily: "Futura",
    shadowColor: "#2C594A",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    //marginBottom: 60,
  },
  image: { 
    justifyContent: 'center', 
    alignItems: 'center',
    alignContent: 'center',
    margin: 20,
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    color: "teal",
    fontFamily: "Futura",
    textAlign: "left",
  },
  button: {
    backgroundColor: "#15d5c1",
    borderRadius: 30,
    alignSelf: "center",
    shadowColor: "#2C594A",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    margin: 20,
    width: 120,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "bold",
  },
  attempts: {
    backgroundColor: "#FFFF",
    padding: 15,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    margin: 10,
    width: "90%",
    
  },
  buttons: {
    flexDirection: "row",
    width: "35%",
    justifyContent: "space-between",
    alignItems: "center",
    //flexWrap: "wrap",
  },
  smallButton: {
    width: 40,
    height: 40,
    borderRadius: 30,
    backgroundColor: "lightblue",
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
});
