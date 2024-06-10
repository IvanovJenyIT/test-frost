import { TERMO, THERMISTOR_DEPTH } from '../../../constants/constants';
import { useData } from '../../../hooks/useData';
import { IThermistorChain } from '../../../types/table';
import Spinner from 'react-bootstrap/Spinner';

import { createColumnHelper, ColumnDef } from '@tanstack/react-table';
import { useEffect, useState } from 'react';
import DateFilter from '../DataPicker/DateFilter';
import Table from '../Table/Table';

const columnHelper = createColumnHelper<IThermistorChain>();

const defaultColumns: ColumnDef<IThermistorChain>[] = [
  {
    accessorFn: (row) => row.time,
    id: 'time',
    header: 'Дата и время измерения',
    cell: ({ row }) => {
      const date = new Date(row.original.time);
      return (
        <div className="bg-[#e6cdd0] border border-solid border-[#808080]">
          {date.toLocaleDateString() +
            ' ' +
            date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      );
    },
    enablePinning: true,
    size: 250,
  },
  {
    accessorFn: (row) => row.averageTemperature,
    id: 'averageTemperature',
    header: 'Те',
    cell: ({ row }) => (
      <div className="bg-[#c04046] text-white">
        {row.original.averageTemperature.toFixed(2)}
      </div>
    ),
    size: 100,
    enableSorting: false,
  },
  columnHelper.group({
    header: 'Глубина, м',
    columns: [
      ...THERMISTOR_DEPTH.map((number) => {
        return columnHelper.accessor((row) => row.data[number.toString()], {
          id: number.toString(),
          header: () => (
            <span className="bg-[#d5e6de]">{number.toString()}</span>
          ),
          cell: ({ row }) => (
            <div
              style={{
                backgroundColor: Boolean(
                  row.original.data[number.toString()]?.value.toFixed(2)
                )
                  ? '#dc7e83'
                  : '#dfdfdf',
                color: '#ffffff',
              }}
            >
              {row.original.data[number.toString()]?.value.toFixed(2) || '-'}
            </div>
          ),
          size: 50,
          enableSorting: false,
        });
      }),
    ],
  }),
  {
    accessorFn: (row) => row.criticalTemperature,
    header: 'Te max',
    size: 180,
    enableSorting: false,
  },
];

function ThermistorChain() {
  const {
    data: dataFetched,
    isLoading,
    isSuccess,
  } = useData<IThermistorChain[]>(TERMO);

  const [data, setData] = useState<IThermistorChain[]>([]);
  const [columns] = useState(() => [...defaultColumns]);

  useEffect(() => {
    if (dataFetched) setData(dataFetched);
  }, [isSuccess]);

  return (
    <>
      {isLoading && <Spinner animation="border" variant="primary" />}
      {isSuccess && (
        <div className="p-2">
          <h1 className="text-4xl">Термокоса</h1>

          <DateFilter<IThermistorChain[]>
            setData={setData}
            dataFetched={dataFetched}
          />

          <Table columns={columns} data={data} />
        </div>
      )}
    </>
  );
}

export default ThermistorChain;
