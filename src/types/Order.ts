export default interface Order {
    orderId : number,
    customerId : number,
    orderDate : Date,
    address : string,
    trackingNo? : string,
    status : string
}