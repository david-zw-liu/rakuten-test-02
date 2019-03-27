import React from 'react';

function TableHeader(props) {
  const { columns } = props;
  const headers = [
    <th key="no">No.</th>,
    ...columns.map(({ name }) => <th key={name}>{name}</th>)
  ];

  return (
    <thead className='thead-light'>
      <tr>
        { headers }
      </tr>
    </thead>
  )
}

export default TableHeader;
