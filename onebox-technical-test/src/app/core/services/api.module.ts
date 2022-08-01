import { ModuleWithProviders, NgModule } from '@angular/core';
import { ConcertApiService } from './concert-api.service';

@NgModule({
  declarations: [],
  providers: [ConcertApiService],
  bootstrap: [],
})
export class ApiModule {
  static forRoot(): ModuleWithProviders<any> {
    return {
      ngModule: ApiModule,
      providers: [ConcertApiService],
    };
  }
}
