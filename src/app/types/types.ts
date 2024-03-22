interface Icon {
  prefix: string;
  suffix: string;
}

interface Category {
  id: number;
  name: string;
  short_name: string;
  plural_name: string;
  icon: Icon;
}

interface Location {
  address: string;
  country: string;
  cross_street: string;
  formatted_address: string;
  locality: string;
  postcode: string;
  region: string;
}

interface Geocode {
  main: {
    latitude: number;
    longitude: number;
  };
}

interface GeoBounds {
  circle: {
    center: {
      latitude: number;
      longitude: number;
    };
    radius: number;
  };
}

interface Chain {
  id: string;
  name: string;
}

interface RelatedPlaces {
  parent?: string;
}

export interface Venue {
  fsq_id: string;
  categories: Category[];
  chains: Chain[];
  closed_bucket: string;
  distance: number;
  geocodes: Geocode;
  link: string;
  location: Location;
  name: string;
  related_places: RelatedPlaces;
  timezone: string;
}

export interface FoursquareBurgerJointsResponse {
  results: Venue[];
  context: {
    geo_bounds: GeoBounds;
  };
}

export interface FoursquareBurgerJointPhoto {
  id: string;
  created_at: string;
  prefix: string;
  suffix: string;
  width: number;
  height: number;
}

export interface RecognizeBurgerResponse {
  urlWithBurger: string;
}
