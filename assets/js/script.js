// 🟢 Classe représentant un utilisateur
class User {
  constructor(first_name, name, email, phone, localisation, password) {
    this.first_name = first_name;
    this.name = name;
    this.email = email;
    this.localisation = localisation;
    this.phone = phone;
    this.password = password;
  }
  CreateField(titre, valeur, className) {

    let b = document.createElement('b');
    b.textContent = titre + ':';
    let span = document.createElement('span');
    span.textContent = valeur;
    let div = document.createElement('div');
    div.appendChild(b);
    div.appendChild(span);
    div.classList.add(className);
    return div;

  }

  convertToHTML(id) {
    let prenom = this.CreateField('PRENOM', this.first_name, 'prenom');
    let nom = this.CreateField('NOM', this.name, 'nom');
    let email = this.CreateField('EMAIL', this.email, 'email');
    let phone = this.CreateField('PHONE', this.phone, 'phone');
    let localisation = this.CreateField('LOCALISATION', this.localisation, 'localisation');
    let password = this.CreateField('MOT DE PASSE', this.password, 'password');

    let elt = document.createElement('div');
    elt.appendChild(prenom);
    elt.appendChild(nom);
    elt.appendChild(email);
    elt.appendChild(phone);
    elt.appendChild(localisation);
    elt.appendChild(password);
    elt.id = 'user' + id;
    return elt;

  }
}

// 🟢 Classe pour gérer la base IndexedDB
class UserDB {
  constructor() {
    this.dbName = "DBpharmatrix"; // Nom de la base
    this.storeName = "users"; //Nom du "store" (équivalent d'une table)
    this.db = null; // Si déjà ouverte, on la retourne
  }

  // 🟢 Méthode pour ouvrir la base
  async openDB() {
    // ✅ Si la base est déjà ouverte, on la retourne directement
    if (this.db) {
      return this.db;
    }

    const request = indexedDB.open(this.dbName, 1);

    // ✅ Retourner une promesse pour attendre l'ouverture
    return new Promise((resolve, reject) => {


      request.onupgradeneeded = (event) => {
        const db = event.target.result; // On récupère la base
        if (!db.objectStoreNames.contains(this.storeName)) {
          db.createObjectStore(this.storeName, {
            keyPath: "id", // Clé primaire
            autoIncrement: true, // ✅ Ajouté pour que l'id soit généré automatiquement
          });
        }
      };

      // ✅ Gestion du succès de l'ouverture
      request.onsuccess = (event) => {
        this.db = event.target.result; // On stocke la base
        resolve(this.db); // On résout la promesse avec la base ouverte
      };


      request.onerror = (event) => {
        reject(event.target.error); // On rejette proprement la promesse avec l'erreur
      };
    });
  }

  // 🟢 Méthode pour ajouter un utilisateur
  async addUser(user) {
    const db = await this.openDB(); // On attend que la base soit prête

    return new Promise((resolve, reject) => {
      const tx = db.transaction(this.storeName, "readwrite"); // Création transaction
      const store = tx.objectStore(this.storeName); // Accès au store
      const request = store.add(user); // Insertion de l'utilisateur

      // ✅ Si succès, on retourne l'utilisateur
      request.onsuccess = () => resolve(user);


      request.onerror = (e) => reject(e.target.error); // On capture l'erreur correctement
    });
  }


  // methode pour mettre a jour un utilisateur
  async updateUser(user) {
    const db = await this.openDB(); // On attend que la base soit prête

    return new Promise((resolve, reject) => {
      const tx = db.transaction(this.storeName, "readwrite"); // Création transaction
      const store = tx.objectStore(this.storeName); // Accès au store
      const request = store.put(user); // Insertion de l'utilisateur

      // ✅ Si succès, on retourne l'utilisateur
      request.onsuccess = () => resolve(user);


      request.onerror = (e) => reject(e.target.error); // On capture l'erreur correctement
    });
  }

  // mathode pour lire un utilisateur
  async readUser(id) {
    const db = await this.openDB(); // On attend que la base soit prête

    return new Promise((resolve, reject) => {
      const tx = db.transaction(this.storeName, "readwrite"); // Création transaction
      const store = tx.objectStore(this.storeName); // Accès au store
      const request = store.get(id); // Insertion de l'utilisateur

      // ✅ Si succès, on retourne l'utilisateur
      request.onsuccess = (e) => {
        const user = e.target.result;
        if (user) {
          resolve(user)
        }
        else {
          reject(new error("utilisateur non trouve"))
        }
      };
      request.onerror = (e) => reject(e.target.error); // On capture l'erreur correctement
    });
  }

  // methode por suprimer un utilisateur
  async deleteUser(id) {
    const db = await this.openDB(); // On attend que la base soit prête

    return new Promise((resolve, reject) => {
      const tx = db.transaction(this.storeName, "readwrite"); // Création transaction
      const store = tx.objectStore(this.storeName); // Accès au store
      const request = store.delete(id); // Insertion de l'utilisateur

      // ✅ Si succès, on retourne l'utilisateur
      request.onsuccess = () => resolve("utilisateur suprimer avec succes");

      request.onerror = (e) => reject(e.target.error); // On capture l'erreur correctement
    });
  }


  // recuperer tous les utilisateurs
  async readAllUser() {
    const db = await this.openDB(); // On attend que la base soit prête

    return new Promise((resolve, reject) => {
      const tx = db.transaction(this.storeName, "readwrite"); // Création transaction
      const store = tx.objectStore(this.storeName); // Accès au store
      const request = store.getAll();
      request.onsuccess = (e) => resolve(e.target.result);
      request.onerror = (e) => reject(e.target.error);
    });
  }


  printUsers() {
    document.querySelector('#users').innerHTML='';
    const users = this.readAllUser();

    if (users != null) {
      users.then((result) => {
        if (result.length > 0) {
          for (let i = 0; i < result.length; i++) {
            user = new User(
              result[i].first_name,
              result[i].name,
              result[i].email,
              result[i].phone,
              result[i].localisation,
              result[i].password
            );
            document.querySelector('#users').appendChild(user.convertToHTML(result[i].id));
          }
        }
      });
    }
  }
  

}



  // declaration des objets
  const userDB = new UserDB();
let user = null;





//gerer le formulaire

userDB.printUsers();

document.addEventListener("DOMContentLoaded", () => {

  //selectionner les inputs
  const inputs = document.querySelectorAll(".papa8");
  const btn = document.querySelector(".papa11");

  //empecher le button de recharger la page
  btn.addEventListener('click', async (e) => {
    e.preventDefault();
    const [prenom, nom, email, tel, localisation, password] = Array.from(inputs).map(input => input.value);
    if (!prenom || !nom || !email || !tel || !localisation || !password) {
      alert("Veuillez Remplir tous les champs.")
      return;
    }
    const user = new User(prenom, nom, email, tel, localisation, password);
    await userDB.addUser(user);
    inputs.forEach(input => input.value = "");
    alert("Utilisateur ajouter avec success")
    userDB.printUsers();

  })
});
