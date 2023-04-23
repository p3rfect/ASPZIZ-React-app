const forcedOriginalScale = () => {
    const App = document.getElementsByName("html");
    App.style.zoom = 1 / devicePixelRatio;
}

document.addEventListener("DOMContentLoaded", forcedOriginalScale)