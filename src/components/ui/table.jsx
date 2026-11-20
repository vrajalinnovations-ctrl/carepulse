import React from 'react';

const Table = ({
  columns = [],
  data = [],
  className = '',
  emptyMessage = 'No records found',
  rowClassName = '',
  headerClassName = '',
  cellPadding = 'px-4 py-3.5',
  rowKey = 'id',
  onRowClick,
}) => {
  const getAlignClass = (align) => {
    switch (align) {
      case 'right':
        return 'text-right';
      case 'center':
        return 'text-center';
      default:
        return 'text-left';
    }
  };

  return (
    <div className={`w-full overflow-hidden ${className}`}>
      <div className="w-full overflow-x-auto">
        <table className="w-full text-sm text-left border-collapse">
          <thead>
            <tr
              className={`border-b border-gray-200 dark:border-gray-800 bg-gray-50/75 dark:bg-gray-900/50 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 ${headerClassName}`}
            >
              {columns.map((col, idx) => (
                <th
                  key={`${col.key || idx}`}
                  className={`${cellPadding} ${getAlignClass(col.align)} ${col.className || ''}`}
                >
                  {col.title}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200 dark:divide-gray-800 text-gray-700 dark:text-gray-300">
            {data.length > 0 ? (
              data.map((row, rowIndex) => (
                <tr
                  key={row[rowKey] ?? rowIndex}
                  onClick={() => onRowClick?.(row)}
                  className={`transition-colors hover:bg-gray-50/80 dark:hover:bg-gray-800/50 ${
                    onRowClick ? 'cursor-pointer' : ''
                  } ${rowClassName}`}
                >
                  {columns.map((col, colIndex) => (
                    <td
                      key={`${col.key || colIndex}`}
                      className={`${cellPadding} ${getAlignClass(col.align)} ${col.className || ''}`}
                    >
                      {col.render ? col.render(row[col.key], row, rowIndex) : row[col.key]}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-4 py-12 text-center text-sm text-gray-500 dark:text-gray-400"
                >
                  {emptyMessage}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
