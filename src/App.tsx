import { Container } from 'react-bootstrap';
import DeformationControl from './components/modules/Deformation/DeformationControl';
import ThermistorChain from './components/modules/Thermistor/ThermistorChain';

function App() {
  return (
    <Container>
      <ThermistorChain />
      <hr className="my-4" />
      <DeformationControl />
    </Container>
  );
}

export default App;
