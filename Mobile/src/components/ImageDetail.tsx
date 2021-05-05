import React, { FC } from 'react';
import { StyleSheet, View, Text, Image, ImageSourcePropType } from 'react-native';

interface Props {
    source: ImageSourcePropType,
    subTitle: string
}

const ImageDetail: FC<Props> = props => {    
    return (
        <View style={styles.container}>
            <Image style={styles.image} source={props.source} />
            <Text style={styles.text}>{props.subTitle}</Text>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
    },
    image: {
        width: 50,
        height: 50
    },
    text: {
        fontSize: 12
    }
});

export default ImageDetail;