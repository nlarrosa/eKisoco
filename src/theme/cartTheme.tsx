import { StyleSheet } from "react-native";
import constColor from '../constants/color';

export const styleCart = StyleSheet.create({

    crHeaderTotals: {
        width: '100%', 
        height: 120,
        paddingTop: 15,
        paddingBottom: 15,
        borderBottomWidth: 4,
        borderBottomColor: constColor.green,
        backgroundColor: constColor.green,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 7,
    },

    crHeaderTotalContainer: {
        flex: 1, 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginHorizontal: 20, 
        flexDirection: 'row'
    },

    crTotalArticulos: {
        fontSize: 15, 
        color: 'white', 
        marginBottom: 5
    },

    crTotalPVP: {
        fontSize: 17, 
        fontWeight: 'bold', 
        color: 'white'
    },

    crTotalPrice: {
        fontSize: 20, 
        fontWeight: 'bold', 
        color: 'white'
    },

    crButtonConfirm: {
        backgroundColor: 'white',
        padding: 12,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 7,
    },

    crButtonConfirmText: {
        color: constColor.green,
        fontSize: 15,
        fontWeight: 'bold'
    },

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