## Installation du projet

Procedure d'intallation pour ce projet

## Setup & Use

### Initialisation du projet

- Dans VSCode, installer les plugins **Prettier - Code formatter** et **ESLint** et les configurer
- Cloner ce repo
- Run command `npm install`
- Pour installer le server backend, créer un fichier .env avec les informations de la base de données. Un template existe (.env.sample)

### Initialisation de la base de données

- Sur le terminal dans le dossier backend du projet :
```` bash
npx prisma migrate dev --name init
````

### Commandes disponibles

- `migrate` : Démarre le script de migration de la base de données
- `dev` : Démarre les servers frontend et backend
- `dev-front` : Démarre le serveur frontend
- `dev-back` : Démarre le serveur backend
- `lint` : Démarre le script de validation eslint. Il sera démarré à chaque commits automatiquement
- `fix` : Fix les erreurs de lint

### Outils utilisés pour ce projet

- _Concurrently_ : Permet à certaines commandes de s'éxécuter de manière concurrentes avec le même CLI
- _Husky_ : Permet d'éxécuter des commandes à chaque évènement Git
- _Vite_ : Module bundler qui remplace CRA
- _ESLint_ : Outil pour la qualité du code
- _Prettier_ : Outil pour la qualité du code
- _ Airbnb Standard_ : Permet d'avoir un standard pour la qualité du code
- _Nodemon_ : Permet le rafraichissement du code Js sans avoir à redémarrer le serveur à chaque modification
- _prima_: Outil de création de base de données 

### Deployment

Pour le déploiement. Il fait aller sur "secrets" => app "actions" sur le repo github "New repository secret"

- CAPROVER_BACK_APPNAME : name app on caprover
- CAPROVER_FRONT_APPNAME : name app on caprover
- CAPROVER_PASSWORD : password caprover
- CAPROVER_SERVER : link of domain
