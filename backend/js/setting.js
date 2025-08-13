$(document).ready(function() {
    // Gestion du formulaire de profil
    $('#profileForm').submit(function(e) {
        e.preventDefault();
        
        const formData = {
            nom: $('#adminNom').val().trim(),
            prenom: $('#adminPrenom').val().trim(),
            email: $('#adminEmail').val().trim(),
            telephone: $('#adminTelephone').val().trim()
        };

        // Validation simple
        if (!formData.nom || !formData.prenom || !formData.email) {
            showAlert('danger', 'Veuillez remplir tous les champs obligatoires');
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            showAlert('danger', 'Veuillez saisir un email valide');
            return;
        }

        // Enregistrement (simulé)
        console.log('Profil mis à jour:', formData);
        showAlert('success', 'Profil mis à jour avec succès !');
    });

    // Gestion du changement de mot de passe
    $('#passwordForm').submit(function(e) {
        e.preventDefault();
        
        const currentPassword = $('#currentPassword').val();
        const newPassword = $('#newPassword').val();
        const confirmPassword = $('#confirmPassword').val();

        // Validation
        if (!currentPassword || !newPassword || !confirmPassword) {
            showAlert('danger', 'Veuillez remplir tous les champs');
            return;
        }

        if (newPassword.length < 8) {
            showAlert('danger', 'Le mot de passe doit contenir au moins 8 caractères');
            return;
        }

        if (newPassword !== confirmPassword) {
            showAlert('danger', 'Les mots de passe ne correspondent pas');
            return;
        }

        // Enregistrement (simulé)
        console.log('Mot de passe changé');
        showAlert('success', 'Mot de passe changé avec succès !');
        $('#passwordForm')[0].reset();
    });

    // Gestion des préférences système
    $('#systemForm').submit(function(e) {
        e.preventDefault();
        
        const preferences = {
            language: $('#language').val(),
            timezone: $('#timezone').val(),
            theme: $('#theme').val(),
            notifications: $('#notifications').is(':checked')
        };

        // Enregistrement (simulé)
        console.log('Préférences mises à jour:', preferences);
        showAlert('success', 'Préférences enregistrées avec succès !');
        
        // Application du thème (exemple)
        if (preferences.theme === 'dark') {
            $('body').addClass('dark-theme');
        } else {
            $('body').removeClass('dark-theme');
        }
    });

    // Réinitialisation des paramètres
    $('.reset-settings-btn').click(function() {
        if (confirm('Êtes-vous sûr de vouloir réinitialiser tous les paramètres ?')) {
            // Réinitialisation (simulée)
            $('#systemForm')[0].reset();
            $('#language').val('fr');
            $('#timezone').val('UTC+1');
            $('#theme').val('light');
            $('#notifications').prop('checked', true);
            
            console.log('Paramètres réinitialisés');
            showAlert('success', 'Paramètres réinitialisés avec succès !');
        }
    });

    // Suppression de compte
    $('#confirmDeleteAccount').click(function() {
        const confirmEmail = $('#confirmEmail').val();
        
        if (confirmEmail !== 'admin@pharmatri.com') {
            showAlert('danger', 'Email de confirmation incorrect', '#confirmDeleteModal .modal-body');
            return;
        }

        // Suppression (simulée)
        console.log('Compte supprimé');
        $('#confirmDeleteModal').modal('hide');
        showAlert('warning', 'Votre compte a été supprimé. Redirection...');
        
        // Redirection (exemple)
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 2000);
    });

    // Changement de photo de profil
    $('.change-photo-btn').click(function(e) {
        e.preventDefault();
        // Simule l'ouverture d'un sélecteur de fichier
        $('<input type="file" accept="image/*">').on('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(event) {
                    $('.profile-picture img').attr('src', event.target.result);
                    showAlert('success', 'Photo de profil mise à jour !');
                };
                reader.readAsDataURL(file);
            }
        }).click();
    });

    // Fonction d'affichage des alertes
    function showAlert(type, message, container = 'body') {
        const alert = $(`
            <div class="alert alert-${type} alert-dismissible fade show alert-position">
                ${message}
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
        `);
        
        $(container).append(alert);
        
        setTimeout(() => {
            alert.alert('close');
        }, 5000);
    }
});