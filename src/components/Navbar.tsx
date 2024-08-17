import React from 'react';
import { MdWbSunny, MdMyLocation, MdOutlineLocationOn } from 'react-icons/md';
import SearchBox from './SearchBox';
type Props = {};

// Заглушка для onChange
const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
  // Нічого не робимо
};

// Заглушка для onSubmit
const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
  // Нічого не робимо
  event.preventDefault(); // Зазвичай для обробки форми потрібно запобігти її стандартному поведінці
};

export default function Navbar({}: Props) {
	return (
		<nav className='shadow-sm sticky top-0 left-0 z-50 bg-white'>
			<div className='h-[80px] w-full flex justify-between items-center max-w-7xl px-3 mx-auto'>
				<div className='flex items-center justify-center gap-2'>
					<h2 className='text-gray-500 text-3xl'>Weather</h2>
					<MdWbSunny className='text-3xl mt-1 text-yellow-300' />
				</div>
				<section className='flex gap-2 items-center'>
					<MdMyLocation className='text-2xl text-gray-400 hover:opacity-80 cursor-pointer' />
					<MdOutlineLocationOn className='text-3xl' />
					<p className='tetx-slate-900/80 text-sm'>Ukraine</p>
					<div>
						<SearchBox
							value='string'
							onChange={handleChange}
							onSubmit={handleSubmit}
						/>
					</div>
				</section>
			</div>
		</nav>
	);
}
