import React from "react";
import { View, StyleSheet, Image, Text } from "react-native";
import PropTypes from "prop-types";

export default function Card({ imageSource, name, tags }) {
    return (
        <>
            <Image style={styles.image} source={imageSource} />
            <Text style={styles.name}>{name}</Text>
            <View style={styles.tagContainer}>
                {tags.map((tag, i) => <Text key={i} style={styles.tag}>{tag}</Text>)}
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    image: {
        flex: 1,
        width: null,
        height: null,
        resizeMode: "cover",
        borderRadius: 20,
    },
    name: {
        position: "absolute",
        bottom: "25%",
        left: "10%",
        color: "white",
        fontWeight: "900",
        fontSize: 32,
        textShadowColor: "black",
        textShadowRadius: 3
    },
    tagContainer: {
        position: "absolute",
        flex: 1,
        left: "10%",
        right: "10%",
        bottom: "15%",
        flexDirection: "row",
    },
    tag: {
        marginRight: 10,
        paddingVertical: 5,
        paddingHorizontal: 15,
        borderRadius: 50,
        color: "white",
        fontWeight: "bold",
        backgroundColor: "#444"
    },
});

Card.propTypes = {
    imageSource: PropTypes.any.isRequired,
    name: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
}