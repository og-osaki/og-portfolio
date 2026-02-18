<?php
    session_start();

    if (!isset($_SESSION['admin_logged_in']) || $_SESSION['admin_logged_in'] !== true) {
        header('Location: ../html/index.html');
        exit;
    }


?>

<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>管理者ページ</title>
    <meta name="description" content="OGのポートフォリオです。Blender作品や雑多なコンテンツを掲載しています。">
    <link rel="icon" href="../../img/favicon.ico"> 
    <link rel="stylesheet" href="https://unpkg.com/ress/dist/ress.min.css">
    <link rel="stylesheet" href="../css/style.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Monoton&family=New+Tegomin&family=Press+Start+2P&family=Zen+Maru+Gothic&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons+Round" rel="stylesheet">
</head>

<body>
    <div class="wrapper">
        <div id="editPage">
            <h1 class="content-title">引用集追加ページ</h1>
            <p class="outline">ログイン成功！ここで引用を追加できます。</p>

            <div id="alertBox">
                <?php if (isset($_GET['success'])): ?>
                    <div class="alert alert-success">
                        <span class="material-icons-round" style="vertical-align: middle;">check_circle</span>
                        保存に成功しました
                    </div>
                <?php endif; ?>

                <?php if (isset($_GET['error']) && $_GET['error'] === 'empty'): ?>
                    <div class="alert alert-failure">
                        <span class="material-icons-round" style="vertical-align: middle;">error</span>
                        保存に失敗しました
                    </div>
                <?php endif; ?>
            </div>

            <section id="addQuote">
                <form action="add-quote.php" method="POST">
                    <div>
                        <label for="quoteAdded">引用文</label>
                        <textarea name="quote" id="quoteAdded" required></textarea>
                    </div>
                    <div>
                        <label for="authorAdded">著者</label>
                        <input type="text" name="author" id="authorAdded" required>
                    </div>
                    <div>
                        <label for="sourceAdded">
                            出典
                            <span class="material-icons-round" data-tooltip="凡例:『書名』「題名」&#13;&#10;*改行はそのまま保存されます。">info</span>
                        </label>
                        <input type="text" name="source" id="sourceAdded" required>
                    </div>
                    <div class="btn-flex">
                        <button type="submit" class="btn-general">DBに保存する</button>
                        <a href="logout.php" class="btn-general">ログアウト</a>
                    </div>
                </form>
            </section>
        </div>

        <footer id="footer">
            <p>&copy; 2025 O.G.</p>
        </footer>
    </div>
</body>
</html>