<?php

    session_start();
    require_once 'database.php';
    /** @var mysqli $conn */        // エディターのエラー防止

    if(!isset($_SESSION['admin_logged_in'])) {
        exit('ログインが必要です。');
    }

    $quote = $_POST['quote'] ?? '';
    $author = $_POST['author'] ?? '';
    $source = $_POST['source'] ?? '';

    if (empty(trim($quote)) 
        || empty(trim($author)) 
        || empty(trim($source))) {
    
        header("Location: edit.php?error=empty");
        exit;
    }

    $sql = "INSERT INTO quotes (quote, author, source) VALUES (?, ?, ?)";
    $stmt = mysqli_prepare($conn, $sql);
    mysqli_stmt_bind_param($stmt, "sss", $quote, $author, $source);

    if(mysqli_stmt_execute($stmt)) {
        header("Location: edit.php?success=1");
        exit;
    } else {
        echo "保存できませんでした" . mysqli_error($conn);
    }

    mysqli_stmt_close($stmt);
    mysqli_close($conn);
?>