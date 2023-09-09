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

//! 1. Hàm dùng chung-------------------------------------------------------
function queryELE(query) {
    return document.querySelector(query);
}

function hienThiDS(categoryId,mang) {
    var content = ""; //string các thẻ tr

    mang.map(function (sh) {
        content += `
        <div class="col-12 col-md-6 col-lg-4">
            <div class="card cardShoe">
                <a href="./view/detail.html" target="_blank"><img src="${sh.image}" class="card-img-top" alt="..."  onclick= "xemShoes('${sh.id}')"></a>
                <div class="card-body">
                    <div class="d-flex justify-content-between">
                        <div>
                            <h3 class="cardShoe__title">'${sh.name}'</h3>
                            <p class="cardShoe__text">'${sh.alias}'</p>
                        </div>
                        <div>
                            <h3 class="cardShoe__title">$'${sh.price}'</h3>
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
                            <button class="btnPhone-shadow"><i class="fa fa-shopping-cart"></i>
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
    // gbShoeID = sh.id;
}
//! 2. Load danh sách shoes------------------------------------------
/**
 *?  Hiển thị
 * Function layDanhSachShoes
 *          Call API 
 *         => lấy thành công => hienThiDanhSach
 *         Ngược lại, thất bại => thông báo lỗi
 */

 function layDanhSachShoes(categoryId) {
    //C1
    // var promiseObj = axios({
    //     method: 'get',
    //     url: 'https://shop.cyberlearn.vn/api/Product',
    // });//pending

    //C2
    // var promiseObj = callAPILayDanhSachShoes();//pending
    var promiseObj = callAPILayDanhSachShoesByCategory(categoryId);

    // then, catch
    //result / response
    promiseObj.then(function (result) {
        //thành công
        console.log(result);//! mỗi BE trả kết quả khác nhau
        // axios tự động chuyển từ json sang mảng
        console.log("List Shoes",result.data.content);
        //TODO: Hiển thị danh sách
        hienThiDS(categoryId,result.data.content);

    });
    
    promiseObj.catch(function (error) {
        //thất bại
        console.log(error);
        // alert("Hệ thống đang bảo trì");
    })
}
//lấy danh sach và hiển thị ngay khi user vào trang web
layDanhSachShoes("ADIDAS");
layDanhSachShoes("WOMEN");
layDanhSachShoes("MEN");


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

function xemShoes(shoesID) {
    // gbShoeID = shoesID
    console.log(shoesID);
    //C1
    // var promiseObj = axios({
    //     method: "get",
    //     url: `https://shop.cyberlearn.vn/api/Product/getbyid?id=${shoesID}`
    // }); // pending
    
    //C2
    var promiseObj = callAPILayThongTinShoes(shoesID)

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


// //! 3. Thêm shoes------------------------------------------

// /**
//  *? Thêm
//  *  Function themNV
//  *    + Lấy giá trị từ form
//  *   + tạo đối tượng NV (đúng chuẩn thuộc tính data của BE)
//  *   + Call Api => lưu NV xuống BE thông qua api
//  *    => thêm thành công => hiển thị danh sách mới thêm
//  *    Ngược lại, thất bại => thông báo lỗi  
//  */

// function themNhanVien() {
//     console.log('themNhanVien')
//     //lấy thông tin từ form
//     var taiKhoanNV = queryELE("#tknv").value;
//     var tenNV = queryELE("#name").value;
//     var emailNV = queryELE("#email").value;
//     var matKhauNV = queryELE("#password").value;
//     var ngayLamNV = queryELE("#datepicker").value;
//     var luongCoBanNV = Number(queryELE("#luongCB").value);
//     var chucVuNV = queryELE("#chucvu").value;
//     var chucVuNVID = queryELE("#chucvu").selectedIndex;
//     var gioLamNV = Number(queryELE("#gioLam").value);
    
//     console.log(taiKhoanNV, tenNV, emailNV, matKhauNV, ngayLamNV, luongCoBanNV, chucVuNV,chucVuNVID, gioLamNV)

//     var nv = new NhanVien(taiKhoanNV, tenNV, emailNV, matKhauNV, ngayLamNV, luongCoBanNV, chucVuNV, gioLamNV);
//     console.log("nhan vien moi:",nv);

//     //C1
//     // var promiseObj = axios({
//     //     method: 'post',
//     //     url: 'https://svcy.myclass.vn/api/QuanLyNhanVienApi/ThemNhanVien',
//     //     data: nv
//     // });//pending
    
//     //C2
//     var promiseObj = callAPIThemNhanVien(nv);

//     //then làm những việc sau khi thành công
//     promiseObj.then(function (result) {
//         //thành công
//         console.log(result);
//         //Gọi hàm lấy danh sách để call API lấy danh sach , hiển thi UI
//         layDanhSachShoes();

//     });

//     //catch me if you can => catch bắt lấy lỗi
//     promiseObj.catch(function (error) {
//         //thất bại
//         console.log(error);
//     })

// }

// document.getElementById("btnThemNV").onclick = themNhanVien;

// //! 4. Xóa shoes------------------------------------------
// /**
//  * Xóa shoes
//  * input : maNVXoa
//  * Function xoaShoes
//  *     + call API => truyền maNVXoa vào API (pending)
//  *     + Thành công ( then ): => hiển thị danh sách đã xóa sinh viên
//  *     + Thất bại ( catch ): thông báo lỗi
//  */

// function xoaNhanVien(taiKhoanNVXoa) {
//     console.log("taiKhoanNVXoa:",taiKhoanNVXoa);

//     //ES5: 'https://NVcy.myclass.vn/api/ShoesApi/XoaShoes?maShoes=' + taiKhoanNVXoa
//     //pending
//     // axios({
//     //     method: 'delete',
//     //     url: `https://svcy.myclass.vn/api/QuanLyNhanVienApi/XoaNhanVien?maShoes=${taiKhoanNVXoa}`
//     // }).then(function (result) {
//     //     console.log(result);
//     //     //Lấy danh sách đã xóa sinh viên và hiển thị lên UI
//     //     layDanhSachShoes();
//     // }).catch(function (error) {
//     //     console.log(error)
//     // })

//     callAPIXoaNhanVien(taiKhoanNVXoa)
//     .then(function (result) {
//         console.log(result);
//         //Lấy danh sách đã xóa sinh viên và hiển thị lên UI
//         layDanhSachShoes();
//     }).catch(function (error) {
//         console.log(error)
//     })
// }

// //! 6. Cập nhật thông tin shoes------------------------------------------
// /**
//  * Cập nhật
//  * input: NV (chứa thông tin cập nhật), maNVUpdate
//  * function capNhatNV
//  *         + lấy dữ liệu từ form
//  *         + tạo đối tượng NV cập nhật
//  *        + call API => truyền NV cập nhật, mã sinh viên cần cập nhật
//  *      + Thành công => hiển thị lại danh sách đã cập nhật
//  *      + Thất bại : thông báo lỗi
//  */

// function capNhatNhanVien() {
//     //lấy thông tin từ form
//     var taiKhoanNV = queryELE("#tknv").value;
//     var tenNV = queryELE("#name").value;
//     var emailNV = queryELE("#email").value;
//     var matKhauNV = queryELE("#password").value;
//     var ngayLamNV = queryELE("#datepicker").value;
//     var luongCoBanNV = Number(queryELE("#luongCB").value);
//     var chucVuNV = queryELE("#chucvu").value;
//     var chucVuNVID = queryELE("#chucvu").selectedIndex;
//     var gioLamNV = Number(queryELE("#gioLam").value);

//     console.log("Nhan vien update: ",taiKhoanNV, tenNV, emailNV, matKhauNV, ngayLamNV, luongCoBanNV, chucVuNV, chucVuNVID, gioLamNV);

//     var nvUpdate = new NhanVien(taiKhoanNV,tenNV,emailNV,matKhauNV,ngayLamNV,luongCoBanNV,chucVuNV,gioLamNV);
//     nvUpdate.tinhTongLuongNV();
//     nvUpdate.xepLoaiNV();
//     console.log(nvUpdate);

//     //C1
//     // var promiseObj = axios({
//     //     method: "put",
//     //     url: `https://svcy.myclass.vn/api/QuanLyNhanVienApi/CapNhatThongTinNhanVien?maNhanVien=${taiKhoanNV}`,
//     //     data: nvUpdate
//     // }); // pending

//     //C2
//     var promiseObj = callAPICapNhatNhanVien(taiKhoanNV, nvUpdate);

//     promiseObj.then(function (result) {
//         console.log(result);
//         layDanhSachShoes()
//     });

//     promiseObj.catch(function (error) {
//         console.log(error)
//     })

// }

// document.getElementById("btnCapNhat").onclick = capNhatNhanVien;