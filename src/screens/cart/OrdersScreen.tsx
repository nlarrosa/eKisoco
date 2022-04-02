import React, { useEffect, useState, useContext } from 'react'
import { Text, View, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity } from 'react-native';
import { Badge } from 'react-native-elements';
import color from '../../constants/color';

import constColor from '../../constants/color';
import { styleCart } from '../../theme/cartTheme';
import { CartContext } from '../../context/CartContext';
import { AuthContext } from '../../context/AuthContext';
import { OrdersData, Reposiciones } from '../../interfaces/cartInterfaces';
import { Loading } from '../../components/ui/Loading';





export const OrdersScreen = () => {

  const { userId } = useContext(AuthContext);
  const { getOrderByUser, isLoading } = useContext(CartContext);
  const [btnDetails, setBtnDetails] = useState<boolean>(false);
  const [orders, setOrders] = useState<OrdersData>();


  useEffect(() => {
    initOrders();
    
  }, []);
  
  const initOrders = async () => {
    
    const dataOrders = await getOrderByUser( 0 );
    setOrders(dataOrders);
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
        { orders?.reposiciones.map( (order) => (
          <View key={ order.IdReposicion } style={{ ...styleCart.crContainer, paddingRight:30}}>
              <View style={{ width: '100%'}}>
                  <View style={{ ...styleCart.crTitleEdicion, ...styleCart.crStatus}}>
                    <View >
                      <Text>Fecha Pedido:  { order.FechaCreacion.split('T')[0] }</Text>
                      <Text>Pedido: { order.IdReposicion }</Text>
                    </View> 
                    <Text style={ styleCart.crBadge }>{ order.Estado }</Text>
                  </View>

                  <View style={{ ...styleCart.crTitleEdicion, marginTop: 15 }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 17}}>{ order.Titulo }</Text>
                  </View>

                  <View>
                    <Text style={ styleCart.crSubPrecio }> 
                      PVP.: <Text style={ styleCart.crPrecio }>$ { order.PrecioTotal.toFixed(2) }</Text>
                    </Text>
                  </View>

                  <View style={{ ...styleCart.crTitle }}>
                    <Text >Cant. Solicitada: { order.CantidadSolicitada} - Cant. Asignada: { order.CantidadAsignada }</Text>
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
                        { btnDetails ? 'Ocultar Detalles' : 'Mostrar Detalles' }
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
