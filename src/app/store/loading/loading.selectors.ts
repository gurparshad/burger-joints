import { createSelector } from '@ngrx/store';
import { AppState } from '../app-state';

export const getLoadingState = createSelector(
  (state: AppState) => state.loading,
  loading => loading.isLoading
);
