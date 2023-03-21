import { WeatherType } from '~/store/models/models';

export type PropTypes = {
  weatherData: WeatherType;
  isCurrent?: boolean;
  measureType: string;
};
