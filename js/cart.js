document.addEventListener('DOMContentLoaded', () => {
    // Simulation d'un panier
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');
    const checkoutButton = document.getElementById('checkout-btn'); // Bouton "Passer au paiement"

    // Fonction pour afficher le panier
    function displayCart() {
        cartItemsContainer.innerHTML = ''; // Réinitialiser le contenu
        let totalGeneral = 0;

        cart.forEach((item, index) => {
            const itemTotal = (parseFloat(item.price) * item.quantity).toFixed(2);
            totalGeneral += parseFloat(itemTotal);

            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.name}</td>
                <td>${item.price}€</td>
                <td>
                    <input type="number" class="cart-quantity" data-index="${index}" value="${item.quantity}" min="1">
                </td>
                <td>${itemTotal}€</td>
                <td>
                    <button class="remove-item" data-index="${index}">Supprimer</button>
                </td>
            `;
            cartItemsContainer.appendChild(row);
        });

        cartTotalElement.textContent = `${totalGeneral.toFixed(2)}€`;
    }

    // Mise à jour de la quantité
    cartItemsContainer.addEventListener('input', (event) => {
        if (event.target.classList.contains('cart-quantity')) {
            const index = event.target.dataset.index;
            const newQuantity = parseInt(event.target.value, 10);

            if (newQuantity > 0) {
                cart[index].quantity = newQuantity;
                localStorage.setItem('cart', JSON.stringify(cart));
                displayCart();
            }
        }
    });

    // Suppression d'un article
    cartItemsContainer.addEventListener('click', (event) => {
        if (event.target.classList.contains('remove-item')) {
            const index = event.target.dataset.index;
            cart.splice(index, 1);
            localStorage.setItem('cart', JSON.stringify(cart));
            displayCart();
        }
    });

    // Redirection vers la page "Résumé"
    checkoutButton.addEventListener('click', () => {
        if (cart.length === 0) {
            alert('Votre panier est vide. Veuillez ajouter des articles avant de continuer.');
            return;
        }
        window.location.href = 'resumer.html'; // Redirige vers la page de résumé
    });

    // Charger le panier au démarrage
    displayCart();
});
