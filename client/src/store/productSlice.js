import { createSlice } from '@reduxjs/toolkit'

const initialValue = {
    allCategory: [],
    allSubCategory: [],
    product: []
}
export const productSlice = createSlice({
    name: 'product',
    initialState: initialValue,
    reducers: {
        setAllCategory: (state, action) => {
            console.log("action from setAllCategory ==> ", action)
            state.allCategory = [...action.payload]
        },
        setAllSubCategory: (state, action) => {

            state.allSubCategory = [...action.payload]
        },

    }
})
// Action creators are generated for each case reducer function
export const { setAllCategory,setAllSubCategory } = productSlice.actions
export default productSlice.reducer