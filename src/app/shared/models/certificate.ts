import { Tag } from './tag';

export class Certificate {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number;
  createDate: Date;
  lastUpdateDate: Date;
  tags: Tag[];
}
