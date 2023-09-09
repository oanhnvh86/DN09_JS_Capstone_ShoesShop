
function callAPILayDanhSachShoes() {
    return axios({
        method: 'get',
        url: `https://shop.cyberlearn.vn/api/Product`
    });
}

function callAPILayDanhSachShoesByCategory(categoryid) {
    return axios({
        method: 'get',
        url: `https://shop.cyberlearn.vn/api/Product/getProductByCategory?categoryId=${categoryid}`
    });
}

function callAPILayThongTinShoes(shoesID) {
    return axios({
        method: 'get',
        url: `https://shop.cyberlearn.vn/api/Product/getbyid?id=${shoesID}`
    });
}

// function callAPIThemShoes(nvInsert) {
//     return axios({
//         method: 'post',
//         url: 'https://svcy.myclass.vn/api/QuanLyShoesApi/ThemShoes',
//         data: nvInsert
//     });
// }

// function callAPIXoaShoes(shoesIDXoa) {
//     return axios({
//         method: 'delete',
//         url: `https://shop.cyberlearn.vn/api/Product/XoaShoes?maSinhVien=${shoesIDXoa}`
//     });
// }

// function callAPICapNhatShoes(shoesID, nvUpdate) {
//     return axios({
//         method: "put",
//         url: `https://shop.cyberlearn.vn/api/Product//CapNhatThongTinShoes?maShoes=${shoesID}`,
//         data: nvUpdate
//     });
// }
