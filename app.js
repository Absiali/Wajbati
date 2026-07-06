// تطبيق وجبتي

class WajbatiApp {
    constructor() {
        this.meals = [];
        this.drinks = [];
        this.fruits = [];
        this.orders = [];
        this.initializeData();
        this.setupEventListeners();
        this.renderAll();
    }

    // تهيئة البيانات الأولية
    initializeData() {
        // التحقق من وجود بيانات محفوظة
        const savedMeals = localStorage.getItem('wajbati_meals');
        const savedDrinks = localStorage.getItem('wajbati_drinks');
        const savedFruits = localStorage.getItem('wajbati_fruits');
        const savedOrders = localStorage.getItem('wajbati_orders');

        if (savedMeals) {
            this.meals = JSON.parse(savedMeals);
        } else {
            // بيانات افتراضية
            this.meals = [
                { id: 1, name: 'أرز بالدجاج', enabled: true },
                { id: 2, name: 'سمك مشوي', enabled: true },
                { id: 3, name: 'كبسة', enabled: true },
                { id: 4, name: 'شاورما', enabled: true },
                { id: 5, name: 'فريكة', enabled: false },
                { id: 6, name: 'خضار مشكلة', enabled: true }
            ];
        }

        if (savedDrinks) {
            this.drinks = JSON.parse(savedDrinks);
        } else {
            this.drinks = [
                { id: 1, name: 'عصير برتقال', enabled: true },
                { id: 2, name: 'عصير تمر', enabled: true },
                { id: 3, name: 'حليب', enabled: true },
                { id: 4, name: 'عصير ليمون', enabled: true },
                { id: 5, name: 'شاي', enabled: true },
                { id: 6, name: 'قهوة', enabled: false }
            ];
        }

        if (savedFruits) {
            this.fruits = JSON.parse(savedFruits);
        } else {
            this.fruits = [
                { id: 1, name: 'تمر', enabled: true },
                { id: 2, name: 'موز', enabled: true },
                { id: 3, name: 'تفاح', enabled: true },
                { id: 4, name: 'برتقال', enabled: true },
                { id: 5, name: 'شمام', enabled: false },
                { id: 6, name: 'عنب', enabled: true }
            ];
        }

        if (savedOrders) {
            this.orders = JSON.parse(savedOrders);
        }
    }

    // حفظ البيانات
    saveData() {
        localStorage.setItem('wajbati_meals', JSON.stringify(this.meals));
        localStorage.setItem('wajbati_drinks', JSON.stringify(this.drinks));
        localStorage.setItem('wajbati_fruits', JSON.stringify(this.fruits));
        localStorage.setItem('wajbati_orders', JSON.stringify(this.orders));
    }

    // إعداد مستمعي الأحداث
    setupEventListeners() {
        // أزرار التبديل بين الواجهات
        document.getElementById('adminToggle').addEventListener('click', () => this.showAdminInterface());
        document.getElementById('userToggle').addEventListener('click', () => this.showUserInterface());

        // أزرار الإضافة
        document.getElementById('addMealBtn').addEventListener('click', () => this.addMeal());
        document.getElementById('addDrinkBtn').addEventListener('click', () => this.addDrink());
        document.getElementById('addFruitBtn').addEventListener('click', () => this.addFruit());

        // زر تأكيد الطلب
        document.getElementById('submitOrder').addEventListener('click', () => this.submitOrder());

        // تعيين التاريخ الحالي + يوم
        this.setDefaultDate();
    }

    // تبديل الواجهات
    showAdminInterface() {
        document.getElementById('userInterface').style.display = 'none';
        document.getElementById('adminInterface').style.display = 'block';
        document.getElementById('adminToggle').style.display = 'none';
        document.getElementById('userToggle').style.display = 'block';
        this.renderAllAdmin();
    }

    showUserInterface() {
        document.getElementById('adminInterface').style.display = 'none';
        document.getElementById('userInterface').style.display = 'block';
        document.getElementById('userToggle').style.display = 'none';
        document.getElementById('adminToggle').style.display = 'block';
        this.renderAllUser();
    }

    // تعيين التاريخ الافتراضي (غد)
    setDefaultDate() {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        const dateString = tomorrow.toISOString().split('T')[0];
        document.getElementById('mealDate').value = dateString;
    }

    // ======================== العمليات على الوجبات ========================
    addMeal() {
        const name = document.getElementById('newMealName').value.trim();
        if (!name) {
            alert('الرجاء إدخال اسم الوجبة');
            return;
        }

        const newMeal = {
            id: Math.max(...this.meals.map(m => m.id), 0) + 1,
            name: name,
            enabled: true
        };

        this.meals.push(newMeal);
        this.saveData();
        document.getElementById('newMealName').value = '';
        this.renderMealsList();
        this.renderUserInterface();
    }

    toggleMeal(id) {
        const meal = this.meals.find(m => m.id === id);
        if (meal) {
            meal.enabled = !meal.enabled;
            this.saveData();
            this.renderMealsList();
            this.renderUserInterface();
        }
    }

