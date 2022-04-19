import React from 'react'
import { View, Text, FlatList } from 'react-native';


import constColor from '../../constants/color';
import { NewsCard } from '../products/NewsCard';

interface Props {
  products: Object[],
  title: string,
}

export const HorizontalSlide = ({ products, title }: Props) => {


  return (

    <View style={{ flex: 1, backgroundColor: constColor.green, paddingBottom: 10 }}>
        <Text style={{ fontWeight: 'bold', color: 'white', margin: 8, fontSize: 16}}>{ title }</Text>
        <FlatList 
            keyExtractor={ (item) => item.Edicion }
            data={ products }
            renderItem={  ({ item}:any) => <NewsCard width={120} height={150} product={ (item) }/> }
            horizontal={ true }
            showsHorizontalScrollIndicator={false}
        />
    </View>
    
  )
}
