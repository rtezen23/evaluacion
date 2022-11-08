import React, { useEffect, useRef, useState, useReducer } from 'react';
import Select from 'react-select';
import './FichaEvaluacion.css';
import './FichaEvaluacion2.css';
import infoEvaluacion from "../../infoEvaluacion";
import infoFicha01Full from "../../infoFicha01Full";
import infoFicha02Full from "../../infoFicha02Full";
import infoFicha01 from "../../infoFicha01";
import infoFicha02 from "../../infoFicha02";
import audio from "../assets/audio.mp3";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { deleteRegister } from '../store/actions/registers.actions';
import { checkToken } from '../store/actions/user.actions';
import { FichaEvaluacionMonitor } from './FichaEvaluacionMonitor';

const FICHAS_URL = `${import.meta.env.VITE_API_URL}api/v1/fichas/`;
const BASE_URL = `${import.meta.env.VITE_API_URL}api/v1/base/`;
const CARTERAS_URL = `${import.meta.env.VITE_API_URL}api/v1/carteras/`;

const optionsTipoLlamada = [
  { label: 'Monitoreo Calidad', value: 'Monitoreo Calidad'},
  { label: 'Monitoreo Operaciones', value: 'Monitoreo Operaciones'},
  { label: 'Monitoreo Formación', value: 'Monitoreo Formación'},
  { label: 'No evaluable', value: 'No evaluable'},
]

const optionsTipoGestion = [
  { label: 'Preventiva', value: 'Preventiva'},
  { label: 'Sin compromiso', value: 'Sin compromiso'},
  { label: 'Promesa de pago - Negativa', value: 'Promesa de pago - Negativa'},
  { label: 'Promesa de pago - Predispuesto', value: 'Promesa de pago - Predispuesto'}
]

const optionsMotivoNoPago = [
  { label: 'No aplica - Cliente predispuesto', value: 'No aplica - Cliente predispuesto'},
  { label: 'Asesor no indaga motivo', value: 'Asesor no indaga motivo'},
  { label: 'No cuenta con trabajo', value: 'No cuenta con trabajo'},
  { label: 'Negocio genera poco ingreso', value: 'Negocio genera poco ingreso'},
  { label: 'Negocio quebró', value: 'Negocio quebró'},
  { label: 'Internado por salud', value: 'Internado por salud'},
  { label: 'Se encuentra mal de salud', value: 'Se encuentra mal de salud'},
  { label: 'Gastos por salud familiar', value: 'Gastos por salud familiar'},
  { label: 'Gastos por salud', value: 'Gastos por salud'},
  { label: 'Está de viaje', value: 'Está de viaje'},
  { label: 'Retraso pago de haberes', value: 'Retraso pago de haberes'},
  { label: 'Vive zona alejada-rural', value: 'Vive zona alejada-rural'},
  { label: 'No tiene tiempo', value: 'No tiene tiempo'},
  { label: 'Cuenta con Covid-19', value: 'Cuenta con Covid-19'},
  { label: 'Reducción de ingresos', value: 'Reducción de ingresos'},
  { label: 'Paro tranportistas', value: 'Paro tranportistas'},
  { label: 'Desea reprogramar', value: 'Desea reprogramar'},
  { label: 'Desea refinanciar', value: 'Desea refinanciar'},
  { label: 'Gastos escolares', value: 'Gastos escolares'},
  { label: 'Ha cancelado deuda otra entidad financiera', value: 'Ha cancelado deuda otra entidad financiera'},
  { label: 'Cuenta con reclamo', value: 'Cuenta con reclamo'},
  { label: 'Generará reclamo', value: 'Generará reclamo'},
  { label: 'No reconoce deuda', value: 'No reconoce deuda'},
  { label: 'Inconforme con monto de la deuda', value: 'Inconforme con monto de la deuda'},
  { label: 'Responsable del pago es un tercero', value: 'Responsable del pago es un tercero'},
  { label: 'Se acercará a tienda/oficina', value: 'Se acercará a tienda/oficina'},
  { label: 'Espera de pagos de haberes', value: 'Espera de pagos de haberes'},
  { label: 'No tiene acceso agencia / agente', value: 'No tiene acceso agencia / agente'},
  { label: 'No tiene acceso app / banca por internet', value: 'No tiene acceso app / banca por internet'},
  { label: 'Olvidó fecha de pago', value: 'Olvidó fecha de pago'},
  { label: 'A a espera de préstamo/dinero', value: 'A a espera de préstamo/dinero'},
  { label: 'No quiere indicar motivo', value: 'No quiere indicar motivo'},
  { label: 'Robo / Hurto', value: 'Robo / Hurto'},
  { label: 'Ya conversó con su analista', value: 'Ya conversó con su analista'},
  { label: 'Otros', value: 'Otros'},

]

const optionsMotivoAlerta = [
  { label: 'Llamada entrecortada - cliente lo nota', value: 'Llamada entrecortada - cliente lo nota'},
  { label: 'Llamada entrecortada - grabación', value: 'Llamada entrecortada - grabación'},
  { label: 'PDP falsa', value: 'PDP falsa'},
  { label: 'Reincidencia error reforzado', value: 'Reincidencia error reforzado'},
  { label: 'No cumple secreto bancario', value: 'No cumple secreto bancario'},
  { label: 'Fraude en gestión', value: 'Fraude en gestión'},
  { label: 'Otros', value: 'Otros'},
]

const optionsResponsableNoFCR = [
  { label: 'Asesor', value: 'Asesor'},
  { label: 'Cliente', value: 'Cliente'},
  { label: 'SI_FCR', value: 'SI_FCR'},
]

// const optionsMotivoNoFCR = [
//   { label: 'No rebate las veces establecidas (insistencia)', value: 'No rebate las veces establecidas (insistencia)' },
//   { label: 'No rebate objeciones', value: 'No rebate objeciones' },
//   { label: 'No exige el pago (urgencia)', value: 'No exige el pago (urgencia)' },
//   { label: 'No exige el pago de manera correcta', value: 'No exige el pago de manera correcta' },
//   { label: 'No concientiza al cliente', value: 'No concientiza al cliente' },
//   { label: 'As - corta llamada', value: 'As - corta llamada' },
//   { label: 'Cliente corta llamada', value: 'Cliente corta llamada' },
//   { label: 'Asesor realiza gestión correcta', value: 'Asesor realiza gestión correcta' },
//   { label: 'Cliente predispuesto', value: 'Cliente predispuesto' },
//   { label: 'Asesor logra pdp correctamente', value: 'Asesor logra pdp correctamente' },
// ]

