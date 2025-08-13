$(document).ready(function() {
    // Configuration de la table avec des données locales
    const medicamentsTable = $('#medicamentsTable').DataTable({
        responsive: true,
        language: {
            url: '//cdn.datatables.net/plug-ins/1.13.4/i18n/fr-FR.json'
        },
        data: [], // On initialise avec un tableau vide
        columns: [
            { data: 'id', title: 'ID' },
            { data: 'designation', title: 'Désignation' },
            { 
                data: 'description', 
                title: 'Description',
                render: function(data) {
                    return data || 'Aucune description';
                }
            },
            { 
                data: 'prix', 
                title: 'Prix (FCFA)',
                render: function(data) {
                    return parseFloat(data).toLocaleString('fr-FR') + ' FCFA';
                },
                className: 'text-end'
            },
            { 
                data: 'date_ajout',
                title: 'Date',
                render: function(data) {
                    return data ? new Date(data).toLocaleDateString('fr-FR') : '--';
                }
            },
            {
                data: null,
                title: 'Actions',
                render: function() {
                    return `
                        <div class="btn-group btn-group-sm">
                            <button class="btn btn-outline-primary view-btn" title="Voir">
                                <i class="fas fa-eye"></i>
                            </button>
                            <button class="btn btn-outline-warning edit-btn" title="Modifier">
                                <i class="fas fa-edit"></i>
                            </button>
                            <button class="btn btn-outline-danger delete-btn" title="Supprimer">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    `;
                },
                orderable: false,
                className: 'text-center'
            }
        ],
        dom: '<"top"<"row"<"col-md-6"l><"col-md-6"f>>>rt<"bottom"<"row"<"col-md-6"i><"col-md-6"p>>><"clear">',
        initComplete: function() {
            // Ajout du bouton dans la zone des boutons
            $('.add-medicament-btn').appendTo($('.dt-buttons'));
        }
    });

    // Données de démo (à remplacer par un vrai appel API en production)
    const demoData = [
        {
            id: 1,
            designation: "Paracétamol",
            description: "Antidouleur et antipyrétique",
            prix: 2000,
            date_ajout: "2023-07-15"
        },
        {
            id: 2,
            designation: "Ibuprofène",
            description: "Anti-inflammatoire non stéroïdien",
            prix: 2500,
            date_ajout: "2023-07-10"
        }
    ];

    // Ajout des données de démo
    medicamentsTable.rows.add(demoData).draw();

    // Gestion de l'ajout de médicament
    $('.add-medicament-btn').click(function() {
        $('#medicamentForm')[0].reset();
        $('#modalTitle').text('Ajouter un médicament');
        $('#saveBtn').text('Enregistrer').removeClass('btn-success').addClass('btn-primary');
        $('.alert-container').empty();
        $('#medicamentModal').modal('show');
    });

    // Sauvegarde du médicament
    $('#medicamentForm').submit(function(e) {
        e.preventDefault();
        
        const formData = {
            designation: $('#designation').val().trim(),
            description: $('#description').val().trim(),
            prix: $('#prix').val().trim(),
            date_ajout: $('#date').val() || new Date().toISOString()
        };

        // Validation
        if (!formData.designation || !formData.prix) {
            showAlert('danger', 'Veuillez remplir tous les champs obligatoires');
            return;
        }

        if (isNaN(formData.prix) || parseFloat(formData.prix) <= 0) {
            showAlert('danger', 'Le prix doit être un nombre valide');
            return;
        }

        // En production: remplacer par un appel AJAX
        formData.id = medicamentsTable.data().count() + 1;
        
        // Ajout à la table
        medicamentsTable.row.add(formData).draw();
        
        // Fermeture du modal
        $('#medicamentModal').modal('hide');
        
        // Notification
        showAlert('success', 'Médicament ajouté avec succès!');
    });

    // Fonction d'affichage des alertes
    function showAlert(type, message) {
        const alert = $(`
            <div class="alert alert-${type} alert-dismissible fade show position-fixed top-0 end-0 m-3" style="z-index: 1100;">
                ${message}
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
        `);
        
        $('body').append(alert);
        
        setTimeout(() => {
            alert.alert('close');
        }, 5000);
    }

    // Gestion des actions (Voir/Modifier/Supprimer)
    $('#medicamentsTable').on('click', '.view-btn, .edit-btn, .delete-btn', function() {
        const row = $(this).closest('tr');
        const rowData = medicamentsTable.row(row).data();
        
        if ($(this).hasClass('view-btn')) {
            // Vue détaillée
            alert(`Détails du médicament:\n\nID: ${rowData.id}\nDésignation: ${rowData.designation}\nPrix: ${rowData.prix} FCFA`);
        } 
        else if ($(this).hasClass('edit-btn')) {
            // Édition
            $('#modalTitle').text('Modifier le médicament');
            $('#saveBtn').text('Mettre à jour').removeClass('btn-primary').addClass('btn-success');
            $('#designation').val(rowData.designation);
            $('#description').val(rowData.description);
            $('#prix').val(rowData.prix);
            if (rowData.date_ajout) {
                $('#date').val(rowData.date_ajout.split('T')[0]);
            }
            $('.alert-container').empty();
            $('#medicamentModal').data('editId', rowData.id);
            $('#medicamentModal').modal('show');
        }
        else if ($(this).hasClass('delete-btn')) {
            // Suppression
            if (confirm('Voulez-vous vraiment supprimer ce médicament ?')) {
                medicamentsTable.row(row).remove().draw();
                showAlert('success', 'Médicament supprimé avec succès!');
            }
        }
    });
});