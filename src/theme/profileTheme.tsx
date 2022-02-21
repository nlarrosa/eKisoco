import { StyleSheet } from 'react-native';


import constColor  from  '../constants/color';


export const styleProfile = StyleSheet.create({

    headerBanner: {
        textAlign: 'center',
        marginBottom: 10,
        backgroundColor: '#f0f0f0',
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 20,
    },

    headerTitleText: {
        fontWeight: 'bold',
        fontSize: 12,
        textAlign: 'left',
        color: constColor.dark,
    },

    headerNameText: {
        fontWeight: 'bold',
        fontSize: 17,
        textAlign: 'left',
        color: constColor.dark,
        marginBottom: 3,
    },

    headerSubtitleText: {
        fontSize: 13,
        color: constColor.darkLight,
        textAlign: 'left',
        marginBottom: 10
    },

    avatarContent: {
        width: '25%',
        justifyContent: 'center',
        alignItems: 'center',
    },

    content: {
        paddingTop: 30,
    },

})