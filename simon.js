(function () {

    var startOn = false;
    var strictOn = false;
    var green = document.getElementById("gs");
    var red = document.getElementById("rs");
    var blue = document.getElementById("bs");
    var yellow = document.getElementById("ys");
    var error = document.getElementById("error");
    var cont = 0;
    var simonSequence = [];
    var errorTimer = null;
    var timerBegin = null;
    var playingAgain = null;
    var playAgain;
    var isPlayable = false;
    var clickCount = 0;
    var playerCont = 0;

    $("#startBtn").on("click", function () {
        if (startOn){
            if(simonSequence.length>0) reset();
            begin();
        }    
    });
    
    //on and off
    $("#on > div:nth-child(1)").on("click",function(){
        if (startOn == false){
            startOn = true;
            $("#cont > div:nth-child(1)").text("00");
        }else{
            startOn = false;
            reset();
            $("#cont > div:nth-child(1)").text("--");
            if (strictOn == true){
                 strictOn = false;
                $("#strictOn").css("background-color", "#333333");
            }
        } 

        if (startOn) $("#onOff").css("background-color", "#04f900");
        else $("#onOff").css("background-color", "#333333");
    });

    $("#strictBtn").on("click", function () {
        if(startOn){
            if (strictOn == false) strictOn = true;
            else strictOn = false;

            if (strictOn) $("#strictOn").css("background-color", "#04f900");
            else $("#strictOn").css("background-color", "#333333");  
        }
 
    });

    //game buttons events
    $("#one").on("click", function () {
        if(isPlayable){
            player(1);
            check(1);
        }
    });

    $("#two").on("click", function () {
        if(isPlayable){
            player(2);
            check(2);
        }
    });

    $("#three").on("click", function () {
        if(isPlayable){
            player(3);
            check(3);
        }
    });

    $("#four").on("click", function () {
        if(isPlayable){
            player(4);
            check(4);
        }
    });
    
    function check(value){
        clickCount++;
        
        if(simonSequence[clickCount-1]!==value){
            clearTimeout(errorTimer);
            clickCount=0;
            playError();
        }else if(simonSequence[clickCount-1]==value && clickCount===simonSequence.length){
            notPlayable();
            clearTimeout(errorTimer);
            clickCount=0;
            begin();
        }else if(simonSequence[clickCount-1]===value){
            clearTimeout(errorTimer);
            playTimedError();
        }
    }
    
    //stop error timers when player start playing
    function player(id) {
        if (id == 1) {
            $("#one").css("background-color", "#07f417");
            green.play();
            setTimeout(function () {
                $("#one").css("background-color", "lightgreen")
            }, 500);
        } else if (id == 2) {
            $("#two").css("background-color", "red");
            red.play();
            setTimeout(function () {
                $("#two").css("background-color", "lightcoral")
            }, 500);
        } else if (id == 3) {
            $("#three").css("background-color", "blue");
            blue.play();
            setTimeout(function () {
                $("#three").css("background-color", "skyblue")
            }, 500);
        } else if (id == 4) {
            $("#four").css("background-color", "yellow");
            yellow.play();
            setTimeout(function () {
                $("#four").css("background-color", "lightgoldenrodyellow")
            }, 500);
        }
    }

    //you have 5 secons to touch a buttor or get an error
    function playTimedError() {
        if(!isPlayable) playable();
        errorTimer = setTimeout(function () {
            error.play();
            clickCount = 0;
            if(strictOn){
                reset();
                begin();
            }else{
               playAgain(); 
            }
            
        }, 5000);
        
    }
    
    //allow to click buttons
    function playable(){
        isPlayable = true;
        $("#one, #two, #three, #four").css("cursor", "pointer");
    }
    
    //disallow to click buttons
    function notPlayable(){
        isPlayable = false;
        $("#one, #two, #three, #four").css("cursor", "inherit");
    }
    
    //play again the tones
    function playAgain(){
        notPlayable();
        
        playingAgain = setTimeout(function () {
            playTones();
        }, 1000);
    }
        
    //error sound play
     function playError(){
        error.play();
         if(strictOn){
             reset();
             begin();
         }else{
            playAgain(); 
         }
    }

    function begin() {
        cont++;
        cont < 10 ? $("#cont > div:nth-child(1)").text("0" + cont) : $("#cont > div:nth-child(1)").text(cont);

        simonSequence.push(gimmeNumber());
        
        playTones();

    }

    //play the sequence tones
    function playTones() {
        if(playerCont<=simonSequence.length){
            timerBegin = setTimeout(function(){
                if(playerCont<simonSequence.length){
                    player(simonSequence[playerCont]);
                    playTones();
                    playerCont++;
                }else if(playerCont== simonSequence.length){
                    playTimedError();
                    playerCont = 0;
                }
                                               
            },1000);
        }

    }

    //return random number between 1 and 4
    function gimmeNumber() {

        return Math.floor(Math.random() * (4 - 1 + 1) + 1);
    }
    
    function reset(){
        clickCount = 0;
        playerCont = 0;
        simonSequence = [];
        cont = 0;
        clearTimeout(errorTimer);
        clearTimeout(timerBegin);
    }

})();