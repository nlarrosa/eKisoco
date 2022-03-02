import React, { useEffect, useContext, useState } from 'react'
import { View, Text, Image, Alert, TextInput, TouchableOpacity, KeyboardAvoidingView, Keyboard, Platform } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack'

import { rootStackParams } from '../../navigator/StackNavigator';
import { stylesGral } from '../../theme/generalTheme';
import { styleLogin } from '../../theme/loginTheme';
import  constColor  from '../../constants/color';
import { useForm } from '../../hooks/useForm';
import { AuthContext } from '../../context/AuthContext';
import { LogoHeader } from '../../components/LogoHeader';
import { Icon, Input } from 'react-native-elements';





interface Props extends StackScreenProps<rootStackParams, 'LoginScreen'>{}


export const LoginScreen = ( {route , navigation}: Props ) => {

  const params         = route.params;
  const colorGreen     = constColor.green;
  const goToRegister   = () => navigation.navigate('RegisterScreen');
  const goToForgotPass = () => navigation.navigate('ForgotScreen');
  const { signIn, errorMessage, removeError } = useContext( AuthContext );
  const [showPass, setShowPass] = useState(false);


  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
      // title: params.name,
    })
  }, []);


  useEffect(() => {
    
    if(errorMessage.length === 0) 
    return;

    Alert.alert(
      'Error al Ingresar', 
      errorMessage, 
      [{ text: 'Aceptar', onPress: removeError}]
    );
  }, [errorMessage])

  


  const { email, password, onChange } = useForm({ 
    email: '', 
    password: '',
  });


  const onChangeLogin = () => {
    
    signIn({ mail: email, clave: password });
    Keyboard.dismiss();
  }
  
 
  return (
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={ (Platform.OS === 'ios') ? 'padding': 'height' }
      >
        {/* Logo */}
        <LogoHeader subTitle={ '¡Te damos la Bienvenida!' }/>

        {/* Form Login */}
        <View style={ styleLogin.loginContainer }>

          <Input
              leftIcon={{ 
                type: 'ionicon', 
                name: 'mail-outline', 
                color: '#517fa4',
                size: 17,
                iconStyle:{
                  marginRight: 10,
                }
              }}
              inputStyle={{ fontSize: 16}}
              placeholder="Email *" 
              keyboardType="email-address"
              autoCapitalize='none'
              autoCorrect={ false }
              onChangeText={ (value) => onChange( value, 'email')}
              value={ email }
              onSubmitEditing={ onChangeLogin }
          />
          <Input 
              leftIcon={{ 
                type: 'ionicon', 
                name: 'key-outline', 
                color: '#517fa4',
                size: 17,
                iconStyle:{
                  marginRight: 10,
                }
              }}
              inputStyle={{ fontSize: 16}}
              placeholder="Clave *" 
              keyboardType="default"
              autoCapitalize='none'
              autoCorrect={ false }
              secureTextEntry={ (showPass) ? false : true }
              onChangeText={ (value) => onChange( value, 'password')}
              value={ password }
              onSubmitEditing={ onChangeLogin }
              rightIcon={
                <Icon 
                    type='ionicon'
                    name={(showPass) ? 'eye-off-outline' : 'eye-outline'}
                    iconStyle={{
                      marginRight: 10,
                    }}
                    onPress={ () => setShowPass(!showPass)}
                />
              }
          />
        </View>

        {/* Buttons */}
        <View style={ stylesGral.glFooterContainer }>
          <TouchableOpacity style={ stylesGral.glButton } onPress={ onChangeLogin }>
            <Text style={ stylesGral.glButtonText }>Ingresar</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={ goToForgotPass }>
            <Text style={ stylesGral.glTextLink }>Olvidaste tu clave ?</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={ goToRegister }>
            <Text style={ stylesGral.glTextLink }>Registrate</Text>
          </TouchableOpacity>
        </View>

      </KeyboardAvoidingView>
  )
}

