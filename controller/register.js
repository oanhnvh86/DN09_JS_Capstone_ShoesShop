
//! 1.Global Variable ------------------------------------
const signupButton = document.querySelector("#btnRegister");
let validation = new Validation();

//! 2.Check Validation---------------------------------
function checkValidation(email,password,passwordConfirm,name,gender,phone){
    var isValid = true; // giả sử data đúng hết

    //B2: kiểm chứng
    /**
     * ?: Mã: 
     * không được để trống
     * Mã không được trùng
     * (không được để trống ) && (Mã không được trùng)
     *  true  && true => true
     */
    isValid &= validation.checkEmpty(email, "Email không được để trống", "tbEmail") ;
                        // && validation.checkID(inpEmail, "Email không được trùng", "tbEmail", dsnv.mangNV)  ??
                        // && validation.checkEmail(inpEmail,"Email không đúng định dạng","tbEmail");
    isValid &= validation.checkEmpty(password, "Password không được để trống", "tbPassword") ; 
    // isValid &= validation.checkEmpty(passwordConfirm, "PasswordConfirm không được để trống", "tbPasswordConfirm") ;
    isValid &= validation.checkEmpty(name, "Name không được để trống", "tbName")  ;
    // isValid &= validation.checkEmpty(inpGender, "Gender không được để trống", "tbGender");
    isValid &= validation.checkEmpty(phone, "Phone không được để trống", "tbPhone");
    return isValid;
}

//! 3.Register---------------------------------------
signupButton.addEventListener("click", (event) => {
    event.preventDefault();

    // Data Info
    let email = document.querySelector("#inpEmail").value;
    let password = document.querySelector("#inpPassword").value;
    // let passwordConfirm = document.querySelector("#inpPasswordConfirm").value;
    let passwordConfirm = password;
    let name = document.querySelector("#inpName").value;
    let gender = "";
    let checkbox = document.getElementsByName("gender")
    for (var i = 0; i < checkbox.length; i++) {
        if (checkbox[i].checked === true) {
            gender = checkbox[i].value;
        }
    }
    let phone = document.querySelector("#inpPhone").value;
    console.log("gender", gender);
    
    // Kiểm tra tính hợp lệ của dữ liệu
    let isValid = true;
    isValid = checkValidation(email,password,passwordConfirm,name,gender,phone);

    // If valid
    if (isValid) {
        let data = {
            email: email,
            password: password,
            name: name,
            gender: gender,
            phone: phone,
        };

        // Call API
        callAPI_Register(data).then((response) => {
            if (response.status === 200) {
                alert("Register Success!");
                window.location.href = "../view/login.html";
            } else {
                alert("Register Failed!");
            }
        }).catch((error) => {
            alert("Register Failed!")
            console.log(error);
        });
    }
});






