/**
 * Hiện thị danh sách shoes (dễ giao tiếp nhất với API)
 * Lây danh sach shoes từ API (GET)
 * 
 * Axios (thư viện) => 3 trạng trái
 * + Pending (tốc độ : internet, số lương dữ liệu, server - DevOps )
 * + Resolve (thành công)
 * + reject (thất bại)
 * 
 */

// const gbShoeID = 0;

//! 1. Common Function-------------------------------------------------------
function queryELE(query) {
    return document.querySelector(query);
}

//! 2. Load Product List------------------------------------------

function drawProductList(categoryId,arrayProduct) {
    var content = ""; //string các thẻ tr

    arrayProduct.map(function (prd) {
        content += `
        <div class="col-12 col-md-6 col-lg-4">
            <div class="card cardShoe">
                
                <a href="./view/product_detail.html?productid=${prd.id}" target="_blank"><img src="${prd.image}" class="card-img-top" alt="..." ></a>
                <div class="card-body">
                    <div class="d-flex justify-content-between">
                        <div>
                            <h3 class="cardShoe__title">${prd.name}</h3>
                            <p class="cardShoe__text">${prd.alias}</p>
                        </div>
                        <div>
                            <h3 class="cardShoe__title">$${prd.price}</h3>
                        </div>
                    </div>
                    <div class="d-flex justify-content-between">
                        <div class="cardShoe__rating">
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star"></i>
                        </div>
                        <div>
                            <button class="btnPhone-shadow" onclick="addToCart('${prd.id}')"><i class="fa fa-shopping-cart"></i>
                                Buy Now</button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
        `
    });
    if(categoryId =="ADIDAS")
        document.querySelector("#newArialContent").innerHTML = content;
    else if(categoryId =="MEN")
        document.querySelector("#bestsellerContent").innerHTML = content;
    else if(categoryId =="WOMEN")
        document.querySelector("#featuredProductContent").innerHTML = content;
    
}

/**
 *?  Hiển thị
 * Function getProductListByCategory
 *          Call API 
 *         => lấy thành công => hienThiDanhSach
 *         Ngược lại, thất bại => thông báo lỗi
 */

 function getProductListByCategory(categoryId) {
    //C1
    // var promiseObj = axios({
    //     method: 'get',
    //     url: 'https://shop.cyberlearn.vn/api/Product',
    // });//pending

    //C2
    // var promiseObj = callAPI_GetProductList();//pending
    var promiseObj = callAPI_GetProductListByCategory(categoryId);
    promiseObj.then(function (result) {
        console.log(result);//! mỗi BE trả kết quả khác nhau
        // axios tự động chuyển từ json sang mảng
        console.log("List Product",result.data.content);
        //TODO: Hiển thị danh sách
        drawProductList(categoryId, result.data.content);
    });
    promiseObj.catch(function (error) {
        console.log(error);
        // alert("Hệ thống đang bảo trì");
    })
}
//lấy danh sach và hiển thị ngay khi user vào trang web
getProductListByCategory("ADIDAS");
getProductListByCategory("WOMEN");
getProductListByCategory("MEN");

//! 3.LocalStorage Process

let products = new Product_Method();

function setLocalSorage() {
    localStorage.setItem("ProductList", JSON.stringify(products.arrayProduct));
}
function getLocalStorage() {
    if (localStorage.getItem("ProductList") != null) {
        products.arrayProduct = JSON.parse(localStorage.getItem("ProductList"));
    }

}

getLocalStorage() ; // gán lại vào mảng product = giá trị trong local storage

//! 4.Add to cart--------------------------
function addToCart(id) {
    var quantityOrder = 1
    callAPI_ViewProduct(id).then((result) => {
        let prd = result.data.content;
        console.log("Main list Product", prd);
        let sp = new Product(prd.id, prd.name,prd.alias,prd.price,prd.description,prd.size,prd.shortDescription, quantityOrder,prd.deleted,prd.categories,prd.relatedProducts,prd.feature,prd.image); //quantityOrder
       
        if (products.arrayProduct.length < 0) {
            products.insertProduct(sp);
            setLocalSorage();

        } 
        else {
            let HaveId = products.arrayProduct.find(function (sp) {
                return sp.id == prd.id
            })
            let spdaCo = { ...HaveId }

            if (prd.id == spdaCo.id) {
                let quantityUpdate = Number(spdaCo.quantityOrder) + Number(quantityOrder);
                let spUpdate = new Product(prd.id, prd.name,prd.alias,prd.price,prd.description,prd.size,prd.shortDescription, quantityOrder,prd.deleted,prd.categories,prd.relatedProducts,prd.feature,prd.image); //quantityOrder

                products.updateProduct(spUpdate);
                setLocalSorage();

            } 
            else {
                products.insertProduct(sp);
                setLocalSorage();

            }
        }
    });
}
   