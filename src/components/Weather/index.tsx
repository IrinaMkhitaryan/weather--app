import { useEffect, useState } from 'react';
import { getCurrentWeather, getForecastDataForFiveDays } from '~/store/action';
import { AppDispatch, RootState } from '~/store/store';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, Grid, MenuItem, Select, TextField, Typography } from '@mui/material';

import WeatherContent from '~/components/WeatherContent/WeatherContent';
import BarChart from '~/components/BarChart/BarChart';
import { MEASURE_Type } from '~/constants';
import { ForecastType } from '~/store/models/models';

const Hello = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [city, setCity] = useState('');
  const [measureType, setMeasureType] = useState(MEASURE_Type.CELSIUS);
  const forecastToday: ForecastType[] = [];
  const forecastArr: ForecastType[] = [];
  const weather = useSelector((state: RootState) => state.weather);
  const { temp, coord, forecastData, message, icon, humidity, wind, cityName } = weather;

  useEffect(() => {
    if (coord) {
      dispatch(getForecastDataForFiveDays(coord));
    }
  }, [coord, dispatch]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { coords } = position;
      dispatch(getForecastDataForFiveDays({ lon: coords.longitude, lat: coords.latitude }));
    });
  }, [dispatch]);

  useEffect(() => {
    setCity(cityName);
    if (cityName) {
      dispatch(getCurrentWeather(cityName));
    }
  }, [cityName, dispatch]);

  const getCurrentWeatherByCity = () => {
    dispatch(getCurrentWeather(city));
  };

  forecastData?.forEach((item) => {
    if (+item.date.slice(8, 10) === new Date().getDate()) {
      forecastToday.push(item);
    } else {
      forecastArr.push(item);
    }
  });

  const forecastDays = [];
  for (let i = 0; i < forecastArr.length; i += 8) {
    const chunk = forecastArr.slice(i, i + 8);
    forecastDays.push(chunk);
  }
  forecastDays.unshift(forecastToday);
  const chartData = {
    labels: forecastDays.map((item) => {
      return item[0]?.date;
    }),
    datasets: [
      {
        label: '',
        data: forecastDays.map((item) => {
          return item[0]?.temp;
        }),
      },
    ],
  };

  return (
    <>
      <Box mx={4} my={3} display='flex' justifyContent='center'>
        <Box>
          <TextField
            error={!!message}
            value={city}
            id='standard-basic'
            label='City Name'
            variant='standard'
            placeholder='Search'
            helperText={message}
            onChange={(event) => setCity(event.target.value)}
          />
        </Box>
        <Box ml={2} display='flex' alignItems='flexEnd'>
          <Button variant='contained' disabled={!city} onClick={getCurrentWeatherByCity}>
            Search
          </Button>
        </Box>
        <Box ml={2}>
          <Select
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            value={measureType}
            label='Age'
            onChange={(ev) => setMeasureType(ev.target.value)}
          >
            <MenuItem value={MEASURE_Type.CELSIUS}>C°</MenuItem>
            <MenuItem value={MEASURE_Type.FAHRENHEIT}>F°</MenuItem>
          </Select>
        </Box>
      </Box>
      {temp ? (
        <Box mx={4}>
          <Grid container justifyContent='center'>
            <Grid item xs={12} sm={10} md={6} lg={4}>
              <WeatherContent
                weatherData={{ icon, temp, humidity, wind }}
                isCurrent={true}
                measureType={measureType}
              />
            </Grid>
          </Grid>
        </Box>
      ) : (
        <></>
      )}
      {forecastDays[0].length ? (
        <Box width={{ xs: 2 / 3, sm: 2 / 3, md: 1 / 2 }} mx={4}>
          <Typography variant='h5' component='div'>
            Forecast Chart
          </Typography>
          <BarChart chartData={chartData} />
        </Box>
      ) : (
        <></>
      )}

      <Box mx={4}>
        {forecastDays.map((item, index) => (
          <Grid
            container
            spacing={2}
            my={3}
            key={index}
            justifyContent={{ xs: 'center', sm: 'center', md: 'start' }}
          >
            {item.map((it) => (
              <Grid item xs={11} sm={6} md={1.5} key={it.date}>
                <WeatherContent weatherData={it} measureType={measureType} />
              </Grid>
            ))}
          </Grid>
        ))}
      </Box>
    </>
  );
};

export default Hello;
