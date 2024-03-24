import { setLoadingFalse, setLoadingTrue } from './loading.actions';
import { initialState } from './loading.state';
import { createReducer, on, Action } from '@ngrx/store';

const _loadingReducer = createReducer(
  initialState,
  on(setLoadingTrue, state => {
    return {
      ...state,
      isLoading: true,
    };
  }),
  on(setLoadingFalse, state => {
    return {
      ...state,
      isLoading: false,
    };
  })
);

export function loadingReducer(state: any, action: Action) {
  return _loadingReducer(state, action);
}
