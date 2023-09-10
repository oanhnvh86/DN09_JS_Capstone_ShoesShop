//Validation: chứa method giúp kiểm tra các điều kiện dữ liệu có hợp lệ hay không

function Validation() {
    //input: value (giá trị của ô nhập), message, spanID (id của thẻ thông báo)
    //output: true , false
    this.checkEmpty = function (value, message, spanID) {
        //value từ form là kiểu string => so sánh chuỗi rỗng
        if (value != "") {
            //?value không bị rỗng => dữ liệu đúng
            document.getElementById(spanID).innerHTML = "";
            document.getElementById(spanID).style.display = "none";

            return true;// lệnh thoát khỏi hàm
            // document.getElementById(spanID).style.display = "block";
        }

        //!Dữ liệu sai 
        document.getElementById(spanID).innerHTML = message;
        document.getElementById(spanID).style.display = "block";
        return false;
    }

    //input: value (giá trị của ô nhập), message, spanID (id của thẻ thông báo), mangNV
    //output: true , false
    this.checkID = function (value, message, spanID, mangNV) {
        //some(): dựa vào điều kiện kiểm tra => trả về kết quả true/ false

        //isExist: có tồn tại hay không
        var isExist = mangNV.some(function (nv) {
            return nv.taiKhoanNV == value
        });

        if (isExist) {
            //!mã bị trùng => some => true
            document.getElementById(spanID).innerHTML = message;
            document.getElementById(spanID).style.display = "block";
            //!kết quả cuối cùng => false
            return false;
        } 
            //không trùng => some => false

            document.getElementById(spanID).innerHTML = "";
            document.getElementById(spanID).style.display = "none";

            //?kết quả cuối cùng => true
            return true;

    }

    this.checkTaiKhoan = function (value, message, spanID) {
        var l = value.length;
        if (l>=4 && l<=6) {
            //hợp lệ
            document.getElementById(spanID).innerHTML = "";
            document.getElementById(spanID).style.display = "none";
            return true;
        }

        // không hợp lệ
        document.getElementById(spanID).innerHTML = message;
        document.getElementById(spanID).style.display = "block";
        return false;

    }

    //input: value (giá trị của ô nhập), message, spanID (id của thẻ thông báo)
    //output: true , false
    this.checkName = function (value, message, spanID) {
        var pattern = /^[a-z A-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹý\\s]+$/;

        // match đem chuỗi cần kt đi so sánh với định dạng dữ liệu của biểu thức chính quy (pattern, regexp)
        // var result = value.match(pattern);
        if (value.match(pattern)) {
            //hợp lệ
            document.getElementById(spanID).innerHTML = "";
            document.getElementById(spanID).style.display = "none";
            return true;
        }

        // không hợp lệ
        document.getElementById(spanID).innerHTML = message;
        document.getElementById(spanID).style.display = "block";
        return false;

    }

    //input: value (giá trị của ô nhập), message, spanID (id của thẻ thông báo)
    //output: true , false
    this.checkEmail = function (value, message, spanID) {
        var pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        if (value.match(pattern)) {
            //hợp lệ 
            document.getElementById(spanID).innerHTML = "";
            document.getElementById(spanID).style.display = "none";
            return true;
        }
        // không hợp lệ
        document.getElementById(spanID).innerHTML = message;
        document.getElementById(spanID).style.display = "block";
        return false;

    }

    //Check Password
    this.checkPassword = function (value, message, spanID) {
        var pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,10}$/;

        if (value.match(pattern)) {
            //hợp lệ 
            document.getElementById(spanID).innerHTML = "";
            document.getElementById(spanID).style.display = "none";
            return true;
        }
        // không hợp lệ
        document.getElementById(spanID).innerHTML = message;
        document.getElementById(spanID).style.display = "block";
        return false;

    }

     //Check Date
    this.checkDate = function (value, message, spanID) {
        var pattern = /^(0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])[\/\-]\d{4}$/;

        if (value.match(pattern)) {
            //hợp lệ 
            document.getElementById(spanID).innerHTML = "";
            document.getElementById(spanID).style.display = "none";
            return true;
        }
        // không hợp lệ
        document.getElementById(spanID).innerHTML = message;
        document.getElementById(spanID).style.display = "block";
        return false;

    }

    //Check LuongCoBan
    this.checkLuongCoBan = function (value, message, spanID) {
        if (value>=1000000 && value<= 20000000) {
            //hợp lệ 
            document.getElementById(spanID).innerHTML = "";
            document.getElementById(spanID).style.display = "none";
            return true;
        }
        // không hợp lệ
        document.getElementById(spanID).innerHTML = message;
        document.getElementById(spanID).style.display = "block";
        return false;

    }

    //Input: option chuc vụ
    this.checkOption = function(valueid,message,spanID){
        if(valueid!=0){
             //hợp lệ 
             document.getElementById(spanID).innerHTML = "";
             document.getElementById(spanID).style.display = "none";
             return true;
        }
         // không hợp lệ
         document.getElementById(spanID).innerHTML = message;
         document.getElementById(spanID).style.display = "block";
         return false;
    }

    //Check so gio lam
    this.checkSoGioLam = function (value, message, spanID) {
        if (value>=80 && value<= 200) {
            //hợp lệ 
            document.getElementById(spanID).innerHTML = "";
            document.getElementById(spanID).style.display = "none";
            return true;
        }
        // không hợp lệ
        document.getElementById(spanID).innerHTML = message;
        document.getElementById(spanID).style.display = "block";
        return false;

    }

    //input: value (giá trị của ô nhập), message, spanID (id của thẻ thông báo)
    //output: true , false
    this.checkPhone = function(value, message, spanID){
        var pattern = /^[0-9]+$/;
        if(value.match(pattern) && value.length >=9 && value.length <=11){
              //hợp lệ 
              document.getElementById(spanID).innerHTML = "";
              document.getElementById(spanID).style.display = "none";
              return true;
        }

          // không hợp lệ
          document.getElementById(spanID).innerHTML = message;
          document.getElementById(spanID).style.display = "block";
          return false;
    }

    // //input: value (giá trị của ô nhập), message, spanID (id của thẻ thông báo)
    // //output: true , false
    // this.checkScore =function(value, message, spanID){
    //     var pattern = /^(\d{1,2}(\.\d{1,2})?)$/;

    //     if(value.match(pattern) && value <= 10){
    //          //hợp lệ 
    //          document.getElementById(spanID).innerHTML = "";
    //          document.getElementById(spanID).style.display = "none";
    //          return true;
    //     }

    //      // không hợp lệ
    //      document.getElementById(spanID).innerHTML = message;
    //      document.getElementById(spanID).style.display = "block";
    //      return false;
    // }
}