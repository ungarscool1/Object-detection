# Projet informatique UQAR: Détection d'objets sur une image

## Auteurs
- [Léo Godard](https://github.com/ungarscool1)

## Description

Lors de se projet, nous avons eu pour but de réaliser une application mobile permettant de détecter des objets sur une image à l'aide de tensorflow lite. Nous avons utilisé le modèle ssd_mobilenet pour la détection d'objets.

## Installation

### iOS

Pour installer l'application sur un appareil iOS, il faut d'abord installer [CocoaPods](https://cocoapods.org/). Ensuite, il faut se rendre dans le dossier `ios` et exécuter la commande `pod install`. Ensuite, il faut ouvrir le fichier `Detecteur.xcworkspace` avec Xcode et lancer l'application sur un appareil iOS.

### Android

Pour installer l'application sur un appareil Android, il faut d'abord installer [Android Studio](https://developer.android.com/studio). Ensuite, il faut ouvrir le projet avec Android Studio et lancer l'application sur un appareil Android.

#### Problèmes connus

Expo n'arrive pas à joindre un websocket, il faut donc exécuter la commande `adb reverse tcp:8081 tcp:8081` pour résoudre ce problème.

## Utilisation

Lorsque l'application est lancée, faites une photo d'un objet que vous souhaitez détecter. L'application va alors afficher les objets détectés sur l'image et les désigner à l'aide de multiple rectangle bleu.