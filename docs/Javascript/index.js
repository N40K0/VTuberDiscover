const dropZone = document.querySelector(".drop-zone")
const fileInput = document.querySelector(".input-file")
const model = document.AIModel

dropZone.addEventListener("dragover", (event) => {
    event.preventDefault()
})

dropZone.addEventListener("drop", (event) => {
    event.stopPropagation()
    event.preventDefault()

    event.dataTransfer.files
});

dropZone.addEventListener("click", (event) => {
    fileInput.click()
    console.log(fileInput.files)
})

function predict(files) {
    newLine("")
    newLine("Predicting . . .")

    files.forEach(file => {
        let reader = new FileReader()
        let image = new Image(256, 256)

        reader.readAsDataURL(file)

        reader.onload = () => {
            image.src = reader.result

        }
    })
}