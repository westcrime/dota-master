export default interface Item {
  id: number;
  name: string;
  displayName: string;
  lore: string;
  cost?: number;
  iconUrl: string;
  description: string;
  attributes: Attribute[];
}

interface Attribute {
  name: string;
  value: string;
}
