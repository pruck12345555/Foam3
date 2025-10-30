import { Customer, Staff } from "./User";

export interface LoginResponse {
    success : boolean,
    userType : "Staff" | "Customer",
    user : Staff | Customer,
    token : string
}