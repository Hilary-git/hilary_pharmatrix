$(document).ready(function () {
    // Vérification initiale de la largeur de l'ecran
    function checkWidth() {
        if ($(window).width() < 992) {
            $('#sidebar').addClass('active');
            $('.menu-text').hide();
        } else {
            $('#sidebar').removeClass('active');
            $('.menu-text').show();
        }
    }

    // Appel initial de la fonction
    checkWidth();

    // Écouteur d'événement pour le redimensionnement de la fenêtre
    $(window).resize(checkWidth);


    // Sidebar toggle functionality
    $('#sidebarCollapse').on('click', function () {
        $('#sidebar').toggleClass('active');
        $(this).toggleClass('active');
        
        // Add animation class
        $('#sidebar').addClass('animated fadeIn');
        
        // Remove animation class after animation completes
        setTimeout(function() {
            $('#sidebar').removeClass('animated fadeIn');
        }, 300);
    });

    // Dropdown menu
    $('.dropdown-toggle').dropdown();

    // Active menu item
    $('.list-unstyled li').on('click', function() {
        $('.list-unstyled li').removeClass('active');
        $(this).addClass('active');
    });

    // Responsive adjustments
    $(window).resize(function() {
        if ($(window).width() < 768) {
            $('#sidebar').addClass('active');
        } else {
            $('#sidebar').removeClass('active');
        }
    });

    // Initialize tooltips
    $('[data-bs-toggle="tooltip"]').tooltip();
});



// Infobulles pour les icônes en mode réduit
$(document).ready(function() {
    $('#sidebar.active li a').hover(
        function() {
            $(this).attr('data-bs-toggle', 'tooltip');
            $(this).attr('data-bs-placement', 'right');
            $(this).attr('title', $(this).find('.menu-text').text());
            $(this).tooltip('show');
        },
        function() {
            $(this).tooltip('hide');
            $(this).removeAttr('data-bs-toggle');
            $(this).removeAttr('data-bs-placement');
            $(this).removeAttr('title');
        }
    );
});