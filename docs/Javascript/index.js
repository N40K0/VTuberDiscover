let dropZone = document.querySelector(".drop-zone")


dropZone.addEventListener("dragover", (e) => {
    e.preventDefault()
})

dropZone.addEventListener("drop", (e) => {
    e.stopPropagation()
    e.preventDefault()
    console.log(e.dataTransfer)
})