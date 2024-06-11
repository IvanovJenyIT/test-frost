import { Dispatch, SetStateAction, useState } from 'react';
import { Button, Form, Toast } from 'react-bootstrap';
import DateModal from './DateModal';

interface IProps<T> {
  setData: Dispatch<SetStateAction<T[]>>;
  dataFetched: T[] | undefined;
}

type DateType = 'start' | 'end' | null;

function DateFilter<T>({ setData, dataFetched }: IProps<T>) {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [currentDateType, setCurrentDateType] = useState<DateType>(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const handleDate = (date: Date) => {
    if (currentDateType === 'start') {
      setStartDate(date);
    } else if (currentDateType === 'end') {
      setEndDate(date);
    }
    setCurrentDateType(null);
  };

  const filterData = () => {
    if (startDate && endDate && dataFetched) {
      const filteredData = dataFetched.filter((item: any) => {
        const itemDate = new Date(item.time);
        return itemDate >= startDate && itemDate <= endDate;
      });

      setData(filteredData as T[]);
    } else {
      setToastMessage('Начальная или конечная дата не выбрана');
      setShowToast(true);
    }
  };

  const resetData = () => {
    if (dataFetched !== undefined) {
      setData(dataFetched);
      setStartDate(null);
      setEndDate(null);
    }
  };

  return (
    <div className="flex items-center justify-between gap-5 mt-4">
      <Form.Control
        type="text"
        id="startDate"
        placeholder="Выберите начальную дату"
        value={startDate ? startDate.toLocaleDateString() : ''}
        onClick={() => setCurrentDateType('start')}
      />

      <Form.Control
        type="text"
        id="endDate"
        placeholder="Выберите конечную дату"
        value={endDate ? endDate.toLocaleDateString() : ''}
        onClick={() => setCurrentDateType('end')}
      />
      <DateModal
        show={currentDateType !== null}
        onHide={() => setCurrentDateType(null)}
        date={currentDateType === 'start' ? startDate : endDate}
        handleDate={handleDate}
        title={
          currentDateType === 'start'
            ? 'Выберите начальную дату'
            : 'Выберите конечную дату'
        }
      />

      <Button variant="primary" onClick={filterData}>
        Фильтровать
      </Button>
      <Button value="info" onClick={resetData}>
        Сбросить
      </Button>

      <Toast
        onClose={() => setShowToast(false)}
        show={showToast}
        delay={3000}
        className="position-absolute top-50 start-50 translate-middle"
        autohide
      >
        <Toast.Header>
          <strong className="mr-auto">Предупреждение</strong>
        </Toast.Header>
        <Toast.Body>{toastMessage}</Toast.Body>
      </Toast>
    </div>
  );
}

export default DateFilter;
