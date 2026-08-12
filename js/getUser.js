const getUser = localStorage.getItem('userRegister');

const iconUser = document.querySelector('nav.nav-list ul > li:nth-child(3)');
// console.log(iconUser)

const allFilms = document.querySelector('nav.nav-list ul > li:nth-child(1)');

const watchList = document.querySelector('nav.nav-list ul > li:nth-child(2)');
// console.log(allFilms);

if(getUser){
    const dataUser = JSON.parse(getUser);

    console.log(dataUser);
    const nama = dataUser.name;
    const firstLetter = nama.split(' ').map(val => val[0]).join("");
    // console.log(firstLetter);

    iconUser.textContent = firstLetter;
    iconUser.classList.remove("py-2", "px-4")
    iconUser.classList.add('user-icon');
}

iconUser.addEventListener('click', () => {
    if(!getUser){
        //navigate back to login
        window.location.href = "../auth/login.html";    
    }
    //Jika ada token login, maka akan diparse ke halaman login dan diclear localstoragenya;
    localStorage.removeItem('token');
    //navigate back to login
    window.location.href = "../auth/login.html";
})

allFilms.addEventListener('click', () => {
    window.location.href = "../index.html";
})

watchList.addEventListener('click', () => {
    window.location.href = "../pages/watchList.html";
})
