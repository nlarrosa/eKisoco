import React, { useContext, useEffect } from 'react'
import { Alert, ScrollView, Text, View } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { rootStackParams } from '../../navigator/StackNavigator';
import { ProductCard } from '../../components/products/ProductCard';
import { ProductContext } from '../../context/ProductContext';
import { CartContext } from '../../context/CartContext';


interface Props extends StackScreenProps<rootStackParams, 'ProductDetailScreen'>{};


export const ProductDetailScreen = ({ route, navigation}: Props) => {


    const product = route.params;
    const { quantityReposity } = useContext(ProductContext)
    const { messageCart, titleMessage, removeMessageCart} = useContext(CartContext)


    /** Alertas generadas desde el contexto 
     * del carrito cuando agregamos productos
     */
     useEffect(() => {
      
      if(messageCart?.length === 0)
      return;

      Alert.alert(
          titleMessage,
          messageCart,
          [{ text: 'Aceptar', style: "destructive", onPress: removeMessageCart}]
      );
      
    }, [messageCart])


  return (
    <ScrollView style={{ backgroundColor: 'white' }}>
      <View>
          <ProductCard producto={product} quantityRepository={ quantityReposity }/>
      </View>
      </ScrollView>
  )
}
