'use client';

import Container from '@/components/Container';
import ForecastWeatherDetail from '@/components/ForecastWeatherDetail';
import Navbar from '@/components/Navbar';
import WeatherDetails from '@/components/WeatherDetails';
import WeatherIcon from '@/components/WeatherIcon';
import { convertKelvinToCelsius } from '@/utils/convertKelvinToCelsius';
import { convertWindSpeed } from '@/utils/convertWindSpeed';
import { getDayOrNightIcon } from '@/utils/getDayOrNigthIcon';
import { metersToKilometers } from '@/utils/metersToKilometers';
import axios from 'axios';
import { format, fromUnixTime, parseISO } from 'date-fns';
import { useQuery } from 'react-query';

interface WeatherData {
	cod: string;
	message: number;
	cnt: number;
	list: WeatherListItem[];
	city: City;
}

interface WeatherListItem {
	dt: number; // Unix timestamp
	main: MainWeatherInfo;
	weather: WeatherCondition[];
	clouds: Clouds;
	wind: Wind;
	visibility: number;
	pop: number; // Probability of precipitation
	rain: Rain;
	sys: System;
	dt_txt: string; // Date and time of the forecast
}

interface MainWeatherInfo {
	temp: number; // Temperature in Kelvin
	feels_like: number; // Feels like temperature in Kelvin
	temp_min: number; // Minimum temperature in Kelvin
	temp_max: number; // Maximum temperature in Kelvin
	pressure: number; // Atmospheric pressure in hPa
	sea_level: number; // Atmospheric pressure at sea level in hPa
	grnd_level: number; // Atmospheric pressure at ground level in hPa
	humidity: number; // Humidity percentage
	temp_kf: number; // Temperature coefficient
}

interface WeatherCondition {
	id: number; // Weather condition id
	main: string; // Group of weather parameters
	description: string; // Weather condition description
	icon: string; // Weather icon id
}

interface Clouds {
	all: number; // Cloudiness percentage
}

interface Wind {
	speed: number; // Wind speed in meter/sec
	deg: number; // Wind direction in degrees
	gust?: number; // Wind gust in meter/sec (optional)
}

interface Rain {
	'3h': number; // Rain volume for the last 3 hours in mm
}

interface System {
	pod: string; // Part of the day (day or night)
}

interface City {
	id: number;
	name: string;
	coord: Coordinates;
	country: string;
	population: number;
	timezone: number; // Timezone offset in seconds
	sunrise: number; // Sunrise time in Unix timestamp
	sunset: number; // Sunset time in Unix timestamp
}

interface Coordinates {
	lat: number; // Latitude
	lon: number; // Longitude
}

export default function Home() {
	const { isLoading, error, data } = useQuery<WeatherData>(
		'repoData',
		async () => {
			const { data } = await axios.get(
				`https://api.openweathermap.org/data/2.5/forecast?q=Poltava&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}&cnt=8`,
			);
			return data;
		},
	);

	console.log(data);

	const firstData = data?.list[0];

	if (isLoading)
		return (
			<div className='flex items-center min-h-screen justify-center'>
				<p className='animate-bounce'>Loading...</p>
			</div>
		);

	return (
		<div className='flex flex-col gap-4 bg-gray-100 min-h-screen'>
			<Navbar />
			<main className='px-3 max-w-7xl mx-auto flex flex-col gap-9 w-full pb-10 pt-4'>
				{/* today data */}
				<section className='space-y-4'>
					<div className='space-y-2'>
						{/* Current date */}
						<div className='flex gap-1 text-2xl  items-end'>
							<p>{format(parseISO(firstData?.dt_txt ?? ''), 'EEEE')}</p>
							<p className='text-lg'>
								({format(parseISO(firstData?.dt_txt ?? ''), 'dd.MM.yyyy')})
							</p>
						</div>
						<Container className='gap-10 px-6 items-center'>
							{/* Current temperature */}
							<div className='flex flex-col px-4'>
								<span className='text-5xl'>
									{convertKelvinToCelsius(firstData?.main.temp ?? 304.58)}°C
								</span>
								<p className='text-xs space-x-1 whitespace-nowrap'>
									<span>Feels like</span>
									<span>
										{convertKelvinToCelsius(firstData?.main.feels_like ?? 0)}
										°C
									</span>
								</p>
								<p className='text-xs space-x-2'>
									<span>
										{convertKelvinToCelsius(firstData?.main.temp_min ?? 304.58)}
										°C ↓{' '}
									</span>
									<span>
										{' '}
										{convertKelvinToCelsius(firstData?.main.temp_max ?? 304.58)}
										°C ↑
									</span>
								</p>
							</div>
							{/* Time and weather forecast */}
							<div className='flex gap-10 sm:gap-16 overflow-x-auto w-full justify-between pr-3'>
								{data?.list.map((el, index) => (
									<div
										key={index}
										className='flex flex-col justify-between gap-2 items-center text-xs font-semibold'
									>
										<p className='whitespace-nowrap'>
											{format(parseISO(el.dt_txt), 'h:mm a')}
										</p>
										{/* Wether icon */}
										{/* <WeatherIcon iconname={el?.weather[0].icon}></WeatherIcon> */}
										<WeatherIcon
											iconname={getDayOrNightIcon(
												el?.weather[0].icon,
												el.dt_txt,
											)}
										></WeatherIcon>
										<p className=''>
											{convertKelvinToCelsius(el?.main.temp ?? 304.58)}°C
										</p>
									</div>
								))}
							</div>
						</Container>
					</div>
					{/* Today forecast details */}
					<div className='flex gap-4'>
						{/* left container */}
						<Container className='w-fit justify-center flex-col px-4 items-center'>
							<p className='capitalize text-center'>
								{firstData?.weather[0].description}
							</p>
							<WeatherIcon
								iconname={getDayOrNightIcon(
									firstData?.weather[0].icon ?? '',
									firstData?.dt_txt ?? '',
								)}
							></WeatherIcon>
						</Container>
						{/* right container */}
						<Container className='bg-yellow-300/80 px-6 gap-4 justify-between overflow-x-auto'>
							<WeatherDetails
								airPressure={`${firstData?.main.pressure} hPa`}
								visability={metersToKilometers(firstData?.visibility ?? 1000)}
								humidity={`${firstData?.main.humidity}%`}
								windSpeed={convertWindSpeed(firstData?.wind.speed ?? 1.64)}
								sunrise={format(
									fromUnixTime(data?.city.sunrise ?? 1702949452),
									'H:mm',
								)}
								sunset={format(
									fromUnixTime(data?.city.sunset ?? 1724000050),
									'H:mm',
								)}
							/>
						</Container>
					</div>
				</section>
				{/* 7 days forecast data */}
				<section className='flex w-full flex-col gap-4'>
					<p className='text-2xl'>Forecast (7 days)</p>
					<ForecastWeatherDetail />
				</section>
			</main>
		</div>
	);
}
