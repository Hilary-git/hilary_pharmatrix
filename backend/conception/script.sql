- =================================================================================================
-- Script de création des tables pour l'application de gestion de médicaments
-- =================================================================================================

-- Suppression des tables si elles existent déjà pour permettre une réinitialisation propre.
-- L'ordre est important pour respecter les contraintes de clé étrangère.
DROP TABLE IF EXISTS coupon_medicament;
DROP TABLE IF EXISTS users_pharmacie;
DROP TABLE IF EXISTS coupon;
DROP TABLE IF EXISTS medicament;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS pharmacie;
DROP TABLE IF EXISTS all_medicament;


-- =================================================================================================
-- TABLE: all_medicament
-- Description: Contient le catalogue de tous les médicaments de référence.
--              Chaque médicament (ex: Paracétamol 500mg) n'existe qu'une seule fois ici.
-- =================================================================================================
CREATE TABLE all_medicament (
    -- Clé primaire auto-incrémentée pour identifier de manière unique un type de médicament.
    all_medicament_id INT AUTO_INCREMENT PRIMARY KEY,

    -- Nom commercial ou générique du médicament.
    name VARCHAR(255) NOT NULL,

    -- Description détaillée du médicament (posologie, effets, etc.).
    description TEXT,

    -- Ajout d'une contrainte d'unicité sur le nom pour éviter les doublons.
    UNIQUE (name)
);

-- =================================================================================================
-- TABLE: pharmacie
-- Description: Stocke les informations sur chaque pharmacie partenaire.
-- =================================================================================================
CREATE TABLE pharmacie (
    -- Clé primaire auto-incrémentée pour identifier de manière unique une pharmacie.
    pharmacie_id INT AUTO_INCREMENT PRIMARY KEY,

    -- Nom officiel de la pharmacie.
    name VARCHAR(255) NOT NULL,

    -- Adresse ou localisation de la pharmacie.
    location VARCHAR(255),

    -- Numéro de téléphone de la pharmacie.
    phone VARCHAR(50)
);

-- =================================================================================================
-- TABLE: users
-- Description: Contient les informations des utilisateurs de l'application.
-- =================================================================================================
CREATE TABLE users (
    -- Clé primaire auto-incrémentée pour identifier de manière unique un utilisateur.
    id_users INT AUTO_INCREMENT PRIMARY KEY,

    -- Prénom de l'utilisateur.
    first_name VARCHAR(100) NOT NULL,

    -- Nom de famille de l'utilisateur.
    last_name VARCHAR(100) NOT NULL,

    -- Numéro de téléphone de l'utilisateur.
    phone VARCHAR(50),

    -- Adresse de l'utilisateur.
    location VARCHAR(255),

    -- Adresse email de l'utilisateur, utilisée pour la connexion. Doit être unique.
    email VARCHAR(255) NOT NULL UNIQUE,

    -- Mot de passe de l'utilisateur (devrait être stocké sous forme de hash).
    password VARCHAR(255) NOT NULL,

    -- Rôle de l'utilisateur (ex: 'client', 'admin', 'pharmacien').
    -- L'utilisation d'une énumération est une bonne pratique ici.
    role ENUM('client', 'admin', 'pharmacien') NOT NULL DEFAULT 'client'
);

