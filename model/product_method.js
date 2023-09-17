function Product_Method() {
    this.arrayProduct = [];

    //TODO: insertProduct
    this.insertProduct = function (product) {
        //lưu obj vào mảng
        this.arrayProduct.push(product);
    }

    //TODO: deleteProduct => xử lý xóa phần tử khỏi arrayProduct
    this.deleteProduct = function (productID) {
        console.log("phương thức", productID);

        //Array: dựa vào index => xóa pt khỏi mảng
        var indexXoa = this.arrayProduct.findIndex(function (prd) {
            return prd.productID == productID;
        });
        console.log(indexXoa);
        
        // splice(vị trí cần xóa,số lượng cần xóa)
        this.arrayProduct.splice(indexXoa, 1);
    }

    //TODO: viewProduct => tìm shoes=> return shoes tìm được lên main
    // tìm index => lấy phần tử dựa index => return phần tử 
    this.viewProduct = function (productID) {
        console.log(productID)
        // find(): giống findIndex nhưng khác kết quả trả về (phần tử tìm được)
        var productFind = this.arrayProduct.find(function (prd) {
            return prd.productID == productID;
        });
        console.log(productFind);
        return productFind;
    }

    //TODO: updateProduct
    // input: shoesID
    // output: thay đổi được dữ liệu của shoes cần cập nhât (mã không đổi)
    this.updateProduct = function (productUpdate) {
        console.log("capNhat", productUpdate)
        //nếu tìm thấy => trả về vị trí tìm được
        //ngược lại => trả về -1
        var indexUpdate = this.arrayProduct.findIndex(function (prd) {
            return prd.productID == productUpdate.ShoesID
        });

        if (indexUpdate > -1) {
            //tìm thấy
            // cập nhật giá trị của phần tử dựa vào vị trí
            this.arrayProduct[indexUpdate] = productUpdate;
        }
      }

    //TODO: Tim kiếm: C1
    this.searchProduct = function (findWord) {
        // B1: chuyển findWord và tenshoes của mảng sang chữ thường
        // B2: xóa khoảng trắng của findWord và tenshoes
        // B3: sử dụng kiểm tra có chứa ký tự => trong tenshoes chứa cụm từ cần tìm
    
        var mangTK = []; //Kết quả (0 -> n) => type mảng đối tượng
        var tushoesIDSpace = findWord.toLowerCase().replace(/\s/g, "");
        console.log(tushoesIDSpace);
    
        this.arrayProduct.map(function (prd) {
            var indexTK = prd.ShoesType.toLowerCase().replace(/\s/g, "").indexOf(tushoesIDSpace);
            if(indexTK > -1){
                //tim thay => lưu shoes tìm được vào mảng tk
                 mangTK.push(prd);   
            }
    
        })
    
        return mangTK;
    }

    //TODO: increase Quantity
    this.increaseQuantity = function (productID) {

        let indexChange = this.arrayProduct.find(function (prd) {
            return prd.productID == productID;
        })
        indexChange.quantity ++;
        (this.arrayProduct)[(this.arrayProduct).indexOf(indexChange)] = indexChange;


    }

    //TODO: decrease Quantity
    this.decreaseQuantity = function (productID) {
        let indexChange = this.arrayProduct.find(function (prd) {
            return prd.productID == productID;
        })
        if (indexChange.quantity > 1) {
            indexChange.quantity--;
        } else {
            indexChange.quantity = 1;
        }
        (this.arrayProduct)[(this.arrayProduct).indexOf(indexChange)] = indexChange;
    }
}
