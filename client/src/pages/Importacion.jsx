import React, { useState } from 'react';
import * as XLSX from 'xlsx/xlsx.mjs';
import './importacion.css';
import DataTable from 'react-data-table-component';
import { useDispatch, useSelector } from 'react-redux';
import {setRegisters} from '../store/actions/registers.actions';
import {getRegisters} from '../store/actions/registers.actions';

const columns = [
	{
		name: 'FECHAGEST',
		selector: row => row.FECHAGEST,
		grow: 2,
		center: true
	},
	{
		name: 'HORA GESTIÓN',
		selector: row => row['HORA GESTIÓN'],
	},
	{
		name: 'CARTERA',
		selector: row => row.CARTERA,
	},
	{
		name: 'IDENTIFICADOR',
		selector: row => row.IDENTIFICADOR,
	},
	{
		name: 'ACCION',
		selector: row => row.ACCION,
	},
	{
		name: 'EFECTO',
		selector: row => row.EFECTO,
	},
	{
		name: 'MOTIVO',
		selector: row => row.MOTIVO,
	},
	{
		name: 'PESO',
		selector: row => row.PESO,
	},
	{
		name: 'GRUPO',
		selector: row => row.GRUPO,
	},
	{
		name: 'CONTACTO',
		selector: row => row.CONTACTO,
	},
	{
		name: 'OBSERVACION',
		selector: row => row.OBSERVACION,
	},
	{
		name: 'NUMCONTACTO',
		selector: row => row.NUMCONTACTO,
	},
	{
		name: 'GESTOR',
		selector: row => row.GESTOR,
	},
	{
		name: 'SUCURSAL',
		selector: row => row.SUCURSAL,
	},
	{
		name: 'PISOS',
		selector: row => row.PISOS,
	},
	{
		name: 'MONTO',
		selector: row => row.MONTO,
	},
	{
		name: 'FECHA',
		selector: row => row.FECHA,
	},
  {
		name: 'ASESOR',
		selector: row => row.ASESOR,
	},
]

export const Importacion = () => {

  // const [registers, setRegisters] = useState([]);
  const dispatch = useDispatch();
  const registers = useSelector(state => state.registers.registers);

  const readExcel = file => {
    const promise = new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsArrayBuffer(file);
        fileReader.onload = e => {
          const bufferArray = e.target.result;
          
          const wb = XLSX.read(bufferArray, {type: 'buffer', raw: true}); //cellDates:true, dateNF:'mm/dd/yyyy;@',

            const wsname = wb.SheetNames[0];
          
            const ws = wb.Sheets[wsname];

            const data = XLSX.utils.sheet_to_json(ws);

            resolve(data);
        };
        fileReader.onerror = (err => { 
          console.log('error')
            reject(err);
        })
    });

    promise.then(data => {
        console.log(data);
        dispatch(setRegisters(data));
    })
};

const paginationOptions = {
  rowsPerPageText: 'Filas por página',
  rangeSeparatorText: 'de',
  selectAllRowsItem: true,
  selectAllRowsItemText: 'Todos',
};


  return (
    <div>
        <h1 className='importacion-title'>Importar base</h1>
        <div>
          <label htmlFor="base" className='importacion__label'>Seleccione archivo</label>
          <input type="file" name="base" id="base" onChange={e => {
            const file = e.target.files[0];
            readExcel(file);
        }} />
        </div>
        {registers.length ? (
          <h3>
            Total de registros: {registers.length}
          </h3>
          ) : ''
        }
        <DataTable
					columns={columns}
					data={registers}
					pagination
					paginationComponentOptions={paginationOptions}
					fixedHeader
					fixedHeaderScrollHeight='600px'
					title="Registros:"
				/>
    </div>
  )
}
