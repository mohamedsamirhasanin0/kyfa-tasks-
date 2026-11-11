let movies = JSON.parse(localStorage.getItem('movies'));
if (movies === null) {
  movies = [];
}

const movieForm = document.getElementById('movieForm');
const titleInput = document.getElementById('titleInput');
const genreInput = document.getElementById('genreInput');
const yearInput = document.getElementById('yearInput');
const ratingInput = document.getElementById('ratingInput');

const titleError = document.getElementById('titleError');
const genreError = document.getElementById('genreError');
const yearError = document.getElementById('yearError');
const ratingError = document.getElementById('ratingError');

const movieGrid = document.getElementById('movieGrid');
const totalMoviesEl = document.getElementById('totalMovies');
const watchedMoviesEl = document.getElementById('watchedMovies');
const avgRatingEl = document.getElementById('avgRating');

const searchInput = document.getElementById('searchInput');
const filterGenre = document.getElementById('filterGenre');
const sortBy = document.getElementById('sortBy');
const randomBtn = document.getElementById('randomBtn');
const randomAlert = document.getElementById('randomAlert');

function updateApp() {
  localStorage.setItem('movies', JSON.stringify(movies));
  renderMovies();
}

movieForm.addEventListener('submit', function (e) {
  e.preventDefault();

  titleError.textContent = '';
  genreError.textContent = '';
  yearError.textContent = '';
  ratingError.textContent = '';

  let isValid = true;

  const titleVal = titleInput.value.trim();
  const genreVal = genreInput.value;
  const yearVal = parseInt(yearInput.value);
  const ratingVal = parseInt(ratingInput.value);

  if (titleVal.length < 2) {
    titleError.textContent = 'Title must be at least 2 letters';
    isValid = false;
  } else {
    let isDuplicate = false;
    for (let i = 0; i < movies.length; i++) {
      if (movies[i].title.toLowerCase() === titleVal.toLowerCase()) {
        isDuplicate = true;
        break;
      }
    }
    if (isDuplicate) {
      titleError.textContent = 'Movie title already exists!';
      isValid = false;
    }
  }

  if (genreVal === '') {
    genreError.textContent = 'Please choose a genre';
    isValid = false;
  }

  const currentYear = new Date().getFullYear();
  if (isNaN(yearVal) || yearVal < 1900 || yearVal > currentYear) {
    yearError.textContent = 'Year must be between 1900 and ' + currentYear;
    isValid = false;
  }

  if (isNaN(ratingVal) || ratingVal === 0) {
    ratingError.textContent = 'Please choose a rating';
    isValid = false;
  }

  if (isValid) {
    const newMovie = {
      id: Date.now(),
      title: titleVal,
      genre: genreVal,
      year: yearVal,
      rating: ratingVal,
      watched: false
    };

    movies.push(newMovie);
    updateApp();
    movieForm.reset();
  }
});

function renderMovies() {
  movieGrid.innerHTML = '';

  let filtered = [];
  for (let i = 0; i < movies.length; i++) {
    const m = movies[i];
    const searchText = searchInput.value.toLowerCase().trim();
    const matchesSearch = m.title.toLowerCase().includes(searchText);
    const matchesGenre = filterGenre.value === 'All' || m.genre === filterGenre.value;

    if (matchesSearch && matchesGenre) {
      filtered.push(m);
    }
  }

  if (sortBy.value === 'rating') {
    filtered.sort(function (a, b) {
      return b.rating - a.rating;
    });
  } else if (sortBy.value === 'year') {
    filtered.sort(function (a, b) {
      return b.year - a.year;
    });
  }

  for (let i = 0; i < filtered.length; i++) {
    const movie = filtered[i];
    const col = document.createElement('div');
    col.className = 'col-md-6 mb-3';

    let stars = '';
    for (let s = 0; s < movie.rating; s++) {
      stars += '⭐';
    }

    let badgeClass = '';
    let badgeText = '';
    let btnClass = '';
    let btnText = '';

    if (movie.watched) {
      badgeClass = 'badge-watched';
      badgeText = 'Watched';
      btnClass = 'btn-secondary';
      btnText = 'Mark Unwatched';
    } else {
      badgeClass = 'badge-unwatched';
      badgeText = 'Not Watched';
      btnClass = 'btn-success';
      btnText = 'Mark Watched';
    }

    col.innerHTML = `
      <div class="card movie-card shadow-sm h-100">
        <div class="card-body">
          <h5 class="card-title">${movie.title}</h5>
          <p class="card-text mb-1"><strong>Genre:</strong> ${movie.genre}</p>
          <p class="card-text mb-1"><strong>Year:</strong> ${movie.year}</p>
          <p class="card-text mb-2"><strong>Rating:</strong> ${stars}</p>
          <span class="badge ${badgeClass} mb-3">
            ${badgeText}
          </span>
          <div>
            <button class="btn btn-sm ${btnClass} me-1" onclick="toggleWatched(${movie.id})">
              ${btnText}
            </button>
            <button class="btn btn-sm btn-danger" onclick="deleteMovie(${movie.id})">Delete</button>
          </div>
        </div>
      </div>
    `;
    movieGrid.appendChild(col);
  }

  totalMoviesEl.textContent = movies.length;

  let watchedCount = 0;
  for (let i = 0; i < movies.length; i++) {
    if (movies[i].watched) {
      watchedCount++;
    }
  }
  watchedMoviesEl.textContent = watchedCount;

  if (movies.length > 0) {
    let sumRating = 0;
    for (let i = 0; i < movies.length; i++) {
      sumRating += movies[i].rating;
    }
    avgRatingEl.textContent = (sumRating / movies.length).toFixed(1);
  } else {
    avgRatingEl.textContent = '0';
  }
}

function toggleWatched(id) {
  for (let i = 0; i < movies.length; i++) {
    if (movies[i].id === id) {
      movies[i].watched = !movies[i].watched;
    }
  }
  updateApp();
}

function deleteMovie(id) {
  if (confirm('Are you sure you want to delete this movie?')) {
    let updated = [];
    for (let i = 0; i < movies.length; i++) {
      if (movies[i].id !== id) {
        updated.push(movies[i]);
      }
    }
    movies = updated;
    updateApp();
  }
}

searchInput.addEventListener('input', renderMovies);
filterGenre.addEventListener('change', renderMovies);
sortBy.addEventListener('change', renderMovies);

randomBtn.addEventListener('click', function () {
  let unwatched = [];
  for (let i = 0; i < movies.length; i++) {
    if (!movies[i].watched) {
      unwatched.push(movies[i]);
    }
  }

  if (unwatched.length === 0) {
    randomAlert.textContent = 'No unwatched movies left!';
    randomAlert.classList.remove('d-none');
  } else {
    const randomIndex = Math.floor(Math.random() * unwatched.length);
    const chosen = unwatched[randomIndex];
    randomAlert.textContent = 'You should watch: "' + chosen.title + '" (' + chosen.year + ')';
    randomAlert.classList.remove('d-none');
  }
});

renderMovies();