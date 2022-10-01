import { createSlice } from '@reduxjs/toolkit';

export const showTab = createSlice({
	name: 'showTab',
    initialState: false,
    reducers: {
        setShowTab: (state, action) => {
            return action.payload;
        }
    }
})

export const { setShowTab } = showTab.actions;

export default showTab.reducer;