import React, { useEffect, useContext, useRef } from 'react'
import { KeyboardAvoidingView, Platform, FlatList, Text, View } from 'react-native';


import { CartContext } from '../../context/CartContext';
import { AuthContext } from '../../context/AuthContext';
import { Loading } from '../../components/ui/Loading';
import { OrderCard } from '../../components/orders/OrderCard';
import constColor from '../../constants/color';
import constGlobal from '../../constants/globals';




export const OrdersScreen = () => {

  const { userId } = useContext(AuthContext);
  const { getOrderByUser, orders, loadOrders, removeNotificationOrders } = useContext(CartContext);
  const ordersPage = useRef<number>(0);



  useEffect(() => {
    initOrders(ordersPage.current);
    removeNotificationOrders();
  }, []);
  


  const initOrders = async (page:number) => {
    if(loadOrders){
      ordersPage.current = page;
      getOrderByUser( page );
    }
  }


  return (
    
    <View style={{ flex: 1, backgroundColor: 'white' }} >
        <FlatList 
          data={ orders }
          keyExtractor={ (Item) => Item.IdReposicion.toString() }
          showsVerticalScrollIndicator={false}
          renderItem={ ({ item }) => <OrderCard order={item}/>  }
          onEndReached={ () => initOrders(ordersPage.current + 1) }
          onEndReachedThreshold={0.2}
          ListFooterComponent={ 
            loadOrders 
            ? ( <Loading size={40}/> ) 
            : ( <Text style={{ 
                    textAlign: 'center', 
                    fontSize: 17, 
                    marginVertical: 20, 
                    color: constColor.green,
                    fontWeight: 'bold'
                  }}> { constGlobal.loadOrdersMsg }
                </Text>
          )}
        />
    </View>
  )
}
