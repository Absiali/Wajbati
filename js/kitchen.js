function loadOrders() {
    const container = document.getElementById("orders-container");

    const orders = JSON.parse(localStorage.getItem("orders")) || [];

    if (orders.length === 0) {
        container.innerHTML = "<p>لا توجد طلبات حتى الآن.</p>";
        return;
    }

    container.innerHTML = "";

    orders.forEach((order, index) => {
        const div = document.createElement("div");
        div.className = "order-box";

        div.innerHTML = `
            <h3>طلب رقم ${index + 1}</h3>
            <p><strong>الوجبة:</strong> ${order.meal}</p>
            <p><strong>الخيار:</strong> ${order.option}</p>
        `;

        container.appendChild(div);
    });
}

document.addEventListener("DOMContentLoaded", loadOrders);
