import { setLoadingFalse, setLoadingTrue } from './loading.actions';
import { initialState } from './loading.state';
import { createReducer, on } from '@ngrx/store';

const _loadingReducer = createReducer(
  initialState,
  on(setLoadingTrue, state => {
    console.log('here here');
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

export function loadingReducer(state: any, action: any) {
  return _loadingReducer(state, action);
}
