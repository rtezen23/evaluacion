import React from 'react'
import * as XLSX from 'xlsx';
import './exportButton.css'

const ExportButton = ({data, filename}) => {

    const handleExport = () => {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(data);

    XLSX.utils.book_append_sheet(wb, ws, "MySheet1");

    XLSX.writeFile(wb, `${filename}.xlsx`)
}

  return (
    <button className='util-export__button' onClick={handleExport}>Exportar registros</button>
  )
}

export default ExportButton