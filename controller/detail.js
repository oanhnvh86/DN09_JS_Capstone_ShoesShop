//! 5. Xem thông tin shoes------------------------------------------
/**
 * Xem thông tin chi tiết
 * input: maNVXem
 * function xemShoes 
 *      + call API => truyền maNVXem vào API
 *      + Thành công => hiển thị lên form 
 *      + Thất bại => thông báo lỗi
 */
window.onload = function () {
    const urlParams = new URLSearchParams(window.location.search);
    const myParam = urlParams.get('productid')

    //! 1.Thông tin chi tiết của sản phẩm------------------------------------------
    xemShoes(myParam);
    function xemShoes(myParam) {
        console.log(myParam);

        //C1
        // var promiseObj = axios({
        //     method: "get",
        //     url: `https://shop.cyberlearn.vn/api/Product/getbyid?id=${shoesID}`
        // }); // pending
        
        //C2
        var promiseObj = callAPILayThongTinShoes(myParam)

        promiseObj.then(function (result) {
            //thành công
            // console.log(result);
            console.log("Thong tin giay:",result.data.content);
            //TODO: Hiển thị lên form
            hienThiThongTinShoe(result.data.content);
        });

        promiseObj.catch(function (error) {
            console.log(error)
        })
    }

    function hienThiThongTinShoe(sh) {
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
                    <div class="quantity">
                        <button>+</button> 1 <button>-</button>
                    </div>
                    <button>Add New Card</button>
                </div>
            </div>
            `
        document.querySelector("#productContent").innerHTML = content;
        
    }

    
    

    //! 2.Related Product-------------------------------------------------
    
    realateProduct(myParam);

    function realateProduct(id) {
        callAPILayThongTinShoes(id).then(function (result) {
            console.log("Thong tin sanpham:", result);
            let array = [...result.data.content.relatedProducts]
            console.log("array", array);
            showSP(array)
        }).catch(function (error) {
            console.log(error);
        })
    }
    

    function showSP(mang) {
        var content = "";
        mang.map(function (sp) {
            content += `
            <div class="product-item col-6 col-md-4">
            <div class="item">
                <a href="../view/detail.html?productid=${sp.id}">
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

