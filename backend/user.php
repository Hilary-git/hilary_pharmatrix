<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pharmatri+ | Utilisateurs</title>
    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <!-- DataTables CSS -->
    <link rel="stylesheet" href="https://cdn.datatables.net/1.10.25/css/dataTables.bootstrap5.min.css">

    <script src="https://cdn.datatables.net/1.10.25/js/jquery.dataTables.min.js"></script>
    <script src="https://cdn.datatables.net/1.10.25/js/dataTables.bootstrap5.min.js"></script>
    <!-- Custom CSS -->
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/user.css">
</head>
<body>
    <div class="wrapper">
        <!-- Sidebar -->
  <?php include 'includes/barrelaterale.php'; ?>

        <!-- Page Content -->
        <div id="content">
            <!-- Top Navbar (identique) -->
            <?php include 'includes/topbarre.php'; ?>

            <!-- Main Content Spécifique aux Utilisateurs -->
            <div class="container-fluid">
                <h1 class="mt-4">Utilisateurs</h1>
                
                <!-- Liste des Utilisateurs -->
                <div class="row mt-4">
                    <div class="col-12">
                        <div class="card shadow mb-4">
                            <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                <h6 class="m-0 font-weight-bold text-primary">Liste des Utilisateurs</h6>
                                <div class="dropdown no-arrow">
                                    <a aria-label="Ouvrir le menu" class="dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                                        <i class="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"></i>
                                    </a>
                                    <ul class="dropdown-menu dropdown-menu-end shadow animated--fade-in" aria-labelledby="dropdownMenuLink">
                                        <li><a class="dropdown-item" href="#"><i class="fas fa-plus me-2"></i>Ajouter utilisateur</a></li>
                                        <li><a class="dropdown-item" href="#"><i class="fas fa-file-export me-2"></i>Exporter</a></li>
                                        <li><a class="dropdown-item" href="#"><i class="fas fa-filter me-2"></i>Filtrer</a></li>
                                    </ul>
                                </div>
                            </div>
                            <div class="card-body">
                                <div class="table-responsive">
                                    <table class="table table-bordered" id="usersTable" width="100%" cellspacing="0">
                                        <thead>
                                            <tr>
                                                <th>Nom</th>
                                                <th>Prénom</th>
                                                <th>Email</th>
                                                <th>Téléphone</th>
                                                <th>Localisation</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>KENFACK</td>
                                                <td>Aurelien</td>
                                                <td>test@yahoo.com</td>
                                                <td>690452345</td>
                                                <td>--</td>
                                                <td>
                                                    <button aria-label="Afficher les détails" class="btn btn-sm btn-primary"><i class="fas fa-eye"></i></button>
                                                    <button aria-label="Modifier l'utilisateur" class="btn btn-sm btn-warning"><i class="fas fa-edit"></i></button>
                                                    <button aria-label="Supprimer l'utilisateur" class="btn btn-sm btn-danger"><i class="fas fa-trash"></i></button>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>NDEFFO</td>
                                                <td>Armel</td>
                                                <td>demo@yahoo.com</td>
                                                <td>690452345</td>
                                                <td>--</td>
                                                <td>
                                                    <button aria-label="Afficher les détails" class="btn btn-sm btn-primary"><i class="fas fa-eye"></i></button>
                                                    <button aria-label="Modifier l'utilisateur" class="btn btn-sm btn-warning"><i class="fas fa-edit"></i></button>
                                                    <button aria-label="Supprimer l'utilisateur" class="btn btn-sm btn-danger"><i class="fas fa-trash"></i></button>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>TCHOMO</td>
                                                <td>Andre</td>
                                                <td>andre@yahoo.com</td>
                                                <td>690452345</td>
                                                <td>--</td>
                                                <td>
                                                    <button aria-label="Afficher les détails" class="btn btn-sm btn-primary"><i class="fas fa-eye"></i></button>
                                                    <button aria-label="Modifier l'utilisateur" class="btn btn-sm btn-warning"><i class="fas fa-edit"></i></button>
                                                    <button aria-label="Supprimer l'utilisateur" class="btn btn-sm btn-danger"><i class="fas fa-trash"></i></button>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>TOTO</td>
                                                <td>Armel</td>
                                                <td>demo@yahoo.com</td>
                                                <td>690452345</td>
                                                <td>--</td>
                                                <td>
                                                    <button aria-label="Afficher les détails" class="btn btn-sm btn-primary"><i class="fas fa-eye"></i></button>
                                                    <button aria-label="Modifier l'utilisateur" class="btn btn-sm btn-warning"><i class="fas fa-edit"></i></button>
                                                    <button aria-label="Supprimer l'utilisateur" class="btn btn-sm btn-danger"><i class="fas fa-trash"></i></button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div class="card-footer">
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="dataTables_info" id="dataTable_info" role="status" aria-live="polite">
                                            Affichage de 1 à 4 sur 4 entrées
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="dataTables_paginate paging_simple_numbers" id="dataTable_paginate">
                                            <ul class="pagination justify-content-end">
                                                <li class="paginate_button page-item previous disabled" id="dataTable_previous">
                                                    <a aria-label="Précédent" href="#" aria-controls="dataTable" data-dt-idx="0" tabindex="0" class="page-link">Précédent</a>
                                                </li>
                                                <li class="paginate_button page-item active">
                                                    <a aria-label="Page 1" href="#" aria-controls="dataTable" data-dt-idx="1" tabindex="0" class="page-link">1</a>
                                                </li>
                                                <li class="paginate_button page-item next disabled" id="dataTable_next">
                                                    <a aria-label="Suivant" href="#" aria-controls="dataTable" data-dt-idx="2" tabindex="0" class="page-link">Suivant</a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Bootstrap JS Bundle with Popper -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <!-- jQuery -->
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <!-- DataTables JS -->
    <script src="https://cdn.datatables.net/1.10.25/js/jquery.dataTables.min.js"></script>
    <script src="https://cdn.datatables.net/1.10.25/js/dataTables.bootstrap5.min.js"></script>
    <!-- Custom JS -->
    <script src="js/script.js"></script>
    <script src="js/user.js"></script>
</body>
</html>