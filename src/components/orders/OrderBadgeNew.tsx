import React from 'react'
import { Text, View } from 'react-native';
import constColor from '../../constants/color';

interface Props {
    title: string
}

export const OrderBadgeNew = ({ title='New!'}: Props) => {
  return (
    
        <View style={{ marginBottom: 10 }}>
            <Text style={{ 
                color: 'white', 
                fontWeight:'bold', 
                fontSize: 17, 
                backgroundColor: 'red', 
                paddingHorizontal: 3,
                borderRadius: 3
                }}>
                    { title }
            </Text>
        </View>
  )
}
