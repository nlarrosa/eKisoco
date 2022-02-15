import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Image, TextInput, TouchableOpacity, Text, Alert } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';

import { rootStackParams } from '../../navigator/StackNavigator';
import { stylesGral } from '../../theme/generalTheme';
import { styleLogin } from '../../theme/loginTheme';
import  constGeneral  from '../../constants/globals';
import  constColor  from '../../constants/color';


interface Props extends StackScreenProps<rootStackParams, 'ForgotScreen'>{}



export const ForgotScreen = ({ route , navigation} : Props ) => {

  const params       = route.params;
  const logoUrl      = constGeneral.logoComplete;
  const colorGreen   = constColor.green;
  const goToLogin    = () => navigation.navigate('LoginScreen');
  const goToRegister = () => navigation.navigate('RegisterScreen');

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
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

        <View>
          <TouchableOpacity
            style={ stylesGral.glButton }
            onPress={() => Alert.alert('Button with adjusted color pressed')}
          >
            <Text style={ stylesGral.glButtonText }>Recuperar Clave</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={ goToLogin }>
            <Text style={ stylesGral.glTextLink }>Ingresar</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={ goToRegister }>
            <Text style={ stylesGral.glTextLink }>Registrate</Text>
          </TouchableOpacity>

        </View>
      </View>
    </SafeAreaView>
  )
}