-- =================================================================================================
-- TABLE: medicament
-- Description: Représente un médicament spécifique disponible dans une pharmacie donnée,
--              avec son prix et sa quantité en stock.
--              Cette table fait le lien entre le catalogue général (all_medicament) et une pharmacie.
-- =================================================================================================
CREATE TABLE medicament (
    -- Clé primaire auto-incrémentée.
    medicament_id INT AUTO_INCREMENT PRIMARY KEY,

    -- Prix du médicament dans cette pharmacie spécifique.
    price DECIMAL(10, 2) NOT NULL CHECK (price >= 0),

    -- Quantité disponible en stock dans la pharmacie.
    quantite INT NOT NULL CHECK (quantite >= 0),

    -- Clé étrangère liant au médicament de référence dans le catalogue.
    all_medicament_id INT NOT NULL,

    -- Clé étrangère liant à la pharmacie où ce médicament est vendu.
    pharmacie_id INT NOT NULL,

    -- Définition des contraintes de clé étrangère.
    CONSTRAINT fk_medicament_all_medicament
        FOREIGN KEY (all_medicament_id)
        REFERENCES all_medicament(all_medicament_id)
        ON DELETE RESTRICT -- On ne peut pas supprimer un médicament de référence s'il est utilisé.
        ON UPDATE CASCADE,

    CONSTRAINT fk_medicament_pharmacie
        FOREIGN KEY (pharmacie_id)
        REFERENCES pharmacie(pharmacie_id)
        ON DELETE CASCADE -- Si une pharmacie est supprimée, ses médicaments en stock le sont aussi.
        ON UPDATE CASCADE,

    -- Un même médicament de référence ne peut pas apparaître deux fois pour la même pharmacie.
    UNIQUE (all_medicament_id, pharmacie_id)
);

-- =================================================================================================
-- TABLE: coupon
-- Description: Stocke les coupons de réduction créés par les utilisateurs.
-- =================================================================================================
CREATE TABLE coupon (
    -- Clé primaire auto-incrémentée.
    coupon_id INT AUTO_INCREMENT PRIMARY KEY,

    -- Référence unique du coupon (ex: 'PROMO2025-XYZ').
    reference VARCHAR(100) NOT NULL UNIQUE,

    -- Date et heure de création du coupon.
    -- `DEFAULT CURRENT_TIMESTAMP` insère automatiquement la date et l'heure actuelles.
    create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    -- Clé étrangère liant au créateur du coupon.
    user_id INT NOT NULL,

    -- Définition de la contrainte de clé étrangère.
    CONSTRAINT fk_coupon_user
        FOREIGN KEY (user_id)
        REFERENCES users(id_users)
        ON DELETE CASCADE -- Si un utilisateur est supprimé, ses coupons le sont aussi.
        ON UPDATE CASCADE
);

-- =================================================================================================
-- TABLE DE JONCTION: users_pharmacie
-- Description: Gère la relation Plusieurs-à-Plusieurs (N-N) entre les utilisateurs et les pharmacies.
--              Permet de savoir quel utilisateur est associé à quelle pharmacie (ex: pharmacie favorite).
-- =================================================================================================
CREATE TABLE users_pharmacie (
    -- Clé étrangère vers la table users.
    user_id INT NOT NULL,

    -- Clé étrangère vers la table pharmacie.
    pharmacie_id INT NOT NULL,

    -- Clé primaire composite pour garantir qu'une paire (user, pharmacie) est unique.
    PRIMARY KEY (user_id, pharmacie_id),

    -- Définition des contraintes de clé étrangère.
    CONSTRAINT fk_users_pharmacie_user
        FOREIGN KEY (user_id)
        REFERENCES users(id_users)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    CONSTRAINT fk_users_pharmacie_pharmacie
        FOREIGN KEY (pharmacie_id)
        REFERENCES pharmacie(pharmacie_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

-- =================================================================================================
-- TABLE DE JONCTION: coupon_medicament
-- Description: Gère la relation Plusieurs-à-Plusieurs (N-N) entre les coupons et les médicaments.
--              Permet de savoir quels médicaments sont concernés par un coupon.
-- =================================================================================================
CREATE TABLE coupon_medicament (
    -- Clé étrangère vers la table coupon.
    coupon_id INT NOT NULL,

    -- Clé étrangère vers la table medicament.
    medicament_id INT NOT NULL,

    -- Clé primaire composite pour garantir qu'une paire (coupon, medicament) est unique.
    PRIMARY KEY (coupon_id, medicament_id),

    -- Définition des contraintes de clé étrangère.
    CONSTRAINT fk_coupon_medicament_coupon
        FOREIGN KEY (coupon_id)
        REFERENCES coupon(coupon_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    CONSTRAINT fk_coupon_medicament_medicament
        FOREIGN KEY (medicament_id)
        REFERENCES medicament(medicament_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

-- =================================================================================================
-- FIN DU SCRIPT DE CRÉATION
-- =================================================================================================

-- =================================================================================================
