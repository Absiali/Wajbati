let mealOptions = JSON.parse(localStorage.getItem("mealOptions")) || {
    "فطور": ["بيض", "فول", "مشروب", "ماء", "تفاحة", "برتقالة"],
    "غداء": ["دجاج مشوي", "أرز", "سلطة", "ماء", "عصير"],
    "عشاء": ["ساندويتش", "شوربة", "زبادي", "ماء", "فواكه"]
};

function renderLists() {
    renderList("فطور", "breakfast-list");
    renderList("غداء", "lunch-list");
    renderList("عشاء", "dinner-list");
}

function renderList(meal, elementId) {
    const ul = document.getElementById(elementId);
    ul.innerHTML = "";

    mealOptions[meal].forEach((item, index) => {
        const li = document.createElement("li");
        li.textContent = item;

        const delBtn = document.createElement("button");
        delBtn.textContent = "حذف";
        delBtn.onclick = () => {
            mealOptions[meal].splice(index, 1);
            saveOptions();
            renderLists();
        };

        li.appendChild(delBtn);
        ul.appendChild(li);
    });
}

function addOption(meal) {
    const inputId = meal === "فطور" ? "breakfast-input" :
                    meal === "غداء" ? "lunch-input" :
                    "dinner-input";

    const value = document.getElementById(inputId).value.trim();
    if (value === "") return;

    mealOptions[meal].push(value);
    saveOptions();
    renderLists();
    document.getElementById(inputId).value = "";
}

function saveOptions() {
    localStorage.setItem("mealOptions", JSON.stringify(mealOptions));
}

document.addEventListener("DOMContentLoaded", renderLists);
