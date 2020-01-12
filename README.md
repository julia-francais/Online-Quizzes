# OQuizz

## Jour 7 : Atelier Solo, Sprint 3

Une petite mise a jour des vues a été entreprise afin d'avoir d'homogènéiser avec la version principale qui est tout aussi moche ;)
Plus mise à jour da la méthode tagPage qui ne récupérais pas l'auteur des quizz

### Créer et codé dans une nouvelle branche sprint3

<details>
<summary>Petit rappel ?</summary>
`git checkout -b sprint3`
</details>

### Pouvoir répondre aux questions d’un quiz

- Commencer par dupliquer la view 'quizz'. Renommer la copie "play_quizz"
- Transformer la view "play_quizz" pour qu'elle contienne un formulaire POST.
- Chaque réponse possible doit être un bouton radio.
- Nommer correctement les boutons radio pour qu'on ne puisse pas choisir plusieurs réponses à la même question.
- Mais on doit quand même pouvoir répondre à toutes les questions !

Dans la route `/quizz/:id`, tester si un utilisateur est connecté. Si c'est le cas, on renvoie la view "play_quizz". Sinon on renvoie la view sans formulaire ("quizz")

Coder ensuite la route POST qui va gérer la soumission du formulaire.

### Pouvoir visualiser mon score

Dans la route qui gère la soumission du formulaire, comparer les données utilisateurs aux bonnes réponses des questions du Quizz.