const optionsMotivoNoFCR = {
  'Asesor': [
      { label: 'No rebate las veces establecidas (insistencia)', value: 'No rebate las veces establecidas (insistencia)' },
      { label: 'No rebate objeciones', value: 'No rebate objeciones' },
      { label: 'No exige el pago (urgencia)', value: 'No exige el pago (urgencia)' },
      { label: 'No exige el pago de manera correcta', value: 'No exige el pago de manera correcta' },
      { label: 'No concientiza al cliente', value: 'No concientiza al cliente' },
      { label: 'As - corta llamada', value: 'As - corta llamada' },
  ],
  'Cliente': [
    { label: 'Cliente corta llamada', value: 'Cliente corta llamada' },
    { label: 'Asesor realiza gestión correcta', value: 'Asesor realiza gestión correcta' },
  ],
  'SI_FCR': [
    { label: 'Cliente predispuesto', value: 'Cliente predispuesto' },
    { label: 'Asesor logra pdp correctamente', value: 'Asesor logra pdp correctamente' },
  ]
}


export const FichaEvaluacion = () => {

  const [tab, setTab] = useState('apertura')

  const isAuth = useSelector(state => state.user.isAuth);
  const registers = useSelector(state => state.registers.registers);
  const user = useSelector(state => state.user.user);
  const navigate =  useNavigate();

  //CRONOMETRO
	const [segundos, setSegundos] = useState(0);
	const [minutos, setMinutos] = useState(0);
	const [assigned, setAssigned] = useState([]);
  const [porcentaje, setPorcentaje] = useState(0)
  const [infoFicha, setInfoFicha] = useState([]);

  const dispatch = useDispatch();
//  APERTURA
  const [aperturaState, setAperturaState] = useState({})

  const [aperturaState11, setAperturaState11] = useState([])
  const [selectedAperturaState11, setSelectedAperturaState11] = useState('')

  const [aperturaState12, setAperturaState12] = useState([])
  const [selectedAperturaState12, setSelectedAperturaState12] = useState('')

  const [aperturaState13, setAperturaState13] = useState([])
  const [selectedAperturaState13, setSelectedAperturaState13] = useState('')

  const [aperturaPesoTotal, setAperturaPesoTotal] = useState([]);
  const [selectedAperturaPesoTotal, setSelectedAperturaPesoTotal] = useState('')

// INDAGACION
  const [indagacionState, setIndagacionState] = useState({})

  const [indagacionState21, setIndagacionState21] = useState([])
  const [selectedIndagacionState21, setSelectedIndagacionState21] = useState('')

  const [indagacionState22, setIndagacionState22] = useState([])
  const [selectedIndagacionState22, setSelectedIndagacionState22] = useState('')

  const [indagacionState23, setIndagacionState23] = useState([])
  const [selectedIndagacionState23, setSelectedIndagacionState23] = useState('')

  const [indagacionPesoTotal, setIndagacionPesoTotal] = useState([]);
  
// MANEJO
  const [manejoState, setManejoState] = useState({})
  const [manejoState31, setManejoState31] = useState([])
  const [selectedManejoState31, setSelectedManejoState31] = useState('')

  const [manejoState32, setManejoState32] = useState([])
  const [selectedManejoState32, setSelectedManejoState32] = useState('')

  const [manejoPesoTotal, setManejoPesoTotal] = useState([]);
  const [selectedManejoPesoTotal, setSelectedManejoPesoTotal] = useState('');

// CIERRE
  const [cierreState, setCierreState] = useState({})
  const [cierreState41, setCierreState41] = useState([])
  const [selectedCierreState41, setSelectedCierreState41] = useState('')

  const [cierreState42, setCierreState42] = useState([])
  const [selectedCierreState42, setSelectedCierreState42] = useState('')

  const [cierrePesoTotal, setCierrePesoTotal] = useState([]);
  
// HABILIDADES
  const [habilidadesState, setHabilidadesState] = useState({})
  const [habilidadesState51, setHabilidadesState51] = useState([])
  const [selectedHabilidadesState51, setSelectedHabilidadesState51] = useState('')

  const [habilidadesState52, setHabilidadesState52] = useState([])
  const [selectedHabilidadesState52, setSelectedHabilidadesState52] = useState('')

  const [habilidadesState53, setHabilidadesState53] = useState([])
  const [selectedHabilidadesState53, setSelectedHabilidadesState53] = useState('')

  const [habilidadesPesoTotal, setHabilidadesPesoTotal] = useState([]);
  
// HERRAMIENTAS
  const [herramientasState, setHerramientasState] = useState({})
  const [herramientasState61, setHerramientasState61] = useState([])
  const [selectedHerramientasState61, setSelectedHerramientasState61] = useState('')

  const [herramientasState62, setHerramientasState62] = useState([])
  const [selectedHerramientasState62, setSelectedHerramientasState62] = useState('')

  const [herramientasPesoTotal, setHerramientasPesoTotal] = useState([]);


  // useRefs
  const aperturaState11Ref = useRef();
  const aperturaState12Ref = useRef();
  const aperturaState13Ref = useRef();
  const indagacionState21Ref = useRef();
  const indagacionState22Ref = useRef();
  const indagacionState23Ref = useRef();
  const manejoState31Ref = useRef();
  const manejoState32Ref = useRef();
  const cierreState41Ref = useRef();
  const cierreState42Ref = useRef();
  const habilidadesState51Ref = useRef();
  const habilidadesState52Ref = useRef();
  const habilidadesState53Ref = useRef();
  const herramientasState61Ref = useRef();
  const herramientasState62Ref = useRef();
  
  const tipoLlamadaRef = useRef();
  const tipoGestionRef = useRef();
  const motivoNoPagoRef = useRef();
  const motivoAlertaRef = useRef();
  const responsableNoFcrRef = useRef();
  const motivoNoFcrRef = useRef();

  const [ fichaDatos, setFichaDatos ] = useState ({
        id_evaluacion: '',
        cartera: '', 
        tramo: '',
        user_agente: '',
        agente: '',
        mes_llamada: '',
        fecha_llamada: '',
        semana_llamada: '',
        telefono: '',
        dni_cliente: '',
        cuenta_cliente: '',
        resultado: '',
        hora_llamada: '',
        tmo_segundos: 0,
        tipo_llamada: '',
        tipo_gestion: '',
        perfil_cliente: '',
        alerta: false,
        descripcion_alerta: '',
        motivo_no_pago: '',
        responsabilidad_no_fcr: '',
        motivo_no_fcr: '',
        fecha_monitoreo: '',
        nombre_monitor: '',
        rol: '',
        hora_inicio: '',
        hora_fin: '',
        duracion_monitoreo: '',
        saludo_11: '',
        contactar_con_persona_12: '',
        identificacion_gestor_13: '',
        brindar_informacion_21: '',
        indagar_motivo_no_pago_22: '',
        asesorar_23: '',
        mantiene_sentido_urgencia_31: '',
        perseverancia_objetivo_32: '',
        reafirmar_acuerdos_41: '',
        despedida_cliente_42: '',
        escucha_activa_51: '',
        comunicacion_cliente_52: '',
        amabilidad_cliente_53: '',
        uso_herramientas_61: '',
        registro_gestiones_62: '',
        calificacion_final: '',
        observaciones: '',
        supervisor: '',
        tramo_estandar: '',
        tipo_ficha: '',
  })

  // state => arreglo de todos los options que hay en un select
  // const setNewPesos = (e, state, setState, total_peso, set_total_peso, allObjects) => {
  //   // Restar % actual al % total
  //   const cumpleItem = state.find(item => item.nombre === 'Sí cumple');
  //   // set_total_peso(prevState => prevState - cumpleItem.peso)
  //   const newPesoReferencia = total_peso - cumpleItem.peso;
  //   allObjects.forEach(setState => {
  //     setState(prevState => {
  //       return prevState.map(item => {
  //         return {...item, peso_percent: Math.round(((item.peso * 100 / newPesoReferencia) + Number.EPSILON) * 100) / 100}
  //       })
  //     });
  //     setState(prevState => {
  //       return prevState.map(item => {
  //         return {...item, peso: Math.round(((total_peso * item.peso_percent / 100) + Number.EPSILON) * 100) / 100}
  //       })
  //     });
  //   })
  // }
  // const handleTotalPorcentaje = (e, state, setState, total_peso, set_total_peso, setObjects, ref) => {
  //   setApertura01(JSON.parse(e.target.value).nombre)
  //   // handleSelectOption(e, ref)
  //   // if (e.value.nombre === 'No aplica') {
  //   //   setNewPesos(e, state, setState, total_peso, set_total_peso, setObjects);
  //   // }
  //   handleSelectOption(e, ref)
  //   if (e.target.value.nombre === 'No aplica') {
  //     setNewPesos(e, state, setState, total_peso, set_total_peso, setObjects);
  //   }
  //   // Recorremos en array de objetos para restar la cantidad si habia un elemento seleccionado antes
  //   state.forEach(item => {
  //     if (item.isSelected) {
  //       // const pesoDecimal = total_peso * item.peso_percent / 100;
  //       // const peso = Math.round(pesoDecimal);
  //       setPorcentaje( prevPorcentaje => prevPorcentaje - item.peso);
  //     }
  //   })

  //   // Recorremos el arreglo de objetos para asignar el nuevo elemento seleccionado dependiendo de la opcion elegida
  //   // setState(prevState => prevState.map(item => {return{...item, isSelected: item.nombre === e.value.nombre}}));
  //   setState(prevState => prevState.map(item => {return{...item, isSelected: item.nombre === (JSON.parse(e.target.value)).nombre}}));

  //   // Sumamos la cantidad correspondiente del elemento seleccionado al % total
  //   // setPorcentaje( prevPorcentaje => {
  //   //   const pesoDecimal = total_peso * e.value.peso_percent / 100;
  //   //   const peso = Math.round(pesoDecimal);
  //   //   return prevPorcentaje +  e.value.peso
  //   // })
  //   setPorcentaje( prevPorcentaje => prevPorcentaje +  (JSON.parse(e.target.value)).peso)
  // }

  // const handleSelectOption = (data) => {
  //   const newValue = JSON.parse(data.target.value)
  //   setFichaDatos(prevFichaDatos => {
  //     return {
  //         ...prevFichaDatos,
  //         // [ref.current.props.name]: data.label,
  //         [data.target.name]: newValue.nombre,
  //     }
  // })
  // }

  const setNewPesos = (e, state, setState, total_peso, set_total_peso, allObjects, parentObject) => {
    // Restar % actual al % total
    const cumpleItem = state.find(item => item.nombre === 'Sí cumple');
    // set_total_peso(prevState => prevState - cumpleItem.peso)
    // substracting peso to porcentaje if there is a 'Sí cumple' option selected
    for (const key in parentObject) {
      console.log('adding old peso')
        parentObject[key].forEach(item => {
          if (item.isSelected && item.nombre === 'Sí cumple') {
            console.log(item)
            setPorcentaje( prevPorcentaje => prevPorcentaje - item.peso);
          }
        })
    }
    
    // Substracting peso from current total_peso to get new values
    const newPesoReferencia = total_peso - cumpleItem.peso;
    // Setting new peso and  peso_percent
    for (let i = 0; i < allObjects.length; i++) {
      console.log('updating peso_percent')
      allObjects[i](prevState => {
        return prevState.map(item => {
          return {...item, peso_percent: Math.round(((item.peso * 100 / newPesoReferencia) + Number.EPSILON) * 100) / 100}
        })
      })
    }
    for (let i = 0; i < allObjects.length; i++) {
      console.log('updating peso')
      allObjects[i](prevState => {
        return prevState.map(item => {
          return {...item, peso: Math.round(((total_peso * item.peso_percent / 100) + Number.EPSILON) * 100) / 100}
        })
      })
    }
    

    // allObjects.forEach(setState => {
    //   setState(prevState => {
    //     return prevState.map(item => {
    //       return {...item, peso_percent: Math.round(((item.peso * 100 / newPesoReferencia) + Number.EPSILON) * 100) / 100}
    //     })
    //   });
    //   setState(prevState => {
    //     return prevState.map(item => {
    //       return {...item, peso: Math.round(((total_peso * item.peso_percent / 100) + Number.EPSILON) * 100) / 100}
    //     })
    //   });
    // })

    // adding new peso to porcentaje if there is a 'Sí cumple' option selected
    for (const key in parentObject) {
      console.log('adding new peso')
      parentObject[key].forEach(item => {
        if (item.isSelected && item.nombre === 'Sí cumple') {
          console.log(item)
          setPorcentaje( prevPorcentaje => prevPorcentaje + item.peso);
        }
      })
    }

  }

  const handleTotalPorcentaje = (e, state, setState, total_peso, set_total_peso, setObjects, ref, setSelected, parentObject) => {
    console.log(parentObject)
    setSelected(e)
    handleSelectOption(e, ref)
    if (e.value.nombre === 'No aplica') {
      console.log('si')
      setNewPesos(e, state, setState, total_peso, set_total_peso, setObjects, parentObject);
    }
    else {
      console.log('otro')
      // Recorremos en array de objetos para restar la cantidad si habia un elemento seleccionado antes
      state.forEach(item => {
        if (item.isSelected) {
          // const pesoDecimal = total_peso * item.peso_percent / 100;
          // const peso = Math.round(pesoDecimal);
          setPorcentaje( prevPorcentaje => prevPorcentaje - item.peso);
        }
      })
      // Sumamos la cantidad correspondiente del elemento seleccionado al % total
      // setPorcentaje( prevPorcentaje => {
      //   const pesoDecimal = total_peso * e.value.peso_percent / 100;
      //   const peso = Math.round(pesoDecimal);
      //   return prevPorcentaje +  e.value.peso
      // })
      setPorcentaje( prevPorcentaje => prevPorcentaje +  e.value.peso)
    }

    // Recorremos el arreglo de objetos para asignar el nuevo elemento seleccionado dependiendo de la opcion elegida
    setState(prevState => prevState.map(item => {return{...item, isSelected: item.nombre === e.value.nombre}}));

  }

  const handleSelectOption = (data, ref) => {
    setFichaDatos(prevFichaDatos => {
      return {
          ...prevFichaDatos,
          [ref.current.props.name]: data.label,
      }
  })
  }
  const handleCheckboxOption = (e) => {
    setShowMotivoAlerta(e.target.checked);
    setFichaDatos(prevFichaDatos => {
      return {
          ...prevFichaDatos,
          [e.target.name]: e.target.checked
      }
  })
  }
  // handle select options
  // const setInfoData = () => {
  //   setAperturaState(infoFichaNew[0]);
  //   setAperturaState11(infoFicha.apertura?.apertura11);
  //   setAperturaState12(infoFicha.apertura?.apertura12);
  //   setAperturaState12(infoFicha.apertura?.apertura12);
  //   setAperturaState13(infoFicha.apertura?.apertura13);
  //   setAperturaState13(infoFicha.apertura?.apertura13);
  //   setAperturaPesoTotal(infoFicha.apertura?.total_peso);
  //   setAperturaPesoTotal(infoFicha.apertura?.total_peso);
  //   setIndagacionState21(infoFicha.indagacion?.indagacion21);
  //   setIndagacionState22(infoFicha.indagacion?.indagacion22);
  //   setIndagacionState23(infoFicha.indagacion?.indagacion23);
  //   setIndagacionPesoTotal(infoFicha.indagacion?.total_peso);
  //   setManejoState31(infoFicha.manejo?.manejo31);
  //   setManejoState32(infoFicha.manejo?.manejo32);
  //   setManejoPesoTotal(infoFicha.manejo?.total_peso);
  //   setCierreState41(infoFicha.cierre?.cierre41);
  //   setCierreState42(infoFicha.cierre?.cierre42);
  //   setCierrePesoTotal(infoFicha.cierre?.total_peso);
  //   setHabilidadesState51(infoFicha.habilidades?.habilidades51);
  //   setHabilidadesState52(infoFicha.habilidades?.habilidades52);
  //   setHabilidadesState53(infoFicha.habilidades?.habilidades53);
  //   setHabilidadesPesoTotal(infoFicha.habilidades?.total_peso);
  //   setHerramientasState61(infoFicha.herramientas?.herramientas61);
  //   setHerramientasState62(infoFicha.herramientas?.herramientas62);
  //   setHerramientasPesoTotal(infoFicha.herramientas?.total_peso);
  // }
  const setInfoData = () => {
    setAperturaState(infoFicha[0]);
    setIndagacionState(infoFicha[1]);
    setManejoState(infoFicha[2]);
    setCierreState(infoFicha[3]);
    setHabilidadesState(infoFicha[4]);
    setHerramientasState(infoFicha[5]);
  }

  const [ datosBase, setDatosBase ] = useState([]);
  const [ infoCartera, setInfoCartera ] = useState({
    idcartera: '',
    tramo: '',
    cartera: ''
  });

  // const [ignored, forceUpdate] = useReducer(x => x + 1, 0);
  const [startTime, setStartTime] = useState('')
  // const [endTime, setEndTime] = useState('')
  // const today = new Date();
  useEffect(() => {
   
		if (!isAuth) dispatch(checkToken());
if (!user) return

    setStartTime(new Date());
    //IMPORTACION DE TODA LA BASE (unnecesary)
    // axios.get(BASE_URL)
  //   .then(res => {
  //     // REGISTROS TOTALES DE LA IMPORTACION
  //     // setInfoFicha(prevInfoFicha => {return { ...prevInfoFicha, ficha}});
  //     setDatosBase(res.data.base);

  //     // REGISTROS DE LA IMPORTACION QUE CORRESPONDEN AL ASESOR
  //     axios.get(BASE_URL+user?.usuario)
  //     .then(res2 => {
  //       console.log(res2.data.userBase)
  //       setAssigned(res2.data.userBase);
  //       setInfoFicha(res2.data.userBase?.FICHA === '1' ? infoFicha01 : infoFicha02);
  //       axios.get(`${CARTERAS_URL}${res2.data.userBase?.CARTERA}`)
  //         .then(res3 => {
  //           // setDatosCarteras(res3.data.carteraFound);
  //           // handleCarteras(res.data.carteras);
  //           setInfoCartera(res3.data.carteraFound);
  //         })
  //         .catch(err => console.log(err))
  //       // ASIGNAR OPCIONES A LOS SELECT POR LA FICHA 
  //       setInfoData();
  //     })
  //   .catch(err => console.log(err))
  // })
  // .catch(err => console.log(err))

    // REGISTROS DE LA IMPORTACION QUE CORRESPONDEN AL ASESOR
    axios.get(BASE_URL+user?.usuario)
    .then(res2 => {
      if (!res2.data.userBase) {
        alert('No cuenta con fichas actualmente');
        if (user.cargo === 'admin') {
          navigate('/table');
        }
        return
      }
      setAssigned(res2.data.userBase);
      setInfoFicha(res2.data.userBase.FICHA === '1' ? infoFicha01 : infoFicha02);
      axios.get(`${CARTERAS_URL}${res2.data.userBase.CARTERA}`)
        .then(res3 => {
          // setDatosCarteras(res3.data.carteraFound);
          // handleCarteras(res.data.carteras);
          setInfoCartera(res3.data.carteraFound);
        })
        .catch(err => console.log(err))
      // ASIGNAR OPCIONES A LOS SELECT POR LA FICHA 
      
    })
  .catch(err => {
    console.log(err)
    
  })
	}, [isAuth, dispatch, user]);

        // let timer;
        // useEffect(()=> {
        //     timer = setInterval(() => {
        //       setSegundos(prevSegundos => prevSegundos + 1);
        
        //       if (segundos === 59) {
        //         setMinutos(prevMinutos => prevMinutos + 1);
        //         setSegundos(0);
        //       }
        //     }, 1000);
        
        //     return () => clearInterval(timer)
        // })
  
  useEffect(()=>{
    setInfoData()
  },[infoFicha])

  useEffect(()=>{
    porcentaje
  },[aperturaState])

  const handleCancel = () => {
    window.location.reload();
    clearInterval(timer)
  }
  const [ tramoSegundos, setTramoSegundos ] = useState(0);
  const handleSubmit = (e) => {
    e.preventDefault();
    const endTime = new Date();

    let difference = endTime.getTime() - startTime.getTime();

    difference = difference / 1000;
    let hourDifference = Math.floor(difference / 3600);
    difference -= hourDifference * 3600;
    let minuteDifference = Math.floor(difference / 60);
    difference -= minuteDifference * 60;
    const seconds = Math.ceil((difference % 60000) / 1000);
    

    // SETTING OTHER VALUES
    fichaDatos.calificacion_final = porcentaje;
    fichaDatos.id_evaluacion = assigned?.id;
    fichaDatos.cartera = infoCartera?.cartera;
    fichaDatos.tramo = infoCartera?.tramo;
    fichaDatos.agente = assigned.ASESOR;
    fichaDatos.fecha_llamada = assigned?.FECHAGEST;
    fichaDatos.telefono = assigned.ID_CONT;
    fichaDatos.dni_cliente = assigned.IDENTIFICADOR;
    fichaDatos.tmo_segundos = tramoSegundos;
    fichaDatos.fecha_monitoreo = new Date().toLocaleString('es-PE');
    fichaDatos.supervisor= user.nombres;
    fichaDatos.rol= user.cargo;
    fichaDatos.alerta = fichaDatos.alerta ? 'SI' : 'NO'
    fichaDatos.hora_inicio = startTime.getHours() + ":" + `${startTime.getMinutes().toString().length===1 ? `0${startTime.getMinutes()}` : startTime.getMinutes()}` + ":" + `${startTime.getSeconds().toString().length===1 ? `0${startTime.getSeconds()}` : startTime.getSeconds()}`;
    fichaDatos.hora_fin = endTime.getHours() + ":" + `${endTime.getMinutes().toString().length===1 ? `0${endTime.getMinutes()}` : endTime.getMinutes()}` + ":" + `${endTime.getSeconds().toString().length===1 ? `0${endTime.getSeconds()}` : endTime.getSeconds()}`;
    fichaDatos.duracion_monitoreo = (minuteDifference * 60) + Math.round(difference);
    // fichaDatos.duracion_monitoreo = minutos * 60 +  segundos + 1;

    axios.post(FICHAS_URL, fichaDatos)
    .then(res => {
      dispatch(deleteRegister(assigned?.id));
        alert('Ficha agregada, procediendo a la siguiente');
        window.location.reload();
    })
    .catch(err => console.log(err))
  }
  // audio
  const [audioFile, setAudioFile] = useState('')
  const audioRef = useRef(null);
  const handleAudio = e => {
    setAudioFile(URL.createObjectURL(e.target.files[0]));
  }

  //  reset input value, not working
  // const resetAudioInput = () => {
  //   audioRef.current.value = null;
  // };
  
  // SELECTS 
  const [showMotivoAlerta, setShowMotivoAlerta] = useState(false)

  //TRYING NEW METHOD

  const setPesos = (event, elementName, parentState, setParentState) => {
    // Restar % actual al % total
    const cumpleItem = parentState[elementName].find(item => item.nombre === 'Sí cumple');
    // set_total_peso(prevState => prevState - cumpleItem.peso)
    // substracting peso to porcentaje if there is a 'Sí cumple' option selected
    
    // Substracting peso from current total_peso to get new values
    const newPesoReferencia = parentState.total_peso - cumpleItem.peso;
    // Setting new peso and  peso_percent

    for (const key in parentState) {
      if ( key !== elementName && key !== 'total_peso' ) {
        parentState[key].forEach(item => {
          if (item.isSelected && item.nombre === 'Sí cumple') {
            setPorcentaje( prevPorcentaje => prevPorcentaje - item.peso);
          }
        })

        setParentState( prevParentState => {
          return (
            {...prevParentState,
            [key]: parentState[key].map(item => {
              const pesoPercent = Math.round(((item.peso * 100 / newPesoReferencia) + Number.EPSILON) * 100) / 100;
              return {
                ...item,
                peso: Math.round(((parentState.total_peso * pesoPercent / 100) + Number.EPSILON) * 100) / 100,
                peso_percent: pesoPercent,
              }
            })
          }
          )
        } )

        setParentState( prevParentState => {
          prevParentState[key].forEach(item => {
            console.log('agregando peso')
            if (item.isSelected && item.nombre === 'Sí cumple') {
              setPorcentaje( prevPorcentaje => prevPorcentaje + item.peso);
            }
          })
          return prevParentState;
        } )
      }
    }
    
    // adding new peso to porcentaje if there is a 'Sí cumple' option selected
    
  

    // for (const key in parentState) {
    //   if ( key !== elementName && key !== 'total_peso' ) {
    //     parentState[key].forEach(item => {
    //       console.log(item)
    //       if (item.isSelected && item.nombre === 'Sí cumple') {
    //         console.log('si es')
    //         setPorcentaje( prevPorcentaje => prevPorcentaje + item.peso);
    //       }
    //     })
    //   }
    // }

  }

  const handlePorcentaje = ( event, elementName, parentState, setParentState, elementRef, elementSetSelected ) => {
    elementSetSelected(event)
    handleSelectOption(event, elementRef)
    if (event.value.nombre === 'No aplica') {
      setPesos(event, elementName, parentState, setParentState);
    }
    else {
      parentState[elementName].forEach(item => {
        if (item.isSelected) {
          setPorcentaje( prevPorcentaje => prevPorcentaje - item.peso);
        }
      })
      setPorcentaje( prevPorcentaje => prevPorcentaje +  event.value.peso)
    }
    setParentState(prevState => {
      return(
        {
          ...prevState,
          [elementName]: prevState[elementName].map(item => {return{...item, isSelected: item.nombre === event.value.nombre}})
        }
      )
    });

  }
  
  return (
    <section className='ficha-evaluacion'>
      
      <form className='ficha-evaluacion__form' onSubmit={handleSubmit}>
        {
          !user ? <p>Cargando...</p>
          : <div className='ficha-modelo__01-main'>
          <h2 className='ficha-modelo__01-main__title'>EVALUACIÓN FICHA {assigned?.FICHA}</h2>
          <p className='ficha-modelo__01-main__time'>
                {/* {horas < 10 ? '0' + horas : horas}: */}
                {minutos < 10 ? '0' + minutos : minutos}:
                {segundos < 10 ? '0' + segundos : segundos}
          </p>

          <hr />
        <div className='ficha-modelo__01'>

          <h5 className='gray'>CARTERA</h5>
          <p className='gray'>{infoCartera.cartera}</p>
          <span className='gray'>{infoCartera.tramo}</span>

          <h5>ID GESTION</h5>
          <p className='span-2'>{assigned?.id}</p>

          <h5 className='gray'>AGENTE</h5>
          <p className='span-2 gray'>{assigned?.ASESOR}</p>

          <h5>CLIENTE</h5>
          <p className='span-2'>{assigned?.IDENTIFICADOR}</p>

          <h5 className='gray'>TIPIFICACIÓN</h5>
          <p className='span-2 gray'>{assigned?.EFECTO}</p>

          <h5 className='gray'>TMO</h5>
          <div className='gray span-2'>
            <input type="number" value={tramoSegundos} onChange={e => setTramoSegundos(e.target.value)} className='tmo-input' placeholder='tmo manual (segundos)'/>
          </div>

          <h5>FECHA / TELÉFONO</h5>
          <p>{assigned?.FECHAGEST}</p>
          <p>{assigned?.ID_CONT}</p>

            <h5 className='gray'>Tipo de Llamada</h5>
            <Select name='tipo_llamada' ref={tipoLlamadaRef} className='gray' options={optionsTipoLlamada} onChange={e => handleSelectOption(e, tipoLlamadaRef)}/>
          <div className='tipo-gestion gray'>
            <h5>Tipo de Gestión</h5>
            <Select name='tipo_gestion' ref={tipoGestionRef} className='tipo-gestion__select' options={optionsTipoGestion} onChange={e => handleSelectOption(e, tipoGestionRef)}/>
          </div>

          <h5 className='gray'>Motivo no pago</h5>
          <Select name='motivo_no_pago' ref={motivoNoPagoRef} className='span-2 tipo-gestion__select' options={optionsMotivoNoPago} onChange={e => handleSelectOption(e, motivoNoPagoRef)}/>

          <h5>ALERTA</h5>
          <div>
              <input className='interferencia-checkbox' type="checkbox" name="alerta" onChange={handleCheckboxOption} checked={fichaDatos.alerta}/>
          </div>
          <div>
            {
              showMotivoAlerta && (
                <>
                <h5>Motivo Alerta</h5>
                <Select name='descripcion_alerta' ref={motivoAlertaRef} options={optionsMotivoAlerta} onChange={e => handleSelectOption(e, motivoAlertaRef)}/>
                </>
              )
            }
          </div>
            {
              !showMotivoAlerta && <>
                <h5>Responsable no FCR</h5>
                <div>
                  <Select name='responsabilidad_no_fcr' ref={responsableNoFcrRef} options={optionsResponsableNoFCR} onChange={e => handleSelectOption(e, responsableNoFcrRef)}/>
                </div>
                <div>
                  <h5>Motivo no FCR</h5>
                  <Select name='motivo_no_fcr' ref={motivoNoFcrRef} options={optionsMotivoNoFCR[fichaDatos.responsabilidad_no_fcr]} onChange={e => handleSelectOption(e, motivoNoFcrRef)}/>
                </div>
              </>
            }

          <h5 className='gray'>CALIFICACION</h5>
          <p className='span-2 calificacion-p gray'>{porcentaje}%</p>

          <h5>AUDIO</h5>
          <div>
            <audio controls>
              {
                audioFile && <source src={audioFile} type="audio/ogg"/>
              }
            </audio>
          </div>
          <div>
            <label htmlFor="base" className='gray ficha-modelo__01-btn'>Seleccionar</label>
            <input type="file" name="base" id="base" onChange={handleAudio} ref={audioRef}/>
          </div>
        </div>
        </div>
        }
    

  <div className='ficha-modelo__02-main'>
    {/* <button type='button' className='button-30' onClick={()=>forceUpdate()}>Asignar opciones</button> */}
    <button type='submit' className='ficha-modelo__01-btn ficha-modelo__02-btn'>Guardar y continuar</button>
    <hr />
  <div className='ficha-modelo__02'>
    <ul className='ficha-modelo__02-tabs'>
      <li onClick={()=>setTab('apertura')} className={`${tab === 'apertura' ? 'tab-selected' : ''} apertura`}>
        Apertura
      </li>
      <li onClick={()=>setTab('indagacion')} className={tab === 'indagacion' ? 'tab-selected' : ''}>
        Indagación y asesoramiento
      </li>
      <li onClick={()=>setTab('manejo')} className={tab === 'manejo' ? 'tab-selected' : ''}>
        Manejo de llamada
      </li>
      <li onClick={()=>setTab('cierre')} className={tab === 'cierre' ? 'tab-selected' : ''}>
        Cierre de llamada
      </li>
      <li onClick={()=>setTab('habilidades')} className={tab === 'habilidades' ? 'tab-selected' : ''}>
        Habilidades Blandas
      </li>
      <li onClick={()=>setTab('herramientas')} className={tab === 'herramientas' ? 'tab-selected' : ''}>
        Uso de herramientas
      </li>
    </ul>
    { tab === 'apertura' &&
      <div>
        <div className='ficha-modelo__02-tabs__item'>
            <label htmlFor="saludo_11">1.1 Saludo</label>
            {/* <Select value={selectedAperturaState11} name='saludo_11' ref={aperturaState11Ref} options = {aperturaState11?.map(apertura => ({ label: apertura.nombre, value: apertura }))} onChange={(e) => handleTotalPorcentaje(e, aperturaState11, setAperturaState11, aperturaPesoTotal, setAperturaPesoTotal, [setAperturaState12, setAperturaState13], aperturaState11Ref, setSelectedAperturaState11, {aperturaState12, aperturaState13})}/> */}
            <Select value={selectedAperturaState11} name='saludo_11' ref={aperturaState11Ref} options = {aperturaState?.apertura11?.map(aperturaObject => ({ label: aperturaObject.nombre, value: aperturaObject }))} onChange={(e) => handlePorcentaje(e, Object.keys(aperturaState)?.[1], aperturaState, setAperturaState, aperturaState11Ref, setSelectedAperturaState11)}/>
            {/* <select name='saludo_11' value={apertura01} onChange={e => handleTotalPorcentaje(e, aperturaState11, setAperturaState11, aperturaPesoTotal, setAperturaPesoTotal, [setAperturaState12, setAperturaState13], aperturaState11Ref)} placeholder='Seleccione'>
              {
                aperturaState11?.map( (apertura, index) => (
                  <option key={index} value={JSON.stringify(apertura)}>{apertura.nombre}</option>
                ))
              }
            </select> */}
        </div>
        <div className='ficha-modelo__02-tabs__item'>
            <label htmlFor="contactar_con_persona_12">1.2 Contactar con la persona adecuada</label>
            {/* <Select value={selectedAperturaState12} name='contactar_con_persona_12' ref={aperturaState12Ref} options = {aperturaState12?.map(apertura => ({ label: apertura.nombre, value: apertura }))} onChange={(e) => handleTotalPorcentaje(e, aperturaState12, setAperturaState12, aperturaPesoTotal, setAperturaPesoTotal, [setAperturaState11, setAperturaState13], aperturaState12Ref, setSelectedAperturaState12, {aperturaState11, aperturaState13})}/> */}
            <Select value={selectedAperturaState12} name='contactar_con_persona_12' ref={aperturaState12Ref} options = {aperturaState?.apertura12?.map(aperturaObject => ({ label: aperturaObject.nombre, value: aperturaObject }))} onChange={(e) => handlePorcentaje(e, Object.keys(aperturaState)?.[2], aperturaState, setAperturaState, aperturaState12Ref, setSelectedAperturaState12)}/>
        </div>
        <div className='ficha-modelo__02-tabs__item'>
            <label htmlFor="identificacion_gestor_13">1.3 Identificación del gestor</label>
            {/* <Select value={selectedAperturaState13} name='identificacion_gestor_13' ref={aperturaState13Ref} options = {aperturaState13?.map(apertura => ({ label: apertura.nombre, value: apertura }))} onChange={(e) => handleTotalPorcentaje(e, aperturaState13, setAperturaState13, aperturaPesoTotal, setAperturaPesoTotal, [setAperturaState11, setAperturaState12], aperturaState13Ref, setSelectedAperturaState13, {aperturaState11, aperturaState12})}/> */}
            <Select value={selectedAperturaState13} name='identificacion_gestor_13' ref={aperturaState13Ref} options = {aperturaState?.apertura13?.map(aperturaObject => ({ label: aperturaObject.nombre, value: aperturaObject }))} onChange={(e) => handlePorcentaje(e, Object.keys(aperturaState)?.[3], aperturaState, setAperturaState, aperturaState13Ref, setSelectedAperturaState13)}/>
        </div>
      </div>
    }
    { tab === 'indagacion' &&        
            <div>
              <div className='ficha-modelo__02-tabs__item'>
                  <label htmlFor="brindar_info">2.1 Brindar información de la Situación del Producto</label>
                  {/* <Select value={selectedIndagacionState21} name='brindar_informacion_21' ref={indagacionState21Ref} options = {indagacionState21?.map(indagacion => ({ label: indagacion.nombre, value: indagacion }))} onChange={(e) => handleTotalPorcentaje(e, indagacionState21, setIndagacionState21, indagacionPesoTotal, setIndagacionPesoTotal, [setIndagacionState22, setIndagacionState23], indagacionState21Ref, setSelectedIndagacionState21)}/> */}
                  <Select value={selectedIndagacionState21} name='brindar_informacion_21' ref={indagacionState21Ref} options = {indagacionState?.indagacion21?.map(indagacionObject => ({ label: indagacionObject.nombre, value: indagacionObject }))} onChange={(e) => handlePorcentaje(e, Object.keys(indagacionState)?.[1], indagacionState, setIndagacionState, indagacionState21Ref, setSelectedIndagacionState21)}/>
              </div>
              <div className='ficha-modelo__02-tabs__item'>
                  <label htmlFor="indagar_motivo">2.2 Indagar motivo de No Pago + Sustento de pago</label>
                  {/* <Select value={selectedIndagacionState22} name='indagar_motivo_no_pago_22' ref={indagacionState22Ref} options = {indagacionState22?.map(indagacion => ({ label: indagacion.nombre, value: indagacion }))} onChange={(e) => handleTotalPorcentaje(e, indagacionState22, setIndagacionState22, indagacionPesoTotal, setIndagacionPesoTotal, [setIndagacionState21, setIndagacionState23], indagacionState22Ref, setSelectedIndagacionState22)}/> */}
                  <Select value={selectedIndagacionState22} name='indagar_motivo_no_pago_22' ref={indagacionState22Ref} options = {indagacionState?.indagacion22?.map(indagacionObject => ({ label: indagacionObject.nombre, value: indagacionObject }))} onChange={(e) => handlePorcentaje(e, Object.keys(indagacionState)?.[2], indagacionState, setIndagacionState, indagacionState22Ref, setSelectedIndagacionState22)}/>
              </div>
              <div className='ficha-modelo__02-tabs__item'>
                  <label htmlFor="asesorar">2.3 Asesorar</label>
                  {/* <Select value={selectedIndagacionState23} name='asesorar_23' ref={indagacionState23Ref} options = {indagacionState23?.map(indagacion => ({ label: indagacion.nombre, value: indagacion }))} onChange={(e) => handleTotalPorcentaje(e, indagacionState23, setIndagacionState23, indagacionPesoTotal, setIndagacionPesoTotal, [setIndagacionState21, setIndagacionState22], indagacionState23Ref, setSelectedIndagacionState23)}/> */}
                  <Select value={selectedIndagacionState23} name='asesorar_23' ref={indagacionState23Ref} options = {indagacionState?.indagacion23?.map(indagacionObject => ({ label: indagacionObject.nombre, value: indagacionObject }))} onChange={(e) => handlePorcentaje(e, Object.keys(indagacionState)?.[3], indagacionState, setIndagacionState, indagacionState23Ref, setSelectedIndagacionState23)}/>
              </div>
            </div>
    }      
    { tab === 'manejo' &&     
            <div>
              <div className='ficha-modelo__02-tabs__item'>
                  <label htmlFor="saludo">3.1 Mantiene sentido de urgencia</label>
                  {/* <Select value={selectedManejoState31} name='mantiene_sentido_urgencia_31' ref={manejoState31Ref} options = {manejoState31?.map(manejo => ({ label: manejo.nombre, value: manejo }))} onChange={(e) => handleTotalPorcentaje(e, manejoState31, setManejoState31, manejoPesoTotal, setManejoPesoTotal, [setManejoState32], manejoState31Ref, setSelectedManejoState31)}/> */}
                  <Select value={selectedManejoState31} name='mantiene_sentido_urgencia_31' ref={manejoState31Ref} options = {manejoState?.manejo31?.map(manejoObject => ({ label: manejoObject.nombre, value: manejoObject }))} onChange={(e) => handlePorcentaje(e, Object.keys(manejoState)?.[1], manejoState, setManejoState, manejoState31Ref, setSelectedManejoState31)}/>
              </div>
              <div className='ficha-modelo__02-tabs__item'>
                  <label htmlFor="contactar_persona">3.2 Perseverancia en el Objetivo/Manejo de Objeciones</label>
                  {/* <Select value={selectedManejoState32} name='perseverancia_objetivo_32' ref={manejoState32Ref} options = {manejoState32?.map(manejo => ({ label: manejo.nombre, value: manejo }))} onChange={(e) => handleTotalPorcentaje(e, manejoState32, setManejoState32, manejoPesoTotal, setManejoPesoTotal, [setManejoState31], manejoState32Ref, setSelectedManejoState32)}/> */}
                  <Select value={selectedManejoState32} name='perseverancia_objetivo_32' ref={manejoState32Ref} options = {manejoState?.manejo32?.map(manejoObject => ({ label: manejoObject.nombre, value: manejoObject }))} onChange={(e) => handlePorcentaje(e, Object.keys(manejoState)?.[2], manejoState, setManejoState, manejoState32Ref, setSelectedManejoState32)}/>
              </div>
            </div>
    }            
    { tab === 'cierre' &&    
            <div>
              <div className='ficha-modelo__02-tabs__item'>
                  <label htmlFor="saludo">4.1 Reafirmar acuerdos y próximos pasos (Parafraseo)</label>
                  {/* <Select value={selectedCierreState41} name='reafirmar_acuerdos_41' ref={cierreState41Ref} options = {cierreState41?.map(cierre => ({ label: cierre.nombre, value: cierre }))} onChange={(e) => handleTotalPorcentaje(e, cierreState41, setCierreState41, cierrePesoTotal, setCierrePesoTotal, [setCierreState42], cierreState41Ref, setSelectedCierreState41)}/> */}
                  <Select value={selectedCierreState41} name='reafirmar_acuerdos_41' ref={cierreState41Ref} options = {cierreState?.cierre41?.map(cierreObject => ({ label: cierreObject.nombre, value: cierreObject }))} onChange={(e) => handlePorcentaje(e, Object.keys(cierreState)?.[1], cierreState, setCierreState, cierreState41Ref, setSelectedCierreState41)}/>
              </div>
              <div className='ficha-modelo__02-tabs__item'>
                  <label htmlFor="contactar_persona">4.2 Despedida del Cliente</label>
                  {/* <Select value={selectedCierreState42} name='despedida_cliente_42' ref={cierreState42Ref} options = {cierreState42?.map(cierre => ({ label: cierre.nombre, value: cierre }))} onChange={(e) => handleTotalPorcentaje(e, cierreState42, setCierreState42, cierrePesoTotal, setCierrePesoTotal, [setCierreState41], cierreState42Ref, setSelectedCierreState42)}/> */}
                  <Select value={selectedCierreState42} name='despedida_cliente_42' ref={cierreState42Ref} options = {cierreState?.cierre42?.map(cierreObject => ({ label: cierreObject.nombre, value: cierreObject }))} onChange={(e) => handlePorcentaje(e, Object.keys(cierreState)?.[2], cierreState, setCierreState, cierreState42Ref, setSelectedCierreState42)}/>
              </div>
            </div>
    }    
    { tab === 'habilidades' &&   
            <div>
              <div className='ficha-modelo__02-tabs__item'>
                  <label htmlFor="saludo">5.1 Escucha activa</label>
                  {/* <Select value={selectedHabilidadesState51} name='escucha_activa_51' ref={habilidadesState51Ref} options = {habilidadesState51?.map(habilidades => ({ label: habilidades.nombre, value: habilidades }))} onChange={(e) => handleTotalPorcentaje(e, habilidadesState51, setHabilidadesState51, habilidadesPesoTotal, setHabilidadesPesoTotal, [setHabilidadesState52, setHabilidadesState53], habilidadesState51Ref, setSelectedHabilidadesState51)}/> */}
                  <Select value={selectedHabilidadesState51} name='escucha_activa_51' ref={habilidadesState51Ref} options = {habilidadesState?.habilidades51?.map(habilidadesObject => ({ label: habilidadesObject.nombre, value: habilidadesObject }))} onChange={(e) => handlePorcentaje(e, Object.keys(habilidadesState)?.[1], habilidadesState, setHabilidadesState, habilidadesState51Ref, setSelectedHabilidadesState51)}/>
              </div>
              <div className='ficha-modelo__02-tabs__item'>
                  <label htmlFor="contactar_persona">5.2 Comunicación con el cliente</label>
                  {/* <Select value={selectedHabilidadesState52} name='comunicacion_cliente_52' ref={habilidadesState52Ref} options = {habilidadesState52?.map(habilidades => ({ label: habilidades.nombre, value: habilidades }))} onChange={(e) => handleTotalPorcentaje(e, habilidadesState52, setHabilidadesState52, habilidadesPesoTotal, setHabilidadesPesoTotal, [setHabilidadesState51, setHabilidadesState53], habilidadesState52Ref, setSelectedHabilidadesState52)}/> */}
                  <Select value={selectedHabilidadesState52} name='comunicacion_cliente_52' ref={habilidadesState52Ref} options = {habilidadesState?.habilidades52?.map(habilidadesObject => ({ label: habilidadesObject.nombre, value: habilidadesObject }))} onChange={(e) => handlePorcentaje(e, Object.keys(habilidadesState)?.[2], habilidadesState, setHabilidadesState, habilidadesState52Ref, setSelectedHabilidadesState52)}/>
              </div>
              <div className='ficha-modelo__02-tabs__item'>
                  <label htmlFor="identificacion_gestor">5.3 Amabilidad con el cliente</label>
                  {/* <Select value={selectedHabilidadesState53} name='amabilidad_cliente_53' ref={habilidadesState53Ref} options = {habilidadesState53?.map(habilidades => ({ label: habilidades.nombre, value: habilidades }))} onChange={(e) => handleTotalPorcentaje(e, habilidadesState53, setHabilidadesState53, habilidadesPesoTotal, setHabilidadesPesoTotal, [setHabilidadesState51, setHabilidadesState52], habilidadesState53Ref, setSelectedHabilidadesState53)}/> */}
                  <Select value={selectedHabilidadesState53} name='amabilidad_cliente_53' ref={habilidadesState53Ref} options = {habilidadesState?.habilidades53?.map(habilidadesObject => ({ label: habilidadesObject.nombre, value: habilidadesObject }))} onChange={(e) => handlePorcentaje(e, Object.keys(habilidadesState)?.[3], habilidadesState, setHabilidadesState, habilidadesState53Ref, setSelectedHabilidadesState53)}/>
              </div>
            </div>
    }

    { tab === 'herramientas' &&   
            <div>
              <div className='ficha-modelo__02-tabs__item'>
                  <label htmlFor="saludo">6.1 Uso de Herramientas de apoyo</label>
                  {/* <Select value={selectedHerramientasState61} name='uso_herramientas_61' ref={herramientasState61Ref} options = {herramientasState61?.map(herramientas => ({ label: herramientas.nombre, value: herramientas }))} onChange={(e) => handleTotalPorcentaje(e, herramientasState61, setHerramientasState61, herramientasPesoTotal, setHerramientasPesoTotal, [setHerramientasState62], herramientasState61Ref, setSelectedHerramientasState61)}/> */}
                  <Select value={selectedHerramientasState61} name='uso_herramientas_61' ref={herramientasState61Ref} options = {herramientasState?.herramientas61?.map(herramientasObject => ({ label: herramientasObject.nombre, value: herramientasObject }))} onChange={(e) => handlePorcentaje(e, Object.keys(herramientasState)?.[1], herramientasState, setHerramientasState, herramientasState61Ref, setSelectedHerramientasState61)}/>
              </div>
              <div className='ficha-modelo__02-tabs__item'>
                  <label htmlFor="contactar_persona">6.2 Registro de gestiones</label>
                  {/* <Select value={selectedHerramientasState62} name='registro_gestiones_62' ref={herramientasState62Ref} options = {herramientasState62?.map(herramientas => ({ label: herramientas.nombre, value: herramientas }))} onChange={(e) => handleTotalPorcentaje(e, herramientasState62, setHerramientasState62, herramientasPesoTotal, setHerramientasPesoTotal, [setHerramientasState61], herramientasState62Ref, setSelectedHerramientasState62)}/> */}
                  <Select value={selectedHerramientasState62} name='registro_gestiones_62' ref={herramientasState62Ref} options = {herramientasState?.herramientas62?.map(herramientasObject => ({ label: herramientasObject.nombre, value: herramientasObject }))} onChange={(e) => handlePorcentaje(e, Object.keys(herramientasState)?.[2], herramientasState, setHerramientasState, herramientasState62Ref, setSelectedHerramientasState62)}/>
              </div>
            </div>
    }
            <div>
              <textarea className='ficha-modelo__02-textarea' placeholder='Observación'></textarea>
            </div>
            {/* <span className='ficha-modelo__porcentaje-number'>{porcentaje}%</span> */}
          </div>
        </div>
      </form>
      {
        user && <FichaEvaluacionMonitor monitor={user.nombres} />
      }
    </section>
  )
}
