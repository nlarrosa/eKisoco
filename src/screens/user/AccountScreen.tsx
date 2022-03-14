import React, { useState, useContext, useEffect } from 'react'
import { Text, ScrollView, View, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';


import { stylesGral } from '../../theme/generalTheme';
import { styleRegister } from '../../theme/registerTheme';
import { CustomSwitch } from '../../components/CustomSwitch';
import { styleAccount } from '../../theme/accountTheme';
import { useForm } from '../../hooks/useForm';
import { ProvinciasPicker } from '../../components/ProvinciasPicker';
import { UserContext } from '../../context/UserContext';





export const AccountScreen = () => {

  const {getAccount } = useContext(UserContext)
  const [provinciaSelected, setProvinciaSelected] = useState('');
  

  const { onChange, formData, setFormValue} = useForm({
    Dni: '',
    Cuit: '',
    Provincia: '',
    Calles: '',
    TieneReparto: false,
    EntregaSuscripcionDiario: false,
    EntregaSuscripcionRevistas: false,
    CargaDiario: false,
    CargaRevista: false,
    CargaOpcionales: false,
  });
  

  const [checkStatus, setCheckStatus] = useState({
    TieneReparto: false,
    EntregaSuscripcionDiario: false,
    EntregaSuscripcionRevistas: false,
    CargaDiario: false,
    CargaRevista: false,
    CargaOpcionales: false,
  });
  


  useEffect(() => {
      loadAccount();
  }, [])


  /** Obtiene los datos iniciales de la cuenta
   * del usuario con datos adicionales
   */
  const loadAccount = async() => {

    const userData = await AsyncStorage.getItem('userData');
    const { token, userId } = JSON.parse(userData || '{}');
    const account = await getAccount(token, userId);

    setFormValue({
      Dni: account.DNI,
      Cuit: account.CUIT,
      Provincia: account.Provincia,
      Calles: account.EntrecallesPuesto,
      TieneReparto: account.TieneReparto,
      EntregaSuscripcionDiario: account.EntregaSuscripcionDiario,
      EntregaSuscripcionRevistas: account.EntregaSuscripcionRevistas,
      CargaDiario: account.CargaDiario,
      CargaRevista: account.CargaRevista,
      CargaOpcionales: account.CargaOpcionales,
    });

    setCheckStatus({
     
        TieneReparto: account.TieneReparto, 
        EntregaSuscripcionDiario: account.EntregaSuscripcionDiario, 
        EntregaSuscripcionRevistas: account.EntregaSuscripcionRevistas,
        CargaDiario: account.CargaDiario,
        CargaRevista: account.CargaRevista,
        CargaOpcionales: account.CargaOpcionales, 
    })
  }

  const { 
    TieneReparto, 
    EntregaSuscripcionDiario, 
    EntregaSuscripcionRevistas,
    CargaDiario,
    CargaRevista,
    CargaOpcionales, 
  } = checkStatus;


  /** Metodo que maneja los estados y valores
   * devuelto por componente switch
   */
  const handlerChangeBases = (value: boolean, field: string) => {

    setCheckStatus({
      ...checkStatus,
      [field] : value,
    });
  }



  const saveAccountHandler = () => {
    console.log(checkStatus);
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
              value={ formData.Dni }
            />
          </View>
          <View style={ stylesGral.formControl }>
            <Text style={ stylesGral.glLabel }>CUIT</Text>
            <TextInput 
              style={ stylesGral.glTextInputLine}
              placeholder='Solo números'
              keyboardType='default'
              value={ formData.Cuit }
            />
          </View>

          <View style={ stylesGral.formControl }>
            <Text style={ stylesGral.glLabel }>Provincia</Text>
            <ProvinciasPicker 
              provSelected={provinciaSelected} 
              onChange={(value) => setProvinciaSelected(value)}
            />
          </View>

          <View style={ stylesGral.formControl }>
            <Text style={ stylesGral.glLabel }>Entre Calles</Text>
            <TextInput 
              style={ stylesGral.glTextInputLine}
              placeholder='Ej. Av. Rivadavia y Av. Escalada'
              keyboardType='default'
              value={ formData.Calles }
            />
          </View>
          {/* <View style={ stylesGral.formControl }>
            <Text style={ stylesGral.glLabel }>Poligono / Zona de reparto</Text>
            <TextInput 
              style={ stylesGral.glTextInputLine}
              placeholder='Ingrese hasta 10 calles'
              keyboardType='default'
            />
          </View> */}

          <View style={ styleAccount.checkContainer }>
            <TouchableOpacity>
                <Text style={ styleRegister.ckeckText }>¿Tiene Reparto?</Text>
            </TouchableOpacity>
            <CustomSwitch 
              isOn={ TieneReparto } 
              onChange={ ( value ) => handlerChangeBases(value, 'TieneReparto')} 
            />
          </View>



          {/* <View style={ styleAccount.checkContainer }>
            <TouchableOpacity>
                <Text style={ styleRegister.ckeckText }>¿Entrega suscripciones de diarios?</Text>
            </TouchableOpacity>
            <CustomSwitch 
              isOn={ EntregaSuscripcionDiario } 
              onChange={ ( value ) => handlerChangeBases(value, 'EntregaSuscripcionDiario')} 
            />
          </View>


          <View style={ styleAccount.checkContainer }>
            <TouchableOpacity>
                <Text style={ styleRegister.ckeckText }>¿Entrega suscripciones de revistas?</Text>
            </TouchableOpacity>
            <CustomSwitch 
              isOn={ EntregaSuscripcionRevistas } 
              onChange={ ( value ) => handlerChangeBases(value, 'EntregaSuscripcionRevistas')} 
            />
          </View>


          <View style={ styleAccount.checkContainer }>
            <TouchableOpacity>
                <Text style={ styleRegister.ckeckText }>¿Carga diario?</Text>
            </TouchableOpacity>
            <CustomSwitch 
              isOn={ CargaDiario } 
              onChange={ ( value ) => handlerChangeBases(value, 'CargaDiario')} 
            />
          </View>


          <View style={ styleAccount.checkContainer }>
            <TouchableOpacity>
                <Text style={ styleRegister.ckeckText }>¿Carga revista?</Text>
            </TouchableOpacity>
            <CustomSwitch 
              isOn={ CargaRevista } 
              onChange={ ( value ) => handlerChangeBases(value, 'CargaRevista')} 
              />
          </View>


          <View style={ styleAccount.checkContainer }>
            <TouchableOpacity>
                <Text style={ styleRegister.ckeckText }>¿Carga opcionales?</Text>
            </TouchableOpacity>
            <CustomSwitch 
              isOn={ CargaOpcionales } 
              onChange={ ( value ) => handlerChangeBases(value, 'CargaOpcionales')} 
            />
          </View> */}


          <Text style={ stylesGral.dividerHeader }>Horarios de Atención</Text>
          <View style={ styleRegister.registerContainer}>
              <TouchableOpacity 
                style={ stylesGral.glButton }
                onPress={saveAccountHandler}
              >
                <Text style={ stylesGral.glButtonText }>Guardar Cambios</Text>
              </TouchableOpacity>
          </View>
        </ScrollView>
    </SafeAreaView>
  )
}
