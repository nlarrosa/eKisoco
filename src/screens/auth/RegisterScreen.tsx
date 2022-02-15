import React, { useEffect, useState } from 'react'
import { View, Text, Image, TextInput, TouchableOpacity, Switch, ScrollView} from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { SafeAreaView } from 'react-native-safe-area-context';


import { stylesGral } from '../../theme/generalTheme';
import  constGeneral  from '../../constants/globals';
import  constColor  from '../../constants/color';
import { styleRegister } from '../../theme/registerTheme';
import { CustomSwitch } from '../../components/CustomSwitch';





interface Props extends StackScreenProps<any, any>{}



export const RegisterScreen = ( {navigation}: Props ) => {

  const logoUrl           = constGeneral.logoComplete;
  const colorGreen        = constColor.green;
  const colorGreenLight   = constColor.greenLight;
  const goToLogin         = () => navigation.navigate('LoginScreen');
  const [basesStatus, setBasesStatus] = useState({ isActive: false });
  const { isActive } = basesStatus;



  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    })
  }, []);


  
  const handlerChangeBases = (value: boolean, field: string) => {

      setBasesStatus({
        ...basesStatus,
        [field] : value,
      });
  }


  
    
  return (

    <SafeAreaView style={ stylesGral.glSafeArea }>

      <View style={ stylesGral.glCenterContainer }>
        <Image style={ styleRegister.logo } source={logoUrl} />
        <Text style={ styleRegister.subTitleText }>Registrate!</Text>
      </View>

      <ScrollView style={ stylesGral.glScrollView }>
        <View style={ styleRegister.registerContainer }>
            <TextInput 
              style={ stylesGral.glTextInput}
              placeholder='Email *'
              keyboardType='email-address'
            />
            <TextInput 
              style={ stylesGral.glTextInput}
              placeholder='Clave *'
              keyboardType='default'
            />
            <TextInput 
              style={ stylesGral.glTextInput}
              placeholder='Reingresar Clave *'
              keyboardType='default'
            />
            <TextInput 
              style={ stylesGral.glTextInput}
              placeholder='Nombre *'
              keyboardType='default'
            />
            <TextInput 
              style={ stylesGral.glTextInput}
              placeholder='Apellido *'
              keyboardType='default'
            />
            <TextInput 
              style={ stylesGral.glTextInput}
              placeholder='Direccion *'
              keyboardType='default'
            />
            <TextInput 
              style={ stylesGral.glTextInput}
              placeholder='Cod. Postal *'
              keyboardType='default'
            />
            <TextInput 
              style={ stylesGral.glTextInput}
              placeholder='Celular *'
              keyboardType='numeric'
            />
            <TextInput 
              style={ stylesGral.glTextInput}
              placeholder='Interior / Amba *'
              keyboardType='numeric'
            />
            <TextInput 
              style={ stylesGral.glTextInput}
              placeholder='Distribuidora *'
              keyboardType='numeric'
            />
            <TextInput 
              style={ stylesGral.glTextInput}
              placeholder='Paquete *'
              keyboardType='numeric'
            />
            
            <View style={ styleRegister.checkContainer }>
              <TouchableOpacity>
                  <Text style={ styleRegister.ckeckText }>Acepta términos y condiciones *</Text>
              </TouchableOpacity>
              <CustomSwitch isOn={ isActive } onChange={ ( value ) => handlerChangeBases(value, 'isActive')} />
            </View>

            <View>
                <TouchableOpacity style={ stylesGral.glButton }>
                  <Text style={ stylesGral.glButtonText }>Registrate</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={ goToLogin }>
                  <Text style={ stylesGral.glTextLink }>Volver</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={ goToLogin }>
                  <Text style={ stylesGral.glTextLink }>Olvidaste tu clave?</Text>
                </TouchableOpacity>
            </View>

        </View>
      </ScrollView>
    </SafeAreaView>

  )
}
