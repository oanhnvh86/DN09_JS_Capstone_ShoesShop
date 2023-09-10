//! Xem thông tin shoes------------------------------------------
/**
 * Xem thông tin chi tiết
 * input: maNVXem
 * function viewProduct 
 *      + call API => truyền maNVXem vào API
 *      + Thành công => hiển thị lên form 
 *      + Thất bại => thông báo lỗi
 */
window.onload = function () {
    const urlParams = new URLSearchParams(window.location.search);
    const myParam = urlParams.get('productid')

    //! 1.Thông tin chi tiết của sản phẩm------------------------------------------
    viewProduct(myParam);
   
    function viewProduct(myParam) {
        console.log(myParam);

        //C1
        // var promiseObj = axios({
        //     method: "get",
        //     url: `https://shop.cyberlearn.vn/api/Product/getbyid?id=${shoesID}`
        // }); // pending
        
        //C2
        var promiseObj = callAPI_ViewProduct(myParam)

        promiseObj.then(function (result) {
            //thành công
            // console.log(result);
            console.log("Product Info:",result.data.content);
            //TODO: Hiển thị lên form
            drawProductDetail(result.data.content);
        });

        promiseObj.catch(function (error) {
            console.log(error)
        })
    }

    function drawProductDetail(sh) {
        var content = ""; //string các thẻ tr
        content += `
            <div class="col-12 col-md-4">
                        <div class="productImg">
                            <img src="${sh.image}" class="card-img-top" alt="...">
                        </div>
            </div>
            <div class="col-12 col-md-8">
                <div class="productDetail">
                    <h2>${sh.name}</h2>
                    <p>${sh.description}</p>
                    <p>Available size</p>
                  

                    <p>${sh.price}</p>
                    
                    <div class="soLuongCart">
                        <button type="button" onclick="renderGiam('${sh.id}')" class="btn btn-light">-</button>
                        <p class="slorder">1</p>
                        <button type="button" onclick="renderTang('${sh.id}')" class="btn btn-light">+</button>
                    </div>
                    
                    <button onclick="addToCart('${sh.id}')">Add New Card</button>
                </div>
            </div>
            `
        document.querySelector("#productContent").innerHTML = content;
        
    }

    //! 2.Related Product-------------------------------------------------
    viewRelatedProducts(myParam);

    function viewRelatedProducts(id) {
        callAPI_ViewProduct(id).then(function (result) {
            console.log("Thong tin sanpham:", result);
            let array = [...result.data.content.relatedProducts]
            console.log("array", array);
            drawRelatedProducts(array)
        }).catch(function (error) {
            console.log(error);
        })
    }
    

    function drawRelatedProducts(mang) {
        var content = "";
        mang.map(function (sp) {
            content += `
            <div class="product-item col-6 col-md-4">
            <div class="item">
                <a href="../view/product_detail.html?productid=${sp.id}">
                    <img src=${sp.image} alt="">
                </a>
            </div>
            <div class="product-item-text">
                <h1><a href="../views/chiTietSP.html?productid=${sp.id}">${sp.name}</a></h1>

                <p><span class="price">${sp.price}</span>.000 đ</p>
            </div>

        </div>
        `
        })
        document.getElementById("relatedProductContent").innerHTML = content;
    }
    
}



//! 3.LocalStorage Process--------------------------
let products = new Product_Method();

function setLocalSorage() {
    localStorage.setItem("ProductList", JSON.stringify(products.arrayProduct));
}
function getLocalStorage() {
    if (localStorage.getItem("ProductList") != null) {
        products.arrayProduct = JSON.parse(localStorage.getItem("ProductList"));
        // hienThiCart(dssp.mangSP)
    }

}

getLocalStorage() ;

//! 4.Add to cart--------------------------
function addToCart(id) {
    var quantityOrder = document.querySelector(".slorder").value;
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