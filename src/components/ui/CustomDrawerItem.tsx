import React from 'react'
import { Text, View } from 'react-native';

interface Props {
    title: string,
    color?: string,
    textColor?: string,
    size?: number,
    badge?:boolean,
    badgeText?: string,
    textColorBadge?: string,
}

const CustomDrawerItem = ({ title, color='red', textColor='gray', size=16, badge=false, textColorBadge='white', badgeText='0' }: Props) => {

  return (
    
    <View style={{flex:1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
        <Text style={{ color: textColor, fontSize: size }}>{ title }</Text>

        { badge && (
            <View style={{ backgroundColor: color , padding: 3, width: 27, justifyContent: 'center', alignItems: 'center', borderRadius: 50}}>
                <Text style={{ color:  textColorBadge , fontWeight: 'bold', fontSize: size }}>{ badgeText}</Text>
            </View>
        )}
    </View>
  )
}

export default CustomDrawerItem