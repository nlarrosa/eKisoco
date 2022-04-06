import React from 'react'
import { View, Image, Text } from 'react-native';


import { stylesGral } from '../../theme/generalTheme';
import  constGeneral  from '../../constants/globals';
import constColor from '../../constants/color';
import { Icon } from 'react-native-elements';

interface Props {
  subTitle: string,
}

export const LogoEmptyCart = ({ subTitle }:Props) => {
    
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
            name='cart'
            type='ionicon'
            size={70}
            color={ constColor.grey }
        />

        <Image style={stylesGral.glLogo } source={logoUrl} />
        <Text style={{ textAlign: 'center', fontSize: 17, marginTop: 20, marginHorizontal: 50}}>{ subTitle }</Text>
    </View>

  )
}