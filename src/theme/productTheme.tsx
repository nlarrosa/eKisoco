import { StyleSheet } from 'react-native';
import { stylesGral } from './generalTheme';
import constColor from '../constants/color';

const glLabel = stylesGral.glLabel;




export const styleProduct = StyleSheet.create({

    container: {
        marginHorizontal: 25,
        flex: 1,
        backgroundColor: 'white',
        // justifyContent: 'flex-start',
    },

    containerPicker: {
        alignContent: 'center',
        marginHorizontal: 30
    },

    title: {
        fontSize: 15,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 15,
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
        borderRadius: 20,
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
    },

    glButton: {
        backgroundColor: constColor.green,
        height: 55,
        width: '100%',
        borderRadius: 20,
        padding: 15,
        alignItems: "center",
        shadowColor: constColor.dark,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        marginVertical: 25
    },

    glButtonText: {
        color: 'white',
        fontSize: 18,
        width: 200,
        textAlign: 'center',
        shadowColor: constColor.dark
    },

    productContainer: {
        height: 500,
        borderRadius: 10,
        borderColor: constColor.grey,
        borderWidth: 1,
        padding: 10
    },

    imageProduct: {
        height: 295,
        width: 230,
        borderRadius: 10,
        
    },

    description: {
        fontSize: 13,
        textAlign: 'center',
    },

    precio: {
        fontSize: 14,
        textAlign: 'center',
        fontWeight: 'bold',
        color: constColor.green,
        marginTop: 10,
    },

    ncCountainer: {
        marginHorizontal: 2,
        paddingBottom: 0,
        paddingHorizontal: 7
    },

    ncRibbon: {
        backgroundColor: constColor.green, 
        zIndex: 9000, 
        padding: 5, 
        borderRadius: 10,
        width: 160,
        shadowColor: "#000",
        borderColor: 'white',
        borderWidth: 2,
        shadowOffset: {
            width: 2,
            height: 10,
        },
        shadowOpacity: 0.5,
        shadowRadius: 7,
        elevation: 15,
    },

    ncRibbonText: {
        fontSize: 15, 
        fontWeight: 'bold', 
        textAlign: 'center', 
        color: 'white',
    },

    ncImage: {
        flex: 1,
        borderRadius: 5,
    },
    
    ncImageContainer: {
        flex: 1,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.24,
        shadowRadius: 7,

        elevation: 9,
    },


})