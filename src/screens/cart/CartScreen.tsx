import React, { useContext } from 'react'
import {  Text, KeyboardAvoidingView, Platform, View, ScrollView } from 'react-native';
import { Icon, Button } from 'react-native-elements';


import { Quantity } from '../../components/Quantity';
import { ProductContext } from '../../context/ProductContext';
import { CartContext } from '../../context/CartContext';
import { styleCart } from '../../theme/cartTheme';
import constColor from '../../constants/color';



export const CartScreen = () => 
{
    const { productsCart } = useContext(CartContext)
    const { quantityReposity } = useContext(ProductContext);

    
  
    return (
    
    <KeyboardAvoidingView
        style={{ flex: 1, backgroundColor: 'white' }}
        behavior={ (Platform.OS === 'ios') ? 'padding': 'height' }
        >
        <View style={{ 
            // justifyContent: 'flex-end',
            width: '100%', 
            height: 110,
            borderBottomWidth: 4,
            borderBottomColor: constColor.green,
        }}>
            <Text>Cant. de Productos</Text>
        </View>
        <ScrollView>
            { productsCart?.map( (product, index) => (
            <View key={ index } style={ styleCart.crContainer}>
                <View style={{ width: '75%'}}>
                    <Text style={ styleCart.crTitleEdicion }>Familia: { product.idProductoLogistica} - Edicion: { product.Edicion }</Text>
                    <Text style={ styleCart.crTitle }>{ product.Descripcion.toUpperCase().split("-")[1] }</Text>
                    <Text style={ styleCart.crPrecio }>$ { Number(product.Precio).toFixed(2) }</Text>

                    <Quantity 
                        initValue={Number(product.Cantidad)} 
                        max={quantityReposity} 
                        buttonColor={ constColor.green}
                    />

                </View>
                <View style={ styleCart.crButtonDelete }>
                    <Icon 
                        raised
                        reverse
                        type='ionicon' 
                        name='trash' 
                        color={constColor.danger} 
                        size={20}
                    />
                </View>
            </View>
            ))}
        </ScrollView>

    </KeyboardAvoidingView>
  )
}
