function newLine(text, breakLine = true) {
    const predictionLogs = document.querySelector(".prediction-logs")
    const line = document.createElement("a")
    const br = document.createElement("br")

    if(breakLine) predictionLogs.appendChild(br) 
    line.textContent = text + " "
    predictionLogs.appendChild(line)
}

(function () {
    const loadModel = tf.loadGraphModel("./Model/model.json")

    const requestURL = "./vtuber-data.json"
    let request = new XMLHttpRequest()

    request.open("GET", requestURL)
    request.responseType = "json"
    request.send()

    let labels
    request.onload = ()=>{
        labels = request.response
        document.querySelector("#counter").textContent = labels.length
    }

    newLine("Loading . . .")
    loadModel.then((model) =>    {
        newLine("Done!", false)
        document.AIModel = model
        document.AIModel.loaded = true
        document.AIModel.labels = labels
    })

})()
