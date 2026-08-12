const form = document.querySelector('div.wrap-right div > form');   
// console.log(form);

const getUser = localStorage.getItem('userRegister');

const registerPage = document.querySelector('span.cursor-pointer');

form.addEventListener("submit", (e) => {
    e.preventDefault();
    
    const errorMsg = form.querySelector("div.validasi-auth");

    //validasi jika panjang password yang diinput lebih kecil dari 8
    if(e.target.password.value.length < 8){
        errorMsg.textContent = "Password Minimal 8 Karakter";
        errorMsg.classList.remove("transparent");

        return;
    }
    errorMsg.classList.add('transparent');

    const authUser = {
        token: 1,
    }

    const userRegist = JSON.parse(getUser);
    //validasi apakah data yang dilocalstorage hasil regist user sebelumnya sudah sesuai dengan inputan login user
    if(e.target.email.value !== userRegist.email || e.target.password.value !== userRegist.pass){
        errorMsg.textContent = "Email atau Password tidak sesuai";
        errorMsg.classList.remove("transparent");
        setTimeout(() => {
            window.location.reload();
        }, 8000);

        return;
    }

    window.location.href = "../../index.html";
    // console.log(authUser);

    localStorage.setItem('tokenUser', JSON.stringify(authUser));
})

registerPage.addEventListener('click', () => {
    window.location.href = "../../auth/register.html";
})