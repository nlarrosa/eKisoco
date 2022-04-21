import React, { useContext } from 'react'
import { ScrollView, Text, View } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { rootStackParams } from '../../navigator/StackNavigator';
import { ProductCard } from '../../components/products/ProductCard';
import { ProductContext } from '../../context/ProductContext';


interface Props extends StackScreenProps<rootStackParams, 'ProductDetailScreen'>{};


export const ProductDetailScreen = ({ route, navigation}: Props) => {


    const product = route.params;
    const { quantityReposity } = useContext(ProductContext)



  return (
    <ScrollView style={{ backgroundColor: 'white' }}>
      <View>
          <ProductCard producto={product} quantityRepository={ quantityReposity }/>
      </View>
      </ScrollView>
  )
}
