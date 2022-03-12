import React, { useContext, useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Text, View, ScrollView, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Avatar } from 'react-native-elements';
import { StackScreenProps } from '@react-navigation/stack';
import { rootStackParams } from '../../navigator/StackNavigator';


import { styleProfile } from '../../theme/profileTheme';
import { stylesGral } from '../../theme/generalTheme';
import constColor from '../../constants/color';
import { AuthContext } from '../../context/AuthContext';
import { useForm } from '../../hooks/useForm';
import { UserContext } from '../../context/UserContext';



interface Props extends StackScreenProps<rootStackParams, 'ProfileScreen'>{}

export const ProfileScreen = ({ navigation }: Props ) => {

  const { dataUser } = useContext(AuthContext);
  const { messageProfile, removeErrorProfile, editProfile } = useContext(UserContext);
  const [grupoCuenta, setGrupoCuenta] = useState(dataUser?.GrupoCuenta);
  // const { canilla, isLoading } = useCanilla();

  const [clave, setClave] = useState('');
  const [nombre, setNombre] = useState(dataUser?.Nombre);
  const [apellido, setApellido] = useState(dataUser?.Apellido);
  const [direccion, setDireccion] = useState(dataUser?.Direccion);
  const [codPost, setCodPost] = useState(dataUser?.CodPostal);
  const [celular, setCelular] = useState(dataUser?.Celular);
  const [localidad, setLocalidad] = useState(dataUser?.Localidad);
  const [paquete, setPaquete] = useState(dataUser?.Paquete);
  

  useEffect(() => {

    setNombre('');
    setApellido('');
    setDireccion('');
    setCodPost('');
    setCelular('');

    
  }, [])
  

  const {onChange, formData } = useForm({ 

    Clave: '',
    Apellido: apellido,
    Nombre: nombre,
    Direccion: direccion,
    CodPostal: codPost,
    Celular: celular,
    Localidad: localidad || '', 
    Paquete: paquete || '', 
  });




  useEffect(() => {
    if(messageProfile.length === 0) 
    return;

    Alert.alert(
      'Error Cambios en Perfil', 
      messageProfile, 
      [{ text: 'Aceptar', onPress: removeErrorProfile}]
    );
  }, [messageProfile])



  const onSubmitHandler = () => {
      editProfile(formData, grupoCuenta);
  }

  // if( isLoading ){
  //   return(
  //     <View>
  //       <ActivityIndicator color={'green'} size={50} />
  //     </View>
  //   )
  // }
  
    
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
              onChangeText={ (value) => onChange( value, 'Clave')}
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
              onChangeText={ (value) => onChange( value, 'Apellido')}
              value={ formData?.Apellido }
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
              onChangeText={ (value) => onChange( value, 'Nombre')}
              value={ formData?.Nombre }
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
              onChangeText={ (value) => onChange( value, 'Direccion')}
              value={ formData?.Direccion }
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
              onChangeText={ (value) => onChange( value, 'CodPostal')}
              value={ formData?.CodPostal }
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
              onChangeText={ (value) => onChange( value, 'Celular')}
              value={ formData?.Celular }
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
              onChangeText={ (value) => onChange( value, 'Localidad' )}
              value={ formData?.Localidad || undefined }
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
              onChangeText={ (value) => onChange( value, 'Paquete')}
              value={ formData?.Paquete || undefined }
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
