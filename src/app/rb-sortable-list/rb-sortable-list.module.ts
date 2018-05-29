import {NgModule} from '@angular/core';
import {RbSortableListDirective} from './rb-sortable-list.directive';

@NgModule({
  declarations: [
    RbSortableListDirective
  ],
  exports: [
    RbSortableListDirective
  ]
})
export class RbSortableListModule {
}
