<?php
//Exempel på PHP-kod


// Lägga in poäng
if(isset($_POST['post']))
{

error_reporting(E_ALL && ~E_NOTICE);
$_SESSION["code"] = $_POST['code'];
$points = mysqli_real_escape_string($conn, $_POST['points']);
$email="";
$name = "";
$mail = "";
$code = mysqli_real_escape_string($conn,$_POST['code']);
$sql="INSERT INTO database(points, user, mail, code) VALUES ('$points', '$name', '$email', '$code')";
$result= mysqli_query($conn,$sql);

}



// Ta bort lägre poäng med samma mail
$sql="SELECT * FROM highscore  WHERE mail='$email' ORDER BY points DESC";
$result= mysqli_query($conn,$sql);

$num = 0;


if($result->num_rows>1) 
{


  while($row = mysqli_fetch_array($result))
   {

     $currentpoints = $row['points'];
     $id = $row['id'];

    $num = $num+1;

    if($num > 1) 
    {
 
    //  Ta bort resultat med samma mail
    $sql2="DELETE FROM highscore WHERE id='$id'";
    $result2= mysqli_query($conn,$sql2);
 
    
}}}






// Visa Highscorelista

if(isset($_GET['gethighscore']))
{
error_reporting(E_ALL && ~E_NOTICE);

$sql="SELECT * FROM highscore WHERE mail!='' ORDER BY points DESC LIMIT 10";
$result= mysqli_query($conn,$sql);

while($row = mysqli_fetch_assoc($result)){
  $array[] = $row;
  }

if($result) {
    echo json_encode($array);
 
}
else {
  echo 'test';
}

}


?>