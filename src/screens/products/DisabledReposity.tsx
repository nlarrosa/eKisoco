import React from 'react'
import { Image, View, Text } from 'react-native'
import { Icon } from 'react-native-elements'

import constColor from '../../constants/color';
import constGeneral from '../../constants/globals';
import { stylesGral } from '../../theme/generalTheme';

export const DisabledReposity = () => {

    const logoUrl = constGeneral.logoComplete;

  return (
    
    <View style={{ 
        flex: 1,  
        justifyContent: 'center', 
        alignItems: 'center',
        backgroundColor: 'white'
    }}>

        <Icon
            tvParallaxProperties={undefined}
            name='information-circle-outline'
            type='ionicon'
            size={70}
            color={ constColor.grey }
        />

        <Image  style={stylesGral.glLogo } source={logoUrl} />
        <Text style={{ textAlign: 'center', fontSize: 17, marginTop: 20, marginHorizontal: 50}}>
            { constGeneral.disabledReposityMsg } 
        </Text>
    </View>
  )
}
