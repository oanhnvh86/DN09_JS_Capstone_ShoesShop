//TODO: Get Product List
function callAPI_GetProductList() {
    return axios({
        method: 'get',
        url: `https://shop.cyberlearn.vn/api/Product`
    });
}
//TODO: Get Product List By Category
function callAPI_GetProductListByCategory(categoryid) {
    return axios({
        method: 'get',
        url: `https://shop.cyberlearn.vn/api/Product/getProductByCategory?categoryId=${categoryid}`
    });
}
//TODO: View Product
function callAPI_ViewProduct(productID) {
    return axios({
        method: 'get',
        url: `https://shop.cyberlearn.vn/api/Product/getbyid?id=${productID}`
    });
}
//TODO: Register
function callAPI_Register(user) {
    return axios({
        method: 'post',
        url: `https://shop.cyberlearn.vn/api/Users/signup`,
        data: user
    })
}
//TODO: Login
function callAPI_Login(user) {
    return axios({
        method: 'post',
        url: `https://shop.cyberlearn.vn/api/Users/signin`,
        data: user
    })
}