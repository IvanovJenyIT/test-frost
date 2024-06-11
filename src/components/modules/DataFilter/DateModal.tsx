import { Calendar } from 'react-date-range';
import { ru } from 'date-fns/locale';
import { Modal, Button } from 'react-bootstrap';

interface IModalProps {
  show: boolean;
  onHide: () => void;
  date: Date | null;
  handleDate: (date: Date) => void;
  title: string;
}

function DateModal({ show, onHide, date, handleDate, title }: IModalProps) {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="flex justify-center items-center">
        <Calendar date={date || new Date()} onChange={handleDate} locale={ru} />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Закрыть
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default DateModal;
