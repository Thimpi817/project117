quick_draw_data_set = ['pen','paper','book','bottle']

random_no = Math.floor((Math.random()*quick_draw_data_set.length)+1);

sketch = quick_draw_data_set[random_no];

console.log(quick_draw_data_set[random_no]);

document.getElementById('sketch_name').innerHTML= "Sketch to be drawn"+ sketch;


function setup(){
    canvas = createCanvas(300,300);
    canvas.center();
    background("white");
}

function clearCanvas(){
    background("white");
    canvas.mouseReleased(classifyCanvas);
    synth = window.speechSynthesis;
}

function preload(){
    classifier = ml5.imageClassifier('DoodleNet');
}

function draw(){
    strokeWeight(13);
    stroke("blue");
    if (mouseIsPressed) {
        line(pmouseX, pmouseY, mouseX, mouseY);
    }
}

function classifyCanvas(){
    classifier.classify(canvas, gotResult);
}

function gotResult(error, results){
    if (error) {
        console.log(error);
    }
    console.log(results);
    document.getElementById('label').innerHTML = 'Label : ' + results[0].label;

    document.getElementById('confidence').innerHTML = 'Confidence : ' + Math.round(results[0].confidence * 100) + '%';

    document.getElementById('sketch_name').innerHTML = 'Label : ' + results[0].label;

    utterThis = new SpeechSynthesisUtterance(results[0].label);
    synth.speak(utterThis);
}