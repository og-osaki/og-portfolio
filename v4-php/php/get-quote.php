<?php

    require_once 'database.php';
    /** @var mysqli $conn */    // エディターのエラー防止

    $sql = "SELECT quote, author, source FROM quotes ORDER BY RAND() LIMIT 1";
    $result = mysqli_query($conn, $sql);

    if($result && $row = mysqli_fetch_assoc($result)) {
        header('Content-Type: application/json; charset=UTF-8');
        echo json_encode($row);
    }

    mysqli_close($conn);
?>