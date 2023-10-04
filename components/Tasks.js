import React from 'react'
import { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native'

const Tasks = (props) => {
    const [currentDateTime, setCurrentDateTime] = useState('');

    useEffect(() => {
        getCurrentDateTime();
    }, []);

    const getCurrentDateTime = () => {
        const now = new Date();
        const dateTimeString = now.toLocaleString(); // Customize the format as per your requirement
        setCurrentDateTime(dateTimeString);
    };
    return (
        <View style={styles.item}>
            <View style={styles.itemLeft}>
                <View style={styles.square}></View>
                <Text>{props.text}</Text>
            </View>
            <View style={styles.dateTimeContainer}>
                <Text style={styles.dateTimeText}>{currentDateTime}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: "#FFF",
        padding: 15,
        borderRadius: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 20,
    },
    itemLeft: {
        flexDirection: "row",
        alignContent: "center",
        flexWrap: "wrap",
    },
    square: {
        width: 24,
        height: 24,
        backgroundColor: "#55BCFC",
        borderRadius: 5,
        opacity: 0.5,
        marginRight: 15,
    },
    text: {
        maxWidth: "80%",
    },
    circular: {
        width: 12,
        height: 12,
        backgroundColor: "#55BCF6",
        borderWidth: 0.1,
        borderRadius: 50,
    },
});


export default Tasks