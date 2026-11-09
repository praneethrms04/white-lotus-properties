export type PropertyStatus = 'available' | 'sold' | 'reserved';

export interface Property {
  _id: string;
  name: string;
  slug: string;
  location: string;
  price: number;
  area: number;
  bedrooms: number;
  bathrooms: number;
  description: string;
  shortDescription?: string;
  images: string[];
  amenities: string[];
  propertyType: string;
  status: PropertyStatus;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}

export type PropertySort = 'price_asc' | 'price_desc' | 'newest';

export interface PropertyFilters {
  search?: string;
  location?: string;
  bedrooms?: number;
  propertyType?: string;
  status?: PropertyStatus;
  featured?: boolean;
  sort?: PropertySort;
  page?: number;
  limit?: number;
}

export interface PropertyFormValues {
  name: string;
  slug?: string;
  location: string;
  price: number;
  area: number;
  bedrooms: number;
  bathrooms?: number;
  description: string;
  shortDescription?: string;
  images?: string[];
  amenities?: string[];
  propertyType?: string;
  status?: PropertyStatus;
  featured?: boolean;
}
