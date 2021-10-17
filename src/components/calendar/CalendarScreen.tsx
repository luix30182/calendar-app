import moment from 'moment';

import { Navbar } from '../ui/Navbar';

import { Calendar, momentLocalizer, View } from 'react-big-calendar';
import { messages } from '../../helpers/calendar-messages-es';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'moment/locale/es-mx';
import { CalendarEvent } from './CalendarEvent';
import { useState } from 'react';
import { CalendarModal } from './CalendarModal';
import { useDispatch, useSelector } from 'react-redux';
import { uiOpenModal } from '../../actions/ui';
import { eventSetActive, eventClearActiveEvent } from '../../actions/events';
import { AddNewFab } from '../ui/AddNewFab';
import { DeleteEventFab } from '../ui/DeleteEventFab';

moment.locale('es');
const localizer = momentLocalizer(moment);

export const CalendarScreen = () => {
	const dispatch = useDispatch();
	const { events, activeEvent } = useSelector(
		(state) => (state as any).calendar
	);

	const [lastView, setlastView] = useState<View>(
		(localStorage.getItem('lastView') as View) || 'month'
	);

	const onDoubleClick = (e: any) => {
		dispatch(uiOpenModal());
	};
	const onSelectEvent = (e: any) => {
		dispatch(eventSetActive(e));
	};
	const onViewChange = (e: any) => {
		localStorage.setItem('lastView', e);
		setlastView(e);
	};

	const eventStyleGetter = (
		title: any,
		start: Date,
		end: Date,
		isSelected: boolean
	) => {
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

	const onSelectSlot = (e: any) => {
		dispatch(eventClearActiveEvent());
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
				components={{ event: CalendarEvent }}
				onDoubleClickEvent={onDoubleClick}
				onSelectEvent={onSelectEvent}
				onView={onViewChange}
				// @ts-ignore
				view={lastView}
				selectable={true}
				onSelectSlot={onSelectSlot}
			/>
			<AddNewFab />
			{activeEvent && <DeleteEventFab />}
			<CalendarModal />
		</div>
	);
};
