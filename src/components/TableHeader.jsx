import React from 'react';

function TableHeader(props) {
  const { columns } = props;
  const headers = columns.map(({ name }) => <th key={name}>{name}</th>);

  return (
    <thead>
      <tr>
        { headers }
      </tr>
    </thead>
  )
}

export default TableHeader;
