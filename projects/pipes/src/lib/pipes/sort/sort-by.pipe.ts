import { Pipe, PipeTransform, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@Pipe({
  name: 'sortBy'
})
export class SortByPipe implements PipeTransform {
  transform(records: Array<any>, args?: any, order: string = 'ASC'): any {
    if (order === 'ASC' && records) {
      return records.sort(function(a, b) {
        if (a[args] < b[args]) {
          return -1;
        } else if (a[args] > b[args]) {
          return 1;
        } else {
          return 0;
        }
      });
    } else {
      if (records) {
        return records.sort(function(a, b) {
          if (a[args] > b[args]) {
            return -1;
          } else if (a[args] < b[args]) {
            return 1;
          } else {
            return 0;
          }
        });
      }
    }
  }
}

@NgModule({
  imports: [CommonModule],
  exports: [SortByPipe],
  declarations: [SortByPipe]
})
export class SortByPipeModule {}
