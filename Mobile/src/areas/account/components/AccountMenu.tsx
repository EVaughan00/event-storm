import { StackHeaderProps } from '@react-navigation/stack';
import React, { FunctionComponent } from 'react';
import { StyleSheet, View } from 'react-native';
import { FontAwesome } from "@expo/vector-icons";
import { Popup } from '../../../components/Popup';
import { MaterialInput } from '../../../components/Form/Material/MaterialInput';
import { AppStore } from '../../../AppStore';
import theme from '../../../theme';
import { AuthenticationContext } from '../../../providers/AuthenticationProvider';
import { CustomButton } from '../../../components/CustomButton';

interface Props {
    navigation: any
}

export const AccountMenu: FunctionComponent<Props> = props => {
    const [ open, setOpen ] = React.useState(false);
    const [ account ] = AppStore.account.use();
    const authContext = React.useContext(AuthenticationContext);

    const { user } = account;

    const handleOpen = () => {
        setOpen(true);
    }

    const handleSignOut = () => {
        authContext.logout()
            .then(() => setOpen(false));
    }

    return (
        <View style={styles.container}>
            <FontAwesome onPress={handleOpen} name="user-circle-o" size={24} style={styles.icon} />

            <Popup visible={open} title="My Account" onClose={()=>setOpen(false)}>
                <View style={styles.popup}>
                    <MaterialInput 
                        label="Full name" 
                        defaultValue={`${user?.firstName} ${user?.lastName}`}
                        editable={false}/>

                    <MaterialInput 
                        label="Email" 
                        defaultValue={`${user?.email}`}
                        editable={false}/>

                    <View style={{ marginTop: theme.unit * 2}}>
                        <CustomButton onPress={handleSignOut} ripple color="default">Sign out</CustomButton>
                    </View>                    
                </View>
            </Popup>
        </View>
    );
}

const styles = StyleSheet.create({
    ripple: {
        borderRadius: 30,
        overflow: "hidden",
        padding: 10
    },
    container: {
        marginRight: theme.unit * 2,
    },
    popup: {
        marginTop: theme.unit * 2
    },
    icon: {
        opacity: .5
    }
});