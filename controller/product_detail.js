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
    const prdID = urlParams.get('productid')

    
    //! 1.Load Total Product In Cart----------------------------------
    TotalProductInCart();

    //! 2.Load User Info----------------------------------
    function UserInfo(){
        if (localStorage.getItem("token") != null) {
            let userLogin = JSON.parse(localStorage.getItem("email"));
            document.querySelector("#txtUser").innerHTML = userLogin;
            document.querySelector(".LoginWrap").style.display = "none";
            document.querySelector(".LogoutWrap").style.display = "inline";
        }
        else
        {
            document.querySelector(".LoginWrap").style.display = "inline";
            document.querySelector(".LogoutWrap").style.display = "none";
        }
    }
    UserInfo();

    //! 3.Thông tin chi tiết của sản phẩm------------------------------------------
    viewProduct(prdID);
   
    function viewProduct(prdID) {
        console.log(prdID);

        //C1
        // var promiseObj = axios({
        //     method: "get",
        //     url: `https://shop.cyberlearn.vn/api/Product/getbyid?id=${shoesID}`
        // }); // pending
        
        //C2
        var promiseObj = callAPI_ViewProduct(prdID)

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

    function drawProductDetail(prd) {
        var content = ""; //string các thẻ tr
        content += `
            <div class="col-12 col-md-6">
                <div class="productImg">
                    <img src="${prd.image}" class="card-img-top" alt="...">
                </div>
            </div>
            <div class="col-12 col-md-6">
                <div class="productDetailContent">
                    <h2 class="title">${prd.name}</h2>
                    <p class="desc">${prd.description}</p>
                    <p>Available size</p>
                    <p class="price">$${prd.price}</p>
                    
                    <div class="soLuongCart">
                        <h6 class="title">Quantity:</h6>
                        <div class="quantity">
                            <div class="pro-qty">
                                <span class= "dec qtybtn" onclick="descreateQty('${prd.id}')" >-</span>
                                <input class="qtyText" type="text" value="1">
                                <span class= "inc qtybtn" onclick="inscreaseQty('${prd.id}')" >+</span>
                            </div>
                        </div>
                        <div class="action_link">
                            <a class="btn btn-cart2" herf="#" onclick="addToCart('${prd.id}')" > Add To Cart</a>
                        </div>
                    </div>
                </div>
            </div>
            `
        document.querySelector("#productContent").innerHTML = content;
        
    }

    //! 4.Related Product-------------------------------------------------
    viewRelatedProducts(prdID);

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
        mang.map(function (prd) {
            content += `<div class="col-12 col-md-6 col-lg-4">
            <div class="card cardShoe">
                
                <a href="../view/product_detail.html?productid=${prd.id}" target="_blank"><img src="${prd.image}" class="card-img-top" alt="..." ></a>
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
                            Add To Cart</button>
                        </div>
                    </div>

                </div>
            </div>
        </div>`
        })
        document.getElementById("relatedProductContent").innerHTML = content;
    }
    
}

//! 5.LocalStorage Process--------------------------
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

//! 6.Add to cart--------------------------
function addToCart(id) {
    var quantityOrder = document.querySelector(".qtyText").value;
    callAPI_ViewProduct(id).then((result) => {
        let prd = result.data.content;
        // console.log("Main list Product", prd);
        let sp = new Product(prd.id, prd.name,prd.alias,prd.price,prd.description,prd.size,prd.shortDescription, quantityOrder,prd.deleted,prd.categories,prd.relatedProducts,prd.feature,prd.image); //quantityOrder
        
        var stLogin = JSON.parse(localStorage.getItem("token"));
        if (stLogin !== null) {
            if (products.arrayProduct.length <= 0) {
                // console.log ("Empty Product:Insert New", sp);
                products.insertProduct(sp);
                setLocalSorage();
            } 
            else {
                let HaveId = products.arrayProduct.findIndex(function (sp) {
                    // console.log("SP",sp);
                    // console.log("prd",prd);
                    // console.log("prd.id == sp.productID",prd.id == sp.productID);
                    return sp.productID == prd.id ;
                })
                console.log("HaveId:",HaveId);

                if(HaveId>-1)  
                {
                    let existedProd = products.viewProduct(sp.productID);
                    // console.log("existedProd:",existedProd);
                    let quantityUpdate = Number(existedProd.quantity) + Number(quantityOrder);
                    let spUpdate = new Product(prd.id, prd.name,prd.alias,prd.price,prd.description,prd.size,prd.shortDescription, quantityUpdate,prd.deleted,prd.categories,prd.relatedProducts,prd.feature,prd.image); //quantityOrder
                    // console.log("spUpdate:",spUpdate);
                    products.updateProduct(spUpdate);
                    setLocalSorage();
                } 
                else {
                    // console.log ("Product Array: New Product");
                    products.insertProduct(sp);
                    setLocalSorage();
                }
            }
            TotalProductInCart();
        }
        else{
            alert("Please Login!");
        }
    });
}

//! 7.General Increas Descrea Quantity
function inscreaseQty() {
    let curQty = Number(document.querySelector(".qtyText").value)
    let Qty = curQty + 1;
    document.querySelector(".qtyText").value = Qty;
}
function descreateQty() {
    let Qty = 0;
    let curQty = Number(document.querySelector(".qtyText").value)
    if (curQty > 1) {
        Qty = curQty - 1;
    } else {
        Qty = 1;
    }

    document.querySelector(".qtyText").value = Qty
}

//! 8. Total product in cart------------
function TotalProductInCart()
{
    let t = 0;
    products.arrayProduct.map(function (prd){
        t += Number(prd.quantity);
    })
    document.querySelector(".cartNo").innerHTML = t;
}