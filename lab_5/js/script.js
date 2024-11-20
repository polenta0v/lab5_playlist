let createHTML = function (song) {
    let card = document.createElement('div');
    card.classList.add('card');

    let img = document.createElement('img');
    img.src = song.imagePath;
    img.alt = song.songTitle;
    card.appendChild(img);

    let description = document.createElement('div');
    description.classList.add('description');

    let h3 = document.createElement('h3');
    h3.textContent = song.songTitle;
    description.appendChild(h3);

    let h5 = document.createElement('h5');
    h5.textContent = song.bandName;
    description.appendChild(h5);

    let p = document.createElement('p');
    p.textContent = song.description;
    description.appendChild(p);

    let delete_butt = document.createElement('button');
    delete_butt.textContent = 'Видалити';
    delete_butt.className = 'delete-button';
    delete_butt.dataset.index = song.id;

    delete_butt.addEventListener('click', (e) => {
        e.stopPropagation();
        let index = e.target.dataset.index;
        index = Number(index);

        const songIndex = songs.findIndex(song => song.id === index);
        if (songIndex !== -1) {
            songs.splice(songIndex, 1);

            localStorage.setItem('songs', JSON.stringify(songs));

            if (currentSongIndex === songIndex) {
                currentSongIndex = -1;
                audio.pause();
                document.getElementById('player').style.opacity = 0;
            }
        }
        renderSongs();
    });

    description.appendChild(delete_butt);
    card.appendChild(description);


    card.addEventListener('click', function () {
        selectSong(songs.indexOf(song));
    });

    document.querySelector('.container').appendChild(card);
};


let audio = new Audio();
let currentSongIndex = -1;

function renderSongs() {
    const container = document.querySelector('.container');
    container.innerHTML = '';
    songs.forEach(song => {
        createHTML(song);
    });
}

function selectSong(index) {
    currentSongIndex = index;
    loadSong(songs[currentSongIndex]);
}

function loadSong(song) {
    document.getElementById('player').style.opacity = 1;

    document.getElementById('player-image').src = song.imagePath;
    document.getElementById('player-song-title').textContent = song.songTitle;
    document.getElementById('player-band-name').textContent = song.bandName;
    document.getElementById('descriptions-song').textContent = song.description;

    audio.src = song.audioPath;
    audio.load();

    audio.addEventListener('loadedmetadata', function () {
        document.getElementById('total-time').textContent = formatTime(audio.duration);
        document.getElementById('seek-bar').max = audio.duration;
    });

    audio.play();
    document.getElementById('play-pause-btn').textContent = 'Pause';
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${minutes}:${sec < 10 ? '0' : ''}${sec}`;
}

document.getElementById('play-pause-btn').addEventListener('click', function () {
    if (audio.paused) {
        audio.play();
        this.textContent = 'Pause';
    } else {
        audio.pause();
        this.textContent = 'Play';
    }
});

audio.addEventListener('timeupdate', function () {
    document.getElementById('current-time').textContent = formatTime(audio.currentTime);
    document.getElementById('seek-bar').value = audio.currentTime;
});

document.getElementById('seek-bar').addEventListener('input', function () {
    audio.currentTime = this.value;
});

document.getElementById('volume-slider').addEventListener('input', function () {
    audio.volume = this.value;
});


let songs = JSON.parse(localStorage.getItem('songs')) || [];
console.log(songs);

if (songs.length === 0) {

    fetch('songs.json')
        .then(response => response.json())
        .then(data => {
            songs = data;
            localStorage.setItem('songs', JSON.stringify(songs)); // Сохраняем данные в localStorage
            renderSongs();
        })
        .catch(error => console.error('Error loading JSON:', error));
} else {
    renderSongs();
}