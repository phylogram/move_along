<?php
/**
 * Created by PhpStorm.
 * User: phylogram
 * Date: 05.06.18
 * Time: 14:20
 */

/** Get all javascript files from js/production */
$js_files = scandir("./js/production/");
$js_files =  preg_grep("/.+\.js/", $js_files);


$files = array_merge($js_files);

$uri = $_SERVER['REQUEST_URI'];
$javascript_uri =  substr($uri, 1) . '.js';
if ($uri === '/' || !in_array($javascript_uri, $js_files)) {
    $javascript = $js_files[array_rand($js_files)];
} else {
    $javascript = $javascript_uri; # ;-)
}

?>
<!DOCTYPE html>
<html>
<head>
  <!-- Load the Paper.js library -->
  <link rel="stylesheet" type="text/css" href="css/style.css" />

  <?php
    if ($javascript) {
      ?>
        <script type="text/javascript"
                src="js/node_modules/paper/dist/paper-full.min.js"></script>
        <!-- Load external PaperScript and associate it with myCanvas -->
        <script type="text/paperscript"
                src="js/production/<?php echo $javascript; ?>" canvas="myCanvas">
        </script>
      <?php
    }
  ?>
    <link href="https://fonts.googleapis.com/css?family=Cousine:700&amp;subset=latin-ext" rel="stylesheet">
</head>
<body>
<div class="dropdown">
  <img src="pictures/exit.png" alt="This exit leads nowhere" width="50" height="25">
  <div class="dropdown-content">
      <p class="home"><a href='/'>random / Home</a></p>
    <?php
        foreach ($js_files as $js_file) {
            $link = substr($js_file, 0, strlen($js_file) - 3);
            echo "<p><a href='$link'>$link</a></p>";
        }

    ?>
  </div>
</div>

<canvas id="myCanvas" resize="true" ></canvas>
</body>
</html>
