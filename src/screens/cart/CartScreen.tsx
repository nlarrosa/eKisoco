import React, { useContext } from 'react'
import { Text, KeyboardAvoidingView, Platform, View, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';



import { Quantity } from '../../components/ui/Quantity';
import { ProductContext } from '../../context/ProductContext';
import { CartContext } from '../../context/CartContext';
import { styleCart } from '../../theme/cartTheme';
import constColor from '../../constants/color';
import { LogoEmptyCart } from './EmptyCart';
import { CartData } from '../../interfaces/cartInterfaces';





export const CartScreen = () => 
{
    const { productsCart, totalPrice, removeToCart, totalQuantity, generateOrder } = useContext(CartContext)
    const { quantityReposity } = useContext(ProductContext);
    const navigation = useNavigation();


    
    const confirmRemoveProduct = (productId: string) => {

        Alert.alert(
          "Atencion!",
          "Desea borrar el producto seleccionado?",
          [ { text: "SI", onPress: () => { removeToCart(productId) }},
            { text: "NO"},
          ]
        );
    };


    const confirmGenerateOrder = (products: {[key: string] : CartData} ) => {

        Alert.alert(
          "Atencion!",
          "Desea confirmar el pedido?",
          [ { text: "SI", onPress: () => { generateOrder(products) }},
            { text: "NO"},
          ]
        );
    };


    if( totalQuantity <= 0){ 
        return ( 
            <LogoEmptyCart 
                subTitle='El carrito se encuentra vacio.' 
            />
        );
    }
  
    return (
    
    <KeyboardAvoidingView
        style={{ flex: 1, backgroundColor: 'white' }}
        behavior={ (Platform.OS === 'ios') ? 'padding': 'height' }
        >
        <View style={ styleCart.crHeaderTotals }>
            <View style={styleCart.crHeaderTotalContainer}>
                <View>
                    <Text style={ styleCart.crTotalArticulos }>Total Artículos: { totalQuantity }</Text>
                    <Text style={ styleCart.crTotalPVP }>Total PVP:</Text>
                    <Text style={ styleCart.crTotalPrice }>$ { totalPrice.toFixed(2) }</Text>
                </View>

                { totalQuantity > 0 && 
                    <View>
                        <TouchableOpacity 
                        onPress={ () => confirmGenerateOrder(productsCart || []) }
                        style={ styleCart.crButtonConfirm }>
                            <Text style={ styleCart.crButtonConfirmText }>
                                Confirmar
                            </Text>
                        </TouchableOpacity>
                    </View>
                }
            </View>
        </View>
        <ScrollView>
            { Object.entries(productsCart).map( ([ key, product] ) => (
            <View key={ product.Edicion } style={ styleCart.crContainer}>
                <View style={{ width: '75%'}}>
                    <Text style={ styleCart.crTitleEdicion }>Familia: { product.idProductoLogistica} - Edicion: { product.Edicion }</Text>
                    <Text style={ styleCart.crTitle }>{ product.Descripcion.toUpperCase().split("-")[1] }</Text>
                    <Text style={ styleCart.crSubPrecio }> Precio Unit. { Number(product.Precio).toFixed(2) }</Text>
                    <Text style={ styleCart.crPrecio }>$ { product.PrecioSum.toFixed(2) }</Text>

                    <Quantity 
                        initValue={ Number( product.Cantidad ) }
                        max={ quantityReposity } 
                        buttonColor={ constColor.green }
                        title={ 'Cantidad Seleccionada' }
                        productId={String(product?.Edicion)}
                        cartAction={true}
                    />

                </View>
                <View style={ styleCart.crButtonDelete }>
                    <TouchableOpacity onPress={ () => confirmRemoveProduct(product.Edicion)}>
                        <Icon 
                            tvParallaxProperties
                            raised
                            reverse
                            type='ionicon' 
                            name='trash' 
                            color={constColor.danger} 
                            size={20}
                        />
                    </TouchableOpacity>
                </View>
            </View>
            ))}
        </ScrollView>

    </KeyboardAvoidingView>
  )
}
