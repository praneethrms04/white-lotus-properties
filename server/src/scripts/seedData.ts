export interface SeedProperty {
  name: string;
  slug: string;
  location: string;
  price: number;
  area: number;
  bedrooms: number;
  bathrooms: number;
  description: string;
  shortDescription: string;
  images: string[];
  amenities: string[];
  propertyType: string;
  status: 'available' | 'sold' | 'reserved';
  featured: boolean;
}

export interface SeedInquiry {
  propertySlug: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  status: 'new' | 'contacted' | 'closed';
}

/**
 * Illustrative demo inventory for White Lotus Group.
 * Not real listings or availability claims.
 */
export const SEED_PROPERTIES: SeedProperty[] = [
  {
    name: 'Lotus Courtyard Villa',
    slug: 'demo-lotus-courtyard-villa-indiranagar',
    location: 'Indiranagar, Bengaluru',
    price: 62500000,
    area: 3850,
    bedrooms: 4,
    bathrooms: 4,
    shortDescription: 'A courtyard-centred villa with quiet garden living in Indiranagar.',
    description:
      'Illustrative residence concept: a four-bedroom villa organised around a private courtyard, double-height living room, and warm material palette. Designed for generous gatherings and unhurried mornings in Indiranagar.',
    images: [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80',
    ],
    amenities: ['Private courtyard', 'Garden', 'Smart home', 'Covered parking'],
    propertyType: 'Villa',
    status: 'available',
    featured: true,
  },
  {
    name: 'Skyline Residences Whitefield',
    slug: 'demo-skyline-residences-whitefield',
    location: 'Whitefield, Bengaluru',
    price: 27800000,
    area: 2480,
    bedrooms: 3,
    bathrooms: 3,
    shortDescription: 'High-floor apartment with open living and east-facing light.',
    description:
      'Illustrative apartment concept in Whitefield featuring an open living-dining volume, powder room, and two balcony exposures. Intended for professionals seeking calm finishes and clubhouse convenience.',
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1600&q=80',
    ],
    amenities: ['Clubhouse', 'Pool', 'Concierge', 'Gym'],
    propertyType: 'Apartment',
    status: 'available',
    featured: true,
  },
  {
    name: 'Jayanagar Heritage Townhouse',
    slug: 'demo-jayanagar-heritage-townhouse',
    location: 'Jayanagar, Bengaluru',
    price: 41200000,
    area: 3120,
    bedrooms: 4,
    bathrooms: 3,
    shortDescription: 'Townhouse living with layered terraces and warm stone interiors.',
    description:
      'Illustrative townhouse concept in Jayanagar with stacked living spaces, a reading loft, and terrace gardens. Crafted for families who prefer neighbourhood intimacy with contemporary planning.',
    images: [
      'https://images.unsplash.com/photo-1600047509358-9dc75507daeb?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=80',
    ],
    amenities: ['Terraces', 'Study', 'Visitor parking', 'Landscaped entry'],
    propertyType: 'Townhouse',
    status: 'reserved',
    featured: false,
  },
  {
    name: 'Sarjapur Orchard Homes',
    slug: 'demo-sarjapur-orchard-homes',
    location: 'Sarjapur Road, Bengaluru',
    price: 33500000,
    area: 2750,
    bedrooms: 3,
    bathrooms: 3,
    shortDescription: 'Villa-style home with orchard views and a quiet morning patio.',
    description:
      'Illustrative low-rise residence along Sarjapur Road with a morning patio, open kitchen, and soft landscape edge. Planned for privacy while remaining connected to the corridor’s civic amenities.',
    images: [
      'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?auto=format&fit=crop&w=1600&q=80',
    ],
    amenities: ['Patio', 'Landscaped setbacks', 'Modular kitchen', 'Backup power'],
    propertyType: 'Villa',
    status: 'available',
    featured: true,
  },
  {
    name: 'Koramangala Atelier Penthouse',
    slug: 'demo-koramangala-atelier-penthouse',
    location: 'Koramangala, Bengaluru',
    price: 54800000,
    area: 3560,
    bedrooms: 4,
    bathrooms: 4,
    shortDescription: 'Penthouse atelier with sky deck and gallery-like living spaces.',
    description:
      'Illustrative penthouse concept in Koramangala featuring a sky deck, gallery corridor, and private elevator lobby. Suited to collectors and hosts who value volume and curated light.',
    images: [
      'https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=1600&q=80',
    ],
    amenities: ['Sky deck', 'Private lobby', 'Wine storage', 'Home automation'],
    propertyType: 'Penthouse',
    status: 'available',
    featured: true,
  },
  {
    name: 'HSR Linear Apartment',
    slug: 'demo-hsr-linear-apartment',
    location: 'HSR Layout, Bengaluru',
    price: 21900000,
    area: 1980,
    bedrooms: 3,
    bathrooms: 2,
    shortDescription: 'Linear plan apartment with deep balconies and calm finishes.',
    description:
      'Illustrative three-bedroom apartment in HSR Layout with a linear living axis, deep balcony, and quiet bedroom wing. Designed for everyday ease and efficient circulation.',
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1560185127-6ed189bf02f4?auto=format&fit=crop&w=1600&q=80',
    ],
    amenities: ['Deep balcony', 'Community lounge', 'Children’s play area', 'CCTV'],
    propertyType: 'Apartment',
    status: 'sold',
    featured: false,
  },
  {
    name: 'Hebbal Lakeview Residence',
    slug: 'demo-hebbal-lakeview-residence',
    location: 'Hebbal, Bengaluru',
    price: 38900000,
    area: 3020,
    bedrooms: 4,
    bathrooms: 4,
    shortDescription: 'Lake-facing residence with generous terraces and morning light.',
    description:
      'Illustrative residence near Hebbal with lake-oriented living spaces, wraparound terrace, and a flexible guest suite. Planned for elevated calm and entertaining.',
    images: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1605146769289-440113cc3d00?auto=format&fit=crop&w=1600&q=80',
    ],
    amenities: ['Lake-facing terrace', 'Guest suite', 'Servant room', 'Covered parking'],
    propertyType: 'Apartment',
    status: 'available',
    featured: false,
  },
  {
    name: 'North Bangalore Estate Home',
    slug: 'demo-north-bangalore-estate-home',
    location: 'North Bangalore, Bengaluru',
    price: 72000000,
    area: 5200,
    bedrooms: 5,
    bathrooms: 5,
    shortDescription: 'Estate-scale home with landscaped lawns and pavilion living.',
    description:
      'Illustrative estate home in North Bangalore featuring pavilion living, landscaped lawns, and a six-car motor court. Composed for privacy, scale, and long-term family living.',
    images: [
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1600&q=80',
    ],
    amenities: ['Landscaped lawns', 'Pavilion living', 'Home theatre', 'Staff quarters'],
    propertyType: 'Villa',
    status: 'reserved',
    featured: true,
  },
];

