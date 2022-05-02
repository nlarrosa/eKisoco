import React, { useState } from 'react'
import { View, Text, TouchableOpacity } from 'react-native';


import { Reposiciones } from '../../interfaces/cartInterfaces';
import { styleCart } from '../../theme/cartTheme';
import  constColor from '../../constants/color';
import { OrderBadgeNew } from './OrderBadgeNew';


interface Props {
    order: Reposiciones,
}


export const OrderCard = ({ order}: Props) => {

    const [btnDetails, setBtnDetails] = useState<boolean>(false);

    return (
    
    <View style={{ ...styleCart.crContainer, paddingRight:30}}>
        <View style={{ width: '100%'}}>
            <View style={{ ...styleCart.crTitleEdicion, ...styleCart.crStatus}}>
                <View >
                    <Text style={{ marginBottom: 5}}>{(order.RepoNotificada)? '': <OrderBadgeNew title='Nuevo !'/>}</Text>
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

  )
}
