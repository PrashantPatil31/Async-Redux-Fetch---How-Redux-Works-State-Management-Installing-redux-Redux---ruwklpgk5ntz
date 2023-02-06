import { configureStore, createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "hot-news",
  initialState: {
    articlesNum: 0,
    articles: [],
  },
  reducers: {
    set(state, actions) {
      let temp = state.articles;
      state.articles = temp.concat(actions.payload.articles);
      state.articlesNum = actions.payload.num;
    },
    setNum(state, actions) {
      state.articlesNum = actions.payload.num;
    },
  },
});

const store = configureStore({
  reducer: {
    hotNews: slice.reducer,
  },
});

export default store;

export const actions = slice.actions;
