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

    // تجميع الطلبات حسب الوجبة
    let grouped = {
        "فطور": [],
        "غداء": [],
        "عشاء": []
    };

    orders.forEach(order => {
        grouped[order.meal].push(order.option);
    });

    // عرض الطلبات
    Object.keys(grouped).forEach(meal => {

        const mealBox = document.createElement("div");
        mealBox.className = "order-box";

        mealBox.innerHTML = `
            <h3>🍽️ ${meal}</h3>
            <p><strong>عدد الطلبات:</strong> ${grouped[meal].length}</p>
        `;

        // عرض الأصناف المطلوبة
        grouped[meal].forEach(item => {
            const p = document.createElement("p");
            p.textContent = "• " + item;
            mealBox.appendChild(p);
        });

        container.appendChild(mealBox);
    });

});
// مراقبة الطلبات الجديدة
let lastCount = 0;

setInterval(() => {
    let orders = JSON.parse(localStorage.getItem("orders")) || [];

    if (orders.length > lastCount) {
        alert("🔔 تنبيه: وصل طلب جديد للمطبخ!");
    }

    lastCount = orders.length;
}, 1000);
