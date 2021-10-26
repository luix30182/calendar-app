import { BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import { LoginScreen } from '../components/auth/LoginScreen';
import { CalendarScreen } from '../components/calendar/CalendarScreen';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { startChecking } from '../actions/auth';
import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';

export const AppRouter = () => {
	const { checking, uid } = useSelector((state) => (state as any).auth);

	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(startChecking());
	}, [dispatch]);

	if (checking) {
		return <h5>Wait...</h5>;
	}

	return (
		<Router>
			<div>
				<Switch>
					<PublicRoute
						exact
						path="/login"
						component={LoginScreen}
						isAuthenticated={!!uid}
					/>
					<PrivateRoute
						exact
						path="/"
						component={CalendarScreen}
						isAuthenticated={!!uid}
					/>
					<Redirect to="/" />
				</Switch>
			</div>
		</Router>
	);
};
