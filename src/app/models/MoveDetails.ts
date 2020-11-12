export class MoveDetails {
  power: number;
  pp: number;
  accuracy: number;
  description: string;
  type: string;
  effect_chance: number;

  constructor(obj: any) {
    this.power = obj.power;
    this.pp = obj.pp;
    this.accuracy = obj.accuracy;
    this.description = obj.effect_entries[0].effect;
    this.effect_chance = obj.effect_chance;
  }
}
