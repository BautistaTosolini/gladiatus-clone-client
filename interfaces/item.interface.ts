export interface ItemInterface {
  _id: string;
  name: string;
  image: string;
  type: 'mainHand' | 'offHand' | 'head' | 'chest' | 'legs';
  damage?: number[];
  armor?: number;
  power: number;
  probability: number;
  level: number;
  sellPrice: number;
}

