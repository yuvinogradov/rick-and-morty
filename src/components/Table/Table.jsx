import React from 'react';
import './Table.css';

export default function Table({ tableRows }) {
  return (
    <table className="table">
      <tbody>
        {tableRows.map((row) => (
          <tr key={row.rowName}>
            <th>{row.rowName}</th>
            <td>{row.rowValue}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
