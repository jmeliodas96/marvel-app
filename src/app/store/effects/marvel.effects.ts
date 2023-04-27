import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { MarvelService } from 'src/app/services/marvel.service';
import * as MarvelActions from '../actions/marvel.action';

@Injectable()
export class MarvelEffects {

  private _pagination = {
    offset: 0,
    limit: 100,
  };

  constructor(
    private actions$: Actions,
    private marvelService: MarvelService
  ) {}

  loadPosts$ = createEffect(() =>
    this.actions$.pipe(
      ofType('[Characters List] Load Characters'),
      map((action: any) => action.payload),
      mergeMap(() => {
        return this.marvelService.getMarvelCharacters(this._pagination.offset, this._pagination.limit).pipe(
          map((data: any) => MarvelActions.LoadCharacterSuccessAction({ payload: data.data.results })),
          catchError(error => of(MarvelActions.LoadCharacterFailureAction({ error })))
        )
  })));
  

}