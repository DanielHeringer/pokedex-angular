import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hyphenToSpace'
})
export class SubHyphenSpacePipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): string {
    return value?.replace(/-/g, ' ');
  }

}
