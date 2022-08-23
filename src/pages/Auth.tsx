import React, {useEffect} from 'react';
import styled from 'styled-components';
import Form from '../components/Form';
import {Paths, Token} from '../config/enum';
import {useNavigate} from 'react-router-dom';

const FormContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	height: 80vh;
`

const Auth = () => {
	const navigate = useNavigate()

	useEffect(() => {
		const checkToken = JSON.parse(localStorage.getItem(Token.Key) || '{}')

		if (checkToken.token) {
			navigate(Paths.Profile)
		}
	}, [])

	return (
		<FormContainer>
			<Form />
		</FormContainer>
	);
};

export default Auth;