import React from 'react'
import { Text, View } from 'react-native';

interface Props {
    title: string,
    color?: string,
    textColor?: string,
    size?: number,
    badge?:boolean,
}

const CustomDrawerItem = ({ title, color='red', textColor='white', size=16, badge=false }: Props) => {

  return (
    
    <View style={{flex:1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
        <Text >{ title }</Text>
        
        { badge && (
            <View style={{ backgroundColor: color , padding: 3, width: 27, justifyContent: 'center', alignItems: 'center', borderRadius: 50}}>
                <Text style={{ color:  textColor , fontWeight: 'bold', fontSize: size }}>5</Text>
            </View>
        )}
    </View>
  )
}

export default CustomDrawerItem