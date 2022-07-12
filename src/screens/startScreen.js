import { useState, useEffect, useRef } from "react";
import { TouchableOpacity, StyleSheet, Text, View, Image, Animated, Easing } from "react-native";


export const StartScreen = ({ navigation }) => {

    const animationVariable = useRef(new Animated.Value(0)).current;
    
    const spinAnimation1 = useRef(new Animated.Value(0)).current;
    const spinAnimation2 = useRef(new Animated.Value(0)).current;

    const [buttonDisabled, setButtonDisabled] = useState(false)

    useEffect(() => {

        Animated.timing(animationVariable, {
            toValue: 1,
            duration: 1000,
            easing: Easing.bounce,
            useNativeDriver: true,
        }).start()

    })

    const imagePressed = () => {

        setButtonDisabled(true)
        
        Animated.sequence([

            Animated.timing(spinAnimation1, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true,
            }),

        ]).start(({ finished }) => {
            console.log("ffff")
            navigation.navigate('Login')
        });


    }
    const animations = {
        width: animationVariable.interpolate({ inputRange: [0, 1], outputRange: [0, 350] }),
        height: animationVariable.interpolate({ inputRange: [0, 1], outputRange: [0, 400] })
    }

    return (

        <View style={styles.app}>

            <Animated.View style={{
                transform: [{
                    rotateY: spinAnimation1.interpolate({ inputRange: [0,1], outputRange: [0 + "deg", 360 + "deg"] }),
                }],
                top: spinAnimation1.interpolate({ inputRange: [0, 1], outputRange: [0,-100] }),
                opacity:spinAnimation1.interpolate({ inputRange: [0, 1], outputRange: [1,0] }),
            }}>

            
            <View style={styles.logo}>
                <Animated.Image style={[styles.image, animations]} source={require("../assets/dicegame.jpeg")} />
            </View>

            <TouchableOpacity disabled={buttonDisabled} style={[styles.button]} onPress={() => imagePressed()}>
                <Text style={styles.buttonText}> Start game! </Text>
            </TouchableOpacity>
            </Animated.View>
        </View>

    )
}

const styles = StyleSheet.create({

    app: {
        marginHorizontal: "auto",
        width: "100%",
        height: "100vh",
        backgroundColor: "white",
        justifyContent: 'center',
        alignItems: 'center',
        display: "flex"
    },
    logo: {

        justifyContent: 'center',
        alignItems: 'center',
        display: "flex",
        marginVertical: 10
    },

    image: {
        width: 350,
        height: 400
    },

    button: {
        textAlign: "center",
        width: 300,
        padding: 15,
        fontWeight: "bold",
        borderRadius: 20,
        backgroundImage: "linear-gradient(to right, #D31027 0%, #EA384D  51%, #D31027  100%);",
        marginHorizontal: 10,
    },
    buttonText: {
        color: "white",
        fontWeight: "bold"
    },
    border: {
        borderColor: "red",
        borderStyle: "1px",
        borderWidth: 5,
    }
});