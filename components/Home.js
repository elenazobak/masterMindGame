import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native'
import React from 'react'


const Home = ({ navigation }) => {
  return (
    <View style={styles.container}>
      
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Game')}>
        <Text>PLAY</Text>
      </TouchableOpacity>
      

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
    button: {
        backgroundColor: "#C1FBF4",
        borderRadius: 30,
        alignSelf: "center",
        shadowColor: "#2C594A",
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        margin: 20,
        width: 100,
        height: 40,
        alignItems: "center",
        justifyContent: "center",
        fontFamily: 'bold'
      },
})