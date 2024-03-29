import React, { createContext, useReducer } from 'react';

const initialGlobalState = {
  customValue: "old value in global store",
  TOGGLE_TERM_CONDITION_MODAL: false,
  TOGGLE_MAC_SETTINGS_MODAL: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADDVALUE': {
      return {
        ...state,
        customValue: "demo value for global context"
      };
    }
    case 'TOGGLE_MODAL': {
      if(action.payload === 'TOGGLE_TERM_CONDITION_MODAL'){
        return {
          ...state,
          [action.payload]: !state.TOGGLE_TERM_CONDITION_MODAL,
        }
      }
      else if(action.payload === 'TOGGLE_MAC_SETTINGS_MODAL'){
        return {
          ...state,
          [action.payload]: !state.TOGGLE_MAC_SETTINGS_MODAL,
        }
      }else{
        
      }
      
    }
    default: {
      return { ...state };
    }
  }
};

const GlobalContext = createContext({
  ...initialGlobalState,
  addValMethod: () => {},
  toggleForModal: () => {},
});

export const GlobalStoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialGlobalState);

  const addValMethod = (payload) => {
    dispatch({ type: 'ADDVALUE',payload: payload });
  };
  const toggleForModal = (payload) => {
    dispatch({  type: 'TOGGLE_MODAL', payload: payload  });
  };

  return (
    <GlobalContext.Provider
      value={{
        ...state,
        addValMethod,
        toggleForModal
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContext;
