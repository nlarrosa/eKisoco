import { StyleSheet } from 'react-native';
import  constColor  from '../constants/color';


export const stylesGral = StyleSheet.create({

    glSafeArea: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        height: 700,
        paddingTop: 20
    },

    glCenterContainer: {
        alignItems: 'center',
        marginHorizontal: 45,
        marginVertical: 50,
    },

    dividerHeader: {
        backgroundColor : constColor.green,
        color : "white",
        textAlign : "center",
        paddingVertical : 10,
        marginBottom : 10,
        marginTop : 10,
        fontWeight: 'bold'
    },

    glContainerLogo: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '20%',
    },

    glLogo: {
        width: 230,
        height: 70,
    },

    glTextInput: {
        height: 45,
        width: '80%',
        margin: 10,
        borderWidth: 1,
        paddingVertical: 10,
        paddingHorizontal: 35,
        borderColor: '#cccccc',
        alignItems: 'center',
        borderRadius: 50,
    },

    glTextInputLine: {
        height: 40,
        width: '100%',
        borderBottomWidth: 2,
        borderColor: '#cccccc',
        alignItems: 'center',
    },

    glButton: {
        backgroundColor: constColor.green,
        height: 55,
        width: 300,
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
        marginTop: 25,
        textAlign: 'center'
    },

    glScrollView: {
        marginHorizontal: 3,
        borderColor: constColor.green,
        paddingVertical: 20,
    },

    glLabel: {
        fontWeight: 'bold',
        fontSize: 13,
        marginTop: 10,
    },

    glSubtitle: {
        fontWeight: 'bold',
        fontSize: 14,
        marginTop: 10,
    },

    formControl: {
        marginEnd: 30,
        marginStart: 30,
        marginBottom: 10
    },

    glFooterContainer: {
        alignItems: 'center',
        marginVertical: 40,
    },

    glPicker: {
        fontSize: 14,
        color: '#879191',
        marginBottom: 10
    },

    glModalCenterView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
        backgroundColor: constColor.green
      },

      glModalView: {
        backgroundColor: "white",
        borderRadius: 20,
        paddingVertical: 40,
        paddingHorizontal: 10,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
      },

});