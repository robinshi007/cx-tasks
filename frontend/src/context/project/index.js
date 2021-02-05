import React, { createContext, useReducer} from 'react';
import {differenceInDays} from 'date-fns';
import produce from "immer"
//import {useImmerReducer} from 'use-immer'

import initState from './state';
export {default as initState} from './state';


export const ProjectContext = createContext();

export const actionTypes = {
  filterTerm: "FILTER_TERM",
  filterRecent: "FILTER_RECENT",
  filterReset: "FILTER_RESET",
}

const filterReducer = produce((draft, { type, payload}) => {
  console.log(type, payload)
  switch (type) {
    case actionTypes.filterTerm:
      return
    case actionTypes.filterRecent:
      const listLength = draft.lists.length
      for (let i=0; i< listLength; i++) {
        draft.lists.forEach((c, j)=> {
          if (differenceInDays(Date.parse(c.updated_at), new Date())< -7) {
            draft.lists[i].cards.splice(j, 1)
          }
        })
      }
      return
    case actionTypes.filterReset:
      console.log(draft)
      return
    default:
      throw new Error(`Unkown action.type: ${type}`);
  }
})

// const filterReducer = (state, { type, payload}) => {
//       console.log(type, payload)
//       switch (type) {
//         case actionTypes.filterTerm:
//           return state
//         case actionTypes.filterRecent:
//           return produce(state, draft => {
//             draft.lists.forEach((list,index) => {
//               list.cards.forEach((c,i) => {
//                 const time = Date.parse(c.updated_at);
//                 const diff = differenceInDays(time,new Date())
//                 // remove card greater then a week ago
//                 if (diff < -7) {
//                   list.cards.splice(i, 1)
//                 }
//               })
//             })
//           })
//         case actionTypes.filterReset:
//           console.log('state', state)
//           return state;
//         default:
//           throw new Error(`Unkown action.type: ${type}`);
//       }
//   }

export const ProjectContextProvider = props => {
  const [state, dispatch] = useReducer(filterReducer, initState)
  return <ProjectContext.Provider value={[state, dispatch]}>{props.children}</ProjectContext.Provider>
}
