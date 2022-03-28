import React, { useContext } from 'react'
import { Text, TouchableOpacity, View } from 'react-native';
import { Card } from 'react-native-elements';


import { ProductoData } from '../interfaces/reposicionesInterface';
import { styleProduct } from '../theme/productTheme';
import { stylesGral } from '../theme/generalTheme';
import { ActivityIndicator } from 'react-native-paper';
import { Quantity } from './Quantity';
import constColor from '../constants/color';
import { CartContext } from '../context/CartContext';
import { CartData } from '../interfaces/cartInterfaces';
import { ProductContext } from '../context/ProductContext';




interface Props {
  producto: ProductoData | undefined,
  quantityRepository: number,
}

export const ProductCard = ({ producto, quantityRepository }: Props ) => {

  const { addToCart, quantity } = useContext(CartContext);
  // const { quantity } = useContext(ProductContext);


  const addToCartHandler = (selectedProduct: CartData, idProdLogistica: string, quantity: number) => {

      addToCart(selectedProduct, idProdLogistica, quantity);
  }


  return (
    
      <View 
        key={producto?.Edicion}
        style={{ marginBottom: 20}}
      >

        <Card>
          <Card.Title> { producto?.IdProductoLogistica } - Edicion { producto?.Edicion} </Card.Title>
          <Card.Divider />
          <Card.Image style={ styleProduct.imageProduct }
            source={{ uri: producto?.URLImagen }}
            PlaceholderContent={ <ActivityIndicator /> }
          />

          <Text style={ styleProduct.title }>{ producto?.Descripcion?.toUpperCase().split("-")[1] }</Text>
          <Text style={ styleProduct.description}>Autor: { producto?.Autor }</Text>
          <Text style={ styleProduct.description}>Familia: { producto?.Familia }</Text>
          <Text style={ styleProduct.precio}>PVP: $ { producto?.Precio?.toFixed(2) }</Text>

          {/* <Text style={ styleProduct.title }>Cantidad a Solicitar</Text> */}
          <View style={{ justifyContent: 'center', alignItems: 'center'}}>
            <Quantity 
                initValue={ 1 }
                max={ quantityRepository } 
                buttonColor={ constColor.green}
                title={'Cantidad a Solicitar'}
                productId={String(producto?.Edicion)}
            />
          </View>
          
          <View style={{ marginHorizontal: 30}}>
            <TouchableOpacity 
              style={{ ...styleProduct.glButton }}
              onPress={() => addToCartHandler( producto, producto?.IdProductoLogistica, quantity) }  
            >
                <Text style={ stylesGral.glButtonText }>Agregar al Carrito</Text>
            </TouchableOpacity>
          </View>
        </Card>

      </View>
  )
}
