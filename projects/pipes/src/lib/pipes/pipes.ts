import { Pipe, PipeTransform, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml, SafeStyle, SafeScript, SafeUrl, SafeResourceUrl } from '@angular/platform-browser';

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

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {
  transform(value: any, field: string, input: string) {
    if (input !== undefined && input.length >= 2) {
      input = input.toLowerCase();
      if (typeof value[0] === 'string') {
        return value.filter(function(el: any) {
          return el.toLowerCase().indexOf(input) > -1;
        });
      }
      return value.filter(function(el: any) {
        return el[field].toLowerCase().indexOf(input) > -1;
      });
    }
    return value;
  }
}

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

@Pipe({ name: 'truncate' })
export class TruncatePipe implements PipeTransform {
  transform(value: string, args: string[]): string {
    const limit = args.length > 0 ? parseInt(args[0], 10) : 10;
    const trail = args.length > 1 ? args[1] : '...';
    return value.length > limit ? value.substring(0, limit) + trail : value;
  }
}

@Pipe({
  name: 'safe'
})
export class SafePipe implements PipeTransform {
  constructor(protected sanitizer: DomSanitizer) {}

  public transform(value: any, type: string): SafeHtml | SafeStyle | SafeScript | SafeUrl | SafeResourceUrl {
    switch (type) {
      case 'html':
        return this.sanitizer.bypassSecurityTrustHtml(value);
      case 'style':
        return this.sanitizer.bypassSecurityTrustStyle(value);
      case 'script':
        return this.sanitizer.bypassSecurityTrustScript(value);
      case 'url':
        return this.sanitizer.bypassSecurityTrustUrl(value);
      case 'resourceUrl':
        return this.sanitizer.bypassSecurityTrustResourceUrl(value);
      default:
        throw new Error(`Invalid safe type specified: ${type}`);
    }
  }
}

@Pipe({ name: 'camelCaseToRegularWord' })
export class CamelCaseToRegularWordPipe implements PipeTransform {
  transform(value: string, args?: any): string {
    return value.replace(/([A-Z])/g, ' $1').replace(/^./, function(str) {
      return str.toUpperCase();
    });
  }
}

@Pipe({
  name: 'notAvailable'
})
export class NotAvailablePipe implements PipeTransform {
  transform(value: any, args?: any): any {
    if (value) {
      return value;
    } else {
      return 'NA';
    }
  }
}

@Pipe({
  name: 'capitalizeFirst'
})
export class CapitalizeFirstPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    if (value === null) {
      return;
    }
    return value.charAt(0).toUpperCase() + value.slice(1);
  }
}

@NgModule({
  imports: [CommonModule],
  exports: [SortByPipe, SearchPipe, CapitalizeFirstPipe, HourAndMinConvertorPipe, TruncatePipe, SafePipe, CamelCaseToRegularWordPipe, NotAvailablePipe],
  declarations: [SortByPipe, SearchPipe, CapitalizeFirstPipe, HourAndMinConvertorPipe, TruncatePipe, SafePipe, CamelCaseToRegularWordPipe, NotAvailablePipe]
})
export class PipeModule {}
