import useInput from '../hooks/use-input';
const emailValidationString =
	/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const isNotEmpty = value => value.trim() !== '';
const isEmail = value =>
	value.trim() !== '' && value.match(emailValidationString);

const BasicForm = props => {
	const {
		value: enteredFirstName,
		isValid: firstNameIsValid,
		hasError: firstNameInputHasError,
		inputChangeHandler: firstNameInputChangeHandler,
		inputBlurHandler: firstNameInputBlurHandler,
		setTouched: setFirstNameTouched,
		reset: resetFirstNameInput,
	} = useInput(isNotEmpty);
	const {
		value: enteredLastName,
		isValid: lastNameIsValid,
		hasError: lastNameInputHasError,
		inputChangeHandler: lastNameInputChangeHandler,
		inputBlurHandler: lastNameInputBlurHandler,
		setTouched: setLastNameTouched,
		reset: resetLastNameInput,
	} = useInput(isNotEmpty);
	const {
		value: enteredEmail,
		isValid: emailIsValid,
		hasError: emailInputHasError,
		inputChangeHandler: emailInputChangeHandler,
		inputBlurHandler: emailInputBlurHandler,
		setTouched: setEmailTouched,
		reset: resetEmailInput,
	} = useInput(isEmail);
	let formIsValid = false;

	const formIsValidStatement =
		firstNameIsValid && lastNameIsValid && emailIsValid;

	if (formIsValidStatement) {
		formIsValid = true;
	}

	function formSubmissionHandler(e) {
		e.preventDefault();

		setFirstNameTouched();
		setLastNameTouched();
		setEmailTouched();

		if (!formIsValid) return;

		resetFirstNameInput();
		resetLastNameInput();
		resetEmailInput();
	}

	const firstNameInputClasses = firstNameInputHasError
		? 'form-control invalid'
		: 'form-control';
	const lastNameInputClasses = lastNameInputHasError
		? 'form-control invalid'
		: 'form-control';
	const emailInputClasses = emailInputHasError
		? 'form-control invalid'
		: 'form-control';

	return (
		<form onSubmit={formSubmissionHandler}>
			<div className='control-group'>
				<div className={firstNameInputClasses}>
					<label htmlFor='name'>First Name</label>
					<input
						type='firstname'
						id='name'
						value={enteredFirstName}
						autoComplete='off'
						onChange={firstNameInputChangeHandler}
						onBlur={firstNameInputBlurHandler}
					/>
					{firstNameInputHasError && (
						<p className='error-text'>Name Field must not be empty.</p>
					)}
				</div>
				<div className={lastNameInputClasses}>
					<label htmlFor='name'>Last Name</label>
					<input
						type='text'
						id='lastname'
						value={enteredLastName}
						autoComplete='off'
						onChange={lastNameInputChangeHandler}
						onBlur={lastNameInputBlurHandler}
					/>
					{lastNameInputHasError && (
						<p className='error-text'>Name Field must not be empty.</p>
					)}
				</div>
			</div>
			<div className={emailInputClasses}>
				<label htmlFor='name'>E-Mail Address</label>
				<input
					type='text'
					id='email'
					value={enteredEmail}
					autoComplete='off'
					onChange={emailInputChangeHandler}
					onBlur={emailInputBlurHandler}
				/>
				{emailInputHasError && <p className='error-text'>Enter Valid Email.</p>}
			</div>
			<div className='form-actions'>
				<button type='submit'>Submit</button>
			</div>
		</form>
	);
};

export default BasicForm;
