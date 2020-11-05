
export class PokemonDetails{
    id: number;
    name:string;
    order: number;
    is_default: number;
    location_area_encounters: string;
    base_experience: number;
    height: number;
    weight: number;
    abilities: Abilities[];
    moves: Moves[];
    stats: Stats[];
    types: Types[];
    constructor(obj: any){
        this.id = obj.id;
        this.name = obj.name;
        this.order = obj.order;
        this.is_default = obj.is_default;
        this.location_area_encounters = obj.location_area_encounters;
        this.base_experience = obj.base_experience;
        this.height = obj.height/10;
        this.weight = obj.weight/10;
        this.abilities = obj.abilities;
        this.stats = obj.stats;
        this.types = obj.types;
        this.moves = obj.moves;
    }
}

class Abilities{
    ability: Ability
}
class Ability {
    name: string;
    url: string;
    is_hidden: boolean;
    slot: number;
}

class Moves {
    move: Move
}

class Move {
    name: string;
    url: string;
}
class Stats{
    effort: number;
    base_stat: number;
    stat: Stat
}
class Stat {
    name: string;
    url: string;
}
class Types{
    slot: number;
    type: Type;
}
class Type {
    name: string;
    url: string;
}
