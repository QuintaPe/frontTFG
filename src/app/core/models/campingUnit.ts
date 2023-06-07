interface ICampingUnitOptions {
  _id?: string;
  name?: string;
  notes?: string;
  disabled?: boolean;
}

export class CampingUnit {
  _id: string = `new-${Date.now()}`;
  name: string = 'Unidad 1';
  notes: string = '';
  disabled: boolean = false;

  constructor(options: ICampingUnitOptions = {}) {
    this._id = options._id || this._id;
    this.name = options.name || this.name;
    this.notes = options.notes || this.notes;
    this.disabled = options.disabled || this.disabled;
  }
}
