import React from 'react';
import Container from './Container';
import WeatherDetails, { WeatherDetailsProps } from './WeatherDetails';
import WeatherIcon from './WeatherIcon';
import { convertKelvinToCelsius } from '@/utils/convertKelvinToCelsius';

export interface ForecastWeatherDetailProps extends WeatherDetailsProps {
	weatherIcon: string;
	date: string;
	day: string;
	temp: number;
	feelsLike: number;
	tempMin: number;
	tempMax: number;
  description: string;
}

export default function ForecastWeatherDetail(
	props: ForecastWeatherDetailProps,
) {
	const {
		weatherIcon = '02d',
		date = '18.08',
		day = 'Sunday',
		temp,
		feelsLike,
		tempMin,
		tempMax,
		description = "No description",
	} = props;
	return (
		<Container>
			{/* left section */}
			<section className=' flex gap-4 items-center px-4'>
				<div className='flex flex-col gap-1 items-center'>
					<WeatherIcon iconname={weatherIcon} />
					<p>{date}</p>
					<p className='text-sm'>{day}</p>
				</div>

				<div className='flex flex-col px-4 items-center gap-1'>
					<span className='text-5xl'>
						{convertKelvinToCelsius(temp ?? 0)}°C
					</span>
					<p className='text-xs space-x-1 whitespace-nowrap'>
						<span>Feels like</span>
						<span>{convertKelvinToCelsius(feelsLike ?? 0)}°C</span>
					</p>
					<p className='text-xs space-x-2'>
						<span>
							{convertKelvinToCelsius(tempMin ?? 304.58)}
							°C ↓{' '}
						</span>
						<span>
							{' '}
							{convertKelvinToCelsius(tempMax ?? 304.58)}
							°C ↑
						</span>
					</p>
					<p className='capitalize'>{description}</p>
				</div>
			</section>
			{/* right section */}
			<section className='overflow-x-auto flex justify-between gap-4 px-4 w-full pr-10'>
				<WeatherDetails {...props} />
			</section>
		</Container>
	);
}
