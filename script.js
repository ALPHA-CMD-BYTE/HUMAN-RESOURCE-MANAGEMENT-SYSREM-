// ============ DATA STORAGE ============
let employees = [
    { id: 'EMP001', firstName: 'Mohamed', lastName: 'Conteh', email: 'mohamed.c@company.com', phone: '555-0101', department: 'HR', position: 'HR Manager', salary: 85000, status: 'Active' },
    { id: 'EMP002', firstName: 'Dennis', lastName: 'Johnson', email: 'dennis.j@company.com', phone: '555-0102', department: 'IT', position: 'Senior Developer', salary: 95000, status: 'Active' },
    { id: 'EMP003', firstName: 'Emmanuel', lastName: 'Bangura', email: 'emmanuel.b@company.com', phone: '555-0103', department: 'Finance', position: 'Accountant', salary: 75000, status: 'Active' },
    { id: 'EMP004', firstName: 'John', lastName: 'Conteh', email: 'john.c@company.com', phone: '555-0104', department: 'IT', position: 'Junior Developer', salary: 65000, status: 'Active' },
    { id: 'EMP005', firstName: 'Bashiru', lastName: 'Conteh', email: 'bashiru.c@company.com', phone: '555-0105', department: 'Operations', position: 'Operations Manager', salary: 78000, status: 'Active' },
    { id: 'EMP006', firstName: 'Ibrahim', lastName: 'Sillah', email: 'ibrahim.s@company.com', phone: '555-0106', department: 'Sales', position: 'Sales Executive', salary: 70000, status: 'On Leave' },
    { id: 'EMP007', firstName: 'Khadija', lastName: 'Kamara', email: 'khadija.k@company.com', phone: '555-0107', department: 'HR', position: 'Recruiter', salary: 62000, status: 'Active' },
    { id: 'EMP008', firstName: 'Salamatu', lastName: 'Bangura', email: 'salamatu.b@company.com', phone: '555-0108', department: 'Finance', position:'Finance Manager ', salary : 88_222, status : "Active" },
];

let leaveRequests = [
    { id: 1, employee: 'Mohamed Conteh', type: 'Vacation', startDate: '2024-02-10', endDate: '2024-02-15', reason: 'Personal vacation', status: 'Approved', days: 5 },
    { id: 2, employee: 'Dennis Johnson', type: 'Sick Leave', startDate: '2024-02-20', endDate: '2024-02-20', reason: 'Medical appointment', status: 'Pending', days: 1 },
    { id: 3, employee: 'Emmanuel Bangura', type: 'Casual Leave', startDate: '2024-03-01', endDate: '2024-03-02', reason: 'Family event', status: 'Pending', days: 2 },
    { id: 4, employee: 'John Conteh', type: 'Vacation', startDate: '2024-03-15', endDate: '2024-03-22', reason: 'Honeymoon trip', status: 'Approved', days: 7 },
];

let attendanceRecords = [
    { employee: 'Mohamed Conteh', date: '2024-02-23', clockIn: '09:00', clockOut: '17:30', hours: 8.5, status: 'Present' },
    { employee: 'Dennis Johnson', date: '2024-02-23', clockIn: '08:45', clockOut: '17:15', hours: 8.5, status: 'Present' },
    { employee: 'Emmanuel Bangura', date: '2024-02-23', clockIn: '09:15', clockOut: '17:45', hours: 8.5, status: 'Present' },
    { employee: 'John Conteh', date: '2024-02-23', clockIn: '10:00', clockOut: '18:00', hours: 8, status: 'Late' },
    { employee: 'Bashiru Conteh', date: '2024-02-23', clockIn: '09:00', clockOut: '17:30', hours: 8.5, status: 'Present' },
    { employee: 'Ibrahim Sillah', date: '2024-02-23', clockIn: 'N/A', clockOut: 'N/A', hours: 0, status: 'Absent' },
];

let clockInData = {
    clockInTime: null,
    clockOutTime: null,
};

