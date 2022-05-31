import React from 'react'
import { View, Text, FlatList } from 'react-native';



import constColor from '../../constants/color';
import { NewsCard } from '../products/NewsCard';
import { stylesGral } from '../../theme/generalTheme';
import { ProductoData } from '../../interfaces/reposicionesInterface';

interface Props {
  products: ProductoData[],
  title: string,
}

export const HorizontalSlide = ({ products, title }: Props) => {


  return (

    <View style={ stylesGral.uiHorizontaContainer }>
        <Text style={ stylesGral.uiHorizontalTitle }>{ title }</Text>
        <FlatList 
            refreshing={true}
            keyExtractor={ (item) => item.Edicion + item.Familia }
            data={ products }
            renderItem={  ({ item}:any) => <NewsCard width={140} height={180} product={ (item) }/> }
            horizontal={ true }
            showsHorizontalScrollIndicator={false}
        />
    </View>
  )
}
