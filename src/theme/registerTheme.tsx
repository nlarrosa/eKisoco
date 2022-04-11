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
        justifyContent: 'center',
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

    contentModal: {
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center', 
        marginHorizontal: 50
    },

    headerTitleModal: {
        fontSize: 19, 
        fontWeight: 'bold', 
        color: constColor.green, 
        textAlign: 'center'
    },

    headerSubtitleModal: {
        fontSize: 13, 
        fontWeight: 'bold', 
        color: 'gray', 
        textAlign: 'center', 
        marginBottom: 20
    },

    msgModal: {
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 30
    },

    contentInfoModal: {
        marginTop: 30, 
        marginHorizontal: 20,
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 15,
    },

    btnConfirmModal: {
        backgroundColor: constColor.green,
        padding: 10,
        borderRadius: 10,
        width: 120,
        height: 50,
        alignContent: 'center',
        marginTop: 50,
        shadowColor: constColor.dark,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },

    textBtnConfirmModal: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center'
    },

    btnEditModal: {
        padding: 10,
        borderRadius: 10,
        width: 120,
        height: 50,
        alignContent: 'center',
        borderWidth: 2,
        borderColor: constColor.green,
        marginTop:30
    },

    textBtnEditModal: {
        color: constColor.green,
        fontSize: 16,
        textAlign: 'center'
    }



})