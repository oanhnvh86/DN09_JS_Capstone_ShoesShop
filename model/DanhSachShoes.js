function DanhSachShoes() {
    this.mangShoes = [];
themShoes
    //TODO: themShoes
    this.themShoes = function (shoes) {
        //lưu obj vào mảng
        this.mangShoes.push(shoes);
    }

    //TODO: xoashoes => xử lý xóa phần tử khỏi mangShoes
    this.xoashoes = function (shoesID) {
        console.log("phương thức", shoesID);

        //Array: dựa vào index => xóa pt khỏi mảng
        var indexXoa = this.mangShoes.findIndex(function (shoes) {
            return shoes.ShoesID == shoesID;
        });
        console.log(indexXoa);
        
        // splice(vị trí cần xóa,số lượng cần xóa)
        this.mangShoes.splice(indexXoa, 1);
    }

    //TODO: xemshoes => tìm shoes=> return shoes tìm được lên main
    // tìm index => lấy phần tử dựa index => return phần tử 
    this.xemshoes = function (shoesID) {
        console.log(shoesID)
        // find(): giống findIndex nhưng khác kết quả trả về (phần tử tìm được)
        var shoesFind = this.mangShoes.find(function (shoes) {
            return shoes.ShoesID == shoesID;
        });
        console.log(shoesFind);
        return shoesFind;
    }

    //TODO: capNhatshoes
    // input: shoesID
    // output: thay đổi được dữ liệu của shoes cần cập nhât (mã không đổi)
    this.capNhatshoes = function (shoesUpdate) {
        console.log("capNhat", shoesUpdate)
        //nếu tìm thấy => trả về vị trí tìm được
        //ngược lại => trả về -1
        var indexUpdate = this.mangShoes.findIndex(function (shoes) {
            return shoes.ShoesID == shoesUpdate.ShoesID
        });

        if (indexUpdate > -1) {
            //tìm thấy
            // cập nhật giá trị của phần tử dựa vào vị trí
            this.mangShoes[indexUpdate] = shoesUpdate;
        }
      }

    //TODO: Tim kiếm: C1
    this.timKiemLoaishoes = function (tuTK) {
        // B1: chuyển tuTK và tenshoes của mảng sang chữ thường
        // B2: xóa khoảng trắng của tuTK và tenshoes
        // B3: sử dụng kiểm tra có chứa ký tự => trong tenshoes chứa cụm từ cần tìm
    
        var mangTK = []; //Kết quả (0 -> n) => type mảng đối tượng
        var tushoesIDSpace = tuTK.toLowerCase().replace(/\s/g, "");
        console.log(tushoesIDSpace);
    
        this.mangShoes.map(function (shoes) {
            var indexTK = shoes.ShoesType.toLowerCase().replace(/\s/g, "").indexOf(tushoesIDSpace);
            if(indexTK > -1){
                //tim thay => lưu shoes tìm được vào mảng tk
                 mangTK.push(shoes);   
            }
    
        })
    
        return mangTK;
    }
}
