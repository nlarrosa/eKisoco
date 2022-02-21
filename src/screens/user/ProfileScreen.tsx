import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Text, View, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { Avatar, Card } from 'react-native-elements';


import { styleProfile } from '../../theme/profileTheme';
import { stylesGral } from '../../theme/generalTheme';
import  constGral  from '../../constants/globals';
import { styleRegister } from '../../theme/registerTheme';
import constColor from '../../constants/color';



export const ProfileScreen = () => {
    
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
              <Text style={ styleProfile.headerNameText }>Nicolas Larrosa:</Text>
              <Text style={ styleProfile.headerTitleText }>Distribuidor:</Text>
              <Text style={ styleProfile.headerSubtitleText}>72 - Canosa Raquel Lucia</Text>
            </View>
        </View>

          
        <ScrollView style={ stylesGral.glScrollView }>
          <View style={ stylesGral.formControl }>
            <Text style={ stylesGral.glLabel }>Cambiar Clave *</Text>
            <TextInput 
              style={ stylesGral.glTextInputLine}
              keyboardType='default'
            />
          </View>
          <View style={ stylesGral.formControl }>
            <Text style={ stylesGral.glLabel }>Ingrese Apellido *</Text>
            <TextInput 
              style={ stylesGral.glTextInputLine}
              keyboardType='default'
            />
          </View>
          <View style={ stylesGral.formControl }>
            <Text style={ stylesGral.glLabel }>Ingrese Nombre *</Text>
            <TextInput 
              style={ stylesGral.glTextInputLine}
              keyboardType='default'
            />
          </View>
          <View style={ stylesGral.formControl }>
            <Text style={ stylesGral.glLabel }>Ingrese Dirección *</Text>
            <TextInput 
              style={ stylesGral.glTextInputLine}
              keyboardType='default'
            />
          </View>
          <View style={ stylesGral.formControl }>
            <Text style={ stylesGral.glLabel }>Ingrese Código Postal *</Text>
            <TextInput 
              style={ stylesGral.glTextInputLine}
              keyboardType='default'
            />
          </View>
          <View style={ stylesGral.formControl }>
            <Text style={ stylesGral.glLabel }>Ingrese Celular *</Text>
            <TextInput 
              style={ stylesGral.glTextInputLine}
              keyboardType='phone-pad'
            />
          </View>
          <View style={ stylesGral.formControl }>
            <Text style={ stylesGral.glLabel }>Ingrese Localidad *</Text>
            <TextInput 
              style={ stylesGral.glTextInputLine}
              keyboardType='default'
            />
          </View>
          <View style={ stylesGral.formControl }>
            <Text style={ stylesGral.glLabel }>Ingrese Paquete *</Text>
            <TextInput 
              style={ stylesGral.glTextInputLine}
              keyboardType='default'
            />
          </View>
          <View style={ stylesGral.glFooterContainer }>
              <TouchableOpacity style={ stylesGral.glButton }>
                <Text style={ stylesGral.glButtonText }>Guardar Cambios</Text>
              </TouchableOpacity>
          </View>
        </ScrollView>
    </SafeAreaView>
  )
}
