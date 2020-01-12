# plateforme oQuizz

## quizz : 
* titre
* themes : cosmologie/ informatique / culture G / ...
* sujets : cosmo = espace, relativite, gravitation, ...
* auteur : cosmo = jerome dudant)
* question : titre de la question
* reponses : reponses possibles
* niveau de difficulte : debutant, confirme, expert
* contexte : anecdote, infos,...)

pas besoin de stocker, reponse immediate

## NEED :

- structure bas de donnees
- explication comment elle est faite

## ROLES :

- invité
- user
- admin

## PAGES :

- accueil
- login
- inscription
- profil user
- contact
- themes
- sujets
- quizz
- scores
- mentions legales & conditions d'utilisation
- espace admin :
    - éditer un quizz
    - éditer une question

## ACTIONS SUR LES PAGES :

1. visualiser quizz (caroussel des themes, liste des differents themes dispo, ...), le noms des participants, pouvoir s'inscrire, se connecter
    -> tout le monde peut voir les infos de la page accueil

2. demander le login ( mail / pseudo), mdp, mdp oublié ? , lien inscription -> page accessible par tout le monde mais reagit differemment en fonction des utilisateurs :
        - page à conditions d'affichage : si deja connecté redirige vers une autre page ou affiche autre chose ou proposer de se déconnecter
        - page de co redirige vers la page profil user ou on peut se deconnecter

3. inscription, acceder au formulaire, case a cocher pour proposer la newsletter
    -> page accessible par les invités

4. editer son compte, on doit etre connecter
    -> page accessible par le user

5. contacts : envois de formulaire (feedback / pouvoir proposer une question / ...) / situer sur une cartes / differentes adresses (mails, postales, ...)
    -> page accessible par tout le monde

6. lister les themes par champs de recherche (sujets par exemple) pour pouvoir ensuite les choisir avec des boutons ou liens
    -> page accessible par tout le monde

7. visualiser les noms des quizz en fonction du theme choisis
    -> page accessible par tout le monde

8. quizz, mettre information de difficulté et de contexte par questions
    -> page accessible par les users uniquement (pouvoir se log/inscrire à ce moment là ?)
        mode démo : pouvoir participer a un quizz accessible sans avoir besoin de s inscrire

9. visualiser, afficher les scores
    -> page accessible par les users uniquement

10. mentions legales 

11. ESPACE ADMIN (accessible uniquement a l'admin)
    - ajouter, supprimer ou modifier :
      - un theme 
      - un quizz
      - des questions
      - des reponses


## VISUELS :

wireframe.cc

1. Accueil : https://wireframe.cc/DOxlUS
1. Login/inscription : https://wireframe.cc/a1vneH
1. Quizz : https://wireframe.cc/4W6QwQ

**Merci Chloé pour la prise de note**