export type CoordType = { lon: number; lat: number };
export type ForecastType = { date: string; temp: number; icon: string };
export type WeatherType = {
  date?: string;
  temp: number;
  icon: string;
  humidity?: number;
  wind?: number;
};
export type ListType = {
  clouds: { all: number };
  dt: number;
  dt_txt: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    sea_level: number;
  };
  pop: number;
  sys: { pod: string };
  visibility: number;
  weather: { id: number; main: string; description: string; icon: string }[];
  wind: { speed: number; deg: number; gust: number };
};
