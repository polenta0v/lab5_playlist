import { validateForm } from './validation.js';

function open() {
    let modal = document.querySelector(".modal");
    let backdrop = document.querySelector(".back");

    modal.classList.add("active");
    backdrop.classList.add("active");
}

function close() {
    let modal = document.querySelector(".modal");
    let backdrop = document.querySelector(".back");

    modal.classList.remove("active");
    backdrop.classList.remove("active");
}

let add_button = document.querySelector(".add");
let close_button = document.querySelector(".close");
let apply_button = document.querySelector(".apply");

add_button.addEventListener('click', open);
close_button.addEventListener('click', close);
apply_button.addEventListener('click', (e) => {
    e.preventDefault();

    if (validateForm()) {
        let name = document.getElementById('name').value.trim();
        document.getElementById('name').value = ''
        let group = document.getElementById('group').value.trim();
        document.getElementById('group').value = ''
        let descriptions = document.getElementById('descriptions').value.trim();
        document.getElementById('descriptions').value = ''
        let audio = document.getElementById('audio').files[0];
        document.getElementById('audio').value = ''
        let picture = document.getElementById('pitcure').files[0];
        document.getElementById('pitcure').value = ''

        let newSong = {
            id: songs.length + 1,
            bandName: group,
            songTitle: name,
            imagePath: URL.createObjectURL(picture),
            audioPath: URL.createObjectURL(audio),
            description: descriptions
        };

        songs.push(newSong);
        localStorage.setItem('songs', JSON.stringify(songs));
        createHTML(songs[songs.length - 1]);
        close();
    }
});
