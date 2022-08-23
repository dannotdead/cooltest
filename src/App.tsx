import React from 'react';
import {Routes, Route, Navigate} from 'react-router-dom';
import Auth from './pages/Auth';
import Profile from './pages/Profile';
import NavBar from './components/NavBar';
import {Paths} from './config/enum';

const App = () => {
	return (
		<>
			<NavBar />
			<Routes>
				<Route path='*' element={<Navigate to={Paths.Login} />} />
				<Route path={Paths.Login} element={<Auth />} />
				<Route path={Paths.Profile} element={<Profile />} />
			</Routes>
		</>
	);
}

export default App;
