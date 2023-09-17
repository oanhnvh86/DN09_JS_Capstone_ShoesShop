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
            alert("Login Success!");

            console.log("Info Login:",response.data.content);
            localStorage.setItem("token", JSON.stringify(response.data.content.accessToken))
            localStorage.setItem("email", JSON.stringify(response.data.content.email))
            
            window.location.href = "../index.html";

        } else {
            // Đăng ký thất bại
            alert("Login Failed!");
        }
    }).catch((error) => {
        alert("Login Failed!")
        console.log(error);
    });
    

});




