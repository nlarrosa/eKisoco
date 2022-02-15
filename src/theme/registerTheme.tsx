import { StyleSheet } from 'react-native';
import  constColor  from '../constants/color';



export const styleRegister = StyleSheet.create({

    registerContainer: {
        alignItems: 'center',
    },

    logo: {
        width: 190,
        height: 50,
        marginTop: '15%',
        marginBottom: 10,
    },

    checkContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '75%',
        marginVertical: 10,
        paddingHorizontal: 10,
        height: 54,
    },

    ckeckText: {
        fontSize: 14,
        fontWeight: 'bold',
    },

    subTitleText: { 
        marginBottom: 20, 
        color: constColor.green, 
        fontSize: 16 
    },

})