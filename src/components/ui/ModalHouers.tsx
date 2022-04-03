import React, { useEffect, useState, useContext } from 'react'
import { View, Modal, Alert, Text, TouchableOpacity, TextInput } from 'react-native';
import { Icon } from 'react-native-elements';

import { stylesGral } from '../../theme/generalTheme';
import constColor from '../../constants/color';
import { UserContext } from '../../context/UserContext';


interface Props {
   status: boolean,
}


export const ModalHouers = ( { status }: Props ) => {

  const {  asignHouersDays } = useContext(UserContext);
  const [days, setDays] = useState<{ [key: string]: { desde:string, hasta:string, status:boolean, color: string, name: string} }>({});
  const [counter, setCounter] = useState<string[]>([]);
  const [modalStatus, setModalStatus] = useState<boolean>(!status);
  const [desdeCount, setDesdeCount] = useState<number>(0);
  const [hastaCount, setHastaCount] = useState<number>(0);
  const [arrDays, setArrDays] = useState<string[]>([]);


  useEffect(() => {

    setCounter([
      '00:00', '00:15', '00:30', '00:45',
      '01:00', '01:15', '01:30', '01:45',
      '02:00', '02:15', '02:30', '02:45',
      '03:00', '03:15', '03:30', '03:45',
      '04:00', '04:15', '04:30', '04:45',
      '05:00', '05:15', '05:30', '05:45',
      '06:00', '06:15', '06:30', '06:45',
      '07:00', '07:15', '07:30', '07:45',
      '08:00', '08:15', '08:30', '08:45',
      '09:00', '09:15', '09:30', '09:45',
      '10:00', '10:15', '10:30', '10:45',
      '11:00', '11:15', '11:30', '11:45',
      '12:00', '12:15', '12:30', '12:45',
      '13:00', '13:15', '13:30', '13:45',
      '14:00', '14:15', '14:30', '14:45',
      '15:00', '15:15', '15:30', '15:45',
      '16:00', '16:15', '16:30', '16:45',
      '17:00', '17:15', '17:30', '17:45',
      '18:00', '18:15', '18:30', '18:45',
      '19:00', '19:15', '19:30', '19:45',
      '20:00', '20:15', '20:30', '20:45',
      '21:00', '21:15', '21:30', '21:45',
      '22:00', '22:15', '22:30', '22:45',
      '23:00', '23:15', '23:30', '23:45',
      '24:00', '24:15', '24:30', '24:45',
    ]);

    setDays({
      'LU': { desde: '', hasta: '', status: false, color: constColor.grey, name: 'Lunes' },
      'MA': { desde: '', hasta: '', status: false, color: constColor.grey, name: 'Martes' },
      'MI': { desde: '', hasta: '', status: false, color: constColor.grey, name: 'Miercoles' },
      'JU': { desde: '', hasta: '', status: false, color: constColor.grey, name: 'Jueves' },
      'VI': { desde: '', hasta: '', status: false, color: constColor.grey, name: 'Viernes' },
      'SA': { desde: '', hasta: '', status: false, color: constColor.grey, name: 'Sabado' },
      'DO': { desde: '', hasta: '', status: false, color: constColor.grey, name: 'Domingo' },
    });

  }, []);



  /** Cambia el estado para abrir y cerrar
   * el modal
   */
  useEffect(() => {
    setModalStatus(!modalStatus);
  }, [status])
  



  /** Agrego los dias seleccionados a un array para luego
   * recorrerlos ya gregarle la hora seleccionadaTambien cambio 
   * el estado del boton seleccionado
   */
  const daysChangeHandler = (key: string, status: boolean) => {

    days[key].status = status;
    
    if(!arrDays.includes(key)){

      days[key].color = constColor.green;
      setArrDays([ ...arrDays, key ]);

    } else {

      days[key].color = constColor.grey;
      const newDays: string[] = arrDays.filter( (item) => item !== key);
      setArrDays( newDays );
    }

    setDays({ ...days });
  }



  /** Incrementa y dismiuye las  horas del contador 
   *  Se puede setar con el indice en distintas sumas
  */
  const increaseDesde = ( value: number ) => {

    const newValue =  Math.min(96, Math.max( desdeCount + value, 0 ))
    setDesdeCount( newValue ); 
    
    arrDays.map( (key) => {
      days[key].desde = '';
      days[key].desde = counter[newValue];
    });

    setDays({ ...days });
  }



  /** Incrementa y dismiuye los minu del contador 
   *  Se puede setar con el indice en distintas sumas
  */
  const increaseHasta = ( value: number ) => {

    const newValue =  Math.min(96, Math.max( hastaCount + value, 0 ))
    setHastaCount( newValue );
    
    arrDays.map( (key) => {
      days[key].hasta ='';
      days[key].hasta = counter[newValue];
    });

    setDays({ ...days });
  }



  /** Limpio todos los datos del componente una vez 
   *  que hago el guardado
   */
  const clearDaysData = () => {

      Object.entries(days).map( ([ key, day]) => {
        days[key].color = constColor.greyDark;
      });

      setDays({ ...days });
      setArrDays([]);
      setDesdeCount(0);
      setHastaCount(0);
  }



  /** Agrego los datos del los dias y horarios
   * en el context del usuario para luego poder guardarlo
   */
  const HouersChangeSave = () => {

    asignHouersDays(days);
    setModalStatus(false);
    clearDaysData();
}



  return (
    
    <View style={stylesGral.glModalCenterView}>
      <Modal
        animationType="slide"
        transparent={false}
        visible={ modalStatus }
      >
        <View style={stylesGral.glModalCenterView} >
        <View style={stylesGral.glModalView}>
        <View style={{ 
              position: 'absolute',
              top: -8,
              right: -8,
              backgroundColor: 'white',
              borderRadius: 100
            }}>
          <TouchableOpacity onPress={ () => setModalStatus(!modalStatus)}>
            <Icon 
              name='close-circle-outline'
              type='ionicon'
              color={ constColor.green}
              size={40}
            />
          </TouchableOpacity>
        </View>
        <Text style={{ fontSize: 17, fontWeight: 'bold'}}>Seleccione Dias y Horario</Text>
        <Text style={{ fontSize: 14, marginBottom: 30, paddingHorizontal: 40, textAlign: 'center'}}>Puede seleccionar uno o varios dias para colocarle el mismo horario</Text>

          {/* SELECTOR DE DIAS */}
          <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
            { Object.entries(days).map( ([ key, data ]) => (
            <TouchableOpacity key={ key } 
            onPress={ () => daysChangeHandler(key, !data.status) }
            style={{ 
              backgroundColor:  data.color ,
              width: 46,
              height: 45,
              padding: 5,
              borderRadius: 10,
              justifyContent:'center',
              marginHorizontal: 2,
            }}>
                <Text style={{
                  textAlign: 'center',
                  color: 'white',
                  fontWeight: 'bold',
                }}>
                  { key }
                </Text>
            </TouchableOpacity>
            ))}
          </View>
          {/* FIN SELECTOR DE DIAS */}


          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 40}}>
              {/* SELECTOR HORAS DESDE */}
              <View style={{ justifyContent: 'center', alignItems: 'center'}}>
                  <TouchableOpacity onPress={ () => increaseDesde( +2 ) }>
                    <Icon 
                      name='chevron-up-outline'
                      type='ionicon'
                      color={ constColor.green}
                      size={50}
                    />
                  </TouchableOpacity>
                  <TextInput 
                      style={{ 
                        fontSize: 25,
                        borderWidth: 2,
                        marginHorizontal: 25, 
                        width: 100, 
                        height: 55,
                        marginVertical: 5,
                        padding: 10,
                        borderColor: constColor.green,
                        borderRadius: 10,
                        textAlign: 'center',
                        color: '#000000',
                      }}
                      
                      value={ counter[desdeCount] }
                      editable={false}
                      placeholder='Desde'
                      keyboardType='numeric'
                  />
                  <TouchableOpacity onPress={ () => increaseDesde( -2 ) }>
                    <Icon 
                      name='chevron-down-outline'
                      type='ionicon'
                      color={ constColor.green}
                      size={50}
                    />
                  </TouchableOpacity>
              </View>
              {/* FIN SELECTOR HORAS DESDE */}

            
              <Text style={{ fontSize: 19}}> A </Text>


              {/* SELECTOR HORAS HASTA */}
              <View>
                <TouchableOpacity onPress={ () => increaseHasta( +2 ) }>
                  <Icon 
                    name='chevron-up-outline'
                    type='ionicon'
                    color={ constColor.green}
                    size={50}
                  />
                </TouchableOpacity>
                <TextInput 
                    style={{ 
                      fontSize: 25,
                      borderWidth: 2,
                      marginHorizontal: 25, 
                      width: 100, 
                      height: 55,
                      marginVertical: 5,
                      padding: 10,
                      borderColor: constColor.green,
                      borderRadius: 10,
                      textAlign: 'center',
                      color: '#000000',
                    }}
                    value={ counter[hastaCount] }
                    editable={false}
                    placeholder='Hasta'
                    keyboardType='numeric'
                />
                <TouchableOpacity onPress={ () => increaseHasta( -2 ) }>
                  <Icon 
                    name='chevron-down-outline'
                    type='ionicon'
                    color={ constColor.green}
                    size={50}
                  />
                </TouchableOpacity>
              </View>
              {/* FIN SELECTOR HORAS HASTA */}            
          </View>

          {/* BOTON GUARDAR */}  
          <View>
            <TouchableOpacity 
                onPress={ HouersChangeSave }
                style={{ 
                  backgroundColor: constColor.green, 
                  marginHorizontal: 80,
                  padding: 10,
                  borderRadius: 10,
                  height: 45,
                  width: 120,
                  marginTop: 30
                }}>
                  <Text style={{ 
                    color: 'white',
                    fontSize: 16,
                    textAlign: 'center'
                  }}>Guardar</Text>
                </TouchableOpacity>
          </View>
          {/* FIN BOTON GUARDAR */}
        </View>
      </View>
    
    </Modal>
  </View>
  )
}
