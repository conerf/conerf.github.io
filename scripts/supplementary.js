const id_to_file_mapping_combined = {
    "rb-face-expressions-1": "videos/real/face-expressions-1/",
    "rb-face-expressions-2": "videos/real/face-expressions-2/",
    "rb-face-expressions-3": "videos/real/face-expressions-3/",
    "rb-synthetic": "videos/real/synthetic/",
    "rb-transformer": "videos/real/transformer/",
    "rb-two-metronomes": "videos/real/two-metronomes/",
    "rb-metronome": "videos/real/metronome/",
}

function isSeparateChecked() {
    return document.getElementById("chkbx-show-separate-videos").checked;
}

function changeDisplay(showSeparate) {
    if (showSeparate) {
        const originalDisplay = document.getElementById("combined-container").style.display;
        document.getElementById("combined-container").style.display = "none";
        document.getElementById("separate-container").style.display = originalDisplay;
    } else {
        const originalDisplay = document.getElementById("separate-container").style.display;
        document.getElementById("separate-container").style.display = "none";
        document.getElementById("combined-container").style.display = originalDisplay;
    }
}

function changeVideo(changeVideoName) {
    if (!isSeparateChecked()) {
        const video = document.getElementById("combined-video");
        const source = document.getElementById("combined-video-src");
        source.src = id_to_file_mapping_combined[changeVideoName] + "/combined.mp4";
        video.load();
        video.play();
    } else {
        const nameComponents = changeVideoName.split("-");
        const methodName = nameComponents[nameComponents.length - 1];
        const buttonType = nameComponents.slice(0, nameComponents.length - 1).join("-");
        const video = document.getElementById(methodName + "-video");
        const source = document.getElementById(methodName + "-video-src");
        source.src = id_to_file_mapping_combined[buttonType] + "/" + methodName + ".mp4";
        video.load();
        video.play();
    }
}

function initialize() {
    document
        .getElementById("chkbx-show-separate-videos")
        .addEventListener('click', (event) => {
            changeDisplay(event.target.checked);
        });


    ["", "-ours", "-hypernerf_ds", "-hypernerf_ds_proj"].forEach((elem) => {
        document
            .getElementsByName("dataset-group" + elem).forEach((elem) => {
                elem.addEventListener("click", (event) => {
                    changeVideo(event.target.id);
                });
            });
    });

}

initialize();