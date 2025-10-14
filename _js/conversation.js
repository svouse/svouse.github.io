<div id="rotating-text">Make in conversation with <span></span></div>

<script>
    const words = ["artists", "engineers", "dreamers", "activists"];
    const span = document.querySelector("#rotating-text span");
    let index = 0;

    function updateWord() {
    span.textContent = words[index];
    index = (index + 1) % words.length;
}

    updateWord();
    setInterval(updateWord, 3000); // change interval here
</script>
