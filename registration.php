<?

$json = file_get_contents('php://input');
$obj = json_decode($json, true); 

$login =$obj['login'];
$password = md5($obj['password']);
$role = $obj['role']; 
$rang = $obj['rang'];   
$name = $obj['username']; 
$surname = $obj['subname'];

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, PUT, OPTIONS, PATCH, DELETE');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Headers: Authorization, Content-Type, x-xsrf-token, x_csrftoken, Cache-Control, X-Requested-With');
 
if (
    preg_match('~[\\\/:*?"\'<>|]~', $login) )
  {
    print('Ошибка регистрации, уберите лишние символы'); 
    exit(); 
} else {
 
include('dbconnect.php');
$insertSql = "INSERT INTO users (login, password, role, rang, name, surname) VALUES ('$login', '$password', '$role', '$rang', '$name', '$surname')";
$result = mysqli_query($db, $insertSql);
if ($db == false) { 
    print("Ошибка соединения". mysqli_connect_error());}
  
if ($result) { 
    http_response_code(200);

     print('Oke');; 
    
}
else {
    echo 'fail'; 

} 
}

?>