import { CSSProperties, useState } from 'react';
import {
  Column,
  flexRender,
  ColumnDef,
  useReactTable,
  SortingState,
  getSortedRowModel,
  getCoreRowModel,
} from '@tanstack/react-table';

interface ITableProps<T> {
  data: T[];
  columns: ColumnDef<T>[];
}

const getCommonPinningStyles = <T extends object>(
  column: Column<T>
): CSSProperties => {
  const isPinned = column.getIsPinned();
  const isLastLeftPinnedColumn =
    isPinned === 'left' && column.getIsLastColumn('left');
  const isFirstRightPinnedColumn =
    isPinned === 'right' && column.getIsFirstColumn('right');

  return {
    boxShadow: isLastLeftPinnedColumn
      ? '-4px 0 4px -4px gray inset'
      : isFirstRightPinnedColumn
        ? '4px 0 4px -4px gray inset'
        : undefined,
    left: isPinned === 'left' ? `${column.getStart('left')}px` : undefined,
    right: isPinned === 'right' ? `${column.getAfter('right')}px` : undefined,
    opacity: isPinned ? 0.95 : 1,
    position: isPinned ? 'sticky' : 'relative',
    width: column.getSize(),
    zIndex: isPinned ? 1 : 0,
  };
};

function Table<T extends object>({ columns, data }: ITableProps<T>) {
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnPinning: { left: ['time', 'averageTemperature'] },
    },
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    debugTable: true,
    debugHeaders: true,
    debugColumns: true,
    columnResizeMode: 'onChange',
  });

  return (
    <div className="border overflow-x-scroll max-w-full relative max-h-60 border-solid border-[lightgray] mt-4">
      <table
        style={{
          width: table.getTotalSize(),
        }}
        className="border-spacing-0 text-center border-separate"
      >
        <thead className="bg-[lightgray] sticky z-[2] m-0 top-0">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                const { column } = header;

                return (
                  <th
                    key={header.id}
                    colSpan={header.colSpan}
                    style={{ ...getCommonPinningStyles(column) }}
                    className="bg-[#d3e1fd] font-[bold] h-[30px] relative text-center px-1 py-0.5 border-b-[#d3e1fd] border-b border-solid"
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    {header.isPlaceholder ? null : (
                      <div
                        className={
                          header.column.getCanSort()
                            ? 'cursor-pointer select-none'
                            : ''
                        }
                        onClick={header.column.getToggleSortingHandler()}
                        title={
                          header.column.getCanSort()
                            ? header.column.getNextSortingOrder() === 'asc'
                              ? 'Sort ascending'
                              : header.column.getNextSortingOrder() === 'desc'
                                ? 'Sort descending'
                                : 'Clear sort'
                            : undefined
                        }
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {{
                          asc: ' 🔼',
                          desc: ' 🔽',
                        }[header.column.getIsSorted() as string] ?? null}
                      </div>
                    )}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => {
                const { column } = cell;
                return (
                  <td
                    key={cell.id}
                    style={{ ...getCommonPinningStyles(column) }}
                    className="bg-slate-200 p-0"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
