export class User {

    _id: string;
    username : string;
    password : string;
    name: string;
    lastName: string;
    email: string;
    phone: string;
    birthDate: string;
    lang: string;
    
    constructor(_id="", username="", password="", email="", name="", lastName="", birthDate="", phone="", lang="") {      
        this._id = _id;
        this.username = username;
        this.password = password;
        this.email = email;
        this.name = name;
        this.lastName = lastName;
        this.birthDate = birthDate;
        this.phone = phone;
        this.lang = lang;

    }
}
  