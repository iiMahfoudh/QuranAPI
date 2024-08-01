document.addEventListener('DOMContentLoaded', () => {
    fetch('https://api.quran.com/api/v4/chapters')
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById('quran-container');
            data.chapters.forEach(chapter => {
                const chapterElement = document.createElement('div');
                chapterElement.className = 'chapter-card';
                chapterElement.textContent = `${chapter.id}. ${chapter.name_simple} (${chapter.name_arabic})`;
                chapterElement.onclick = () => playChapter(chapter.id);
                container.appendChild(chapterElement);
            });
        })
        .catch(error => console.error('Error fetching Quran data:', error));
});

function playChapter(chapterId) {
    // Remove highlight from previously selected verse
    const previouslySelected = document.querySelector('.selected-verse');
    if (previouslySelected) {
        previouslySelected.classList.remove('selected-verse');
    }

    // Highlight the selected verse
    const selectedVerse = document.querySelector(`.chapter-card:nth-child(${chapterId})`);
    if (selectedVerse) {
        selectedVerse.classList.add('selected-verse');
    }

    fetch(`https://api.quran.com/api/v4/chapter_recitations/1/${chapterId}`)
        .then(response => response.json())
        .then(data => {
            const audioPlayer = document.getElementById('audio-player');
            const audioSource = document.getElementById('audio-source');
            audioSource.src = data.audio_file.audio_url;
            audioPlayer.load();
            audioPlayer.play();
        })
        .catch(error => console.error('Error fetching audio data:', error));
}

const themeToggle = document.querySelector('.theme-toggle');
const body = document.body;

themeToggle.addEventListener('click', () => {
  // Toggle the 'dark-mode' class on the body
  body.classList.toggle('dark-mode'); 
});