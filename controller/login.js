//! LogIn----------------------

const signinButton = document.querySelector("#btnLogin");

signinButton.addEventListener("click", (event) => {
    
    let email = document.querySelector("#inpEmail").value;
    let password = document.querySelector("#inpPassword").value;
  
    let data = {
        email: email,
        password: password,
    };
    // Call API
    callAPI_Login(data).then((response) => {
        if (response.status === 200) {
            // Login Success
            alert("Login Success!");
            // console.log("Info Login:",response.data.content);
            localStorage.setItem("token", JSON.stringify(response.data.content.accessToken))
            localStorage.setItem("email", JSON.stringify(response.data.content.email))
            window.location.href = "../index.html";

        } else {
            // Login Failed
            alert("Login Failed!");
        }
    }).catch((error) => {
        alert("Login Failed!")
        console.log(error);
    });
});




