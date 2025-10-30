export interface User {
    username : string,
    password : string,
    email : string
}

export interface Staff extends User {
    staffId : number,
    department : string,
    role : string,
}

export interface Customer extends User {
    customerId : number,
    firstName : string,
    lastName : string,
    phoneNumber : string
}