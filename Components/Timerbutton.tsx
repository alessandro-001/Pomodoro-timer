import React from "react";
import {Button, Pressable, StyleSheet, View} from "react-native";
import {FontAwesome} from "@expo/vector-icons";

type Props = {
    timerRunning: boolean;
    stopTimer: () => void;
    startTimer: () => void;

}

export const TimerButton: React.FC<Props> = ({timerRunning, stopTimer, startTimer}) => {
    return (
        <Pressable onPress={timerRunning ? stopTimer : startTimer} >
            <View style={styles.container}>
                <FontAwesome 
                    style={styles.icon}
                    name={timerRunning ? "pause" : "play"} 
                    size={100} 
                     />
            </View>
        </Pressable>   
    )
}

const styles = StyleSheet.create({
    container: {
        borderWidth: 5,
        width: 250,
        height: 250,
        borderRadius: 50,
        justifyContent: "center",
        marginVertical: 50,
        backgroundColor: "tomato",

    },
    icon: {
        alignSelf: "center",
    },
})