import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectChancePipe } from './effect-chance.pipe';

@NgModule({
  declarations: [EffectChancePipe],
  imports: [CommonModule],
  exports: [EffectChancePipe],
})
export class EffectChancePipeModule {}
