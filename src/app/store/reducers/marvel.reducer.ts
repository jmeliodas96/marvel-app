// import the interface
import { Character } from '../models/marvel.model';
import { Action, createReducer, on } from '@ngrx/store';
import { PostActionType } from '../actions/marvel.action';
import * as PostsActions from '../actions/marvel.action';

//initial state
const initialPostState: Array<Character> = [];


export const reducer = createReducer(
   initialPostState,
   on(PostsActions.LoadItemsAction, (state:any) => ([...state])),
   on(PostsActions.LoadCharacterSuccessAction, (state, action:any) => ([...action.payload]) ),
);

export function PostReducer( state: Array<Character> = initialPostState, action: Action) {
  switch (action.type) {
    case PostActionType.LOAD_POSTS:
      return reducer (state, action);
    case PostActionType.LOAD_POSTS_SUCESS:
      return reducer(state, action); 
    default:
      return reducer(state, action);
   }
}



