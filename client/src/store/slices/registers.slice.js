import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	registers: [],
};

const registersSlice = createSlice({
	initialState,
	name: 'registers',
	reducers: {
		getRegisters(state, action) {
			return state.registers;
		},
		setRegisters(state, action) {
			state.registers = action.payload.registers;
		},
	},
});

export const registersActions = registersSlice.actions;
export default registersSlice.reducer;
