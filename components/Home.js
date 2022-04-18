import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from "react";
import { borderLeftColor } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';


const Home = ({ navigation }) => {
    const [attempts, setAttepts] = useState(9);
    const [codeLength, setCodeLength] = useState(3);
    
  return (
    <View style={styles.container}>
      
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Game', {
          attempts: attempts,
          codeLength: codeLength
      })}>
        <Text>Pick your level</Text>
      </TouchableOpacity>
      <View style={styles.attempts}>
          <Text style ={styles.text}>Number of attempts  </Text>
          <TouchableOpacity style={styles.smallButton}
          onPress={() => setAttepts(attempts - 1)}>
              <FontAwesome5 
              name={'minus'}
              size={18}
              color={'white'}>
              </FontAwesome5>
          </TouchableOpacity>
          <Text style ={styles.text}>  {attempts}  </Text>
          <TouchableOpacity style={styles.smallButton}
          onPress={() => setAttepts(attempts + 1)}>
          
              <FontAwesome5 
              name={'plus'}
              size={18}
              color={'white'}>
              </FontAwesome5>
          </TouchableOpacity>
      </View>
      <View style={styles.attempts}>
          <Text style ={styles.text}>Code length  </Text>
          <TouchableOpacity style={styles.smallButton}
          onPress={() => setCodeLength(codeLength - 1)}>
              <FontAwesome5 
              name={'minus'}
              size={18}
              color={'white'}>
              </FontAwesome5>
          </TouchableOpacity>
          <Text style ={styles.text}>  {codeLength}  </Text>
          <TouchableOpacity style={styles.smallButton}
          onPress={() => setCodeLength(codeLength + 1)}>
              <FontAwesome5 
              name={'plus'}
              size={18}
              color={'white'}>
              </FontAwesome5>
          </TouchableOpacity>
      </View>
      

    </View>
  )
}

export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#E6EDE9",
        alignItems: "center",
        justifyContent: "center",
      },
      text:{
          fontSize: 20,
          fontWeight: 'bold',
          color: "teal",
    fontFamily: "Avenir",
      },
    button: {
        backgroundColor: "#C1FBF4",
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
        fontFamily: 'bold'
      },
      attempts: {
        backgroundColor: "#FFFF",
        padding: 15,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 10,
      },
      smallButton: {
          width: 40,
          height: 40,
          borderRadius:30,
          backgroundColor: 'lightblue',
          justifyContent: 'center',
          alignItems: 'center',
          elevation: 5,
          
      }
})