import React from 'react'
import { Text, View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

import constColor from '../../constants/color';
import { stylesGral } from '../../theme/generalTheme';

interface Props {
  size?: number,
  color?: string,
}

export const Loading = ( { size = 50, color = constColor.green}: Props) => {


  return (
    <View style={ stylesGral.uiLoadingContainer }>
        <ActivityIndicator 
            size={ size }
            color={ color }
        />
        <Text style={{ marginTop: 10, alignItems: 'center'}}>Cargando...</Text>
    </View>
  )
}
