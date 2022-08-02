import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConcertCatalogComponent } from './modules/pages/concert-catalog/concert-catalog.component';
import { ShoppingCartComponent } from './modules/pages/shopping-cart/shopping-cart.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/catalog',
    pathMatch: 'full',
  },
  {
    path: 'catalog',
    component: ConcertCatalogComponent,
  },
  {
    path: 'shopping-cart/:id',
    component: ShoppingCartComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
