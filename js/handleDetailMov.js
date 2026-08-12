const token = localStorage.getItem('userRegister');
// console.log(getId);

const params = new URLSearchParams(window.location.search);
const movieId = params.get('id');

const API_KEY = "5d74e3be220bace8aa2f3306983fdb6c";

async function getDetailFilm(){
    
    const res = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=en-US`);
    
    const movie = res.data; // object tunggal, bukan array

    const respon = await fetch(`https://api.themoviedb.org/3/movie/${movie.id}/credits?api_key=${API_KEY}&language=en-US`);
    const creditData = await respon.json();

    const directors = creditData.crew.filter(member => member.job === 'Director');
    // console.log("Director: ", directors);
    const directorName = directors.map(director => director.name);

    // narik cast
    const castName =  creditData.cast.slice(0, 5).map(actor => actor.name);

    // console.log(res.data);
    // console.log(directorName);

    const movieDetail = {
        ...movie,
        director: directorName.join(", ") || "Unknown",
        cast: castName.join(", ") || "Unknown",
    }

    console.log(movieDetail);
    // get job and director
    return movieDetail;
}

document.addEventListener("DOMContentLoaded", async () =>{
    try{
        const data = await getDetailFilm();

        document.title = data.original_title;

        const wrapDetailFilm = document.querySelector('div.wrap-main > main');
        // console.log(wrapDetailFilm);

        const breadCrumb = document.createElement('span');
        breadCrumb.setAttribute('class', 'text-gray-400 text-xs font-medium cursor-pointer');
        breadCrumb.textContent = "All Films /";

        breadCrumb.addEventListener('click', () => {
            window.location.href = "../index.html";
        })

        const putDetail = document.createElement('div');
        putDetail.setAttribute('class', 'flex-1 flex flex-row gap-10');

        //create element Img
        const imgUrl = `https://image.tmdb.org/t/p/w500${data.poster_path}`
        const imgItem = document.createElement('img');  
        imgItem.setAttribute('src', imgUrl);
        imgItem.setAttribute('alt', 'test');
        imgItem.setAttribute('class', 'rounded-md');
        imgItem.setAttribute('width', '200');
        imgItem.setAttribute('height', '180');

        //create element div
        const putInfo = document.createElement('div');
        putInfo.setAttribute('class', 'wrap-detail-info flex flex-col gap-4');

        //create element h3 - Judul tiap film
        const judul = document.createElement('h3');
        judul.setAttribute('class', 'text-2xl text-white section-head');
        judul.textContent = data.original_title;

        //create element div pembungkus info rating
        const wrapRating = document.createElement('div');
        wrapRating.setAttribute('class', 'score flex flex-row items-center gap-4');

        const spanFirstChild = document.createElement('span');
        spanFirstChild.setAttribute('class', 'px-2 py-1 bg-yellow-500 rounded-md text-xs font-semibold');
        spanFirstChild.textContent = "IMDb";

        const wrapScore = document.createElement('div');
        wrapScore.setAttribute('class', 'flex flex-row items-center justify-center gap-1');
        
        const spanSecChild = document.createElement('span');
        spanSecChild.setAttribute('class', 'text-xs text-gray-300 font-medium');
        spanSecChild.textContent = Math.round(data.vote_average * 10) / 10;

        const starIcon = document.createElement('i');
        starIcon.setAttribute('class', 'fa-solid fa-star text-yellow-500 text-xs');
        wrapScore.append(spanSecChild, starIcon);

        wrapRating.append(spanFirstChild, wrapScore);

        const wrapGenre = document.createElement('div');
        wrapGenre.setAttribute('class', 'flex flex-row gap-2 items-center text-center text-gray-600 text-xs')

        data.genres.forEach((val) => {
            const span = document.createElement('span');
            span.setAttribute('class', 'rounded-md border-2 border-gray-400 text-gray-400 font-medium px-3 py-1 text-center');
            span.textContent = val.name 

            wrapGenre.append(span);
        })

        const wrapDirCast = document.createElement('div');
        wrapDirCast.setAttribute('class', 'wrap-dir-cast grid gap-2');

        const dirP = document.createElement('p');
        dirP.setAttribute('class', 'text-xs font-medium text-gray-300')
        dirP.textContent = `Director: ${data.director}`;

        const castP = document.createElement('p');
        castP.setAttribute('class', 'text-xs font-medium text-gray-300')
        castP.textContent = `Cast: ${data.cast}`;

        wrapDirCast.append(dirP, castP)

        //create element p for summary of movie
        const summaryItem = document.createElement('p');
        summaryItem.setAttribute('class', 'text-xs text-gray-400 mb-3 leading-5 tracking-wide');
        summaryItem.textContent = data.overview;

        // create element for wrap 2 button in every item Film
        const wrapBtn = document.createElement('div');
        wrapBtn.setAttribute('class', 'text-xs uppercase flex flex-row items-center gap-3');

        const existingData = localStorage.getItem('watchListData');
        // const existing = existingData ? JSON.parse(existingData) : [];
        // const existingId = existing.find(cek => cek === data.id); 
        // console.log(existingData);

        
        const spanBtn = document.createElement('span');
        spanBtn.setAttribute('class', 'px-4 py-2 border-2 rounded-4xl border-gray-400 text-gray-300 font-semibold text-xs cursor-pointer');
        spanBtn.textContent = "add to watchlist";

        spanBtn.addEventListener('click', () => {
            if(!token){
                window.location.href = "../auth/login.html"
            }else{
                //cek apakah ada key di localstorage dengan nama watchlistdata

                let watchList;

                if(!existingData){
                    watchList = [data.id];
                }else{
                    watchList = JSON.parse(existingData);

                    if(watchList.includes(data.id)){
                        console.log('Sudah ada di watchList');
                        return;
                    }
                    
                    watchList = [...watchList, data.id];
                }
            localStorage.setItem('watchListData', JSON.stringify(watchList));
            window.location.reload();
            }
        })
    
        wrapBtn.append(spanBtn);
        // }else{
        //     const spanBtnTrailer = document.createElement('span');
        //     spanBtnTrailer.setAttribute('class', 'px-4 py-2 rounded-4xl bg-white text-gray-800 font-semibold text-xs cursor-pointer uppercase');
        //     spanBtnTrailer.textContent = "watch trailer";

        //     const spanBtn = document.createElement('span');
        //     spanBtn.setAttribute('class', 'px-4 py-2 border-2 rounded-4xl border-gray-400 text-gray-300 font-semibold text-xs cursor-pointer uppercase');
        //     spanBtn.textContent = "remove from watchlist";

        //     spanBtnTrailer.addEventListener('click', () => {
        //         window.location.href = "https://www.nicofernando.my.id";
        //     })

        //     spanBtn.addEventListener('click', () => {
        //         let watchList;

        //         watchList = JSON.parse(existingData);
        //         watchList = watchList.filter((id) => id !== data.id);

        //         localStorage.setItem('watchListData', JSON.stringify(watchList));

        //         window.location.reload();
        //     })

        //     wrapBtn.append(spanBtnTrailer, spanBtn);
        // }
        
        putInfo.append(judul, wrapRating, wrapGenre, wrapDirCast, summaryItem, wrapBtn);

        putDetail.append(imgItem, putInfo);

        wrapDetailFilm.insertAdjacentElement('afterbegin', breadCrumb);
        breadCrumb.insertAdjacentElement('afterend', putDetail);
        // console.log(data);
    }catch(err){
        console.error(err);
    }
})