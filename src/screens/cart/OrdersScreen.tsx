import React, { useEffect, useState, useContext, useRef } from 'react'
import { Text, View, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity, FlatList } from 'react-native';

import { styleCart } from '../../theme/cartTheme';
import { CartContext } from '../../context/CartContext';
import { AuthContext } from '../../context/AuthContext';
import { Loading } from '../../components/ui/Loading';
import { Item } from 'react-native-paper/lib/typescript/components/List/List';
import { OrderCard } from '../../components/orders/OrderCard';






export const OrdersScreen = () => {

  const { userId } = useContext(AuthContext);
  const { getOrderByUser, isLoading, orders } = useContext(CartContext);
  const ordersPage = useRef<number>(0);



  useEffect(() => {
    initOrders(ordersPage.current);
  }, []);
  


  const initOrders = async (page:number) => {
    console.log(page);
    ordersPage.current = page;
    getOrderByUser( page );
  }
  


  if( isLoading ){
    return <Loading />
  }

  return (
    
    <KeyboardAvoidingView
    style={{ flex: 1, backgroundColor: 'white' }}
    behavior={ (Platform.OS === 'ios') ? 'padding': 'height' }
    >
      <FlatList 
        data={ orders }
        keyExtractor={ (Item) => Item.IdReposicion.toString() }
        renderItem={ ({ item }) => <OrderCard order={item}/>  }
        onEndReachedThreshold={0.4}
        onEndReached={ () => initOrders(ordersPage.current + 1) }
      />
    </KeyboardAvoidingView>
  )
}
