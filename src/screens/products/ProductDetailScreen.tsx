import React, { useContext, useEffect, useState } from 'react'
import { Alert, ScrollView, Text, View } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { rootStackParams } from '../../navigator/StackNavigator';
import { ProductCard } from '../../components/products/ProductCard';
import { ProductContext } from '../../context/ProductContext';
import { CartContext } from '../../context/CartContext';
import { ProductoData } from '../../interfaces/reposicionesInterface';
import { Loading } from '../../components/ui/Loading';


interface Props extends StackScreenProps<rootStackParams, 'ProductDetailScreen'>{};


export const ProductDetailScreen = ({ route, navigation}: Props) => {


    const product = route.params;
    const { quantityReposity, getTitulosByAutor, } = useContext(ProductContext)
    const { messageCart, titleMessage, removeMessageCart} = useContext(CartContext)
    const [productDetail, setProductDetail] = useState<ProductoData>();
    const [isLoading, setIsLoading] = useState(true)


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


    useEffect(() => {
      getProduct(product);
    },[])


    const getProduct = async (product: any) => {
       const data = await getTitulosByAutor(product.IdProductoLogistica, product.Autor, product.Edicion);
       
       data?.map((item) => {
          setProductDetail(item);
       });

       setIsLoading(false);
    }
    
  
  if(isLoading){
      return (<Loading />);
  }

  return (
    <ScrollView style={{ backgroundColor: 'white' }}>
      <ProductCard producto={productDetail} quantityRepository={ quantityReposity }/>
    </ScrollView>
  )
}
