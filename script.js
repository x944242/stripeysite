

// JavaScript to handle the calculation
document.getElementById('calculate-button').addEventListener('click', function() {
  const jarCount = parseInt(document.getElementById('jar-count').value) || 0; // Get number of jars
  const pricePerJar = 6.50; // Price of one jar
  const totalAmount = jarCount * pricePerJar; // Calculate total price

  const totalAmountElement = document.getElementById('total-amount');
  totalAmountElement.textContent = totalAmount.toFixed(2); // Update display
});






<script>
        // Stripe publishable key (replace with your own)
        const stripe = Stripe("your-publishable-key-here");

        // Price definitions
        const prices = {
            acacia: 10,
            wildflower: 12,
            heather: 15
        };

        // Elements
        const acaciaInput = document.getElementById("acacia");
        const wildflowerInput = document.getElementById("wildflower");
        const heatherInput = document.getElementById("heather");
        const totalElement = document.getElementById("total");
        const checkoutButton = document.getElementById("checkout-button");

        // Function to calculate total
        function calculateTotal() {
            const acaciaQty = parseInt(acaciaInput.value) || 0;
            const wildflowerQty = parseInt(wildflowerInput.value) || 0;
            const heatherQty = parseInt(heatherInput.value) || 0;

            const total = 
                acaciaQty * prices.acacia +
                wildflowerQty * prices.wildflower +
                heatherQty * prices.heather;

            totalElement.textContent = total.toFixed(2);
        }

        // Listen for changes in quantity inputs
        acaciaInput.addEventListener("input", calculateTotal);
        wildflowerInput.addEventListener("input", calculateTotal);
        heatherInput.addEventListener("input", calculateTotal);

        // Handle checkout button click
        checkoutButton.addEventListener("click", async () => {
            const acaciaQty = parseInt(acaciaInput.value) || 0;
            const wildflowerQty = parseInt(wildflowerInput.value) || 0;
            const heatherQty = parseInt(heatherInput.value) || 0;

            const lineItems = [];

            if (acaciaQty > 0) {
                lineItems.push({
                    price: "price_ID_for_acacia", // Replace with your Stripe Price ID for Acacia Honey
                    quantity: acaciaQty
                });
            }

            if (wildflowerQty > 0) {
                lineItems.push({
                    price: "price_ID_for_wildflower", // Replace with your Stripe Price ID for Wildflower Honey
                    quantity: wildflowerQty
                });
            }

            if (heatherQty > 0) {
                lineItems.push({
                    price: "price_ID_for_heather", // Replace with your Stripe Price ID for Heather Honey
                    quantity: heatherQty
                });
            }

            if (lineItems.length === 0) {
                alert("Please select at least one item.");
                return;
            }

            // Send line items to backend (mocked here for frontend-only setup)
            const response = await fetch("/create-checkout-session", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ lineItems })
            });

            const { sessionId } = await response.json();

            // Redirect to Stripe Checkout
            stripe.redirectToCheckout({ sessionId });
        });
    </script>
