import { StyleSheet } from 'react-native';
import  constColor  from '../constants/color';



export const styleRegister = StyleSheet.create({

    registerContainer: {
        alignItems: 'center',
        marginHorizontal: 35,
        marginTop: 20,
    },

    checkContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        width: '100%',
        marginTop: 35,

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