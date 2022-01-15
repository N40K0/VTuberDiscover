let dropZone = document.querySelector(".drop-zone")
let fileInput = document.querySelector(".input-file")

dropZone.addEventListener("dragover", (event) => {
    event.preventDefault()
})

dropZone.addEventListener("drop", (event) => {
    event.stopPropagation()
    event.preventDefault()
    let files = event.dataTransfer.files
    console.log(files)
    files.forEach(file => {
        if (file.type.startsWith("image")) predict(file)
    });
});

dropZone.addEventListener("click", (event) => {
    fileInput.click()
})

fileInput.addEventListener("click", (event)=>{
    console.log(fileInput.files)
})

function predict(file) {
    newLine("")
    newLine("Predicting . . .")

    let reader = new FileReader()
    let image = new Image(224, 224)

    reader.readAsDataURL(file)

    reader.onload = () => {
        image.src = reader.result
        image.onload = () => {
            let result = tf.tidy(() => {
                image = tf.browser.fromPixels(image, 3)
                image = tf.expandDims(image)
                image = tf.cast(image, "float32")

                let output = Model.predict(image)
                console.log(output.dataSync())
            })
        }
    }
}
