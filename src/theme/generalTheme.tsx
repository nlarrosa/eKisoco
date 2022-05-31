import { StyleSheet } from 'react-native';
import  constColor  from '../constants/color';


export const stylesGral = StyleSheet.create({

    /** GENERAL STYLES */
    glSafeArea: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        paddingTop: 20
    },

    glCenterContainer: {
        alignItems: 'center',
        marginHorizontal: 30,
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

      /** ------------------------------------- COMPONENTS STYLES --------------------------------------------------------- */
      /** HORIZONTAL SLIDE */
      uiHorizontaContainer: {
        backgroundColor: constColor.green, 
        paddingBottom: 40, 
        paddingTop:10
      },
      
      uiHorizontalTitle: {
        fontWeight: 'bold', 
        color: 'white', 
        marginVertical: 10, 
        fontSize: 17, 
        textAlign:'center'
      },


      /** LOADING */
      uiLoadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 15
      },


      /** MODAL HOUERS */
      mhModalHouersCloseBtn: {
        position: 'absolute',
        top: -8,
        right: -8,
        backgroundColor: 'white',
        borderRadius: 100
      },

      mhModalHouersTitle: {
        fontSize: 17, 
        fontWeight: 'bold'
      },

      mhModalHouersSubtitle: {
        fontSize: 14, 
        marginBottom: 30, 
        paddingHorizontal: 40, 
        textAlign: 'center'
      },

      mhModalHouersDaysContainer: {
        justifyContent: 'center', 
        alignItems: 'center', 
        flexDirection: 'row'
      },

      mhModalHouersDays: {
        width: 46,
        height: 45,
        padding: 5,
        borderRadius: 10,
        justifyContent:'center',
        marginHorizontal: 2,
      },

      mhModalHouersDaysText: {
        textAlign: 'center',
        color: 'white',
        fontWeight: 'bold',
      },

      mhModalHouersArrows: {
        fontSize: 25,
        borderWidth: 2,
        marginHorizontal: 25, 
        width: 100, 
        height: 55,
        marginVertical: 5,
        padding: 10,
        borderColor: constColor.green,
        borderRadius: 10,
        textAlign: 'center',
        color: '#000000',
      },

      mhModalHouersContainer: {
        flexDirection: 'row', 
        justifyContent: 'center', 
        alignItems: 'center', 
        marginTop: 40
      },

      mhModalHouersBtnSave: {
        backgroundColor: constColor.green, 
        marginHorizontal: 80,
        padding: 10,
        borderRadius: 10,
        height: 45,
        width: 120,
        marginTop: 30
      },

      mhModalHouersBtnText: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center'
      },


      /** QUANTITY */
      qtQuantityTitle: {
        marginTop: 15, 
        fontWeight: '700'
      },

      qtQuantityContainer: {
        alignItems: 'center', 
        flexDirection: 'row'
      },

      qtQuantityBtnLeft: {
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        height: 40,
      },

      qtQuantityBtnRight: {
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        height: 40,
      },

      qtQuantityBtnText: {
        justifyContent: 'center',
        width: 45,
        height: 45,
        marginVertical: 10,
      },

      qtQuantityText: {
        borderWidth: 1, 
        borderColor: 'green', 
        width: 45, 
        height: 40,
        fontSize: 17,
        fontWeight: 'bold'
      }

});