const API_KEY = "5d74e3be220bace8aa2f3306983fdb6c";

async function getDataFilm(){
    
    const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`;

    const res = await fetch(url);

    if(!res.ok){
        throw new Error(res.status);
    }

    const data = await res.json();

    return data;
}

document.addEventListener("DOMContentLoaded", async () =>{
    try{
        const data = await getDataFilm();
        const movies = data.results

        const wrapDetailFilm = document.querySelector('main div > div.detail-film');
        // console.log(wrapDetailFilm);

        movies.forEach((movie) => {
            const putDetail = document.createElement('div');
            putDetail.setAttribute('class', 'flex-1 flex flex-row gap-5');

            //create element Img
            const imgUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            const imgItem = document.createElement('img');
            imgItem.setAttribute('src', imgUrl);
            imgItem.setAttribute('alt', 'test');
            imgItem.setAttribute('class', 'rounded-md');
            imgItem.setAttribute('width', '120');
            imgItem.setAttribute('height', '120');

            //create element div
            const putInfo = document.createElement('div');
            putInfo.setAttribute('class', 'wrap-detail-info flex flex-col gap-2');

            //create element h3 - Judul tiap film
            const judul = document.createElement('h3');
            judul.setAttribute('class', 'text-lg');
            judul.textContent = movie.original_title;

            //create element div pembungkus info rating
            const wrapRating = document.createElement('div');
            wrapRating.setAttribute('class', 'score flex flex-row items-center gap-5');

            const spanFirstChild = document.createElement('span');
            spanFirstChild.setAttribute('class', 'px-3 py-1 bg-yellow-500 rounded-md text-xs text-black font-semibold');
            spanFirstChild.textContent = "IMDb";

            const wrapScore = document.createElement('div');
            wrapScore.setAttribute('class', 'flex flex-row items-center gap-1');
            
            const spanSecChild = document.createElement('span');
            spanSecChild.setAttribute('class', 'text-xs');
            spanSecChild.textContent = Math.round(movie.vote_average * 10) / 10;

            const starIcon = document.createElement('i');
            starIcon.setAttribute('class', 'fa-solid fa-star text-yellow-500 text-xs');

            wrapScore.append(spanSecChild, starIcon);
            wrapRating.append(spanFirstChild, wrapScore);

            //create element p for summary of movie
            const summaryItem = document.createElement('p');
            summaryItem.setAttribute('class', 'text-xs text-gray-400 mb-3 leading-5');
            summaryItem.textContent = movie.overview;

            // create element for wrap 2 button in every item Film
            const wrapBtn = document.createElement('div');
            wrapBtn.setAttribute('class', 'text-xs uppercase btn-action-mov-item');

            const spanBtnStChild = document.createElement('span');
            spanBtnStChild.setAttribute('class', 'px-4 py-2 bg-white text-gray-900 font-semibold rounded-4xl mr-2 cursor-pointer')
            spanBtnStChild.textContent = "view details";

            spanBtnStChild.addEventListener('click', () => {
                window.location.href = `../pages/detailMovie.html?id=${movie.id}`
            })

            const spanBtnNdChild = document.createElement('span');
            spanBtnNdChild.setAttribute('class', 'px-4 py-2 border-2 rounded-4xl border-gray-600 text-xs font-semibold cursor-pointer');
            spanBtnNdChild.textContent = "add to watchlists";
            
            wrapBtn.append(spanBtnStChild, spanBtnNdChild);
            putInfo.append(judul, wrapRating, summaryItem, wrapBtn);

            putDetail.append(imgItem, putInfo);

            wrapDetailFilm.insertAdjacentElement('afterbegin', putDetail);
        })

        const countMov = document.querySelector(".countPopular");
        countMov.textContent = `(${movies.length})`;
        // console.log(data);

    }catch(err){
        console.error(err);
    }
})

