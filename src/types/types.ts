export interface WeatherData {
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
