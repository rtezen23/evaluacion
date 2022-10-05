import axios from 'axios';

import { registersActions } from '../slices/registers.slice';
import { errorActions } from '../slices/error.slice';

// const API_URL = `${import.meta.env.VITE_API_URL}api/v1/users/`;

export const setRegisters = (registers) => {
	return async dispatch => {
		try {
			dispatch(registersActions.setRegisters({ registers }));
		} catch (error) {
			dispatch(errorActions.setError({ error: error.response.data }));
		}
	};
};

export const getRegisters = () => {
	return async dispatch => {
		try {
			dispatch(registersActions.getRegisters());
		} catch (error) {
			dispatch(errorActions.setError({ error: error.response.data }));
		}
	};
};
