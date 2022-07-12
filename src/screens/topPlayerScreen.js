import { useState, useEffect, useRef } from "react";
import { useSelector } from 'react-redux'

import { TouchableOpacity, StyleSheet, Text, View, Animated, Easing } from "react-native";
import { authenticationSlice } from "../App";

export const TopPlayerScreen = ({ navigation }) => {

    const token = useSelector((state) => state.authentication.token)
    const email = useSelector((state) => state.authentication.email)

    const [fetchedUsers, setFetchedUsers] = useState(null)

    const [error, setError] = useState(false)

    const fetchedDataAnimation = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        
        fetch('http://localhost:8080/top', {
            method: 'GET',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded", "Accept": "*/*",
                'Authorization': `Bearer ${token}`
            },
        }).then((response) => {
            return response.json()
        }).then((response) => {

            setFetchedUsers(response.users)
        })
            .catch((e) => {
                console.log(e, "error")
                setError(true)
            })
    }, [])

    const fetchAnim = {
        opacity: fetchedDataAnimation.interpolate({inputRange:[0,1], outputRange:[0,1]}),
        scale: fetchedDataAnimation.interpolate({inputRange:[0,1], outputRange:[0,1]})
    }

    if(fetchedUsers){

        Animated.timing(fetchedDataAnimation, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
            easing: Easing.bounce
        }).start()

    }


    return (
        <View style={styles.app}>
            {
                fetchedUsers ?
                    fetchedUsers.map((users, i) =>
                        <Animated.Text style={fetchAnim} key={i}> {users.email} - {users.score}</Animated.Text>) : <Text>Loading..</Text>
            }
            {
                error ? <Text>Error occured while fetching</Text> : null
            }
            <TouchableOpacity style={[styles.button]} onPress={() => navigation.goBack()}>
                <Text style={{ color: "white", fontWeight: "bold" }}> Go back! </Text>
            </TouchableOpacity>
        </View>
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
        color: "white",

        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 1,
        shadowRadius: 5,
        elevation: 5
    },

})