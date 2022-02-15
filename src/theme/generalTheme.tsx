import { StyleSheet } from 'react-native';
import  constColor  from '../constants/color';


export const stylesGral = StyleSheet.create({

    glSafeArea: {
        flex: 1,
    },

    glCenterContainer: {
        alignItems: 'center',
    },

    glTextInput: {
        height: 45,
        width: '80%',
        margin: 10,
        borderWidth: 1,
        padding: 10,
        borderColor: '#cccccc',
        alignItems: 'center',
        borderRadius: 50
    },

    glButton: {
        backgroundColor: constColor.green,
        height: 45,
        borderRadius: 50,
        padding: 10,
        alignItems: "center",
        marginTop: 30,
        shadowColor: "#000",
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
        shadowColor: '#000000',
    },

    glTextLink: {
        color: constColor.green,
        fontSize: 15,
        marginTop: 20,
        textAlign: 'center'
    },

    glScrollView: {
        marginHorizontal: 3,
        borderColor: constColor.green
    }

});