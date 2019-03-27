import React from 'react';

function TableHeader(props) {
  const { columns } = props;
  const ths = [<th key="no">No.</th>];
  ths.push(...columns.map(({ name }) => <th key={name}>{name}</th>));

  return (
    <thead className='thead-light'>
      <tr>
        { ths }
      </tr>
    </thead>
  )
}

export default TableHeader;
