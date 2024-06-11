import Spinner from 'react-bootstrap/Spinner';
import { DEFORMATION } from '../../../constants/constants';
import { useData } from '../../../hooks/useData';
import { IDeformationControl } from '../../../types/table';
import { Button } from 'react-bootstrap';

import { ColumnDef } from '@tanstack/react-table';
import { useEffect, useState } from 'react';
import DateFilter from '../DataFilter/DateFilter';
import Table from '../Table/Table';
import DeformationChart from '../Charts/DeformationChart';

const defaultColumns: ColumnDef<IDeformationControl>[] = [
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
    accessorFn: (row) => row.data.value,
    header: 'Отметка, м',
    cell: ({ row }) => <span>{row.original.data.value?.toFixed(4)}</span>,
    size: 250,
    enableSorting: false,
  },
  {
    accessorFn: (row) => row.data.delta,
    id: 'delta',
    header: () => <span>&#916;, м</span>,
    cell: ({ row }) => <span>{row.original.data.delta?.toFixed(4)}</span>,
    size: 250,
    enableSorting: false,
  },
  {
    accessorFn: (row) => row.criticalDelta,
    id: 'criticalDelta',
    header: () => <span>&#916; max и min, м</span>,
    size: 250,
    enableSorting: false,
  },
  {
    accessorFn: (row) => row.sensorType,
    id: 'sensorType ',
    header: 'Тип объекта',
    size: 250,
    enableSorting: false,
  },
  {
    accessorFn: (row) => row.status,
    header: 'Статус измерений',
    size: 250,
    enableSorting: false,
  },
];

function DeformationControl() {
  const {
    data: dataFetched,
    isLoading,
    isSuccess,
  } = useData<IDeformationControl[]>(DEFORMATION);

  const [data, setData] = useState<IDeformationControl[]>([]);
  const [columns] = useState(() => [...defaultColumns]);

  const [showChart, setShowChart] = useState(false);

  useEffect(() => {
    if (dataFetched) setData(dataFetched);
  }, [isSuccess]);

  return (
    <>
      {isLoading && <Spinner animation="border" variant="primary" />}
      {isSuccess && (
        <div className="p-2">
          <h1 className="text-4xl">Деформационная марка</h1>

          <DateFilter<IDeformationControl>
            setData={setData}
            dataFetched={dataFetched}
          />

          <Table columns={columns} data={data} />
        </div>
      )}

      <Button
        variant="primary"
        onClick={() => setShowChart(!showChart)}
        className="my-2"
      >
        {showChart ? 'Скрыть график' : 'Показать график'}
      </Button>

      {showChart && <DeformationChart deformationControlData={dataFetched} />}
    </>
  );
}

export default DeformationControl;
