import React, { useContext, useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Text, View, ScrollView, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Avatar } from 'react-native-elements';
import { StackScreenProps } from '@react-navigation/stack';
import { rootStackParams } from '../../navigator/StackNavigator';


import { styleProfile } from '../../theme/profileTheme';
import { stylesGral } from '../../theme/generalTheme';
import  constGral  from '../../constants/globals';
import { styleRegister } from '../../theme/registerTheme';
import constColor from '../../constants/color';
import { AuthContext } from '../../context/AuthContext';
import { useForm } from '../../hooks/useForm';
import { UserContext } from '../../context/UserContext';



interface Props extends StackScreenProps<rootStackParams, 'ProfileScreen'>{}

export const ProfileScreen = ({ navigation }: Props ) => {

  const { dataUser, errorMessage, removeError } = useContext(AuthContext);
  const { getProfile, editProfile } = useContext(UserContext);
  // const [password, setPassword] = useState('');
  // const [name, setName]         = useState(dataUser?.Nombre);
  // const [lastname, setLastname] = useState(dataUser?.Apellido);
  // const [address, setAddress]   = useState(dataUser?.Direccion);
  // const [codpost, setCodpost]   = useState(dataUser?.CodPostal);
  // const [phone, setPhone]       = useState(dataUser?.Celular);
  // const [locality, setLocality] = useState(dataUser?.Localidad);
  // const [pakage, setPakage]     = useState(dataUser?.Paquete);
  
  // useEffect(() => {
    
  // }, [])


  const {onChange, formData } = useForm({ 

    clave: '',
    apellido: dataUser?.Apellido,
    nombre: dataUser?.Nombre,
    direccion: dataUser?.Direccion,
    codPostal: dataUser?.CodPostal,
    celular: dataUser?.Celular,
    localidad: dataUser?.Localidad, 
    paquete: dataUser?.Paquete, 
  });

  const { clave, apellido, nombre, direccion, codPostal, celular, localidad, paquete } = formData;


  useEffect(() => {
    if(errorMessage.length === 0) 
    return;

    Alert.alert(
      'Error Cambios en Perfil', 
      errorMessage, 
      [{ text: 'Aceptar', onPress: removeError}]
    );
  }, [errorMessage])



  const onSubmitHandler = () => {

      editProfile({ 
        Clave: clave,
        Apellido: apellido,
        Nombre: nombre,
        Direccion: direccion,
        CodPostal: codPostal,
        Celular: celular,
        Localidad: '',
        Paquete: '', 
      });
  }
  
    
  return (
    
    <SafeAreaView style={ stylesGral.glSafeArea }>
        <View style={ styleProfile.headerBanner }>
            <View style={ styleProfile.avatarContent }>
              <Avatar
                size={54}
                rounded
                title = 'NL'
                containerStyle={{ 
                  backgroundColor: constColor.green,
                }}
              />
            </View>
            <View>
              <Text style={ styleProfile.headerNameText }>{ dataUser?.Nombre } { dataUser?.Apellido }</Text>
              <Text style={ styleProfile.headerTitleText }>Distribuidor:</Text>
              <Text style={ styleProfile.headerSubtitleText}>{ dataUser?.MedioDeEntregaPadre }</Text>
            </View>
        </View>

          
        <ScrollView style={ stylesGral.glScrollView }>
          <View style={ stylesGral.formControl }>
            <Text style={ stylesGral.glLabel }>Cambiar Clave *</Text>
            <TextInput 
              style={ stylesGral.glTextInputLine}
              keyboardType='default'
              autoCapitalize='none'
              autoCorrect={ false }
              secureTextEntry={ true }
              onChangeText={ (value) => onChange( value, 'clave')}
              value={ clave }
              onSubmitEditing={ onSubmitHandler }
            />
          </View>
          <View style={ stylesGral.formControl }>
            <Text style={ stylesGral.glLabel }>Ingrese Apellido *</Text>
            <TextInput 
              style={ stylesGral.glTextInputLine}
              keyboardType='default'
              autoCapitalize='words'
              autoCorrect={ false }
              onChangeText={ (value) => onChange( value, 'apellido')}
              value={ apellido }
              onSubmitEditing={ onSubmitHandler }
            />
          </View>
          <View style={ stylesGral.formControl }>
            <Text style={ stylesGral.glLabel }>Ingrese Nombre *</Text>
            <TextInput 
              style={ stylesGral.glTextInputLine}
              keyboardType='default'
              autoCapitalize='words'
              autoCorrect={ false }
              onChangeText={ (value) => onChange( value, 'nombre')}
              value={ nombre }
              onSubmitEditing={ onSubmitHandler }
            />
          </View>
          <View style={ stylesGral.formControl }>
            <Text style={ stylesGral.glLabel }>Ingrese Dirección *</Text>
            <TextInput 
              style={ stylesGral.glTextInputLine}
              keyboardType='default'
              autoCapitalize='none'
              autoCorrect={ false }
              onChangeText={ (value) => onChange( value, 'direccion')}
              value={ direccion }
              onSubmitEditing={ onSubmitHandler }
            />
          </View>
          <View style={ stylesGral.formControl }>
            <Text style={ stylesGral.glLabel }>Ingrese Código Postal *</Text>
            <TextInput 
              style={ stylesGral.glTextInputLine}
              keyboardType='default'
              autoCapitalize='none'
              autoCorrect={ false }
              onChangeText={ (value) => onChange( value, 'codPostal')}
              value={ codPostal }
              onSubmitEditing={ onSubmitHandler }
            />
          </View>
          <View style={ stylesGral.formControl }>
            <Text style={ stylesGral.glLabel }>Ingrese Celular *</Text>
            <TextInput 
              style={ stylesGral.glTextInputLine}
              keyboardType='phone-pad'
              autoCapitalize='none'
              autoCorrect={ false }
              onChangeText={ (value) => onChange( value, 'celular')}
              value={ celular }
              onSubmitEditing={ onSubmitHandler }
            />
          </View>
          <View style={ stylesGral.formControl }>
            <Text style={ stylesGral.glLabel }>Ingrese Localidad *</Text>
            <TextInput 
              style={ stylesGral.glTextInputLine}
              keyboardType='default'
              autoCapitalize='none'
              autoCorrect={ false }
              onChangeText={ (value) => onChange( value, 'localidad' )}
              value={ localidad || undefined }
              onSubmitEditing={ onSubmitHandler }
            />
          </View>
          <View style={ stylesGral.formControl }>
            <Text style={ stylesGral.glLabel }>Ingrese Paquete *</Text>
            <TextInput 
              style={ stylesGral.glTextInputLine}
              keyboardType='default'
              autoCapitalize='none'
              autoCorrect={ false }
              onChangeText={ (value) => onChange( value, 'paquete')}
              value={ paquete || undefined }
              onSubmitEditing={ onSubmitHandler }
            />
          </View>
          <View style={ stylesGral.glFooterContainer }>
              <TouchableOpacity 
                style={ stylesGral.glButton }
                onPress={ onSubmitHandler  }
              >
                <Text style={ stylesGral.glButtonText }>Guardar Cambios</Text>
              </TouchableOpacity>
          </View>
        </ScrollView>
    </SafeAreaView>
  )
}
