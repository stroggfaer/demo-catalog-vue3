export type UserModel = {
    id: number
    username: string
    email: string
    phone: string
    name: UserNameModel
    address: AddressModel
}
export type UserNameModel = {
    firstname: string
    lastname: string
}
export type AddressModel = {
    city: string
    street: string
    number: number
    zipcode: string
    geolocation: GeolocationModel
}
export type GeolocationModel = {
    lat: string
    long: string
}
