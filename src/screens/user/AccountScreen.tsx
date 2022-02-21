import React, { useState } from 'react'
import { Text, ScrollView, View, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


import { stylesGral } from '../../theme/generalTheme';
import { styleRegister } from '../../theme/registerTheme';
import { CustomSwitch } from '../../components/CustomSwitch';
import { styleAccount } from '../../theme/accountTheme';




export const AccountScreen = () => {

  const [basesStatus, setBasesStatus] = useState({ isActive: false });
  const { isActive } = basesStatus;

  const handlerChangeBases = (value: boolean, field: string) => {

    setBasesStatus({
      ...basesStatus,
      [field] : value,
    });
}


  return (
    
    <SafeAreaView style={ stylesGral.glSafeArea }>
        <ScrollView style={ stylesGral.glScrollView }>
          <View style={ stylesGral.formControl }>
            <Text style={ stylesGral.glLabel }>DNI</Text>
            <TextInput
              style={ stylesGral.glTextInputLine}
              placeholder='Solo números'
              keyboardType='default'
            />
          </View>
          <View style={ stylesGral.formControl }>
            <Text style={ stylesGral.glLabel }>CUIT</Text>
            <TextInput 
              style={ stylesGral.glTextInputLine}
              placeholder='Solo números'
              keyboardType='default'
            />
          </View>
          <View style={ stylesGral.formControl }>
            <Text style={ stylesGral.glLabel }>Provincia</Text>
            <TextInput 
              style={ stylesGral.glTextInputLine}
              keyboardType='default'
            />
          </View>
          <View style={ stylesGral.formControl }>
            <Text style={ stylesGral.glLabel }>Entre Calles</Text>
            <TextInput 
              style={ stylesGral.glTextInputLine}
              placeholder='Ej. Av. Rivadavia y Av. Escalada'
              keyboardType='default'
            />
          </View>
          <View style={ stylesGral.formControl }>
            <Text style={ stylesGral.glLabel }>Poligono / Zona de reparto</Text>
            <TextInput 
              style={ stylesGral.glTextInputLine}
              placeholder='Ingrese hasta 10 calles'
              keyboardType='default'
            />
          </View>

          <Text style={ stylesGral.dividerHeader }>Configuracion de Cuenta</Text>

          
            <View style={ styleAccount.checkContainer }>
              <TouchableOpacity>
                  <Text style={ styleRegister.ckeckText }>¿Tiene Reparto?</Text>
              </TouchableOpacity>
              <CustomSwitch isOn={ isActive } onChange={ ( value ) => handlerChangeBases(value, 'isActive')} />
            </View>

            <View style={ styleAccount.checkContainer }>
              <TouchableOpacity>
                  <Text style={ styleRegister.ckeckText }>¿Entrega suscripciones de diarios?</Text>
              </TouchableOpacity>
              <CustomSwitch isOn={ isActive } onChange={ ( value ) => handlerChangeBases(value, 'isActive')} />
            </View>

            <View style={ styleAccount.checkContainer }>
              <TouchableOpacity>
                  <Text style={ styleRegister.ckeckText }>¿Entrega suscripciones de revistas?</Text>
              </TouchableOpacity>
              <CustomSwitch isOn={ isActive } onChange={ ( value ) => handlerChangeBases(value, 'isActive')} />
            </View>

            <View style={ styleAccount.checkContainer }>
              <TouchableOpacity>
                  <Text style={ styleRegister.ckeckText }>¿Carga diario?</Text>
              </TouchableOpacity>
              <CustomSwitch isOn={ isActive } onChange={ ( value ) => handlerChangeBases(value, 'isActive')} />
            </View>

            <View style={ styleAccount.checkContainer }>
              <TouchableOpacity>
                  <Text style={ styleRegister.ckeckText }>¿Carga revista?</Text>
              </TouchableOpacity>
              <CustomSwitch isOn={ isActive } onChange={ ( value ) => handlerChangeBases(value, 'isActive')} />
            </View>

            <View style={ styleAccount.checkContainer }>
              <TouchableOpacity>
                  <Text style={ styleRegister.ckeckText }>¿Carga opcionales?</Text>
              </TouchableOpacity>
              <CustomSwitch isOn={ isActive } onChange={ ( value ) => handlerChangeBases(value, 'isActive')} />
            </View>

          <Text style={ stylesGral.dividerHeader }>Horarios de Atención</Text>
       
       
          <View style={ styleRegister.registerContainer}>
              <TouchableOpacity style={ stylesGral.glButton }>
                <Text style={ stylesGral.glButtonText }>Guardar Cambios</Text>
              </TouchableOpacity>
          </View>
        </ScrollView>
    </SafeAreaView>
  )
}
