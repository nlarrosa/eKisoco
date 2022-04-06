import { StyleSheet } from "react-native";
import constColor from '../constants/color';

export const styleCart = StyleSheet.create({

    crContainer: {
        flexDirection: 'row',
        borderBottomWidth: 2,
        borderBottomColor: constColor.grey,
        paddingVertical: 25,
        paddingLeft: 15,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,

        elevation: 2,
    },

    crTitleEdicion: {
        fontSize: 14, 
        fontWeight: 'bold',
    },

    crTitle: {
        fontSize: 16, 
        marginTop: 3,
    },

    crPrecio: {
        fontSize: 18, 
        fontWeight: 'bold', 
        marginBottom: 8, 
        color: constColor.green,
    },

    crSubPrecio: {
        fontSize: 14, 
        fontWeight: 'normal', 
        color: constColor.greyDark,
        marginTop: 10,
    },

    crButtonDelete: {
        justifyContent: 'flex-end',
        alignItems: 'center',
        alignContent: 'space-around',
        width: '25%',
    },

    crStatus: {
        flexDirection: 'row', 
        justifyContent:'space-between', 
        alignItems: 'center' 
    },

    crBadge: {
        fontWeight: 'bold', 
        fontSize: 14,
        borderWidth: 2,
        padding: 5,
        borderRadius: 50,
        textAlign: 'center',
        width: 100,
        marginBottom: 5
    },

    crBtnDetail: {
        width: 120,
        marginTop: 20,
        backgroundColor: constColor.green,
        borderColor: constColor.green,
        borderWidth: 1,
        padding: 5,
        alignItems: 'center',
        borderRadius: 10,
        shadowColor: constColor.dark,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    }




})