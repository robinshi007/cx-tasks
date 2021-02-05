import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
import { differenceInDays } from 'date-fns';
import { default as initState } from './state';

const defaultFilters = {
  filterTerm: '',
  filterRecent: false,
};
const projectSlice = createSlice({
  name: 'project',
  initialState: {
    ...initState,
    filters: defaultFilters,
  },
  reducers: {
    setFilterTerm: (state, action) => {
      state.filters.filterTerm = action.payload;
      return state;
    },
    setFilterRecent: (state, action) => {
      state.filters.filterRecent = action.payload;
      return state;
    },
    setFilterReset: (state, action) => {
      state.filters = defaultFilters;
      return state;
    },
  },
});

export const selectProject = (state) => state.project;
export const selectLists = (state) => state.project.lists;
export const selectFilterTerm = (state) => state.project.filters.filterTerm;
export const selectFilterRecent = (state) => state.project.filters.filterRecent;
//export const selectFilters = (state) => state.project.filters;
export const selectFilteredRecentLists = createSelector(
  [selectLists, selectFilterRecent],
  (lists, recent) => {
    if (recent) {
      return lists.map((list) => {
        const cards = list.cards.filter((card) => {
          return differenceInDays(Date.parse(card.updated_at), new Date()) > -7;
        });
        return { ...list, cards };
      });
    }
    return lists;
  }
);
export const selectFilteredRecentAndTermLists = createSelector(
  [selectFilteredRecentLists, selectFilterTerm],
  (lists, term) => {
    if (term !== '') {
      return lists.map((list) => {
        const cards = list.cards.filter((card) => {
          return card.title.includes(term);
        });
        return { ...list, cards };
      });
    } else {
      return lists;
    }
  }
);

export const { setFilterTerm, setFilterRecent, setFilterReset } = projectSlice.actions;
export default projectSlice.reducer;
