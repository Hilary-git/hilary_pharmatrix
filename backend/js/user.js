$(document).ready(function() {
    // Initialisation de DataTable
    $('#usersTable').DataTable({
        responsive: true,
        language: {
            url: '//cdn.datatables.net/plug-ins/1.10.25/i18n/French.json'
        },
        dom: '<"top"f>rt<"bottom"lip><"clear">',
        pageLength: 10,
        lengthMenu: [10, 25, 50, 100],
        columnDefs: [
            {
                targets: [5], // Colonne Actions
                orderable: false,
                searchable: false
            }
        ]
    });

    // Fonctionnalité de recherche
    $('.search-bar form').submit(function(e) {
        e.preventDefault();
        const searchTerm = $(this).find('input').val().toLowerCase();
        
        $('#usersTable tbody tr').each(function() {
            const rowText = $(this).text().toLowerCase();
            $(this).toggle(rowText.indexOf(searchTerm) > -1);
        });
    });

    // Bouton d'ajout d'utilisateur
    $('.dropdown-item').on('click', function() {
        const action = $(this).find('i').attr('class').split(' ')[1];
        
        switch(action) {
            case 'fa-plus':
                alert('Ajouter un nouvel utilisateur');
                break;
            case 'fa-file-export':
                alert('Exporter la liste');
                break;
            case 'fa-filter':
                alert('Filtrer les résultats');
                break;
        }
    });
});