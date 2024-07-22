import {ApplicationConfig, importProvidersFrom} from '@angular/core';
import {provideRouter} from '@angular/router';
import {routes} from './app.routes';
import {provideState, provideStore} from '@ngrx/store';
import {loggerMetaReducer, todoReducer} from './shared/store/todo.reducer';
import {HttpClientModule} from "@angular/common/http";
import {provideEffects} from "@ngrx/effects";
import {TodoEffects} from "./shared/store/todo.effects";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideStore(todoReducer, {
        metaReducers: [loggerMetaReducer]
      }
    ),
    provideState({name: 'todo', reducer: todoReducer}),
    importProvidersFrom(HttpClientModule),
    provideEffects(TodoEffects)
  ]
};
