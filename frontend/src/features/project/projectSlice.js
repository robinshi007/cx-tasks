import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
import { differenceInDays } from 'date-fns';
import { default as initState } from './state';
import { orderBy } from 'lodash';

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
    updateListDragged: (state, { type, payload }) => {
      //console.log(type, payload);
      if (payload.source.listIndex === payload.destination.listIndex) {
        return;
      }
      let newOrder = 0;
      const step = 100;
      // update the order in the same list
      const { previousOrder, nextOrder } = payload.position;
      if (previousOrder === 0 && nextOrder !== 0) {
        newOrder = nextOrder - step;
      } else if (previousOrder !== 0 && nextOrder === 0) {
        newOrder = previousOrder + step;
      } else if (previousOrder !== 0 && nextOrder !== 0) {
        newOrder = Math.floor((previousOrder + nextOrder) / 2);
      }
      // if (sourceListIndex !== destListIndex) {
      const newIndex = state.lists.findIndex((c) => c.id === payload.position.listId);
      if (newIndex >= 0) {
        const [newList] = state.lists.splice(newIndex, 1);
        newList.order = newOrder;
        state.lists.splice(payload.destination.listIndex, 0, newList);
      }
      return state;
    },
    updateCardDragged: (state, { type, payload }) => {
      //console.log(type, payload);
      if (
        payload.source.listIndex === payload.destination.listIndex &&
        payload.source.cardIndex === payload.destination.cardIndex
      ) {
        return;
      }
      const sourceListIndex = state.lists.findIndex(
        (o) => o.id.toString() === payload.source.listIndex
      );
      const destListIndex = state.lists.findIndex(
        (o) => o.id.toString() === payload.destination.listIndex
      );
      if (sourceListIndex >= 0 && destListIndex >= 0) {
        let newOrder = 0;
        const step = 100;
        // update the order in the same list
        const { previousCardOrder, nextCardOrder } = payload.position;
        if (previousCardOrder === 0 && nextCardOrder !== 0) {
          newOrder = nextCardOrder - step;
        } else if (previousCardOrder !== 0 && nextCardOrder === 0) {
          newOrder = previousCardOrder + step;
        } else if (previousCardOrder !== 0 && nextCardOrder !== 0) {
          newOrder = Math.floor((previousCardOrder + nextCardOrder) / 2);
        }
        // if (sourceListIndex !== destListIndex) {
        const newCardIndex = state.lists[sourceListIndex].cards.findIndex(
          (c) => c.id === payload.position.cardId
        );
        if (newCardIndex >= 0) {
          const [newCard] = state.lists[sourceListIndex].cards.splice(newCardIndex, 1);
          newCard.order = newOrder;
          state.lists[destListIndex].cards.splice(payload.destination.cardIndex, 0, newCard);
        }
        // } else {
        // }
      }
      return state;
    },
    setFilterTerm: (state, action) => {
      //console.log(action.type, action.payload);
      state.filters.filterTerm = action.payload;
      return state;
    },
    setFilterRecent: (state, action) => {
      state.filters.filterRecent = action.payload;
      return state;
    },
    setFilterReset: (state) => {
      state.filters = defaultFilters;
      return state;
    },
  },
});

export const selectProject = (state) => state.project;
export const selectLists = (state) => {
  //return state.project.lists;
  return orderBy(state.project.lists, (c) => c.order, 'asc');
};
export const selectFilterTerm = (state) => state.project.filters.filterTerm;
export const selectFilterRecent = (state) => state.project.filters.filterRecent;
export const selectCountedLists = createSelector([selectLists], (lists) => {
  return lists.map((list) => {
    const count = list.cards.length;
    return { ...list, count: count };
  });
});
export const selectFilteredRecentLists = createSelector(
  [selectCountedLists, selectFilterRecent],
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
          return card.title.toLowerCase().includes(term.toLowerCase());
        });
        return { ...list, cards };
      });
    } else {
      return lists;
    }
  }
);
// sort all cards by order field
export const selectFilteredAllOrderedLists = createSelector(
  [selectFilteredRecentAndTermLists],
  (lists) => {
    return lists.map((list) => {
      const cards = orderBy(list.cards, (c) => c.order, 'asc');
      return { ...list, cards };
    });
  }
);

export const {
  updateCardDragged,
  updateListDragged,
  setFilterTerm,
  setFilterRecent,
  setFilterReset,
} = projectSlice.actions;
export default projectSlice.reducer;
