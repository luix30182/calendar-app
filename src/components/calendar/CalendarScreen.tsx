import moment from 'moment';

import { Navbar } from '../ui/Navbar';

import { Calendar, momentLocalizer } from 'react-big-calendar';
import { messages } from '../../helpers/calendar-messages-es';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'moment/locale/es-mx';

moment.locale('es');
const localizer = momentLocalizer(moment);
const events = [
	{
		title: 'Birthday Sly',
		start: moment().toDate(),
		end: moment().add(2, 'hours').toDate(),
	},
];

export const CalendarScreen = () => {
	const eventStyleGetter = (
		title: any,
		start: Date,
		end: Date,
		isSelected: boolean
	) => {
		console.log(title, start, end, isSelected);
		const style = {
			backgroundColor: '#367CF7',
			borderRadius: '0px',
			opacity: 0.8,
			display: 'block',
			color: 'white',
		};
		return {
			style,
		};
	};

	return (
		<div className="calendar-screen">
			<Navbar />
			<Calendar
				localizer={localizer}
				events={events}
				startAccessor="start"
				endAccessor="end"
				messages={messages}
				// @ts-ignore
				eventPropGetter={eventStyleGetter}
			/>
		</div>
	);
};