export const SEED_INQUIRIES: SeedInquiry[] = [
  {
    propertySlug: 'demo-lotus-courtyard-villa-indiranagar',
    name: 'Aarav Mehta',
    email: 'aarav.mehta.demo@example.com',
    phone: '+91 98001 11001',
    message: 'We would like a weekend private viewing of the courtyard villa.',
    status: 'new',
  },
  {
    propertySlug: 'demo-skyline-residences-whitefield',
    name: 'Diya Sharma',
    email: 'diya.sharma.demo@example.com',
    phone: '+91 98001 11002',
    message: 'Interested in high-floor inventory with clubhouse access in Whitefield.',
    status: 'contacted',
  },
  {
    propertySlug: 'demo-koramangala-atelier-penthouse',
    name: 'Kabir Iyer',
    email: 'kabir.iyer.demo@example.com',
    phone: '+91 98001 11003',
    message: 'Please share floor plans and appointment slots for the penthouse.',
    status: 'new',
  },
  {
    propertySlug: 'demo-sarjapur-orchard-homes',
    name: 'Meera Nair',
    email: 'meera.nair.demo@example.com',
    phone: '+91 98001 11004',
    message: 'Looking for a quiet villa-style home near Sarjapur for relocation.',
    status: 'closed',
  },
  {
    propertySlug: 'demo-hebbal-lakeview-residence',
    name: 'Rohan Kapoor',
    email: 'rohan.kapoor.demo@example.com',
    phone: '+91 98001 11005',
    message: 'Can we schedule an evening tour focused on terrace views?',
    status: 'contacted',
  },
  {
    propertySlug: 'demo-north-bangalore-estate-home',
    name: 'Ananya Rao',
    email: 'ananya.rao.demo@example.com',
    phone: '+91 98001 11006',
    message: 'Exploring estate homes for an extended family. Kindly share brochure pack.',
    status: 'new',
  },
  {
    propertySlug: 'demo-jayanagar-heritage-townhouse',
    name: 'Ishaan Patel',
    email: 'ishaan.patel.demo@example.com',
    phone: '+91 98001 11007',
    message: 'Interested if the reserved townhouse timing can be discussed.',
    status: 'closed',
  },
];

export const SEED_PROPERTY_SLUGS = SEED_PROPERTIES.map((property) => property.slug);
export const SEED_INQUIRY_EMAILS = SEED_INQUIRIES.map((inquiry) => inquiry.email);
