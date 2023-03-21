import axios, { AxiosError } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { API_KEY } from '~/constants';
import { CoordType, ListType } from '~/store/models/models';

const path = 'https://api.openweathermap.org/data/2.5';

export const getCurrentWeather = createAsyncThunk('weather', async (city: string, thunkAPI) => {
  try {
    const { data } = await axios.get(`${path}/weather?q=${city}&appid=${API_KEY}`);
    return thunkAPI.fulfillWithValue(data);
  } catch (error) {
    return thunkAPI.rejectWithValue((error as AxiosError).response?.data);
  }
});

export const getForecastDataForFiveDays = createAsyncThunk(
  'forecast',
  async (body: CoordType, thunkAPI) => {
    try {
      const { data } = await axios.get(
        `${path}/forecast?lat=${body.lat}&lon=${body.lon}&appid=${API_KEY}`,
      );
      const shortData = data.list.map((item: ListType) => {
        return {
          date: item.dt_txt,
          temp: item.main.temp,
          icon: item.weather[0].icon,
          city: data.city.name,
        };
      });
      return thunkAPI.fulfillWithValue(shortData);
    } catch (error) {
      console.log(error);
    }
  },
);
