document.addEventListener("DOMContentLoaded", () => {

    let mealOptions = JSON.parse(localStorage.getItem("mealOptions")) || {
    "فطور": ["بيض", "فول", "مشروب", "ماء", "تفاحة", "برتقالة"],
    "غداء": ["دجاج مشوي", "أرز", "سلطة", "ماء", "عصير"],
    "عشاء": ["ساندويتش", "شوربة", "زبادي", "ماء", "فواكه"]
};

    const icons = document.querySelectorAll(".meal-icon");
    const mealOptionsDiv = document.getElementById("meal-options");
    const mealTitle = document.getElementById("meal-title");
    const optionsList = document.getElementById("options-list");

    icons.forEach(icon => {
        icon.addEventListener("click", () => {
            const meal = icon.alt; // فطور - غداء - عشاء

            // إظهار القسم
            mealOptionsDiv.style.display = "block";

            // تغيير العنوان
            mealTitle.textContent = "خيارات " + meal;

            // تعبئة الخيارات
            optionsList.innerHTML = "";
            mealOptions[meal].forEach(option => {
                const btn = document.createElement("button");
                btn.textContent = option;
                btn.className = "option-btn";

                btn.onclick = () => {
                    alert("تم اختيار: " + option);
                    // حفظ الطلب في قائمة الطلبات
let orders = JSON.parse(localStorage.getItem("orders")) || [];
orders.push({ meal: meal, option: option });
localStorage.setItem("orders", JSON.stringify(orders));

                };

                optionsList.appendChild(btn);
            });
        });
    });

});
