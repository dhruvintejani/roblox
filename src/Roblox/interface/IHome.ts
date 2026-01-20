export interface Item {
  id: number;
  title: string;
  creatorName: string;
  price: number;
  image: string;
  taxonomy: string;
  topics: string[];
}

interface Subcategory {
  subcategory?: string | null;
  taxonomy: string;
  assetTypeIds: number[];
  bundleTypeIds: number[];
  subcategoryId?: number | null;
  name: string;
  shortName?: string | null;
}

export interface Category {
  category: string;
  taxonomy: string;
  assetTypeIds: number[];
  bundleTypeIds: number[];
  categoryId: number;
  name: string;
  orderIndex: number;
  subcategories: Subcategory[];
  isSearchable: boolean;
}

export interface Topic {
  displayName: string;
  originalTopicName: string;
}
