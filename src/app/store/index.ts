import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { hydrationMetaReducer } from './hydration/hydration.reducer';
import { Character } from './models/marvel.model';
import { PostReducer } from './reducers/marvel.reducer';


export interface RootState {
  marvel:  Array<Character>;
}

export const reducers: ActionReducerMap<any> = { 
  marvel: PostReducer,
}

export const metaReducers: MetaReducer[] = [hydrationMetaReducer];
