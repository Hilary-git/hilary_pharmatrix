<!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Pharmatris - Inscription</title>
    <link rel="stylesheet" href="./assets/css/register.css" />
    <link
      rel="stylesheet"
      href="./assets/fontawesome-free-6.7.2-web/css/all.min.css"
    />
  </head>
  <body>
    <div class="container">
      <div class="papa2">
        <h2 class="papa3">
          <img src="./assets/images/logo.png" alt="" class="papa4" />
        </h2>
        <h3 class="papa5">
          <u>
            <a href="index.php"></a>
            <i class="fas fa-home"></i>
          </u>
          <u>Inscription</u>
        </h3>

        <div class="papa6">
          <div class="papa7">
            <i class="fas fa-user papa9"></i>
            <input type="text" placeholder="PRENOM" class="papa8" />
          </div>
          <div class="papa7">
            <i class="fas fa-user papa9"></i>
            <input type="text" placeholder="NOM" class="papa8" />
          </div>
        </div>

        <div class="papa10">
          <i class="fas fa-envelope papa9"></i>
          <input type="email" placeholder="ADDRESS EMAIL" class="papa8" />
        </div>

        <div class="papa6">
          <div class="papa7">
            <i class="fas fa-phone papa9"></i>
            <input type="tel" placeholder="Tel" class="papa8" />
          </div>
          <div class="papa7">
            <i class="fas fa-map-marker-alt papa9"></i>
            <input type="text" placeholder="Votre localisation" class="papa8" />
          </div>
        </div>

        <div class="papa10">
          <i class="fas fa-lock papa9"></i>
          <input type="password" placeholder="MOT DE PASSE" class="papa8" />
          <i class="fas fa-lock papa09"></i>
          <input type="password" placeholder=" confirmer votre MOT DE PASSE" class="papa8" /> 
        </div>

        <button class="papa11"><a href="./index.html">S'inscrire</a></button>

        <p class="papa12">
          Vous avez déjà un compte? <a href="login.php"><u>Connexion</u></a>
        </p>
        <p class="indication">retrouvez nous sur</p>

        <div class="papa13">
          <i class="fab fa-google"></i>
          <i class="fab fa-facebook"></i>
          <i class="fab fa-instagram"></i>
        </div>
      </div>

      <div class="papa14">
         <img src="./assets/images/pha.jpg" alt="Pharmacienne" class="papa15" />

        <div id="users">
         
          
        </div>

      </div>
    </div>
    <?php include('includes/footer.php'); ?>
    <script src="./assets/js/script.js"></script>
  </body>
</html>
