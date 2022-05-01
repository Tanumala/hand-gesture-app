Webcam.set({
    width:350,
    height:300,
    image_format: 'png',
    png_quality: 90
});

camera = document.getElementById("Camera");

Webcam.attach(camera);

function take_snapshot()
{
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML="<img id='captured_img' src='"+data_uri+"'/>";
    });
}

console.log('ml5',ml5.version);

classifier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/udsxu7GdI/model.json",modelLoaded);

function modelLoaded()
{
    console.log('Model Loaded');
}

function check()
{
    var img = document.getElementById("captured_img");
    classifier.classify(img,gotResult);
}

hand_gesture = "";

function gotResult(error,result)
{
 if (error) {
     console.log(error);
 }

 else
 {
     console.log(result)

     document.getElementById("result_gesture_name").innerHTML=result[0].label;
     hand_gesture=result[0].label;
     
     function speak()
     {
         synth = window.speechSynthesis;
         speak_data = "the prediction is"+hand_gesture;
         utterThis=new SpeechSynthesisUtterance(speak_data);
         synth.speak(utterThis);
     }

     speak();
     if(result[0].label == "Victory")
     {
         document.getElementById("update_emoji").innerHTML="&#9996";
     }

     if(result[0].label == "Amazing")
     {
         document.getElementById("update_emoji").innerHTML="&#128076";
     }

     if(result[0].label == "High Five")
     {
         document.getElementById("update_emoji").innerHTML="&#128400";
     }

     if(result[0].label == "best")
     {
         document.getElementById("update_emoji").innerHTML="&#128077";
     }

     if(result[0].label == "worst")
     {
         document.getElementById("update_emoji").innerHTML="&#128078";
     }
 }
}
