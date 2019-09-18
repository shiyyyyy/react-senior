import React from 'react';
import initialState from './initialState';
import reducer,{prepare} from './rootAction';


const RootContext = React.createContext();

let _dispatch;

export const RootProvider = props => {
  // Get state and dispatch from Reacts new API useReducer. 
  const [rootState, dispatch] = React.useReducer(reducer, initialState);

  _dispatch = dispatch;

  return (
     <RootContext.Provider {...props} value={rootState} />
  );
};

export async function rootAction(type,payload) {
	payload = await prepare(type,payload);
	_dispatch({type,payload});
};

export function useRootState() {
  return React.useContext(RootContext);
};
