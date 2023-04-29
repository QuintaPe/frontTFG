export class User {
    _id: string;
    email: string;
    password: string;
    role: string;
    lang: string;
    attributes: any;
 
    constructor(
        _id = "", 
        email = "",
        password = "",
        role = "",
        lang = "",
        attributes = {},
    ) {      
        this._id = _id;
        this.email = email;
        this.password = password;
        this.role = role;
        this.lang = lang;
        this.attributes = attributes;
    }
}
  