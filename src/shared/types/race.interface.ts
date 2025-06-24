export interface Flight {
	code: string
	city: string
	time: string
}

export interface Race {
	flightNumber: string
	bookingNumber: string
	logo: string
	airline: string
	departure: Flight
	arrival: Flight
	aircraft: string
	status: 'Scheduled' | 'In Air' | 'Delayed' | 'On Time' | 'Boarding'
	distance: string
	duration: string
}
