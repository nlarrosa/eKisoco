import React, { useEffect, useContext } from 'react'
import { View, Image, TextInput, TouchableOpacity, Text, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';

import { rootStackParams } from '../../navigator/StackNavigator';
import { stylesGral } from '../../theme/generalTheme';
import { styleLogin } from '../../theme/loginTheme';
import  constColor  from '../../constants/color';
import { AuthContext } from '../../context/AuthContext';
import { useForm } from '../../hooks/useForm';
import { LogoHeader } from '../../components/LogoHeader';
import { Input } from 'react-native-elements';



interface Props extends StackScreenProps<rootStackParams, 'ForgotScreen'>{}



export const ForgotScreen = ({ route , navigation} : Props ) => {

  const params       = route.params;
  const colorGreen   = constColor.green;
  const goToLogin    = () => navigation.navigate('LoginScreen');
  const goToRegister = () => navigation.navigate('RegisterScreen');

  const { forgotPassword, errorForgot, removeError } = useContext(AuthContext)
  const { email, onChange } = useForm({ email: '' });
 



  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    })
  }, [])



  /** Valida si existe un error y lo muestra */
  useEffect(() => {
    if(errorForgot.length === 0)
    return;

    Alert.alert(
      'Error Cambiar Clave',
      errorForgot,
      [{ text: 'Aceptar', onPress: removeError }]
    );

  }, [ errorForgot ])


  
  /** Accion que llama al dispatch para
   * recuperar la contraseña
   */
  const onChangeForgot = () => {
     forgotPassword({ mail: email })
  }
  
  

  return (
    
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={ (Platform.OS === 'ios') ? 'padding' : 'height' }
      >
        {/* Logo */}
        <LogoHeader subTitle={ 'No recordas tu clave!' }/>

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
            onSubmitEditing= { onChangeForgot }
          />
        </View>

        {/* Buttons */}
        <View style={ stylesGral.glFooterContainer }>
          <TouchableOpacity style={ stylesGral.glButton } onPress={ onChangeForgot }>         
            <Text style={ stylesGral.glButtonText }>Recuperar Clave</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={ goToLogin }>
            <Text style={ stylesGral.glTextLink }>Ingresar</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={ goToRegister }>
            <Text style={ stylesGral.glTextLink }>Registrate</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
  )
}
