import { UserInterface } from '@/interfaces/user.interface';
import { ItemInterface } from './item.interface';

export interface CharacterInterface {
  _id: string;
  name: string;
  owner: UserInterface | string;
  crowns: number;
  experience: number;
  level: number;
  dexterity: number;
  agility: number;
  endurance: number;
  strength: number;
  intelligence: number;
  charisma: number;
  onboarded: boolean;
  gender: 'male' | 'female';
  honour: number;
  power: number;
  inventory: ItemInterface[][];
  mainHand: ItemInterface;
  offHand: ItemInterface;
  chest: ItemInterface;
  head: ItemInterface;
  legs: ItemInterface;
}
