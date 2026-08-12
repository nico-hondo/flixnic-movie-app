const token = localStorage.getItem('userRegister');
// console.log(getId);

const API_KEY = "5d74e3be220bace8aa2f3306983fdb6c";

async function getDetailFilm(watchListId){
    
    const getDatabyId = watchListId.map(id => {
        const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`;
        
        return fetch(url).then(res => {
            if(!res.ok) throw new Error(`Gagal Fetching data id ke - ${id}: ${res.status}`);

            return res.json();
        })
    })

    
    const watchList = await Promise.all(getDatabyId);
        // get job and director
    return watchList;
}

document.addEventListener("DOMContentLoaded", async () =>{
    try{

        const localIdWatchList = localStorage.getItem('watchListData');

        const paragRaph = document.querySelector('div.wrap-main main > div.transparent');
        console.log(paragRaph);
        if(!localIdWatchList){
            console.log('Watch List Kosong');
            paragRaph.classList.remove('transparent')
            return;
        }

        const watchList = JSON.parse(localIdWatchList);

        const data = await getDetailFilm(watchList);

        console.log(data);

        const title = document.querySelector("h2.section-head");

        console.log(title);

        const countMov = document.querySelector(".countPopular");
        countMov.textContent = `(${data.length})`;
        // console.log(wrapDetailFilm);
        
        data.forEach((movie) => {
            const putDetail = document.createElement('div');
            putDetail.setAttribute('class', 'flex-1 flex flex-row gap-10');

            //create element Img
            const imgUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            const imgItem = document.createElement('img');  
            imgItem.setAttribute('src', imgUrl);
            imgItem.setAttribute('alt', 'test');
            imgItem.setAttribute('class', 'rounded-md');
            imgItem.setAttribute('width', '150');
            imgItem.setAttribute('height', '140');

            //create element div
            const putInfo = document.createElement('div');
            putInfo.setAttribute('class', 'wrap-detail-info flex flex-col gap-4');

            //create element h3 - Judul tiap film
            const judul = document.createElement('h3');
            judul.setAttribute('class', 'text-2xl text-white section-head');
            judul.textContent = movie.original_title;

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
            spanSecChild.textContent = Math.round(movie.vote_average * 10) / 10;

            const starIcon = document.createElement('i');
            starIcon.setAttribute('class', 'fa-solid fa-star text-yellow-500 text-xs');
            wrapScore.append(spanSecChild, starIcon);

            wrapRating.append(spanFirstChild, wrapScore);

            //create element p for summary of movie
            const summaryItem = document.createElement('p');
            summaryItem.setAttribute('class', 'text-xs text-gray-400 leading-5 tracking-wide');
            summaryItem.textContent = movie.overview;

            // create element for wrap 2 button in every item Film
            const wrapBtn = document.createElement('div');
            wrapBtn.setAttribute('class', 'text-xs uppercase flex flex-row items-center gap-3');

            const spanStBtn = document.createElement('span');
            spanStBtn.setAttribute('class', 'px-4 py-2 bg-white rounded-4xl text-gray-800 font-semibold text-xs cursor-pointer');
            spanStBtn.textContent = "view details";

            spanStBtn.addEventListener('click', () => {
                window.location.href = `../pages/detailMovie.html?id=${movie.id}`;
            })

            const spanNdBtn = document.createElement('span');
            spanNdBtn.setAttribute('class', 'px-4 py-2 border-2 rounded-4xl border-gray-400  text-gray-300 font-semibold text-xs cursor-pointer');
            spanNdBtn.textContent = "remove from watchlist";
            
            wrapBtn.append(spanStBtn, spanNdBtn);
            putInfo.append(judul, wrapRating, summaryItem, wrapBtn);

            putDetail.append(imgItem, putInfo);

            title.insertAdjacentElement('afterend', putDetail);
        })
        // console.log(data);
    }catch(err){
        console.error(err);
    }
})