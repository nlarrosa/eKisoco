import { StyleSheet } from 'react-native';
import  constColor  from '../constants/color';



export const styleRegister = StyleSheet.create({

    registerContainer: {
        alignItems: 'center',
    },

    logo: {
        width: 190,
        height: 50,
        marginTop: '10%',
        marginBottom: 10,
    },

    checkContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: 10,
        height: 54,
    },

    ckeckText: {
        fontSize: 14,
        fontWeight: 'normal',
        marginRight: 15,
    },

    subTitleText: { 
        marginBottom: 20, 
        color: constColor.green, 
        fontSize: 16 
    },

})