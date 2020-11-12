import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubHyphenSpacePipe } from './sub-hyphen-space.pipe';

@NgModule({
  declarations: [SubHyphenSpacePipe],
  imports: [CommonModule],
  exports: [SubHyphenSpacePipe],
})
export class SubHyphenSpaceModule {}
