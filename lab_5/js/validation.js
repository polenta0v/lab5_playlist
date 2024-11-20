function validateForm() {
    let name = document.getElementById('name').value.trim();
    let group = document.getElementById('group').value.trim();
    let descriptions = document.getElementById('descriptions').value.trim();
    let audio = document.getElementById('audio').files[0];
    let picture = document.getElementById('pitcure').files[0];

    let englishTextRegex = /^[a-zA-Z\s]+$/;

    if (!name) {
        alert('Будь ласка, введіть назву пісні.');
        return false;
    }
    if (!englishTextRegex.test(name)) {
        alert('Назва пісні повинна містити тільки англійські літери та пробіли.');
        return false;
    }
    if (!group) {
        alert('Будь ласка, введіть назву гурту.');
        return false;
    }
    if (!englishTextRegex.test(group)) {
        alert('Назва гурту повинна містити тільки англійські літери та пробіли.');
        return false;
    }
    if (!descriptions) {
        alert('Будь ласка, введіть опис.');
        return false;
    }
    if (!englishTextRegex.test(descriptions)) {
        alert('Опис повинен містити тільки англійські літери та пробіли.');
        return false;
    }
    if (!audio) {
        alert('Будь ласка, завантажте аудіофайл.');
        return false;
    }
    if (!picture) {
        alert('Будь ласка, завантажте зображення.');
        return false;
    }
    return true;
}

export { validateForm };
