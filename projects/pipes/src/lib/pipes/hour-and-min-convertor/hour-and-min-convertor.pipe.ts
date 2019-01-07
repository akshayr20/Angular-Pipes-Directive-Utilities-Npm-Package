import { Pipe, PipeTransform, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@Pipe({
  name: 'hourAndMinConvertor'
})
export class HourAndMinConvertorPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    if (value) {
      const hours = Math.floor(value / (60 * 60));
      const divisor_for_minutes = value % (60 * 60);
      const minutes = Math.floor(divisor_for_minutes / 60);
      if (minutes < 10) {
        return hours + 'hrs 0' + minutes + ' min';
      } else {
        return hours + 'hrs ' + minutes + ' min';
      }
    }
  }
}

@NgModule({
  imports: [CommonModule],
  exports: [HourAndMinConvertorPipe],
  declarations: [HourAndMinConvertorPipe]
})
export class HourAndMinConvertorPipeModule {}
