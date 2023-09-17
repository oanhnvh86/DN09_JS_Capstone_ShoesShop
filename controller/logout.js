function logOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("ProductList");

    if (localStorage.getItem("token") == null) {
        alert("Lout out success!")
        document.getElementById("LoginWrap").style.display = "inline";
        document.getElementById("LogoutWrap").style.display = "none";
    }
}