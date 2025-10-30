export default interface Order {
    orderId : number,
    orderDate : Date,
    address : string,
    trackingNo? : string,
    status : string,
    paymentStatus : string,
    customerId : number
}