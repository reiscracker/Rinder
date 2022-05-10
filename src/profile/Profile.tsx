import { StyleSheet, Text, View, Image } from 'react-native';
import { Profile } from '../profilesData';

type ProfileProps = Pick<Profile, "name" | "image" | "imageAuthor">;
export default function ProfileComponent({ image, imageAuthor }: ProfileProps) {
    return (
        <View style={styles.container}>
            <Image source={image} style={styles.profileImage} />
            <Text style={styles.imageAuthor}>{imageAuthor}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: "75%",

    },
    profileImage: {
        flex: 1,
        height: null,
        width: null,
        resizeMode: 'cover'
    },
    name: {
        fontWeight: "bold",
        fontSize: 24
    },
    imageAuthor: {

    }
});