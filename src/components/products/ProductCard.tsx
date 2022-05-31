import React, { useContext, useEffect } from 'react'
import { Dimensions, Text, TouchableOpacity, View } from 'react-native';
import { Card } from 'react-native-elements';


import { ProductoData } from '../../interfaces/reposicionesInterface';
import { styleProduct } from '../../theme/productTheme';
import { stylesGral } from '../../theme/generalTheme';
import { ActivityIndicator } from 'react-native-paper';
import { Quantity } from '../ui/Quantity';
import constColor from '../../constants/color';
import { CartContext } from '../../context/CartContext';







interface Props {
  producto: ProductoData | undefined,
  quantityRepository: number,
}

export const ProductCard = ({ producto, quantityRepository }: Props ) => {


  const { addToCart, quantity } = useContext(CartContext);
  const widthScreen = Dimensions.get ('window').width;
  const heightScreen = Dimensions.get ('window').height;


  /** Agregamos el producto al carrito */
  const addToCartHandler = (selectedProduct: ProductoData, idProdLogistica: string, quantity: number) => {

      addToCart(selectedProduct, idProdLogistica, quantity);
  }


  return (
    
      <View 
        key={producto?.Edicion}
        style={{ flex: 1, marginBottom: 20}}
      >

        <Card>
          <Card.Title> { producto?.IdProductoLogistica } - Edicion { producto?.Edicion} </Card.Title>
          <Card.Divider />
          
          <View style={{ justifyContent: 'center', alignItems: 'center'}}>
            <Card.Image style={ styleProduct.imageProduct } 
              source={{ uri: producto?.URLImagen }}
              PlaceholderContent={ <ActivityIndicator /> }
            />
          </View>

          <Text style={ styleProduct.title }>{ producto?.Descripcion?.toUpperCase().split("-")[1] }</Text>
          <Text style={ styleProduct.description}>Autor: { producto?.Autor }</Text>
          <Text style={ styleProduct.description}>Familia: { producto?.Familia }</Text>
          {/* <Text style={ styleProduct.precio}>PVP: $ { producto?.Precio?.toFixed(2) }</Text>
          <Text style={ styleProduct.cantidad}>( disponibles:  { producto?.Cantidad } u. )</Text> */}
          <View style={{ flexDirection:'row', justifyContent:'center', alignItems: 'center'}}>
            <Text style={ styleProduct.precio}>PVP: $ { producto?.Precio?.toFixed(2) } - </Text>
            <Text style={ styleProduct.precio}>(Stock: { producto?.Cantidad } u.)</Text>
          </View>

          { producto?.Circulado && producto?.Cantidad != '0' && (
            <View>
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
            </View>
          )}


          { producto?.Circulado && producto?.Cantidad == '0' && (
            <View style={{ justifyContent: 'center', alignItems: 'center'}}>
              <View style={{ ...styleProduct.ncRibbonCard, backgroundColor: 'red',  }}>
                  <Text style={styleProduct.ncRibbonText}>AGOTADO!</Text>
              </View>
            </View>
          )}


          { !producto?.Circulado && (
            <View style={{ justifyContent: 'center', alignItems: 'center'}}>
              <View style={ styleProduct.ncRibbonCard }>
                  <Text style={ styleProduct.ncRibbonText }>PROXIMAMENTE!</Text>
              </View>
            </View>
          )}


        </Card>

      </View>
  )
}