Chaque bonne réponse donne un point (on ne s'occupe pas de la difficulté de la question).

Renvoyer ensuite une belle view avec le résultat !

### Pouvoir visualiser les bonnes et mauvaise réponses que j’ai donné

Modifier la view précédente pour y intégrer quelles étaient les bonnes et les mauvaises réponses de l'utilisateur.

### Bonus 1 : Ajouter un nouveau Tag

CETTE FONCTIONNALITÉ NE DOIT ÊTRE ACCESSIBLE QU'AUX ADMINS !

- 2 nouvelles routes ("get" et "post")
- un formulaire
- ¯\\\_(ツ)_/¯ pour le reste à toi de jouer.

### Bonus 2 : Modifier un Tag existant

CETTE FONCTIONNALITÉ NE DOIT ÊTRE ACCESSIBLE QU'AUX ADMINS !

### Bonus 3 (AKA "bonus de la mort") : Associer un Tag à un Quizz

CETTE FONCTIONNALITÉ NE DOIT ÊTRE ACCESSIBLE QU'AUX ADMINS !

## Jour 5 - 6 : Sprint 2 - Suite et fin

### Créer une nouvelle branche sprint2 et allez dessus
<details>
<summary>Je ne me souviens plus</summary>
`git checkout -b sprint2`
</details>

### Page de profil

Implementer la page permettant d'afficher le profil d'un utilisateur avec les informations hors mot de passe et status.

### Lien de deconnexion

Rendre actif le lien de deconnexion, celui-ci doit supprimer la variable de de session user.

### BONUS

Mettre en forme cette mise en page sortie toute droit des enfers des années 90.

## Jour 4 : Atelier, Sprint 1

Fini les tests ! Maintenant qu'on a des super modèles, on va brancher tout ça dans une archi Express !

### Mise en place de l'archi
- npm est votre ami : installer les dépendances nécessaires
- point d'entrée de l'application : `index.js` (on y fait les réglages habituels pour express)
- un router (dans `app`)
- un dossier controllers (dans `app`)
- un controller `mainController`
- on oublie pas les fichiers statiques (notammenent le CSS)
- et plus si nécessaire...

### Page d'accueil

L'intégration est fournie !

Commencer par découper l'intégration en views façon ejs.

Ensuite, créer la route et la méthode correspondante dans le controller "mainController".

### Visualiser les titres de quizs sur la page d’accueil	

Remplacer les fausses données "en dur" par les données issues des Models !

### Visualiser les sous-titres et les auteurs des quizs sur la page d’accueil

Ici, se servir de Sequelize est une bonne idée (cf [les associations](https://sequelize.org/master/manual/models-usage.html#eager-loading)).

### Pouvoir accéder aux questions d’un quiz	

Il va falloir une nouvelle route (`/quizz/:id`).

Coder la méthode correspondante dans un nouveau controlleur (`QuizzController`).

Ici aussi, Sequelize va être bien pratique...

### pouvoir visualiser la difficulté de chaque question	

### visualiser les sujets de chaque quiz sur la page du quiz	

### pouvoir visualiser tous les sujets	

Nouvelle route (`/tags`)

Nouveau controller (`TagController`)

### pouvoir visualiser tous les quizs pour un sujet donné.

Astuce : utiliser le model Tag, et se servir des "includes" de Sequelize pour en déduire les quizzes concernées !

### Bonus 1 : ça pique les yeux

Un peu d'intégration, franchement, ça ferait pas de mal... Parceque là, on est pas loin du "crime contre le style".

Faites vous plaisir, de toute façon ça peut difficilement être pire que ce qui est fourni !

### Bonus 2 : formulaires

Rajouter les formulaires d'inscription et de connexion. 

---

## Jour 3 : Sequelize !

Pas de challenge

---

## Jour 2 : Active Record factorisé

Les méthodes Active Record sont maintenant factorisé directement dans CoreModel !!

Commencer par vérifier que tout fonctionne en écrivant quelques tests dans `test.js`, par exemple : 
- Trouver tous les User.
- Trouver la question dont l'id est 3.
- Créer un Level avec le nom "très difficile" et l'insérer en BDD.
- ...

Ensuite, rajouter 2 méthodes dans CoreModel : 
- `findBy(params, callback)` qui trouve les modèles correspondants à tous les paramètres passées dans le premier argument.
<details>
<summary>Un exemple</summary>

```js
Level.findBy({name:"difficile"}, callback); // trouve le(s) level(s) dont le nom est "difficile"
User.findBy({email: "michel@oclock.io"}, callback); // trouve le(s) user(s) dont l'email est "michel@oclock.io"
Tag.findBy({
  name: "Histoire",
  status: 1
}, callback); // trouve le(s) tag(s) dont le name est "Histoire" ET dont le status est 1.

```
</details>

- `save(callback)` : cette méthode appelle soit `insert` soit `update`, selon que l'instance existe déjà dans la BDD ou pas.

---

## Jour 1 : Active Record

Les méthodes Active Record du modèle `Level` ont été codées.

On a pu vérifier que ces méthodes fonctionnent en jouant dans `test.js`.

En s'inspirant (très largement) de ce code existant, on passe à la suite, à savoir coder les méthodes Active Record du modèle `User` : 
- `findAll(callback)`, qui trouve tous les Users dans la base de données.
- `findById(id, callback)`, qui trouve un User en fonction de son ID.
- `insert(callback)`, qui insert l'instance courante dans la base de données.
- `update(callback)`, qui met à jour l'instance courante dans la base de données.
- `delete(callback)`, qui supprime l'instance courante de la base de données.

En bonus, commencer à réfléchir pour factoriser tout ce code (c'est-à-dire coder toutes les méthodes Active Record dans CoreModel !)

---

## Jour Zéro : Le début du commencement

Pour commencer, il faut mettre en place la base de données !

Les choses à faire, dans l'ordre : 
- Créer un utilisateur PostgreSQL, nommé "oquizz", avec un mot de passe et les droits nécessaires.
- Créer une base de données nommée "oquizz", dont le propriétaire est l'utilisateur "oquizz".
- Créer les tables grâce au fichier "import_tables.sql".
- Importer les données grâce au fichier "import_data.sql".

<details>
<summary>Je me rappelle plus trop des commandes...</summary>

### Créer un utilisateur PostgreSQL, nommé "oquizz", avec un mot de passe et les droits nécessaires.
- d'abord se connecter à PostgreSQL en tant que "postgres": `sudo -i -u postgres`, puis `psql`
- puis créer l'utilisateur : `CREATE USER oquizz WITH LOGIN PASSWORD 'oquizz';`

### Créer une base de données nommée "oquizz", dont le propriétaire est l'utilisateur "oquizz".
- d'abord se connecter à PostgreSQL en tant que "postgres" (si c'est pas déjà fait): `sudo -i -u postgres`, puis `psql` 
- puis créer l'utilisateur : `CREATE DATABASE oquizz OWNER oquizz;`

### Créer les tables grâce au fichier "import_tables.sql".
- `psql -U oquizz -f data/import_tables.sql`

### Importer les données grâce au fichier "import_data.sql".
- `psql -U oquizz -f data/import_data.sql`

</details>

On pourra ensuite se connecter à la BDD dans le code via l'url : `postgres://oquizz:oquizz@localhost/oquizz`

## Du code classe !

Créer un dossier `app`, puis un sous-dossier `app/models`.

Dans ce dossier, on va coder des classes à partir du MCD du projet : 
- une classe par entité: `Answer`, `Level`, `Question`, `Quizz`, `Tag`, et `User`
- une seule classe par fichier ! Le fichier porte le même nom que la classe, en minuscule.

Dans chaque classe : 
- déclarer une propriété pour chaque champ de la table correspondante.
- coder un `constructor` qui prend en paramètre un objet. Cet objet contient toutes les valeurs à recopier dans l'instance.
- ne pas oublier d'exporter la classe !

<details>
<summary>Heuuu oui... t'as un exemple ?</summary>

Le but, c'est d'arriver à faire ça : 
```js

const monTag = new Tag({
  name: "un super tag",
  status: 1
});
```

On devrait donc avoir un truc dans ce genre : 
```js
class Tag {
  constructor(obj) {
    this.name = obj.name;
    this.status = obj.status;
  }
};
```
</details>

## Do not repeat yourself

Les propriétés `id`, `created_at` et `updated_at` sont présentes dans toutes les classes.

On va donc... les factoriser ! Et pour ce faire, on va utiliser l'héritage !

On va donc coder une class `CoreModel`, dans le même dossier que les autres, et toutes les classes vont _hériter_ de celle-ci : 
- Penser à exporter `CoreModel`.
- Penser à require `CoreModel` dans les autres fichiers.
- Penser à appeler le "constructeur parent" dans les constructeur des classes.

## Get/Set

Dans chaque classe, à commencer par `CoreModel`, coder un "getter" et un "setter" par propriété.

<details>
<summary>Un exemple </summary>

```js
class CoreModel {
  id;

  getId() {
    return this.id;
  };

  setId(value) {
    this.id = value;
  };
};
```
</details>

## Bonus : ne pas autoriser de valeurs absurdes

Dans les "setters", rajouter des tests pour vérifier que la donnée passée en argument est au moins du bon type.

<details>
<summary>Un exemple</summary>

```js
class CoreModel {
  id;

  setId(value) {
    if( typeof value !== 'number') {
      throw Error("CoreModel.id must be a number !");
      // on "lève" une erreur => ça arrête tout !
    }
    this.id = value;
  }
};
```
</details>

