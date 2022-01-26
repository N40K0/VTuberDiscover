const dropZone = document.querySelector(".drop-zone")
const fileInput = document.querySelector(".input-file")
const imageInputs = document.querySelector(".imageInputs")

let imageIndex = 0

dropZone.addEventListener("dragover", (event) => {
    event.preventDefault()
})

dropZone.addEventListener("drop", (event) => {
    event.stopPropagation()
    event.preventDefault()

    const files = event.dataTransfer.files

    imageIndex = 0

    files.forEach(file => {
        if (file.type.startsWith("image") && document.AIModel.loaded) {
            predict(file)
        }
    });
});

dropZone.addEventListener("click", (event) => {
    fileInput.click()
})

fileInput.addEventListener("change", (event) => {
    const files = fileInput.files

    imageIndex = 0

    files.forEach(file => {
        if (file.type.startsWith("image") && document.AIModel.loaded) {
            predict(file)
        }
    });
})

function predict(file) {
    newLine("")
    newLine("Predicting . . .")

    let details = setImage(file, imageIndex)

    imageIndex += 1

    let reader = new FileReader()
    let image = new Image(224, 224)

    reader.readAsDataURL(file)

    reader.onload = () => {
        image.src = reader.result

        image.onload = async () => {
            await tf.tidy(() => {
                image = tf.browser.fromPixels(image, 3)
                image = tf.image.resizeBilinear(image, [224, 224]).div(tf.scalar(255))
                image = tf.expandDims(image)
                image = tf.cast(image, "float32")

                const output = document.AIModel.predict(image)

                const result = Array.from(output.dataSync())
                const maxResult = Math.max(...result)
                const index = result.indexOf(maxResult)
                const predictionResult = document.AIModel.labels[index]

                newLine("Done!", false)
                newLine(`The picture shows an indication that the ${predictionResult["name"]} is the person in the picture `)
                details.textContent = `Prediction: ${predictionResult.name.trim()}`
            })
        }
    }
}

function setImage(file, index){
    let url = URL.createObjectURL(file)
    
    let div = document.createElement("div")

    div.className = "imageContainer"
    div.style.animationDelay = `${100 * index}ms`

    let img = document.createElement("img")

    img.className = "image"
    img.src = url

    let details = document.createElement("span")
    details.className = "imageDetails"
    details.textContent = "Predicting... "

    div.appendChild(img)
    div.appendChild(details)

    imageInputs.appendChild(div)

    return details

}


