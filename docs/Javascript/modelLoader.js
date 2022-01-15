const model = tf.loadGraphModel("./Model/model.json")
let modelLoaded

model.then((model)=>{
    modelLoaded = true
})