import React from 'react';

function TableBody(props) {
  const { data, columns } = props;
  const trs = data.map((item) => {
    const tds = columns.map(({ key }) => <td key={key}>{ item[key] }</td>);
    const trKey = Object.values(item).toString();

    return (
      <tr key={trKey}>
        { tds }
      </tr>
    );
  });

  return (
    <tbody>
      { trs }
    </tbody>
  )
}

export default TableBody;
