document.addEventListener("DOMContentLoaded", () => {

    let mealOptions = JSON.parse(localStorage.getItem("mealOptions"));
    let hiddenItems = JSON.parse(localStorage.getItem("hiddenItems"));

    const icons = document.querySelectorAll(".meal-icon");
    const mealOptionsDiv = document.getElementById("meal-options");
    const mealTitle = document.getElementById("meal-title");
    const optionsList = document.getElementById("options-list");

    icons.forEach(icon => {
        icon.addEventListener("click", () => {
            const meal = icon.alt;

            mealOptionsDiv.style.display = "block";
            mealTitle.textContent = "خيارات " + meal;

            optionsList.innerHTML = "";

            mealOptions[meal].forEach(option => {

                // إخفاء الأصناف المخفية
                if (hiddenItems[meal].includes(option)) return;

                const btn = document.createElement("button");
                btn.textContent = option;
                btn.className = "option-btn";

                btn.onclick = () => {
                    alert("تم اختيار: " + option);

                    let orders = JSON.parse(localStorage.getItem("orders")) || [];
                    orders.push({ meal: meal, option: option });
                    localStorage.setItem("orders", JSON.stringify(orders));
                };

                optionsList.appendChild(btn);
            });
        });
    });

});
