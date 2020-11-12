import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'effectChance',
})
export class EffectChancePipe implements PipeTransform {
  transform(value: string, chance: string): string {
    return value?.replace(/\$effect_chance/g, chance);
  }
}
