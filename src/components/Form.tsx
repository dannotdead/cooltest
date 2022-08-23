import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import styled from 'styled-components';
import {useNavigate} from 'react-router-dom';
import {Paths, Token} from '../config/enum';

export type FormData = {
	login: string,
	password: string
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
	
	&:disabled {
    background-color: #99A9FF;
    cursor: default;
	}
`

const ServerErrorBody = styled.span`
  display: flex;
	align-items: center;
  padding: 20px;
  background-color: #F5E9E9;
  border: 1px solid #E26F6F;
  border-radius: 8px;
	font-size: 14px;
	margin-top: 10px;
	
	&::before {
		content: '!';
    display: flex;
    justify-content: center;
    align-items: center;
		width: 20px;
    height: 20px;
    background-color: #FFC8C8;
    color: #EE6565;
		border-radius: 50%;
		margin-right: 14px;
  }
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
	const navigate = useNavigate()

	const [checked, setChecked] = useState(false)
	const [errorMessageServer, setErrorMessageServer] = useState('')
	const [isLoading, setIsLoading] = useState(false)

	const handleCheckbox = () => {
		setChecked(prevState => !prevState)
	}

	const onSubmit = handleSubmit(data => {
		setIsLoading(true)

		setTimeout(() => {
			if (data.login !== 'steve.jobs@example.com') {
				setErrorMessageServer(`Пользователя ${data.login} не существует`)
			} else if (data.password !== 'password') {
				setErrorMessageServer('Неверный пароль')
			} else {
				setErrorMessageServer('')
				navigate(Paths.Profile, {
					state: data
				})

				if (checked) {
					localStorage.setItem(Token.Key, JSON.stringify({
						token: Token.Value,
						login: data.login
					}))
				}
			}

			setIsLoading(false)
		}, 1500)
	})

	return (
		<FormBody onSubmit={onSubmit}>
			{errorMessageServer && <ServerErrorBody>{errorMessageServer}</ServerErrorBody>}

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

			<InputSubmit type='submit' value='Войти' disabled={isLoading} />
		</FormBody>
	);
};

export default Form;