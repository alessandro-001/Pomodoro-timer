import React from 'react'
import {View, Text, StyleSheet} from 'react-native'

type Props = {
    timerDate: Date;
}

export const CountdownDisplay: React.FC<Props> = ({ timerDate }) => {
  return (
    <View>
        <Text style={styles.timerCountdownTxt}>
        {timerDate.getMinutes().toString().padStart(2, "0")} : {timerDate.getSeconds().toString().padStart(2, "0 ")}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
    timerCountdownTxt: {
        fontSize: 40,
        fontWeight: 'bold',
    }
})