# QRCode - BackOffice

BackOffice VueJS

Avant de tester :
- npm install

puis pour lancer :
- npm run serve -- --port 3000 (mettez un autre port que le 8080 car il est pas dispo)

BackOffice récupère les infos du back en java, il faut donc lancer le back pour récuperer les infos du back

Il faudra très certainement créer le role ADMIN et créer un admin afin de le faire fonctionner (vu qu'il y a la protection)
Pour les test, le mieux c'est de juste mettre le token de connexion en dur 

Sous swagger pour créer un role puis un admin :

Role-Entity -> Post -> Try it out et mettre dans le body :
{
  "id": 0,
  "name": "ROLE_ADMIN"
}

Puis execute

Pour créer un admin :

auth-controller -> signup et mettre :
{
  "email": "admin@admin.fr",
  "password": "adminpwd",
  "role": [
    "admin"
  ],
  "username": "admin"
}

Puis maintenant tester avec auth-controller -> signin avec l'username et le password

Dans le code VueJS il y a une variable "AuthStr" qui correspond au token qu'on doit envoyé à chaque requête afin d'être bien identifié (protection)

Ce token on peut le récupérer dans la console sur le site vuejs, on peut ainsi le coller en dur dans le programme pour éviter de se reconnecter à chaque fois (remplacer la valeur de AuthStr dans vueOffice et vueAddPromo)
