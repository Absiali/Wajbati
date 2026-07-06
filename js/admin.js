// القائمة الأصلية
let mealOptions = JSON.parse(localStorage.getItem("mealOptions")) || {
    "فطور": ["بيض", "فول", "عصير", "ماء"],
    "غداء": ["دجاج", "أرز", "سلطة"],
    "عشاء": ["ساندويتش", "شوربة", "زبادي"]
};

// قائمة الأصناف المخفية
let hiddenItems = JSON.parse(localStorage.getItem("hiddenItems")) || {
    "فطور": [],
    "غداء": [],
    "عشاء": []
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

        const textSpan = document.createElement("span");
        textSpan.textContent = item;

        // زر تعديل
        const editBtn = document.createElement("button");
        editBtn.innerHTML = "✏️ تعديل";
        editBtn.className = "edit-btn";
        editBtn.onclick = () => {
            const newValue = prompt("اكتب الاسم الجديد:", item);
            if (newValue && newValue.trim() !== "") {
                mealOptions[meal][index] = newValue.trim();
                saveAll();
                renderLists();
            }
        };

        // زر حذف
        const delBtn = document.createElement("button");
        delBtn.innerHTML = "🗑️ حذف";
        delBtn.className = "delete-btn";
        delBtn.onclick = () => {
            mealOptions[meal].splice(index, 1);
            saveAll();
            renderLists();
        };

        // زر إظهار / إخفاء
        const hideBtn = document.createElement("button");

        if (hiddenItems[meal].includes(item)) {
            hideBtn.innerHTML = "👁️ إظهار";
            hideBtn.className = "show-btn";
            hideBtn.onclick = () => {
                hiddenItems[meal] = hiddenItems[meal].filter(i => i !== item);
                saveAll();
                renderLists();
            };
        } else {
            hideBtn.innerHTML = "🚫 إخفاء";
            hideBtn.className = "hide-btn";
            hideBtn.onclick = () => {
                hiddenItems[meal].push(item);
                saveAll();
                renderLists();
            };
        }

        li.appendChild(textSpan);
        li.appendChild(editBtn);
        li.appendChild(delBtn);
        li.appendChild(hideBtn);

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
    saveAll();
    renderLists();
    document.getElementById(inputId).value = "";
}

function saveAll() {
    localStorage.setItem("mealOptions", JSON.stringify(mealOptions));
    localStorage.setItem("hiddenItems", JSON.stringify(hiddenItems));
}

document.addEventListener("DOMContentLoaded", renderLists);
