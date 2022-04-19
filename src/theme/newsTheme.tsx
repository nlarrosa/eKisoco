import { StyleSheet } from 'react-native';
import constColor from '../constants/color';



export const styleNews = StyleSheet.create({

    headerTitle: {
        width: '100%',
        height: 50,
        backgroundColor: constColor.green,
        marginVertical: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },

    headerTextNews: {
        fontSize: 18,
        color: 'white',
        fontWeight: 'bold'
    },

    headerText: {
        fontSize: 16,
        color: 'white',
    },

});