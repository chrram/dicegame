import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'

import { TouchableOpacity, StyleSheet, Text, View, TextInput, Animated, Easing } from "react-native";
import { authenticationSlice } from "../App";

export const OptionScreen = ({ navigation }) => {


    const token = useSelector((state) => state.authentication.token)
    const email = useSelector((state) => state.authentication.email)

    const dispatch = useDispatch()

    useEffect(() => {

    })

    const deleteAccount = ( ) => {
        console.log("Delete account goes here")
        return
    }

    return (
        <View style={styles.app}>

            <TouchableOpacity style={styles.button} onPress={() => deleteAccount()}>
                <Text style={{ color: "white", fontWeight: "bold" }}> Delete Account </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
                <Text style={{ color: "white", fontWeight: "bold" }}> Go back </Text>
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

        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 1,
        shadowRadius: 5,
        elevation: 5
    },

});
