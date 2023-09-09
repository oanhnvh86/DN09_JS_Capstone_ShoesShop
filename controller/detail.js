//! 5. Xem thông tin shoes------------------------------------------
/**
 * Xem thông tin chi tiết
 * input: maNVXem
 * function xemShoes 
 *      + call API => truyền maNVXem vào API
 *      + Thành công => hiển thị lên form 
 *      + Thất bại => thông báo lỗi
 */

function hienThiThongTinShoe(mang) {
    var content = ""; //string các thẻ tr

    mang.map(function (sh) {
        content += `
        <div class="col-12 col-md-4">
                    <div class="productImg">
                        <img src="${sh.image}" class="card-img-top" alt="...">
                    </div>
        </div>
        <div class="col-12 col-md-8">
            <div class="productDetail">
                <h2>${sh.name}</h2>
                <p>${description}</p>
                <p>Available size</p>
                <p>${size}</p>

                <p>${sh.price}</p>
                <div class="quantity">
                    <button>+</button> 1 <button>-</button>
                </div>
                <button>Add New Card</button>
            </div>
        </div>
        `
    });
    
    document.querySelector("#productContent").innerHTML = content;
    
}

function xemShoes(gbShoeID) {
    console.log(gbShoeID);

    //C1
    // var promiseObj = axios({
    //     method: "get",
    //     url: `https://shop.cyberlearn.vn/api/Product/getbyid?id=${shoesID}`
    // }); // pending
    
    //C2
    var promiseObj = callAPILayThongTinShoes(gbShoeID)

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

xemShoes(gbShoeID);