// ============ INITIALIZATION ============
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    populateEmployeesTable();
    populateAttendanceTable();
    populateLeaveRequests();
    populatePayrollTable();
    populateDepartmentStats();
    initializeClockIn();
    initializeCharts();
    attachEventListeners();
    updateCurrentTime();
    setInterval(updateCurrentTime, 1000);
});

// ============ NAVIGATION ============
function initializeNavigation() {
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const sectionId = this.getAttribute('data-section');
            showSection(sectionId);
        });
    });
}

function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });

    // Remove active class from all nav items
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });

    // Show selected section
    document.getElementById(sectionId).classList.add('active');

    // Add active class to clicked nav item
    document.querySelector(`[data-section="${sectionId}"]`).classList.add('active');

    // Update header title
    const titles = {
        dashboard: 'Dashboard Overview',
        employees: 'Employee Records',
        attendance: 'Attendance & Time Tracking',
        leave: 'Leave Management',
        payroll: 'Payroll Management',
        analytics: 'HR Analytics & Reports'
    };
    document.querySelector('.header-left h1').textContent = titles[sectionId] || 'Dashboard';

    // Reinitialize charts if analytics section
    if (sectionId === 'analytics') {
        setTimeout(() => {
            initializeCharts();
        }, 100);
    }
}

