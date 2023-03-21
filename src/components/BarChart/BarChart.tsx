import { Bar } from 'react-chartjs-2';
import { CategoryScale, Chart, registerables } from 'chart.js';
import { PropTypes } from './PropTypes';

const BarChart = (props: PropTypes) => {
  const { chartData } = props;
  Chart.register(CategoryScale);
  Chart.register(...registerables);
  return <Bar data={chartData} />;
};
export default BarChart;
