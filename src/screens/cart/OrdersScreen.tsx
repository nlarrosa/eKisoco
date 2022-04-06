import React, { useEffect, useState, useContext } from 'react'
import { Text, View, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity } from 'react-native';

import { styleCart } from '../../theme/cartTheme';
import { CartContext } from '../../context/CartContext';
import { AuthContext } from '../../context/AuthContext';
import { Loading } from '../../components/ui/Loading';





export const OrdersScreen = () => {

  const { userId } = useContext(AuthContext);
  const { getOrderByUser, isLoading, orders } = useContext(CartContext);
  const [btnDetails, setBtnDetails] = useState<boolean>(false);
  // const [orders, setOrders] = useState<Reposiciones[]>();


  useEffect(() => {
    initOrders();
  }, []);
  
  const initOrders = async () => {
    getOrderByUser( 0 );
  }
  

  if( isLoading ){
    return <Loading />
  }

  return (
    
    <KeyboardAvoidingView
    style={{ flex: 1, backgroundColor: 'white' }}
    behavior={ (Platform.OS === 'ios') ? 'padding': 'height' }
    >
      <ScrollView>
        { orders?.map(( order ) => (
          <View key={ order.IdReposicion } style={{ ...styleCart.crContainer, paddingRight:30}}>
              <View style={{ width: '100%'}}>
                  <View style={{ ...styleCart.crTitleEdicion, ...styleCart.crStatus}}>
                      <View >
                        <Text>Fecha Pedido:  { order.FechaCreacion.split('T')[0] }</Text>
                        <Text>Pedido: { order.IdReposicion }</Text>
                      </View> 
                      <Text style={{
                        ...styleCart.crBadge,
                        borderColor:  order.EstadoColor,
                        color: order.EstadoColor
                      }}>
                        { order.Estado }
                      </Text>
                  </View>
                  <View style={{ ...styleCart.crTitleEdicion, marginTop: 5 }}>
                      <Text style={{ fontWeight: 'bold', fontSize: 17}}>{ order.Titulo }</Text>
                  </View>
                  <View>
                      <Text style={ styleCart.crSubPrecio }> 
                        PVP.: <Text style={ styleCart.crPrecio }>$ { order.PrecioTotal.toFixed(2) }</Text>
                      </Text>
                  </View>

                  <View style={{ ...styleCart.crTitle }}>
                      <Text >Cant. Solicitada: { order.CantidadSolicitada} / Cant. Despachada: { order.CantidadAsignada }</Text>
                  </View>

                  { btnDetails && (
                    <View style={{ marginTop: 20 }}>
                      <Text>Nro. Familia: { order.Familia }</Text>
                      <Text>Edicion: { order.Edicion }</Text>
                      <Text>{ order.Autor }</Text>
                    </View>
                  )}

                  <View>
                      <TouchableOpacity 
                        onPress={ () => setBtnDetails(!btnDetails) }
                        style={ styleCart.crBtnDetail }>
                        <Text style={{ color: 'white'}}>
                          { btnDetails ? 'Ocultar' : 'Detalles' }
                        </Text>
                      </TouchableOpacity>
                  </View>
              </View>
          </View>
        ))}
      </ScrollView>
    </KeyboardAvoidingView>
  )
}
