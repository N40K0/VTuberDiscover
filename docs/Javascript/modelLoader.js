function newLine(text, breakLine = true) {
    const predictionLogs = document.querySelector(".prediction-logs")
    const line = document.createElement("a")
    const br = document.createElement("br")

    if(breakLine) predictionLogs.appendChild(br) 
    line.textContent = text + " "
    predictionLogs.appendChild(line)
}
let Model
(function () {
    const loadModel = tf.loadGraphModel("./Model/model.json")

    newLine("Loading . . .")
    loadModel.then((model) =>    {
        newLine("Done!", false)
        Model = model
    })

})()
