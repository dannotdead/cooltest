import React, {useEffect} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import type {FormData} from '../components/Form';
import styled from 'styled-components';
import {Paths, Token} from '../config/enum';

const ProfileBody = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	height: 80vh;
`

const UserName = styled.div`
	text-align: center;
	font-size: 40px;
	
	span {
		font-weight: 700;
	}
`

const LogOutButton = styled.input`
	outline: none;
	border: none;
	margin-top: 50px;
	padding: 20px 72px;
	font-size: 18px;
	font-weight: 700;
	background-color: #F5F5F5;
	border-radius: 8px;
	cursor: pointer;
`

const Profile = () => {
	const navigation = useNavigate()
	const location = useLocation()
	const state = location.state as FormData || JSON.parse(localStorage.getItem(Token.Key) || '{}')

	useEffect(() => {
		if (!state.login) {
			navigation(Paths.Login)
		}
	}, [])

	const handleLogOut = () => {
		localStorage.clear()
		navigation(Paths.Login)
	}

	return (
		<ProfileBody>
			<UserName>
				Здравствуйте, <span>{state.login}</span>
			</UserName>

			<LogOutButton type='button' value='Выйти' onClick={() => handleLogOut()}/>
		</ProfileBody>
	);
};

export default Profile;