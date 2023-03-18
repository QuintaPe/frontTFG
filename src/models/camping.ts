interface Location {
  type: string;
  coordinates: number[];
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

interface Options {
  name?: string;
  description?: string;
  image?: string;
  location?: Location;
  available?: boolean;
  images?: string[];
  amenities?: string[];
  ratings?: Ratings[];
  maximumOccupancy?: number;
  activities?: string[];
  rules?: string[];
  fees?: number;
  nearestAttractions?: string[];
  checkInTime?: string;
  checkOutTime?: string;
  cancellationPolicy?: string;
  contactInformation?: ContactInformation;
  paymentMethods?: string[];
  owner?: string;
  reservedBy?: string[];
}

export class Camping {
  [key: string]: any;
  _id: string;
  name: string;
  description: string;
  image: string;
  location: Location;
  available: boolean;
  images: string[];
  amenities: string[];
  ratings: Ratings[];
  maximumOccupancy: number;
  activities: string[];
  rules: string[];
  fees: number;
  nearestAttractions: string[];
  checkInTime: string;
  checkOutTime: string;
  cancellationPolicy: string;
  contactInformation: ContactInformation;
  paymentMethods: string[];
  owner: string;
  reservedBy: string[];

  constructor(options: Options = {}) {
    this._id = '';
    this.name = options.name || '';
    this.description = options.description || '';
    this.image = options.image || '';
    this.location = options.location || { type: '', coordinates: [] };
    this.available = options.available || false;
    this.images = options.images || [];
    this.amenities = options.amenities || [];
    this.ratings = options.ratings || [];
    this.maximumOccupancy = options.maximumOccupancy || 0;
    this.activities = options.activities || [];
    this.rules = options.rules || [];
    this.fees = options.fees || 0;
    this.nearestAttractions = options.nearestAttractions || [];
    this.checkInTime = options.checkInTime || '';
    this.checkOutTime = options.checkOutTime || '';
    this.cancellationPolicy = options.cancellationPolicy || '';
    this.contactInformation = options.contactInformation || { phone: '', email: '' };
    this.paymentMethods = options.paymentMethods || [];
    this.owner = options.owner || '';
    this.reservedBy = options.reservedBy || [];
  }
}
