document.getElementById('payment-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const cardNumber = document.getElementById('card-number').value;
    const cardExpiry = document.getElementById('card-expiry').value;
    const cardCvc = document.getElementById('card-cvc').value;

    if (cardNumber && cardExpiry && cardCvc) {
        alert('Оплата прошла успешно!');
    } else {
        alert('Пожалуйста, заполните все поля!');
    }
});
