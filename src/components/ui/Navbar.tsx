import { useDispatch, useSelector } from 'react-redux';
import { startLogOut } from '../../actions/auth';
export const Navbar = () => {
	const dispatch = useDispatch();
	const { name } = useSelector((state) => (state as any).auth);
	const handleLogout = () => {
		dispatch(startLogOut());
	};
	return (
		<div className="navbar navbar-dark bg-dark mb-4">
			<span className="navbar-brand">{name}</span>
			<button className="btn btn-outline-danger" onClick={handleLogout}>
				<i className="fas fa-sign-out-alt"></i>
				<span> Exit</span>
			</button>
		</div>
	);
};
