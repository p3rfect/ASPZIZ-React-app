const forcedOriginalScale = () => {
    const App = document.getElementsByTagName("html")
    App[0].style.zoom = 1 / devicePixelRatio;
}

document.addEventListener("DOMContentLoaded", forcedOriginalScale)