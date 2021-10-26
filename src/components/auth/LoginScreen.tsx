import './login.css';
import { useForm } from '../../hooks/useForm';
import { useDispatch } from 'react-redux';
import { startLogin, startRegister } from '../../actions/auth';
import Swal from 'sweetalert2';

export const LoginScreen = () => {
	const dispatch = useDispatch();

	const [formLoginValues, handleLoginInputChange] = useForm({
		lemail: 'mario3@mail.com',
		lpassword: '123123',
	});

	const [formRegisterValues, handleRegisterInputChange] = useForm({
		remail: 'mario5@mail.com',
		rpassword1: '123123',
		rpassword2: '123123',
		rname: 'mario',
	});

	const { remail, rpassword1, rpassword2, rname } = formRegisterValues;

	const { lemail, lpassword } = formLoginValues;

	const handleLogin = (e: any) => {
		e.preventDefault();
		dispatch(startLogin(lemail, lpassword));
	};

	const handleRegister = (e: any) => {
		e.preventDefault();
		if (rpassword1 !== rpassword2) {
			return Swal.fire('Error', 'Password must match', 'error');
		}

		dispatch(startRegister(remail, rpassword1, rname));
	};

	return (
		<div className="container login-container">
			<div className="row">
				<div className="col-md-6 login-form-1">
					<h3>Ingreso</h3>
					<form onSubmit={handleLogin}>
						<div className="form-group">
							<input
								type="text"
								className="form-control"
								placeholder="Correo"
								name="lemail"
								value={lemail}
								onChange={handleLoginInputChange}
							/>
						</div>
						<div className="form-group">
							<input
								type="password"
								className="form-control"
								placeholder="Contraseña"
								name="lpassword"
								value={lpassword}
								onChange={handleLoginInputChange}
							/>
						</div>
						<div className="form-group">
							<input type="submit" className="btnSubmit" value="Login" />
						</div>
					</form>
				</div>

				<div className="col-md-6 login-form-2">
					<h3>Registro</h3>
					<form onSubmit={handleRegister}>
						<div className="form-group">
							<input
								type="text"
								className="form-control"
								placeholder="Nombre"
								name="rname"
								value={rname}
								onChange={handleRegisterInputChange}
							/>
						</div>
						<div className="form-group">
							<input
								type="email"
								className="form-control"
								placeholder="Correo"
								name="remail"
								value={remail}
								onChange={handleRegisterInputChange}
							/>
						</div>
						<div className="form-group">
							<input
								type="password"
								className="form-control"
								placeholder="Contraseña"
								name="rpassword1"
								value={rpassword1}
								onChange={handleRegisterInputChange}
							/>
						</div>

						<div className="form-group">
							<input
								type="password"
								className="form-control"
								placeholder="Repita la contraseña"
								name="rpassword2"
								value={rpassword2}
								onChange={handleRegisterInputChange}
							/>
						</div>

						<div className="form-group">
							<input type="submit" className="btnSubmit" value="Crear cuenta" />
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};
