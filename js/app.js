document.addEventListener("DOMContentLoaded", () => {

    // جلب البيانات من صفحة الإدارة
    let mealOptions = JSON.parse(localStorage.getItem("mealOptions"));
    let hiddenItems = JSON.parse(localStorage.getItem("hiddenItems"));

    // عناصر الصفحة
    const icons = document.querySelectorAll(".meal-icon");
    const mealOptionsDiv = document.getElementById("meal-options");
    const mealTitle = document.getElementById("meal-title");
    const optionsList = document.getElementById("options-list");

    // عند الضغط على أيقونة الوجبة
    icons.forEach(icon => {
        icon.addEventListener("click", () => {

            const meal = icon.alt; // فطور – غداء – عشاء

            mealOptionsDiv.style.display = "block";
            mealTitle.textContent = "خيارات " + meal;

            optionsList.innerHTML = "";

            // عرض الأصناف المتاحة فقط (غير المخفية)
            mealOptions[meal].forEach(option => {

                if (hiddenItems[meal].includes(option)) return;

                const btn = document.createElement("button");
                btn.textContent = option;
                btn.className = "option-btn";

                btn.onclick = () => {

                    let patientName = document.getElementById("patient-name").value.trim();
                    let roomNumber = document.getElementById("room-number").value.trim();

                    if (patientName === "" || roomNumber === "") {
                        alert("⚠️ الرجاء إدخال اسم المريض ورقم الغرفة قبل اختيار الوجبة");
                        return;
                    }

                    let orders = JSON.parse(localStorage.getItem("orders")) || [];

                    // حفظ الطلب مع بيانات المريض والغرفة والوقت
                    orders.push({
                        meal: meal,
                        option: option,
                        patient: patientName,
                        room: roomNumber,
                        time: new Date().toLocaleString()
                    });

                    localStorage.setItem("orders", JSON.stringify(orders));

                    alert("✔️ تم تسجيل الطلب بنجاح");
                };

                optionsList.appendChild(btn);
            });
        });
    });

    // زر تعديل بيانات المريض
    const editBtn = document.getElementById("edit-patient-btn");
    if (editBtn) {
        editBtn.onclick = () => {

            let currentName = document.getElementById("patient-name").value.trim();
            let currentRoom = document.getElementById("room-number").value.trim();

            let newName = prompt("اكتب الاسم الجديد:", currentName);
            let newRoom = prompt("اكتب رقم الغرفة الجديد:", currentRoom);

            if (!newName || !newRoom) {
                alert("⚠️ يجب إدخال اسم ورقم غرفة صحيحين");
                return;
            }

            document.getElementById("patient-name").value = newName;
            document.getElementById("room-number").value = newRoom;

            alert("✔️ تم تحديث بيانات المريض بنجاح");
        };
    }

});
