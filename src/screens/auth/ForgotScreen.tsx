import React, { useEffect, useContext } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Image, TextInput, TouchableOpacity, Text, Alert } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';

import { rootStackParams } from '../../navigator/StackNavigator';
import { stylesGral } from '../../theme/generalTheme';
import { styleLogin } from '../../theme/loginTheme';
import  constGeneral  from '../../constants/globals';
import  constColor  from '../../constants/color';
import { AuthContext } from '../../context/AuthContext';
import { useForm } from '../../hooks/useForm';


interface Props extends StackScreenProps<rootStackParams, 'ForgotScreen'>{}



export const ForgotScreen = ({ route , navigation} : Props ) => {

  const params       = route.params;
  const logoUrl      = constGeneral.logoComplete;
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
    
    <SafeAreaView style={ stylesGral.glSafeArea }>
        
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
            onSubmitEditing= { onChangeForgot }
          />

        <View>
          <TouchableOpacity
            style={ stylesGral.glButton }
            onPress={ onChangeForgot }
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
