<?php 
if(isset($_POST['dataBackStore']) && isset($_POST['dataBackCat'])){
    $dataS = $_POST['dataBackStore'];
    $dataC = $_POST['dataBackCat'];
    $date = date('d-m-Y');
    $file = $date.".txt";


    $fd = fopen("../../database/model/backup/$file","a+") or die('Couldnt open resource');

    fputs($fd,$dataS);
    fputs($fd,$dataC);
    fclose($fd);

    header("Location: http://localhost/cliente-UT04.3/resources/views/index.html") or die('Couldnt redirect');
}

?>