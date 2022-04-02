import React from 'react'
import { View, Image, Text } from 'react-native';


import { stylesGral } from '../../theme/generalTheme';
import  constGeneral  from '../../constants/globals';

interface Props {
  subTitle: string,
}

export const LogoHeader = ({ subTitle }:Props) => {
    
const logoUrl = constGeneral.logoComplete;
  return (
    
    <View style={ stylesGral.glContainerLogo }>
          <Image style={stylesGral.glLogo } source={logoUrl} />
          <Text style={ stylesGral.glSubtitle }>{ subTitle }</Text>
    </View>

  )
}
