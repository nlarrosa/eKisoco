import React, { useEffect, useContext } from 'react'
import { View, Text, Image, Alert, TextInput, TouchableOpacity, KeyboardAvoidingView, Keyboard } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack'
import { SafeAreaView } from 'react-native-safe-area-context';

import { rootStackParams } from '../../navigator/StackNavigator';
import { stylesGral } from '../../theme/generalTheme';
import { styleLogin } from '../../theme/loginTheme';

import  constGeneral  from '../../constants/globals';
import  constColor  from '../../constants/color';
import { useForm } from '../../hooks/useForm';
import Sgdi from '../../api/Sgdi';
import { AuthContext } from '../../context/AuthContext';




interface Props extends StackScreenProps<rootStackParams, 'LoginScreen'>{}


export const LoginScreen = ( {route , navigation}: Props ) => {

  const params         = route.params;
  const logoUrl        = constGeneral.logoComplete;
  const colorGreen     = constColor.green;
  const goToRegister   = () => navigation.navigate('RegisterScreen');
  const goToForgotPass = () => navigation.navigate('ForgotScreen')
  const { signIn, errorMessage, removeError } = useContext( AuthContext )


  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
      // title: params.name,
    })
  }, []);


  useEffect(() => {

    if(errorMessage.length === 0) return;

    Alert.alert(
      'Error al Ingresar', 
      'Falta la api error', 
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
    <>
      <KeyboardAvoidingView 
        style={{ flex: 1 }}
        // behavior={ (Platform.OS === 'ios') ? 'padding' : 'height' }
      >
        <View style={ stylesGral.glSafeArea }>
          <View style={ stylesGral.glCenterContainer }>
            <Image style={ styleLogin.logo } source={logoUrl} />
          </View>

          <View style={ styleLogin.loginContainer }>
            <TextInput
              style={ stylesGral.glTextInput }
              placeholder="Email *"
              keyboardType="email-address"
              autoCapitalize='none'
              autoCorrect={ false }
              onChangeText={ (value) => onChange( value, 'email')}
              value={ email }
              onSubmitEditing={ onChangeLogin }
              />
            <TextInput
              style={ stylesGral.glTextInput }
              placeholder="Clave *"
              keyboardType="default"
              autoCapitalize='none'
              autoCorrect={ false }
              secureTextEntry={ true }
              onChangeText={ (value) => onChange( value, 'password')}
              value={ password }
              onSubmitEditing={ onChangeLogin }
              />
          </View>

          <View style={ styleLogin.loginContainer }>
            <TouchableOpacity
              style={ stylesGral.glButton }
              onPress={ onChangeLogin }
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
      </KeyboardAvoidingView>
    </>
  )
}

