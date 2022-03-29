import React, { useState } from 'react'
import { Text, View, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity } from 'react-native';
import { Badge } from 'react-native-elements';
import color from '../../constants/color';

import constColor from '../../constants/color';
import { styleCart } from '../../theme/cartTheme';




export const OrdersScreen = () => {

  const [btnDetails, setBtnDetails] = useState<boolean>(false);


  return (
    
    <KeyboardAvoidingView
    style={{ flex: 1, backgroundColor: 'white' }}
    behavior={ (Platform.OS === 'ios') ? 'padding': 'height' }
    >
      <ScrollView>

          <View style={ styleCart.crContainer}>
              <View style={{ width: '75%'}}>
                  <View style={ styleCart.crTitle }>
                    <Text >
                        Fecha Pedido:  2022-03-29
                    </Text>
                  </View>

                  <View style={{ ...styleCart.crTitleEdicion, flexDirection: 'row', }}>
                    <Text >
                      Pedido: 876765 - <Text style={{ color: 'orange', fontWeight: 'bold'}}>Pendiente</Text>
                    </Text>
                  </View>

                  <View style={{ ...styleCart.crTitleEdicion, marginTop: 15 }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 17}}>Colorado Kid</Text>
                  </View>

                  <View>
                    <Text style={ styleCart.crSubPrecio }> 
                      PVP.: <Text style={ styleCart.crPrecio }>$ 8786.89</Text>
                    </Text>
                  </View>
                  <View style={{ ...styleCart.crTitle }}>
                    <Text >Cant. Solicitada: 13 - Cant. Asignada: 13</Text>
                  </View>

                  { btnDetails && (
                    <View style={{ marginTop: 20}}>
                      <Text style={{
                        fontWeight: 'bold',
                        fontSize: 13
                      }}>
                        Nro. Familia: 110903 - Sthepen King
                      </Text>
                      <Text style={{
                        fontWeight: 'bold',
                        fontSize: 13
                      }}>
                        Edicion: 3434
                      </Text>
                      <Text style={{
                        fontWeight: 'bold',
                        fontSize: 13
                      }}>
                        Sthepen King
                      </Text>
                    </View>
                  )}

                  <View>
                    <TouchableOpacity 
                    onPress={ () => setBtnDetails(!btnDetails) }
                    style={{
                      width: 150,
                      marginTop: 20,
                      backgroundColor: constColor.green,
                      borderColor: constColor.green,
                      borderWidth: 1,
                      padding: 5,
                      alignItems: 'center',
                      borderRadius: 10,
                      shadowColor: constColor.dark,
                      shadowOffset: {
                          width: 0,
                          height: 2,
                      },
                      shadowOpacity: 0.25,
                      shadowRadius: 3.84,
                      elevation: 5,
                    }}>
                      <Text style={{ color: 'white'}}>
                        { btnDetails ? 'Ocultar Detalles' : 'Mostrar Detalles' }
                      </Text>
                    </TouchableOpacity>
                  </View>
              </View>
          </View>
      </ScrollView>

    </KeyboardAvoidingView>
  )
}
