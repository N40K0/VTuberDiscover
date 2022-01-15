const dropZone = document.querySelector(".drop-zone")
const fileInput = document.querySelector(".input-file")

dropZone.addEventListener("dragover", (event) => {
    event.preventDefault()
})

dropZone.addEventListener("drop", (event) => {
    event.stopPropagation()
    event.preventDefault()

    const files = event.dataTransfer.files

    files.forEach(file => {
        console.log(file)
        if (file.type.startsWith("image") && document.AIModel.loaded) predict(file)
    });
});

dropZone.addEventListener("click", (event) => {
    fileInput.click()
})

fileInput.addEventListener("click", (event) => {
    const files = fileInput.files

    files.forEach(file => {
        if (file.type.startsWith("image") && document.AIModel.loaded) predict(file)
    });
})

function predict(file) {
    newLine("")
    newLine("Predicting . . .")

    let reader = new FileReader()
    let image = new Image(224, 224)

    reader.readAsDataURL(file)

    reader.onload = () => {
        image.src = reader.result

        image.onload = async () => {
            await tf.tidy(() => {
                image = tf.browser.fromPixels(image, 3)
                image = tf.expandDims(image)
                image = tf.cast(image, "float32")

                const output = document.AIModel.predict(image)
                
                const result = Array.from(output.dataSync())
                const maxResult = Math.max(...result)
                const index = result.indexOf(maxResult)
                const predictionResult = document.AIModel.labels[index]
                
                newLine("Done!", false)
                newLine(`The picture shows an indication that the ${predictionResult["name"]} is the person in the picture `)
            })
        }
    }
}



