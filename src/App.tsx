import React from 'react';
import {Routes, Route, Navigate} from 'react-router-dom';
import Auth from './pages/Auth';
import Profile from './pages/Profile';
import NavBar from './components/NavBar';

const App = () => {
	return (
		<>
			<NavBar />
			<Routes>
				<Route path='/' element={<Navigate to='/login' />} />
				<Route path='/login' element={<Auth />} />
				<Route path='/profile' element={<Profile />} />
				<Route path='*' element={<Auth />} />
			</Routes>
		</>
	);
}

export default App;
