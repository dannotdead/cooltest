import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import styled from 'styled-components';

type FormData = {
	login: string,
	password: string,
	rememberPassword: boolean
}

type CheckboxBody = {
	checked: boolean
}

type InputTheme = {
	borderColor: 'transparent' | '#E26F6F'
}

const FormBody = styled.form`
	display: flex;
	flex-direction: column;
  width: 640px;
	margin: auto;
	padding: 20px;
`

const Label = styled.label`
	margin-bottom: 10px;
	margin-top: 20px;
	font-size: 16px;
`

const Input = styled.input<InputTheme>`
  outline: none;
  padding: 20px;
  font-size: 16px;
  background-color: #F5F5F5;
  color: #232323;
  border-radius: 8px;
  border: 1px solid ${props => props.borderColor};
`

const ErrorMessage = styled.span`
  margin-top: 8px;
  font-size: 14px;
  color: #E26F6F;
`

const CheckboxContainer = styled.div`
  display: flex;
	align-items: center;
	margin-top: 20px;
`

const CheckboxBody = styled.div<CheckboxBody>`
  display: flex;
  cursor: pointer;
	margin-right: 14px;
	
	&::before {
    content: '';
    height: 20px;
    width: 20px;
    background-color: transparent;
    border-radius: 4px;
    border: 1px solid black;
	}

  &::after {
    content: '';
    position: absolute;
    width: 14px;
    height: 14px;
    margin: 4px;
    border-radius: 2px;
    background-color: #4A67FF;
	  visibility: ${props => props.checked ? 'visible' : 'hidden'};
  }
`

const CheckboxLabel = styled.label`
	cursor: pointer;
	font-size: 16px;
`

const InputSubmit = styled.input`
	outline: none;
	border: none;
  padding: 20px;
  margin-top: 40px;
  font-size: 18px;
  font-weight: 700;
  background-color: #4A67FF;
  color: white;
  cursor: pointer;
  border-radius: 8px;
`

const Form = () => {
	const {
		register,
		formState: {
			errors
		},
		handleSubmit
	} = useForm<FormData>({
		mode: 'onBlur'
	})

	const [checked, setChecked] = useState(false)

	const handleCheckbox = () => {
		setChecked(prevState => !prevState)
	}

	const onSubmit = handleSubmit(data => {
		console.log(checked)
		console.log(data)
	})

	return (
		<FormBody onSubmit={onSubmit}>
			<Label>Логин</Label>
			<Input
				borderColor={errors.login?.message ? '#E26F6F' : 'transparent'}
				{...register('login', {
					required: 'Обязательное поле'
				})}
			/>
			<ErrorMessage>{errors.login?.message}</ErrorMessage>
			<Label>Пароль</Label>
			<Input
				type='password'
				borderColor={errors.password?.message ? '#E26F6F' : 'transparent'}
				{...register('password', {
					required: 'Обязательное поле'
				})}
			/>
			<ErrorMessage>{errors.password?.message}</ErrorMessage>

			<CheckboxContainer>
				<CheckboxBody checked={checked} onClick={() => handleCheckbox()} />
				<CheckboxLabel onClick={() => handleCheckbox()}>Запомнить пароль</CheckboxLabel>
			</CheckboxContainer>

			<InputSubmit type='submit' value='Войти' />
		</FormBody>
	);
};

export default Form;