document.addEventListener('DOMContentLoaded', () => {
    // Récupérer le panier existant dans localStorage ou initialiser un tableau vide
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Sélection de toutes les cartes d'articles
    const articleCards = document.querySelectorAll('.article-card');

    // Ajout d'un écouteur d'événements à chaque carte
    articleCards.forEach(card => {
        card.addEventListener('click', (event) => {
            // Empêche l'ajout si l'utilisateur clique sur le champ de quantité
            if (event.target.tagName.toLowerCase() === 'input') return;

            // Récupération des données de l'article
            const productId = card.getAttribute('data-id');
            const productName = card.querySelector('h2').textContent;
            const productPrice = card.querySelector('.price').textContent;
            const quantityInput = card.querySelector('.quantity');
            let quantity = parseInt(quantityInput.value, 10);

            // Vérifie que la quantité est valide
            if (isNaN(quantity) || quantity <= 0) {
                alert('Veuillez saisir une quantité valide.');
                return;
            }

            // BUG 1 : Quantité incorrecte ajoutée aléatoirement
            const randomAdjustment = Math.random() < 0.5 ? -1 : 1;
            quantity += randomAdjustment; // Ajoute ou retire 1 article
            if (quantity <= 0) quantity = 1; // Empêche des quantités négatives

            // BUG 2 : Blocage ou suppression d'un article au-delà d'un seuil
            if (quantity > 3 && Math.random() < 0.3) { // 30% de chance de bug
                alert(`Impossible d'ajouter ${productName} au panier.`);
                const itemIndex = cart.findIndex(item => item.id === productId);
                if (itemIndex !== -1) {
                    cart.splice(itemIndex, 1); // Supprime l'article
                    alert(`${productName} a été supprimé du panier.`);
                }
                localStorage.setItem('cart', JSON.stringify(cart));
                return;
            }

            // Vérifie si l'article est déjà dans le panier
            const existingItem = cart.find(item => item.id === productId);
            if (existingItem) {
                existingItem.quantity += quantity; // Ajoute la quantité
            } else {
                cart.push({
                    id: productId,
                    name: productName,
                    price: parseFloat(productPrice),
                    quantity: quantity
                });
            }

            // Sauvegarde le panier dans localStorage
            localStorage.setItem('cart', JSON.stringify(cart));

            // Affichage d'une alerte et réinitialisation de la quantité
            alert(`${quantity} x ${productName} ajouté(s) au panier !`);
            quantityInput.value = 1;

            // Affiche le contenu du panier dans la console (pour le développement)
            console.log(cart);
        });
    });
});
