import { Component } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { Observable, Subject, takeUntil } from 'rxjs';
import { MarvelService } from '../services/marvel.service';
import { PostModel } from '../shared/models/post.model';
import { Character } from '../store/models/marvel.model';
import { Store } from '@ngrx/store';
import { State } from '../store/models/state.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as MarvelActions from '../store/actions/marvel.action';

@Component({
  selector: 'app-post',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.scss']
})
export class PostComponent {
  productDialog!: boolean;

  products!: PostModel[];

  product!: PostModel;

  selectedProducts!: PostModel[];

  submitted!: boolean;
  
  Delete! : string;

  postForm = new FormGroup({
    id: new FormControl(''),
    title: new FormControl('', [Validators.required, Validators.maxLength(20)]),
    description: new FormControl('', [Validators.required, Validators.maxLength(20)]),
  });

  articles$!: Observable<Array<Character>>;

  characters$!: Observable<Array<Character>>;

  destroy$ = new Subject<any>();

  characters: any = [];

  isLoading: boolean = true;

  private _pagination = {
    offset: 0,
    limit: 100,
  };

  constructor(
    private marvelService: MarvelService, 
    private messageService: MessageService, 
    private confirmationService: ConfirmationService,
    private store: Store<{posts: Character[]}>
    ) { 
        this.store.dispatch(MarvelActions.LoadItemsAction());
    }

  ngOnInit() {
    // Load list of characters
    this.characters$ = this.store.select((store:any) => {
        return store?.marvel;
    });
    

    // Loading effect
    setTimeout(() => {
      this.isLoading = false;
    }, 1000);
  }

  onPreviousPage(): void {
    this._pagination.offset -= this._pagination.limit;
    const { offset, limit } = this._pagination;
  }

  onNextPage(): void {
    this._pagination.offset += this._pagination.limit;
    const { offset, limit } = this._pagination;
  }
}
