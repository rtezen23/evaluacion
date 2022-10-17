import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import './FichaEvaluacion.css';
import './FichaEvaluacion2.css';
import infoEvaluacion from "../../infoEvaluacion";
import infoEvaluacionCompleta from "../../infoEvaluacionCompleta";
import audio from "../assets/audio.mp3";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export const FichaEvaluacion = () => {
  /* DATOS PARA REACT-SELECT */
  const apertura = infoEvaluacion.apertura;
  const indagacion = infoEvaluacion.indagacion;
  const manejo = infoEvaluacion.manejo;
  const cierre = infoEvaluacion.cierre;
  const habilidades = infoEvaluacion.habilidades;
  const herramientas = infoEvaluacion.herramientas;

  const [tab, setTab] = useState('apertura')

  const isAuth = useSelector(state => state.user.isAuth);
  const registers = useSelector(state => state.registers.registers);
  const user = useSelector(state => state.user.user);
  const navigate =  useNavigate();

  //CRONOMETRO
	const [segundos, setSegundos] = useState(0);
	const [minutos, setMinutos] = useState(0);
	const [assigned, setAssigned] = useState([]);
  const [showSubmit, setShowSubmit] = useState(false);
  const [porcentaje, setPorcentaje] = useState(0)
 
   // PORCENTAJE
  const { apertura11, apertura12, apertura13 } =  infoEvaluacionCompleta.apertura;
  const { indagacion21, indagacion22, indagacion23 } =  infoEvaluacionCompleta.indagacion;
  const { manejo31, manejo32 } =  infoEvaluacionCompleta.manejo;
  const { cierre41, cierre42 } =  infoEvaluacionCompleta.cierre;
  const { habilidades51, habilidades52, habilidades53 } =  infoEvaluacionCompleta.habilidades;
  const { herramientas61, herramientas62 } =  infoEvaluacionCompleta.herramientas;

  const [aperturaState11, setAperturaState11] = useState(infoEvaluacionCompleta.apertura.apertura11)
  const [aperturaState12, setAperturaState12] = useState(infoEvaluacionCompleta.apertura.apertura12)
  const [aperturaState13, setAperturaState13] = useState(infoEvaluacionCompleta.apertura.apertura13)
  const [aperturaPesoTotal, setAperturaPesoTotal] = useState(infoEvaluacionCompleta.apertura.total_peso);
  
  const [indagacionState21, setIndagacionState21] = useState(infoEvaluacionCompleta.indagacion.indagacion21)
  const [indagacionState22, setIndagacionState22] = useState(infoEvaluacionCompleta.indagacion.indagacion22)
  const [indagacionState23, setIndagacionState23] = useState(infoEvaluacionCompleta.indagacion.indagacion23)
  const [indagacionPesoTotal, setIndagacionPesoTotal] = useState(infoEvaluacionCompleta.indagacion.total_peso);
  
  const [manejoState31, setManejoState31] = useState(infoEvaluacionCompleta.manejo.manejo31)
  const [manejoState32, setManejoState32] = useState(infoEvaluacionCompleta.manejo.manejo32)
  const [manejoPesoTotal, setManejoPesoTotal] = useState(infoEvaluacionCompleta.manejo.total_peso);
  
  const [cierreState41, setCierreState41] = useState(infoEvaluacionCompleta.cierre.cierre41)
  const [cierreState42, setCierreState42] = useState(infoEvaluacionCompleta.cierre.cierre42)
  const [cierrePesoTotal, setCierrePesoTotal] = useState(infoEvaluacionCompleta.cierre.total_peso);
  
  const [habilidadesState51, setHabilidadesState51] = useState(infoEvaluacionCompleta.habilidades.habilidades51)
  const [habilidadesState52, setHabilidadesState52] = useState(infoEvaluacionCompleta.habilidades.habilidades52)
  const [habilidadesState53, setHabilidadesState53] = useState(infoEvaluacionCompleta.habilidades.habilidades53)
  const [habilidadesPesoTotal, setHabilidadesPesoTotal] = useState(infoEvaluacionCompleta.habilidades.total_peso);
  
  const [herramientasState61, setHerramientasState61] = useState(infoEvaluacionCompleta.herramientas.herramientas61)
  const [herramientasState62, setHerramientasState62] = useState(infoEvaluacionCompleta.herramientas.herramientas62)
  const [herramientasPesoTotal, setHerramientasPesoTotal] = useState(infoEvaluacionCompleta.herramientas.total_peso);
  // const handleTotalPorcentaje = (e, state, setState) => {
  //   console.log(first)
  //   aperturaState.forEach(item => {
  //     if (item.isSelected) {
  //       setPorcentaje( prevPorcentaje => prevPorcentaje -item.peso)
  //     }
  //   })

  //   setAperturaState(prevAperturaState => prevAperturaState.map(item => {return{...item, isSelected: item.nombre === e.value.nombre}}));

  //   setPorcentaje( prevPorcentaje => prevPorcentaje +  e.value.peso)
  // }

  const setNewPesos = (e, state, setState, total_peso, set_total_peso) => {
    // Restar % actual al % total
    const cumpleItem = state.find(item => item.nombre === 'Sí cumple');
    console.log(cumpleItem)
    console.log(total_peso)
    set_total_peso(prevTotalPeso => prevTotalPeso - cumpleItem.peso);
    console.log(total_peso)

    console.log(state)

    setState(prevState => {
      prevState.map(item => {
        return {...item, peso_percent: item.peso_percent * 100 / total_peso}
      })
    });

    console.log(state)
    console.log(total_peso)
  }

  const handleTotalPorcentaje = (e, state, setState, total_peso, set_total_peso) => {

    // if (e.value.nombre === 'No aplica') {
    //   return setNewPesos(e, state, setState, total_peso, set_total_peso);
    // }

    console.log(state)

    // Recorremos en array de objetos para restar la cantidad si habia un elemento seleccionado antes
    state.forEach(item => {
      if (item.isSelected) {
        const pesoDecimal = total_peso * item.peso_percent / 100;
        const peso = Math.round(pesoDecimal);
        setPorcentaje( prevPorcentaje => prevPorcentaje - peso);
      }
    })

    // Recorremos el arreglo de objetos para asignar el nuevo elemento seleccionado dependiendo de la opcion elegida
    setState(prevState => prevState.map(item => {return{...item, isSelected: item.nombre === e.value.nombre}}));

    // Sumamos la cantidad correspondiente del elemento seleccionado al % total
    setPorcentaje( prevPorcentaje => {
      const pesoDecimal = total_peso * e.value.peso_percent / 100;
      const peso = Math.round(pesoDecimal);
      return prevPorcentaje +  peso
    })
  }

  let timer;
  const handleTime = () => {
    setShowSubmit(true);
    timer = setInterval(() => {
      setSegundos(prevSegundos => prevSegundos + 1);

			if (segundos === 59) {
				setMinutos(prevMinutos => prevMinutos + 1);
				setSegundos(0);
			}
			if (minutos === 59) {
				// setHoras(prevHoras => prevHoras + 1);
				setMinutos(0);
			}
    }, 1000);
  }

  useEffect( () => {
    const asignados = registers.filter(register => register.ASESOR === user.usuario);
    setAssigned(asignados);
  },[])

  const handleCancel = () => {
    window.location.reload();
    clearInterval(timer)
  }

  const findCarteraName = (cartera) => {

    let nombre = '';
    switch (cartera){
      case 'CAR028': nombre = 'FC VIGENTE(121-MAS)'; break;
      case 'CAR029': nombre = 'FC CASTIGO'; break;
      case 'CAR060': nombre = 'FC CAMPO(61-120)'; break;
      case 'CAR061': nombre = 'FC VIGENTE(1-30)'; break;
      case 'CAR085': nombre = 'FC VIGENTE PREVENTIVO'; break;
      case 'CAR070': nombre = 'FC VIGENTE(31-60)'; break;
      case 'CAR038': nombre = 'FC JUDICIAL CASTIGO'; break;
      case 'CAR039': nombre = 'FC JUDICIAL VIGENTE'; break;
      case 'CAR062': nombre = 'FINANCIERA EFECTIVA'; break;
      case 'CAR080': nombre = 'BANBIF VIGENTE'; break;
      case 'CAR111': nombre = 'BANBIF CASTIGO'; break;
      case 'CAR112': nombre = 'BANBIF PREVENTIVA'; break;
      case 'CAR065': nombre = 'FINANCIERA EFECTIVA VIGENTE'; break;
      case 'CAR068': nombre = 'FINANCIERA EFECTIVA VENCIDO'; break;
      case 'CAR069': nombre = 'FINANCIERA EFECTIVA PREVENTIVA'; break;
      case 'CAR107': nombre = 'FINANCIERA EFECTIVA TRAMO-5'; break;
      case 'CAR114': nombre = 'BANCO FALABELLA CASTIGO'; break;
      case 'CAR115': nombre = 'SANTANDER CONSUMER'; break;
      case 'CAR117': nombre = 'SANTANDER CONSUMER VIGENTE'; break;
      case 'CAR122': nombre = 'BANCO PICHINCHA JUDICIAL'; break;
      case 'CAR123': nombre = 'BANCO PICHINCHA VIGENTE'; break;
      case 'CAR128': nombre = 'BANCO PICHINCHA VIGENTE REFUERZO'; break;
      case 'CAR130': nombre = 'BANCO PICHINCHA VIGENTE REFUERZO DINERS'; break;
      case 'CAR132': nombre = 'BANCO PICHINCHA VIGENTE REFINANCIADO'; break;
      case 'CAR0126': nombre = 'PROFUTURO'; break;
      case 'CAR127': nombre = 'AGROBANCO'; break;
      case 'CAR129': nombre = 'SANTANDER CONSUMER CAPTURA'; break;
    }

    return nombre;
  }

  const handleSubmit = () => {
  }



  

  return (
    <section className='ficha-evaluacion'>
      {/* 
      <div className='ficha-evaluacion__results'>
        <div className='ficha-evaluacion__btn-container'>
          <button className='ficha-evaluacion__btn btnCancelar' onClick={handleCancel}>CANCELAR</button>
          {
            !showSubmit ? <button className='ficha-evaluacion__btn btnIniciar' onClick={handleTime}>INICIAR</button>
            : <button className='ficha-evaluacion__btn btnGuardar' onClick={handleSubmit}>GUARDAR</button>
            
          }
        </div>
        <div className='ficha-evaluacion__results-calificacion'>
          <h5>Calificación final</h5>
          <p>0.00%</p>
        </div>
      </div> */}

        {/* <div>
          <div>
              <label htmlFor="cartera">Cartera</label>
              <input type="text" name="cartera" id="cartera" />
          </div>
          <div>
              <label htmlFor="tramo">Tramo</label>
              <input type="text" name="tramo" id="tramo" />
          </div>
          <div>
              <label htmlFor="id_evaluacion">ID Evaluación</label>
              <input type="text" name="id_evaluacion" id="id_evaluacion" />
          </div>
          <div>
              <label htmlFor="agente">Agente</label>
              <input type="text" name="agente" id="agente" />
          </div>
          <div>
              <label htmlFor="supervisor">Supervisor</label>
              <input type="text" name="supervisor" id="supervisor" />
          </div>
          <div>
              <label htmlFor="n_telefono">N° Teléfono</label>
              <input type="text" name="n_telefono" id="n_telefono" />
          </div>
          <div>
              <label htmlFor="dni">DNI/Cuenta Cliente</label>
              <input type="text" name="dni" id="dni" />
          </div>
          <div>
              <label htmlFor="fecha_llamada">Fecha de la llamada</label>
              <input type="text" name="fecha_llamada" id="fecha_llamada" />
          </div>
          <div>
              <label htmlFor="hora_llamada">Hora de la llamada</label>
              <input type="text" name="hora_llamada" id="hora_llamada" />
          </div>
          <div>
              <label htmlFor="resultado">Resultado</label>
              <input type="text" name="resultado" id="resultado" />
          </div>
          <div>
              <label htmlFor="tmo">TMO (Segundos)</label>
              <input type="text" name="tmo" id="tmo" />
          </div>
          <div>
              <label htmlFor="monitor">Nombre monitor</label>
              <input type="text" name="monitor" id="monitor" />
          </div>
        </div> */}
      <form className='ficha-evaluacion__form'>
        {/* <div className='ficha-evaluacion__form-col1'>
          <div className='ficha-evaluacion__form-col1__label-container'>
            <label htmlFor="cartera">Cartera</label>
            <label htmlFor="tramo">Tramo</label>
            <label htmlFor="id_evaluacion">ID Evaluación</label>
            <label htmlFor="agente">Agente</label>
            <label htmlFor="supervisor">Supervisor</label>
            <label htmlFor="n_telefono">N° Teléfono</label>
            <label htmlFor="dni">DNI/Cuenta Cliente</label>
            <label htmlFor="fecha_llamada">Fecha de la llamada</label>
            <label htmlFor="hora_llamada">Hora de la llamada</label>
            <label htmlFor="resultado">Resultado</label>
            <label htmlFor="tmo">TMO (Segundos)</label>
            <label htmlFor="monitor">Nombre monitor</label>
          </div>
          <div className='ficha-evaluacion__form-col1__input-container'>
            <input type="text" name="cartera" id="cartera" />
            <input type="text" name="tramo" id="tramo" />
            <input type="text" name="id_evaluacion" id="id_evaluacion" />
            <input type="text" name="agente" id="agente" />
            <input type="text" name="supervisor" id="supervisor" />
            <input type="text" name="n_telefono" id="n_telefono" />
            <input type="text" name="dni" id="dni" />
            <input type="text" name="fecha_llamada" id="fecha_llamada" />
            <input type="text" name="hora_llamada" id="hora_llamada" />
            <input type="text" name="resultado" id="resultado" />
            <input type="text" name="tmo" id="tmo" />
            <input type="text" name="monitor" id="monitor" />
          </div>
        </div>               */}

        <div className='ficha-modelo__01-main'>
          <h2 className='ficha-modelo__01-main__title'>FICHA MODELO 3 - TIEMPO</h2>
          <p className='ficha-modelo__01-main__time'>
                {/* {horas < 10 ? '0' + horas : horas}: */}
                {minutos < 10 ? '0' + minutos : minutos}:
                {segundos < 10 ? '0' + segundos : segundos}
          </p>

          <hr />
        <div className='ficha-modelo__01'>

          <h5 className='gray'>CARTERA</h5>
          <p className='gray'>{findCarteraName(assigned?.[assigned.length-2]?.CARTERA)}</p>
          <span className='gray'>(Castigo-ar)</span>

          <h5>ID GESTION</h5>
          <p>0001</p>
          <span>(Predictivo)</span>

          <h5 className='gray'>AGENTE</h5>
          <p className='span-2 gray'>{assigned?.[assigned.length-2]?.GESTOR}</p>

          <h5>Cliente</h5>
          <p>{assigned?.[assigned.length-2]?.IDENTIFICADOR}</p>
          <span>(ROJAS HUARANGA JAIME)</span>

          <h5 className='gray'>REACCIÓN</h5>
          <p className='span-2 gray'>Cliente no desea negociar / Renuente</p>

          <h5>TMO</h5>
          <p>(00:00:00:0000000)</p>
          <div>
            <input type="number" className='tmo-input' placeholder='tmo manual (segundos)'/>
          </div>

          <h5 className='gray'>FECHA / NUMERO</h5>
          <p className='gray'>{assigned?.[assigned.length-2]?.FECHA}</p>
          <p className='gray'>{assigned?.[assigned.length-2]?.NUMCONTAC}</p>

          <h5>Tipo de Llamada</h5>
          <Select/>
          <div className='tipo-gestion'>
            <h5>Tipo de Gestión</h5>
            <Select className='tipo-gestion__select'/>
          </div>

          <h5 className='gray'>INTERFERENCIA</h5>
          <div>
            <input className='gray interferencia-checkbox' type="checkbox" name="" id="" />
          </div>
          <Select className='gray'/>

          <h5>CALIFICACION</h5>
          <p className='span-2 calificacion-p'>(0.00)</p>

          <h5 className='gray'>AUDIO</h5>
          <div>
            <audio controls>
              <source src={audio} type="audio/ogg"/>
              Your browser does not support the audio element.
            </audio>
          </div>
          <div>
            <button className='gray ficha-modelo__01-btn'>Seleccionar</button>
          </div>
        </div>
        </div>

        {/* <div className='ficha-evaluacion__form-col2'>
            <div>
              <h4>1. Apertura</h4>
              <div className='ficha-evaluacion__form-col2__input-label-container'>
                <div className='ficha-evaluacion__form-col2__label-container'>
                  <label htmlFor="saludo">1.1 Saludo</label>
                  <label htmlFor="contactar_persona">1.2 Contactar con la persona adecuada</label>
                  <label htmlFor="identificacion_gestor">1.3 Identificación del gestor</label>
                </div>
                <div className='ficha-evaluacion__form-col2__input-container'>
                  <Select  options = {apertura.apertura1?.map(apertura => ({ label: apertura, value: apertura }))}/>
                  <Select  options = {apertura.apertura2?.map(apertura => ({ label: apertura, value: apertura }))}/>
                  <Select  options = {apertura.apertura3?.map(apertura => ({ label: apertura, value: apertura }))}/>
                </div>
              </div>  
            </div>
            <div>
              <h4>2. Indagación y asesoramiento</h4>
              <div className='ficha-evaluacion__form-col2__input-label-container'>
                <div className='ficha-evaluacion__form-col2__label-container'>
                  <label htmlFor="brindar_info">2.1 Brindar información de la Situación del Producto</label>
                  <label htmlFor="indagar_motivo">2.2 Indagar motivo de No Pago + Sustento de pago</label>
                  <label htmlFor="asesorar">2.3 Asesorar</label>
                </div>
                <div className='ficha-evaluacion__form-col2__input-container'>
                  <Select options = {indagacion.indagacion1?.map(indagacion => ({ label: indagacion, value: indagacion }))}/>
                  <Select options = {indagacion.indagacion2?.map(indagacion => ({ label: indagacion, value: indagacion }))}/>
                  <Select options = {indagacion.indagacion3?.map(indagacion => ({ label: indagacion, value: indagacion }))}/>
                </div>
              </div>  
            </div>
            <div>
              <h4>3. Manejo de llamada</h4>
              <div className='ficha-evaluacion__form-col2__input-label-container'>
                <div className='ficha-evaluacion__form-col2__label-container'>
                  <label htmlFor="saludo">3.1 Mantiene sentido de urgencia</label>
                  <label htmlFor="contactar_persona">3.2 Perseverancia en el Objetivo/Manejo de Objeciones</label>
                </div>
                <div className='ficha-evaluacion__form-col2__input-container'>
                  <Select options = {manejo.manejo1?.map(manejo => ({ label: manejo, value: manejo }))}/>
                  <Select options = {manejo.manejo2?.map(manejo => ({ label: manejo, value: manejo }))}/>
                </div>
              </div>  
            </div>
            <div>
              <h4>4. Cierre de llamada</h4>
              <div className='ficha-evaluacion__form-col2__input-label-container'>
                <div className='ficha-evaluacion__form-col2__label-container'>
                  <label htmlFor="saludo">4.1 Reafirmar acuerdos y próximos pasos (Parafraseo)</label>
                  <label htmlFor="contactar_persona">4.2 Despedida del Cliente</label>
                </div>
                <div className='ficha-evaluacion__form-col2__input-container'>
                  <Select options = {cierre.cierre1?.map(cierre => ({ label: cierre, value: cierre }))}/>
                  <Select options = {cierre.cierre2?.map(cierre => ({ label: cierre, value: cierre }))}/>
                </div>
              </div>  
            </div>
            <div>
              <h4>5. Habilidades Blandas</h4>
              <div className='ficha-evaluacion__form-col2__input-label-container'>
                <div className='ficha-evaluacion__form-col2__label-container'>
                  <label htmlFor="saludo">5.1 Escucha activa</label>
                  <label htmlFor="contactar_persona">5.2 Comunicación con el cliente</label>
                  <label htmlFor="identificacion_gestor">5.3 Amabilidad con el cliente</label>
                </div>
                <div className='ficha-evaluacion__form-col2__input-container'>
                  <Select options = {habilidades.habilidades1?.map(habilidades => ({ label: habilidades, value: habilidades }))}/>
                  <Select options = {habilidades.habilidades2?.map(habilidades => ({ label: habilidades, value: habilidades }))}/>
                  <Select options = {habilidades.habilidades3?.map(habilidades => ({ label: habilidades, value: habilidades }))}/>
                </div>
              </div>
            </div>
            <div>
              <h4>6. Uso de herramientas</h4>
              <div className='ficha-evaluacion__form-col2__input-label-container'>
                <div className='ficha-evaluacion__form-col2__label-container'>
                  <label htmlFor="saludo">6.1 Uso de Herramientas de apoyo</label>
                  <label htmlFor="contactar_persona">6.2 Registro de gestiones</label>
                </div>
                <div className='ficha-evaluacion__form-col2__input-container'>
                  <Select options = {herramientas.herramientas1?.map(herramientas => ({ label: herramientas, value: apertura }))}/>
                  <Select options = {herramientas.herramientas2?.map(herramientas => ({ label: herramientas, value: apertura }))}/>
                </div>
              </div>
            </div>
        </div>
        <div className='ficha-evaluacion__form__observaciones-container'>
          <h3>Observaciones</h3>
          <textarea></textarea>
        </div> */}

  <div className='ficha-modelo__02-main'>
    <button className='ficha-modelo__01-btn ficha-modelo__02-btn'>Guardar y continuar</button>
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
        {/* <div className='ficha-modelo__02-tabs__item'>
            <label htmlFor="saludo">1.1 Saludo</label>
            <Select  options = {apertura.apertura1?.map(apertura => ({ label: apertura, value: apertura }))} onChange={handleAperturaPorcentaje}/>
        </div> */}
        <div className='ficha-modelo__02-tabs__item'>
            <label htmlFor="saludo">1.1 Saludo</label>
            <Select  options = {aperturaState11?.map(apertura => ({ label: apertura.nombre, value: apertura }))} onChange={(e) => handleTotalPorcentaje(e, aperturaState11, setAperturaState11, aperturaPesoTotal, setAperturaPesoTotal)}/>
        </div>
        {/* <div className='ficha-modelo__02-tabs__item'>
            <label htmlFor="contactar_persona">1.2 Contactar con la persona adecuada</label>
            <Select  options = {apertura.apertura2?.map(apertura => ({ label: apertura, value: apertura }))} onChange={handleAperturaPorcentaje}/>
        </div> */}
        <div className='ficha-modelo__02-tabs__item'>
            <label htmlFor="contactar_persona">1.2 Contactar con la persona adecuada</label>
            <Select  options = {aperturaState12?.map(apertura => ({ label: apertura.nombre, value: apertura }))} onChange={(e) => handleTotalPorcentaje(e, aperturaState12, setAperturaState12, aperturaPesoTotal, setAperturaPesoTotal)}/>
        </div>
        {/* <div className='ficha-modelo__02-tabs__item'>
            <label htmlFor="identificacion_gestor">1.3 Identificación del gestor</label>
            <Select  options = {apertura.apertura3?.map(apertura => ({ label: apertura, value: apertura }))} onChange={handleAperturaPorcentaje}/>
        </div> */}
        <div className='ficha-modelo__02-tabs__item'>
            <label htmlFor="identificacion_gestor">1.3 Identificación del gestor</label>
            <Select  options = {aperturaState13?.map(apertura => ({ label: apertura.nombre, value: apertura }))} onChange={(e) => handleTotalPorcentaje(e, aperturaState13, setAperturaState13, aperturaPesoTotal, setAperturaPesoTotal)}/>
        </div>
      </div>
    }
    { tab === 'indagacion' &&        
            <div>
              <div className='ficha-modelo__02-tabs__item'>
                  <label htmlFor="brindar_info">2.1 Brindar información de la Situación del Producto</label>
                  {/* <Select options = {indagacion.indagacion1?.map(indagacion => ({ label: indagacion, value: indagacion }))}/> */}
                  <Select options = {indagacionState21?.map(indagacion => ({ label: indagacion.nombre, value: indagacion }))} onChange={(e) => handleTotalPorcentaje(e, indagacionState21, setIndagacionState21, indagacionPesoTotal, setIndagacionPesoTotal)}/>
              </div>
              <div className='ficha-modelo__02-tabs__item'>
                  <label htmlFor="indagar_motivo">2.2 Indagar motivo de No Pago + Sustento de pago</label>
                  {/* <Select options = {indagacion.indagacion2?.map(indagacion => ({ label: indagacion, value: indagacion }))}/> */}
                  <Select options = {indagacionState22?.map(indagacion => ({ label: indagacion.nombre, value: indagacion }))} onChange={(e) => handleTotalPorcentaje(e, indagacionState22, setIndagacionState22, indagacionPesoTotal, setIndagacionPesoTotal)}/>
              </div>
              <div className='ficha-modelo__02-tabs__item'>
                  <label htmlFor="asesorar">2.3 Asesorar</label>
                  {/* <Select options = {indagacion.indagacion3?.map(indagacion => ({ label: indagacion, value: indagacion }))}/> */}
                  <Select options = {indagacionState23?.map(indagacion => ({ label: indagacion.nombre, value: indagacion }))} onChange={(e) => handleTotalPorcentaje(e, indagacionState23, setIndagacionState23, indagacionPesoTotal, setIndagacionPesoTotal)}/>
              </div>
            </div>
    }      
    { tab === 'manejo' &&     
            <div>
              <div className='ficha-modelo__02-tabs__item'>
                  <label htmlFor="saludo">3.1 Mantiene sentido de urgencia</label>
                  {/* <Select options = {manejo.manejo1?.map(manejo => ({ label: manejo, value: manejo }))}/> */}
                  <Select options = {manejoState31?.map(manejo => ({ label: manejo.nombre, value: manejo }))} onChange={(e) => handleTotalPorcentaje(e, manejoState31, setManejoState31, manejoPesoTotal, setManejoPesoTotal)}/>
              </div>
              <div className='ficha-modelo__02-tabs__item'>
                  <label htmlFor="contactar_persona">3.2 Perseverancia en el Objetivo/Manejo de Objeciones</label>
                  {/* <Select options = {manejo.manejo2?.map(manejo => ({ label: manejo, value: manejo }))}/> */}
                  <Select options = {manejoState32?.map(manejo => ({ label: manejo.nombre, value: manejo }))} onChange={(e) => handleTotalPorcentaje(e, manejoState32, setManejoState32, manejoPesoTotal, setManejoPesoTotal)}/>
              </div>
            </div>
    }            
    { tab === 'cierre' &&    
            <div>
              <div className='ficha-modelo__02-tabs__item'>
                  <label htmlFor="saludo">4.1 Reafirmar acuerdos y próximos pasos (Parafraseo)</label>
                  {/* <Select options = {cierre.cierre1?.map(cierre => ({ label: cierre, value: cierre }))}/> */}
                  <Select options = {cierreState41?.map(cierre => ({ label: cierre.nombre, value: cierre }))} onChange={(e) => handleTotalPorcentaje(e, cierreState41, setCierreState41, cierrePesoTotal, setCierrePesoTotal)}/>
              </div>
              <div className='ficha-modelo__02-tabs__item'>
                  <label htmlFor="contactar_persona">4.2 Despedida del Cliente</label>
                  {/* <Select options = {cierre.cierre2?.map(cierre => ({ label: cierre, value: cierre }))}/> */}
                  <Select options = {cierreState42?.map(cierre => ({ label: cierre.nombre, value: cierre }))} onChange={(e) => handleTotalPorcentaje(e, cierreState42, setCierreState42, cierrePesoTotal, setCierrePesoTotal)}/>
              </div>
            </div>
    }    
    { tab === 'habilidades' &&   
            <div>
              <div className='ficha-modelo__02-tabs__item'>
                  <label htmlFor="saludo">5.1 Escucha activa</label>
                  <Select options = {habilidadesState51?.map(habilidades => ({ label: habilidades.nombre, value: habilidades }))} onChange={(e) => handleTotalPorcentaje(e, habilidadesState51, setHabilidadesState51, habilidadesPesoTotal, setHabilidadesPesoTotal)}/>
              </div>
              <div className='ficha-modelo__02-tabs__item'>
                  <label htmlFor="contactar_persona">5.2 Comunicación con el cliente</label>
                  <Select options = {habilidadesState52?.map(habilidades => ({ label: habilidades.nombre, value: habilidades }))} onChange={(e) => handleTotalPorcentaje(e, habilidadesState52, setHabilidadesState52, habilidadesPesoTotal, setHabilidadesPesoTotal)}/>
              </div>
              <div className='ficha-modelo__02-tabs__item'>
                  <label htmlFor="identificacion_gestor">5.3 Amabilidad con el cliente</label>
                  <Select options = {habilidadesState53?.map(habilidades => ({ label: habilidades.nombre, value: habilidades }))} onChange={(e) => handleTotalPorcentaje(e, habilidadesState53, setHabilidadesState53, habilidadesPesoTotal, setHabilidadesPesoTotal)}/>
              </div>
            </div>
    }

    { tab === 'herramientas' &&   
            <div>
              <div className='ficha-modelo__02-tabs__item'>
                  <label htmlFor="saludo">6.1 Uso de Herramientas de apoyo</label>
                  <Select options = {herramientasState61?.map(herramientas => ({ label: herramientas.nombre, value: herramientas }))} onChange={(e) => handleTotalPorcentaje(e, herramientasState61, setHerramientasState61, herramientasPesoTotal, setHerramientasPesoTotal)}/>
              </div>
              <div className='ficha-modelo__02-tabs__item'>
                  <label htmlFor="contactar_persona">6.2 Registro de gestiones</label>
                  <Select options = {herramientasState62?.map(herramientas => ({ label: herramientas.nombre, value: herramientas }))} onChange={(e) => handleTotalPorcentaje(e, herramientasState62, setHerramientasState62, herramientasPesoTotal, setHerramientasPesoTotal)}/>
              </div>
            </div>
    }
            <div>
              <textarea className='ficha-modelo__02-textarea' placeholder='Observación'></textarea>
            </div>
            <span className='ficha-modelo__porcentaje-number'>{porcentaje}.00%</span>
          </div>
        </div>
      </form>
    </section>
  )
}
