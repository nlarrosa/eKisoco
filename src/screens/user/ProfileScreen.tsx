import React, { useContext, useEffect, useState } from 'react'
import { Text, View, ScrollView, TextInput, TouchableOpacity, Alert, RefreshControl, Platform, KeyboardAvoidingView } from 'react-native';
import { Avatar } from 'react-native-elements';
import { StackScreenProps } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';


import { rootStackParams } from '../../navigator/StackNavigator';
import { styleProfile } from '../../theme/profileTheme';
import { stylesGral } from '../../theme/generalTheme';
import constColor from '../../constants/color';
import constGlobal from '../../constants/globals';
import { AuthContext } from '../../context/AuthContext';
import { useForm } from '../../hooks/useForm';
import { UserContext } from '../../context/UserContext';
import { Loading } from '../../components/Loading';
import { SafeAreaView } from 'react-native-safe-area-context';



interface Props extends StackScreenProps<rootStackParams, 'ProfileScreen'>{}

export const ProfileScreen = ({ navigation }: Props ) => {

  const { dataUser } = useContext(AuthContext);
  const { messageProfile, removeErrorProfile, editProfile, getProfile, isLoading, insigne } = useContext(UserContext);
  const [grupoCuenta, setGrupoCuenta] = useState('');
  const [opcional, setOpcional] = useState('opcional');
  const [refresh, setRefresh] = useState(false);


  const {onChange, formData, setFormValue } = useForm({ 

    Clave: '',
    Apellido: '',
    Nombre: '',
    Direccion: '',
    CodPostal: '',
    Celular: '',
    Localidad: '', 
    Paquete: '', 
  });



  useEffect(() => {
    loadProfile();
  }, [])



  const loadProfile = async() => {

    const userData = await AsyncStorage.getItem('userData');
    const { token, userId } = JSON.parse(userData || '{}');
    const profile = await getProfile(token, userId);
    setGrupoCuenta(profile.GrupoCuenta);

    (constGlobal.regionAmba === profile.GrupoCuenta) 
    ? setOpcional('*') : setOpcional('opcional');

    setFormValue({
      Clave: '',
      Apellido: profile.Apellido,
      Nombre: profile.Nombre,
      Direccion: profile.Direccion,
      CodPostal: profile.CodPostal,
      Celular: profile.Celular,
      Localidad: profile.Localidad || '', 
      Paquete: profile.Paquete || '', 
    });
  }
  
  
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


  const loadProfileToRefresh = () => {

  }

  if( isLoading ){
    return( <Loading />)
  }
  
    
  return (
    <>
      <View style={ styleProfile.headerBanner }>
          <View style={ styleProfile.avatarContent }>
            <Avatar
              size={64}
              rounded
              title = { insigne }
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

      <KeyboardAvoidingView 
        style={{ ...stylesGral.glSafeArea, flex: 1 }}
        behavior={ (Platform.OS === 'ios') ? 'padding' : 'height' }
      >
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
            <Text style={ stylesGral.glLabel }>Ingrese Paquete { opcional } </Text>
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
      </KeyboardAvoidingView>
    </>
  )
}
