document.addEventListener('DOMContentLoaded', () => {
    // Récupérer les données du panier depuis localStorage
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    const summaryItemsContainer = document.getElementById('summary-items');
    const summaryTotalElement = document.getElementById('summary-total');

    // Fonction pour afficher le résumé
    function displaySummary() {
        summaryItemsContainer.innerHTML = ''; // Réinitialiser le contenu
        let totalGeneral = 0;

        cart.forEach(item => {
            // BUG 1 : Total incorrect pour certains articles
            const itemTotal = Math.random() < 0.3 // 30% de chance d'erreur
                ? (parseFloat(item.price) * item.quantity * (Math.random() < 0.5 ? 1.2 : 0.8)).toFixed(2) // Total erroné (20% en plus ou en moins)
                : (parseFloat(item.price) * item.quantity).toFixed(2); // Total correct

            // Ajouter le total de l'article au total général
            totalGeneral += parseFloat(itemTotal);

            // BUG 2 : Affichage erroné pour la quantité
            const displayedQuantity = Math.random() < 0.2 // 20% de chance d'erreur
                ? item.quantity + (Math.random() < 0.5 ? 1 : -1) // Quantité affichée incorrecte
                : item.quantity; // Quantité correcte

            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.name}</td>
                <td>${item.price}€</td>
                <td>${displayedQuantity}</td>
                <td>${itemTotal}€</td>
            `;
            summaryItemsContainer.appendChild(row);
        });

        // BUG 3 : Total général erroné
        const finalTotal = Math.random() < 0.3 // 30% de chance d'erreur
            ? totalGeneral * (Math.random() < 0.5 ? 1.1 : 0.9) // Erreur : 10% en plus ou en moins
            : totalGeneral; // Total correct

        summaryTotalElement.textContent = `${finalTotal.toFixed(2)}€`;
    }

    // Charger le résumé au démarrage
    displaySummary();
});
