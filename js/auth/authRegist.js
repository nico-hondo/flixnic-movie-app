const formUp = document.querySelector("div.wrap-right div > form");
console.log(formUp);

const signIn = document.querySelector("div.wrap-right div > div span.moveSigninPage");
console.log(signIn);

const allFilms = document.querySelector('nav.nav-list ul > li:nth-child(1)');
// console.log(allFilms);

const watchList = document.querySelector('nav.nav-list ul > li:nth-child(2)');
// console.log(watchList);

formUp.addEventListener("submit", (e) => {
    e.preventDefault();

    const errorMsg = formUp.querySelector("div.validasi-auth");

    //validasi jika panjang lebih kecil dari 8
    if(e.target.password.value.length < 8 && e.target.confpass.value.length < 8){
        errorMsg.textContent = "Password minimal 8 karakter";
        errorMsg.classList.remove("transparent");
        return;
    }

    const authRegist = {
        email: e.target.email.value,
        name: e.target.nama.value,
        pass: e.target.password.value,
        repass: e.target.confpass.value,
    }

    //validasi jika input password dan re-pass tidak sama
    if(e.target.password.value !== e.target.confpass.value){
        errorMsg.textContent = "Password tidak sama, Masukkan ulang";
        errorMsg.classList.remove("transparent");
        setTimeout(() => {
            window.location.reload();
        }, 7000);

        return;
    }

    window.location.href = "../../auth/login.html";
    // console.log(authRegist);
    errorMsg.classList.add("transparent");
    localStorage.setItem("userRegister", JSON.stringify(authRegist));
})

signIn.addEventListener('click', () => {
    window.location.href = "../../auth/login.html";
})

allFilms.addEventListener('click', () => {
    window.location.href = "../index.html";
})

watchList.addEventListener('click', () => {
    window.location.href = "../pages/watchList.html";
})