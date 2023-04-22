import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LayoutModule } from '@angular/cdk/layout';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SearchComponent } from './search/search.component';
import { MovieComponent } from './movie/movie.component';

// reducers
import {
  toastReducer,
  sidebarMenuReducer,
  userFormReducer,
} from './store/reducers/app.reducer';
import { MoviesEffects } from './store/effects/movie.effects';
import { movieReducer } from './store/reducers/movie.reducer';
import { userReducer } from './store/reducers/user.reducer';
import { UserEffects } from './store/effects/user.effects';
import { AppEffects } from './store/effects/app.effects';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    SearchComponent,
    MovieComponent,
  ],
  imports: [
    BrowserModule,
    LayoutModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({
      userForm: userFormReducer,
      sidebarMenu: sidebarMenuReducer,
      movieState: movieReducer,
      userState: userReducer,
      toastState: toastReducer,
    }),
    EffectsModule.forRoot(MoviesEffects, UserEffects, AppEffects),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
