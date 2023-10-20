import React from "react";
import Link from "next/link";

interface RowData {
  [key: string]: any
}

type TableType = {
  columns: Column[];
  data: RowData[];
};

export type Column = {
  key: string,
  name: string;
  type: "string" | "percent" | "currency" | "link";
  link?: string;
}

type TableHeadType = {
  columns: Column[];
};

type TableRowType = {
  columns: Column[];
  rowData: RowData;
};

export const Table: React.FC<TableType> = ({ columns, data}) => {
  return (
    <div className="fullwidth overflow-auto">
      <table className="border border-slate-400 border-collapse table-auto">
        <TableHead columns={columns} />
        {data.map((item) => (
          <TableRow key='item' columns={columns} rowData={item} />
        ))}
      </table>
    </div>
  )
}

const TableHead: React.FC<TableHeadType> = ({ columns }) => {
  return (
    <thead>
      <tr>
        {columns.map((item) => (
          <th
            key={item.key}
            className="border border-slate-300 border-collapse bg-slate-50 text-left font-semibold p-4 text-slate-900"
          >
            {item.name}
          </th>
        ))}
      </tr>
    </thead>
  )
}

const TableRow: React.FC<TableRowType> = ({ columns, rowData}) => {
  return (
    <tr>
      {columns.map((column) => (
        <td key={column.key} className="border border-slate-300 border-collapse p-4 text-slate-500">
          {rowData.hasOwnProperty(column.key) && <TableCell type={column.type} value={rowData[column.key]} link={rowData?.link} />}
        </td>
      ))}
    </tr>
  )
}

type TableCellType = {
  type: "string" | "percent" | "currency" | "link";
  value: string | number;
  link?: string;
}

const TableCell: React.FC<TableCellType> = ({ type, value, link }) => {
  switch (type) {
    case "percent": {
      const numericValue = typeof value === 'number' ? value : parseFloat(value);
      return <span className={numericValue < 0 ? "text-red-500" : "text-green-500"}>{value}%</span>;
    }
    case "currency": {
      const numericValue = typeof value === 'number' ? value : parseFloat(value);
      return <span className={numericValue < 0 ? "text-red-500" : "text-green-500"}>{value} руб.</span>;
    }
    case "link": {
      return <Link href={`${link}`}><span>{value}</span></Link>;
    }
    default: {
      return <span>{value}</span>;
    }
  }
}
