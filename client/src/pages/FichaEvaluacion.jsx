import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import './FichaEvaluacion.css';
import infoEvaluacion from "../../infoEvaluacion";

export const FichaEvaluacion = () => {
  /* DATOS PARA REACT-SELECT */
  const apertura = infoEvaluacion.apertura;
  const indagacion = infoEvaluacion.indagacion;
  const manejo = infoEvaluacion.manejo;
  const cierre = infoEvaluacion.cierre;
  const habilidades = infoEvaluacion.habilidades;
  const herramientas = infoEvaluacion.herramientas;

  // //FECHA
	// const date = new Date();
	// const day = date.getDate();
	// const month = date.getMonth() + 1;
	// const year = date.getFullYear();
	// const minutes = date.getMinutes();
	// const hours = date.getHours();

  //CRONOMETRO
	const [segundos, setSegundos] = useState(0);
	const [minutos, setMinutos] = useState(0);
  const [showSubmit, setShowSubmit] = useState(false);
	// const [horas, setHoras] = useState(0);

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

  useEffect(()=>{

  })

  const handleCancel = () => {
    window.location.reload();
    clearInterval(timer)
  }

  const handleSubmit = () => {

  }


  return (
    <section className='ficha-evaluacion'>
      <h1 className='ficha-evaluacion__title'>Ficha Evaluacion</h1>
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
      </div>
      <p className='tiempo'>
              {/* {horas < 10 ? '0' + horas : horas}: */}
							{minutos < 10 ? '0' + minutos : minutos}:
							{segundos < 10 ? '0' + segundos : segundos}
			</p>

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
        <div className='ficha-evaluacion__form-col1'>
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
        </div>              
        <div className='ficha-evaluacion__form-col2'>
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
        </div>
      </form>
    </section>
  )
}
