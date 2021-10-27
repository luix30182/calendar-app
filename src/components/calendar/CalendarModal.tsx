import moment from 'moment';
import { useEffect, useState } from 'react';
//@ts-ignore
import DateTimePicker from 'react-datetime-picker';

import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { uiCloseModal } from '../../actions/ui';
import {
	eventStartAddNew,
	eventClearActiveEvent,
	eventStartUpdate,
} from '../../actions/events';

const customStyles = {
	content: {
		top: '50%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		marginRight: '-50%',
		transform: 'translate(-50%, -50%)',
	},
};

Modal.setAppElement('#root');

const now = moment().minutes(0).seconds(0);
const nowPlusOne = now.clone().add(1, 'hours');

const initEvent = {
	title: '',
	notes: '',
	start: now.toDate(),
	end: nowPlusOne.toDate(),
};

export const CalendarModal = () => {
	const dispatch = useDispatch();

	const { modalOpen } = useSelector((state) => (state as any).ui);
	const { activeEvent } = useSelector((state) => (state as any).calendar);

	const [dateStart, setDateStart] = useState(now.toDate());
	const [dateEnd, setDateEnd] = useState(nowPlusOne.toDate());
	const [titleValid, setTitleValid] = useState(true);

	const [formValues, setFormValues] = useState(initEvent);

	const { notes, title, start, end } = formValues;

	useEffect(() => {
		if (activeEvent) {
			setFormValues(activeEvent);
		} else {
			setFormValues(initEvent);
		}
	}, [activeEvent, setFormValues]);

	const handleInputChange = ({ target }: { target: any }) => {
		setFormValues({
			...formValues,
			[target.name]: target.value,
		});
	};

	const closeModal = () => {
		setFormValues(initEvent);
		dispatch(uiCloseModal());
		dispatch(eventClearActiveEvent());
	};

	const handleStartDateChange = (e: any) => {
		setDateStart(e);
		setFormValues({
			...formValues,
			start: e,
		});
	};

	const handleEndDateChange = (e: any) => {
		setDateEnd(e);
		setFormValues({
			...formValues,
			end: e,
		});
	};

	const handleSubmitForm = (e: any) => {
		e.preventDefault();
		const momentStart = moment(start);
		const momentEnd = moment(end);

		if (momentStart.isSame(momentEnd)) {
			return Swal.fire(
				'Error',
				'La fecha fin debe ser mayor a la de inicio',
				'error'
			);
		}

		if (title.trim().length === 0) {
			setTitleValid(false);
		}

		if (activeEvent) {
			dispatch(eventStartUpdate(formValues));
		} else {
			dispatch(eventStartAddNew(formValues));
		}

		setTitleValid(true);
		closeModal();
	};

	return (
		<Modal
			isOpen={modalOpen}
			onRequestClose={closeModal}
			style={customStyles}
			className="modal"
			closeTimeoutMS={200}
			overlayClassName="modal-fondo"
		>
			<h1> {activeEvent ? 'Edit event' : 'New event'} </h1>
			<hr />
			<form className="container" onSubmit={handleSubmitForm}>
				<div className="form-group">
					<label>Fecha y hora inicio</label>
					<DateTimePicker
						onChange={handleStartDateChange}
						value={dateStart}
						className="form-control"
					/>
				</div>

				<div className="form-group">
					<label>Fecha y hora fin</label>
					<DateTimePicker
						onChange={handleEndDateChange}
						value={dateEnd}
						minDate={dateStart}
						className="form-control"
					/>
				</div>

				<hr />
				<div className="form-group">
					<label>Titulo y notas</label>
					<input
						type="text"
						className={`form-control ${titleValid ? 'is-valid' : 'is-invalid'}`}
						placeholder="Título del evento"
						name="title"
						autoComplete="off"
						value={title}
						onChange={handleInputChange}
					/>
					<small id="emailHelp" className="form-text text-muted">
						Una descripción corta
					</small>
				</div>

				<div className="form-group">
					<textarea
						className="form-control"
						placeholder="Notas"
						rows={5}
						name="notes"
						value={notes}
						onChange={handleInputChange}
					></textarea>
					<small id="emailHelp" className="form-text text-muted">
						Información adicional
					</small>
				</div>

				<button type="submit" className="btn btn-outline-primary btn-block">
					<i className="far fa-save"></i>
					<span> Guardar</span>
				</button>
			</form>
		</Modal>
	);
};