    deleteMeal(id) {
        this.meals = this.meals.filter(m => m.id !== id);
        this.saveData();
        this.renderMealsList();
        this.renderUserInterface();
    }

    // ======================== العمليات على المشروبات ========================
    addDrink() {
        const name = document.getElementById('newDrinkName').value.trim();
        if (!name) {
            alert('الرجاء إدخال اسم المشروب');
            return;
        }

        const newDrink = {
            id: Math.max(...this.drinks.map(d => d.id), 0) + 1,
            name: name,
            enabled: true
        };

        this.drinks.push(newDrink);
        this.saveData();
        document.getElementById('newDrinkName').value = '';
        this.renderDrinksList();
        this.renderUserInterface();
    }

    toggleDrink(id) {
        const drink = this.drinks.find(d => d.id === id);
        if (drink) {
            drink.enabled = !drink.enabled;
            this.saveData();
            this.renderDrinksList();
            this.renderUserInterface();
        }
    }

    deleteDrink(id) {
        this.drinks = this.drinks.filter(d => d.id !== id);
        this.saveData();
        this.renderDrinksList();
        this.renderUserInterface();
    }

    // ======================== العمليات على الفواكه ========================
    addFruit() {
        const name = document.getElementById('newFruitName').value.trim();
        if (!name) {
            alert('الرجاء إدخال اسم الفاكهة');
            return;
        }

        const newFruit = {
            id: Math.max(...this.fruits.map(f => f.id), 0) + 1,
            name: name,
            enabled: true
        };

        this.fruits.push(newFruit);
        this.saveData();
        document.getElementById('newFruitName').value = '';
        this.renderFruitsList();
        this.renderUserInterface();
    }

    toggleFruit(id) {
        const fruit = this.fruits.find(f => f.id === id);
        if (fruit) {
            fruit.enabled = !fruit.enabled;
            this.saveData();
            this.renderFruitsList();
            this.renderUserInterface();
        }
    }

    deleteFruit(id) {
        this.fruits = this.fruits.filter(f => f.id !== id);
        this.saveData();
        this.renderFruitsList();
        this.renderUserInterface();
    }

    // ======================== الطلبات ========================
    submitOrder() {
        const date = document.getElementById('mealDate').value;
        if (!date) {
            alert('الرجاء اختيار التاريخ');
            return;
        }

        const order = {
            id: Date.now(),
            date: date,
            breakfast: {
                meal: document.getElementById('breakfastMeal').value,
                drink: document.getElementById('breakfastDrink').value,
                fruit: document.getElementById('breakfastFruit').value
            },
            lunch: {
                meal: document.getElementById('lunchMeal').value,
                drink: document.getElementById('lunchDrink').value,
                fruit: document.getElementById('lunchFruit').value
            },
            dinner: {
                meal: document.getElementById('dinnerMeal').value,
                drink: document.getElementById('dinnerDrink').value,
                fruit: document.getElementById('dinnerFruit').value
            },
            submittedAt: new Date().toLocaleString('ar-SA')
        };

        this.orders.push(order);
        this.saveData();
        alert('تم تأكيد طلبك بنجاح! شكراً لك');
        this.clearOrderForm();
    }

    clearOrderForm() {
        document.getElementById('breakfastMeal').value = '';
        document.getElementById('breakfastDrink').value = '';
        document.getElementById('breakfastFruit').value = '';
        document.getElementById('lunchMeal').value = '';
        document.getElementById('lunchDrink').value = '';
        document.getElementById('lunchFruit').value = '';
        document.getElementById('dinnerMeal').value = '';
        document.getElementById('dinnerDrink').value = '';
        document.getElementById('dinnerFruit').value = '';
    }

    // ======================== العرض والتصيير ========================
    renderAll() {
        this.renderAllUser();
        this.renderAllAdmin();
    }

    renderAllUser() {
        this.renderUserInterface();
    }

    renderAllAdmin() {
        this.renderMealsList();
        this.renderDrinksList();
        this.renderFruitsList();
        this.renderOrdersList();
    }

    renderUserInterface() {
        // تحديث القوائم المنسدلة
        this.updateSelectOptions('breakfastMeal', this.meals);
        this.updateSelectOptions('lunchMeal', this.meals);
        this.updateSelectOptions('dinnerMeal', this.meals);
        
        this.updateSelectOptions('breakfastDrink', this.drinks);
        this.updateSelectOptions('lunchDrink', this.drinks);
        this.updateSelectOptions('dinnerDrink', this.drinks);
        
        this.updateSelectOptions('breakfastFruit', this.fruits);
        this.updateSelectOptions('lunchFruit', this.fruits);
        this.updateSelectOptions('dinnerFruit', this.fruits);
    }

