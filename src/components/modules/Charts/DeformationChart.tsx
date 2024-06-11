import Plot from 'react-plotly.js';
import { Spinner } from 'react-bootstrap';
import { DEFORMATION_TREND } from '../../../constants/constants';
import { useData } from '../../../hooks/useData';
import { IDeformationChart } from '../../../types/charts';
import { IDeformationControl } from '../../../types/table';

interface IDeformationChartProps {
  deformationControlData: IDeformationControl[] | undefined;
}

function DeformationChart({ deformationControlData }: IDeformationChartProps) {
  const { data, isLoading, isSuccess } =
    useData<IDeformationChart[]>(DEFORMATION_TREND);

  const trendX = data?.flatMap((i) =>
    Object.keys(i.points).map((date) => new Date(date))
  );
  const trendY = data?.flatMap((i) => Object.values(i.points));

  const deltaX = deformationControlData?.map((item) => new Date(item.time));
  const deltaY = deformationControlData
    ?.map((item) => item.data.delta)
    .filter((item): item is number => item !== undefined);

  const maxDeltaY = deformationControlData?.map((item) => item.criticalDelta);
  const minDeltaY = deformationControlData?.map(
    (item) => item.criticalDelta * -1
  );

  const endOfOperationMax = maxDeltaY ? Math.max(...maxDeltaY) : undefined;
  const endOfOperationMin = minDeltaY ? Math.min(...minDeltaY) : undefined;

  const endOfOperationX = data?.flatMap((i) => [
    i.criticalEndDate,
    i.criticalEndDate,
  ]);

  const endOfOperationY =
    endOfOperationMax && endOfOperationMin
      ? [endOfOperationMin, endOfOperationMax]
      : undefined;

  return (
    <>
      {isLoading && <Spinner animation="border" variant="primary" />}
      {isSuccess && (
        <Plot
          data={[
            {
              x: trendX,
              y: trendY,
              type: 'scatter',
              mode: 'lines+markers',
              marker: { color: 'red' },
              name: 'Тренд &#916;',
            },
            {
              type: 'scatter',
              x: deltaX,
              y: deltaY,
              mode: 'lines+markers',
              name: '&#916;',
            },
            {
              type: 'scatter',
              x: deltaX,
              y: maxDeltaY,
              mode: 'lines+markers',
              name: 'Макс. &#916;, м',
              line: {
                dash: 'dash',
                width: 4,
              },
            },
            {
              type: 'scatter',
              x: deltaX,
              y: minDeltaY,
              mode: 'lines+markers',
              name: 'Мин. &#916;, м',
              line: {
                dash: 'dash',
                width: 4,
              },
            },
            {
              type: 'scatter',
              x: endOfOperationX,
              y: endOfOperationY,
              mode: 'lines+markers',
              name: 'Конец эксплуатации',
            },
          ]}
          layout={{
            width: 800,
            height: 640,
            title: 'Смещения по деформационной марку: dm5',
          }}
        />
      )}
    </>
  );
}

export default DeformationChart;
