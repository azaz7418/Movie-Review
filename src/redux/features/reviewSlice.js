import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  reviews: [],
};

export const reviewSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {
    setReviews: (state, { payload }) => {
      const { movieId, review } = payload;
      state.reviews.push({ id: movieId, review: review });
    },
  },
});

export const { setReviews } = reviewSlice.actions;
const reviewReducer = reviewSlice.reducer;
export default reviewReducer;