    updateSelectOptions(selectId, items) {
        const select = document.getElementById(selectId);
        const currentValue = select.value;
        
        // حفظ الخيارات الأولى (فارغة)
        const firstOption = select.querySelector('option[value=""]');
        
        // حذف جميع الخيارات الأخرى
        while (select.options.length > 1) {
            select.remove(1);
        }
        
        // إضافة العناصر المفعلة فقط
        items.filter(item => item.enabled).forEach(item => {
            const option = document.createElement('option');
            option.value = item.name;
            option.textContent = item.name;
            select.appendChild(option);
        });
        
        // استرجاع القيمة السابقة إن أمكن
        if (currentValue && [...select.options].some(o => o.value === currentValue)) {
            select.value = currentValue;
        }
    }

    renderMealsList() {
        const container = document.getElementById('mealsList');
        container.innerHTML = '';
        
        this.meals.forEach(meal => {
            const html = this.createItemHTML(meal, 'meal');
            container.innerHTML += html;
        });

        // إضافة مستمعي الأحداث
        this.meals.forEach(meal => {
            document.getElementById(`toggle-meal-${meal.id}`).addEventListener('click', 
                () => this.toggleMeal(meal.id));
            document.getElementById(`delete-meal-${meal.id}`).addEventListener('click', 
                () => this.deleteMeal(meal.id));
        });
    }

    renderDrinksList() {
        const container = document.getElementById('drinksList');
        container.innerHTML = '';
        
        this.drinks.forEach(drink => {
            const html = this.createItemHTML(drink, 'drink');
            container.innerHTML += html;
        });

        // إضافة مستمعي الأحداث
        this.drinks.forEach(drink => {
            document.getElementById(`toggle-drink-${drink.id}`).addEventListener('click', 
                () => this.toggleDrink(drink.id));
            document.getElementById(`delete-drink-${drink.id}`).addEventListener('click', 
                () => this.deleteDrink(drink.id));
        });
    }

    renderFruitsList() {
        const container = document.getElementById('fruitsList');
        container.innerHTML = '';
        
        this.fruits.forEach(fruit => {
            const html = this.createItemHTML(fruit, 'fruit');
            container.innerHTML += html;
        });

        // إضافة مستمعي الأحداث
        this.fruits.forEach(fruit => {
            document.getElementById(`toggle-fruit-${fruit.id}`).addEventListener('click', 
                () => this.toggleFruit(fruit.id));
            document.getElementById(`delete-fruit-${fruit.id}`).addEventListener('click', 
                () => this.deleteFruit(fruit.id));
        });
    }

    createItemHTML(item, type) {
        const status = item.enabled ? 'enabled' : 'disabled';
        const statusText = item.enabled ? '✅ متاح' : '❌ غير متاح';
        const toggleText = item.enabled ? 'إخفاء' : 'إظهار';
        
        return `
            <div class="item-badge ${status}">
                <div>
                    <strong>${item.name}</strong>
                    <span class="badge bg-secondary ms-2">${statusText}</span>
                </div>
                <div>
                    <button class="btn btn-sm btn-warning ms-2" id="toggle-${type}-${item.id}">${toggleText}</button>
                    <button class="btn btn-sm btn-danger" id="delete-${type}-${item.id}">🗑️ حذف</button>
                </div>
            </div>
        `;
    }

    renderOrdersList() {
        const container = document.getElementById('ordersList');
        
        if (this.orders.length === 0) {
            container.innerHTML = '<p class="text-muted text-center">لا توجد طلبات حتى الآن</p>';
            return;
        }

        container.innerHTML = '';
        
        // ترتيب الطلبات من الأحدث للأقدم
        const sortedOrders = [...this.orders].reverse();
        
        sortedOrders.forEach(order => {
            const dateObj = new Date(order.date);
            const dateStr = dateObj.toLocaleDateString('ar-SA', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
            });

            const html = `
                <div class="order-card">
                    <div class="order-date">📅 ${dateStr}</div>
                    <div class="row">
                        <div class="col-md-4">
                            <div class="meal-section">
                                <h6>🌅 الفطور</h6>
                                <p><strong>الصنف:</strong> ${order.breakfast.meal || '-'}</p>
                                <p><strong>المشروب:</strong> ${order.breakfast.drink || '-'}</p>
                                <p><strong>الفاكهة:</strong> ${order.breakfast.fruit || '-'}</p>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="meal-section">
                                <h6>☀️ الغداء</h6>
                                <p><strong>الصنف:</strong> ${order.lunch.meal || '-'}</p>
                                <p><strong>المشروب:</strong> ${order.lunch.drink || '-'}</p>
                                <p><strong>الفاكهة:</strong> ${order.lunch.fruit || '-'}</p>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="meal-section">
                                <h6>🌙 العشاء</h6>
                                <p><strong>الصنف:</strong> ${order.dinner.meal || '-'}</p>
                                <p><strong>المشروب:</strong> ${order.dinner.drink || '-'}</p>
                                <p><strong>الفاكهة:</strong> ${order.dinner.fruit || '-'}</p>
                            </div>
                        </div>
                    </div>
                    <div class="text-muted small mt-2">تم الطلب: ${order.submittedAt}</div>
                </div>
            `;
            
            container.innerHTML += html;
        });
    }
}

// تهيئة التطبيق عند تحميل الصفحة
window.addEventListener('DOMContentLoaded', () => {
    new WajbatiApp();
});