export interface RickMorty {
  info?:    Info;
  results?: Character[];
  error?:   string;
}

export interface Info {
  count: number;
  pages: number;
  next:  string | null;
  prev:  string | null;
}

export interface Character {
  id:       number;
  name:     string;
  status:   Status;
  species:  string;
  type:     string;
  gender:   Gender;
  origin:   Location;
  location: Location;
  image:    string;
  episode:  string[];
  url:      string;
  created:  Date;
}

export interface RickMortyByID extends Character {
  error?:  string
}

export enum Gender {
  Female = "Female",
  Male = "Male",
  Genderless = "Genderless",
  Unknown = "unknown",
}

export interface Location {
  name: string;
  url:  string;
}

export enum Status {
  Alive = "Alive",
  Dead = "Dead",
  Unknown = "unknown",
}