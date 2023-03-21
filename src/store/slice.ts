import { createSlice } from '@reduxjs/toolkit';
import { getCurrentWeather, getForecastDataForFiveDays } from '~/store/action';
import { CoordType, ForecastType } from '~/store/models/models';

export type InitialStateType = {
  coord: CoordType | null;
  temp: number;
  humidity: number;
  icon: string;
  wind: number;
  forecastData: ForecastType[] | null;
  message: string;
  cityName: string;
};
const initialState: InitialStateType = {
  coord: null,
  temp: 0,
  humidity: 0,
  icon: '',
  wind: 0,
  forecastData: null,
  message: '',
  cityName: '',
};

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {},
  extraReducers: {
    [getCurrentWeather.fulfilled.toString()]: (state: InitialStateType, action) => ({
      ...state,
      ...{
        coord: action.payload.coord,
        temp: action.payload.main.temp,
        humidity: action.payload.main.humidity,
        icon: action.payload.weather[0].icon,
        wind: action.payload.wind.speed,
        message: '',
      },
    }),
    [getCurrentWeather.rejected.toString()]: (state: InitialStateType, action) => ({
      ...state,
      ...{
        message: action.payload.message,
      },
    }),
    [getForecastDataForFiveDays.fulfilled.toString()]: (state: InitialStateType, action) => ({
      ...state,
      forecastData: action.payload,
      cityName: action.payload[0].city,
    }),
  },
});

export default weatherSlice.reducer;
