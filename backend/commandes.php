<!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Pharmatri+ | Commandes</title>
    <!-- Bootstrap CSS -->
    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
      rel="stylesheet"
    />
    <!-- Font Awesome -->
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
    />
    <!-- DataTables CSS -->
    <link
      rel="stylesheet"
      href="https://cdn.datatables.net/1.13.4/css/dataTables.bootstrap5.min.css"
    />

    <script src="https://cdn.datatables.net/1.10.25/js/jquery.dataTables.min.js"></script>
    <script src="https://cdn.datatables.net/1.10.25/js/dataTables.bootstrap5.min.js"></script>
    <!-- Custom CSS -->
    <link rel="stylesheet" href="css/style.css" />
    <link rel="stylesheet" href="css/commandes.css" />
  </head>
  <body>
    <div class="wrapper">
      <!-- Sidebar -->
   <?php include 'includes/barrelaterale.php'; ?>       

      <!-- Page Content -->
      <div id="content">
        <!-- Top Navbar -->
        <?php include 'includes/topbarre.php'; ?>
        <!-- Main Content -->
        <div class="container-fluid">
          <div
            class="d-sm-flex align-items-center justify-content-between mb-4"
          >
            <h1 class="h3 mb-0 text-gray-800">Commandes</h1>
            <button class="btn btn-primary btn-sm add-commande-btn">
              <i class="fas fa-plus me-1"></i> Ajouter une commande
            </button>
          </div>

          <!-- Liste des Commandes -->
          <div class="card shadow mb-4">
            <div
              class="card-header py-3 d-flex justify-content-between align-items-center"
            >
              <h6 class="m-0 font-weight-bold text-primary">
                Liste des commandes
              </h6>
              <div class="dropdown">
                <button
                  aria-label="btn"
                  class="btn btn-sm btn-outline-secondary dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i class="fas fa-cog"></i>
                </button>
                <ul
                  class="dropdown-menu dropdown-menu-end"
                  aria-labelledby="dropdownMenuButton"
                >
                  <li>
                    <a class="dropdown-item export-excel" href="#"
                      ><i class="fas fa-file-excel me-2"></i>Exporter en
                      Excel</a
                    >
                  </li>
                  <li>
                    <a class="dropdown-item export-pdf" href="#"
                      ><i class="fas fa-file-pdf me-2"></i>Exporter en PDF</a
                    >
                  </li>
                </ul>
              </div>
            </div>
            <div class="card-body">
              <div class="table-responsive">
                <table
                  id="commandesTable"
                  class="table table-striped table-bordered"
                  style="width: 100%"
                >
                  <thead class="table-light">
                    <tr>
                      <th>N° Commande</th>
                      <th>Client</th>
                      <th>Médicament</th>
                      <th>Quantité</th>
                      <th>Prix Total</th>
                      <th>Date</th>
                      <th>Statut</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <!-- Les données seront chargées dynamiquement -->
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Ajout de Commande (Wizard) -->
    <div class="modal fade" id="commandeModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header bg-primary text-white">
            <h5 class="modal-title" id="commandeModalTitle">
              Nouvelle Commande - Étape <span id="currentStep">1</span>/3
            </h5>
            <button
              type="button"
              class="btn-close btn-close-white"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>

          <form id="commandeWizardForm">
            <!-- Étape 1: Informations client -->
            <div class="modal-body step step-1">
              <div class="alert-container"></div>

              <div class="mb-3">
                <label for="clientNom" class="form-label fw-bold"
                  >Nom <span class="text-danger">*</span></label
                >
                <input
                  type="text"
                  class="form-control"
                  id="clientNom"
                  required
                />
                <div class="invalid-feedback">
                  Veuillez saisir le nom du client
                </div>
              </div>

              <div class="mb-3">
                <label for="clientPrenom" class="form-label fw-bold"
                  >Prénom <span class="text-danger">*</span></label
                >
                <input
                  type="text"
                  class="form-control"
                  id="clientPrenom"
                  required
                />
                <div class="invalid-feedback">
                  Veuillez saisir le prénom du client
                </div>
              </div>

              <div class="mb-3">
                <label for="clientEmail" class="form-label fw-bold"
                  >Email</label
                >
                <input type="email" class="form-control" id="clientEmail" />
                <div class="invalid-feedback">
                  Veuillez saisir un email valide
                </div>
              </div>

              <div class="mb-3">
                <label for="clientTelephone" class="form-label fw-bold"
                  >Téléphone <span class="text-danger">*</span></label
                >
                <input
                  type="tel"
                  class="form-control"
                  id="clientTelephone"
                  required
                />
                <div class="invalid-feedback">
                  Veuillez saisir un numéro de téléphone valide
                </div>
              </div>
            </div>

            <!-- Étape 2: Médicament commandé -->
            <div class="modal-body step step-2" style="display: none">
              <div class="alert-container"></div>

              <div class="mb-3">
                <label for="medicamentId" class="form-label fw-bold"
                  >Médicament <span class="text-danger">*</span></label
                >
                <select class="form-select" id="medicamentId" required>
                  <option value="">Sélectionnez un médicament</option>
                  <!-- Options chargées dynamiquement -->
                </select>
                <div class="invalid-feedback">
                  Veuillez sélectionner un médicament
                </div>
              </div>

              <div class="row">
                <div class="col-md-6 mb-3">
                  <label for="quantite" class="form-label fw-bold"
                    >Quantité <span class="text-danger">*</span></label
                  >
                  <input
                    type="number"
                    class="form-control"
                    id="quantite"
                    min="1"
                    value="1"
                    required
                  />
                  <div class="invalid-feedback">
                    La quantité doit être au moins 1
                  </div>
                </div>

                <div class="col-md-6 mb-3">
                  <label for="prixUnitaire" class="form-label fw-bold"
                    >Prix Unitaire (FCFA)</label
                  >
                  <input
                    type="text"
                    class="form-control"
                    id="prixUnitaire"
                    readonly
                  />
                </div>
              </div>

              <div class="mb-3">
                <label for="instructions" class="form-label fw-bold"
                  >Instructions spéciales</label
                >
                <textarea
                  class="form-control"
                  id="instructions"
                  rows="2"
                ></textarea>
              </div>
            </div>

            <!-- Étape 3: Finalisation -->
            <div class="modal-body step step-3" style="display: none">
              <div class="alert-container"></div>

              <div class="confirmation-details">
                <h5 class="fw-bold mb-4">Récapitulatif de la commande</h5>

                <div class="mb-3">
                  <h6 class="fw-bold">Client</h6>
                  <p>
                    <strong>Nom:</strong> <span id="confirmationNom"></span>
                  </p>
                  <p>
                    <strong>Téléphone:</strong>
                    <span id="confirmationTelephone"></span>
                  </p>
                  <p>
                    <strong>Email:</strong> <span id="confirmationEmail"></span>
                  </p>
                </div>

                <hr />

                <div class="mb-3">
                  <h6 class="fw-bold">Médicament</h6>
                  <p>
                    <strong>Désignation:</strong>
                    <span id="confirmationMedicament"></span>
                  </p>
                  <p>
                    <strong>Quantité:</strong>
                    <span id="confirmationQuantite"></span>
                  </p>
                  <p>
                    <strong>Prix Unitaire:</strong>
                    <span id="confirmationPrixUnitaire"></span>
                  </p>
                </div>

                <hr />

                <div class="mb-4">
                  <h6 class="fw-bold">Total</h6>
                  <p class="h5 text-primary">
                    <span id="confirmationTotal"></span>
                  </p>
                </div>

                <div class="mb-3">
                  <label for="modePaiement" class="form-label fw-bold"
                    >Mode de paiement <span class="text-danger">*</span></label
                  >
                  <select class="form-select" id="modePaiement" required>
                    <option value="">Sélectionnez un mode</option>
                    <option value="especes">Espèces</option>
                    <option value="carte">Carte bancaire</option>
                    <option value="mobile">Paiement mobile</option>
                    <option value="virement">Virement bancaire</option>
                  </select>
                  <div class="invalid-feedback">
                    Veuillez sélectionner un mode de paiement
                  </div>
                </div>
              </div>
            </div>

            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                id="prevBtn"
                style="display: none"
              >
                <i class="fas fa-arrow-left me-1"></i> Précédent
              </button>
              <button type="button" class="btn btn-primary" id="nextBtn">
                Suivant <i class="fas fa-arrow-right ms-1"></i>
              </button>
              <button
                type="submit"
                class="btn btn-success"
                id="submitBtn"
                style="display: none"
              >
                <i class="fas fa-check me-1"></i> Terminer
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Scripts -->
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <script src="https://cdn.datatables.net/1.13.4/js/jquery.dataTables.min.js"></script>
    <script src="https://cdn.datatables.net/1.13.4/js/dataTables.bootstrap5.min.js"></script>
    <script src="js/script.js"></script>
    <script src="js/commandes.js"></script>
  </body>
</html>
