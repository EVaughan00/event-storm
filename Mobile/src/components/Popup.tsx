import React, { FC } from 'react';
import { Modal, SafeAreaView, StyleSheet, View } from 'react-native';
import { Link } from '../components/CustomButton';
import { Paper } from './Surfaces';
import { Typography } from '../components/Typography';
import { ScrollView } from 'react-native-gesture-handler';

const { Title, Paragraph } = Typography;

export interface PopupProps {
    visible: boolean,
    title: string,
    scrollable: boolean,
    onClose: () => void
}

const Popup: FC<PopupProps> = props => {    
    return (            
        <Modal
            animationType="slide"
            visible={props.visible}>
            <SafeAreaView>
                <ScrollView
                    scrollEnabled={props.scrollable}
                >
                <Paper style={styles.surface}>
                    <View style={styles.closeButton}>
                        <Link color="strong" style={styles.closeText} onClick={props.onClose}>X</Link>
                    </View>
                    <Title level={2} align="left" style={styles.title}>{props.title}</Title>
                    { props.children }
                </Paper>
                </ScrollView>
            </SafeAreaView>

        </Modal>
    )
}

const styles = StyleSheet.create({ 
    surface: {
        paddingTop: 32, 
        position: "relative"
    },
    closeButton: {
        width: 50, 
        top: 0, 
        left: 6, 
        zIndex: 2, 
        position: "absolute"
    },
    closeText: {
        fontSize: 22
    },
    title: {
        marginTop: 64,
        marginBottom: 16
    }
});

export { Popup };

