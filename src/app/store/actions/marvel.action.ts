import { Action, props, createAction } from '@ngrx/store';
import { Character } from '../models/marvel.model';


export enum  PostActionType {
  LOAD_POSTS = '[Characters List] Load Characters',
  LOAD_POSTS_SUCESS = '[Characters] Characters Loaded Success',
  LOAD_POSTS_FAIL = '[Characters] Load Characters Fail'
}

export const LoadItemsAction = createAction(PostActionType.LOAD_POSTS)
export const LoadCharacterSuccessAction = createAction(PostActionType.LOAD_POSTS_SUCESS, props<{payload: Character[]}>());
export const LoadCharacterFailureAction = createAction(PostActionType.LOAD_POSTS_FAIL, props<{ error: any }>());


export class LoadPosts implements Action {
  readonly type = PostActionType.LOAD_POSTS;
  constructor(public payload: Character[]) {}
}

export class LoadPostsSuccess implements Action {
  readonly type = PostActionType.LOAD_POSTS_SUCESS;
  constructor(public payload: Character[]) {}
}

export class LoadPostsFail implements Action {
  readonly type = PostActionType.LOAD_POSTS_FAIL;
  constructor(public payload: any) {}
}


export type PostAction = LoadPosts
  | LoadPostsSuccess
  | LoadPostsFail;


