export class User {
    id: string = "";
    appRoles: string[] = [];
}
export enum AppRole {
    ADMIN = "ADMIN",
    CUSTOMER = "CUSTOMER"
}