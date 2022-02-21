import { StyleSheet } from 'react-native';
import { stylesGral } from './generalTheme';
import constColor from '../constants/color';

const glLabel = stylesGral.glLabel;




export const styleProduct = StyleSheet.create({

    container: {
        alignContent: 'center',
        marginHorizontal: 30,

    },

    containerPicker: {
        alignContent: 'center',
        marginHorizontal: 30
    },

    title: {
        fontSize: 16,
        fontWeight: 'normal',
        textAlign: 'center',
        marginBottom: 15,
    },

    labelSearch: {
        ...glLabel,
        marginBottom: 10,
        textAlign: 'center',
        fontSize: 13,
    },

    buttonChangeSearch: {
        backgroundColor: 'white',
        height: 45,
        borderRadius: 50,
        padding: 10,
        alignItems: "center",
        marginVertical: 25,
        borderColor: constColor.green,
        borderWidth: 1,
        shadowColor: constColor.dark,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },

    textChangeSearch: {
        color: constColor.green,
        fontSize: 18,
        width: 200,
        textAlign: 'center',
        shadowColor: constColor.dark,
        fontWeight: 'bold',
    }
})