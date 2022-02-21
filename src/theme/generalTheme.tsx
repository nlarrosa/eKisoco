import { StyleSheet } from 'react-native';
import  constColor  from '../constants/color';


export const stylesGral = StyleSheet.create({

    glSafeArea: {
        backgroundColor: 'white',
        flex: 1,
    },

    glCenterContainer: {
        alignItems: 'center',
    },

    dividerHeader: {
        backgroundColor : constColor.green,
        color : "white",
        textAlign : "center",
        paddingVertical : 5,
        marginBottom : 10,
        marginTop : 30,
    },

    glTextInput: {
        height: 45,
        width: '80%',
        margin: 10,
        borderWidth: 1,
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderColor: '#cccccc',
        alignItems: 'center',
        borderRadius: 50,
    },

    glTextInputLine: {
        height: 33,
        width: '100%',
        borderBottomWidth: 1,
        borderColor: '#cccccc',
        alignItems: 'center',
    },

    glButton: {
        backgroundColor: constColor.green,
        height: 45,
        borderRadius: 50,
        padding: 10,
        alignItems: "center",
        marginVertical: 25,
        shadowColor: constColor.dark,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },

    glButtonText: {
        color: 'white',
        fontSize: 18,
        width: 200,
        textAlign: 'center',
        shadowColor: constColor.dark,
    },

    glTextLink: {
        color: constColor.green,
        fontSize: 15,
        marginTop: 10,
        textAlign: 'center'
    },

    glScrollView: {
        marginHorizontal: 3,
        borderColor: constColor.green
    },

    glLabel: {
        fontWeight: 'bold',
        fontSize: 12,
        marginTop: 10,
    },

    formControl: {
        marginEnd: 30,
        marginStart: 30,
        marginBottom: 10
    },

    glFooterContainer: {
        alignItems: 'center',
        marginBottom: 30,
    }

});