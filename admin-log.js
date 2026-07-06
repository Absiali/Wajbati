document.addEventListener("DOMContentLoaded", () => {

    const container = document.getElementById("log-container");

    let orders = JSON.parse(localStorage.getItem("orders")) || [];

    if (orders.length === 0) {
        container.innerHTML = `
            <div class="box">
                <h3>لا توجد طلبات حتى الآن</h3>
            </div>
        `;
        return;
    }

    orders.forEach(order => {

        const box = document.createElement("div");
        box.className = "order-box";

        box.innerHTML = `
            <h3>🧑‍⚕️ المريض: ${order.patient}</h3>
            <p><strong>الغرفة:</strong> ${order.room}</p>
            <p><strong>الوجبة:</strong> ${order.meal}</p>
            <p><strong>الصنف:</strong> ${order.option}</p>
            <p><strong>وقت الطلب:</strong> ${order.time}</p>
        `;

        container.appendChild(box);
    });

});
