# Installation

Pour mettre en place les documents du simulateur il suffit simplement de télécharger les fichiers du dépôt github et de les laisser dans la même disposition où ils sont déjà.

# Lancement

Pour lancer ce travail il existe le fichier index.html, toutefois simplement ouvrir ce document ne fonctionne pas. En effet comme les fichiers sont sur la mémoire de l'ordinateur et non pas sur un serveur, le navigateur ne permet pas à index.html d'accéder aux fichiers externes. Afin de palier à ce problème, il faut utiliser Visual Studio Code, le programme possède une extension appelée live server qui permet de reproduire le comportement d'un serveur. Il suffit donc d'installer cette extension et de lancer index.html avec (clique droit depuis Visual Studio Code puis "lancer avec live server"). Une simulation de démonstration se lance alors, il est possible  alors d'expérimenter en modifiant le document "map.json", "main.js" ou via la console du navigateur.
```{admonition} Avertissement
---
class: warning
---
Pour l'instant la vitesse des moteurs n'est pas encore ajuster, une valeure supérieure et il n'est généralement pas nécéssaire d'introduire une valeure excédant 5.  
De plus, pour des raisons pratique il est actuellement possible de déplacer le premier robot de la liste à l'aide de la souris, cela ne sera bien évidemment plus le cas dans la version finale du travail
```
