document.addEventListener("DOMContentLoaded", () => {

    const container = document.getElementById("orders-container");

    let orders = JSON.parse(localStorage.getItem("orders")) || [];

    if (orders.length === 0) {
        container.innerHTML = `
            <div class="box">
                <h3>لا توجد طلبات حتى الآن</h3>
            </div>
        `;
        return;
    }

    // تجميع الطلبات حسب الغرفة
    let grouped = {};

    orders.forEach(order => {
        if (!grouped[order.room]) {
            grouped[order.room] = [];
        }
        grouped[order.room].push(order);
    });

    // عرض الطلبات حسب الغرفة
    Object.keys(grouped).forEach(room => {

        const roomBox = document.createElement("div");
        roomBox.className = "order-box";

        roomBox.innerHTML = `
            <h3>🛏️ الغرفة رقم: ${room}</h3>
            <p><strong>عدد الطلبات:</strong> ${grouped[room].length}</p>
        `;

        grouped[room].forEach(order => {
            const p = document.createElement("p");
            p.innerHTML = `
                • <strong>${order.patient}</strong> طلب  
                <strong>${order.option}</strong>  
                (${order.meal})
            `;
            roomBox.appendChild(p);
        });

        container.appendChild(roomBox);
    });

});
