<?php
    session_start();

    require_once 'database.php';
    /** @var mysqli $conn */        // エディターのエラー防止

    // POST以外はアクセスできないようにする
    if ($_SERVER["REQUEST_METHOD"] !== "POST") {
        header('Location: ../html/index.html');
        exit;
    }

    $user_input = $_POST['username'] ?? '';
    $pass_input = $_POST['password'] ?? '';

    $sql = "SELECT * FROM admin WHERE username = ?";
    $stmt = mysqli_prepare($conn, $sql);
    mysqli_stmt_bind_param($stmt, "s", $user_input);    // user_inputを紐づける
    mysqli_stmt_execute($stmt);
    $result = mysqli_stmt_get_result($stmt);
    $user_data = mysqli_fetch_assoc($result);


    if ($user_data && password_verify($pass_input, $user_data['password'])) {
        
        $_SESSION['admin_logged_in'] = true;
        $_SESSION['user_name'] = $user_data['username'];

        header('Location: edit.php');
        exit;
    } else {

        echo "<script>
                alert('ユーザー名またはパスワードが正しくありません');
                window.location.href = '../html/index.html';
              </script>";
        exit;
    }
?>