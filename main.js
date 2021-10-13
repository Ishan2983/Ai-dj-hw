goosbumbs = "";
Toosie_Slide = ""; 
right_x = 0;
right_y = 0;
left_x = 0;
left_y = 0;
score_leftWrist = 0;
score_rightWrist = 0;
status_t = "";
status_d = "";

function preload(){
   goosbumbs = loadSound('Song1.mp3');
   Toosie_Slide = loadSound('Song2.mp3');
}

function setup(){
    canvas = createCanvas(500 , 400);
    canvas.position(500 , 310);
    webcam = createCapture(VIDEO);
    webcam.hide();
    posenet = ml5.poseNet(webcam , modelLoaded);
    posenet.on('pose' , gotPoses);
}

function modelLoaded(){
    console.log("PoseNet Initialized!");
}

function gotPoses(results){
    if(results.length > 0){
        console.log(results);
        right_x = results[0].pose.rightWrist.x;
        right_y = results[0].pose.rightWrist.y;
        left_x = results[0].pose.leftWrist.x;
        left_y = results[0].pose.leftWrist.y;
       
        

        score_leftWrist = results[0].pose.keypoints[9].score;
        score_rightWrist = results[0].pose.rightWrist.confidence;
        console.log("Score Right Wrist --> "+ score_rightWrist + " Score Left Wrist ", score_leftWrist);

    }
}

function draw(){

    image(webcam , 0 , 0 , 500 , 400);

    status_d = Toosie_Slide.isPlaying();
    status_t = goosbumbs.isPlaying();
    
    fill('#42f5b9');
    stroke('#42f5b9');

    if(score_leftWrist > 0.02){

        circle(left_x , left_y , 20);

        if(status_d == false){
            goosbumbs.stop();
            Toosie_Slide.play();
            document.getElementById("song_name").innerHTML = "Goosbumbs";

        }

    } 

    if(score_rightWrist > 0.02){

        circle(right_x , right_y , 20);

        if(status_t == false){
            Toosie_Slide.stop();
            goosbumbs.play();
            document.getElementById("song_name").innerHTML = "Toosie Slide";

        }

    } 

}

function play()
{
	song.play();
	song.setVolume(1);
	song.rate(1);
}