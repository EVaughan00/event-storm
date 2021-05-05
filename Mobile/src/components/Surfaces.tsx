import React, { FunctionComponent } from 'react';
import { View, ViewStyle, StyleSheet, StyleProp } from 'react-native';

interface SurfaceProps {
    style?: StyleProp<ViewStyle>,
    align?: "top" | "center"
}

const Paper: FunctionComponent<SurfaceProps> = props => {
    const dynamicStyles: any = {        
        justifyContent: !props.align || props.align == "top" ? "flex-start" : props.align
    }

    return (        
        <View style={[styles.view, dynamicStyles, props.style ]}>
            <View style={styles.container}>
                {props.children}
            </View>
        </View>
    );
} 

const styles = StyleSheet.create({ 
    view: {
        backgroundColor: "white",
        height: "100%",
        display: "flex",
        alignItems: "center"
    },
    container: {
        padding: 16,
        maxWidth: 500,
        width: "100%"
    },
});

export { Paper }

