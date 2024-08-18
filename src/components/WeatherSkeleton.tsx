import Container from './Container';

export default function WeatherSkeleton() {
	return (
		<section className='space-y-4'>
			<div className='space-y-2'>
				{/* Current date skeleton */}
				<div className='flex gap-1 text-2xl items-end'>
					<div className='w-24 h-6 bg-gray-200 animate-pulse rounded'></div>
					<div className='w-32 h-4 bg-gray-200 animate-pulse rounded'></div>
				</div>
				<Container className='gap-10 px-6 items-center'>
					{/* Current temperature skeleton */}
					<div className='flex flex-col px-4'>
						<div className='w-32 h-8 bg-gray-200 animate-pulse rounded'></div>
						<div className='w-32 h-4 bg-gray-200 animate-pulse rounded mt-2'></div>
						<div className='w-48 h-4 bg-gray-200 animate-pulse rounded mt-2'></div>
					</div>
					{/* Time and weather forecast skeleton */}
					<div className='flex gap-10 sm:gap-16 overflow-x-auto w-full justify-between pr-3'>
						{Array.from({ length: 5 }).map((_, index) => (
							<div
								key={index}
								className='flex flex-col justify-between gap-2 items-center text-xs font-semibold'
							>
								<div className='w-12 h-4 bg-gray-200 animate-pulse rounded'></div>
								<div className='w-12 h-12 bg-gray-200 animate-pulse rounded-full'></div>
								<div className='w-12 h-4 bg-gray-200 animate-pulse rounded'></div>
							</div>
						))}
					</div>
				</Container>
			</div>
			{/* Today forecast details skeleton */}
			<div className='flex gap-4'>
				{/* left container skeleton */}
				<Container className='w-fit justify-center flex-col px-4 items-center'>
					<div className='w-32 h-4 bg-gray-200 animate-pulse rounded'></div>
					<div className='w-16 h-16 bg-gray-200 animate-pulse rounded-full mt-2'></div>
				</Container>
				{/* right container skeleton */}
				<Container className='bg-gray-200/80 px-6 gap-4 justify-between overflow-x-auto'>
					<div className='flex flex-col gap-2'>
						<div className='w-32 h-4 bg-gray-200 animate-pulse rounded'></div>
						<div className='w-32 h-4 bg-gray-200 animate-pulse rounded'></div>
						<div className='w-32 h-4 bg-gray-200 animate-pulse rounded'></div>
						<div className='w-32 h-4 bg-gray-200 animate-pulse rounded'></div>
					</div>
				</Container>
			</div>

			{/* 7 days forecast data skeleton */}
			<section className='flex w-full flex-col gap-4'>
				<div className='w-48 h-6 bg-gray-200 animate-pulse rounded'></div>
				{Array.from({ length: 7 }).map((_, index) => (
					<div
						key={index}
						className='flex items-center gap-4 p-4 bg-gray-100 rounded-md'
					>
						<div className='w-24 h-4 bg-gray-200 animate-pulse rounded'></div>
						<div className='w-16 h-16 bg-gray-200 animate-pulse rounded-full'></div>
						<div className='w-32 h-4 bg-gray-200 animate-pulse rounded'></div>
						<div className='w-24 h-4 bg-gray-200 animate-pulse rounded'></div>
					</div>
				))}
			</section>
		</section>
	);
}
