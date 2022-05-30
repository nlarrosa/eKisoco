import { StyleSheet } from 'react-native';


import constColor  from  '../constants/color';


export const styleProfile = StyleSheet.create({

    headerBanner: {
        textAlign: 'center',
        backgroundColor: '#f0f0f0',
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 25,
    },

    headerTitleText: {
        fontWeight: 'bold',
        fontSize: 14,
        textAlign: 'left',
        color: constColor.dark,
    },

    headerNameText: {
        fontWeight: 'bold',
        fontSize: 19,
        textAlign: 'left',
        color: constColor.dark,
        marginBottom: 4,
    },

    headerSubtitleText: {
        fontSize: 13,
        color: constColor.green,
        textAlign: 'left',
        fontWeight: 'bold'
    },

    avatarContent: {
        width: '30%',
        justifyContent: 'center',
        alignItems: 'center',
    },

    content: {
        paddingTop: 30,
    },

})