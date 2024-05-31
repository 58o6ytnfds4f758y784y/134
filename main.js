img = "";
estatus = "";
objects = [];

function preload(){
    img = loadImage('dog_cat.jpg');
}

function setup() {
    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO)
    video.size(380,380);
    video.hide();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Estatus: detectando objetos";
}
function modelLoaded() {
    console.log("¡Model cargado!")
    estatus= true;
    objectDetector.detect(video,gotResult);
}

function gotResult(error, results) {
    if (error) {
        console.log(error);
    }
    console.log(results);
    objects = results;
}

function draw() {
    image(video, 0, 0, 380, 380);

    if(estatus != "")
    {
        r = random(255)
        g = random(255)
        b = random(255)
        objectDetector.detect(video, gotResult);
        for (i =0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "estatus: objeto detectado";
            document.getElementById("number_of_objects").innerHTML = "Numero de objetos detectados: "+ objects.length;

            fill(r,g,b);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x, objects[i].y);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}