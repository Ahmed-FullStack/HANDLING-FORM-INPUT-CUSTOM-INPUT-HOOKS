import { useReducer } from 'react';

const ACTIONS = {
	INPUT_VALUE_CHANE: 'INPUT_VALUE_CHANGE',
	INPUT_BLUR: 'INPUT_BLUR',
	RESET_INPUT: 'RESET_INPUT',
};

const initialInputState = {
	value: '',
	isTouched: false,
};

function inputStateReducer(state, action) {
	switch (action.type) {
		case ACTIONS.INPUT_VALUE_CHANE:
			return { value: action.value, isTouched: state.isTouched };
		case ACTIONS.INPUT_BLUR:
			return { value: state.value, isTouched: true };
		case ACTIONS.RESET_INPUT:
			return initialInputState;

		default:
			return initialInputState;
	}
}

export default function useInput(validateInput) {
	const [inputState, dispatchInput] = useReducer(
		inputStateReducer,
		initialInputState
	);

	const isValid = validateInput(inputState.value);
	const hasError = !isValid && inputState.isTouched;

	function inputBlurHandler(event) {
		dispatchInput({ type: ACTIONS.INPUT_BLUR });
	}
	function inputChangeHandler(e) {
		const { value } = e.target;
		dispatchInput({ type: ACTIONS.INPUT_VALUE_CHANE, value });
	}
	function reset() {
		dispatchInput({ type: ACTIONS.RESET_INPUT });
	}

	return {
		value: inputState.value,
		isValid,
		hasError,
		inputBlurHandler,
		inputChangeHandler,
		setTouched: inputBlurHandler,
		reset,
	};
}
