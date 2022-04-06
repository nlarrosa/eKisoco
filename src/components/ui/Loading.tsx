import React from 'react'
import { View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

import constColor from '../../constants/color';


export const Loading = () => {


  return (
    <View style={{ 
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }}>
        <ActivityIndicator 
            size={ 50 }
            color={ constColor.green }
        />
    </View>
  )
}
