
import { useState, useRef, useEffect } from "react";
import { TouchableOpacity, StyleSheet, Text, View, Animated, Easing } from "react-native";
import { useSelector, useDispatch } from 'react-redux'
import { Slider } from '@miblanchard/react-native-slider';

import { Dices } from "./subcomponents/Dices";
import { userInfo } from "../App";

export const GameScreen = ({ navigation }) => {

    const INITIAL_GAMEROUNDS = 10

    const userHighestScore = useSelector((state) => state.authentication.userScore)
    const userEmail = useSelector((state) => state.authentication.email)
    const token = useSelector((state) => state.authentication.token)

    const [dices, setDices] = useState([])
    const [winningNumber, setWinningNumber] = useState(0)
    const [guessedNumber, setGuessedNumber] = useState(0)
    const [sliderNumber, setSliderNumber] = useState(11)

    const [yourScore, setYourScore] = useState(0)
    const [round, setRound] = useState(INITIAL_GAMEROUNDS)

    const [win, setWin] = useState(false)
    const [newRecord, setNewRecord] = useState(false)

    const animationVariable = useRef(new Animated.Value(0)).current;
    const screenAnimation = useRef(new Animated.Value(0)).current;

    const dispatch = useDispatch()

    const stopPlaying = () => {
        navigation.goBack()
    }

    const play = () => {

        setGuessedNumber(sliderNumber)

        const randomDices = [
            Math.floor((Math.random() * 6) + 1),
            Math.floor((Math.random() * 6) + 1),
            Math.floor((Math.random() * 6) + 1),
            Math.floor((Math.random() * 6) + 1)
        ]

        const sumOfDices = randomDices[0] + randomDices[1] + randomDices[2]

        if (sliderNumber == sumOfDices) {

            setYourScore(yourScore + (sumOfDices * randomDices[3]))
            setWin(true)

        } else {
            setWin(false)
        }
        setDices(randomDices)
        setWinningNumber(sumOfDices)
        setRound(round - 1)
    }

    const restart = () => {
        setRound(INITIAL_GAMEROUNDS)
        setYourScore(0)
        setNewRecord(false)
    }

    useEffect(() => {

        if (round == 0 && yourScore > userHighestScore) {

            fetch('http://localhost:8080/score', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded", "Accept": "*/*",
                    'Authorization': `Bearer ${token}`
                },
                body: `score=${yourScore}`,
            }).then(response => {

                if (response.status === 200) {
                    return response
                } else {
                    throw new Error(response.status)
                }
            })
                .then(() => {
                    dispatch(userInfo({ email: userEmail, score: yourScore }))
                    setNewRecord(true)
                })
                .catch((error) => {
                    console.log(error.message, "error")
                });
        }

        Animated.loop(
            Animated.sequence([
                Animated.timing(animationVariable, {
                    toValue: 1,
                    duration: 500,
                    useNativeDriver: true,
                })
            ])
        ).start()
    })

    useEffect(() => {

        Animated.timing(screenAnimation, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
            easing: Easing.elastic(1)
        }).start()

    }, [])

    return (

        <Animated.View style={[styles.app, {
            transform: [{
                scaleY: screenAnimation.interpolate({ inputRange: [0, 1], outputRange: [0, 1] })
            }],
            opacity: screenAnimation.interpolate({ inputRange: [0, 1], outputRange: [0, 1] })
        }]}>

            {round == 0 ?
                (<Text style={{ fontWeight: "bold", marginVertical: 5, fontSize: 30, color: "red" }}> Game over!</Text>) :
                (<Text style={{ fontWeight: "bold", marginVertical: 10, fontSize: 30 }}> Rounds left : {round}</Text>)}

            <Text style={{ fontWeight: "bold", marginVertical: 5, fontSize: 15 }}>Your current score: {yourScore}</Text>
            <Text style={{ fontWeight: "bold", marginVertical: 5, fontSize: 10 }}>Your highest all time score: {userHighestScore}</Text>
            <View style={styles.border}>
                {
                    round !== INITIAL_GAMEROUNDS &&
                    (
                        <View style={{}}>

                            <Dices numbersArray={dices} />

                            <View style={{ marginHorizontal: 10, marginVertical: 10, width: 470, }}>

                                {
                                    win ?
                                        (
                                            <View>
                                                <Animated.Text style={{ color: "green", fontSize: 20, textAlign: "center", opacity: animationVariable.interpolate({ inputRange: [0, 1], outputRange: [0.3, 1] }) }}>
                                                    You win this round!
                                                </Animated.Text>
                                                <Text style={{ fontSize: 20, textAlign: "center" }}>
                                                    You guessed {winningNumber} which is correct.
                                                </Text>
                                            </View>
                                        )
                                        :
                                        (
                                            <View>
                                                <Text style={{ color: "red", fontSize: 20, textAlign: "center" }}>
                                                    You lose this round!
                                                </Text>
                                                <Text style={{ fontSize: 20, textAlign: "center" }}>
                                                    You guessed {guessedNumber} which is not {winningNumber}.
                                                </Text>
                                            </View>
                                        )
                                }
                            </View>
                        </View>
                    )
                }
            </View>
            <View style={{ width: 300, textAlign: "center" }}>

                <Slider
                    minimumValue={3}
                    maximumValue={18}
                    step={1}
                    disabled={round === 0}
                    value={sliderNumber}
                    onValueChange={value => setSliderNumber(value)}
                />
                {
                    round === INITIAL_GAMEROUNDS && <Text>Start playing by choosing a number below.</Text>
                }
                <Text style={{ fontSize: 20 }}>Number: {sliderNumber}</Text>
            </View>
            {
                round !== 0 ?
                    (
                        <TouchableOpacity style={styles.button} onPress={() => play()}>
                            <Text style={{ color: "white", fontWeight: "bold" }}>{round === INITIAL_GAMEROUNDS ? "Play" : "Roll again"}</Text>
                        </TouchableOpacity>
                    )
                    :
                    (
                        // Game over screen.
                        <View style={{
                            alignItems: 'center',
                        }}>
                            {newRecord ?
                                <Animated.Text
                                    style={{ opacity: animationVariable.interpolate({ inputRange: [0, 1], outputRange: [0.3, 1] }), fontWeight: "bold", color: "green", fontSize: 30 }}>Congratulations! You have reached a new best!</Animated.Text>
                                : null}

                            <TouchableOpacity style={styles.button} onPress={() => restart()}>
                                <Text style={{ color: "white", fontWeight: "bold" }}>Game over! Restart </Text>
                            </TouchableOpacity>
                        </View>
                    )
            }
            <TouchableOpacity style={[styles.button, { backgroundColor: "white", backgroundImage: "", border: "1px solid red" }]} onPress={() => stopPlaying()}>
                <Text style={{ color: "black", fontWeight: "bold" }}> Stop playing </Text>
            </TouchableOpacity>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    app: {
        marginHorizontal: "auto",
        width: "100%",
        height: "100vh",
        justifyContent: 'center',
        alignItems: 'center',
        display: "flex",
    },

    button: {
        textAlign: "center",
        width: 300,
        padding: 15,
        fontWeight: "bold",
        borderRadius: 20,
        backgroundImage: "linear-gradient(to right, #D31027 0%, #EA384D  51%, #D31027  100%);",
        marginVertical: 10,

        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 1,
        shadowRadius: 5,
        elevation: 5
    },
});