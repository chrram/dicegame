
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import { createSlice } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'

import { StartScreen } from "./screens/startScreen"
import { LoginScreen } from "./screens/loginScreen"
import { RegisterScreen } from "./screens/registerScreen";
import { MenuScreen } from "./screens/MenuScreen";
import { GameScreen } from "./screens/gamescreen";
import { TopPlayerScreen } from './screens/topPlayerScreen';
import { OptionScreen } from './screens/optionScreen';

const Stack = createNativeStackNavigator();

const initialState = {
  token: "",
  email: "",
  userScore: null,
}

export const authenticationSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    token: (state, action) => {
      state.token = action.payload
    },
    userInfo: (state, action) => {
      state.email = action.payload.email
      state.userScore = action.payload.score
    },
    logout: (state, action) => {
      state.token = ""
      state.email = ""
      state.userScore = null
    }
  }
})

export const { token, logout, userInfo } = authenticationSlice.actions


const store = configureStore({
  reducer: {

    authentication: authenticationSlice.reducer

  },
})

function App() {

  return (
    <Provider store={store}>
      <Navigators />
    </Provider>
  );
}

const Navigators = () => {

  const token = useSelector((state) => state.authentication.token)

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {
          token ? (
            <>
              <Stack.Screen name="Menu" component={MenuScreen} />
              <Stack.Screen name="GameScreen" component={GameScreen} />
              <Stack.Screen name="Top" component={TopPlayerScreen} />
              <Stack.Screen name="Options" component={OptionScreen} />
            </>
          ) : (
            <>

              <Stack.Screen name="Home" component={StartScreen} />
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="Register" component={RegisterScreen} />
              
            </>
          )
        }
      </Stack.Navigator>
    </NavigationContainer >
  )
}

export default App;