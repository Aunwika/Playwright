export default class APIUtils {
    constructor(apiContext){
        this.apiContext = apiContext
    }
    
    async getToken(loginData){
        const responseLogin = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login", {data: loginData})
        const responseLoginJson = await responseLogin.json()
        console.log(responseLoginJson)
        return responseLoginJson.token;
    }

    async createOrder(createOrderData, loginData){
        const response = {};
        response.token = await this.getToken(loginData)
        console.log(response.token)
        const responseCreateOrder = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order", {
        data: createOrderData,
        headers: {
            "Authorization": response.token,
            "Content-Type": "application/json",
    },
    });
    const responseCreateOrderJson = await responseCreateOrder.json() 
    response.orderIdFromAPI = responseCreateOrderJson.orders[0];
    return response;
}
}
    