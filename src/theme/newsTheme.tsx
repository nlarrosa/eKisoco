import { Dimensions, StyleSheet } from 'react-native';
import constColor from '../constants/color';

const { height: windowHeight } = Dimensions.get('window');

export const styleNews = StyleSheet.create({

    headerTitle: {
        width: '100%',
        height: 50,
        backgroundColor: constColor.green,
        marginVertical: 0,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10
    },

    headerTextNews: {
        fontSize: 16,
        color: 'white',
        fontWeight: 'bold',
    },

    headerText: {
        fontSize: 16,
        color: 'white',
    },

    hsContainer: {
        flex: 4,
        paddingBottom:15,
        paddingTop:7, 
        backgroundColor: constColor.green
    },

    hsContainerOne: {
        height: (windowHeight / 3),
        backgroundColor: constColor.green,
        justifyContent: 'center',
    },

    caContainer: {
        flex:5, 
        justifyContent: 'center', 
        alignItems: 'center', 
        marginBottom:10
    },

    caContainerOne: {
        height: (windowHeight / 2) - 10,
        justifyContent: 'center', 
        alignItems: 'center', 
        marginBottom:10
    }

});