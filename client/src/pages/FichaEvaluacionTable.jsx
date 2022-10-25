import axios from 'axios';
import React, { Children } from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import DataTable from 'react-data-table-component';
import * as XLSX from 'xlsx';
import {FaSearch} from 'react-icons/fa';
import {ImCalendar} from 'react-icons/im';
import ExportButton from '../utils/ExportButton';
import { useFilter } from '../hooks/useFilter';
import './fichaEvaluacionTable.css';


// const URL = 'http://192.168.1.51:4000/api/v1/Reporte';
const API_URL = `${import.meta.env.VITE_API_URL}api/v1/fichas`;

export const FichaEvaluacionTable = () => {

    
    const [datosFicha, setDatosFicha] = useState([])
    const [firstDate, setFirstDate] = useState('')
    const [secondDate, setSecondDate] = useState('')

    const columns = [
        {
            name: 'id',
            selector: row => <p className='ficha-evaluacion-table__item'>{row.id}</p>,
            sortable: true,
            center: true,
            wrap: true
        },
        {
            name: 'id_evaluacion',
            selector: row => <p className='ficha-evaluacion-table__item'>{row.id_evaluacion}</p>,
            sortable: true,
            center: true,
            wrap: true
        },
        {
            name: 'cartera',
            selector: row => <p className='ficha-evaluacion-table__item'>{row.cartera}</p>,
            sortable: true,
            center: true,
            wrap: true
        },
        {
            name: 'tramo',
            selector: row => <p className='ficha-evaluacion-table__item'>{row.tramo}</p>,
            sortable: true,
            center: true,
            wrap: true
        },
        {
            name: 'user_agente',
            selector: row => <p className='ficha-evaluacion-table__item'>{row.user_agente}</p>,
            sortable: true,
            center: true,
            wrap: true
        },
        {
            name: 'agente',
            selector: row => <p className='ficha-evaluacion-table__item'>{row.agente}</p>,
            sortable: true,
            center: true,
            wrap: true
        },
        {
            name: 'mes_llamada',
            selector: row => <p className='ficha-evaluacion-table__item'>{row.mes_llamada}</p>,
            sortable: true,
            center: true,
            wrap: true
        },
        {
            name: 'fecha_llamada',
            selector: row => <p className='ficha-evaluacion-table__item'>{row.fecha_llamada}</p>,
            sortable: true,
            center: true,
            wrap: true
        },
        {
            name: 'semana_llamada',
            selector: row => <p className='ficha-evaluacion-table__item'>{row.semana_llamada}</p>,
            sortable: true,
            center: true,
            wrap: true
        },
        {
            name: 'telefono',
            selector: row => <p className='ficha-evaluacion-table__item'>{row.telefono}</p>,
            sortable: true,
            center: true,
            wrap: true
        },
        {
            name: 'dni_cliente',
            selector: row => <p className='ficha-evaluacion-table__item'>{row.dni_cliente}</p>,
            sortable: true,
            center: true,
            wrap: true
        },
        {
            name: 'cuenta_cliente',
            selector: row => <p className='ficha-evaluacion-table__item'>{row.cuenta_cliente}</p>,
            sortable: true,
            center: true,
            wrap: true
        },
        {
            name: 'resultado',
            selector: row => <p className='ficha-evaluacion-table__item'>{row.resultado}</p>,
            sortable: true,
            center: true,
            wrap: true
        },
        {
            name: 'hora_llamada',
            selector: row => <p className='ficha-evaluacion-table__item'>{row.hora_llamada}</p>,
            sortable: true,
            center: true,
            wrap: true
        },
        {
            name: 'tmo_segundos',
            selector: row => <p className='ficha-evaluacion-table__item'>{row.tmo_segundos}</p>,
            sortable: true,
            center: true,
            wrap: true
        },
        {
            name: 'tipo_llamada',
            selector: row => <p className='ficha-evaluacion-table__item'>{row.tipo_llamada}</p>,
            sortable: true,
            center: true,
            wrap: true
        },
        {
            name: 'tipo_gestion',
            selector: row => <p className='ficha-evaluacion-table__item'>{row.tipo_gestion}</p>,
            sortable: true,
            center: true,
            wrap: true
        },
        {
            name: 'perfil_cliente',
            selector: row => <p className='ficha-evaluacion-table__item'>{row.perfil_cliente}</p>,
            sortable: true,
            center: true,
            wrap: true
        },
        {
            name: 'alerta',
            selector: row => <p className='ficha-evaluacion-table__item'>{row.alerta}</p>,
            sortable: true,
            center: true,
            wrap: true
        },
        {
            name: 'descripcion_alerta',
            selector: row => <p className='ficha-evaluacion-table__item'>{row.descripcion_alerta}</p>,
            sortable: true,
            center: true,
            wrap: true
        },
        {
            name: 'motivo_no_pago',
            selector: row => <p className='ficha-evaluacion-table__item'>{row.motivo_no_pago}</p>,
            sortable: true,
            center: true,
            wrap: true
        },
        {
            name: 'responsabilidad_no_fcr',
            selector: row => <p className='ficha-evaluacion-table__item'>{row.responsabilidad_no_fcr}</p>,
            sortable: true,
            center: true,
            wrap: true
        },
        {
            name: 'motivo_no_fcr',
            selector: row => <p className='ficha-evaluacion-table__item'>{row.motivo_no_fcr}</p>,
            sortable: true,
            center: true,
            wrap: true
        },
        {
            name: 'fecha_monitoreo',
            selector: row => <p className='ficha-evaluacion-table__item'>{row.fecha_monitoreo}</p>,
            sortable: true,
            center: true,
            wrap: true
        },
        {
            name: 'nombre_monitor',
            selector: row => <p className='ficha-evaluacion-table__item'>{row.supervisor}</p>,
            sortable: true,
            center: true,
            wrap: true
        },
        {
            name: 'rol',
            selector: row => <p className='ficha-evaluacion-table__item'>{row.rol}</p>,
            sortable: true,
            center: true,
            wrap: true
        },
        {
            name: 'hora_inicio',
            selector: row => <p className='ficha-evaluacion-table__item'>{row.hora_inicio}</p>,
            sortable: true,
            center: true,
            wrap: true
        },
        {
            name: 'hora_fin',
            selector: row => <p className='ficha-evaluacion-table__item'>{row.hora_fin}</p>,
            sortable: true,
            center: true,
            wrap: true
        },
        {
            name: 'duracion_monitoreo',
            selector: row => <p className='ficha-evaluacion-table__item'>{row.duracion_monitoreo}</p>,
            sortable: true,
            center: true,
            wrap: true
        },
        {
            name: 'saludo_11',
            selector: row => <p className='ficha-evaluacion-table__item'>{row.saludo_11}</p>,
            sortable: true,
            center: true,
            wrap: true
        },
        {
            name: 'contactar_con_persona_12',
            selector: row => <p className='ficha-evaluacion-table__item'>{row.contactar_con_persona_12}</p>,
            sortable: true,
            center: true,
            wrap: true
        },
        {
            name: 'identificacion_gestor_13',
            selector: row => <p className='ficha-evaluacion-table__item'>{row.identificacion_gestor_13}</p>,
            center: true,
            wrap: true
        },
        {
            name: 'brindar_informacion_21',
            selector: row => <p className='ficha-evaluacion-table__item'>{row.brindar_informacion_21}</p>,
            center: true,
            wrap: true
        },
        {
            name: 'indagar_motivo_no_pago_22',
            selector: row => <p className='ficha-evaluacion-table__item'>{row.indagar_motivo_no_pago_22}</p>,
            center: true,
            wrap: true
        },
        {
            name: 'asesorar_23',
            selector: row => <p className='ficha-evaluacion-table__item'>{row.asesorar_23}</p>,
            center: true,
            wrap: true
        },
        {
            name: 'mantiene_sentido_urgencia_31',
            selector: row => <p className='ficha-evaluacion-table__item'>{row.mantiene_sentido_urgencia_31}</p>,
            center: true,
            wrap: true
        },
        {
            name: 'perseverancia_objetivo_32',
            selector: row => <p className='ficha-evaluacion-table__item'>{row.perseverancia_objetivo_32}</p>,
            center: true,
            wrap: true
        },
        {
            name: 'reafirmar_acuerdos_41',
            selector: row => <p className='ficha-evaluacion-table__item'>{row.reafirmar_acuerdos_41}</p>,
            center: true,
            wrap: true
        },
        {
            name: 'despedida_cliente_42',
            selector: row => <p className='ficha-evaluacion-table__item'>{row.despedida_cliente_42}</p>,
            center: true,
            wrap: true
        },
        {
            name: 'escucha_activa_51',
            selector: row => <p className='ficha-evaluacion-table__item'>{row.escucha_activa_51}</p>,
            center: true,
            wrap: true
        },
        {
            name: 'comunicacion_cliente_52',
            selector: row => <p className='ficha-evaluacion-table__item'>{row.escucha_activa_51}</p>,
            ccenter: true,
            wrap: true
        },
        {
            name: 'amabilidad_cliente_53',
            selector: row => <p className='ficha-evaluacion-table__item'>{row.escucha_activa_51}</p>,
            center: true,
            wrap: true
        },
        {
            name: 'uso_herramientas_61',
            selector: row => <p className='ficha-evaluacion-table__item'>{row.escucha_activa_51}</p>,
            center: true,
            wrap: true
        },
        {
            name: 'registro_gestiones_62',
            selector: row => <p className='ficha-evaluacion-table__item'>{row.escucha_activa_51}</p>,
            center: true,
            wrap: true
        },
        {
            name: 'calificacion_final',
            selector: row => <p className='ficha-evaluacion-table__item'>{row.calificacion_final}%</p>,
            center: true,
            wrap: true
        },
    ];

    const { inputText, suggestions, setSuggestions, showAll, handleFilter, dateFilter } = useFilter(datosFicha);

    const showData = async () => {
		const response = await fetch(API_URL);
		const data = await response.json();
		setDatosFicha(data.fichas);
        setSuggestions(data.fichas);
	};
    //FILTER
    

    useEffect(() => {
        showData()
    }, [])
    
    const paginationOptions = {
        rowsPerPageText: 'Filas por página',
        rangeSeparatorText: 'de',
        selectAllRowsItem: true,
        selectAllRowsItemText: 'Todos',
      };
      console.log(datosFicha)
  return (
    <div>
        
        <div className='reporteTable-date-container'>
					<div className='reporteTable-date__input-container'>
						<label htmlFor='desde'>Desde:</label>
						<input
							className='reporteTable-date__firstDate-input'
							type='date'
							name='desde'
							value={firstDate}
							onChange={e => setFirstDate(e.target.value)}
						/>
						<label htmlFor='hasta'>Hasta:</label>
						<input
							className='reporteTable-date__secondDate-input'
							type='date'
							name='hasta'
							value={secondDate}
							onChange={e => setSecondDate(e.target.value)}
						/>
						<ImCalendar
							className='reporteTable-date__icon'
							onClick={()=>dateFilter(firstDate, secondDate)}
						/>
					</div>
					<button
						className='reporteTable-date__button'
						onClick={showAll}
					>
						Mostrar todo
					</button>
				</div>
        <div className='registros-multicanal___filter-export'>
            <ExportButton data={datosFicha} filename={'Evaluación Reporte'}/>
            <div className='registros-multicanal__search-container'>
                <input className='registros-multicanal__input' value={inputText} onChange={e=>handleFilter(e.target.value, datosFicha)}/>
                <FaSearch className='registros-multicanal__input-search'/>
            </div>
        </div>
        {
            suggestions ? <DataTable
                        columns={columns}
                        data={suggestions}
                        pagination
                        paginationComponentOptions={paginationOptions}
                        fixedHeader
                        fixedHeaderScrollHeight='600px'
                        title="Reporte:"
                        responsive
            />
            : <DataTable
            columns={columns}
            data={datosFicha}
            pagination
            paginationComponentOptions={paginationOptions}
            fixedHeader
            fixedHeaderScrollHeight='600px'
            title="Reporte:"
            responsive
/>
        }
    </div>
  )
}
