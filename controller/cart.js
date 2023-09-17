
/**
 * object => kết quả tạo được từ Class => từng obj nhân vien
 * Class => tạo nhiều đối tượng San Pham => lưu từng giá trị của San Pham
 * Array => mảng lưu trữ các đối tượng => tìm kiếm, sắp xếp, thêm , xoa, cập nhật
 */

/**
 * B1: phân tích Class => Class diagram (sơ đồ lớp) 
 * B2: Tạo các Class => tạo mỗi Class là file riêng
 * B3: Thêm San Pham 
 *      
 */


//! 1.Hàm dùng chung và biến toàn cục-------------------------------------------------------------------------------------------------------
let products = new Product_Method();
let validation = new Validation();

//DOM tới 1 element
function queryELE(query) {
    return document.querySelector(query);
}

// let userLogin = JSON.parse(localStorage.getItem("email"));
// document.querySelector("#txtUser").innerHTML = userLogin;

//! Load User Info
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

//! 2.LocalStorage Process------------------------------------------------------------------------------------------------------
//Lưu trữ ở Local Storage (trình duyệt web)
function setLocalStorage() {
    //? localStorage: đối tương có sẵn của JS giúp thao tác với local storage
    //! localStorage chỉ lưu data là JSON
    // cần lưu mảng SV (array obj) => JSON
    //? JSON: đối tượng có sẵn giúp xử lý JSON
    localStorage.setItem("ProductList", JSON.stringify(products.arrayProduct));
}

//Lấy dữ liệu ở Local Storage (trình duyệt web)
function getLocalStorage() {
    //!kiểm tra có tồn lại localStorage cần lấy không
    if(localStorage.getItem("ProductList") != null){
        //có local
        //lấy dữ liệu JSON từ local => chuyển từ JSON sang mảng obj => lưu vào biến mangSV
        products.arrayProduct = JSON.parse(localStorage.getItem("ProductList"));
        console.log("Cart - danh sach:", products.arrayProduct)
        if(products.arrayProduct){
            drawProductInCart( products.arrayProduct );
            TotalAmount();
        }
    }

}

//! 3. drawProductInCart---------------------------------------------------------------------------------------------
//Hiển thị danh sách San Pham
//input:mangSV  , output: chuỗi các thẻ tr(thông tin của 1 obj San Pham) => đưa lên UI
function drawProductInCart(products) {

    console.log("danh sach sp trong cart:", products);
    var content = ""; // chứa chuỗi các thẻ tr

    //! map(phần tử của mảng, vị trí phần tử) : duyệt mảng, lấy từng phần tử của mảng mà không cần vị trí. Chỉ dùng với Array. Chỉ dừng khi hết mảng.
    products.map(function(prd,index){
        console.log(prd, index);//lấy từng đối tượng San Pham từ trong mảng
        //string template
        var trELE = `
        <tr>
            
            <td class="thumbnail"><img class="img-fluid" src=${prd.image} alt=""></td>
            <td>${prd.productName}</td>
            <td id ="priceID">${prd.price}</td>
            <td class ="pro-quantity">
                <div class="pro-qty">
                    <span class ="dec qtybtn" onclick="decreaseQuantity('${prd.productID}')" >-</span>
                    <input id ="qtyId"  type="text" class="qtyText" value = ${prd.quantity} ></input>
                    <span  class ="inc qtybtn"  onclick="increateQuantity('${prd.productID}')" >+</span>
                </div>
            </td>
           
            <td>
                <a href="#" onclick="deleteProduct('${prd.productID}')"><i class="fa-regular fa-trash-can"></i></a>
            </td>
        </tr>`
        // <td>${prd.productID}</td>
         // <td><div class ="subTotal" onload="SubTotalAmount('${prd.productID}')" ></div></td>
        // content mới = content ban đầu + trELE
        content += trELE;
    })

    // console.log(content);
    queryELE("#tblCartList").innerHTML = content;

}


//! 4.Load Page--------------------------------------------------------------------------------------------
//Gọi khi load trang web
getLocalStorage();



//! 5.Delete Product--------------------------------------------------------------------------------------------
/**
 * Khối 1: Input: mã San Pham cần xóa
 * 
 * Khối 2: 
 *      hàm deleteProduct (main) => gắn sự kiện , lấy được mã San Pham cần xóa
 *          Gọi phương thức deleteProduct của dsnv
 * 
 * Khối 3: xóa San Pham (phần tử) ra khỏi mảng 
 */

function deleteProduct(id) {
    //lấy từ UI
    console.log(id);
    products.deleteProduct(id)
    //mảng đổi => lưu mảng đổi xuống LocalStorage
    setLocalStorage();
    //Gọi hàm hiển thị
    getLocalStorage();
    TotalAmount();
    TotalProductInCart();
}

//! 6.Total Amount--------------------------------------------------------------------
TotalAmount();

function TotalAmount() {
    let tong = 0;
    let oder = 0;
    products.arrayProduct.map(function (prd) {
        console.log("sanpham trong tong tien:",prd);
        tong += Number(prd.price) * Number(prd.quantity)
        oder += Number(prd.quantity)
    })
    document.getElementById("tienThanhToan").innerHTML = tong.toLocaleString()
    // document.querySelector(".cart__text").innerHTML = oder;
}

//!SubTotal Amount ------------------------
// SubTotalAmount(prdID);
function SubTotalAmount1(prdID) {
    console.log(prdID);
    let tong = 0;
    products.viewProduct(prdID).map(function (prd) {
        console.log("subtotal:",prd);
        tong += Number(prd.price) * 1// Number(prd.quantity)
    })
    document.getElementById("subTotal").innerHTML = tong.toLocaleString()
    // document.querySelector(".cart__text").innerHTML = oder;
}

function SubTotalAmount() {
    
    let tong = 0;
    products.arrayProduct.map(function (prd) {
        console.log("subtotal:",prd);
        tong += Number(prd.price) * Number(prd.quantity)
    })
    document.getElementsByClassName("subTotal").innerHTML = tong.toLocaleString()
    // document.querySelector(".cart__text").innerHTML = oder;
}
//! 7.Change Quantity--------------------------------------------------------------------
// render tawng giam soó lượng sp cart 
window.increateQuantity = increateQuantity;
function increateQuantity(id) {
    // console.log(id);
    products.increaseQuantity(id);
    setLocalStorage();
    drawProductInCart(products.arrayProduct);
    TotalAmount();
    TotalProductInCart();
    
}
window.decreaseQuantity = decreaseQuantity;
function decreaseQuantity(id) {
    products.decreaseQuantity(id);
    setLocalStorage();
    drawProductInCart(products.arrayProduct);
    TotalAmount();
    TotalProductInCart();
    
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

TotalProductInCart();