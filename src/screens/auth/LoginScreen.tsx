import React, { useEffect } from 'react'
import { View, Text, Image, Alert, TextInput, TouchableOpacity } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack'
import { SafeAreaView } from 'react-native-safe-area-context';

import { rootStackParams } from '../../navigator/StackNavigator';
import { stylesGral } from '../../theme/generalTheme';
import { styleLogin } from '../../theme/loginTheme';

import  constGeneral  from '../../constants/globals';
import  constColor  from '../../constants/color';




interface Props extends StackScreenProps<rootStackParams, 'LoginScreen'>{}


export const LoginScreen = ( {route , navigation}: Props ) => {

  const params         = route.params;
  const logoUrl        = constGeneral.logoComplete;
  const colorGreen     = constColor.green;
  const goToRegister   = () => navigation.navigate('RegisterScreen');
  const goToForgotPass = () => navigation.navigate('ForgotScreen')


  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
      // title: params.name,
    })
  }, [])
  
 
  return (
    
    <SafeAreaView style={ stylesGral.glSafeArea }>
        
        <View style={ stylesGral.glCenterContainer }>
          <Image style={ styleLogin.logo } source={logoUrl} />
        </View>

        <View style={ styleLogin.loginContainer }>
          <TextInput
            style={ stylesGral.glTextInput }
            placeholder="Email *"
            keyboardType="email-address"
          />
          <TextInput
            style={ stylesGral.glTextInput }
            placeholder="Clave *"
            keyboardType="default"
          />

        <View>
          <TouchableOpacity
            style={ stylesGral.glButton }
            onPress={() => Alert.alert('Button with adjusted color pressed')}
          >
            <Text style={ stylesGral.glButtonText }>Ingresar</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={ goToForgotPass }>
            <Text style={ stylesGral.glTextLink }>Olvidaste tu clave ?</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={ goToRegister }>
            <Text style={ stylesGral.glTextLink }>Registrate</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}

