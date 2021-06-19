import React, { FC } from 'react';
import { Modal, SafeAreaView, StyleSheet, View } from 'react-native';
import { Link } from '../components/CustomButton';
import { Paper } from './Surfaces';
import { Typography } from '../components/Typography';
import { ScrollView } from 'react-native-gesture-handler';
import { Header } from 'react-native/Libraries/NewAppScreen';
import { color } from 'react-native-reanimated';
import { Divider } from 'react-native-paper';
import theme from '../theme';

const { Title, Paragraph } = Typography;

export interface PopupProps {
    visible: boolean,
    title: string,
    scrollable?: boolean,
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
                    <View style={styles.header}>
                        <Title style={styles.title} level={1}>{props.title}</Title>
                        <View>
                            <Link size="default" color="error" onClick={props.onClose}>CANCEL</Link>
                        </View>
                    </View>
                    <Divider style={styles.divider} />
                    { props.children }
                </Paper>
                </ScrollView>
            </SafeAreaView>
        </Modal>
    )
}

const styles = StyleSheet.create({ 
    surface: {
        paddingTop: 2 * theme.unit, 
        position: "relative"
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 65
    },
    title: {
        fontWeight: 'bold'
    },
    divider: {
        borderWidth: 1,
        opacity: 0.2,
        marginBottom: theme.unit * 2
    }
});

export { Popup };

