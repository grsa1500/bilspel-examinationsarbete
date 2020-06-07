// Exempel på bitar kod skapade till Skoda-spelet.


// Visa vy efter spelet tar slut och spara till databasen
function fadeimage() {

    
    preventdoubletap = false;

    // Gömmer element ur spelet
    document.getElementById('infobutton').style.display = "none";
    document.getElementById('view3').classList.remove('fade');
    document.getElementById('gamepad').style.display = "none";

    // Slumpar en kod
    var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz!?-";
    var string_length = 100;
 
    for (var i = 0; i < string_length; i++) {
      var rnum = Math.floor(Math.random() * chars.length);
      randomstring += chars.substring(rnum, rnum + 1);
    }


    document.getElementById('codeinput').value = randomstring;
    var gamepoints = points;

    // Gör anrop där poäng och kod sparas
    $.ajax({
      data: {
        post: 1,
        points: gamepoints,
        code: randomstring

      },
      async: false,
      type: "post",
      url: "insert.php",
      success: function (data) {

      }
    });


    $.ajax({
      data: {
        get: 1,
        points: gamepoints,

      },
      type: "get",
      url: "insert.php",
      success: function (data) {
        highscorepos = data;
      }
    });

  }








  // Känna av storleken på skärmen, se till så hela spelet får plats och byter proportioner till mobil
  window.addEventListener('resize', resizeCanvas, false);
 
  function resizeCanvas() {
    if (window.innerWidth <= 1024) {
      
      // Bredare väg på mobilen
        roadWidth = 2700;

        // Vinkeln på spelet
      height = mobileheight;
  

      // Automatisk gas för mobil
        keyFaster = true;
   
        // proportionerna till bakgrundsbilden
      backwidth = 2000;

var windowWidth = window.innerWidth;
var windowHeight = window.innerHeight;
var canvasHeight = (windowWidth / 2) * 3;
var newWidth = windowWidth;

//Kontroll så hela höjden på spelet får plats på skärmen, annars minska bredden
 while (windowHeight < canvasHeight) {
        newWidth = newWidth - 10;
        canvasHeight = (newWidth / 2) * 3;
      }

  var canvaswidth = newWidth;
  canvas.style.width = newWidth + "px";

  // Höjden för att behålla rätt proportioner på spelet
  canvas.style.height = (canvaswidth / 2) * 3 + "px";


    }

    else {
      roadWidth = 2000;
      backwidth = desktopwidth;
      canvas.style.height = "555px";
      canvas.style.width = "740px";
      height = desktopheight;

    }

    reset({ roadWidth: Util.limit(roadWidth, 500, 3000) });


  }









  // Styrning för mobil
  document.getElementById('gamepad-left').ontouchstart = function() {
    keyRight = false;
    keyLeft = true;
  
}

document.getElementById('gamepad-left').ontouchend = function() {
 keyLeft = false;
 keyRight = false;

}


document.getElementById('gamepad-right').ontouchstart = function() {
  keyLeft = false;
 keyRight = true;

}

document.getElementById('gamepad-right').ontouchend = function() {
 keyRight = false;
 keyLeft = false;
}




// Dra av poäng vid krock med andra bilar
if (Util.overlap(playerX, playerW, car.offset, carW, 0.8)) {
    speed = car.speed * (car.speed / speed);


    // Spelet avslutas om mindre än 5 sekunder fanns kvar
    if (remainingTime < 5) {
      remainingTime = 0;
      gameOverFlag = true;

    }
    else {

        // Meddelande på skärmen
      document.getElementById("message").innerHTML = "<span style='color:red;'>- 5 sekunder</span>";

      clearTimeout(timer);

      timer = setTimeout(function () {
        document.getElementById("message").innerHTML = '';
      }, 2000);

      // Tiden dras av
      remainingTime = remainingTime - 5;
    }

}



// Fånga turbo på vägen
if (Util.overlap(playerX, playerW, sprite.offset + spriteW / 2 * (sprite.offset > 0 ? 1 : -1), spriteW)) {
    document.getElementById("message").innerHTML = "<span style='color:green;'>Turbo +1</span>";
    clearTimeout(timer);
    timer = setTimeout(function () {
      document.getElementById("message").innerHTML = '';
    }, 2000);


// Ta bort turbon från vägen
    playerSegment.turbos.pop();
   
   // Starta turbo
    triggerTurbo();
    break;
  }




  // Fånga bonuspoäng
  if (Util.overlap(playerX, playerW, sprite.offset + spriteW / 2 * (sprite.offset > 0 ? 1 : -1), spriteW)) {
    document.getElementById("message").innerHTML = "<span style='color:green;'>+ 100</span>";

    clearTimeout(timer);

    timer = setTimeout(function () {
      document.getElementById("message").innerHTML = '';
    }, 2000);


    // Addera poäng
    lappoints += 1000;

    // Ta bort från vägen
    playerSegment.bonuses.pop();


    break;
  }





  // Ge poäng för sträckan
  if (playerSegment.index > currentsegment) {
    currentsegment = currentsegment + 1;
    points = Math.floor(((lappoints + currentsegment) + 1) / 100) * 10;

    updateHud('current_level', points);

  }
