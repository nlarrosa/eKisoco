import React from 'react'
import { SafeAreaView, Text, KeyboardAvoidingView, Platform, View, TouchableOpacity, TextInput } from 'react-native';
import { Icon, Image } from 'react-native-elements';
import { ActivityIndicator } from 'react-native-paper';

export const CartScreen = () => 
{
  
    return (
    
    <KeyboardAvoidingView
        style={{ flex: 1, backgroundColor: 'white' }}
        behavior={ (Platform.OS === 'ios') ? 'padding': 'height' }
    >
        <View style={{ 
            
            flexDirection: 'row',
            justifyContent: 'space-around',
            borderWidth: 1,
            paddingVertical: 20,
        }}>
            <View style={{ borderWidth: 1, width: 24, }}>    
                <Image 
                    source={{}}
                    width={24}
                    PlaceholderContent={<ActivityIndicator />}
                />
            </View>
            <View>
                <Text>Titulo - Edicion</Text>
                <Text>Nombre Producto</Text>
                <Text>$ 599.90</Text>

                <View style={{ justifyContent: 'center'}}>
                    <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center'}}>
                        <Text> - </Text>
                        <TextInput style={{ borderWidth: 1}}/>
                        <Text> + </Text>
                    </TouchableOpacity>
                </View>
            </View>
            <Icon 
                type='ionicon' 
                name='trash' 
                color={'red'} 
                size={34}

            />


        </View>

    </KeyboardAvoidingView>
  )
}
