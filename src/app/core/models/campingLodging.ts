import { CampingUnit } from "./campingUnit";

interface Beds {
    single: number,
    double: number,
    bunk: number,
}

interface Bathroom {
    shared: boolean,
    showers: number,
    toilets: number,
}

interface ICampingLodgingOptions {
    _id?: string;
    camping?: string;
    type?: string;
    name?: string;
    size?: string;
    capacity?: number;
    beds?: Beds;
    images?: any[];
    bathroom?: Bathroom,
    feePerNight?: number,
    notes?: string,
    number?: number,
}

export class CampingLodging {
    _id: string = '';
    camping: string = '';
    type: string = '';
    name: string = '';
    size: string = '';
    capacity: number = 0;
    images: any[] = [];
    beds: Beds = {
        single: 0,
        double: 0,
        bunk: 0,
    };
    bathroom: Bathroom = {
        shared: false,
        showers: 0,
        toilets: 0,
    };
    feePerNight: number = 0;
    notes: string = '';
    units: CampingUnit[] = [new CampingUnit()];

    constructor(options: ICampingLodgingOptions = {}) {
        this.camping = options.camping || this.camping;
        this._id = options._id || this._id;
        this.type = options.type || this.type;
        this.name = options.name || this.name;
        this.size = options.size || this.size;
        this.capacity = options.capacity || this.capacity;
        this.images = options.images || this.images;
        this.beds = options.beds || this.beds;
        this.bathroom = options.bathroom || this.bathroom;
        this.feePerNight = options.feePerNight || this.feePerNight;
        this.notes = options.notes || this.notes;
    }
}
