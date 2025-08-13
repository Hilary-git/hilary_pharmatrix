$(document).ready(function() {
    // Variables
    let currentStep = 1;
    const totalSteps = 3;
    let commandeData = {};
    
    // Initialisation DataTable
    const commandesTable = $('#commandesTable').DataTable({
        responsive: true,
        language: {
            url: '//cdn.datatables.net/plug-ins/1.13.4/i18n/fr-FR.json'
        },
        columns: [
            { data: 'id' },
            { 
                data: 'client',
                render: function(data) {
                    return `${data.nom} ${data.prenom}`;
                }
            },
            { data: 'medicament.nom' },
            { data: 'quantite' },
            { 
                data: 'prix_total',
                render: function(data) {
                    return `${parseFloat(data).toLocaleString('fr-FR')} FCFA`;
                },
                className: 'text-end'
            },
            { 
                data: 'date',
                render: function(data) {
                    return new Date(data).toLocaleDateString('fr-FR');
                }
            },
            { 
                data: 'statut',
                render: function(data) {
                    let badgeClass = '';
                    switch(data) {
                        case 'validée': badgeClass = 'badge-validee'; break;
                        case 'annulée': badgeClass = 'badge-annulee'; break;
                        default: badgeClass = 'badge-en-cours';
                    }
                    return `<span class="badge badge-statut ${badgeClass}">${data}</span>`;
                }
            },
            {
                data: null,
                render: function() {
                    return `
                        <div class="btn-group btn-group-sm">
                            <button class="btn btn-outline-primary view-btn" title="Voir">
                                <i class="fas fa-eye"></i>
                            </button>
                            <button class="btn btn-outline-danger cancel-btn" title="Annuler">
                                <i class="fas fa-times"></i>
                            </button>
                        </div>
                    `;
                },
                orderable: false,
                className: 'text-center'
            }
        ],
        dom: '<"top"<"row"<"col-md-6"l><"col-md-6"f>>>rt<"bottom"<"row"<"col-md-6"i><"col-md-6"p>>><"clear">'
    });

    // Chargement des médicaments pour le select
    function loadMedicaments() {
        // Simulation - en pratique vous feriez un appel AJAX
        const medicaments = [
            { id: 1, nom: "Paracétamol", prix: 2000 },
            { id: 2, nom: "Efferalgan", prix: 3000 },
            { id: 3, nom: "Doliprane", prix: 2500 }
        ];
        
        const select = $('#medicamentId');
        select.empty().append('<option value="">Sélectionnez un médicament</option>');
        
        medicaments.forEach(med => {
            select.append(`<option value="${med.id}" data-prix="${med.prix}">${med.nom} - ${med.prix} FCFA</option>`);
        });
    }

    // Gestion des événements
    $('.add-commande-btn').click(openCommandeModal);
    $('#medicamentId').change(updatePrixUnitaire);
    $('#nextBtn').click(goToNextStep);
    $('#prevBtn').click(goToPrevStep);
    $('#commandeWizardForm').submit(finalizeCommande);

    // Fonctions
    function openCommandeModal() {
        currentStep = 1;
        commandeData = {};
        $('#commandeModalTitle span').text(currentStep);
        $('.step').removeClass('active').hide();
        $('.step-1').addClass('active').show();
        $('#prevBtn').hide();
        $('#nextBtn').show();
        $('#submitBtn').hide();
        $('.alert-container').empty();
        $('#commandeWizardForm')[0].reset();
        loadMedicaments();
        $('#commandeModal').modal('show');
    }

    function updatePrixUnitaire() {
        const selectedOption = $('#medicamentId option:selected');
        const prix = selectedOption.data('prix') || 0;
        $('#prixUnitaire').val(`${prix.toLocaleString('fr-FR')} FCFA`);
    }

    function validateStep(step) {
        let isValid = true;
        
        if (step === 1) {
            // Validation Étape 1 (Client)
            if (!$('#clientNom').val().trim()) {
                $('#clientNom').addClass('is-invalid');
                isValid = false;
            } else {
                $('#clientNom').removeClass('is-invalid');
            }
            
            if (!$('#clientPrenom').val().trim()) {
                $('#clientPrenom').addClass('is-invalid');
                isValid = false;
            } else {
                $('#clientPrenom').removeClass('is-invalid');
            }
            
            const email = $('#clientEmail').val().trim();
            if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                $('#clientEmail').addClass('is-invalid');
                isValid = false;
            } else {
                $('#clientEmail').removeClass('is-invalid');
            }
            
            if (!$('#clientTelephone').val().trim()) {
                $('#clientTelephone').addClass('is-invalid');
                isValid = false;
            } else {
                $('#clientTelephone').removeClass('is-invalid');
            }
            
            if (isValid) {
                commandeData.client = {
                    nom: $('#clientNom').val().trim(),
                    prenom: $('#clientPrenom').val().trim(),
                    email: email,
                    telephone: $('#clientTelephone').val().trim()
                };
            }
        } else if (step === 2) {
            // Validation Étape 2 (Médicament)
            if (!$('#medicamentId').val()) {
                $('#medicamentId').addClass('is-invalid');
                isValid = false;
            } else {
                $('#medicamentId').removeClass('is-invalid');
            }
            
            if (!$('#quantite').val() || parseInt($('#quantite').val()) < 1) {
                $('#quantite').addClass('is-invalid');
                isValid = false;
            } else {
                $('#quantite').removeClass('is-invalid');
            }
            
            if (isValid) {
                const selectedOption = $('#medicamentId option:selected');
                commandeData.medicament = {
                    id: $('#medicamentId').val(),
                    nom: selectedOption.text().split(' - ')[0],
                    prix: selectedOption.data('prix')
                };
                commandeData.quantite = parseInt($('#quantite').val());
                commandeData.instructions = $('#instructions').val().trim();
                commandeData.prix_total = commandeData.medicament.prix * commandeData.quantite;
            }
        } else if (step === 3) {
            // Validation Étape 3 (Finalisation)
            if (!$('#modePaiement').val()) {
                $('#modePaiement').addClass('is-invalid');
                isValid = false;
            } else {
                $('#modePaiement').removeClass('is-invalid');
                commandeData.mode_paiement = $('#modePaiement').val();
            }
            
            // Mise à jour du récapitulatif
            if (isValid) {
                $('#confirmationClient').text(`${commandeData.client.nom} ${commandeData.client.prenom}`);
                $('#confirmationTelephone').text(commandeData.client.telephone);
                $('#confirmationEmail').text(commandeData.client.email || 'Non renseigné');
                $('#confirmationMedicament').text(`${commandeData.medicament.nom} (${commandeData.medicament.prix} FCFA)`);
                $('#confirmationQuantite').text(commandeData.quantite);
                $('#confirmationPrixUnitaire').text(`${commandeData.medicament.prix.toLocaleString('fr-FR')} FCFA`);
                $('#confirmationTotal').text(`${commandeData.prix_total.toLocaleString('fr-FR')} FCFA`);
            }
        }
        
        return isValid;
    }

    function goToNextStep() {
        if (!validateStep(currentStep)) return;
        
        currentStep++;
        $('#commandeModalTitle span').text(currentStep);
        $('.step').removeClass('active').hide();
        $(`.step-${currentStep}`).addClass('active').show();
        $('#prevBtn').show();
        
        if (currentStep === totalSteps) {
            $('#nextBtn').hide();
            $('#submitBtn').show();
        }
    }

    function goToPrevStep() {
        currentStep--;
        $('#commandeModalTitle span').text(currentStep);
        $('.step').removeClass('active').hide();
        $(`.step-${currentStep}`).addClass('active').show();
        $('#nextBtn').show();
        $('#submitBtn').hide();
        
        if (currentStep === 1) {
            $('#prevBtn').hide();
        }
    }

    function finalizeCommande(e) {
        e.preventDefault();
        
        if (!validateStep(currentStep)) return;
        
        // Simulation d'enregistrement - en pratique vous feriez un appel AJAX
        commandeData.id = Math.floor(Math.random() * 1000) + 1000;
        commandeData.date = new Date().toISOString();
        commandeData.statut = 'en cours';
        
        // Ajout à la table
        commandesTable.row.add(commandeData).draw();
        
        // Fermeture du modal
        $('#commandeModal').modal('hide');
        
        // Notification
        showAlert('success', 'Commande créée avec succès!');
    }

    function showAlert(type, message) {
        const alert = $(`
            <div class="alert alert-${type} alert-dismissible fade show position-fixed top-0 end-0 m-3">
                ${message}
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
        `);
        
        $('body').append(alert);
        
        setTimeout(() => {
            alert.alert('close');
        }, 5000);
    }
});