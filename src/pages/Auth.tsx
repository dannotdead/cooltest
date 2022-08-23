import React from 'react';
import styled from 'styled-components';
import Form from '../components/Form';

const FormContainer = styled.div`
	display: flex;
  align-items: center;
  justify-content: center;
	height: 80vh;
`

const Auth = () => {
	return (
		<FormContainer>
			<Form />
		</FormContainer>
	);
};

export default Auth;