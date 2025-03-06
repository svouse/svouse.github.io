document.addEventListener("DOMContentLoaded", function() {
    const audioList = document.getElementById("audio-list");
    const audioPlayer = document.getElementById("audio-player");
    const audioSource = document.getElementById("audio-source");

    audioList.addEventListener("click", function(e) {
        if (e.target.tagName === "LI") {
            const newSrc = e.target.getAttribute("data-src");
            audioSource.src = newSrc;
            audioPlayer.load();
            audioPlayer.play();
        }
    });
});
