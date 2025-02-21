document.addEventListener("DOMContentLoaded", function() {
    const dailyEntries = [
        { date: "2025-02-19", image: "/assets/images/hive_hole.png", text: "I’m warring with the boundaries of my own universe." },
        { date: "2025-02-20", image: "/assets/images/methods.png", text: "Steeped in the great weight of all our time." },
        { date: "2025-02-21", image: "/assets/images/inane2.png", text: "I could not tell you what I did this year nor any previous in a way that would hold true to anything that occurred within them. The best (and perhaps only) viable sense of recall that I have so far encountered were field recordings, a great many taken on foreign trains and in the presence of good Sophie, that I listened to on a dead log in a public forest in Paris. My legs were freezing and there were bugs in my teeth. I didn’t say a word, because I didn’t want to frighten the gathering birds, but as I listened to these recordings I did cry, because in them, for what felt like the first time, I gained at last access to true memory." }
    ];

    function getFormattedDate(offset = 0) {
        const today = new Date();
        today.setDate(today.getDate() + offset);
        return today.toISOString().split("T")[0]; // YYYY-MM-DD
    }

    function loadDailyContent(offset = 0) {
        const todayDate = getFormattedDate(offset);
        const entry = dailyEntries.find(e => e.date === todayDate);

        if (entry) {
            document.body.style.backgroundImage = `url(${entry.image})`;
            document.getElementById("inane-text").innerText = entry.text;
        } else {
            document.body.style.backgroundImage = "url('/assets/images/default.png')";
            document.getElementById("inane-text").innerText = "No inanity found for today.";
        }
    }

    let dayOffset = 0;
    loadDailyContent(dayOffset);

    document.getElementById("prev-btn").addEventListener("click", () => {
        dayOffset -= 1;
        loadDailyContent(dayOffset);
    });

    document.getElementById("next-btn").addEventListener("click", () => {
        dayOffset += 1;
        loadDailyContent(dayOffset);
    });

    document.getElementById("back-btn").addEventListener("click", () => {
        window.location.href = "/index.html"; // Change this to the correct main page
    });
});
