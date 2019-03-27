import React from 'react';
import TableHeader from './TableHeader';
import TableBody from './TableBody';

function DataTable (props) {
  const { data, columns } = props;
  return (
    <table>
      <TableHeader columns={columns} />
      <TableBody data={data} columns={columns} />
    </table>
  )
}

export default DataTable;
