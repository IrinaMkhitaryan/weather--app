import { Box, Card, CardContent, Typography } from '@mui/material';
import { PropTypes } from '~/components/WeatherContent/PropTypes';
import { MEASURE_Type } from '~/constants';

const WeatherContent = (props: PropTypes) => {
  const { weatherData, isCurrent = false, measureType } = props;

  return (
    <Card>
      <CardContent>
        <Typography variant={isCurrent ? 'h5' : 'caption'} component='div'>
          {isCurrent ? 'CURRENT WEATHER' : weatherData.date}
        </Typography>
        <Box display='flex'>
          <img
            src={`https://openweathermap.org/img/w/${weatherData.icon}.png`}
            alt=''
            height={isCurrent ? '200px' : '100px'}
          />
          <Box display='flex' alignItems='center' ml={1}>
            <Typography variant={isCurrent ? 'h4' : 'caption'} component='div'>
              {measureType === MEASURE_Type.CELSIUS
                ? `${Math.round(weatherData.temp - 273.15)}°C`
                : `${Math.round(((weatherData.temp - 273.15) * 9) / 5 + 32)}°F`}
            </Typography>
          </Box>
          {isCurrent ? (
            <Box display='flex' alignItems='center' ml={2}>
              <Box>
                <Box>{`humidity:${weatherData.humidity}%`}</Box>
                <Box>{`wind:${weatherData.wind}km/h`}</Box>
              </Box>
            </Box>
          ) : (
            <></>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};
export default WeatherContent;
