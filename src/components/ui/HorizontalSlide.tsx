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

    <View style={{flex:1,  backgroundColor: constColor.green, paddingBottom: 40, paddingTop:10 }}>
        <Text style={{ fontWeight: 'bold', color: 'white', marginVertical: 10, fontSize: 17, textAlign:'center'}}>{ title }</Text>
        <FlatList 
            keyExtractor={ (item) => item.Edicion }
            data={ products }
            renderItem={  ({ item}:any) => <NewsCard width={140} height={180} product={ (item) }/> }
            horizontal={ true }
            showsHorizontalScrollIndicator={false}
        />
    </View>
  )
}
