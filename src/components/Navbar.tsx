'use client';

import React, { useState } from 'react';
import { MdWbSunny, MdMyLocation, MdOutlineLocationOn } from 'react-icons/md';
import SearchBox from './SearchBox';
import axios from 'axios';
import { loadingCityAtom, placeAtom } from '@/app/atom';
import { useAtom } from 'jotai';
import SuggestionsBox from './SuggestionBox';

type Props = { location?: string };

export default function Navbar({ location }: Props) {
	const [city, setCity] = useState('');
	const [error, setError] = useState('');

	const [suggestions, setSuggestions] = useState<string[]>([]);
	const [showSuggestions, setShowSuggestions] = useState(false);
	const [place, setPlace] = useAtom(placeAtom);
	const [_, setLoadingCityAtom] = useAtom(loadingCityAtom);

	async function handleChange(value: string) {
		setCity(value);
		if (value.length >= 3) {
			try {
				const response = await axios.get(
					`https://api.openweathermap.org/data/2.5/find?q=${value}&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}`,
				);
				const suggestions = response.data.list.map((item: any) => item.name);
				setSuggestions(suggestions);
				setError('');
				setShowSuggestions(true);
			} catch (error) {
				setSuggestions([]);
				setShowSuggestions(false);
			}
		} else {
			setSuggestions([]);
			setShowSuggestions(false);
		}
	}

	function handleSuggestionClick(value: string) {
		setCity(value);
		setShowSuggestions(false);
	}

	function handleSubmitSearch(e: React.FormEvent<HTMLFormElement>) {
		setLoadingCityAtom(true);
		e.preventDefault();
		if (suggestions.length == 0) {
			setError('Location is not found');
			setLoadingCityAtom(false);
		} else {
			setError('');
			setTimeout(() => {
				setLoadingCityAtom(false);
				setPlace(city);
				setShowSuggestions(false);
			}, 5000);
		}
	}

	function handleCurrentLocation() {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(async position => {
				const { latitude, longitude } = position.coords;
				try {
					setLoadingCityAtom(true);
					const response = await axios.get(
						`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}`,
					);
					setTimeout(() => {
						setLoadingCityAtom(false);
						setPlace(response.data.name);
					}, 5000);
				} catch (error) {
					setLoadingCityAtom(false);
				}
			});
		}
	}

	return (
		<>
			<nav className='shadow-sm sticky top-0 left-0 z-50 bg-white'>
				<div className='h-[80px] w-full flex justify-between items-center max-w-7xl px-3 mx-auto'>
					<div className='flex items-center justify-center gap-2'>
						<h2 className='text-gray-500 text-3xl'>Weather</h2>
						<MdWbSunny className='text-3xl mt-1 text-yellow-300' />
					</div>
					<section className='flex gap-2 items-center'>
						<MdMyLocation
							title='Your Current Location'
							onClick={handleCurrentLocation}
							className='text-2xl text-gray-400 hover:opacity-80 cursor-pointer'
						/>
						<MdOutlineLocationOn className='text-3xl' />
						<p className='tetx-slate-900/80 text-sm'>{location}</p>
						<div className='relative hidden md:flex'>
							<SearchBox
								value={city}
								onChange={e => handleChange(e.target.value)}
								onSubmit={handleSubmitSearch}
							/>
							<SuggestionsBox
								{...{
									showSuggestions,
									suggestions,
									handleSuggestionClick,
									error,
								}}
							/>
						</div>
					</section>
				</div>
			</nav>
			<section className='flex max-w-7xl px-3 md:hidden'>
				<div className='relative'>
					<SearchBox
						value={city}
						onChange={e => handleChange(e.target.value)}
						onSubmit={handleSubmitSearch}
					/>
					<SuggestionsBox
						{...{
							showSuggestions,
							suggestions,
							handleSuggestionClick,
							error,
						}}
					/>
				</div>
			</section>
		</>
	);
}
