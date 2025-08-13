<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="./assets/css/style.css" />
    <link
      rel="stylesheet"
      href="./assets/fontawesome-free-6.7.2-web/css/all.min.css"
    />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Quicksand:wght@300..700&family=Roboto:ital,wght@0,100..900;1,100..900&display=swap"
      rel="stylesheet"
    />
    <title>Home|pharmatrix</title>
  </head>
  <body>
     <?php include('includes/nav.php'); ?>


    <header id="app_home">

      <section class="branding">
        <div class="bg-green"></div>
        <div class="content">
          <h2 class="title">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque a
            deleniti quae quod pariatur unde? Eius laudantium nisi obcaecati
            quidem!
          </h2>
          <div class="search-barre">
            <i class="fa-solid fa-search"></i>
            <input
              type="search"
              placeholder="Rechercher et trouver vos medicamnets"
              name=""
              id=""
            />
          </div>

          <div class="imgs">
            <div><img src="./assets/images/paracetamol.jpg" alt="paracetamol"></div>
            <div><img src="./assets/images/doliprane.jpg" alt="doliprane"></div>
            <div><img src="./assets/images/efferagan.jpg" alt="efferagan"></div>
            <div><img src="./assets/images/maalox.jpg" alt=""></div>
          </div>
        </div>
      </section>
    </header>

    <?php include('includes/footer.php'); ?>
  </body>
</html>
