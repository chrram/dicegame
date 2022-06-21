
import { useState } from "react";
import { TouchableOpacity, StyleSheet, Text, View } from "react-native";

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>

        <Stack.Screen name="Home" component={StartScreen} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Menu" component={Menu} />
        <Stack.Screen name="GameScreen" component={GameScreen} />

      </Stack.Navigator>
    </NavigationContainer >
  );
}

const Menu = ({navigation}) => {
  return (
    <View>
      <TouchableOpacity style={[styles.button, { backgroundColor: "lightgreen" }]} onPress={() => navigation.navigate('GameScreen')}>
        <Text style={{ color: "white", fontWeight: "bold" }}> Play dice game </Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, { backgroundColor: "lightgreen" }]} onPress={() => navigation.navigate('Login')}>
        <Text style={{ color: "white", fontWeight: "bold" }}> See top scores </Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, { backgroundColor: "lightgreen" }]} onPress={() => navigation.goBack()}>
        <Text style={{ color: "white", fontWeight: "bold" }}> Logout </Text>
      </TouchableOpacity>

    </View>
  )
}

const GameScreen = ({navigation}) => {

  const [currentValue, setCurrentValue] = useState("")
  const [score, setScore] = useState(0)

  return (
    <View>
      <TouchableOpacity>
        Play a round.
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        Logout
      </TouchableOpacity>
    </View>
  )
}

const StartScreen =  ({navigation}) => {
  return (
    <View>
      <Text>
        Test goes here
      </Text>
      <TouchableOpacity style={[styles.button, { backgroundColor: "lightgreen" }]} onPress={() => navigation.navigate('Login')}>
        <Text style={{ color: "white", fontWeight: "bold" }}> Next screen </Text>
      </TouchableOpacity>
    </View>
  )
}

const Login = ({navigation}) => {

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")



  const sendLogin = () => {
    navigation.navigate("Menu")
  }

  return (
    <View style={styles.app}>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        <TouchableOpacity style={[styles.button, { backgroundColor: "lightgreen" }]} onPress={() => sendLogin()}>
          <Text style={{ color: "white", fontWeight: "bold" }}>  Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button]} onPress={() => sendLogin()}>
          <Text style={{ color: "white", fontWeight: "bold" }}>  Don't have an account? Register here!</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const GameBoard = () => {
  return (
    <View>
      <View style={styles.border}>

      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  app: {
    marginHorizontal: "auto",
    maxWidth: 1500,
    height: "100%",
  },
  button: {
    textAlign: "center",
    width: 300,
    padding: 15,
    fontWeight: "bold",
    borderRadius: 20,
    backgroundColor: "red",
    marginHorizontal: 10,
  },

  border: {
    borderColor: "black",
    borderStyle: "1px",
    borderWidth: 5,
  }
});

export default App;