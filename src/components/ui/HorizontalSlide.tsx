import React from 'react'
import { View, Text, FlatList } from 'react-native';



import constColor from '../../constants/color';
import { NewsCard } from '../products/NewsCard';
import { stylesGral } from '../../theme/generalTheme';

interface Props {
  products: Object[],
  title: string,
}

export const HorizontalSlide = ({ products, title }: Props) => {


  return (

    <View style={ stylesGral.uiHorizontaContainer }>
        <Text style={ stylesGral.uiHorizontalTitle }>{ title }</Text>
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
