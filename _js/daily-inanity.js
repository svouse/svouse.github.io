document.addEventListener("DOMContentLoaded", function() {
    const dailyEntries = [
        {date: "2025-02-018", image: "/assets/images/metal_door.png", text:"Did you notice? I got a zippo to be more of a man. I shredded my fingers off. My bones are exposed to the seat. The shell of my clothes keeps me warm. I’m too small. My body has caved in, succumb to rot. My eye pulls back, it was all too short, but I was glad to be in this subway car. I was glad to be alone."},
        { date: "2025-02-19", image: "/assets/images/hive_hole.png", text: "I’m warring with the boundaries of my own universe." },
        { date: "2025-02-20", image: "/assets/images/methods.png", text: "Steeped in the great weight of all our time." },
        { date: "2025-02-21", image: "/assets/images/inane2.png", text: "I could not tell you what I did this year nor any previous in a way that would hold true to anything that occurred within them. The best (and perhaps only) viable sense of recall that I have so far encountered were field recordings, a great many taken on foreign trains and in the presence of good Sophie, that I listened to on a dead log in a public forest in Paris. My legs were freezing and there were bugs in my teeth. I didn’t say a word, because I didn’t want to frighten the gathering birds, but as I listened to these recordings I did cry, because in them, for what felt like the first time, I gained at last access to true memory."},
        {date: "2025-03-05", image: "/assets/images/bath_cat.png", text: "You, without needing to check, know the relative size of our wrists. I’m galled because the instant familiarity of your hand seems to evade me as soon as you’re out of sight. Waking, I panic, and grasp for complete recall of your body in a futile effort to confront your mortality. Sleeping, I greet your image in dreams and tell you about how wonderful it is to know you where I’m awake, where reproduction can never fully reach."},
        {date: "2025-03-12", image: "/assets/images/island_trees.png", text: "I find myself grateful for the sinking arm, and for the company of my friends, and for good dinner. If I can no longer feed the conglomerate bloom with my tears, nor shout into it, nor beat against its movement with my fists, I may reasonably present it with food, make no pretense, and try to rest. I may, if I’m lucky, sit with it in silence."}
    ];

    let currentIndex = dailyEntries.length - 1; // Start at the most recent entry

    function loadDailyContent(index) {
        const entry = dailyEntries[index];

        document.body.style.backgroundImage = `url(${entry.image})`;
        document.getElementById("inane-text").innerText = entry.text;
    }

    loadDailyContent(currentIndex); // Load most recent entry on page load

    document.getElementById("prev-btn").addEventListener("click", () => {
        currentIndex = (currentIndex - 1 + dailyEntries.length) % dailyEntries.length; // Loop backward
        loadDailyContent(currentIndex);
    });

    document.getElementById("next-btn").addEventListener("click", () => {
        currentIndex = (currentIndex + 1) % dailyEntries.length; // Loop forward
        loadDailyContent(currentIndex);
    });

    document.getElementById("back-btn").addEventListener("click", () => {
        window.location.href = "/index.html"; // Change this to the correct main page
    });
});

