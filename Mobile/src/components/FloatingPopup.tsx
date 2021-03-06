import React, { FunctionComponent } from 'react';
import { Modal, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

interface Props {
    visible?: boolean,
    onDismiss?: () => void
}

const FloatingPopup: FunctionComponent<Props> = props => {
    const handleDismiss = () => {
        props.onDismiss?.();
    }

    return (
            <Modal animationType="fade" visible={props.visible} transparent>                
                <TouchableWithoutFeedback onPress={handleDismiss}>
                    <View style={styles.overlay} />
                </TouchableWithoutFeedback>
                <View style={styles.container}>
                    { props.children }
                </View>
            </Modal>
    );
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
        padding: 30,
        paddingTop: 100
    },
    content: {
        backgroundColor: "white",
        width: "100%"
    },
    overlay: {        
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0,0,0,0.5)'
    }
});

export { FloatingPopup }