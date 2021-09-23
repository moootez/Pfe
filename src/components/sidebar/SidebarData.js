import React from 'react'

const SidebarData = [
    {
        "id": 7,
        "link": "/dashboard",
        "title": "Tableau de bord",
        "defaultPermission": false,
        "roles": ["ROLE_CLIENT"]
    },
    {
        "id": 1,
        "title": "Actualités",
        "className": "menu",
        "link": "/actualite",
        "defaultPermission": true,
        "roles": ["ROLE_ADMIN", "ROLE_ADV", "ROLE_CLIENT"]
    },
    {
        "id": 2,
        "title": "Gestion des utilisateurs",
        "link": "/user",
        "roles": ["ROLE_ADMIN"],
        "defaultPermission": true
    },
    {
        "id": 3,
        "link": "#?",
        "title": "Commande",
        "defaultPermission": false,
        "roles": ["ROLE_ADV", "ROLE_CLIENT"],
        "subNav": [
            {
                "id": 31,
                "link": "/commande",
                "title": "Mes commandes",
                "defaultPermission": false,
                "roles": ["ROLE_CLIENT"]
            },
            {
                "id": 32,
                "link": "/validation-commande",
                "title": "Commandes à valider",
                "defaultPermission": false,
                "roles": ["ROLE_ADV", "ROLE_CLIENT"]
            },
            {
                "id": 33,
                "link": "/create_commande",
                "title": "Créer une commande",
                "defaultPermission": false,
                "roles": ["ROLE_CLIENT"]
            }
        ]
    },
    {
        "id": 4,
        "link": "#?",
        "title": "Réclamations",
        "defaultPermission": false,
        "roles": ["ROLE_ADV", "ROLE_CLIENT"],
        "subNav": [
            {
                "id": 41,
                "link": "/mes-reclamation",
                "title": "Mes réclamations",
                "defaultPermission": true,
                "roles": ["ROLE_CLIENT"]
            },
            {
                "id": 42,
                "link": "/ajout-reclamation",
                "title": "Ajouter une reclamation",
                "defaultPermission": true,
                "roles": ["ROLE_CLIENT"]
            },
            {
                "id": 43,
                "link": "/liste-reclamation",
                "title": "Liste des réclamations",
                "defaultPermission": false,
                "roles": ["ROLE_ADV"]
            }
        ]
    },
    {
        "id": 5,
        "link": "/livraison",
        "title": "Livraisons",
        "defaultPermission": false,
        "roles": ["ROLE_CLIENT"]
    },
    {
        "id": 6,
        "link": "/facture",
        "title": "Factures",
        "defaultPermission": false,
        "roles": ["ROLE_CLIENT"]
    },
    {
        "id": 7,
        "link": "/reglement",
        "title": "Réglements",
        "defaultPermission": false,
        "roles": ["ROLE_CLIENT"]
    }
]

export default SidebarData
