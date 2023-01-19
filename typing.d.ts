export interface Food {
  name: string;
  description: string;
  price: number;
  rate: number;
  imageUrl: string;
  category: string;
  id: number;
  createAt: Date;
  published: Boolean;
  author?: {
    name: string;
    image: string;
  };
}
