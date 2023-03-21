type DatasetsType = { label: string; data: number[] };
type ChartDataType = {
  labels: string[];
  datasets: DatasetsType[];
};
export type PropTypes = {
  chartData: ChartDataType;
};
