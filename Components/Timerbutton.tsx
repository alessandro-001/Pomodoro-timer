import React from "react";
import {Pressable, StyleSheet, View} from "react-native";
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
        borderRadius: 250 / 2,
        borderWidth: 15,
        width: 250,
        height: 250,
        marginVertical: 50,
        justifyContent: "center",
    },
    icon: {
        alignSelf: "center",
    },
})