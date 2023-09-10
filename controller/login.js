const signinButton = document.querySelector("#btnLogin");


signinButton.addEventListener("click", (event) => {
    
    let email = document.querySelector("#inpEmail").value;
    let password = document.querySelector("#inpPassword").value;
  
    let data = {
        email: email,
        password: password,
    };
    // Gửi dữ liệu đăng nhập đến API
    callAPI_Login(data).then((response) => {
        if (response.status === 200) {
            // Đăng ký thành công
            alert("Đăng nhập thành công");
            // console.log(response.data.content.accessToken);
            window.location.href = "../index.html";

        } else {
            // Đăng ký thất bại
            alert("Đăng ký thất bại");
        }
    }).catch((error) => {
        alert("Đăng ký thất bại")
        console.log(error);
    });
    

});




