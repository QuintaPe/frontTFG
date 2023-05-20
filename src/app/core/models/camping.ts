import { CampingLodging } from "./campingLodging";

interface Location {
  [key: string]: any;
  country: string;
  community: string;
  city: string;
  locality: string;
  postalCode: string;
  street: string;
  streetNumber: string;
  coords: { type: string; coordinates: number[] };
}

interface Ratings {
  user: string;
  rating: number;
  review: string;
}

interface ContactInformation {
  phone: string;
  email: string;
}

interface CheckTime {
  from: string;
  to: string;
}

interface ICampingOptions {
  _id?: string;
  name?: string;
  description?: string;
  image?: string;
  location?: Location;
  available?: boolean;
  images?: any[];
  amenities?: string;
  ratings?: Ratings[];
  maximumOccupancy?: number;
  activities?: string;
  rules?: string;
  fees?: number;
  nearestLocations?: string;
  checkInTime?: CheckTime;
  checkOutTime?: CheckTime;
  cancellationPolicy?: string;
  contactInformation?: ContactInformation;
  paymentMethods?: string[];
  owner?: string;
  lodgings?: CampingLodging[]
}

export class Camping {
  _id: string = '';
  name: string = '';
  description: string = '';
  amenities: string = '';
  rules: string = '';
  nearestLocations: string = '';
  location: Location = {
    country: '',
    community: '',
    city: '',
    locality: '',
    postalCode: '',
    street: '',
    streetNumber: '',
    coords: { type: 'Point', coordinates: [] },
  };
  available: boolean = true;
  images: any[] = [];
  ratings: Ratings[] = [];
  maximumOccupancy: number = 0;
  fees: number = 0;
  checkInTime: CheckTime = { from: '00:00', to: '01:00'};
  checkOutTime: CheckTime = { from: '00:00', to: '01:00'};
  cancellationPolicy: string = '';
  contactInformation: ContactInformation = { phone: '1', email: 'a' };
  paymentMethods: string[] = [];
  owner: string = '';
  lodgings: CampingLodging[] = [];

  constructor(options: ICampingOptions = {}) {
    this._id = options._id || this._id;
    this.name = options.name || this.name;
    this.description = options.description || this.description;
    this.location = options.location || this.location;
    this.available = options.available || this.available;
    this.images = options.images || this.images;
    this.amenities = options.amenities || this.amenities;
    this.ratings = options.ratings || this.ratings;
    this.maximumOccupancy = options.maximumOccupancy || this.maximumOccupancy;
    this.rules = options.rules || this.rules;
    this.fees = options.fees || this.fees;
    this.nearestLocations = options.nearestLocations || this.nearestLocations;
    this.checkInTime = options.checkInTime || this.checkInTime;
    this.checkOutTime = options.checkOutTime || this.checkOutTime;
    this.cancellationPolicy = options.cancellationPolicy || this.cancellationPolicy;
    this.contactInformation = options.contactInformation || this.contactInformation;
    this.paymentMethods = options.paymentMethods || this.paymentMethods;
    this.owner = options.owner || this.owner;
    this.lodgings = options.lodgings || this.lodgings;
  }
}
