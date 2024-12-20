const form = document.getElementById('add-expense-form');
const expensesList = document.getElementById('expenses');
const totalExpenses = document.getElementById('total-expenses');
const expenseChart = document.getElementById('expenseChart');
const themeToggle = document.getElementById('theme-toggle');

let expenses = [];
let chartInstance = null;

// Handle Form Submission
form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('expense-name').value;
    const category = document.getElementById('expense-category').value;
    const amount = parseFloat(document.getElementById('expense-amount').value);
    const currency = document.getElementById('currency').value;
    const date = document.getElementById('expense-date').value;

    if (name && category && amount && currency && date) {
        const expense = { name, category, amount, currency, date };
        expenses.push(expense);
        updateExpenseList();
        updateTotalExpenses();
        updateChart();
        form.reset();
    }
});

// Update Expense List
function updateExpenseList() {
    expensesList.innerHTML = '';
    expenses.forEach((expense, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            ${expense.name} - ${expense.currency} ${expense.amount} - ${expense.category} - ${expense.date}
            <button onclick="deleteExpense(${index})">Delete</button>
        `;
        expensesList.appendChild(li);
    });
}

// Update Total Expenses
function updateTotalExpenses() {
    const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    totalExpenses.textContent = `${expenses[0]?.currency || '₹'} ${total}`;
}

// Delete Expense
function deleteExpense(index) {
    expenses.splice(index, 1);
    updateExpenseList();
    updateTotalExpenses();
    updateChart();
}

// Update Chart
function updateChart() {
    const categories = ['Food', 'Rent', 'Transport', 'Entertainment', 'Other'];
    const categoryData = categories.map(
        (category) => expenses.filter((e) => e.category === category).reduce((sum, e) => sum + e.amount, 0)
    );

    if (chartInstance) chartInstance.destroy();

    chartInstance = new Chart(expenseChart, {
        type: 'doughnut',
        data: {
            labels: categories,
            datasets: [
                {
                    data: categoryData,
                    backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
                },
            ],
        },
    });
}

// Theme Toggle
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    themeToggle.textContent = document.body.classList.contains('dark-mode')
        ? 'Switch to Light Mode'
        : 'Switch to Dark Mode';
});
