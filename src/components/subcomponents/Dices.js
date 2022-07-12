import { useRef, useEffect, memo } from "react";
import { StyleSheet, View, Animated } from "react-native";

export const Dices = memo(({ numbersArray }) => {

    const Dice = ({ number }) => {

        const spinAnimation = useRef(new Animated.Value(0)).current;
        useEffect(() => {

            Animated.timing(spinAnimation, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true,
            }).start()

        })

        switch (number) {
            case 1:
                return (
                    <Animated.View style={[styles.dice,
                    {
                        justifyContent: "center", alignItems: "center",
                        transform: [{
                            rotateZ: spinAnimation.interpolate({ inputRange: [0, 1], outputRange: [0 + "deg", 360 + "deg"] }),
                        }],
                        opacity: spinAnimation.interpolate({ inputRange: [0, 1], outputRange: [0.3, 1] })

                    }]}>
                        <View style={styles.diceDot}></View>
                    </Animated.View>
                )
            case 2:
                return (
                    <Animated.View style={[styles.dice,
                    {
                        display: "flex", justifyContent: "space-between",
                        transform: [{ rotateZ: spinAnimation.interpolate({ inputRange: [0, 1], outputRange: [0 + "deg", 360 + "deg"] }) }],
                        opacity: spinAnimation.interpolate({ inputRange: [0, 1], outputRange: [0.3, 1] })
                    }]}>
                        <View style={styles.diceDot}></View>
                        <View style={[styles.diceDot, { alignSelf: "flex-end" }]}></View>
                    </Animated.View>
                )
            case 3:
                return (
                    <Animated.View style={[styles.dice,
                    {
                        display: "flex", justifyContent: "space-between",
                        transform: [{
                            rotateZ: spinAnimation.interpolate({ inputRange: [0, 1], outputRange: [0 + "deg", 360 + "deg"] })
                        }], opacity: spinAnimation.interpolate({ inputRange: [0, 1], outputRange: [0.3, 1] })
                    }]}>
                        <View style={[styles.diceDot, { alignSelf: "flex-end" }]}></View>
                        <View style={[styles.diceDot, { alignSelf: "center" }]}></View>
                        <View style={[styles.diceDot, {}]}></View>
                    </Animated.View>
                )
            case 4:
                return (
                    <Animated.View
                        style={[styles.dice,
                        {
                            display: "flex", justifyContent: "space-between",
                            transform: [{
                                rotateZ: spinAnimation.interpolate({ inputRange: [0, 1], outputRange: [0 + "deg", 360 + "deg"] })
                            }],
                            opacity: spinAnimation.interpolate({ inputRange: [0, 1], outputRange: [0.3, 1] })
                        }]}>
                        <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                            <View style={styles.diceDot}></View>
                            <View style={styles.diceDot}></View>
                        </View>

                        <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                            <View style={styles.diceDot}></View>
                            <View style={styles.diceDot}></View>
                        </View>
                    </Animated.View>
                )
            case 5:
                return (
                    <Animated.View style={[styles.dice,
                    {
                        display: "flex", justifyContent: "space-between",
                        transform: [{ rotateZ: spinAnimation.interpolate({ inputRange: [0, 1], outputRange: [0 + "deg", 360 + "deg"] }) }], opacity: spinAnimation.interpolate({ inputRange: [0, 1], outputRange: [0.3, 1] })
                    }]}>
                        <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                            <View style={styles.diceDot}></View>
                            <View style={styles.diceDot}></View>
                        </View>

                        <View style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
                            <View style={styles.diceDot}></View>
                        </View>

                        <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                            <View style={styles.diceDot}></View>
                            <View style={styles.diceDot}></View>
                        </View>
                    </Animated.View>
                )
            case 6:
                return (
                    <Animated.View style={[styles.dice,
                    {
                        display: "flex", justifyContent: "space-between",
                        transform: [{ rotateZ: spinAnimation.interpolate({ inputRange: [0, 1], outputRange: [0 + "deg", 360 + "deg"] }) }], opacity: spinAnimation.interpolate({ inputRange: [0, 1], outputRange: [0.3, 1] })
                    }]}>
                        <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                            <View style={styles.diceDot}></View>
                            <View style={styles.diceDot}></View>
                        </View>

                        <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                            <View style={styles.diceDot}></View>
                            <View style={styles.diceDot}></View>
                        </View>

                        <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                            <View style={styles.diceDot}></View>
                            <View style={styles.diceDot}></View>
                        </View>
                    </Animated.View>
                )
            default:
                return (
                    null
                )
        }
    }

    console.log(numbersArray, "dices rerender")
    return (
        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            {
                numbersArray.map((k, i) => <Dice key={i} number={k} />)
            }
        </View>
    )
})

const styles = StyleSheet.create({

    dice: {

        padding: 4,
        backgroundColor: "tomato",
        width: 104,
        height: 104,
        borderRadius: "10%",
        marginHorizontal: 10,
        backgroundImage: "linear-gradient(to right, #D31027 0%, #EA384D  51%, #D31027  100%)",

    },
    diceDot: {
        width: 24,
        height: 24,
        borderRadius: "50%",
        backgroundColor: "white"
    },

});