// ============ EMPLOYEES TABLE ============
function populateEmployeesTable() {
    const tbody = document.getElementById('employeesTableBody');
    tbody.innerHTML = '';

    employees.forEach(emp => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><strong>${emp.firstName} ${emp.lastName}</strong></td>
            <td>${emp.id}</td>
            <td>${emp.department}</td>
            <td>${emp.position}</td>
            <td>${emp.email}</td>
            <td><span class="status-badge ${emp.status.toLowerCase().replace(' ', '-')}">${emp.status}</span></td>
            <td>
                <div class="action-buttons">
                    <button class="btn-small btn-edit" onclick="editEmployee('${emp.id}')">Edit</button>
                    <button class="btn-small btn-delete" onclick="deleteEmployee('${emp.id}')">Delete</button>
                </div>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function editEmployee(empId) {
    const emp = employees.find(e => e.id === empId);
    if (emp) {
        document.getElementById('modalTitle').textContent = 'Edit Employee';
        document.getElementById('firstName').value = emp.firstName;
        document.getElementById('lastName').value = emp.lastName;
        document.getElementById('email').value = emp.email;
        document.getElementById('phone').value = emp.phone;
        document.getElementById('department').value = emp.department;
        document.getElementById('position').value = emp.position;
        document.getElementById('salary').value = emp.salary;
        document.getElementById('employeeStatus').value = emp.status;
        openEmployeeModal(empId);
    }
}

function deleteEmployee(empId) {
    if (confirm('Are you sure you want to delete this employee?')) {
        employees = employees.filter(e => e.id !== empId);
        populateEmployeesTable();
    }
}

// ============ EMPLOYEE MODAL ============
function openEmployeeModal(empId = null) {
    const modal = document.getElementById('employeeModal');
    modal.classList.add('active');
    document.getElementById('employeeForm').setAttribute('data-emp-id', empId || '');
    if (!empId) {
        document.getElementById('modalTitle').textContent = 'Add New Employee';
        document.getElementById('employeeForm').reset();
    }
}

function closeEmployeeModal() {
    document.getElementById('employeeModal').classList.remove('active');
}

document.getElementById('addEmployeeBtn')?.addEventListener('click', () => openEmployeeModal());

document.querySelector('#employeeModal .close-btn')?.addEventListener('click', closeEmployeeModal);

document.getElementById('employeeForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const empId = this.getAttribute('data-emp-id');
    
    const empData = {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        department: document.getElementById('department').value,
        position: document.getElementById('position').value,
        salary: parseInt(document.getElementById('salary').value),
        status: document.getElementById('employeeStatus').value,
    };

    if (empId) {
        const emp = employees.find(e => e.id === empId);
        if (emp) {
            Object.assign(emp, empData);
        }
    } else {
        empData.id = 'EMP' + String(employees.length + 1).padStart(3, '0');
        employees.push(empData);
    }

    populateEmployeesTable();
    closeEmployeeModal();
});

// ============ ATTENDANCE & CLOCK IN/OUT ============
function initializeClockIn() {
    document.getElementById('clockInBtn').addEventListener('click', clockIn);
    document.getElementById('clockOutBtn').addEventListener('click', clockOut);
    document.getElementById('resetClockBtn').addEventListener('click', resetClock);
}

function updateCurrentTime() {
    const now = new Date();
    const timeStr = now.toLocaleTimeString('en-US', { hour12: false });
    const dateStr = now.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    
    document.getElementById('currentTime').textContent = timeStr;
    document.getElementById('currentDate').textContent = dateStr;
}

function clockIn() {
    const now = new Date();
    clockInData.clockInTime = now;
    const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    
    document.getElementById('clockInTime').textContent = timeStr;
    document.getElementById('clockInBtn').disabled = true;
    document.getElementById('clockOutBtn').disabled = false;
    
    showNotification('Clocked in successfully!', 'success');
}

function clockOut() {
    if (!clockInData.clockInTime) {
        showNotification('Please clock in first', 'warning');
        return;
    }

    const now = new Date();
    clockInData.clockOutTime = now;
    const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    
    document.getElementById('clockOutTime').textContent = timeStr;
    
    // Calculate hours worked
    const diffMs = now - clockInData.clockInTime;
    const hours = (diffMs / (1000 * 60 * 60)).toFixed(2);
    document.getElementById('hoursWorked').textContent = hours + ' hrs';
    
    document.getElementById('clockOutBtn').disabled = true;
    
    // Add to attendance records
    const today = new Date().toLocaleDateString('en-CA');
    const record = {
        employee: 'John Doe',
        date: today,
        clockIn: clockInData.clockInTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        clockOut: timeStr,
        hours: parseFloat(hours),
        status: 'Present'
    };
    
    attendanceRecords.unshift(record);
    populateAttendanceTable();
    
    showNotification('Clocked out successfully!', 'success');
}

function resetClock() {
    clockInData = { clockInTime: null, clockOutTime: null };
    document.getElementById('clockInTime').textContent = 'Not yet clocked in';
    document.getElementById('clockOutTime').textContent = 'Not yet clocked out';
    document.getElementById('hoursWorked').textContent = '0.00 hrs';
    document.getElementById('clockInBtn').disabled = false;
    document.getElementById('clockOutBtn').disabled = true;
}

function populateAttendanceTable() {
    const tbody = document.getElementById('attendanceTableBody');
    tbody.innerHTML = '';

    attendanceRecords.forEach(record => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${record.employee}</td>
            <td>${record.date}</td>
            <td>${record.clockIn}</td>
            <td>${record.clockOut}</td>
            <td>${record.hours}</td>
            <td><span class="status-badge ${record.status.toLowerCase().replace(' ', '-')}">${record.status}</span></td>
        `;
        tbody.appendChild(row);
    });
}

// ============ LEAVE MANAGEMENT ============
function openLeaveModal() {
    document.getElementById('leaveModal').classList.add('active');
}

function closeLeaveModal() {
    document.getElementById('leaveModal').classList.remove('active');
}

document.getElementById('requestLeaveBtn')?.addEventListener('click', openLeaveModal);

document.querySelector('#leaveModal .close-btn')?.addEventListener('click', closeLeaveModal);

document.getElementById('leaveForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const fromDate = new Date(document.getElementById('fromDate').value);
    const toDate = new Date(document.getElementById('toDate').value);
    const days = Math.ceil((toDate - fromDate) / (1000 * 60 * 60 * 24)) + 1;

    const leaveRequest = {
        id: leaveRequests.length + 1,
        employee: 'John Doe',
        type: document.getElementById('leaveType').value,
        startDate: document.getElementById('fromDate').value,
        endDate: document.getElementById('toDate').value,
        reason: document.getElementById('leaveReason').value,
        status: 'Pending',
        days: days
    };

    leaveRequests.push(leaveRequest);
    populateLeaveRequests();
    closeLeaveModal();
    this.reset();
    
    showNotification('Leave request submitted!', 'success');
});

function populateLeaveRequests() {
    const container = document.getElementById('leaveRequestsList');
    if (!container) return;
    
    container.innerHTML = '';

    leaveRequests.forEach(leave => {
        const div = document.createElement('div');
        div.className = 'leave-item';
        div.innerHTML = `
            <div class="leave-item-details">
                <h5>${leave.employee}</h5>
                <p>${leave.type} • ${leave.days} days • ${leave.startDate} to ${leave.endDate}</p>
            </div>
            <span class="status-badge ${leave.status.toLowerCase()}">${leave.status}</span>
        `;
        container.appendChild(div);
    });
}

// ============ PAYROLL ============
function populatePayrollTable() {
    const tbody = document.getElementById('payrollTableBody');
    tbody.innerHTML = '';

    employees.slice(0, 10).forEach(emp => {
        const salary = emp.salary;
        const bonus = Math.floor(salary * 0.1);
        const deductions = Math.floor(salary * 0.15);
        const netAmount = salary + bonus - deductions;

        const row = document.createElement('tr');
        row.innerHTML = `
            <td><strong>${emp.firstName} ${emp.lastName}</strong></td>
            <td>${emp.id}</td>
            <td>$${salary.toLocaleString()}</td>
            <td>$${bonus.toLocaleString()}</td>
            <td>$${deductions.toLocaleString()}</td>
            <td><strong>$${netAmount.toLocaleString()}</strong></td>
            <td><span class="status-badge approved">Processed</span></td>
            <td>
                <button class="btn-small btn-view" onclick="viewPayslip('${emp.id}')">View</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function viewPayslip(empId) {
    const emp = employees.find(e => e.id === empId);
    if (emp) {
        alert(`Payslip for ${emp.firstName} ${emp.lastName}\n\nSalary: $${emp.salary}\nBonus: $${Math.floor(emp.salary * 0.1)}\nDeductions: $${Math.floor(emp.salary * 0.15)}\nNet Amount: $${(emp.salary + Math.floor(emp.salary * 0.1) - Math.floor(emp.salary * 0.15)).toLocaleString()}`);
    }
}

// ============ ANALYTICS & STATISTICS ============
function populateDepartmentStats() {
    const tbody = document.getElementById('statsTableBody');
    if (!tbody) return;
    
    tbody.innerHTML = '';

    const departments = ['HR', 'IT', 'Finance', 'Operations', 'Sales'];
    const stats = {
        'HR': { count: 2, avgSalary: 73500, turnover: '5%', attendance: '95%' },
        'IT': { count: 2, avgSalary: 80000, turnover: '8%', attendance: '92%' },
        'Finance': { count: 2, avgSalary: 81500, turnover: '3%', attendance: '96%' },
        'Operations': { count: 1, avgSalary: 78000, turnover: '6%', attendance: '94%' },
        'Sales': { count: 1, avgSalary: 70000, turnover: '12%', attendance: '88%' },
    };

    departments.forEach(dept => {
        const stat = stats[dept];
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><strong>${dept}</strong></td>
            <td>${stat.count}</td>
            <td>$${stat.avgSalary.toLocaleString()}</td>
            <td>${stat.turnover}</td>
            <td>${stat.attendance}</td>
        `;
        tbody.appendChild(row);
    });
}

// ============ CHARTS ============
let charts = {};

function initializeCharts() {
    // Attendance Trend Chart
    const attendanceCtx = document.getElementById('attendanceChart');
    if (attendanceCtx && !charts.attendance) {
        charts.attendance = new Chart(attendanceCtx, {
            type: 'line',
            data: {
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
                datasets: [{
                    label: 'Present',
                    data: [220, 215, 208, 225, 198],
                    borderColor: '#5B7FFF',
                    backgroundColor: 'rgba(91, 127, 255, 0.1)',
                    borderWidth: 3,
                    tension: 0.4,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        display: true,
                        position: 'top'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 250
                    }
                }
            }
        });
    } else if (attendanceCtx && charts.attendance) {
        charts.attendance.update();
    }

    // Leave Distribution Chart
    const leaveCtx = document.getElementById('leaveChart');
    if (leaveCtx && !charts.leave) {
        charts.leave = new Chart(leaveCtx, {
            type: 'doughnut',
            data: {
                labels: ['Vacation', 'Sick Leave', 'Casual Leave', 'Maternity Leave'],
                datasets: [{
                    data: [45, 20, 25, 10],
                    backgroundColor: [
                        '#5B7FFF',
                        '#10B981',
                        '#F59E0B',
                        '#A855F7'
                    ]
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });
    } else if (leaveCtx && charts.leave) {
        charts.leave.update();
    }

    // Department Distribution Chart
    const deptCtx = document.getElementById('departmentChart');
    if (deptCtx && !charts.department) {
        charts.department = new Chart(deptCtx, {
            type: 'bar',
            data: {
                labels: ['HR', 'IT', 'Finance', 'Operations', 'Sales'],
                datasets: [{
                    label: 'Number of Employees',
                    data: [25, 45, 30, 35, 40],
                    backgroundColor: [
                        '#5B7FFF',
                        '#10B981',
                        '#F59E0B',
                        '#A855F7',
                        '#EF4444'
                    ]
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                indexAxis: 'y',
                plugins: {
                    legend: {
                        display: true
                    }
                },
                scales: {
                    x: {
                        beginAtZero: true
                    }
                }
            }
        });
    } else if (deptCtx && charts.department) {
        charts.department.update();
    }

    // Salary Distribution Chart
    const salaryCtx = document.getElementById('salaryChart');
    if (salaryCtx && !charts.salary) {
        charts.salary = new Chart(salaryCtx, {
            type: 'bar',
            data: {
                labels: ['$40K-$60K', '$60K-$80K', '$80K-$100K', '$100K+'],
                datasets: [{
                    label: 'Number of Employees',
                    data: [45, 85, 75, 40],
                    backgroundColor: '#5B7FFF'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    } else if (salaryCtx && charts.salary) {
        charts.salary.update();
    }

    // Turnover Chart
    const turnoverCtx = document.getElementById('turnoverChart');
    if (turnoverCtx && !charts.turnover) {
        charts.turnover = new Chart(turnoverCtx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                datasets: [{
                    label: 'Turnover Rate (%)',
                    data: [5, 6, 4, 7, 5, 6, 8, 5, 4, 6, 7, 6],
                    borderColor: '#EF4444',
                    backgroundColor: 'rgba(239, 68, 68, 0.1)',
                    borderWidth: 2,
                    tension: 0.4,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 10
                    }
                }
            }
        });
    } else if (turnoverCtx && charts.turnover) {
        charts.turnover.update();
    }

    // Leave Analysis Chart
    const leaveAnalysisCtx = document.getElementById('leaveAnalysisChart');
    if (leaveAnalysisCtx && !charts.leaveAnalysis) {
        charts.leaveAnalysis = new Chart(leaveAnalysisCtx, {
            type: 'radar',
            data: {
                labels: ['Vacation', 'Sick', 'Casual', 'Maternity', 'Unpaid'],
                datasets: [{
                    label: 'Leave Days Used',
                    data: [250, 80, 120, 60, 40],
                    borderColor: '#5B7FFF',
                    backgroundColor: 'rgba(91, 127, 255, 0.1)',
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        });
    } else if (leaveAnalysisCtx && charts.leaveAnalysis) {
        charts.leaveAnalysis.update();
    }
}

// ============ FILTERS ============
document.getElementById('employeeSearch')?.addEventListener('input', filterEmployees);
document.getElementById('departmentFilter')?.addEventListener('change', filterEmployees);
document.getElementById('statusFilter')?.addEventListener('change', filterEmployees);
document.getElementById('leaveStatusFilter')?.addEventListener('change', filterLeaveRequests);

function filterEmployees() {
    const searchTerm = document.getElementById('employeeSearch')?.value.toLowerCase() || '';
    const departmentFilter = document.getElementById('departmentFilter')?.value || '';
    const statusFilter = document.getElementById('statusFilter')?.value || '';

    const filtered = employees.filter(emp => {
        const nameMatch = (emp.firstName + ' ' + emp.lastName).toLowerCase().includes(searchTerm);
        const deptMatch = !departmentFilter || emp.department === departmentFilter;
        const statusMatch = !statusFilter || emp.status === statusFilter;
        return nameMatch && deptMatch && statusMatch;
    });

    const tbody = document.getElementById('employeesTableBody');
    tbody.innerHTML = '';

    filtered.forEach(emp => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><strong>${emp.firstName} ${emp.lastName}</strong></td>
            <td>${emp.id}</td>
            <td>${emp.department}</td>
            <td>${emp.position}</td>
            <td>${emp.email}</td>
            <td><span class="status-badge ${emp.status.toLowerCase().replace(' ', '-')}">${emp.status}</span></td>
            <td>
                <div class="action-buttons">
                    <button class="btn-small btn-edit" onclick="editEmployee('${emp.id}')">Edit</button>
                    <button class="btn-small btn-delete" onclick="deleteEmployee('${emp.id}')">Delete</button>
                </div>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function filterLeaveRequests() {
    const statusFilter = document.getElementById('leaveStatusFilter')?.value || '';

    const filtered = statusFilter 
        ? leaveRequests.filter(leave => leave.status === statusFilter)
        : leaveRequests;

    const container = document.getElementById('leaveRequestsList');
    if (!container) return;
    
    container.innerHTML = '';

    filtered.forEach(leave => {
        const div = document.createElement('div');
        div.className = 'leave-item';
        div.innerHTML = `
            <div class="leave-item-details">
                <h5>${leave.employee}</h5>
                <p>${leave.type} • ${leave.days} days • ${leave.startDate} to ${leave.endDate}</p>
            </div>
            <span class="status-badge ${leave.status.toLowerCase()}">${leave.status}</span>
        `;
        container.appendChild(div);
    });
}

// ============ EXPORT TO PDF ============
document.getElementById('exportPdfBtn')?.addEventListener('click', exportDashboardToPdf);
document.getElementById('downloadReportBtn')?.addEventListener('click', exportAnalyticsToPdf);

function exportDashboardToPdf() {
    const element = document.getElementById('dashboard');
    const opt = {
        margin: 10,
        filename: 'HR_Dashboard_Report.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { orientation: 'portrait', unit: 'mm', format: 'a4' }
    };
    html2pdf().set(opt).from(element).save();
    showNotification('PDF exported successfully!', 'success');
}

function exportAnalyticsToPdf() {
    const element = document.getElementById('analytics');
    const opt = {
        margin: 10,
        filename: 'HR_Analytics_Report.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { orientation: 'portrait', unit: 'mm', format: 'a4' }
    };
    html2pdf().set(opt).from(element).save();
    showNotification('Analytics report exported successfully!', 'success');
}

// ============ NOTIFICATIONS ============
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        border-radius: 8px;
        color: white;
        font-weight: 600;
        z-index: 2000;
        animation: slideIn 0.3s ease;
        background-color: ${type === 'success' ? '#10B981' : type === 'warning' ? '#F59E0B' : '#5B7FFF'};
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ============ EVENT LISTENERS ============
function attachEventListeners() {
    // Close modal when clicking outside
    document.getElementById('employeeModal')?.addEventListener('click', function(e) {
        if (e.target === this) closeEmployeeModal();
    });

    document.getElementById('leaveModal')?.addEventListener('click', function(e) {
        if (e.target === this) closeLeaveModal();
    });

    // Process payroll button
    document.getElementById('processPayrollBtn')?.addEventListener('click', () => {
        showNotification('Payroll processed for 212 employees!', 'success');
    });
}

// Add CSS for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);