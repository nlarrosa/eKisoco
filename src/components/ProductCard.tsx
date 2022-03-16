import React, { useContext, useEffect, useState } from 'react'
import { Alert, FlatList, Text, TouchableOpacity, View } from 'react-native';
import { Card } from 'react-native-elements';


import { ProductoData } from '../interfaces/reposicionesInterface';
import { styleProduct } from '../theme/productTheme';
import { stylesGral } from '../theme/generalTheme';
import { Picker } from '@react-native-picker/picker';
import { AddQuantityCart } from './AddQuantityCart';
import { CartContext } from '../context/CartContext';




interface Props {
  products: ProductoData[] | undefined,
}

export const ProductCard = ({ products }: Props ) => {

  const { addToCart, messageCart, productsCart } = useContext(CartContext);
  const [selectedQuantity, setSelectedQuantity] = useState<string>();
 

  useEffect(() => {
    
    if(messageCart.length === 0)
    return;

    Alert.alert(
      'Agregar Productos',
      messageCart,
      [ { text: "Salir",  style: "destructive", onPress: () => console.log('Nico')} ],
    )

  }, [messageCart]);


  
  

  const addToCartHandler = (selectedProduct: ProductoData, quantity: string) => {

      addToCart(selectedProduct, quantity);
  }


  return (
    <>
      { products?.map(( producto ) => (
        <View 
          key={producto.Edicion}
          style={{ marginBottom: 20}}
        >
          <Card>
            <Card.Title> { producto.IdProductoLogistica } - Edicion { producto.Edicion} </Card.Title>
            <Card.Divider />
            <Card.Image style={ styleProduct.imageProduct }
              source={{ uri: producto.URLImagen }}
            />

            <Text style={ styleProduct.title }>{ producto.Descripcion.toUpperCase().split("-")[1] }</Text>
            <Text style={ styleProduct.description}>Autor: { producto.Autor }</Text>
            <Text style={ styleProduct.description}>Familia: { producto.Familia }</Text>
            <Text style={ styleProduct.precio}>PVP: $ { producto.Precio.toFixed(2) }</Text>

            <Text style={ styleProduct.title }>Cantidad a Solicitar</Text>
            <View style={{ justifyContent: 'center', alignItems: 'center'}}>
              <AddQuantityCart 
                selectedQuantity={selectedQuantity}
                onChange={ (value) => setSelectedQuantity(value) }   
              />
            </View>
            
            <View style={{ marginHorizontal: 30}}>
              <TouchableOpacity 
                style={{ ...styleProduct.glButton }}
                onPress={() => addToCartHandler( producto, selectedQuantity ) }  
              >
                  <Text style={ stylesGral.glButtonText }>Agregar al Carrito</Text>
              </TouchableOpacity>
            </View>
          </Card>
        </View>
      ))}
    </>
        
    
  )
}