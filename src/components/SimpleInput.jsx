import useInput from '../hooks/use-input';

const emailValidationString =
	/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const SimpleInput = props => {
	const {
		value: enteredName,
		setTouched: setNameIsTouched,
		isValid: enteredNameIsValid,
		hasError: nameHasError,
		inputBlurHandler: nameInputBlurHandler,
		inputChangeHandler: nameInputChangeHandler,
		reset: resetNameInput,
	} = useInput(value => value !== '');

	const {
		value: enteredEmail,
		setTouched: setEmailIsTouched,
		isValid: enteredEmailIsValid,
		hasError: emailHasError,
		inputBlurHandler: emailInputBlurHandler,
		inputChangeHandler: emailInputChangeHandler,
		reset: resetEmailInput,
	} = useInput(value => value.match(emailValidationString));

	let formIsValid = false;
	if (enteredNameIsValid && enteredEmailIsValid) {
		formIsValid = true;
	}

	function formSubmissionHandler(e) {
		e.preventDefault();

		setEmailIsTouched();
		setNameIsTouched();
		if (!enteredNameIsValid || !enteredEmailIsValid) return;

		resetNameInput();
		resetEmailInput();
	}
	const nameInputClasses = nameHasError
		? 'form-control invalid'
		: 'form-control';
	const emailInputClasses = emailHasError
		? 'form-control invalid'
		: 'form-control';
	return (
		<form onSubmit={formSubmissionHandler}>
			<div className={nameInputClasses}>
				<label htmlFor='name'>Your Name</label>
				<input
					value={enteredName}
					onChange={nameInputChangeHandler}
					onBlur={nameInputBlurHandler}
					type='text'
					id='name'
				/>
			</div>

			{nameHasError && <p className='error-text'>Name must not be empty.</p>}
			<div className={emailInputClasses}>
				<label htmlFor='email'>Your Name</label>
				<input
					value={enteredEmail}
					onChange={emailInputChangeHandler}
					onBlur={emailInputBlurHandler}
					type='email'
					id='email'
				/>
			</div>

			{emailHasError && <p className='error-text'>Enter Correct Email.</p>}

			<div className='form-actions'>
				<button type='submit'>Submit</button>
			</div>
		</form>
	);
};

export default SimpleInput;
