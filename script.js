// ======================================================
// ACT PHONE MANAGER
// FULL JAVASCRIPT
// ======================================================

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js";
import {
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendEmailVerification,
    onAuthStateChanged,
    signOut,
    setPersistence,
    sendPasswordResetEmail,
    browserLocalPersistence

} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js";

// ======================================================
// FIRESTORE DATABASE
// ======================================================

import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
    collection,
    getDocs,
    deleteDoc
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-firestore.js";

// ====================================================== 
// Firebase Config 
// ====================================================== 
 
const firebaseConfig = { 
    apiKey: "AIzaSyCbailKYigVmcbqZHhi3kbvR2FvT1Q2JDw", 
    authDomain: "act-phone-manager.firebaseapp.com", 
    projectId: "act-phone-manager", 
    storageBucket: "act-phone-manager.firebasestorage.app", 
    messagingSenderId: "277621100210", 
    appId: "1:277621100210:web:0676faca9d539631a243ab", 
    measurementId: "G-R8MVR935PL" 
}; 
 
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// تهيئة قاعدة البيانات السحابية
const db = getFirestore(app);


// ACT SECURE PERSISTENT SESSION
const authPersistenceReady = setPersistence(
    auth,
    browserLocalPersistence
);
const provider = new GoogleAuthProvider(); 
 
console.log("Firebase initialized successfully."); 
 
 
// ====================================================== 
// الأقسام 
// ====================================================== 
 
const SECTIONS = { 
    SALE: "sale", 
    PENDING: "maintenance-pending", 
    READY: "maintenance-ready", 
    FAILED: "maintenance-failed", 
    DELIVERED: "maintenance-delivered" 
}; 
 
const sectionNames = { 
    [SECTIONS.SALE]: "البيع", 
    [SECTIONS.PENDING]: "قيد الإصلاح", 
    [SECTIONS.READY]: "جاهز", 
    [SECTIONS.FAILED]: "لم يتم الإصلاح", 
    [SECTIONS.DELIVERED]: "تم التسليم" 
}; 
 
 
// ====================================================== 
// اللغة 
// ====================================================== 
 
let currentLanguage = 
    localStorage.getItem( 
        "actPhoneManager_language" 
    ) || "ar"; 
 
 
const translations = { 
 
    ar: { 
 
        loginTitle: "🔐 تسجيل الدخول", 
        loginWelcome: 
            "أهلاً بك في نظام إدارة أكت للموبايلات", 
 
        emailPlaceholder: 
            "📧 البريد الإلكتروني", 
 
        passwordPlaceholder: 
            "🔒 كلمة المرور", 
 
        emailLogin: 
            "🔑 دخول إلى النظام", 
 
        googleLogin: 
            "🔵 تسجيل الدخول باستخدام Google", 
 
        loginOr: "أو", 
 
        systemOnline: 
            "SYSTEM ONLINE • SECURE ACCESS", 
 
        headerTitle: 
            "Act Phone Manager", 
 
        headerSubtitle: 

       " إدارة متكاملة.. لخدمة أسرع وأدق", 
 
        online: 
            "SYSTEM ONLINE", 
 
        english: 
            "English", 
 
        arabic: 
            "العربية", 
 
        light: 
            "Light", 
 
        dark: 
            "Dark", 
 
        sale: 
            "📱 الأجهزة والبيع", 
 
        maintenance: 
            "👥 العملاء والصيانة", 
 
        employees: 
            "👨‍🔧 العاملين", 
 
        addSale: 
            "➕ إضافة جهاز جديد", 
 
        pending: 
            "🟡 قيد الإصلاح", 
 
        ready: 
            "🟢 جاهز", 
 
        failed: 
            "🔴 لم يتم الإصلاح", 
 
        delivered: 
            "📦 تم التسليم", 
 
        logout: 
            "🚪 تسجيل الخروج", 
 
        edit: 
            "✏️ تعديل", 
 
        delete: 
            "🗑️ حذف", 
 
        save: 
            "💾 حفظ", 
 
        cancel: 
            "✕ إلغاء", 
 
        deviceStatus: 
            "حالة الجهاز", 
 
        phone: 
            "الجهاز", 
 
        customer: 
            "صاحب الجهاز", 
 
        date: 
            "التاريخ", 
 
        time: 
            "الوقت", 
 
        problem: 
            "العيب", 
 
        changedParts: 
            "الأجزاء التي يتم تغييرها", 
 
        price: 
            "السعر", 
 
        notes: 
            "ملاحظات", 
 
        employee: 
            "العامل", 
 
        noDevices: 
            "لا توجد أجهزة هنا", 
 
        noEmployees: 
            "لا يوجد عاملين" 
 
    }, 
 
    en: { 
 
        loginTitle: 
            "🔐 Login", 
 
        loginWelcome: 
            "Welcome to Act Phone Manager", 
 
        emailPlaceholder: 
            "📧 Email", 
 
        passwordPlaceholder: 
            "🔒 Password", 
 
        emailLogin: 
            "🔑 Login", 
 
        googleLogin: 
            "🔵 Continue with Google", 
 
        loginOr: 
            "OR", 
 
        systemOnline: 
            "SYSTEM ONLINE • SECURE ACCESS", 
 
        headerTitle: 
            "Act Phone Manager", 
 
        headerSubtitle: 
            "Act Mobile Shop Management System", 
 
        online: 
            "SYSTEM ONLINE", 
 
        english: 
            "English", 
 
        arabic: 
            "العربية", 
 
        light: 
            "Light", 
 
        dark: 
            "Dark", 
 
        sale: 
            "📱 Sales", 
 
        maintenance: 
            "👥 Customers & Repair", 
 
        employees: 
            "👨‍🔧 Employees", 
 
        addSale: 
            "➕ Add New Device", 
 
        pending: 
            "🟡 In Repair", 
 
        ready: 
            "🟢 Ready", 
 
        failed: 
            "🔴 Not Repaired", 
 
        delivered: 
            "📦 Delivered", 
 
        logout: 
            "🚪 Logout", 
 
        edit: 
            "✏️ Edit", 
 
        delete: 
            "🗑️ Delete", 
 
        save: 
            "💾 Save", 
 
        cancel: 
            "✕ Cancel", 
 
        deviceStatus: 
            "Device Status", 
 
        phone: 
            "Device", 
 
        customer: 
            "Customer", 
 
        date: 
            "Date", 
 
        time: 
            "Time", 
 
        problem: 
            "Problem", 
 
        changedParts: 
            "Changed Parts", 
 
        price: 
            "Price", 
 
        notes: 
            "Notes", 
 
        employee: 
            "Employee", 
 
        noDevices: 
            "No devices here", 
 
        noEmployees: 
            "No employees" 
 
    } 
 
}; 
 
 
function t(key) { 
 
    return ( 
        translations[currentLanguage] && 
        translations[currentLanguage][key] 
    ) || key; 
} 
 
 
// ====================================================== 
// تطبيق اللغة 
// ====================================================== 
 
 function applyLanguage() {

    const html = document.documentElement;

    html.lang = currentLanguage;

    html.dir =
        currentLanguage === "ar"
            ? "rtl"
            : "ltr";


    const themeText =
        document.getElementById("theme-toggle-text");

    const themeButton =
        document.getElementById("theme-toggle");


    const theme =
        localStorage.getItem("actPhoneManager_theme")
        || "dark";


    if (themeText) {

        themeText.textContent =
            theme === "dark"
                ? t("light")
                : t("dark");

    }


    if (themeButton) {

        themeButton.title =
            theme === "dark"
                ? "Light Mode"
                : "Dark Mode";

    }


    updateStaticTexts();


    // =========================================
    // تحديث المحتوى بدون تغيير القسم المفتوح
    // =========================================

    if (currentSection === SECTIONS.SALE) {

        renderSaleDevices();

        return;
    }


    if (
        [
            SECTIONS.PENDING,
            SECTIONS.READY,
            SECTIONS.FAILED,
            SECTIONS.DELIVERED
        ].includes(currentSection)
    ) {

        renderMaintenance();

        return;
    }


    if (currentSection === "employees") {

        if (currentEmployeeView === "form") {

            return;
        }


        if (currentEmployeeView === "attendance") {

            renderAttendance();

            return;
        }


        if (currentEmployeeView === "salaries") {

            renderSalaries();

            return;
        }


        if (currentEmployeeView === "statistics") {

            renderEmployeeStatistics();

            return;
        }


        renderEmployees();

    }

}
 
// ====================================================== 
// تطبيق المظهر 
// ====================================================== 
 
function applyTheme() { 
 
    const theme = 
        localStorage.getItem( 
            "actPhoneManager_theme" 
        ) || "dark"; 
 
    document.documentElement.dataset.theme = 
        theme; 
 
    const themeText = 
        document.getElementById( 
            "theme-toggle-text" 
        ); 
 
    const themeButton = 
        document.getElementById( 
            "theme-toggle" 
        ); 
 
    if (themeText) { 
 
        themeText.textContent = 
            theme === "dark" 
                ? t("light") 
                : t("dark"); 
    } 
 
    if (themeButton) { 
 
        themeButton.title = 
            theme === "dark" 
                ? "Light Mode" 
                : "Dark Mode"; 
    } 
} 
 
 
// ====================================================== 
// تغيير المظهر 
// ====================================================== 
 
function toggleTheme() { 
 
    const current = 
        localStorage.getItem( 
            "actPhoneManager_theme" 
        ) || "dark"; 
 
    const next = 
        current === "dark" 
            ? "light" 
            : "dark"; 
 
    localStorage.setItem( 
        "actPhoneManager_theme", 
        next 
    ); 
 
    applyTheme(); 
} 
 

// ======================================================
// LANGUAGE & THEME CONTROLS
// ======================================================

const themeToggle =
    document.getElementById("theme-toggle");


if (themeToggle) {
    themeToggle.addEventListener(
        "click",
        toggleTheme
    );
}


// تطبيق المظهر عند تشغيل البرنامج
applyTheme();

 
 
// ======================================================
// المتغيرات
// ======================================================

let editingDeviceId = null;

let currentSection =
    SECTIONS.SALE;

let formSection =
    SECTIONS.SALE;

let editingEmployeeId = null;

let currentEmployeeView =
    "main";

let devices = [];

let employees = [];

let currentUser = null;

// ======================================================
// AUTH MODE VARIABLES
// ======================================================

// البريد المرجعي لوضع تسجيل الدخول
let authModeBaselineEmail = "";

// هل تم تفعيل وضع تسجيل الدخول من قبل؟
let authLoginBaselineActive = false;

 // ======================================================
// DOM
// ======================================================

const loginPage =
    document.getElementById(
        "login-page"
    );

const emailLoginButton =
    document.getElementById(
        "email-login-button"
    );

const googleLoginButton =
    document.getElementById(
        "google-login-button"
    );

const createAccountButton =
    document.getElementById(
        "create-account-button"
    );

const loginEmail =
    document.getElementById(
        "login-email"
    );

const loginPassword =
    document.getElementById(
        "login-password"
    );

const salesArea =
    document.querySelector(
        ".sales-area"
    );

const customersSection =
    document.getElementById(
        "customers-section"
    );

const employeesSection =
    document.getElementById(
        "employees-section"
    );

const employeesSectionButton =
    document.getElementById(
        "employees-section-button"
    );

const sectionButtons =
    document.querySelectorAll(
        ".sections-buttons .section-button"
    );

const saleAddButton =
    document.getElementById(
        "sale-add-button"
    );

const deviceForm =
    document.getElementById(
        "device-form"
    );

const closeDeviceFormButton =
    document.getElementById(
        "close-device-form-button"
    );

const deviceList =
    document.getElementById(
        "devices-list"
    );

const searchInput =
    document.getElementById(
        "searchInput"
    );

const maintenanceButtons =
    document.querySelectorAll(
        ".maintenance-buttons button"
    );

const phoneName =
    document.getElementById(
        "phone-name"
    );

const customerName =
    document.getElementById(
        "customer-name"
    );

const receiveDate =
    document.getElementById(
        "receive-date"
    );

const receiveTime =
    document.getElementById(
        "receive-time"
    );

const problem =
    document.getElementById(
        "problem"
    );

const changedParts =
    document.getElementById(
        "changed-parts"
    );

const price =
    document.getElementById(
        "price"
    );

const notes =
    document.getElementById(
        "notes"
    );

// رقم السيريال يتم إنشاؤه تلقائياً داخل نموذج الجهاز إذا لم يكن موجوداً في HTML.
let serialNumber =
    document.getElementById(
        "serial-number"
    );

const saveDeviceButton =
    deviceForm
        ? deviceForm.querySelector(
            ".save-button"
        )
        : null;

ensureSerialField();
 
 
// ====================================================== 
// طباعة بيانات العامل 
// ====================================================== 
 
function printEmployeeData(id) {
    const employee = employees.find(item => item.id === id);
    if (!employee) return;

    // بطاقة الطباعة لا تعرض أي بيانات خاصة أو كود الحضور.
    const title = currentLanguage === "ar" ? "بطاقة العامل" : "Employee Card";
    const html = `<!DOCTYPE html>
<html lang="${currentLanguage}" dir="${currentLanguage === "ar" ? "rtl" : "ltr"}">
<head><meta charset="UTF-8"><title>${escapeHTML(title)}</title>
<style>
body{font-family:Arial,sans-serif;padding:30px;color:#111;background:#fff}
.card{max-width:520px;margin:35px auto;border:2px solid #111;border-radius:18px;padding:32px;text-align:center}
.number{font-size:18px;font-weight:700;margin:15px 0;color:#444}
h1{font-size:27px;margin:18px 0}.brand{font-size:14px;letter-spacing:2px;color:#555}
@media print{body{padding:0}.card{margin:0 auto;border:2px solid #111}}
</style></head><body><div class="card">
<div class="brand">ACT MANAGER</div><h1>${escapeHTML(employee.name || "-")}</h1>
<div class="number">${currentLanguage === "ar" ? "رقم العامل" : "Employee No."}: #${escapeHTML(String(employees.findIndex(item => item.id === id) + 1))}</div>
</div><script>window.onload=function(){window.print();};<\/script></body></html>`;
    const printWindow = window.open("", "_blank", "width=700,height=500");
    if (!printWindow) {
        alert(currentLanguage === "ar" ? "السماح بالنوافذ المنبثقة مطلوب للطباعة." : "Please allow pop-ups to print.");
        return;
    }
    printWindow.document.open();
    printWindow.document.write(html);
    printWindow.document.close();
}

// ====================================================== 
// Employee DOM 
// ====================================================== 
 
const addEmployeeButton = 
    document.getElementById( 
        "add-employee-button" 
    ); 
 
const attendanceButton = 
    document.getElementById( 
        "employees-attendance-button" 
    ); 
 
const salariesButton = 
    document.getElementById( 
        "employees-salaries-button" 
    ); 
 
const statisticsButton = 
    document.getElementById( 
        "employees-statistics-button" 
    ); 
 
const employeeForm = 
    document.getElementById( 
        "employee-form" 
    ); 
 
const saveEmployeeButton = 
    document.getElementById( 
        "save-employee-button" 
    ); 
 
const cancelEmployeeButton = 
    document.getElementById( 
        "cancel-employee-button" 
    ); 
 
const employeesList = 
    document.getElementById( 
        "employees-list" 
    ); 
 
const attendanceSection = 
    document.getElementById( 
        "attendance-section" 
    ); 
 
const salariesSection = 
    document.getElementById( 
        "salaries-section" 
    ); 
 
const employeeStatisticsSection = 
    document.getElementById( 
        "employee-statistics-section" 
    ); 
 
const attendanceList = 
    document.getElementById( 
        "attendance-list" 
    ); 
 
const salariesList = 
    document.getElementById( 
        "salaries-list" 
    ); 
 
const employeeStatistics = 
    document.getElementById( 
        "employee-statistics" 
    ); 
 
const employeeName = 
    document.getElementById( 
        "employee-name" 
    ); 
 
const employeePhone = 
    document.getElementById( 
        "employee-phone" 
    ); 
 
const employeeJob = 
    document.getElementById( 
        "employee-job" 
    ); 
 
const employeeStartDate = 
    document.getElementById( 
        "employee-start-date" 
    ); 
 
const employeeSalary = 
    document.getElementById( 
        "employee-salary" 
    ); 
 
const employeeNotes = 
    document.getElementById( 
        "employee-notes" 
    ); 
 
const totalEmployees = 
    document.getElementById( 
        "total-employees" 
    ); 
 
const presentEmployees = 
    document.getElementById( 
        "present-employees" 
    ); 
 
const absentEmployees = 
    document.getElementById( 
        "absent-employees" 
    ); 
 
const totalSalaries = 
    document.getElementById( 
        "total-salaries" 
    ); 
 
 
// ====================================================== 
// تحديث النصوص الموجودة في HTML 
// ====================================================== 
 
function updateStaticTexts() { 
 
    const loginTitle = 
        document.querySelector( 
            ".login-box h1" 
        ); 
 
    if (loginTitle) { 
        loginTitle.textContent = 
            t("loginTitle"); 
    } 
 
 
    const loginWelcome = 
        document.querySelector( 
            ".login-box > p" 
        ); 
 
    if (loginWelcome) { 
 
        loginWelcome.innerHTML = 
            currentLanguage === "ar" 
                ? `أهلاً بك في نظام إدارة <strong>أكت للموبايلات</strong>` 
                : `Welcome to <strong>Act Phone Manager</strong>`; 
    } 
 
 
    if (loginEmail) { 
 
        loginEmail.placeholder = 
            t("emailPlaceholder"); 
    } 
 
 
    if (loginPassword) { 
 
        loginPassword.placeholder = 
            t("passwordPlaceholder"); 
    } 
 
 
    if (emailLoginButton) { 
 
        if (!emailLoginButton.disabled) { 
            emailLoginButton.textContent = 
                t("emailLogin"); 
        } 
    } 
 
 
    if (googleLoginButton) { 
 
        if (!googleLoginButton.disabled) { 
            googleLoginButton.textContent = 
                t("googleLogin"); 
        } 
    } 
 
 
    const loginOr = 
        document.querySelector( 
            ".login-or" 
        ); 
 
    if (loginOr) { 
        loginOr.textContent = 
            t("loginOr"); 
    } 
 
 
    const loginStatus = 
        document.querySelector( 
            ".login-status" 
        ); 
 
    if (loginStatus) { 
        loginStatus.textContent = 
            t("systemOnline"); 
    } 
 
 
    const headerTitle = 
        document.querySelector( 
            ".header h1" 
        ); 
 
    if (headerTitle) { 
        headerTitle.textContent = 
            t("headerTitle"); 
    } 
 
 
    const headerSubtitle = 
        document.querySelector( 
            ".header p" 
        ); 
 
    if (headerSubtitle) { 
        headerSubtitle.textContent = 
            t("headerSubtitle"); 
    } 
 
 
    const onlineStatus = 
        document.querySelector( 
            ".header-status" 
        ); 
 
    if (onlineStatus) { 
        onlineStatus.textContent = 
            t("online"); 
    } 
 
 
    if (saleAddButton) { 
        saleAddButton.textContent = 
            t("addSale"); 
    } 
 
 
    const sectionButtonTexts = 
        document.querySelectorAll( 
            ".section-button" 
        ); 
 
    sectionButtonTexts.forEach( 
        function (button, index) { 
 
            if (index === 0) { 
                button.textContent = 
                    t("sale"); 
            } 
 
            if (index === 1) { 
                button.textContent = 
                    t("maintenance"); 
            } 
 
            if (index === 2) { 
                button.textContent = 
                    t("employees"); 
            } 
        } 
    ); 
 
 
    if (searchInput) { 
 
        searchInput.placeholder = 
            currentLanguage === "ar" 
                ? "🔎 بحث باسم الجهاز أو صاحب الجهاز أو السيريال" 
                : "🔎 Search device, customer or serial"; 
    } 
 
 
    if (phoneName) { 
 
        phoneName.placeholder = 
            currentLanguage === "ar" 
                ? "اسم الجهاز" 
                : "Device name"; 
    } 
 
 
    if (customerName) { 
 
        customerName.placeholder = 
            currentLanguage === "ar" 
                ? "اسم صاحب الجهاز" 
                : "Customer name"; 
    } 
 
 
    if (problem) { 
 
        problem.placeholder = 
            currentLanguage === "ar" 
                ? "وصف العيب" 
                : "Problem description"; 
    } 
 
 
    if (changedParts) { 
 
        changedParts.placeholder = 
            currentLanguage === "ar" 
                ? "الأجزاء التي يتم تغييرها" 
                : "Changed parts"; 
    } 
 
 
    if (notes) { 
 
        notes.placeholder = 
            currentLanguage === "ar" 
                ? "ملاحظات" 
                : "Notes"; 
    } 
 
 
    if (employeeName) { 
 
        employeeName.placeholder = 
            currentLanguage === "ar" 
                ? "اسم العامل" 
                : "Employee name"; 
    } 
 
 
    if (employeePhone) { 
 
        employeePhone.placeholder = 
            currentLanguage === "ar" 
                ? "رقم الهاتف" 
                : "Phone number"; 
    } 
 
 
    if (employeeJob) { 
 
        employeeJob.placeholder = 
            currentLanguage === "ar" 
                ? "الوظيفة" 
                : "Job"; 
    } 
 
 
    if (employeeNotes) { 
 
        employeeNotes.placeholder = 
            currentLanguage === "ar" 
                ? "ملاحظات" 
                : "Notes"; 
    } 
} 
 
// ======================================================
// Firebase Authentication
// ======================================================

// ======================================================
// EMAIL LOGIN
// ======================================================

async function loginWithEmail() {

    if (emailLoginButton) {
        emailLoginButton.disabled = true;
        emailLoginButton.textContent =
            currentLanguage === "ar"
                ? "جاري تسجيل الدخول..."
                : "Signing in...";
    }

    try {

        await authPersistenceReady;

        if (!navigator.onLine) {
            alert(
                currentLanguage === "ar"
                    ? "لا يمكن إنشاء حساب جديد بدون اتصال بالإنترنت. تحقق من الاتصال وحاول مرة أخرى."
                    : "An internet connection is required to create an account. Please reconnect and try again."
            );
            return;
        }

        const email = loginEmail
            ? loginEmail.value.trim()
            : "";

        const password = loginPassword
            ? loginPassword.value
            : "";

        if (!email || !password) {
            alert(
                currentLanguage === "ar"
                    ? "من فضلك أدخل البريد الإلكتروني وكلمة المرور."
                    : "Please enter your email and password."
            );
            return;
        }

        const userCredential =
            await signInWithEmailAndPassword(
                auth,
                email,
                password
            );

        await userCredential.user.reload();

        const currentAuthUser = auth.currentUser;

        if (
            currentAuthUser &&
            !currentAuthUser.emailVerified
        ) {

            await signOut(auth);

            setAuthScreenMode("login");

            alert(
                currentLanguage === "ar"
                    ? "حسابك غير مؤكد. افتح رسالة التأكيد في بريدك الإلكتروني أولاً."
                    : "Your email is not verified. Please check your inbox."
            );

            return;
        }

        setAuthScreenMode("login");

    } catch (error) {

        console.error("Email login error:", error);

        let message =
            currentLanguage === "ar"
                ? "حدث خطأ أثناء تسجيل الدخول."
                : "Login failed.";

        if (
            error &&
            (
                error.code === "auth/invalid-credential" ||
                error.code === "auth/wrong-password" ||
                error.code === "auth/user-not-found"
            )
        ) {
            message =
                currentLanguage === "ar"
                    ? "البريد الإلكتروني أو كلمة المرور غير صحيحة."
                    : "Incorrect email or password.";
        }

        if (
            error &&
            error.code === "auth/too-many-requests"
        ) {
            message =
                currentLanguage === "ar"
                    ? "تم إيقاف محاولات تسجيل الدخول مؤقتًا. حاول لاحقًا."
                    : "Too many attempts. Please try again later.";
        }

        if (
            error &&
            error.code === "auth/invalid-email"
        ) {
            message =
                currentLanguage === "ar"
                    ? "البريد الإلكتروني غير صحيح."
                    : "Invalid email address.";
        }

        alert(message);

    } finally {

        if (emailLoginButton) {
            emailLoginButton.disabled = false;
            emailLoginButton.textContent = t("emailLogin");
        }
    }
}


// ======================================================
// CREATE NEW ACCOUNT
// ======================================================

async function createNewAccount() {

    if (createAccountButton) {
        createAccountButton.disabled = true;
        createAccountButton.textContent =
            currentLanguage === "ar"
                ? "جاري إنشاء الحساب..."
                : "Creating account...";
    }

    try {

        await authPersistenceReady;

        const email = loginEmail
            ? loginEmail.value.trim()
            : "";

        const password = loginPassword
            ? loginPassword.value
            : "";

        if (!email || !password) {
            alert(
                currentLanguage === "ar"
                    ? "أدخل البريد الإلكتروني وكلمة المرور أولاً."
                    : "Please enter your email and password."
            );
            return;
        }

        if (password.length < 6) {
            alert(
                currentLanguage === "ar"
                    ? "كلمة المرور لازم تكون 6 أحرف على الأقل."
                    : "Password must be at least 6 characters."
            );
            return;
        }

        const userCredential =
            await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );

        await sendEmailVerification(
            userCredential.user,
            {
                url: window.location.href
            }
        );

        // التحويل إلى وضع تسجيل الدخول
        setAuthScreenMode("login");

        // تسجيل الخروج حتى يؤكد العميل بريده
        await signOut(auth);

        alert(
            currentLanguage === "ar"
                ? "تم إنشاء الحساب بنجاح وإرسال رسالة التأكيد. افتح بريدك الإلكتروني واضغط على رابط التأكيد، ثم سجل الدخول."
                : "Account created successfully. A verification email has been sent. Verify your email, then sign in."
        );

    } catch (error) {

        console.error("Create account error:", error);

        let message =
            currentLanguage === "ar"
                ? "حدث خطأ أثناء إنشاء الحساب."
                : "An error occurred while creating the account.";

        if (
            error &&
            error.code === "auth/email-already-in-use"
        ) {

            setAuthScreenMode("login");

            message =
                currentLanguage === "ar"
                    ? "هذا البريد مسجل بالفعل. تم تحويل الشاشة إلى تسجيل الدخول. استخدم كلمة المرور أو استعادة كلمة المرور."
                    : "This email is already registered. The screen has switched to sign in.";
        }

        if (
            error &&
            error.code === "auth/invalid-email"
        ) {
            message =
                currentLanguage === "ar"
                    ? "البريد الإلكتروني غير صحيح."
                    : "Invalid email address.";
        }

        if (
            error &&
            error.code === "auth/weak-password"
        ) {
            message =
                currentLanguage === "ar"
                    ? "كلمة المرور ضعيفة. استخدم 6 أحرف على الأقل."
                    : "Password is too weak. Use at least 6 characters.";
        }

        if (
            error &&
            error.code === "auth/too-many-requests"
        ) {
            message =
                currentLanguage === "ar"
                    ? "محاولات كثيرة. حاول مرة أخرى لاحقًا."
                    : "Too many attempts. Try again later.";
        }

        alert(message);

    } finally {

        if (createAccountButton) {
            createAccountButton.disabled = false;
            createAccountButton.textContent =
                currentLanguage === "ar"
                    ? "إنشاء حساب جديد"
                    : "Create Account";
        }
    }
}


// ======================================================
// GOOGLE LOGIN
// ======================================================

async function loginWithGoogle() {

    if (googleLoginButton) {
        googleLoginButton.disabled = true;
        googleLoginButton.textContent =
            currentLanguage === "ar"
                ? "جاري الدخول..."
                : "Signing in...";
    }

    try {

        await authPersistenceReady;

        await signInWithPopup(
            auth,
            provider
        );

    } catch (error) {

        console.error("Google login error:", error);

        let message =
            currentLanguage === "ar"
                ? "تعذر تسجيل الدخول باستخدام Google."
                : "Google sign-in failed.";

        if (
            error &&
            error.code === "auth/popup-closed-by-user"
        ) {
            message =
                currentLanguage === "ar"
                    ? "تم إغلاق نافذة تسجيل الدخول."
                    : "The sign-in window was closed.";
        }

        if (
            error &&
            error.code === "auth/unauthorized-domain"
        ) {
            message =
                currentLanguage === "ar"
                    ? "هذا النطاق غير مصرح به في Firebase Authentication."
                    : "This domain is not authorized in Firebase Authentication.";
        }

        if (
            error &&
            error.code === "auth/account-exists-with-different-credential"
        ) {
            message =
                currentLanguage === "ar"
                    ? "هذا البريد مرتبط بطريقة تسجيل دخول أخرى. جرّب تسجيل الدخول بالبريد الإلكتروني."
                    : "This email is associated with another sign-in method. Try email sign-in.";
        }

        if (
            error &&
            error.code === "auth/popup-blocked"
        ) {
            message =
                currentLanguage === "ar"
                    ? "المتصفح منع نافذة Google. اسمح بالنوافذ المنبثقة وحاول مرة أخرى."
                    : "The browser blocked the Google popup. Allow popups and try again.";
        }

        alert(message);

    } finally {

        if (googleLoginButton) {
            googleLoginButton.disabled = false;
            googleLoginButton.textContent = t("googleLogin");
        }
    }
}


// ======================================================
// PASSWORD RESET
// ======================================================

async function resetUserPassword() {

    try {

        // انتظار تجهيز حفظ الجلسة
        await authPersistenceReady;

        const email = loginEmail
            ? loginEmail.value.trim()
            : "";

        if (!email) {

            alert(
                currentLanguage === "ar"
                    ? "اكتب بريدك الإلكتروني أولاً."
                    : "Please enter your email first."
            );

            return;
        }

        await sendPasswordResetEmail(
            auth,
            email
        );

        alert(
            currentLanguage === "ar"
                ? "تم إرسال رابط استعادة كلمة المرور إلى بريدك الإلكتروني. راجع صندوق الوارد والرسائل غير المرغوب فيها."
                : "A password reset link has been sent to your email. Check your inbox and spam folder."
        );

    } catch (error) {

        console.error(
            "Password reset error:",
            error
        );

        let message =
            currentLanguage === "ar"
                ? "تعذر إرسال رابط استعادة كلمة المرور."
                : "Unable to send password reset email.";

        if (
            error.code === "auth/invalid-email"
        ) {

            message =
                currentLanguage === "ar"
                    ? "البريد الإلكتروني غير صحيح."
                    : "Invalid email address.";
        }

        if (
            error.code === "auth/too-many-requests"
        ) {

            message =
                currentLanguage === "ar"
                    ? "محاولات كثيرة. حاول مرة أخرى لاحقًا."
                    : "Too many attempts. Try again later.";
        }

        alert(message);
    }
}


// ======================================================
// AUTHENTICATION BUTTONS
// ======================================================

if (emailLoginButton) {

    emailLoginButton.addEventListener(
        "click",
        loginWithEmail
    );
}


if (createAccountButton) {

    createAccountButton.addEventListener(
        "click",
        createNewAccount
    );
}


if (googleLoginButton) {

    googleLoginButton.addEventListener(
        "click",
        loginWithGoogle
    );
}


// ======================================================
// PASSWORD RESET BUTTON
// ======================================================

const resetPasswordButton =
    document.getElementById("reset-password-button");

if (resetPasswordButton) {

    resetPasswordButton.addEventListener(
        "click",
        resetUserPassword
    );
}


// ======================================================
// AUTH STATE
// ======================================================

// ======================================================
// فتح البرنامج بعد التأكد من الحساب
// ======================================================

async function openAppForUser(user) {

    if (!user) return;

    // منع تحميل البرنامج أكثر من مرة لنفس المستخدم
    if (
        currentUser &&
        currentUser.uid === user.uid &&
        mainPage &&
        mainPage.style.display !== "none"
    ) {
        return;
    }

    currentUser = user;

    const bottomNavigation =
        document.getElementById("bottom-navigation");

    if (loginPage) {
        loginPage.style.display = "none";
    }

    if (mainPage) {
        mainPage.style.display = "block";
    }

    if (bottomNavigation) {
        bottomNavigation.style.display = "flex";
    }

// مزامنة بيانات الحساب مع السحابة قبل تحميلها
try {

    await syncUserDataWithCloud(user);

} catch (error) {

    console.error(
        "ACT Cloud Sync Error:",
        error
    );

    alert(
        "تعذر الاتصال بالسحابة حاليًا. سيتم فتح البيانات المحلية."
    );

}
// فتح الشاشة الرئيسية بعد تسجيل الدخول
currentSection = "home";

// تحميل بيانات البرنامج
loadUserData();

// الأقسام تعيد تحميل بيانات المستخدم بعد اكتمال المزامنة السحابية.
window.dispatchEvent(new Event("act-user-data-ready"));

ensurePreviousDaysClosed();
if (typeof window.renderDashboardHistory === "function") window.renderDashboardHistory();

// إظهار الرئيسية وإخفاء قسم الأجهزة
const homeSectionOnLogin =
    document.getElementById("home-section");

const devicesSectionOnLogin =
    document.querySelector(".sales-area");

if (devicesSectionOnLogin) {
    devicesSectionOnLogin.style.display = "none";
}

if (homeSectionOnLogin) {
    homeSectionOnLogin.style.display = "block";
};

    applyLanguage();

    applyTheme();
}


// ======================================================
// AUTH SCREEN MODE
// ======================================================

function setAuthScreenMode(mode) {

    // حفظ البريد المرجعي عند تفعيل تسجيل الدخول
    if (mode === "login") {

        authModeBaselineEmail =
            loginEmail
                ? loginEmail.value.trim()
                : "";

        authLoginBaselineActive = true;
    }

    localStorage.setItem(
        "actPhoneManager_authMode",
        mode
    );

    if (emailLoginButton) {
        emailLoginButton.style.display =
            mode === "login" ? "flex" : "none";
    }

    if (createAccountButton) {
        createAccountButton.style.display =
            mode === "create" ? "flex" : "none";
    }
}


// ======================================================
// AUTO SWITCH WHEN EMAIL CHANGES
// ======================================================

if (loginEmail) {

    loginEmail.addEventListener(
        "input",
        function () {

            const currentEmail =
                loginEmail.value.trim();

            // لو تسجيل الدخول لم يتفعل من قبل
            if (!authLoginBaselineActive) {
                setAuthScreenMode("create");
                return;
            }

            // رجع لنفس البريد المرجعي
            if (
                currentEmail === authModeBaselineEmail
            ) {
                setAuthScreenMode("login");
            } else {
                setAuthScreenMode("create");
            }
        }
    );
}


// ======================================================
// عرض شاشة تسجيل الدخول
// ======================================================

function showLoginPage() {

    currentUser = null;

    const bottomNavigation =
        document.getElementById("bottom-navigation");

    if (loginPage) {
        loginPage.style.display = "flex";
    }

    if (mainPage) {
        mainPage.style.display = "none";
    }

    if (bottomNavigation) {
        bottomNavigation.style.display = "none";
    }

    devices = [];

    employees = [];

    // استعادة وضع أزرار تسجيل الدخول
    const savedMode =
        localStorage.getItem(
            "actPhoneManager_authMode"
        );

    if (savedMode === "login") {

        setAuthScreenMode("login");

    } else {

        setAuthScreenMode("create");
    }
}

// ======================================================
// فحص تأكيد البريد عند الرجوع للموقع
// ======================================================

async function checkEmailVerificationOnReturn() {

    const user = auth.currentUser;

    if (!user) return;

    const isEmailAccount =
        user.providerData.some(function (provider) {
            return provider.providerId === "password";
        });

    if (!isEmailAccount) return;

    try {

        await user.reload();

        const refreshedUser = auth.currentUser;

        if (
            refreshedUser &&
            refreshedUser.emailVerified
        ) {

            openAppForUser(refreshedUser);
        }

    } catch (error) {

        console.error(
            "Email verification check error:",
            error
        );
    }
}

// ======================================================
// مراقبة حالة تسجيل الدخول
// ACT SECURE AUTH STATE
// ======================================================

onAuthStateChanged(
    auth,
    async function (user) {

        try {

            // انتظار تجهيز حفظ واستعادة الجلسة
            await authPersistenceReady;

            // لا يوجد مستخدم مسجل
            if (!user) {

                showLoginPage();

                return;
            }

            // التحقق من طريقة تسجيل الدخول
            const isEmailAccount =
                user.providerData.some(function (provider) {

                    return provider.providerId === "password";

                });

          
if (isEmailAccount) {

    // الاحتفاظ بحالة تأكيد البريد المحفوظة على الجهاز
    const wasEmailVerified = user.emailVerified === true;

    // تحديث حالة التأكيد من Firebase عند توفر الإنترنت
    if (navigator.onLine) {

        try {

            await user.reload();

            user = auth.currentUser;

        } catch (error) {

            console.warn(
                "Email verification refresh unavailable:",
                error
            );

            // السماح بالعمل دون إنترنت للحساب المؤكد سابقًا فقط
            if (navigator.onLine || !wasEmailVerified) {

                showLoginPage();

                return;
            }

            user = auth.currentUser || user;
        }
    }

    // منع الدخول إذا لم يكن البريد مؤكدًا
    if (
        !user ||
        !user.emailVerified
    ) {

        showLoginPage();

        return;
    }
}

// فتح البرنامج بعد نجاح التحقق
await openAppForUser(user);

        } catch (error) {

            console.error(
                "Auth state error:",
                error
            );

            showLoginPage();

        }

    }
);
// ======================================================
// فحص التأكيد عند الرجوع من Gmail
// ======================================================

window.addEventListener(
    "focus",
    checkEmailVerificationOnReturn
);

document.addEventListener(
    "visibilitychange",
    function () {

        if (document.visibilityState === "visible") {

            checkEmailVerificationOnReturn();
        }
    }
);
// ======================================================
// LOGOUT
// ======================================================

const logoutButton =
    document.getElementById("logout-button");

if (logoutButton) {

    logoutButton.addEventListener(
        "click",
        async function () {

            try {

                // حفظ وضع تسجيل الدخول قبل الخروج
                setAuthScreenMode("login");

                await signOut(auth);

            } catch (error) {

                console.error(
                    "Logout error:",
                    error
                );

                alert(
                    currentLanguage === "ar"
                        ? "حدث خطأ أثناء تسجيل الخروج."
                        : "Logout failed."
                );
            }
        }
    );
}


// ======================================================
// Local Storage Keys
// ======================================================

function getUserKey(type) {

    if (currentUser) {

        return (
            "actPhoneManager_" +
            type +
            "_" +
            currentUser.uid
        );
    }

    return (
        "actPhoneManager_" +
        type +
        "_guest"
    );
}

// ======================================================
// ACT SMART SYNC QUEUE
// طابور حفظ التغييرات عند انقطاع الإنترنت
// ======================================================

function getCloudQueueKey(uid) {
    return "actPhoneManager_syncQueue_" + uid;
}

function getCloudSyncQueue(uid) {
    try {
        const saved = localStorage.getItem(
            getCloudQueueKey(uid)
        );

        const queue = saved ? JSON.parse(saved) : [];

        return Array.isArray(queue) ? queue : [];

    } catch (error) {
        console.error("ACT Sync Queue Read Error:", error);
        return [];
    }
}

function saveCloudSyncQueue(uid, queue) {
    localStorage.setItem(
        getCloudQueueKey(uid),
        JSON.stringify(queue)
    );
}

// ======================================================
// إضافة أو تحديث عملية داخل الطابور
// ======================================================

function addCloudSyncTask(uid, task) {
    const queue = getCloudSyncQueue(uid);

    // أحدث عملية لنفس المفتاح هي المعتمدة
    const filteredQueue = queue.filter(
        item => item.key !== task.key
    );

    filteredQueue.push({
        ...task,
        id: Date.now() + "_" + Math.random().toString(36).slice(2),
        updatedAt: Date.now()
    });

    saveCloudSyncQueue(uid, filteredQueue);
}

// ======================================================
// تنفيذ طابور المزامنة
// ======================================================

const activeCloudSyncUsers = new Set();

async function flushCloudSyncQueue(user) {

    if (!user || !user.uid || !navigator.onLine) {
        return;
    }

    const uid = user.uid;

    if (activeCloudSyncUsers.has(uid)) {
        return;
    }

    activeCloudSyncUsers.add(uid);

    try {

        while (navigator.onLine) {

            const queue = getCloudSyncQueue(uid);

            if (!queue.length) {
                break;
            }

            const task = queue[0];

            const documentRef = doc(
                db,
                "users",
                uid,
                "appData",
                encodeURIComponent(task.key)
            );

            if (task.type === "delete") {

                await deleteDoc(documentRef);

            } else {

                await setDoc(documentRef, {
                    key: task.key,
                    value: String(task.value),
                    updatedAt: task.updatedAt
                });

            }

            // حذف المهمة التي تم تنفيذها فقط
            const latestQueue = getCloudSyncQueue(uid);

            const updatedQueue = latestQueue.filter(
                item => item.id !== task.id
            );

            saveCloudSyncQueue(uid, updatedQueue);

        }

        console.log(
            "ACT SMART SYNC: Queue completed."
        );

    } catch (error) {

        console.error(
            "ACT SMART SYNC: Waiting for connection.",
            error
        );

    } finally {

        activeCloudSyncUsers.delete(uid);

    }
}

// ======================================================
// ACT CLOUD SYNC
// المزامنة الأولية مع Firestore
// ======================================================

async function syncUserDataWithCloud(user) {

    if (!user || !user.uid) {
        throw new Error("لا يوجد مستخدم صالح للمزامنة.");
    }

    if (!navigator.onLine) {
        throw new Error("لا يوجد اتصال بالإنترنت.");
    }

    const uid = user.uid;

    const cloudCollection = collection(
        db,
        "users",
        uid,
        "appData"
    );

    try {

        // تنفيذ التغييرات المعلقة أولاً
        await flushCloudSyncQueue(user);

        // قراءة البيانات السحابية
        const cloudSnapshot = await getDocs(
            cloudCollection
        );

        const cloudKeys = new Set();

        // جمع مفاتيح المستخدم المحلية
        const localKeys = [];

        for (let i = 0; i < localStorage.length; i++) {

            const key = localStorage.key(i);

            if (
                key &&
                key.startsWith("actPhoneManager_") &&
                (
                    key.endsWith("_" + uid) ||
                    key.includes("_" + uid + "_")
                )
            ) {
                localKeys.push(key);
            }
        }

        // استعادة البيانات السحابية
        cloudSnapshot.forEach(function (documentSnapshot) {

            const data = documentSnapshot.data();

            if (
                !data ||
                typeof data.key !== "string" ||
                typeof data.value !== "string"
            ) {
                return;
            }

            cloudKeys.add(data.key);

            localStorage.setItem(
                data.key,
                data.value
            );

        });

        // رفع البيانات المحلية غير الموجودة في السحابة
        for (const key of localKeys) {

            if (cloudKeys.has(key)) {
                continue;
            }

            const value = localStorage.getItem(key);

            if (value === null) {
                continue;
            }

            await setDoc(
                doc(
                    cloudCollection,
                    encodeURIComponent(key)
                ),
                {
                    key: key,
                    value: value,
                    updatedAt: Date.now()
                }
            );

        }

        console.log(
            "ACT SMART SYNC: Initial synchronization completed."
        );

    } catch (error) {

        console.error(
            "ACT SMART SYNC Error:",
            error
        );

        throw error;

    }
}

// ======================================================
// ACT CLOUD AUTO SAVE
// حفظ محلي وسحابي مع طابور انتظار
// ======================================================

function saveUserDataToCloud(key, value) {

    if (!currentUser || !currentUser.uid) {
        return;
    }

    const uid = currentUser.uid;

    if (
        !key.endsWith("_" + uid) &&
        !key.includes("_" + uid + "_")
    ) {
        return;
    }

    addCloudSyncTask(uid, {
        type: "save",
        key: key,
        value: String(value)
    });

    if (navigator.onLine) {
        flushCloudSyncQueue(currentUser);
    }

}


// Flush pending cloud synchronization when the app is backgrounded or closed.
window.addEventListener("pagehide", function () {
    try { if (currentUser && currentUser.uid && typeof flushCloudSyncQueue === "function" && navigator.onLine) flushCloudSyncQueue(currentUser); } catch (error) { console.warn("ACT final sync attempt failed", error); }
});

// ======================================================
// ACT CLOUD DELETE
// حذف سحابي مع طابور انتظار
// ======================================================

function deleteUserDataFromCloud(key) {

    if (!currentUser || !currentUser.uid) {
        return;
    }

    const uid = currentUser.uid;

    if (
        !key.endsWith("_" + uid) &&
        !key.includes("_" + uid + "_")
    ) {
        return;
    }

    addCloudSyncTask(uid, {
        type: "delete",
        key: key
    });

    if (navigator.onLine) {
        flushCloudSyncQueue(currentUser);
    }

}

// ======================================================
// إعادة المحاولة عند رجوع الإنترنت
// ======================================================

window.addEventListener("online", function () {

    if (currentUser && currentUser.uid) {

        console.log(
            "ACT SMART SYNC: Internet connection restored."
        );

        flushCloudSyncQueue(currentUser);

    }

});



// ======================================================
// ACT SHOP NOTIFICATIONS — PER-ITEM DISMISSAL
// ======================================================
function getDismissedShopNotifications() {
    try {
        const key = getUserKey("shop_notification_dismissed");
        const value = JSON.parse(localStorage.getItem(key) || "[]");
        return Array.isArray(value) ? value.map(String) : [];
    } catch (_) { return []; }
}
function saveDismissedShopNotifications(ids) {
    const key = getUserKey("shop_notification_dismissed");
    const value = JSON.stringify([...new Set(ids.map(String))]);
    localStorage.setItem(key, value);
    if (typeof saveUserDataToCloud === "function") saveUserDataToCloud(key, value);
}
function dismissShopNotification(id) {
    if (!id) return;
    const dismissed = getDismissedShopNotifications();
    if (!dismissed.includes(String(id))) dismissed.push(String(id));
    saveDismissedShopNotifications(dismissed);
    renderShopNotifications();
    window.dispatchEvent(new CustomEvent("act-shop-notifications-updated"));
}

// ====================================================== 
// ACT SHOP NOTIFICATIONS — LIVE RENDERER
// ====================================================== 

function renderShopNotifications() {

    const list = document.getElementById("shop-notifications-list");
    const count = document.getElementById("shop-notifications-count");

    if (!list || !count) return;

    const allDevices = Array.isArray(devices) ? devices : [];

    const statusMap = {
        "قيد الإصلاح": SECTIONS.PENDING,
        "جاهز": SECTIONS.READY,
        "لم يتم الإصلاح": SECTIONS.FAILED,
        "تم التسليم": SECTIONS.DELIVERED
    };

    const details = {
        [SECTIONS.PENDING]: { icon: "🟡", label: "قيد الإصلاح" },
        [SECTIONS.READY]: { icon: "🟢", label: "جاهز للتسليم" },
        [SECTIONS.FAILED]: { icon: "🔴", label: "لم يتم الإصلاح" }
    };

    const escapeNotificationText = value =>
        String(value ?? "").replace(/[&<>"']/g, char => ({
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        })[char]);

    const dismissedIds = getDismissedShopNotifications();
    const notifications = allDevices.filter(device => {
        const category = device.category || statusMap[device.status] || null;
        const notificationId = String(device.id || (device.phoneName + "_" + (device.customerName || "")));
        if (dismissedIds.includes(notificationId)) return false;
        return (
            (device.section === "maintenance" ||
                [SECTIONS.PENDING, SECTIONS.READY, SECTIONS.FAILED, SECTIONS.DELIVERED].includes(category)) &&
            [SECTIONS.PENDING, SECTIONS.READY, SECTIONS.FAILED].includes(category)
        );
    });

    count.textContent = String(notifications.length);
    if (!list.dataset.dismissBound) {
        list.dataset.dismissBound = "1";
        list.addEventListener("click", event => {
            const button = event.target.closest("[data-dismiss-shop-notification]");
            if (!button) return;
            event.preventDefault(); event.stopPropagation();
            dismissShopNotification(button.dataset.dismissShopNotification);
        });
    }

    if (!notifications.length) {
        list.innerHTML = `
            <div class="premium-notification-empty">
                <span>✓</span>
                <strong>لا توجد تنبيهات حالياً</strong>
                <small>المحل يعمل بشكل طبيعي</small>
            </div>
        `;
        return;
    }

    list.innerHTML = notifications.slice(0, 4).map(device => {
        const category = device.category || statusMap[device.status];
        const info = details[category];
        if (!info) return "";

        return `
            <div class="premium-notification-item" data-shop-notification="${escapeNotificationText(device.id || (device.phoneName + "_" + (device.customerName || "")))}">
                <span class="notification-icon">${info.icon}</span>
                <div class="notification-content">
                    <strong>${escapeNotificationText(device.phoneName || "جهاز بدون اسم")}</strong>
                    <small>${info.label} · العميل: ${escapeNotificationText(device.customerName || "غير محدد")}</small>
                </div>
                <button type="button" class="shop-notification-dismiss" data-dismiss-shop-notification="${escapeNotificationText(device.id || (device.phoneName + "_" + (device.customerName || "")))}" aria-label="حذف التنبيه" title="حذف التنبيه">✕</button>
            </div>
        `;
    }).join("");
}


// ====================================================== 

// تحميل البيانات 
// ====================================================== 
 
function loadUserData() { 
 
    try { 
 
        const devicesKey = 
            getUserKey( 
                "devices" 
            ); 
 
        const employeesKey = 
            getUserKey( 
                "employees" 
            ); 
 
 
        const storedDevices = 
            localStorage.getItem( 
                devicesKey 
            ); 
 
        const storedEmployees = 
            localStorage.getItem( 
                employeesKey 
            ); 
 
 
        devices = 
            storedDevices 
                ? JSON.parse( 
                    storedDevices 
                ) 
                : []; 
 
 
        employees = 
            storedEmployees 
                ? JSON.parse( 
                    storedEmployees 
                ) 
                : []; 

                        // ======================================================
        // تحميل سجل عمليات لوحة التحكم
        // ======================================================

        const operationsKey =
            getUserKey(
                "operations"
            );

        const storedOperations =
            localStorage.getItem(
                operationsKey
            );

        dashboardOperations =
            storedOperations
                ? JSON.parse(
                    storedOperations
                )
                : [];

        if (!Array.isArray(dashboardOperations)) {
            dashboardOperations = [];
        }
 
 
        if (!Array.isArray(devices)) { 
            devices = []; 
        } 
 
        if (!Array.isArray(employees)) { 
            employees = []; 
        } 
        normalizeEmployeeAttendanceCodes();
        processAutomaticEmployeeAbsences();
 
 renderCurrentView();

updateEmployeeStats();

renderDashboardOperations();

renderActNotifications();

renderShopNotifications();

    } catch (error) { 
 
        console.error( 
            "Load data error:", 
            error 
        ); 
 
        devices = []; 
 
        employees = []; 
    } 
} 
 
 
// ====================================================== 
// حفظ الأجهزة 
// ====================================================== 
function saveDevices() {

    try {

        const key = getUserKey("devices");

        const value = JSON.stringify(devices);

        // الحفظ المحلي
        localStorage.setItem(
            key,
            value
        );

        // الحفظ السحابي
        saveUserDataToCloud(
            key,
            value
        );
        window.dispatchEvent(new Event("act-user-data-ready"));
        window.dispatchEvent(new Event("act-devices-data-updated"));
        if (typeof addNotificationFromOperation === "function") {
            addNotificationFromOperation({type:"devices",icon:"📱",title:"تم حفظ بيانات الأجهزة",details:"تم تحديث سجل الأجهزة والصيانة"});
        }

    } catch (error) {

        console.error(
            "Save devices error:",
            error
        );

    }
}
 
 
// ====================================================== 
// حفظ العاملين 
// ====================================================== 
 function saveEmployees() {

    try {

        const key = getUserKey("employees");
        const value = JSON.stringify(employees);

        // الحفظ المحلي
        localStorage.setItem(key, value);

        // الحفظ السحابي
        saveUserDataToCloud(key, value);
        window.dispatchEvent(new Event("act-user-data-ready"));
        if (typeof addNotificationFromOperation === "function") {
            addNotificationFromOperation({type:"employees",icon:"👨‍💼",title:"تم حفظ بيانات الموظفين",details:"تم تحديث بيانات العاملين"});
        }

    } catch (error) {

        console.error(
            "Save employees error:",
            error
        );

    }
}
 // ======================================================
// سجل عمليات لوحة التحكم
// ======================================================

let dashboardOperations = [];


// ======================================================
// حفظ سجل العمليات
// ======================================================
function saveDashboardOperations() {

    try {

        const key = getUserKey("operations");
        const value = JSON.stringify(dashboardOperations);

        // الحفظ المحلي
        localStorage.setItem(key, value);

        // الحفظ السحابي
        saveUserDataToCloud(key, value);
        window.dispatchEvent(new Event("act-dashboard-operations-updated"));

    } catch (error) {

        console.error(
            "Save dashboard operations error:",
            error
        );

    }
}
 // ======================================================
// إضافة عملية جديدة + تسجيل إشعار
// ======================================================

function addDashboardOperation({
    type,
    icon = "📌",
    title,
    details = "",
    amount = null
}) {
    const operation = {
        id: createId("operation"),
        type,
        icon,
        title,
        details,
        amount: amount !== null ? Number(amount) || 0 : null,
        createdAt: new Date().toISOString()
    };

    dashboardOperations.unshift(operation);

    // الاحتفاظ بآخر 50 عملية فقط
    dashboardOperations = dashboardOperations.slice(0, 50);

    saveDashboardOperations();
    renderDashboardOperations();

    // تسجيل العملية كإشعار في الجرس
    if (typeof addNotificationFromOperation === "function") {
        addNotificationFromOperation(operation);
    }
}


// ======================================================
// عرض آخر العمليات في لوحة التحكم
// ======================================================

// ======================================================
// عرض آخر العمليات في لوحة التحكم
// ======================================================

function renderDashboardOperations() {

    const container = document.getElementById(
        "dashboard-latest-operations"
    );

    if (!container) return;

    const count = document.getElementById(
        "dashboard-operations-count"
    );

    const today = getToday();

 const todayOperations = dashboardOperations
    .filter(function (operation) {

        const isToday =
            getOperationDate(operation.createdAt) === today;

        const isFinancialOperation = [
            "deposit",
            "withdraw"
        ].includes(operation.type);

        return isToday && isFinancialOperation;
    })
        .sort(function (a, b) {
            return new Date(b.createdAt) - new Date(a.createdAt);
        });

    // تحديث العداد قبل أي return
    if (count) {
        count.textContent = todayOperations.length;
    }

    if (!todayOperations.length) {

        container.innerHTML = `
            <div class="dashboard-operation-empty"
                 style="grid-column:1/-1;text-align:center;padding:25px;opacity:.7;">
                لا توجد عمليات اليوم
            </div>
        `;

        return;
    }

    container.innerHTML = todayOperations.map(function (operation) {

        return `
            <div class="dashboard-operation-card"
                 data-operation-id="${escapeHTML(operation.id)}">

                <button
                    type="button"
                    class="dashboard-operation-delete"
                    data-delete-operation="${escapeHTML(operation.id)}"
                    aria-label="حذف العملية"
                    title="حذف العملية"
                >×</button>

                <div class="operation-icon">
                    ${escapeHTML(operation.icon || "📌")}
                </div>

                <div class="operation-info">
                    <strong>${escapeHTML(operation.title || "")}</strong>

                    ${
                        operation.amount !== null &&
                        operation.amount !== undefined
                            ? `<b>${formatMoney(operation.amount)}</b>`
                            : ""
                    }

                    ${
                        operation.details
                            ? `<small>${escapeHTML(operation.details)}</small>`
                            : ""
                    }

                    <small>
                        ${getCurrentTimeFromDate(operation.createdAt)}
                    </small>
                </div>

            </div>
        `;

    }).join("");
}


// ======================================================
// حذف عملية واحدة من سجل لوحة التحكم
// ======================================================

document.addEventListener("click", function (event) {

    const deleteButton = event.target.closest(
        "[data-delete-operation]"
    );

    if (!deleteButton) return;

    const operationId = deleteButton.dataset.deleteOperation;

    if (!operationId) return;

    if (!confirm("هل تريد حذف هذه العملية من سجل لوحة التحكم؟")) {
        return;
    }

    dashboardOperations = dashboardOperations.filter(function (operation) {
        return String(operation.id) !== String(operationId);
    });

    saveDashboardOperations();
    renderDashboardOperations();

    // تحديث نافذة عرض الكل لو كانت مفتوحة
    const modalList = document.getElementById(
        "dashboard-operations-modal-list"
    );

    const originalList = document.getElementById(
        "dashboard-latest-operations"
    );

    if (modalList && originalList) {
        modalList.replaceChildren(
            ...Array.from(originalList.children).map(function (item) {
                return item.cloneNode(true);
            })
        );
    }

});

function getCurrentTimeFromDate(dateValue) {

    const date =
        new Date(dateValue);

    const hours =
        String(
            date.getHours()
        ).padStart(
            2,
            "0"
        );

    const minutes =
        String(
            date.getMinutes()
        ).padStart(
            2,
            "0"
        );

    return (
        hours +
        ":" +
        minutes
    );
}



// ======================================================
// تاريخ العملية بالتوقيت المحلي
// ======================================================

function getOperationDate(
    dateValue
) {

    const date =
        new Date(
            dateValue
        );

    const year =
        date.getFullYear();

    const month =
        String(
            date.getMonth() + 1
        ).padStart(
            2,
            "0"
        );

    const day =
        String(
            date.getDate()
        ).padStart(
            2,
            "0"
        );

    return (
        year +
        "-" +
        month +
        "-" +
        day
    );
}



// ====================================================== 
// Helpers 
// ====================================================== 
 
function createId( 
    prefix 
) { 
 
    return ( 
        prefix + 
        "_" + 
        Date.now() + 
        "_" + 
        Math.random() 
            .toString(36) 
            .slice(2, 10) 
    ); 
} 
 
 
function escapeHTML( 
    value 
) { 
 
    return String( 
        value == null 
            ? "" 
            : value 
    ) 
        .replace( 
            /&/g, 
            "&amp;" 
        ) 
        .replace( 
            /</g, 
            "&lt;" 
        ) 
        .replace( 
            />/g, 
            "&gt;" 
        ) 
        .replace( 
            /"/g, 
            "&quot;" 
        ) 
        .replace( 
            /'/g, 
            "&#039;" 
        ); 
} 
 
 
function formatMoney( 
    value 
) { 
 
    const number = 
        Number(value) || 0; 
 
    return ( 
        new Intl.NumberFormat( 
            currentLanguage === "ar" 
                ? "ar-EG" 
                : "en-US", 
            { 
                maximumFractionDigits: 2 
            } 
        ).format(number) + 
        ( 
            currentLanguage === "ar" 
                ? " جنيه" 
                : " EGP" 
        ) 
    ); 
} 
 
 
function getToday() { 
 
    const date = 
        new Date(); 
 
    const year = 
        date.getFullYear(); 
 
    const month = 
        String( 
            date.getMonth() + 1 
        ).padStart( 
            2, 
            "0" 
        ); 
 
    const day = 
        String( 
            date.getDate() 
        ).padStart( 
            2, 
            "0" 
        ); 
 
    return ( 
        year + 
        "-" + 
        month + 
        "-" + 
        day 
    ); 
} 

// ======================================================
// 📅 ACT DAILY HISTORY — REAL SALES + DAILY OPERATIONS
// ======================================================
(function () {
    "use strict";

    let weekOffset = 0;
    const $ = id => document.getElementById(id);
    const safeArray = key => {
        try {
            const value = JSON.parse(localStorage.getItem(key) || "[]");
            return Array.isArray(value) ? value : [];
        } catch (_) { return []; }
    };
    const uid = () => (typeof currentUser !== "undefined" && currentUser && currentUser.uid) ? currentUser.uid : "guest";
    const userKey = name => typeof getUserKey === "function" ? getUserKey(name) : `actPhoneManager_${name}_${uid()}`;
    const dateOf = item => {
        const raw = item && (item.date || item.createdAt || item.timestamp || item.time);
        if (!raw) return "";
        if (typeof raw === "number") return new Date(raw).toLocaleDateString("en-CA");
        const text = String(raw);
        if (/^\d{4}-\d{2}-\d{2}/.test(text)) return text.slice(0, 10);
        const parsed = new Date(text);
        return Number.isNaN(parsed.getTime()) ? "" : [parsed.getFullYear(), String(parsed.getMonth()+1).padStart(2,"0"), String(parsed.getDate()).padStart(2,"0")].join("-");
    };
    const amountOf = item => {
        const n = Number(item && (item.total ?? item.paid ?? item.price ?? item.amount ?? item.value ?? 0));
        return Number.isFinite(n) ? n : 0;
    };
    const esc = value => String(value ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
    const money = value => `${Number(value || 0).toLocaleString("ar-EG", {maximumFractionDigits:2})} جنيه`;

    function readSales() {
        const key = typeof getSalesStorageKey === "function" ? getSalesStorageKey() : `actPhoneManager_sales_${uid()}`;
        return safeArray(key);
    }
    function readArchives() {
        return typeof loadDayCloseArchives === "function" ? loadDayCloseArchives() : [];
    }
    function readDayData(date) {
        const archives = readArchives();
        const archive = archives.find(x => x && x.date === date);
        const data = archive && archive.data ? archive.data : {};
        const sales = archive ? (Array.isArray(data.sales) ? data.sales : []) : readSales().filter(x => dateOf(x) === date);
        const purchases = archive ? [...(data.purchases || []), ...(data.independentPurchases || [])] : [...safeArray(userKey("phonePurchases")), ...safeArray(userKey("independentPurchases"))].filter(x => dateOf(x) === date);
        const devicesList = archive ? (data.devices || []) : (Array.isArray(devices) ? devices.filter(x => dateOf({date:x.receiveDate || x.createdAt}) === date) : []);
        const wallet = archive ? (data.wallet || []) : ["withdraw","deposit","recharge","bills","transfer"].flatMap(op => safeArray(`actPhoneManager_wallet_transactions_${op}_${uid()}`).filter(x => dateOf(x) === date));
        const ops = archive ? (data.operations || []) : (Array.isArray(dashboardOperations) ? dashboardOperations.filter(x => dateOf(x) === date) : []);
        let inventory = archive ? (data.inventory || {}) : null;
        if (!archive && date === (typeof getToday === "function" ? getToday() : new Date().toISOString().slice(0,10))) {
            try {
                const rows = JSON.parse(localStorage.getItem(userKey("accessories")) || "[]");
                const accessories = Array.isArray(rows) ? rows : [];
                const saleDevices = Array.isArray(devices) ? devices.filter(item => item.section === "sale" || item.category === "sale" || item.status === "البيع") : [];
                inventory = { devices:saleDevices, accessories, totalAccessoryUnits:accessories.reduce((sum,item)=>sum+(Number(item.quantity)||0),0), accessoryCostValue:accessories.reduce((sum,item)=>sum+(Number(item.quantity)||0)*(Number(item.cost)||0),0), accessoryRetailValue:accessories.reduce((sum,item)=>sum+(Number(item.quantity)||0)*(Number(item.price)||0),0) };
            } catch (_) { inventory = null; }
        }
        const summary = archive && archive.summary ? archive.summary : {};
        const salesTotal = sales.reduce((sum, x) => sum + amountOf(x), 0);
        return { archive, sales, purchases, devices:devicesList, wallet, operations:ops, inventory, count: Number(summary.salesCount ?? sales.length) || 0, total: Number(summary.salesTotal ?? salesTotal) || 0 };
    }

    function collectHistory() {
        const dates = new Set();
        const today = typeof getToday === "function" ? getToday() : new Date().toISOString().slice(0,10);
        readArchives().forEach(x => { if (x && x.date) dates.add(x.date); });
        readSales().forEach(x => { const d = dateOf(x); if (d) dates.add(d); });
        [userKey("phonePurchases"), userKey("independentPurchases")].forEach(k => safeArray(k).forEach(x => { const d=dateOf(x); if(d) dates.add(d); }));
        ["withdraw","deposit","recharge","bills","transfer"].forEach(op => safeArray(`actPhoneManager_wallet_transactions_${op}_${uid()}`).forEach(x => { const d=dateOf(x); if(d) dates.add(d); }));
        if (Array.isArray(devices)) devices.forEach(x => { const d=dateOf({date:x.receiveDate || x.createdAt}); if(d) dates.add(d); });
        if (Array.isArray(dashboardOperations)) dashboardOperations.forEach(x => { const d=dateOf(x); if(d) dates.add(d); });
        dates.add(today);
        return [...dates].filter(d => /^\d{4}-\d{2}-\d{2}$/.test(d) && d <= today).sort().reverse();
    }

    function renderDayDetails(date, target) {
        const day = readDayData(date);
        const groups = [
            ["المبيعات", "🛍️", day.sales, x => `${x.productName || x.phoneName || x.product || x.name || "عملية بيع"} — ${money(amountOf(x))}`],
            ["المشتريات", "📦", day.purchases, x => `${x.productName || x.phoneName || x.product || x.name || "عملية شراء"} — ${money(amountOf(x))}`],
            ["الأجهزة والصيانة", "📱", day.devices, x => `${x.phoneName || x.deviceName || x.model || "جهاز"} — ${x.customerName || x.customer || x.status || "مسجل"}`],
            ["الخزنة والمحفظة", "💳", day.wallet, x => `${x.service || x.operationName || x.operation || "عملية مالية"} — ${money(amountOf(x))}`],
            ["عمليات النظام", "🧾", day.operations, x => `${x.title || x.name || x.description || x.type || "عملية مسجلة"} — ${money(amountOf(x))}`]
        ];
        const content = groups.map(([label, icon, rows, describe]) => {
            if (!Array.isArray(rows) || !rows.length) return "";
            return `<div class="act-daily-detail-group"><h4>${icon} ${label} <small>(${rows.length})</small></h4><ul>${rows.map(x => `<li>${esc(describe(x))}<small>${esc(x.time || x.createdAt || x.date || "")}</small></li>`).join("")}</ul></div>`;
        }).join("");
        const inv = day.inventory;
        const inventoryHtml = inv ? `<div class="act-daily-detail-group"><h4>📦 جرد المخزون اليومي</h4><ul><li>أجهزة معروضة للبيع: ${Number((inv.devices||[]).length)||0}</li><li>أصناف إكسسوارات: ${Number((inv.accessories||[]).length)||0}</li><li>إجمالي قطع الإكسسوارات: ${Number(inv.totalAccessoryUnits)||0}</li><li>قيمة المخزون بالتكلفة: ${money(inv.accessoryCostValue||0)}</li><li>القيمة بسعر البيع: ${money(inv.accessoryRetailValue||0)}</li></ul>${(inv.accessories||[]).length ? `<ul>${inv.accessories.map(item=>`<li>${esc(item.name)} — كمية: ${Number(item.quantity)||0}</li>`).join("")}</ul>` : ""}</div>` : "";
        target.innerHTML = (content + inventoryHtml) || `<div class="dashboard-history-empty"><strong>لا توجد عمليات مسجلة لهذا اليوم.</strong></div>`;
    }

    function renderDashboardHistory() {
        const container = $("dashboard-daily-history");
        const dateElement = $("dashboard-current-date");
        if (!container) return;
        const today = typeof getToday === "function" ? getToday() : new Date().toISOString().slice(0,10);
        if (dateElement) dateElement.textContent = today;
        const dates = collectHistory();
        const maxOffset = Math.max(0, Math.ceil(dates.length / 7) - 1);
        weekOffset = Math.min(weekOffset, maxOffset);
        const start = weekOffset * 7;
        const visible = dates.slice(start, start + 7);
        container.innerHTML = "";
        const controls = document.createElement("div");
        controls.className = "dashboard-history-controls";
        controls.innerHTML = `<button type="button" data-history-newer ${weekOffset === 0 ? "disabled" : ""}>الأحدث ←</button><span>الأسبوع ${weekOffset + 1}</span><button type="button" data-history-older ${start + 7 >= dates.length ? "disabled" : ""}>→ الأقدم</button>`;
        container.appendChild(controls);
        controls.querySelector("[data-history-newer]").addEventListener("click", () => { if (weekOffset > 0) { weekOffset--; renderDashboardHistory(); } });
        controls.querySelector("[data-history-older]").addEventListener("click", () => { if ((weekOffset + 1) * 7 < dates.length) { weekOffset++; renderDashboardHistory(); } });
        if (!visible.length) {
            container.insertAdjacentHTML("beforeend", `<div class="dashboard-history-empty"><span>📅</span><strong>لا توجد بيانات حتى الآن</strong><small>ستظهر الأيام هنا عند تسجيل أول عملية.</small></div>`);
            return;
        }
        visible.forEach(date => {
            const day = readDayData(date);
            const card = document.createElement("article");
            card.className = "dashboard-history-card act-daily-history-card";
            card.innerHTML = `<div class="act-daily-history-summary"><div><span>📅 التاريخ</span><strong>${esc(date)}</strong></div><div><span>عدد المبيعات</span><strong>${day.count}</strong></div><div><span>إجمالي المبيعات</span><strong>${money(day.total)}</strong></div><button type="button" class="act-daily-expand" aria-expanded="false" aria-label="عرض عمليات يوم ${esc(date)}">⌄</button></div><div class="act-daily-history-details" hidden></div>`;
            const button = card.querySelector(".act-daily-expand");
            const details = card.querySelector(".act-daily-history-details");
            button.addEventListener("click", () => {
                const opening = details.hidden;
                details.hidden = !opening;
                button.setAttribute("aria-expanded", String(opening));
                button.textContent = opening ? "⌃" : "⌄";
                if (opening && !details.dataset.loaded) { renderDayDetails(date, details); details.dataset.loaded = "1"; }
            });
            container.appendChild(card);
        });
    }

    window.renderDashboardHistory = renderDashboardHistory;
    window.addEventListener("act-user-data-ready", renderDashboardHistory);
    window.addEventListener("act-sales-data-updated", renderDashboardHistory);
    window.addEventListener("act-dashboard-operations-updated", renderDashboardHistory);
    window.addEventListener("act-wallet-data-updated", renderDashboardHistory);
    window.addEventListener("storage", event => { if (!event.key || event.key.includes("actPhoneManager_")) renderDashboardHistory(); });
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", renderDashboardHistory);
    else renderDashboardHistory();
})();


// ======================================================
// 🔒 نظام إقفال اليوم - أرشيف الأيام
// ======================================================

function getDayCloseStorageKey() {

    return getUserKey("day_closes");

}


// ======================================================
// تحميل أرشيف الأيام
// ======================================================

function loadDayCloseArchives() {

    try {

        const stored =
            localStorage.getItem(
                getDayCloseStorageKey()
            );

        if (!stored) {
            return [];
        }

        const archives =
            JSON.parse(stored);

        return Array.isArray(archives)
            ? archives
            : [];

    } catch (error) {

        console.error(
            "Load day close archives error:",
            error
        );

        return [];
    }
}


// ======================================================
// حفظ أرشيف الأيام
// ======================================================
function saveDayCloseArchives(archives) {

    try {

        const key = getDayCloseStorageKey();
        const value = JSON.stringify(archives);

        // الحفظ المحلي
        localStorage.setItem(
            key,
            value
        );

        // الحفظ السحابي
        saveUserDataToCloud(
            key,
            value
        );
        if (typeof window.renderDashboardHistory === "function") window.renderDashboardHistory();

    } catch (error) {

        console.error(
            "Save day close archives error:",
            error
        );

    }
}




// ======================================================
// 🔒 إنشاء لقطة كاملة لليوم المقفول
// ======================================================

function createDayCloseSnapshot(dateKey) {

    const userId =
        typeof currentUser !== "undefined" &&
        currentUser &&
        currentUser.uid
            ? currentUser.uid
            : "guest";


    // ==================================================
    // 📱 الأجهزة + الصيانة
    // ==================================================

    const dayDevices =
        Array.isArray(devices)
            ? devices.filter(function (device) {

                const deviceDate =
                    device.receiveDate ||
                    (
                        device.createdAt
                            ? device.createdAt.slice(0, 10)
                            : ""
                    );

                return deviceDate === dateKey;

            })
            : [];


            const dayMaintenance =
    dayDevices.filter(function (device) {
        return device.section === "maintenance";
    });

    // ==================================================
    // 🛒 المبيعات
    // ==================================================

    let daySales = [];

    try {

        const salesKey =
            typeof getSalesStorageKey === "function"
                ? getSalesStorageKey()
                : (
                    userId === "guest"
                        ? "actPhoneManager_sales_guest"
                        : "actPhoneManager_sales_" + userId
                );

        const savedSales =
            JSON.parse(
                localStorage.getItem(
                    salesKey
                ) || "[]"
            );

        if (Array.isArray(savedSales)) {

            daySales =
                savedSales.filter(
                    function (sale) {

                        const saleDate =
                            sale.date ||
                            sale.createdAt ||
                            "";

                        return (
                            saleDate.slice(0, 10) ===
                            dateKey
                        );

                    }
                );

        }

    } catch (error) {

        console.error(
            "Day close sales error:",
            error
        );

    }


    // ==================================================
    // 📦 المشتريات
    // ==================================================

    let dayPurchases = [];

    try {

        const purchaseData =
            JSON.parse(
                localStorage.getItem(
                    getUserKey("phonePurchases")
                ) || "[]"
            );

        if (Array.isArray(purchaseData)) {

            dayPurchases =
                purchaseData.filter(
                    function (purchase) {

                        const purchaseDate =
                            purchase.date ||
                            purchase.createdAt ||
                            "";

                        return (
                            purchaseDate.slice(0, 10) ===
                            dateKey
                        );

                    }
                );

        }

    } catch (error) {

        console.error(
            "Day close purchases error:",
            error
        );

    }


    // ==================================================
    // 🧾 المشتريات المستقلة
    // ==================================================

    let dayIndependentPurchases = [];
    try {
        const key = getUserKey("independentPurchases");
        const saved = JSON.parse(localStorage.getItem(key) || "[]");
        if (Array.isArray(saved)) {
            dayIndependentPurchases = saved.filter(function (purchase) {
                const value = purchase.date || purchase.createdAt || "";
                return String(value).slice(0, 10) === dateKey;
            });
        }
    } catch (error) {
        console.error("Day close independent purchases error:", error);
    }

    // ==================================================
    // 💳 المحفظة
    // ==================================================

    const walletOperations = [
        "withdraw",
        "deposit",
        "recharge",
        "bills",
        "transfer"
    ];

    const dayWalletTransactions = [];


    walletOperations.forEach(
        function (operation) {

            try {

                const key =
                    "actPhoneManager_wallet_transactions_" +
                    operation +
                    "_" +
                    userId;

                const data =
                    JSON.parse(
                        localStorage.getItem(
                            key
                        ) || "[]"
                    );

                if (Array.isArray(data)) {

                    data.forEach(
                        function (transaction) {

                            const transactionDate =
                                transaction.date ||
                                "";

                            if (
                                transactionDate.slice(0, 10) ===
                                dateKey
                            ) {

                                dayWalletTransactions.push({
                                    ...transaction
                                });

                            }

                        }
                    );

                }

            } catch (error) {

                console.error(
                    "Day close wallet error:",
                    operation,
                    error
                );

            }

        }
    );


    // ==================================================
    // 👨‍💼 الموظفين
    // ==================================================

    let employeesSnapshot = [];

    try {

        const employeesKey =
            currentUser &&
            currentUser.uid
                ? "actPhoneManager_employees_" +
                  currentUser.uid
                : "actPhoneManager_employees_guest";

        const savedEmployees =
            JSON.parse(
                localStorage.getItem(
                    employeesKey
                ) || "[]"
            );

        if (Array.isArray(savedEmployees)) {

            employeesSnapshot =
                savedEmployees.map(
                    function (employee) {

                        const attendance =
                            employee.attendance || {};

                        const loans =
                            Array.isArray(
                                employee.loans
                            )
                                ? employee.loans.filter(
                                    function (loan) {

                                        return (
                                            loan.date ===
                                            dateKey
                                        );

                                    }
                                )
                                : [];

                        const bonuses =
                            Array.isArray(
                                employee.bonuses
                            )
                                ? employee.bonuses.filter(
                                    function (bonus) {

                                        return (
                                            bonus.date ===
                                            dateKey
                                        );

                                    }
                                )
                                : [];

                        return {

                            ...employee,

                            attendance: {
                                [dateKey]:
                                    attendance[dateKey] ||
                                    null
                            },

                            loans,

                            bonuses

                        };

                    }
                );

        }

    } catch (error) {

        console.error(
            "Day close employees error:",
            error
        );

    }


    // ==================================================
    // 📦 جرد المخزون اليومي (الأجهزة المعروضة + الإكسسوارات)
    // ==================================================
    let inventorySnapshot = { devices: [], accessories: [], totalAccessoryUnits: 0, accessoryCostValue: 0, accessoryRetailValue: 0 };
    try {
        const accessoryKey = getUserKey("accessories");
        const accessoryRows = JSON.parse(localStorage.getItem(accessoryKey) || "[]");
        const allAccessories = Array.isArray(accessoryRows) ? accessoryRows : [];
        const saleDevices = Array.isArray(devices) ? devices.filter(item => item.section === "sale" || item.category === "sale" || item.status === "البيع") : [];
        inventorySnapshot = {
            devices: saleDevices.map(item => ({ id:item.id, name:item.phoneName || item.deviceName || item.model || "جهاز", quantity:1, status:item.status || "متاح", cost:Number(item.purchasePrice || item.cost || 0), price:Number(item.salePrice || item.price || 0) })),
            accessories: allAccessories.map(item => ({ id:item.id, name:item.name || "صنف", code:item.code || "", quantity:Number(item.quantity) || 0, cost:Number(item.cost) || 0, price:Number(item.price) || 0 })),
            totalAccessoryUnits: allAccessories.reduce((sum,item)=>sum+(Number(item.quantity)||0),0),
            accessoryCostValue: allAccessories.reduce((sum,item)=>sum+(Number(item.quantity)||0)*(Number(item.cost)||0),0),
            accessoryRetailValue: allAccessories.reduce((sum,item)=>sum+(Number(item.quantity)||0)*(Number(item.price)||0),0)
        };
    } catch (inventoryError) { console.warn("Daily inventory snapshot error", inventoryError); }

    // ==================================================
    // 📊 العمليات العامة
    // ==================================================

    const dayOperations =
        Array.isArray(dashboardOperations)
            ? dashboardOperations.filter(
                function (operation) {

                    return (
                        getOperationDate(
                            operation.createdAt
                        ) ===
                        dateKey
                    );

                }
            )
            : [];


    // ==================================================
    // 💰 الإجماليات
    // ==================================================

    const salesTotal =
        daySales.reduce(
            function (total, sale) {

                return (
                    total +
                    Number(
                        sale.total ||
                        sale.price ||
                        0
                    )
                );

            },
            0
        );


    const purchasesTotal =
        dayPurchases.reduce(
            function (total, purchase) {

                return (
                    total +
                    Number(
                        purchase.price ||
                        0
                    )
                );

            },
            0
        );


    const independentPurchasesTotal = dayIndependentPurchases.reduce(function (total, purchase) {
        return total + Number(purchase.total || purchase.price || 0);
    }, 0);

    const walletWithdrawTotal =
        dayWalletTransactions
            .filter(
                function (transaction) {

                    return (
                        transaction.operation ===
                        "withdraw"
                    );

                }
            )
            .reduce(
                function (total, transaction) {

                    return (
                        total +
                        Number(
                            transaction.amount ||
                            0
                        )
                    );

                },
                0
            );


    const walletDepositTotal =
        dayWalletTransactions
            .filter(
                function (transaction) {

                    return (
                        transaction.operation ===
                        "deposit"
                    );

                }
            )
            .reduce(
                function (total, transaction) {

                    return (
                        total +
                        Number(
                            transaction.amount ||
                            0
                        )
                    );

                },
                0
            );


    // ==================================================
    // 🔒 اللقطة النهائية
    // ==================================================

    return {

        date:
            dateKey,

        closedAt:
            new Date().toISOString(),

        operationsCount:
            dayOperations.length,

        totalAmount:
            salesTotal,

        summary: {

            salesCount:
                daySales.length,

            salesTotal:
                salesTotal,

            purchasesCount:
                dayPurchases.length + dayIndependentPurchases.length,

            purchasesTotal:
                purchasesTotal + independentPurchasesTotal,

            devicesCount:
                dayDevices.length,

            walletTransactionsCount:
                dayWalletTransactions.length,

            walletWithdrawTotal:
                walletWithdrawTotal,

            walletDepositTotal:
                walletDepositTotal,

            employeesCount:
                employeesSnapshot.length,
            inventoryDeviceCount: inventorySnapshot.devices.length,
            inventoryAccessoryTypes: inventorySnapshot.accessories.length,
            inventoryAccessoryUnits: inventorySnapshot.totalAccessoryUnits,
            inventoryAccessoryCostValue: inventorySnapshot.accessoryCostValue,
            inventoryAccessoryRetailValue: inventorySnapshot.accessoryRetailValue

        },

        data: {

            devices:
                dayDevices,

                maintenance:
        dayMaintenance,

            sales:
                daySales,

            purchases:
                dayPurchases,

            independentPurchases:
                dayIndependentPurchases,

            wallet:
                dayWalletTransactions,

            employees:
                employeesSnapshot,

            inventory:
                inventorySnapshot,

            operations:
                dayOperations

        }

    };

}


// ======================================================
// إقفال يوم واحد وحفظه
// ======================================================

function closeDay(
    dateKey
) {

    const archives =
        loadDayCloseArchives();


    const alreadyClosed =
        archives.some(
            function (archive) {

                return (
                    archive.date ===
                    dateKey
                );

            }
        );


    if (alreadyClosed) {

        return false;

    }


    const snapshot =
        createDayCloseSnapshot(
            dateKey
        );


    archives.push(
        snapshot
    );


    archives.sort(
        function (a, b) {

            return (
                b.date.localeCompare(
                    a.date
                )
            );

        }
    );


    saveDayCloseArchives(
        archives
    );


    return true;

}

// ======================================================
// إقفال الأيام السابقة تلقائيًا
// ======================================================

function ensurePreviousDaysClosed() {

    const today = getToday();

    const archives = loadDayCloseArchives();

    const knownDates = new Set(
        archives.map(function (archive) {
            return archive.date;
        })
    );

    const datesToArchive = new Set();

    // تحويل التاريخ إلى YYYY-MM-DD بالتوقيت المحلي
    function getLocalDateKey(date) {

        const year = date.getFullYear();

        const month = String(
            date.getMonth() + 1
        ).padStart(2, "0");

        const day = String(
            date.getDate()
        ).padStart(2, "0");

        return year + "-" + month + "-" + day;
    }

    // إضافة تاريخ سابق لم يتم حفظه من قبل
    function addPastDate(value) {

        if (!value) {
            return;
        }

        const date = String(value).slice(0, 10);

        if (
            /^\d{4}-\d{2}-\d{2}$/.test(date) &&
            date < today &&
            !knownDates.has(date)
        ) {
            datesToArchive.add(date);
        }
    }

    // الأجهزة والصيانة
    if (Array.isArray(devices)) {

        devices.forEach(function (item) {

            addPastDate(
                item.receiveDate ||
                item.createdAt
            );

        });

    }

    // المبيعات
    try {

        const salesKey =
            currentUser && currentUser.uid
                ? "actPhoneManager_sales_" + currentUser.uid
                : "actPhoneManager_sales_guest";

        const sales = JSON.parse(
            localStorage.getItem(salesKey) || "[]"
        );

        if (Array.isArray(sales)) {

            sales.forEach(function (item) {

                addPastDate(
                    item.date || item.createdAt
                );

            });

        }

    } catch (error) {

        console.error(
            "Day close sales error:",
            error
        );

    }

    // المشتريات
    try {

        const purchases = JSON.parse(
            localStorage.getItem(
                getUserKey("phonePurchases")
            ) || "[]"
        );

        if (Array.isArray(purchases)) {

            purchases.forEach(function (item) {

                addPastDate(
                    item.date || item.createdAt
                );

            });

        }

    } catch (error) {

        console.error(
            "Day close purchases error:",
            error
        );

    }

    // عمليات المحفظة
    [
        "withdraw",
        "deposit",
        "recharge",
        "bills",
        "transfer"
    ].forEach(function (operation) {

        try {

            const userId =
                currentUser && currentUser.uid
                    ? currentUser.uid
                    : "guest";

            const key =
                "actPhoneManager_wallet_transactions_" +
                operation +
                "_" +
                userId;

            const transactions = JSON.parse(
                localStorage.getItem(key) || "[]"
            );

            if (Array.isArray(transactions)) {

                transactions.forEach(function (item) {

                    addPastDate(
                        item.date || item.createdAt
                    );

                });

            }

        } catch (error) {

            console.error(
                "Day close wallet error:",
                operation,
                error
            );

        }

    });

    // العمليات العامة
    if (Array.isArray(dashboardOperations)) {

        dashboardOperations.forEach(function (item) {

            addPastDate(
                item.createdAt
            );

        });

    }

    // استكمال الأيام الناقصة بعد آخر يوم محفوظ
    if (archives.length) {

        const latestArchiveDate = archives.reduce(
            function (latest, archive) {

                return archive.date > latest
                    ? archive.date
                    : latest;

            },
            ""
        );

        if (
            latestArchiveDate &&
            latestArchiveDate < today
        ) {

            const cursor = new Date(
                latestArchiveDate + "T00:00:00"
            );

            cursor.setDate(
                cursor.getDate() + 1
            );

            while (
                getLocalDateKey(cursor) < today
            ) {

                const date = getLocalDateKey(cursor);

                if (!knownDates.has(date)) {
                    datesToArchive.add(date);
                }

                cursor.setDate(
                    cursor.getDate() + 1
                );

            }

        }

    }

    // حفظ يوم أمس عند الانتقال إلى يوم جديد
    const yesterday = new Date();

    yesterday.setDate(
        yesterday.getDate() - 1
    );

    const yesterdayKey = getLocalDateKey(yesterday);

    if (!knownDates.has(yesterdayKey)) {

        datesToArchive.add(yesterdayKey);

    }

    // تسجيل غياب الأيام التي انتهت ولم يسجل العامل فيها حضورًا، ثم حفظ الجرد اليومي.
    [...datesToArchive]
        .sort()
        .forEach(function (date) {
            let attendanceChanged = false;
            if (Array.isArray(employees)) {
                employees.forEach(function(employee) {
                    if (!employee || (employee.startDate && employee.startDate > date)) return;
                    if (!employee.attendance) employee.attendance = {};
                    if (!employee.attendance[date]) {
                        employee.attendance[date] = "absent";
                        employee.attendanceMeta = employee.attendanceMeta || {};
                        employee.attendanceMeta[date] = { automatic: true, backfilled: true, at: new Date().toISOString() };
                        attendanceChanged = true;
                    }
                });
            }
            if (attendanceChanged && typeof saveEmployees === "function") saveEmployees();
            closeDay(date);
        });

}

// متابعة انتقال التاريخ حتى لو ظل البرنامج مفتوحًا طوال الليل.
(function initDailyRolloverWatcher() {
    let observedDate = getToday();
    window.setInterval(function() {
        const currentDate = getToday();
        if (currentDate !== observedDate) {
            observedDate = currentDate;
            if (typeof processAutomaticEmployeeAbsences === "function") processAutomaticEmployeeAbsences();
            if (typeof ensurePreviousDaysClosed === "function") ensurePreviousDaysClosed();
            if (typeof window.renderDashboardHistory === "function") window.renderDashboardHistory();
        }
    }, 60000);
})();

// ======================================================
// تنسيق تاريخ اليوم للجرد
// ======================================================

function formatDayCloseDate(
    dateKey
) {

    const date =
        new Date(
            dateKey + "T00:00:00"
        );


    return date.toLocaleDateString(
        "ar-EG",
        {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric"
        }
    );

}


// ======================================================
// 🔒 عرض جرد اليوم
// ======================================================

function renderDayCloseCurrentSummary() {

    const container =
        document.getElementById(
            "day-close-current-summary"
        );

    if (!container) {
        return;
    }

    const today =
        getToday();

    const snapshot =
        createDayCloseSnapshot(today);

    const summary =
        snapshot.summary || {};

    container.innerHTML = `

        <div
            style="
                display:grid;
                grid-template-columns:
                    repeat(
                        auto-fit,
                        minmax(180px, 1fr)
                    );
                gap:15px;
                margin-top:20px;
            "
        >

            <div class="day-close-summary-card">
                📱
                <strong>
                    الأجهزة
                </strong>
                <span>
                    ${summary.devicesCount || 0}
                </span>
            </div>


            <div class="day-close-summary-card">
                🛒
                <strong>
                    المبيعات
                </strong>
                <span>
                    ${summary.salesCount || 0}
                </span>
                <small>
                    ${formatMoney(summary.salesTotal || 0)}
                </small>
            </div>


            <div class="day-close-summary-card">
                📦
                <strong>
                    المشتريات
                </strong>
                <span>
                    ${summary.purchasesCount || 0}
                </span>
                <small>
                    ${formatMoney(summary.purchasesTotal || 0)}
                </small>
            </div>


            <div class="day-close-summary-card">
                💳
                <strong>
                    عمليات المحفظة
                </strong>
                <span>
                    ${summary.walletTransactionsCount || 0}
                </span>
            </div>


            <div class="day-close-summary-card">
                💰
                <strong>
                    إيداع المحفظة
                </strong>
                <small>
                    ${formatMoney(summary.walletDepositTotal || 0)}
                </small>
            </div>


            <div class="day-close-summary-card">
                💸
                <strong>
                    سحب المحفظة
                </strong>
                <small>
                    ${formatMoney(summary.walletWithdrawTotal || 0)}
                </small>
            </div>


            <div class="day-close-summary-card">
                👨‍💼
                <strong>
                    الموظفين
                </strong>
                <span>
                    ${summary.employeesCount || 0}
                </span>
            </div>

        </div>

    `;

}

// ======================================================
// عرض سجل الأيام السابقة
// ======================================================

function renderPreviousDays() {

    const container =
        document.getElementById(
            "previous-days-list"
        );


    if (!container) {
        return;
    }


    const archives =
        loadDayCloseArchives();


    if (!archives.length) {

        container.innerHTML = `
            <div
                style="
                    padding:25px;
                    text-align:center;
                    opacity:.7;
                "
            >
                لا توجد أيام سابقة محفوظة حتى الآن
            </div>
        `;

        return;

    }


    const months = {};


    archives.forEach(
        function (archive) {

            const monthKey =
                archive.date.slice(
                    0,
                    7
                );


            if (!months[monthKey]) {
                months[monthKey] = [];
            }


            months[monthKey].push(
                archive
            );

        }
    );


    const sortedMonths =
        Object.keys(months).sort(
            function (a, b) {

                return b.localeCompare(a);

            }
        );


    container.innerHTML =
        sortedMonths
            .map(
                function (monthKey) {

                    const monthDate =
                        new Date(
                            monthKey +
                            "-01T00:00:00"
                        );


                    const monthName =
                        monthDate.toLocaleDateString(
                            "ar-EG",
                            {
                                year:
                                    "numeric",
                                month:
                                    "long"
                            }
                        );


                    const days =
                        months[
                            monthKey
                        ].sort(
                            function (a, b) {

                                return b.date.localeCompare(
                                    a.date
                                );

                            }
                        );


                    return `
                        <div
                            class="day-close-month"
                            style="
                                margin-bottom:20px;
                                padding:20px;
                                border-radius:18px;
                                border:1px solid rgba(255,255,255,.10);
                                background:rgba(255,255,255,.04);
                            "
                        >

                            <h3
                                style="
                                    margin:0 0 15px;
                                "
                            >
                                📅 ${monthName}
                            </h3>

                            <div
                                style="
                                    display:grid;
                                    grid-template-columns:
                                        repeat(
                                            auto-fit,
                                            minmax(
                                                180px,
                                                1fr
                                            )
                                        );
                                    gap:12px;
                                "
                            >

                                ${days.map(
                                    function (day) {

                                        return `
                                            <button
                                                type="button"
                                                class="day-close-day-card"
                                                data-day-close-date="${day.date}"
                                                style="
                                                    padding:16px;
                                                    border-radius:14px;
                                                    border:1px solid rgba(255,255,255,.08);
                                                    background:rgba(255,255,255,.03);
                                                    color:inherit;
                                                    cursor:pointer;
                                                    text-align:right;
                                                "
                                            >

                                                <strong>
                                                    🗓️
                                                    ${formatDayCloseDate(
                                                        day.date
                                                    )}
                                                </strong>

                                                <small
                                                    style="
                                                        display:block;
                                                        margin-top:8px;
                                                        opacity:.7;
                                                    "
                                                >
                                                    ${day.operationsCount}
                                                    عملية
                                                </small>

                                            </button>
                                        `;

                                    }
                                ).join("")}

                            </div>

                        </div>
                    `;

                }
            )
            .join("");


    container
        .querySelectorAll(
            ".day-close-day-card"
        )
        .forEach(
            function (button) {

                button.addEventListener(
                    "click",
                    function () {

                        const date =
                            button.dataset
                                .dayCloseDate;

                        openDayCloseDetails(
                            date
                        );

                    }
                );

            }
        );

}


// ======================================================
// تفاصيل يوم محفوظ
// ======================================================

function openDayCloseDetails(
    dateKey
) {

    const archives =
        loadDayCloseArchives();


    const archive =
        archives.find(
            function (item) {

                return (
                    item.date ===
                    dateKey
                );

            }
        );


    if (!archive) {
        return;
    }


    let message =
        formatDayCloseDate(
            archive.date
        );


    message +=
        "\n\nعدد العمليات: " +
        archive.operationsCount;


    message +=
        "\nإجمالي قيمة العمليات: " +
        formatMoney(
            archive.totalAmount
        );


    alert(
        message
    );

}


// ======================================================
// تجهيز أرشيف الأيام عند تحميل النظام
// ======================================================



function getCurrentTime() { 
 
    const date = 
        new Date(); 
 
    const hours = 
        String( 
            date.getHours() 
        ).padStart( 
            2, 
            "0" 
        ); 
 
    const minutes = 
        String( 
            date.getMinutes() 
        ).padStart( 
            2, 
            "0" 
        ); 
 
    return ( 
        hours + 
        ":" + 
        minutes 
    ); 
} 
 
 
// ====================================================== 
// السيريال 
// ====================================================== 
 
function ensureSerialField() { 
 
    if (!deviceForm) { 
        return; 
    } 
 
    serialNumber = 
        document.getElementById( 
            "serial-number" 
        ); 
 
    if (serialNumber) { 
        return; 
    } 
 
 
    const wrapper = 
        document.createElement( 
            "div" 
        ); 
 
    wrapper.className = 
        "form-group serial-field-wrapper"; 
 
    wrapper.innerHTML = ` 
        <label for="serial-number"> 
            🔢 ${currentLanguage === "ar" ? "سيريال الجهاز" : "Device Serial"} 
        </label> 
 
        <input 
            type="text" 
            id="serial-number" 
            autocomplete="off" 
            placeholder="${ 
                currentLanguage === "ar" 
                    ? "أدخل سيريال الجهاز" 
                    : "Enter device serial" 
            }" 
        > 
    `; 
 
 
    const notesField = 
        notes 
            ? notes.closest( 
                ".form-group" 
            ) 
            : null; 
 
 
    if (notesField) { 
 
        notesField.parentNode.insertBefore( 
            wrapper, 
            notesField 
        ); 
 
    } else { 
 
        deviceForm.appendChild( 
            wrapper 
        ); 
    } 
 
 
    serialNumber = 
        document.getElementById( 
            "serial-number" 
        ); 
} 
 
 
// ====================================================== 
// إخفاء الأقسام الرئيسية 
// ====================================================== 
 
function hideAllMainSections() { 
 
    if (salesArea) { 
 
        salesArea.style.display = 
            "none"; 
    } 
 
    if (customersSection) { 
 
        customersSection.style.display = 
            "none"; 
    } 
 
    if (employeesSection) { 
 
        employeesSection.style.display = 
            "none"; 
    } 
} 
 
// ======================================================
// عرض البيع
// ======================================================

function showSalesArea() {

    hideAllMainSections();

    if (salesArea) {

        salesArea.style.display =
            "block";
    }

    currentSection =
        SECTIONS.SALE;

    formSection =
        SECTIONS.SALE;

    closeMaintenanceView();

    hideEmployeeViews();

    hideSaleSearch();


    // ==========================================
    // إغلاق نموذج إضافة الجهاز عند دخول القسم
    // ==========================================

    if (deviceForm) {

        deviceForm.style.display =
            "none";
    }


    renderSaleDevices();
}

// ====================================================== 
// عرض العملاء والصيانة 
// ====================================================== 
 
function showCustomersArea() { 
 
    hideAllMainSections(); 
 
    if (customersSection) { 
 
        customersSection.style.display = 
            "block"; 
    } 
 
    if (deviceForm) { 
 
        deviceForm.style.display = 
            "none"; 
    } 
 
    if (deviceList) { 
 
        deviceList.style.display = 
            "none"; 
    } 
 
    if (saleAddButton) { 
 
        saleAddButton.style.display = 
            "none"; 
    } 
 
    closeMaintenanceView(); 
 
    hideEmployeeViews(); 
} 
 
 
// ====================================================== 
// عرض العاملين 
// ====================================================== 
 
function showEmployeesArea() { 
 
    hideAllMainSections(); 
 
    if (employeesSection) { 
 
        employeesSection.style.display = 
            "block"; 
    } 
 
    if (saleAddButton) { 
 
        saleAddButton.style.display = 
            "none"; 
    } 
 
    if (deviceForm) { 
 
        deviceForm.style.display = 
            "none"; 
    } 
 
    if (deviceList) { 
 
        deviceList.style.display = 
            "none"; 
    } 
 
    closeMaintenanceView(); 
 
    showEmployeeMain(); 
 
    if (employeeSearchInput) { 
 
        employeeSearchInput.parentElement.style.display = 
            "block"; 
    } 
 
    renderEmployees(); 
 
    updateEmployeeStats(); 
} 
 
 
// ====================================================== 
// الأقسام الرئيسية 
// ====================================================== 
 
if (sectionButtons.length) { 
 
    sectionButtons.forEach( 
        function ( 
            button, 
            index 
        ) { 
 
            button.addEventListener( 
                "click", 
                function () { 
 
                    sectionButtons.forEach( 
                        item => 
                            item.classList.remove( 
                                "active" 
                            ) 
                    ); 
 
                    button.classList.add( 
                        "active" 
                    ); 
 
 
                    if (index === 0) { 
 
                        showSalesArea(); 
                    } 
 
 
                    if (index === 1) { 
 
                        showCustomersArea(); 
                    } 
 
 
                    if (index === 2) { 
 
                        showEmployeesArea(); 
                    } 
                } 
            ); 
        } 
    ); 
} 
 
 
if (employeesSectionButton) { 
 
    employeesSectionButton.addEventListener( 
        "click", 
        showEmployeesArea 
    ); 
} 
 
 
// ====================================================== 
// نموذج الجهاز 
// ====================================================== 
 
function clearDeviceForm() { 
 
    if (phoneName) { 
 
        phoneName.value = 
            ""; 
    } 
 
    if (customerName) { 
 
        customerName.value = 
            ""; 
    } 
 
    if (receiveDate) { 
 
        receiveDate.value = 
            getToday(); 
    } 
 
    if (receiveTime) { 
 
        receiveTime.value = 
            getCurrentTime(); 
    } 
 
    if (problem) { 
 
        problem.value = 
            ""; 
    } 
 
    if (changedParts) { 
 
        changedParts.value = 
            ""; 
    } 
 
    if (price) { 
 
        price.value = 
            ""; 
    } 
 
    if (notes) { 
 
        notes.value = 
            ""; 
    } 
 
    ensureSerialField(); 
 
    if (serialNumber) { 
 
        serialNumber.value = 
            ""; 
    } 
} 
 
 
function openDeviceForm() { 
 
    currentSection = 
        SECTIONS.SALE; 
 
    formSection = 
        SECTIONS.SALE; 
 
 
    if (deviceForm) { 
 
        deviceForm.style.display = 
            "block"; 
 
        deviceForm.scrollIntoView({ 
            behavior: 
                "smooth", 
            block: 
                "start" 
        }); 
    } 
 
 
    if (!editingDeviceId) { 
 
        clearDeviceForm(); 
    } 
} 
 
 
function closeDeviceForm() { 
 
    editingDeviceId = 
        null; 
 
    if (deviceForm) { 
 
        deviceForm.style.display = 
            "none"; 
    } 
 
    clearDeviceForm(); 
} 
 
 
if (saleAddButton) { 
 
    saleAddButton.addEventListener( 
        "click", 
        function () { 
 
            editingDeviceId = 
                null; 
 
            openDeviceForm(); 
        } 
    ); 
} 
 
 
if (closeDeviceFormButton) { 
 
    closeDeviceFormButton.addEventListener( 
        "click", 
        closeDeviceForm 
    ); 
} 
 
 // ======================================================
// حفظ الجهاز
// ======================================================

function saveDevice() {

    const name =
        phoneName
            ? phoneName.value.trim()
            : "";

    const customer =
        customerName
            ? customerName.value.trim()
            : "";


    if (!name) {

        alert(
            currentLanguage === "ar"
                ? "من فضلك اكتب اسم الجهاز."
                : "Please enter the device name."
        );

        return;
    }


    if (!customer) {

        alert(
            currentLanguage === "ar"
                ? "من فضلك اكتب اسم صاحب الجهاز."
                : "Please enter the customer name."
        );

        return;
    }


    // الجهاز الذي تم حفظه فعليًا
    let savedDevice = null;


    // ==================================================
    // تعديل جهاز موجود
    // ==================================================

    if (editingDeviceId) {

        const index =
            devices.findIndex(
                device =>
                    device.id ===
                    editingDeviceId
            );


        if (index !== -1) {

            devices[index] = {

                ...devices[index],

                phoneName:
                    name,

                customerName:
                    customer,

                receiveDate:
                    receiveDate
                        ? receiveDate.value
                        : "",

                receiveTime:
                    receiveTime
                        ? receiveTime.value
                        : "",

                problem:
                    problem
                        ? problem.value.trim()
                        : "",

                changedParts:
                    changedParts
                        ? changedParts.value.trim()
                        : "",

                price:
                    price
                        ? price.value
                        : "",

                notes:
                    notes
                        ? notes.value.trim()
                        : "",

                serialNumber:
                    serialNumber
                        ? serialNumber.value.trim()
                        : ""
            };


            savedDevice =
                devices[index];
        }

    }


    // ==================================================
    // إضافة جهاز جديد
    // ==================================================

    else {

        const device = {

            id:
                createId(
                    "device"
                ),

            number:
                Date.now(),

            phoneName:
                name,

            customerName:
                customer,

            receiveDate:
                receiveDate
                    ? receiveDate.value
                    : getToday(),

            receiveTime:
                receiveTime
                    ? receiveTime.value
                    : getCurrentTime(),

            problem:
                problem
                    ? problem.value.trim()
                    : "",

            changedParts:
                changedParts
                    ? changedParts.value.trim()
                    : "",

            price:
                price
                    ? price.value
                    : "",

            notes:
                notes
                    ? notes.value.trim()
                    : "",

            serialNumber:
                serialNumber
                    ? serialNumber.value.trim()
                    : "",

            category:
                SECTIONS.SALE,

            section:
                "sale",

            status:
                "البيع",

            createdAt:
                new Date().toISOString()
        };


        devices.unshift(
            device
        );


        savedDevice =
            device;
    }


    // ==================================================
    // حفظ البيانات
    // ==================================================

    saveDevices();


    // ==================================================
    // تسجيل العملية في آخر العمليات
    // ==================================================

    if (
    !editingDeviceId &&
    savedDevice
) {

    try {

        addDashboardOperation({

            type:
                "device-add",

            icon:
                "📱",

            title:
                "إضافة جهاز",

            details:
                savedDevice.phoneName +
                " • " +
                savedDevice.customerName,

            amount:
                savedDevice.price
        });

    } catch (error) {

        console.warn(
            "تعذر تسجيل العملية في آخر العمليات:",
            error
        );

    }
}


    // ==================================================
    // إنهاء الحفظ
    // ==================================================

    editingDeviceId =
        null;

    closeDeviceForm();

    renderSaleDevices();
}


// ======================================================
// زر حفظ الجهاز
// ======================================================

if (saveDeviceButton) {

    saveDeviceButton.addEventListener(
        "click",
        saveDevice
    );
}


// ======================================================
// بطاقات البيع
// ======================================================

function renderSaleDevices() {

    if (!deviceList) {
        return;
    }


    if (
        currentSection !==
        SECTIONS.SALE
    ) {
        return;
    }


    deviceList.style.display =
        "grid";


    if (saleAddButton) {

        saleAddButton.style.display =
            "";
    }


    const saleDevices =
        devices.filter(
            device =>
                device.category ===
                    SECTIONS.SALE ||
                (
                    device.section ===
                    "sale" &&
                    !device.category
                )
        );


    if (!saleDevices.length) {

        deviceList.innerHTML = `

            <div class="empty-state">

                <div style="font-size:45px;">
                    📱
                </div>

                <h3>
                    ${
                        currentLanguage === "ar"
                            ? "لا توجد أجهزة للبيع"
                            : "No devices for sale"
                    }
                </h3>

                <p>
                    ${
                        currentLanguage === "ar"
                            ? 'اضغط على "إضافة جهاز جديد" لإضافة أول جهاز.'
                            : 'Click "Add New Device" to add your first device.'
                    }
                </p>

            </div>
        `;

        return;
    }


    deviceList.innerHTML =
        saleDevices
            .map(
                function (
                    device,
                    index
                ) {

                    return `

                    <article
                        class="device-card"
                    >

                        <div
                            class="device-card-top"
                            style="
                                display:flex;
                                align-items:center;
                                justify-content:space-between;
                                gap:10px;
                            "
                        >

                            <div
                                class="device-number"
                            >
                                #${index + 1}
                            </div>


                            <div
                                class="device-actions"
                            >

                                <button
                                    type="button"
                                    class="card-edit-button"
                                    data-id="${escapeHTML(device.id)}"
                                    title="${t("edit")}"
                                >
                                    ${t("edit")}
                                </button>


                                <button
                                    type="button"
                                    class="card-delete-button"
                                    data-id="${escapeHTML(device.id)}"
                                    title="${t("delete")}"
                                >
                                    ${t("delete")}
                                </button>

                            </div>

                        </div>


                        <div
                            class="device-card-icon"
                            style="
                                font-size:38px;
                                margin:14px 0;
                            "
                        >
                            📱
                        </div>


                        <h3>
                            ${escapeHTML(
                                device.phoneName
                            )}
                        </h3>


                        <div class="device-info">
                            👤
                            ${escapeHTML(
                                device.customerName
                            )}
                        </div>


                        <div class="device-info">
                            📅
                            ${escapeHTML(
                                device.receiveDate
                            )}
                        </div>


                        <div class="device-info">
                            ⏰
                            ${escapeHTML(
                                device.receiveTime
                            )}
                        </div>


                        ${
                            device.serialNumber
                                ? `
                                <div class="device-info">
                                    🔢
                                    ${escapeHTML(
                                        device.serialNumber
                                    )}
                                </div>
                                `
                                : ""
                        }


                        ${
                            device.problem
                                ? `
                                <div class="device-info">
                                    🛠️
                                    ${escapeHTML(
                                        device.problem
                                    )}
                                </div>
                                `
                                : ""
                        }


                        ${
                            device.changedParts
                                ? `
                                <div class="device-info">
                                    🔩
                                    ${escapeHTML(
                                        device.changedParts
                                    )}
                                </div>
                                `
                                : ""
                        }


                        ${
                            device.price
                                ? `
                                <div class="device-price">
                                    💰
                                    ${formatMoney(
                                        device.price
                                    )}
                                </div>
                                `
                                : ""
                        }


                        ${
                            device.notes
                                ? `
                                <div class="device-notes">
                                    📝
                                    ${escapeHTML(
                                        device.notes
                                    )}
                                </div>
                                `
                                : ""
                        }


                        <div
                            class="card-print-area"
                        >

                            <button
                                type="button"
                                class="card-print-button"
                                data-id="${escapeHTML(device.id)}"
                                title="${
                                    currentLanguage === "ar"
                                        ? "طباعة"
                                        : "Print"
                                }"
                            >
                                🖨️
                                ${
                                    currentLanguage === "ar"
                                        ? "طباعة"
                                        : "Print"
                                }
                            </button>

                        </div>

                    </article>
                    `;
                }
            )
            .join("");


    attachSaleCardEvents();
}


// ======================================================
// أحداث بطاقات البيع
// ======================================================

function attachSaleCardEvents() {

    if (!deviceList) {
        return;
    }


    deviceList
        .querySelectorAll(
            ".card-edit-button"
        )
        .forEach(
            button => {

                button.addEventListener(
                    "click",
                    function () {

                        editSaleDevice(
                            this.dataset.id
                        );
                    }
                );
            }
        );


    deviceList
        .querySelectorAll(
            ".card-delete-button"
        )
        .forEach(
            button => {

                button.addEventListener(
                    "click",
                    function () {

                        deleteSaleDevice(
                            this.dataset.id
                        );
                    }
                );
            }
        );


    deviceList
        .querySelectorAll(
            ".card-print-button"
        )
        .forEach(
            button => {

                button.addEventListener(
                    "click",
                    function () {

                        printDevice(
                            this.dataset.id
                        );
                    }
                );
            }
        );
}
 
// ====================================================== 
// تعديل جهاز البيع 
// ====================================================== 
 
function editSaleDevice( 
    id 
) { 
 
    const device = 
        devices.find( 
            item => 
                item.id === id 
        ); 
 
    if (!device) { 
        return; 
    } 
 
 
    editingDeviceId = 
        id; 
 
    currentSection = 
        SECTIONS.SALE; 
 
    formSection = 
        SECTIONS.SALE; 
 
 
    if (deviceForm) { 
 
        deviceForm.style.display = 
            "block"; 
    } 
 
 
    if (phoneName) { 
 
        phoneName.value = 
            device.phoneName || ""; 
    } 
 
    if (customerName) { 
 
        customerName.value = 
            device.customerName || ""; 
    } 
 
    if (receiveDate) { 
 
        receiveDate.value = 
            device.receiveDate || ""; 
    } 
 
    if (receiveTime) { 
 
        receiveTime.value = 
            device.receiveTime || ""; 
    } 
 
    if (problem) { 
 
        problem.value = 
            device.problem || ""; 
    } 
 
    if (changedParts) { 
 
        changedParts.value = 
            device.changedParts || ""; 
    } 
 
    if (price) { 
 
        price.value = 
            device.price || ""; 
    } 
 
    if (notes) { 
 
        notes.value = 
            device.notes || ""; 
    } 
 
    ensureSerialField(); 
 
    if (serialNumber) { 
 
        serialNumber.value = 
            device.serialNumber || ""; 
    } 
 
 
    if (deviceForm) { 
 
        deviceForm.scrollIntoView({ 
            behavior: 
                "smooth", 
            block: 
                "start" 
        }); 
    } 
} 
 
 
// ====================================================== 
// حذف جهاز البيع 
// ====================================================== 
 
function deleteSaleDevice( 
    id 
) { 
 
    const device = 
        devices.find( 
            item => 
                item.id === id 
        ); 
 
    if (!device) { 
        return; 
    } 
 
 
    const confirmed = 
        confirm( 
            currentLanguage === "ar" 
                ? `هل أنت متأكد من حذف جهاز "${device.phoneName}"؟` 
                : `Are you sure you want to delete "${device.phoneName}"?` 
        ); 
 
 
    if (!confirmed) { 
        return; 
    } 
 
 
    devices = 
        devices.filter( 
            item => 
                item.id !== id 
        ); 
 
 
    saveDevices(); 
 
    renderSaleDevices(); 
} 
 
 
// ====================================================== 
// طباعة الجهاز 
// ====================================================== 
 
function printDevice( 
    id 
) { 
 
    const device = 
        devices.find( 
            item => 
                item.id === id 
        ); 
 
    if (!device) { 
        return; 
    } 
 
 
    const title = 
        currentLanguage === "ar" 
            ? "بيانات الجهاز" 
            : "Device Details"; 
 
 
    const html = ` 
 
        <!DOCTYPE html> 
 
        <html 
            lang="${currentLanguage}" 
            dir="${ 
                currentLanguage === "ar" 
                    ? "rtl" 
                    : "ltr" 
            }" 
        > 
 
        <head> 
 
            <meta charset="UTF-8"> 
 
            <title> 
                ${escapeHTML(title)} 
            </title> 
 
            <style> 
 
                body { 
                    font-family: Arial, sans-serif; 
                    padding: 35px; 
                    color: #111; 
                    background: #fff; 
                } 
 
                .print-box { 
                    max-width: 760px; 
                    margin: auto; 
                    border: 2px solid #111; 
                    padding: 30px; 
                    border-radius: 16px; 
                } 
 
                h1 { 
                    text-align: center; 
                    margin-bottom: 8px; 
                } 
 
                h2 { 
                    text-align: center; 
                    margin-bottom: 25px; 
                } 
 
                .row { 
                    display: flex; 
                    justify-content: space-between; 
                    gap: 20px; 
                    padding: 12px 0; 
                    border-bottom: 1px solid #ddd; 
                } 
 
                .label { 
                    font-weight: 700; 
                } 
 
                .notes { 
                    margin-top: 20px; 
                    padding: 15px; 
                    background: #f5f5f5; 
                    border-radius: 10px; 
                    white-space: pre-wrap; 
                } 
 
                @media print { 
 
                    body { 
                        padding: 0; 
                    } 
 
                    .print-box { 
                        border: 0; 
                    } 
                } 
 
            </style> 
 
        </head> 
 
        <body> 
 
            <div class="print-box"> 
 
                <h1> 
                    ACT PHONE MANAGER 
                </h1> 
 
                <h2> 
                    ${escapeHTML(title)} 
                </h2> 
 
                <div class="row"> 
                    <span class="label"> 
                        ${ 
                            currentLanguage === "ar" 
                                ? "الجهاز" 
                                : "Device" 
                        } 
                    </span> 
 
                    <span> 
                        ${escapeHTML( 
                            device.phoneName || "-" 
                        )} 
                    </span> 
                </div> 
 
 
                <div class="row"> 
                    <span class="label"> 
                        ${ 
                            currentLanguage === "ar" 
                                ? "صاحب الجهاز" 
                                : "Customer" 
                        } 
                    </span> 
 
                    <span> 
                        ${escapeHTML( 
                            device.customerName || "-" 
                        )} 
                    </span> 
                </div> 
 
 
                <div class="row"> 
                    <span class="label"> 
                        ${ 
                            currentLanguage === "ar" 
                                ? "السيريال" 
                                : "Serial" 
                        } 
                    </span> 
 
                    <span> 
                        ${escapeHTML( 
                            device.serialNumber || "-" 
                        )} 
                    </span> 
                </div> 
 
 
                <div class="row"> 
                    <span class="label"> 
                        ${ 
                            currentLanguage === "ar" 
                                ? "التاريخ" 
                                : "Date" 
                        } 
                    </span> 
 
                    <span> 
                        ${escapeHTML( 
                            device.receiveDate || "-" 
                        )} 
                    </span> 
                </div> 
 
 
                <div class="row"> 
                    <span class="label"> 
                        ${ 
                            currentLanguage === "ar" 
                                ? "الوقت" 
                                : "Time" 
                        } 
                    </span> 
 
                    <span> 
                        ${escapeHTML( 
                            device.receiveTime || "-" 
                        )} 
                    </span> 
                </div> 
 
 
                <div class="row"> 
                    <span class="label"> 
                        ${ 
                            currentLanguage === "ar" 
                                ? "العيب" 
                                : "Problem" 
                        } 
                    </span> 
 
                    <span> 
                        ${escapeHTML( 
                            device.problem || "-" 
                        )} 
                    </span> 
                </div> 
 
 
                <div class="row"> 
                    <span class="label"> 
                        ${ 
                            currentLanguage === "ar" 
                                ? "الأجزاء التي يتم تغييرها" 
                                : "Changed Parts" 
                        } 
                    </span> 
 
                    <span> 
                        ${escapeHTML( 
                            device.changedParts || "-" 
                        )} 
                    </span> 
                </div> 
 
 
                <div class="row"> 
                    <span class="label"> 
                        ${ 
                            currentLanguage === "ar" 
                                ? "السعر" 
                                : "Price" 
                        } 
                    </span> 
 
                    <span> 
                        ${ 
                            device.price 
                                ? formatMoney( 
                                    device.price 
                                ) 
                                : "-" 
                        } 
                    </span> 
                </div> 
 
 
                ${ 
                    device.notes 
                        ? ` 
                            <div class="notes"> 
                                <strong> 
                                    ${ 
                                        currentLanguage === "ar" 
                                            ? "ملاحظات" 
                                            : "Notes" 
                                    } 
                                </strong> 
 
                                <br> 
 
                                ${escapeHTML( 
                                    device.notes 
                                )} 
                            </div> 
                        ` 
                        : "" 
                } 
 
            </div> 
 
 
            <script> 
                window.onload = function () { 
                    window.print(); 
                }; 
            <\/script> 
 
        </body> 
 
        </html> 
    `; 
 
 
    const printWindow = 
        window.open( 
            "", 
            "_blank", 
            "width=900,height=700" 
        ); 
 
 
    if (!printWindow) { 
 
        alert( 
            currentLanguage === "ar" 
                ? "السماح بالنوافذ المنبثقة مطلوب للطباعة." 
                : "Please allow pop-ups to print." 
        ); 
 
        return; 
    } 
 
 
    printWindow.document.open(); 
 
    printWindow.document.write( 
        html 
    ); 
 
    printWindow.document.close(); 
} 
 
 
// ====================================================== 
// البحث في الأجهزة 
// ====================================================== 
 
function filterSaleDevices( 
    searchValue 
) { 
 
    const value = 
        String( 
            searchValue || "" 
        ) 
            .trim() 
            .toLowerCase(); 
 
 
    if (!value) { 
 
        renderSaleDevices(); 
 
        return; 
    } 
 
 
    if (!deviceList) { 
        return; 
    } 
 
 
    const saleDevices = 
        devices.filter( 
            device => 
                ( 
                    device.category === 
                        SECTIONS.SALE || 
                    ( 
                        device.section === 
                        "sale" && 
                        !device.category 
                    ) 
                ) 
        ); 
 
 
    const filtered = 
        saleDevices.filter( 
            device => { 
 
                const text = [ 
 
                    device.phoneName, 
 
                    device.customerName, 
 
                    device.serialNumber, 
 
                    device.problem, 
 
                    device.changedParts, 
 
                    device.notes, 
 
                    device.price 
 
                ] 
                    .map( 
                        item => 
                            String( 
                                item || "" 
                            ) 
                                .toLowerCase() 
                    ) 
                    .join(" "); 
 
 
                return text.includes( 
                    value 
                ); 
            } 
        ); 
 
 
    if (!filtered.length) { 
 
        deviceList.innerHTML = ` 
 
            <div class="empty-state"> 
 
                <div style="font-size:45px;"> 
                    🔎 
                </div> 
 
                <h3> 
                    ${ 
                        currentLanguage === "ar" 
                            ? "لا توجد نتائج" 
                            : "No results" 
                    } 
                </h3> 
 
                <p> 
                    ${ 
                        currentLanguage === "ar" 
                            ? "جرب كلمة بحث مختلفة." 
                            : "Try another search." 
                    } 
                </p> 
 
            </div> 
 
        `; 
 
        return; 
    } 
 
 
    deviceList.innerHTML = 
        filtered 
            .map( 
                function ( 
                    device, 
                    index 
                ) { 
 
                    return ` 
 
                    <article 
                        class="device-card" 
                    > 
 
                        <div 
                            class="device-card-top" 
                            style=" 
                                display:flex; 
                                align-items:center; 
                                justify-content:space-between; 
                                gap:10px; 
                            " 
                        > 
 
                            <div 
                                class="device-number" 
                            > 
                                #${index + 1} 
                            </div> 
 
                            <div 
                                class="device-actions" 
                            > 
 
                                <button 
                                    type="button" 
                                    class="card-edit-button" 
                                    data-id="${escapeHTML(device.id)}" 
                                > 
                                    ${t("edit")} 
                                </button> 
 
                                <button 
                                    type="button" 
                                    class="card-delete-button" 
                                    data-id="${escapeHTML(device.id)}" 
                                > 
                                    ${t("delete")} 
                                </button> 
 
                            </div> 
 
                        </div> 
 
 
                        <div 
                            class="device-card-icon" 
                            style=" 
                                font-size:38px; 
                                margin:14px 0; 
                            " 
                        > 
                            📱 
                        </div> 
 
 
                        <h3> 
                            ${escapeHTML( 
                                device.phoneName 
                            )} 
                        </h3> 
 
 
                        <div class="device-info"> 
                            👤 
                            ${escapeHTML( 
                                device.customerName 
                            )} 
                        </div> 
 
 
                        <div class="device-info"> 
                            📅 
                            ${escapeHTML( 
                                device.receiveDate 
                            )} 
                        </div> 
 
 
                        ${ 
                            device.serialNumber 
                                ? ` 
                                <div class="device-info"> 
                                    🔢 
                                    ${escapeHTML( 
                                        device.serialNumber 
                                    )} 
                                </div> 
                                ` 
                                : "" 
                        } 
 
 
                        ${ 
                            device.problem 
                                ? ` 
                                <div class="device-info"> 
                                    🛠️ 
                                    ${escapeHTML( 
                                        device.problem 
                                    )} 
                                </div> 
                                ` 
                                : "" 
                        } 
 
 
                        ${ 
                            device.price 
                                ? ` 
                                <div class="device-price"> 
                                    💰 
                                    ${formatMoney( 
                                        device.price 
                                    )} 
                                </div> 
                                ` 
                                : "" 
                        } 
 
 
                        <div 
                            class="card-print-area" 
                        > 
 
                            <button 
                                type="button" 
                                class="card-print-button" 
                                data-id="${escapeHTML(device.id)}" 
                            > 
                                🖨️ 
                                ${ 
                                    currentLanguage === "ar" 
                                        ? "طباعة" 
                                        : "Print" 
                                } 
                            </button> 
 
                        </div> 
 
                    </article> 
 
                    `; 
                } 
            ) 
            .join(""); 
 
 
    attachSaleCardEvents(); 
} 
 
 
if (searchInput) { 
 
    searchInput.addEventListener( 
        "input", 
        function () { 
 
            filterSaleDevices( 
                this.value 
            ); 
        } 
    ); 
} 
 
 
// ====================================================== 
// البحث وإدارة ظهور البحث 
// ====================================================== 
 
function hideSaleSearch() { 
 
    if (!searchInput) { 
        return; 
    } 
 
 
    const wrapper = 
        searchInput.closest( 
            ".search-wrapper" 
        ); 
 
 
    if (wrapper) { 
 
        wrapper.style.display = 
            "block"; 
 
    } else { 
 
        searchInput.style.display = 
            "block"; 
    } 
} 
 
 
function prepareSaleSearch() { 
 
    if (!searchInput) { 
        return; 
    } 
 
    const wrapper = 
        searchInput.closest( 
            ".search-wrapper" 
        ); 
 
    if (wrapper) { 
 
        wrapper.style.display = 
            "block"; 
    } 
 
    searchInput.style.display = 
        "block"; 
} 
 
 
// ====================================================== 
// الصيانة 
// ====================================================== 
 
const maintenanceStatusView = 
    document.getElementById( 
        "maintenance-status-view" 
    ); 
 
 
const maintenanceDeviceList = 
    document.getElementById( 
        "maintenance-device-list" 
    ); 
 
 
let maintenanceSearchInput = null; 
 
let maintenanceSearchWrapper = null; 
 
// ======================================================
// عرض الصيانة
// ======================================================

function showMaintenanceSection(
    section
) {

    currentSection =
        section;


    // إخفاء الأقسام الأخرى

    if (salesArea) {

        salesArea.style.display =
            "none";
    }

    if (customersSection) {

    customersSection.style.display =
        "block";
}

const moreSection =
    document.getElementById("more-section");

if (moreSection) {

    moreSection.style.display =
        "none";
}

    if (employeesSection) {

        employeesSection.style.display =
            "none";
    }

    if (deviceForm) {

        deviceForm.style.display =
            "none";
    }

    if (deviceList) {

        deviceList.style.display =
            "none";
    }

    if (saleAddButton) {

        saleAddButton.style.display =
            "none";
    }


    // إظهار شاشة الصيانة

    if (maintenanceStatusView) {

        maintenanceStatusView.style.display =
            "block";
    }


    // تجهيز زر إضافة جهاز الصيانة

    createMaintenanceAddButton();


    // عرض أجهزة الحالة الحالية

    renderMaintenance();


    // تشغيل البحث

    prepareMaintenanceSearch();
}
// ====================================================== 
// إغلاق عرض الصيانة 
// ====================================================== 
 
function closeMaintenanceView() { 
 
    if (maintenanceStatusView) { 
 
        maintenanceStatusView.style.display = 
            "none"; 
    } 
 
    if (maintenanceSearchWrapper) { 
 
        maintenanceSearchWrapper.style.display = 
            "none"; 
    } 
} 

// زر X للعودة إلى قسم المزيد
const maintenanceExitButton = document.getElementById(
    "maintenance-exit-button"
);

if (maintenanceExitButton) {
    maintenanceExitButton.onclick = function () {
        closeMaintenanceView();

        const customersSection = document.getElementById("customers-section");
        const moreSection = document.getElementById("more-section");

        if (customersSection) {
            customersSection.style.display = "none";
        }

        if (moreSection) {
            moreSection.style.display = "block";
        }

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };
}
 
 
// ====================================================== 
// البحث في الصيانة 
// ====================================================== 
 
function prepareMaintenanceSearch() { 
 
    if (!maintenanceStatusView) { 
        return; 
    } 
 
 
    if ( 
        document.getElementById( 
            "maintenance-search-wrapper" 
        ) 
    ) { 
 
        maintenanceSearchWrapper = 
            document.getElementById( 
                "maintenance-search-wrapper" 
            ); 
 
    } else { 
 
        maintenanceSearchWrapper = 
            document.createElement( 
                "div" 
            ); 
 
        maintenanceSearchWrapper.id = 
            "maintenance-search-wrapper"; 
 
        maintenanceSearchWrapper.className = 
            "search-wrapper maintenance-search-wrapper"; 
 
        maintenanceSearchWrapper.innerHTML = ` 
 
            <input 
                type="search" 
                id="maintenance-search-input" 
                class="search-input" 
                autocomplete="off" 
                placeholder="" 
            > 
 
        `; 
 
 
        const heading = 
            maintenanceStatusView.querySelector( 
                "h2" 
            ); 
            

        if (heading) {

            heading.insertAdjacentElement(
                "afterend",
                maintenanceSearchWrapper
            );

        } else {

            maintenanceStatusView.prepend(
                maintenanceSearchWrapper
            );
        }
    }


    maintenanceSearchInput =
        document.getElementById(
            "maintenance-search-input"
        );


    if (!maintenanceSearchInput) {
        return;
    }


    maintenanceSearchInput.placeholder =
        currentLanguage === "ar"
            ? "🔎 ابحث باسم الجهاز أو صاحب الجهاز أو العيب"
            : "🔎 Search device, customer or problem";


    if (
        !maintenanceSearchInput.dataset.bound
    ) {

        maintenanceSearchInput.dataset.bound =
            "true";


        maintenanceSearchInput.addEventListener(
            "input",
            function () {

                renderMaintenance(
                    this.value
                );
            }
        );
    }


    maintenanceSearchWrapper.style.display =
        "block";
}


// ======================================================
// إضافة جهاز للصيانة
// ======================================================

function openMaintenanceDeviceForm(
    defaultSection
) {

    const existing =
        document.getElementById(
            "maintenance-add-modal"
        );


    if (existing) {

        existing.remove();
    }


    const modal =
        document.createElement(
            "div"
        );

    modal.id =
        "maintenance-add-modal";

    modal.className =
        "maintenance-add-modal";


    modal.innerHTML = `

        <div class="maintenance-add-box">

            <div
                class="maintenance-add-header"
            >

                <h2>
                    ${
                        currentLanguage === "ar"
                            ? "🔧 إضافة جهاز للصيانة"
                            : "🔧 Add Device for Repair"
                    }
                </h2>

                <button
                    type="button"
                    id="close-maintenance-add"
                    class="modal-close-button"
                >
                    ✕
                </button>

            </div>


            <div class="maintenance-add-grid">

                <div class="form-group">

                    <label>
                        ${
                            currentLanguage === "ar"
                                ? "اسم الجهاز"
                                : "Device Name"
                        }
                    </label>

                    <input
                        id="maintenance-phone-name"
                        type="text"
                        autocomplete="off"
                    >

                </div>


                <div class="form-group">

                    <label>
                        ${
                            currentLanguage === "ar"
                                ? "صاحب الجهاز"
                                : "Customer Name"
                        }
                    </label>

                    <input
                        id="maintenance-customer-name"
                        type="text"
                        autocomplete="off"
                    >

                </div>


                <div class="form-group">

                    <label>
                        ${
                            currentLanguage === "ar"
                                ? "السيريال"
                                : "Serial"
                        }
                    </label>

                    <input
                        id="maintenance-serial-number"
                        type="text"
                        autocomplete="off"
                    >

                </div>


                <div class="form-group">

                    <label>
                        ${
                            currentLanguage === "ar"
                                ? "التاريخ"
                                : "Date"
                        }
                    </label>

                    <input
                        id="maintenance-receive-date"
                        type="date"
                        value="${getToday()}"
                    >

                </div>


                <div class="form-group">

                    <label>
                        ${
                            currentLanguage === "ar"
                                ? "الوقت"
                                : "Time"
                        }
                    </label>

                    <input
                        id="maintenance-receive-time"
                        type="time"
                        value="${getCurrentTime()}"
                    >

                </div>


                <div class="form-group">

                    <label>
                        ${
                            currentLanguage === "ar"
                                ? "العيب"
                                : "Problem"
                        }
                    </label>

                    <input
                        id="maintenance-problem"
                        type="text"
                        autocomplete="off"
                    >

                </div>


                <div class="form-group">

                    <label>
                        ${
                            currentLanguage === "ar"
                                ? "الأجزاء التي يتم تغييرها"
                                : "Changed Parts"
                        }
                    </label>

                    <input
                        id="maintenance-changed-parts"
                        type="text"
                        autocomplete="off"
                    >

                </div>


                <div class="form-group">

                    <label>
                        ${
                            currentLanguage === "ar"
                                ? "السعر"
                                : "Price"
                        }
                    </label>

                    <input
                        id="maintenance-price"
                        type="number"
                        min="0"
                        step="0.01"
                    >

                </div>


                <div class="form-group">

                    <label>
                        ${
                            currentLanguage === "ar"
                                ? "ملاحظات"
                                : "Notes"
                        }
                    </label>

                    <textarea
                        id="maintenance-notes"
                        rows="3"
                    ></textarea>

                </div>


                <div class="form-group">

                    <label>
                        ${
                            currentLanguage === "ar"
                                ? "حالة الجهاز"
                                : "Device Status"
                        }
                    </label>

                    <select
                        id="maintenance-status-select"
                    >

                        <option
                            value="${SECTIONS.PENDING}"
                            ${
                                defaultSection ===
                                SECTIONS.PENDING
                                    ? "selected"
                                    : ""
                            }
                        >
                            ${
                                currentLanguage === "ar"
                                    ? "قيد الإصلاح"
                                    : "In Repair"
                            }
                        </option>

                        <option
                            value="${SECTIONS.READY}"
                            ${
                                defaultSection ===
                                SECTIONS.READY
                                    ? "selected"
                                    : ""
                            }
                        >
                            ${
                                currentLanguage === "ar"
                                    ? "جاهز"
                                    : "Ready"
                            }
                        </option>

                        <option
                            value="${SECTIONS.FAILED}"
                            ${
                                defaultSection ===
                                SECTIONS.FAILED
                                    ? "selected"
                                    : ""
                            }
                        >
                            ${
                                currentLanguage === "ar"
                                    ? "لم يتم الإصلاح"
                                    : "Not Repaired"
                            }
                        </option>

                        <option
                            value="${SECTIONS.DELIVERED}"
                            ${
                                defaultSection ===
                                SECTIONS.DELIVERED
                                    ? "selected"
                                    : ""
                            }
                        >
                            ${
                                currentLanguage === "ar"
                                    ? "تم التسليم"
                                    : "Delivered"
                            }
                        </option>

                    </select>

                </div>

            </div>


            <div
                class="maintenance-add-actions"
            >

                <button
                    type="button"
                    id="save-maintenance-device"
                    class="save-button"
                >
                    ${
                        currentLanguage === "ar"
                            ? "💾 حفظ الجهاز"
                            : "💾 Save Device"
                    }
                </button>


                <button
                    type="button"
                    id="cancel-maintenance-device"
                    class="cancel-button"
                >
                    ${
                        currentLanguage === "ar"
                            ? "✕ إلغاء"
                            : "✕ Cancel"
                    }
                </button>

            </div>

        </div>

    `;


    document.body.appendChild(
        modal
    );


    const closeButton =
        document.getElementById(
            "close-maintenance-add"
        );

    const cancelButton =
        document.getElementById(
            "cancel-maintenance-device"
        );

    const saveButton =
        document.getElementById(
            "save-maintenance-device"
        );


    const closeModal =
        function () {

            modal.remove();
        };


    if (closeButton) {

        closeButton.addEventListener(
            "click",
            closeModal
        );
    }


    if (cancelButton) {

        cancelButton.addEventListener(
            "click",
            closeModal
        );
    }


    if (saveButton) {

        saveButton.addEventListener(
            "click",
            function () {

                const name =
                    document.getElementById(
                        "maintenance-phone-name"
                    )?.value.trim() || "";

                const customer =
                    document.getElementById(
                        "maintenance-customer-name"
                    )?.value.trim() || "";

                const serial =
                    document.getElementById(
                        "maintenance-serial-number"
                    )?.value.trim() || "";

                const date =
                    document.getElementById(
                        "maintenance-receive-date"
                    )?.value || getToday();

                    

                const time =
                    document.getElementById(
                        "maintenance-receive-time"
                    )?.value || getCurrentTime();

                const problemValue =
                    document.getElementById(
                        "maintenance-problem"
                    )?.value.trim() || "";

                const changed =
                    document.getElementById(
                        "maintenance-changed-parts"
                    )?.value.trim() || "";

                const priceValue =
                    document.getElementById(
                        "maintenance-price"
                    )?.value || "";

                const notesValue =
                    document.getElementById(
                        "maintenance-notes"
                    )?.value.trim() || "";

                const status =
                    document.getElementById(
                        "maintenance-status-select"
                    )?.value ||
                    defaultSection ||
                    SECTIONS.PENDING;


                if (!name) {

                    alert(
                        currentLanguage === "ar"
                            ? "من فضلك اكتب اسم الجهاز."
                            : "Please enter the device name."
                    );

                    return;
                }


                if (!customer) {

                    alert(
                        currentLanguage === "ar"
                            ? "من فضلك اكتب اسم صاحب الجهاز."
                            : "Please enter the customer name."
                    );

                    return;
                }


                const device = {

                    id:
                        createId(
                            "device"
                        ),

                    number:
                        Date.now(),

                    phoneName:
                        name,

                    customerName:
                        customer,

                    serialNumber:
                        serial,

                    receiveDate:
                        date,

                    receiveTime:
                        time,

                    problem:
                        problemValue,

                    changedParts:
                        changed,

                    price:
                        priceValue,

                    notes:
                        notesValue,

                    category:
                        status,

                    section:
                        "maintenance",

                    status:
                        sectionNames[
                            status
                        ],

                    createdAt:
                        new Date().toISOString()
                };

devices.unshift(
    device
);

// حفظ البيانات
saveDevices();

// تحديث تنبيهات حالة المحل فورًا
renderShopNotifications();


// إغلاق النافذة
modal.remove();

currentSection =
    status;

// تحديث شاشة الصيانة
renderMaintenance();
            }
        );
    }
}


// ======================================================
// زر إضافة جهاز للصيانة
// ======================================================

function createMaintenanceAddButton() {

    const statusView =
        document.getElementById(
            "maintenance-status-view"
        );

    if (!statusView) {
        return;
    }


    if (
        document.getElementById(
            "maintenance-add-button"
        )
    ) {
        return;
    }


    const button =
        document.createElement(
            "button"
        );

    button.type =
        "button";

    button.id =
        "maintenance-add-button";

    button.className =
        "add-maintenance-button";

    button.textContent =
        currentLanguage === "ar"
            ? "➕ إضافة جهاز للصيانة"
            : "➕ Add Repair Device";


    button.addEventListener(
        "click",
        function () {

            openMaintenanceDeviceForm(
                currentSection
            );
        }
    );


    const heading =
        statusView.querySelector(
            "h2"
        );


    if (heading) {

        heading.insertAdjacentElement(
            "afterend",
            button
        );

    } else {

        statusView.prepend(
            button
        );
    }
}


// ======================================================
// أحداث أزرار الصيانة
// ======================================================

maintenanceButtons.forEach(
    function (button) {

        button.addEventListener(
            "click",
            function () {

                const section =
                    this.dataset.section;


                if (!section) {
                    return;
                }


                showMaintenanceSection(
                    section
                );
            }
        );
    }
);


// ======================================================
// بيانات الصيانة
// ======================================================

function getMaintenanceDevices() {

    return devices.filter(
        device =>
            device.section ===
                "maintenance" ||
            (
                device.category &&
                device.category !==
                    SECTIONS.SALE
            )
    );
}

function renderMaintenance(searchValue = "") {
const list = document.getElementById("maintenance-device-list");


if (!list) return;

const value = String(searchValue || "").trim().toLowerCase();

const maintenanceDevices = getMaintenanceDevices().filter(device => {
    const status = device.category || device.status;

    return status === currentSection ||
        (
            currentSection === SECTIONS.PENDING &&
            (!status || status === "maintenance-pending")
        );
});

const filtered = value
    ? maintenanceDevices.filter(device => {
        const text = [
            device.phoneName,
            device.customerName,
            device.problem,
            device.changedParts,
            device.serialNumber,
            device.notes
        ]
            .map(item => String(item || "").toLowerCase())
            .join(" ");

        return text.includes(value);
    })
    : maintenanceDevices;

if (!filtered.length) {
    list.innerHTML = `
        <div class="empty-state">
            <div style="font-size:45px;">🔧</div>
            <h3>
                ${currentLanguage === "ar"
                    ? "لا توجد أجهزة في هذه الحالة"
                    : "No devices in this status"}
            </h3>
            <p>
                ${currentLanguage === "ar"
                    ? "اضغط على إضافة جهاز للصيانة."
                    : "Click Add Repair Device."}
            </p>
        </div>
    `;
    return;
}

list.innerHTML = filtered
    .map((device, index) => renderMaintenanceCard(device, index))
    .join("");

attachMaintenanceCardEvents();


}



// ======================================================
// PREMIUM MAINTENANCE CARD
// ======================================================

function renderMaintenanceCard(device, index) {

    return `
        <article
            class="maintenance-card premium-maintenance-card"
            data-device-id="${escapeHTML(device.id)}"
        >

            <!-- رأس الكارت -->
            <div class="premium-card-header">

                <span class="premium-device-number">
                    #${index + 1}
                </span>

                <div class="maintenance-actions">

                    <button
                        type="button"
                        class="maintenance-edit-button"
                        data-id="${escapeHTML(device.id)}"
                    >
                        ✏️ ${t("edit")}
                    </button>

                    <button
                        type="button"
                        class="maintenance-delete-button"
                        data-id="${escapeHTML(device.id)}"
                    >
                        🗑️ ${t("delete")}
                    </button>

                </div>

            </div>


            <!-- اسم الجهاز -->
            <div class="premium-device-heading">

                <span class="premium-phone-icon">📱</span>

                <h3>
                    ${escapeHTML(device.phoneName || "جهاز بدون اسم")}
                </h3>

            </div>


            <!-- بيانات الجهاز: كل معلومة في سطر -->
            <div class="premium-device-details">

                <div class="premium-detail-row">
                    <span class="premium-detail-label">👤 العميل</span>
                    <span class="premium-detail-value">
                        ${escapeHTML(device.customerName || "غير محدد")}
                    </span>
                </div>

                <div class="premium-detail-row">
                    <span class="premium-detail-label">🔢 السيريال</span>
                    <span class="premium-detail-value">
                        ${escapeHTML(device.serialNumber || "غير مسجل")}
                    </span>
                </div>

                <div class="premium-detail-row">
                    <span class="premium-detail-label">📅 التاريخ</span>
                    <span class="premium-detail-value">
                        ${escapeHTML(device.receiveDate || "غير محدد")}
                    </span>
                </div>

                <div class="premium-detail-row">
                    <span class="premium-detail-label">🕐 الساعة</span>
                    <span class="premium-detail-value">
                        ${escapeHTML(device.receiveTime || "غير محدد")}
                    </span>
                </div>

            </div>


            <!-- العيب -->
            <div class="premium-problem-box">

                <span class="premium-problem-label">
                    🔧 العيب
                </span>

                <div class="premium-problem-value">
                    ${escapeHTML(device.problem || "لم يتم تحديد العيب")}
                </div>

            </div>


            <!-- قطع الغيار -->
            ${
                device.changedParts
                    ? `
                        <div class="premium-extra-row">
                            <span class="premium-detail-label">
                                🔩 قطع الغيار
                            </span>

                            <span class="premium-detail-value">
                                ${escapeHTML(device.changedParts)}
                            </span>
                        </div>
                    `
                    : ""
            }


            <!-- السعر -->
            ${
                device.price !== undefined &&
                device.price !== null &&
                device.price !== ""
                    ? `
                        <div class="premium-price-box">
                            <span>💰 السعر</span>
                            <strong>${formatMoney(device.price)}</strong>
                        </div>
                    `
                    : ""
            }


            <!-- الملاحظات -->
            ${
                device.notes
                    ? `
                        <div class="premium-extra-row">
                            <span class="premium-detail-label">
                                📝 ملاحظات
                            </span>

                            <span class="premium-detail-value">
                                ${escapeHTML(device.notes)}
                            </span>
                        </div>
                    `
                    : ""
            }


            <!-- حالة الصيانة -->
            <div class="maintenance-status-control premium-status">

                <label class="premium-status-label">
                    حالة الجهاز
                </label>

                <select
                    class="maintenance-status-select"
                    data-id="${escapeHTML(device.id)}"
                >

                    <option
                        value="${SECTIONS.PENDING}"
                        ${device.category === SECTIONS.PENDING ? "selected" : ""}
                    >
                        ${currentLanguage === "ar" ? "🟡 قيد الإصلاح" : "🟡 In Repair"}
                    </option>

                    <option
                        value="${SECTIONS.READY}"
                        ${device.category === SECTIONS.READY ? "selected" : ""}
                    >
                        ${currentLanguage === "ar" ? "🟢 جاهز" : "🟢 Ready"}
                    </option>

                    <option
                        value="${SECTIONS.FAILED}"
                        ${device.category === SECTIONS.FAILED ? "selected" : ""}
                    >
                        ${currentLanguage === "ar" ? "🔴 لم يتم الإصلاح" : "🔴 Not Repaired"}
                    </option>

                    <option
                        value="${SECTIONS.DELIVERED}"
                        ${device.category === SECTIONS.DELIVERED ? "selected" : ""}
                    >
                        ${currentLanguage === "ar" ? "📦 تم التسليم" : "📦 Delivered"}
                    </option>

                </select>

            </div>


            <!-- الطباعة -->
            <div class="card-print-area">

                <button
                    type="button"
                    class="card-print-button"
                    data-id="${escapeHTML(device.id)}"
                >
                    🖨️ ${currentLanguage === "ar" ? "طباعة بيانات الجهاز" : "Print Device Details"}
                </button>

            </div>

        </article>
    `;
}


// ======================================================
// أحداث كروت الصيانة
// ======================================================

function attachMaintenanceCardEvents() {

    const list = document.getElementById(
        "maintenance-device-list"
    );

    if (!list) {
        return;
    }


    // تعديل الجهاز
    list
        .querySelectorAll(".maintenance-edit-button")
        .forEach(button => {

            button.addEventListener("click", function () {

                editMaintenanceDevice(
                    this.dataset.id
                );

            });

        });


    // حذف الجهاز
    list
        .querySelectorAll(".maintenance-delete-button")
        .forEach(button => {

            button.addEventListener("click", function () {

                deleteMaintenanceDevice(
                    this.dataset.id
                );

            });

        });


    // تغيير حالة الصيانة
    list
        .querySelectorAll(".maintenance-status-select")
        .forEach(select => {

            select.addEventListener("change", function () {

                updateMaintenanceStatus(
                    this.dataset.id,
                    this.value
                );

            });

        });


    // طباعة بيانات الجهاز
    list
        .querySelectorAll(".card-print-button")
        .forEach(button => {

            button.addEventListener("click", function () {

                printDevice(
                    this.dataset.id
                );

            });

        });

}



// ======================================================
// تعديل جهاز الصيانة
// ======================================================

function editMaintenanceDevice(
    id
) {

    const device =
        devices.find(
            item =>
                item.id === id
        );

    if (!device) {
        return;
    }


    const card =
        document.querySelector(
            `.maintenance-card[data-device-id="${CSS.escape(id)}"]`
        );


    if (!card) {

        renderMaintenance();

        return;
    }


    card.outerHTML =
        renderMaintenanceEditCard(
            device
        );


    const newCard =
        document.querySelector(
            `.maintenance-card[data-device-id="${CSS.escape(id)}"]`
        );


    if (!newCard) {
        return;
    }


    const saveButton =
        newCard.querySelector(
            '[data-action="save-maintenance-edit"]'
        );

    const cancelButton =
        newCard.querySelector(
            '[data-action="cancel-maintenance-edit"]'
        );


    if (saveButton) {

        saveButton.addEventListener(
            "click",
            function () {

                saveInlineMaintenanceEdit(
                    this.dataset.id,
                    newCard
                );
            }
        );
    }


    if (cancelButton) {

        cancelButton.addEventListener(
            "click",
            function () {

                renderMaintenance();
            }
        );
    }
}


// ======================================================
// كارت تعديل الصيانة
// ======================================================

function renderMaintenanceEditCard(
    device
) {

    return `

        <article
            class="maintenance-card"
            data-device-id="${escapeHTML(device.id)}"
        >

            <div
                class="inline-edit-card"
                style="
                    display:flex;
                    flex-direction:column;
                    gap:12px;
                "
            >

                <input
                    type="text"
                    data-edit-field="phoneName"
                    value="${escapeHTML(
                        device.phoneName || ""
                    )}"
                    placeholder="${
                        currentLanguage === "ar"
                            ? "اسم الجهاز"
                            : "Device name"
                    }"
                >


                <input
                    type="text"
                    data-edit-field="customerName"
                    value="${escapeHTML(
                        device.customerName || ""
                    )}"
                    placeholder="${
                        currentLanguage === "ar"
                            ? "اسم صاحب الجهاز"
                            : "Customer name"
                    }"
                >


                <input
                    type="text"
                    data-edit-field="serialNumber"
                    value="${escapeHTML(
                        device.serialNumber || ""
                    )}"
                    placeholder="${
                        currentLanguage === "ar"
                            ? "السيريال"
                            : "Serial"
                    }"
                >


                <input
                    type="date"
                    data-edit-field="receiveDate"
                    value="${escapeHTML(
                        device.receiveDate || ""
                    )}"
                >


                <input
                    type="time"
                    data-edit-field="receiveTime"
                    value="${escapeHTML(
                        device.receiveTime || ""
                    )}"
                >


                <input
                    type="text"
                    data-edit-field="problem"
                    value="${escapeHTML(
                        device.problem || ""
                    )}"
                    placeholder="${
                        currentLanguage === "ar"
                            ? "العيب"
                            : "Problem"
                    }"
                >


                <input
                    type="text"
                    data-edit-field="changedParts"
                    value="${escapeHTML(
                        device.changedParts || ""
                    )}"
                    placeholder="${
                        currentLanguage === "ar"
                            ? "الأجزاء التي يتم تغييرها"
                            : "Changed parts"
                    }"
                >


                <input
                    type="number"
                    min="0"
                    step="0.01"
                    data-edit-field="price"
                    value="${escapeHTML(
                        device.price || ""
                    )}"
                    placeholder="${
                        currentLanguage === "ar"
                            ? "السعر"
                            : "Price"
                    }"
                >


                <textarea
                    data-edit-field="notes"
                    rows="3"
                    placeholder="${
                        currentLanguage === "ar"
                            ? "ملاحظات"
                            : "Notes"
                    }"
                >${escapeHTML(
                    device.notes || ""
                )}</textarea>


                <select
                    data-edit-field="category"
                >

                    <option
                        value="${SECTIONS.PENDING}"
                        ${
                            device.category ===
                            SECTIONS.PENDING
                                ? "selected"
                                : ""
                        }
                    >
                        ${
                            currentLanguage === "ar"
                                ? "قيد الإصلاح"
                                : "In Repair"
                        }
                    </option>


                    <option
                        value="${SECTIONS.READY}"
                        ${
                            device.category ===
                            SECTIONS.READY
                                ? "selected"
                                : ""
                        }
                    >
                        ${
                            currentLanguage === "ar"
                                ? "جاهز"
                                : "Ready"
                        }
                    </option>


                    <option
                        value="${SECTIONS.FAILED}"
                        ${
                            device.category ===
                            SECTIONS.FAILED
                                ? "selected"
                                : ""
                        }
                    >
                        ${
                            currentLanguage === "ar"
                                ? "لم يتم الإصلاح"
                                : "Not Repaired"
                        }
                    </option>


                    <option
                        value="${SECTIONS.DELIVERED}"
                        ${
                            device.category ===
                            SECTIONS.DELIVERED
                                ? "selected"
                                : ""
                        }
                    >
                        ${
                            currentLanguage === "ar"
                                ? "تم التسليم"
                                : "Delivered"
                        }
                    </option>

                </select>


                <div
                    style="
                        display:flex;
                        gap:10px;
                        flex-wrap:wrap;
                    "
                >

                    <button
                        type="button"
                        class="save-button"
                        data-action="save-maintenance-edit"
                        data-id="${escapeHTML(device.id)}"
                    >
                        ${t("save")}
                    </button>


                    <button
                        type="button"
                        class="cancel-button"
                        data-action="cancel-maintenance-edit"
                    >
                        ${t("cancel")}
                    </button>

                </div>

            </div>

        </article>

    `;
}


// ======================================================
// حفظ تعديل الصيانة
// ======================================================

function saveInlineMaintenanceEdit(
    id,
    container
) {

    const device =
        devices.find(
            item =>
                item.id === id
        );

    if (!device) {
        return;
    }


    function field(
        name
    ) {

        const element =
            container.querySelector(
                `[data-edit-field="${name}"]`
            );

        return element
            ? element.value.trim()
            : "";
    }


    const newPhoneName =
        field(
            "phoneName"
        );

    const newCustomerName =
        field(
            "customerName"
        );


    if (!newPhoneName) {

        alert(
            currentLanguage === "ar"
                ? "من فضلك اكتب اسم الجهاز."
                : "Please enter the device name."
        );

        return;
    }


    if (!newCustomerName) {

        alert(
            currentLanguage === "ar"
                ? "من فضلك اكتب اسم صاحب الجهاز."
                : "Please enter the customer name."
        );

        return;
    }


    const categoryElement =
        container.querySelector(
            '[data-edit-field="category"]'
        );


    const newCategory =
        categoryElement
            ? categoryElement.value
            : device.category;


    device.phoneName =
        newPhoneName;

    device.customerName =
        newCustomerName;

    device.receiveDate =
        field(
            "receiveDate"
        );

    device.receiveTime =
        field(
            "receiveTime"
        );

    device.problem =
        field(
            "problem"
        );

    device.changedParts =
        field(
            "changedParts"
        );

    device.price =
        field(
            "price"
        );

    device.notes =
        field(
            "notes"
        );

    device.serialNumber =
        field(
            "serialNumber"
        );

    device.category =
        newCategory;

    device.section =
        "maintenance";

    device.status =
        sectionNames[
            newCategory
        ];


saveDevices();

// تحديث تنبيهات حالة المحل فورًا
renderShopNotifications();

currentSection =
    newCategory;

renderMaintenance();
}


// ======================================================
// تحديث حالة جهاز الصيانة
// ======================================================

function updateMaintenanceStatus(
    id,
    newStatus
) {

    const device =
        devices.find(
            item =>
                item.id === id
        );

    if (!device) {
        return;
    }


    if (
        ![
            SECTIONS.PENDING,
            SECTIONS.READY,
            SECTIONS.FAILED,
            SECTIONS.DELIVERED
        ].includes(
            newStatus
        )
    ) {
        return;
    }


    device.category =
        newStatus;

    device.section =
        "maintenance";

    device.status =
        sectionNames[
            newStatus
        ];

saveDevices();

// تحديث تنبيهات حالة المحل فور تغيير الحالة
renderShopNotifications();

currentSection =
    newStatus;

    renderMaintenance();
}


// ======================================================
// حذف جهاز الصيانة
// ======================================================

function deleteMaintenanceDevice(
    id
) {

    const device =
        devices.find(
            item =>
                item.id === id
        );

    if (!device) {
        return;
    }


    const confirmed =
        confirm(
            currentLanguage === "ar"
                ? `هل أنت متأكد من حذف جهاز "${device.phoneName}"؟`
                : `Are you sure you want to delete "${device.phoneName}"?`
        );


    if (!confirmed) {
        return;
    }


    devices =
        devices.filter(
            item =>
                item.id !== id
        );

saveDevices();

renderShopNotifications();

renderMaintenance();
}


// ======================================================
// موظفين
// ======================================================

function hideEmployeeViews() {

    if (employeeForm) {

        employeeForm.style.display =
            "none";
    }

    if (attendanceSection) {

        attendanceSection.style.display =
            "none";
    }

    if (salariesSection) {

        salariesSection.style.display =
            "none";
    }

    if (employeeStatisticsSection) {

        employeeStatisticsSection.style.display =
            "none";
    }
}


function showEmployeeMain() {

    currentEmployeeView =
        "main";

    hideEmployeeViews();


    if (employeesList) {

        employeesList.style.display =
            "grid";
    }


    if (employeeSearchInput) {

        employeeSearchInput.parentElement.style.display =
            "block";
    }
}


function showEmployeeForm() {

    currentEmployeeView =
        "form";

    hideEmployeeViews();


    if (employeesList) {

        employeesList.style.display =
            "none";
    }


    if (employeeSearchInput) {

        employeeSearchInput.parentElement.style.display =
            "none";
    }


    if (employeeForm) {

        employeeForm.style.display =
            "block";

        employeeForm.scrollIntoView({
            behavior:
                "smooth",
            block:
                "start"
        });
    }
}


function showEmployeeStatistics() {

    currentEmployeeView =
        "statistics";

    hideEmployeeViews();


    if (employeesList) {

        employeesList.style.display =
            "none";
    }


    if (employeeSearchInput) {

        employeeSearchInput.parentElement.style.display =
            "none";
    }


    if (employeeStatisticsSection) {

        employeeStatisticsSection.style.display =
            "block";

        employeeStatisticsSection.scrollIntoView({
            behavior:
                "smooth",
            block:
                "start"
        });
    }


    renderEmployeeStatistics();
}


if (addEmployeeButton) {

    addEmployeeButton.addEventListener(
        "click",
        function () {

            editingEmployeeId =
                null;

            clearEmployeeForm();

            showEmployeeForm();
        }
    );
}


if (attendanceButton) {

    attendanceButton.addEventListener(
        "click",
        showAttendance
    );
}


if (salariesButton) {

    salariesButton.addEventListener(
        "click",
        showSalaries
    );
}


if (statisticsButton) {

    statisticsButton.addEventListener(
        "click",
        showEmployeeStatistics
    );
}


// ======================================================
// نموذج العامل
// ======================================================

function clearEmployeeForm() {

    if (employeeName) {

        employeeName.value =
            "";
    }

    if (employeePhone) {

        employeePhone.value =
            "";
    }

    if (employeeJob) {

        employeeJob.value =
            "";
    }

    if (employeeStartDate) {

        employeeStartDate.value =
            getToday();
    }

    if (employeeSalary) {

        employeeSalary.value =
            "";
    }
    const shiftInput = document.getElementById("employee-shift-start");
    if (shiftInput) shiftInput.value = "09:00";
    const attendanceCodeInput = document.getElementById("employee-attendance-code-input");
    if (attendanceCodeInput) attendanceCodeInput.value = "";

    if (employeeNotes) {

        employeeNotes.value =
            "";
    }
}


function generateEmployeeAttendanceCode() {
    const used = new Set((Array.isArray(employees) ? employees : []).map(e => String(e.attendanceCode || "")));
    let code = "";
    do { code = String(Math.floor(100000 + Math.random() * 900000)); } while (used.has(code));
    return code;
}

function normalizeEmployeeAttendanceCodes() {
    if (!Array.isArray(employees)) return;
    let changed = false;
    const used = new Set();
    employees.forEach(employee => {
        if (!employee.attendanceCode || used.has(String(employee.attendanceCode))) {
            let code; do { code = String(Math.floor(100000 + Math.random() * 900000)); } while (used.has(code));
            employee.attendanceCode = code; changed = true;
        }
        used.add(String(employee.attendanceCode));
        if (!employee.shiftStartTime) { employee.shiftStartTime = "09:00"; changed = true; }
    });
    if (changed && typeof saveEmployees === "function") saveEmployees();
}

function saveEmployee() {
    if (editingEmployeeId) {
        alert(currentLanguage === "ar" ? "تعديل بيانات العامل غير مسموح من واجهة العاملين." : "Employee editing is disabled.");
        return;
    }

    const name =
        employeeName
            ? employeeName.value.trim()
            : "";

    const phone =
        employeePhone
            ? employeePhone.value.trim()
            : "";

    const job =
        employeeJob
            ? employeeJob.value.trim()
            : "";

    const startDate =
        employeeStartDate
            ? employeeStartDate.value
            : getToday();

    const salary =
        employeeSalary
            ? employeeSalary.value
            : "";

    const notesValue =
        employeeNotes
            ? employeeNotes.value.trim()
            : "";

    const attendanceCodeInput = document.getElementById("employee-attendance-code-input");
    const attendanceCode = String(attendanceCodeInput?.value || "").trim();

    if (!/^\d{6}$/.test(attendanceCode)) {
        alert("اكتب كود حضور مكوّنًا من 6 أرقام للعامل.");
        attendanceCodeInput?.focus();
        return;
    }

    const duplicateCode = employees.some(employee =>
        String(employee.attendanceCode || "") === attendanceCode &&
        employee.id !== editingEmployeeId
    );
    if (duplicateCode) {
        alert("هذا الكود مستخدم بالفعل لعامل آخر. اختر كودًا مختلفًا.");
        attendanceCodeInput?.focus();
        return;
    }

    if (!name) {

        alert(
            currentLanguage === "ar"
                ? "من فضلك اكتب اسم العامل."
                : "Please enter employee name."
        );

        return;
    }


    if (!job) {

        alert(
            currentLanguage === "ar"
                ? "من فضلك اكتب وظيفة العامل."
                : "Please enter employee job."
        );

        return;
    }


    if (editingEmployeeId) {

        const index =
            employees.findIndex(
                employee =>
                    employee.id ===
                    editingEmployeeId
            );


        if (index !== -1) {

            employees[index] = {

                ...employees[index],

                name:
                    name,

                phone:
                    phone,

                job:
                    job,

                startDate:
                    startDate,

                salary:
                    salary,

                attendanceCode:
                    attendanceCode,

                shiftStartTime:
                    document.getElementById("employee-shift-start")?.value || employees[index].shiftStartTime || "09:00",

                notes:
                    notesValue
            };
        }

    } else {

        employees.unshift({

            id:
                createId(
                    "employee"
                ),

            name:
                name,

            phone:
                phone,

            job:
                job,

            startDate:
                startDate,

            salary:
                salary,

            shiftStartTime:
                document.getElementById("employee-shift-start")?.value || "09:00",

            attendanceCode:
                attendanceCode,

            notes:
                notesValue,

            attendance:
                {},

            loans:
                [],

            bonuses:
                [],

            createdAt:
                new Date().toISOString()
        });
    }


    saveEmployees();

    editingEmployeeId =
        null;

    clearEmployeeForm();

    showEmployeeMain();

    renderEmployees();

    updateEmployeeStats();
}


if (saveEmployeeButton) {

    saveEmployeeButton.addEventListener(
        "click",
        saveEmployee
    );
}


if (cancelEmployeeButton) {

    cancelEmployeeButton.addEventListener(
        "click",
        function () {

            editingEmployeeId =
                null;

            clearEmployeeForm();

            showEmployeeMain();

            renderEmployees();
        }
    );
}


// ======================================================
// Render العاملين
// ======================================================

function renderEmployees() {
    if (!employeesList) return;
    employeesList.style.display = "grid";

    if (!employees.length) {
        employeesList.innerHTML = `<div class="empty-state"><div style="font-size:45px;">👨‍🔧</div><h3>${currentLanguage === "ar" ? "لا يوجد عاملين" : "No employees"}</h3><p>${currentLanguage === "ar" ? "اضغط على إضافة عامل لإضافة أول عامل." : "Click Add Employee to add your first employee."}</p></div>`;
        return;
    }

    employeesList.innerHTML = employees.map((employee, index) => `
        <article class="employee-card employee-private-card" data-id="${escapeHTML(employee.id)}">
            <div class="employee-card-top" style="display:flex;align-items:center;justify-content:space-between;gap:10px">
                <div class="employee-number">#${index + 1}</div>
                <button type="button" class="employee-print-button" data-id="${escapeHTML(employee.id)}">🖨️ ${currentLanguage === "ar" ? "طباعة البطاقة" : "Print card"}</button>
            </div>
            <div class="employee-card-icon" style="font-size:38px;margin:14px 0">👨‍🔧</div>
            <h3>${escapeHTML(employee.name || "-")}</h3>
            <div class="employee-private-access" style="margin-top:16px;padding:14px;border:1px solid rgba(0,170,255,.25);border-radius:12px;background:rgba(0,120,255,.06)">
                <label style="display:block;margin-bottom:8px;font-weight:700" for="employee-private-code-${index}">🔐 ${currentLanguage === "ar" ? "أدخل كودك لعرض بياناتك" : "Enter your code to view your details"}</label>
                <div style="display:flex;gap:8px;flex-wrap:wrap">
                    <input id="employee-private-code-${index}" class="employee-private-code-input" type="password" inputmode="numeric" maxlength="6" autocomplete="off" placeholder="••••••" style="flex:1;min-width:130px;padding:11px;border-radius:9px">
                    <button type="button" class="employee-private-reveal-button" data-id="${escapeHTML(employee.id)}">${currentLanguage === "ar" ? "عرض بياناتي" : "Show my details"}</button>
                </div>
                <small style="display:block;opacity:.7;margin-top:8px">${currentLanguage === "ar" ? "لن تظهر البيانات الخاصة إلا بعد إدخال الكود الصحيح." : "Private details appear only after the correct code is entered."}</small>
            </div>
            <div class="employee-private-details" hidden style="margin-top:14px;padding:15px;border-radius:12px;background:rgba(0,170,120,.07);border:1px solid rgba(0,190,130,.25)"></div>
        </article>
    `).join("");

    employeesList.querySelectorAll(".employee-print-button").forEach(button => {
        button.addEventListener("click", () => printEmployeeData(button.dataset.id));
    });
    employeesList.querySelectorAll(".employee-private-reveal-button").forEach(button => {
        button.addEventListener("click", () => revealEmployeePrivateDetails(button));
    });
    employeesList.querySelectorAll(".employee-private-code-input").forEach(input => {
        input.addEventListener("keydown", event => {
            if (event.key === "Enter") {
                event.preventDefault();
                const card = input.closest(".employee-card");
                const reveal = card?.querySelector(".employee-private-reveal-button");
                if (reveal) reveal.click();
            }
        });
    });
}

function revealEmployeePrivateDetails(button) {
    const card = button.closest(".employee-card");
    const employee = employees.find(item => item.id === button.dataset.id);
    if (!card || !employee) return;
    const input = card.querySelector(".employee-private-code-input");
    const enteredCode = String(input?.value || "").trim();
    const details = card.querySelector(".employee-private-details");

    if (!/^\d{6}$/.test(enteredCode) || enteredCode !== String(employee.attendanceCode || "")) {
        if (details) { details.hidden = true; details.innerHTML = ""; }
        alert(currentLanguage === "ar" ? "الكود غير صحيح. لا يمكن عرض بيانات العامل." : "Incorrect code. Employee details cannot be shown.");
        if (input) { input.value = ""; input.focus(); }
        return;
    }

    const finance = getEmployeeFinance(employee);
    const today = getToday();
    const attendanceStatus = employee.attendance?.[today] === "present" ? "🟢 حاضر" : employee.attendance?.[today] === "absent" ? "🔴 غائب" : "🕒 لم يسجل اليوم";
    details.innerHTML = `
        <div style="font-weight:800;margin-bottom:12px">🔓 ${currentLanguage === "ar" ? "بياناتك الخاصة" : "Your private details"}</div>
        <div class="employee-info">📞 ${escapeHTML(employee.phone || "-")}</div>
        <div class="employee-info">💼 ${escapeHTML(employee.job || "-")}</div>
        <div class="employee-info">🕘 ${currentLanguage === "ar" ? "بداية الشيفت:" : "Shift starts:"} ${escapeHTML(employee.shiftStartTime || "09:00")}</div>
        <div class="employee-info">📅 ${escapeHTML(employee.startDate || "-")}</div>
        <div class="employee-info">💰 ${currentLanguage === "ar" ? "المرتب:" : "Salary:"} ${formatMoney(employee.salary)}</div>
        <div class="employee-info">💸 ${currentLanguage === "ar" ? "السلف:" : "Loans:"} ${formatMoney(finance.loanTotal)}</div>
        <div class="employee-info">🎁 ${currentLanguage === "ar" ? "المكافآت:" : "Bonuses:"} ${formatMoney(finance.bonusTotal)}</div>
        <div class="employee-info">🔴 ${currentLanguage === "ar" ? "خصم الغياب:" : "Absence deduction:"} ${formatMoney(finance.absenceDeduction)}</div>
        <div class="employee-info"><strong>💵 ${currentLanguage === "ar" ? "الصافي:" : "Net:"} ${formatMoney(finance.netSalary)}</strong></div>
        <div class="employee-info">📍 ${currentLanguage === "ar" ? "حالة اليوم:" : "Today's status:"} ${attendanceStatus}</div>
        ${employee.notes ? `<div class="employee-notes">📝 ${escapeHTML(employee.notes)}</div>` : ""}
        <button type="button" class="employee-self-delete-button" style="margin-top:14px;background:#b42332;color:#fff" data-id="${escapeHTML(employee.id)}">🗑️ ${currentLanguage === "ar" ? "حذف بطاقتي" : "Delete my card"}</button>
    `;
    details.hidden = false;
    input.value = "";
    details.querySelector(".employee-self-delete-button")?.addEventListener("click", () => deleteEmployeeWithCode(employee.id, enteredCode));
    // اخفاء البيانات الخاصة تلقائيًا بعد فترة قصيرة أو عند مغادرة التبويب.
    const hidePrivateDetails = () => {
        if (!details.isConnected) return;
        details.hidden = true;
        details.innerHTML = "";
    };
    window.setTimeout(hidePrivateDetails, 45000);
    document.addEventListener("visibilitychange", function hideOnLeave() {
        if (document.hidden) {
            hidePrivateDetails();
            document.removeEventListener("visibilitychange", hideOnLeave);
        }
    }, { once: true });
}

function deleteEmployeeWithCode(id, verifiedCode) {
    const employee = employees.find(item => item.id === id);
    if (!employee || String(employee.attendanceCode || "") !== String(verifiedCode || "")) {
        alert(currentLanguage === "ar" ? "لا تملك صلاحية حذف هذه البطاقة." : "You are not authorized to delete this card.");
        return;
    }
    const confirmed = confirm(currentLanguage === "ar" ? `سيتم حذف بطاقة العامل ${employee.name} وبياناته المرتبطة. هل أنت متأكد؟` : `Delete ${employee.name}'s card and related data?`);
    if (!confirmed) return;
    employees = employees.filter(item => item.id !== id);
    saveEmployees();
    renderEmployees();
    updateEmployeeStats();
}

// ======================================================
// أحداث العاملين
// ======================================================

function attachEmployeeCardEvents() {
    // بطاقات الموظفين لا تعرض أدوات تعديل؛ البيانات الخاصة لا تظهر إلا بعد التحقق بالكود.
}


// ======================================================
// تعديل العامل
// ======================================================

function editEmployee() {
    alert(currentLanguage === "ar" ? "تعديل بيانات العامل غير متاح." : "Employee editing is disabled.");
}


// ======================================================
// حذف العامل
// ======================================================

function deleteEmployee(id, verifiedCode) {
    // لا يسمح بالحذف إلا بعد مطابقة كود صاحب البطاقة.
    deleteEmployeeWithCode(id, verifiedCode);
}


// ======================================================
// الحضور والانصراف
// ======================================================

function showAttendance() {

    currentEmployeeView =
        "attendance";

    hideEmployeeViews();


    if (employeesList) {

        employeesList.style.display =
            "none";
    }


    if (employeeSearchInput) {

        employeeSearchInput.parentElement.style.display =
            "none";
    }


    if (attendanceSection) {

        attendanceSection.style.display =
            "block";

        attendanceSection.scrollIntoView({
            behavior:
                "smooth",
            block:
                "start"
        });
    }


    renderAttendance();
}


function renderAttendance() {
    if (!attendanceList) return;
    const today = getToday();
    processAutomaticEmployeeAbsences();
    attendanceList.innerHTML = employees.map(employee => {
        const status = employee.attendance && employee.attendance[today] || "";
        return `<div class="attendance-row" style="display:flex;align-items:center;justify-content:space-between;gap:15px;padding:15px;margin-bottom:10px;border-radius:12px;background:rgba(255,255,255,.04);flex-wrap:wrap;">
            <div><strong>${escapeHTML(employee.name)}</strong><div style="opacity:.7;margin-top:5px;">${escapeHTML(employee.job || "")}</div><small>الشيفت: ${escapeHTML(employee.shiftStartTime || "09:00")}</small></div>
            <strong>${status === "present" ? "🟢 حاضر" : status === "absent" ? "🔴 غائب تلقائيًا" : "🕒 في انتظار تسجيل الحضور"}</strong>
        </div>`;
    }).join("") || `<div class="empty-state">لا يوجد موظفون مسجلون.</div>`;
}

function registerEmployeeAttendanceByCode() {
    const input = document.getElementById("employee-attendance-code");
    const code = String(input?.value || "").trim();
    if (!/^\d{6}$/.test(code)) { alert("اكتب كود الحضور المكوّن من 6 أرقام."); return; }
    const employee = employees.find(item => String(item.attendanceCode || "") === code);
    if (!employee) { alert("كود الحضور غير صحيح."); return; }
    const today = getToday();
    if (!employee.attendance) employee.attendance = {};
    if (employee.attendance[today] === "present") { alert("تم تسجيل حضور العامل بالفعل اليوم."); return; }
    employee.attendance[today] = "present";
    employee.attendanceMeta = employee.attendanceMeta || {};
    employee.attendanceMeta[today] = { verifiedByCode: true, at: new Date().toISOString() };
    if (input) input.value = "";
    saveEmployees(); renderAttendance(); updateEmployeeStats();
    if (typeof addNotificationFromOperation === "function") addNotificationFromOperation({type:"employee-attendance",icon:"🟢",title:"تم تسجيل حضور عامل",details:employee.name + " — حضور بالكود"});
}

function processAutomaticEmployeeAbsences() {
    if (!Array.isArray(employees) || !employees.length) return;
    const now = new Date();
    const today = getToday();
    const currentTime = String(now.getHours()).padStart(2,"0") + ":" + String(now.getMinutes()).padStart(2,"0");
    let changed = false;
    employees.forEach(employee => {
        if (!employee || (employee.startDate && employee.startDate > today)) return;
        if (!employee.attendance) employee.attendance = {};
        const shift = /^\d{2}:\d{2}$/.test(employee.shiftStartTime || "") ? employee.shiftStartTime : "09:00";
        if (!employee.attendance[today] && currentTime >= shift) {
            employee.attendance[today] = "absent";
            employee.attendanceMeta = employee.attendanceMeta || {};
            employee.attendanceMeta[today] = { automatic: true, at: now.toISOString() };
            changed = true;
        }
    });
    if (changed) {
        saveEmployees();
        if (typeof addNotificationFromOperation === "function") addNotificationFromOperation({type:"employee-absence",icon:"🔴",title:"تسجيل غياب تلقائي",details:"تم تسجيل الغياب للعاملين الذين لم يسجلوا الحضور بعد موعد الشيفت."});
    }
}

(function initEmployeeAttendanceCodeEntry(){
    const button = document.getElementById("employee-attendance-submit");
    const input = document.getElementById("employee-attendance-code");
    if (button) button.addEventListener("click", registerEmployeeAttendanceByCode);
    if (input) input.addEventListener("keydown", event => { if (event.key === "Enter") { event.preventDefault(); registerEmployeeAttendanceByCode(); } });
    document.addEventListener("visibilitychange", () => { if (!document.hidden) { processAutomaticEmployeeAbsences(); if (typeof updateEmployeeStats === "function") updateEmployeeStats(); } });
    window.addEventListener("focus", () => { processAutomaticEmployeeAbsences(); if (typeof updateEmployeeStats === "function") updateEmployeeStats(); });
    window.setInterval(() => { if (!document.hidden) { processAutomaticEmployeeAbsences(); if (typeof updateEmployeeStats === "function") updateEmployeeStats(); } }, 60000);
})();

function setAttendance(
    employeeId,
    status
) {

    const employee =
        employees.find(
            item =>
                item.id === employeeId
        );

    if (!employee) {
        return;
    }


    if (!employee.attendance) {

        employee.attendance =
            {};
    }


    employee.attendance[
        getToday()
    ] = status;


    saveEmployees();

    renderAttendance();

    updateEmployeeStats();
}


// ======================================================
// المرتبات
// ======================================================

function showSalaries() {

    currentEmployeeView =
        "salaries";

    hideEmployeeViews();


    if (employeesList) {

        employeesList.style.display =
            "none";
    }


    if (employeeSearchInput) {

        employeeSearchInput.parentElement.style.display =
            "none";
    }


    if (salariesSection) {

        salariesSection.style.display =
            "block";

        salariesSection.scrollIntoView({
            behavior:
                "smooth",
            block:
                "start"
        });
    }


    renderSalaries();
}


function renderSalaries() {

    if (!salariesList) {
        return;
    }


    salariesList.innerHTML =
        employees
            .map(
                function (
                    employee,
                    index
                ) {

                    const finance =
                        getEmployeeFinance(
                            employee
                        );


                    return `

                        <div
                            class="salary-row"
                            style="
                                padding:18px;
                                margin-bottom:12px;
                                border-radius:14px;
                                background:rgba(255,255,255,.04);
                            "
                        >

                            <div
                                style="
                                    display:flex;
                                    justify-content:space-between;
                                    align-items:center;
                                    gap:15px;
                                    flex-wrap:wrap;
                                "
                            >

                                <div>

                                    <strong>
                                        #${index + 1}
                                        -
                                        ${escapeHTML(
                                            employee.name
                                        )}
                                    </strong>

                                    <div
                                        style="
                                            opacity:.7;
                                            margin-top:5px;
                                        "
                                    >
                                        ${escapeHTML(
                                            employee.job || ""
                                        )}
                                    </div>

                                </div>


                                <button
                                    type="button"
                                    class="salary-print-button"
                                    data-id="${escapeHTML(employee.id)}"
                                >
                                    🖨️
                                    ${
                                        currentLanguage === "ar"
                                            ? "طباعة"
                                            : "Print"
                                    }
                                </button>

                            </div>


                            <div
                                class="salary-details"
                                style="
                                    display:grid;
                                    grid-template-columns:repeat(5,1fr);
                                    gap:10px;
                                    margin-top:15px;
                                "
                            >

                                <div>
                                    💰
                                    ${
                                        currentLanguage === "ar"
                                            ? "المرتب الأساسي"
                                            : "Base Salary"
                                    }:
                                    <strong>
                                        ${formatMoney(
                                            finance.baseSalary
                                        )}
                                    </strong>
                                </div>


                                <div>
                                    🔴
                                    ${
                                        currentLanguage === "ar"
                                            ? "أيام الغياب"
                                            : "Absent Days"
                                    }:
                                    <strong>
                                        ${finance.absentDays}
                                    </strong>
                                </div>


                                <div>
                                    📉
                                    ${
                                        currentLanguage === "ar"
                                            ? "خصم الغياب"
                                            : "Absence Deduction"
                                    }:
                                    <strong>
                                        ${formatMoney(
                                            finance.absenceDeduction
                                        )}
                                    </strong>
                                </div>


                                <div>
                                    💸
                                    ${
                                        currentLanguage === "ar"
                                            ? "السلف"
                                            : "Loans"
                                    }:
                                    <strong>
                                        ${formatMoney(
                                            finance.loanTotal
                                        )}
                                    </strong>
                                </div>


                                <div>
                                    🎁
                                    ${
                                        currentLanguage === "ar"
                                            ? "المكافآت"
                                            : "Bonuses"
                                    }:
                                    <strong>
                                        ${formatMoney(
                                            finance.bonusTotal
                                        )}
                                    </strong>
                                </div>


                                <div>
                                    💵
                                    ${
                                        currentLanguage === "ar"
                                            ? "الصافي"
                                            : "Net Salary"
                                    }:
                                    <strong>
                                        ${formatMoney(
                                            finance.netSalary
                                        )}
                                    </strong>
                                </div>

                            </div>


                            <div
                                style="
                                    display:flex;
                                    gap:10px;
                                    flex-wrap:wrap;
                                    margin-top:15px;
                                "
                            >

                                <button
                                    type="button"
                                    class="add-loan-button"
                                    data-id="${escapeHTML(employee.id)}"
                                >
                                    💸
                                    ${
                                        currentLanguage === "ar"
                                            ? "إضافة سلفة"
                                            : "Add Loan"
                                    }
                                </button>


                                <button
                                    type="button"
                                    class="add-bonus-button"
                                    data-id="${escapeHTML(employee.id)}"
                                >
                                    🎁
                                    ${
                                        currentLanguage === "ar"
                                            ? "إضافة مكافأة"
                                            : "Add Bonus"
                                    }
                                </button>

                            </div>

                        </div>

                    `;
                }
            )
            .join("");


    salariesList
        .querySelectorAll(
            ".salary-print-button"
        )
        .forEach(
            button => {

                button.addEventListener(
                    "click",
                    function () {

                        printEmployeeData(
                            this.dataset.id
                        );
                    }
                );
            }
        );


    salariesList
        .querySelectorAll(
            ".add-loan-button"
        )
        .forEach(
            button => {

                button.addEventListener(
                    "click",
                    function () {

                        addEmployeeLoan(
                            this.dataset.id
                        );
                    }
                );
            }
        );


    salariesList
        .querySelectorAll(
            ".add-bonus-button"
        )
        .forEach(
            button => {

                button.addEventListener(
                    "click",
                    function () {

                        addEmployeeBonus(
                            this.dataset.id
                        );
                    }
                );
            }
        );
}


// ======================================================
// السلف
// ======================================================

function addEmployeeLoan(
    id
) {

    const employee =
        employees.find(
            item =>
                item.id === id
        );

    if (!employee) {
        return;
    }


    const value =
        prompt(
            currentLanguage === "ar"
                ? `أدخل قيمة السلفة للعامل ${employee.name}:`
                : `Enter loan amount for ${employee.name}:`
        );


    if (
        value === null ||
        value.trim() === ""
    ) {
        return;
    }


    const amount =
        Number(
            value
        );


    if (
        !Number.isFinite(
            amount
        ) ||
        amount <= 0
    ) {

        alert(
            currentLanguage === "ar"
                ? "أدخل مبلغًا صحيحًا."
                : "Enter a valid amount."
        );

        return;
    }


    if (!employee.loans) {

        employee.loans =
            [];
    }


    employee.loans.push({

        id:
            createId(
                "loan"
            ),

        amount:
            amount,

        date:
            getToday(),

        createdAt:
            new Date().toISOString()
    });


    saveEmployees();

    renderSalaries();

    updateEmployeeStats();
}


// ======================================================
// المكافآت
// ======================================================

function addEmployeeBonus(
    id
) {

    const employee =
        employees.find(
            item =>
                item.id === id
        );

    if (!employee) {
        return;
    }


    const value =
        prompt(
            currentLanguage === "ar"
                ? `أدخل قيمة المكافأة للعامل ${employee.name}:`
                : `Enter bonus amount for ${employee.name}:`
        );


    if (
        value === null ||
        value.trim() === ""
    ) {
        return;
    }


    const amount =
        Number(
            value
        );


    if (
        !Number.isFinite(
            amount
        ) ||
        amount <= 0
    ) {

        alert(
            currentLanguage === "ar"
                ? "أدخل مبلغًا صحيحًا."
                : "Enter a valid amount."
        );

        return;
    }


    if (!employee.bonuses) {

        employee.bonuses =
            [];
    }


    employee.bonuses.push({

        id:
            createId(
                "bonus"
            ),

        amount:
            amount,

        date:
            getToday(),

        createdAt:
            new Date().toISOString()
    });


    saveEmployees();

    renderSalaries();

    updateEmployeeStats();
}


// ======================================================
// حسابات العامل
// ======================================================

function getEmployeeFinance(
    employee
) {

    const salary =
        Number(
            employee.salary
        ) || 0;


    const attendance =
        employee.attendance || {};


    const absentDays =
        Object.values(
            attendance
        )
            .filter(
                status =>
                    status ===
                    "absent"
            )
            .length;


    const dailySalary =
        salary /
        30;


    const absenceDeduction =
        dailySalary *
        absentDays;


    const loanTotal =
        Array.isArray(
            employee.loans
        )
            ? employee.loans.reduce(
                function (
                    total,
                    item
                ) {

                    return (
                        total +
                        (
                            Number(
                                item.amount
                            ) || 0
                        )
                    );
                },
                0
            )
            : 0;


    const bonusTotal =
        Array.isArray(
            employee.bonuses
        )
            ? employee.bonuses.reduce(
                function (
                    total,
                    item
                ) {

                    return (
                        total +
                        (
                            Number(
                                item.amount
                            ) || 0
                        )
                    );
                },
                0
            )
            : 0;


    const netSalary =
        salary -
        absenceDeduction -
        loanTotal +
        bonusTotal;


    return {

        baseSalary:
            salary,

        absentDays:
            absentDays,

        absenceDeduction:
            absenceDeduction,

        loanTotal:
            loanTotal,

        bonusTotal:
            bonusTotal,

        netSalary:
            netSalary
    };
}


// ======================================================
// إحصائيات العاملين
// ======================================================

function renderEmployeeStatistics() {

    if (!employeeStatistics) {
        return;
    }


    if (!employees.length) {

        employeeStatistics.innerHTML = `

            <div class="empty-state">

                <div
                    style="font-size:45px;"
                >
                    📊
                </div>

                <h3>
                    ${
                        currentLanguage === "ar"
                            ? "لا توجد بيانات للعاملين"
                            : "No employee data"
                    }
                </h3>

            </div>

        `;

        return;
    }


    const statsMonth = getToday().slice(0, 7);
    const statsAttendance = employees.reduce((totals, employee) => {
        Object.entries(employee.attendance || {}).forEach(([date, status]) => {
            if (date.startsWith(statsMonth)) {
                if (status === "present") totals.present++;
                if (status === "absent") totals.absent++;
            }
        });
        return totals;
    }, { present: 0, absent: 0 });
    const statsPayroll = employees.reduce((totals, employee) => {
        const finance = getEmployeeFinance(employee);
        totals.base += Number(finance.baseSalary) || 0;
        totals.net += Number(finance.netSalary) || 0;
        totals.loans += Number(finance.loanTotal) || 0;
        totals.bonuses += Number(finance.bonusTotal) || 0;
        return totals;
    }, { base: 0, net: 0, loans: 0, bonuses: 0 });
    const statsRate = (statsAttendance.present + statsAttendance.absent)
        ? Math.round(statsAttendance.present / (statsAttendance.present + statsAttendance.absent) * 100)
        : 0;
    const statsDashboard = `
        <div class="employee-statistics-overview" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:12px;margin-bottom:20px">
            <div class="employee-stat-tile"><small>👥 إجمالي العاملين</small><h2>${employees.length}</h2></div>
            <div class="employee-stat-tile"><small>🟢 حضور الشهر</small><h2>${statsAttendance.present}</h2></div>
            <div class="employee-stat-tile"><small>🔴 غياب الشهر</small><h2>${statsAttendance.absent}</h2></div>
            <div class="employee-stat-tile"><small>📈 نسبة الحضور</small><h2>${statsRate}%</h2></div>
            <div class="employee-stat-tile"><small>💰 إجمالي الرواتب</small><h2>${formatMoney(statsPayroll.base)}</h2></div>
            <div class="employee-stat-tile"><small>💵 صافي المستحق</small><h2>${formatMoney(statsPayroll.net)}</h2></div>
            <div class="employee-stat-tile"><small>💸 إجمالي السلف</small><h2>${formatMoney(statsPayroll.loans)}</h2></div>
            <div class="employee-stat-tile"><small>🎁 إجمالي المكافآت</small><h2>${formatMoney(statsPayroll.bonuses)}</h2></div>
        </div>`;

    employeeStatistics.innerHTML =
        statsDashboard + employees
            .map(
                function (
                    employee,
                    index
                ) {

                    const finance =
                        getEmployeeFinance(
                            employee
                        );
                    const monthPrefix = getToday().slice(0, 7);
                    const monthAttendance = Object.entries(employee.attendance || {}).filter(([date]) => date.startsWith(monthPrefix));
                    const monthPresent = monthAttendance.filter(([,status]) => status === "present").length;
                    const monthAbsent = monthAttendance.filter(([,status]) => status === "absent").length;

                    return `

                        <div
                            class="employee-statistics-card"
                            style="
                                padding:20px;
                                margin-bottom:15px;
                                border-radius:16px;
                                background:rgba(255,255,255,.04);
                            "
                        >

                            <div
                                style="
                                    display:flex;
                                    justify-content:space-between;
                                    align-items:center;
                                    gap:15px;
                                    flex-wrap:wrap;
                                "
                            >

                                <div>

                                    <h3>
                                        #${index + 1}
                                        -
                                        ${escapeHTML(
                                            employee.name
                                        )}
                                    </h3>

                                    <div
                                        style="
                                            opacity:.7;
                                        "
                                    >
                                        ${escapeHTML(
                                            employee.job || ""
                                        )}
                                    </div>

                                </div>


                                <button
                                    type="button"
                                    class="statistics-print-button"
                                    data-id="${escapeHTML(employee.id)}"
                                >
                                    🖨️
                                    ${
                                        currentLanguage === "ar"
                                            ? "طباعة"
                                            : "Print"
                                    }
                                </button>

                            </div>


                            <div
                                style="
                                    display:grid;
                                    grid-template-columns:repeat(auto-fit,minmax(180px,1fr));
                                    gap:12px;
                                    margin-top:15px;
                                "
                            >

                                <div>
                                    💰
                                    ${
                                        currentLanguage === "ar"
                                            ? "المرتب"
                                            : "Salary"
                                    }

                                    <strong>
                                        ${formatMoney(
                                            finance.baseSalary
                                        )}
                                    </strong>
                                </div>


                                <div>
                                    📅 حضور الشهر الحالي: <strong>${monthPresent}</strong>
                                </div>
                                <div>
                                    📅 غياب الشهر الحالي: <strong>${monthAbsent}</strong>
                                </div>
                                <div>
                                    🟢
                                    ${
                                        currentLanguage === "ar"
                                            ? "الحضور"
                                            : "Present"
                                    }

                                    <strong>
                                        ${
                                            getEmployeePresentDays(
                                                employee
                                            )
                                        }
                                    </strong>
                                </div>


                                <div>
                                    🔴
                                    ${
                                        currentLanguage === "ar"
                                            ? "الغياب"
                                            : "Absent"
                                    }

                                    <strong>
                                        ${finance.absentDays}
                                    </strong>
                                </div>


                                <div>
                                    📉
                                    ${
                                        currentLanguage === "ar"
                                            ? "خصم الغياب"
                                            : "Absence Deduction"
                                    }

                                    <strong>
                                        ${formatMoney(
                                            finance.absenceDeduction
                                        )}
                                    </strong>
                                </div>


                                <div>
                                    💸
                                    ${
                                        currentLanguage === "ar"
                                            ? "السلف"
                                            : "Loans"
                                    }

                                    <strong>
                                        ${formatMoney(
                                            finance.loanTotal
                                        )}
                                    </strong>
                                </div>


                                <div>
                                    🎁
                                    ${
                                        currentLanguage === "ar"
                                            ? "المكافآت"
                                            : "Bonuses"
                                    }

                                    <strong>
                                        ${formatMoney(
                                            finance.bonusTotal
                                        )}
                                    </strong>
                                </div>


                                <div>
                                    💵
                                    ${
                                        currentLanguage === "ar"
                                            ? "الصافي"
                                            : "Net"
                                    }

                                    <strong>
                                        ${formatMoney(
                                            finance.netSalary
                                        )}
                                    </strong>
                                </div>

                            </div>

                        </div>

                    `;
                }
            )
            .join("");


    employeeStatistics
        .querySelectorAll(
            ".statistics-print-button"
        )
        .forEach(
            button => {

                button.addEventListener(
                    "click",
                    function () {

                        printEmployeeData(
                            this.dataset.id
                        );
                    }
                );
            }
        );
}


// ======================================================
// أيام الحضور
// ======================================================

function getEmployeePresentDays(
    employee
) {

    if (
        !employee ||
        !employee.attendance
    ) {

        return 0;
    }


    return Object.values(
        employee.attendance
    )
        .filter(
            status =>
                status ===
                "present"
        )
        .length;
}


// ======================================================
// تحديث إحصائيات لوحة العاملين
// ======================================================

function updateEmployeeStats() {

    if (totalEmployees) {

        totalEmployees.textContent =
            employees.length;
    }


    let present =
        0;

    let absent =
        0;


    const today =
        getToday();


    employees.forEach(
        function (
            employee
        ) {

            const status =
                employee.attendance &&
                employee.attendance[
                    today
                ];


            if (
                status ===
                "present"
            ) {

                present++;

            } else if (
                status ===
                "absent"
            ) {

                absent++;
            }
        }
    );


    if (presentEmployees) {

        presentEmployees.textContent =
            present;
    }


    if (absentEmployees) {

        absentEmployees.textContent =
            absent;
    }


    const totalSalary =
        employees.reduce(
            function (
                total,
                employee
            ) {

                const finance =
                    getEmployeeFinance(
                        employee
                    );

                return (
                    total +
                    finance.netSalary
                );
            },
            0
        );


    if (totalSalaries) {

        totalSalaries.textContent =
            formatMoney(
                totalSalary
            );
    }
}


// ======================================================
// بحث العاملين
// ======================================================

let employeeSearchInput =
    document.getElementById(
        "employee-search-input"
    );


if (!employeeSearchInput) {

    employeeSearchInput =
        document.querySelector(
            "#employees-section input[type='search']"
        );
}


if (employeeSearchInput) {

    employeeSearchInput.addEventListener(
        "input",
        function () {

            const value =
                this.value
                    .trim()
                    .toLowerCase();


            if (!value) {

                renderEmployees();

                return;
            }


            const filtered =
                employees.filter(
                    employee => {

                        const text = [

                            employee.name,

                            employee.phone,

                            employee.job,

                            employee.notes

                        ]
                            .map(
                                item =>
                                    String(
                                        item || ""
                                    )
                                        .toLowerCase()
                            )
                            .join(" ");


                        return text.includes(
                            value
                        );
                    }
                );


            renderEmployees(
                filtered
            );
        }
    );
}


// ======================================================
// إغلاق أقسام العاملين
// ======================================================

function closeEmployeeSubsection() {

    currentEmployeeView =
        "main";

    hideEmployeeViews();

    showEmployeeMain();

    renderEmployees();
}


// ======================================================
// ربط زر الإحصائيات
// ======================================================

if (statisticsButton) {

    statisticsButton.addEventListener(
        "click",
        showEmployeeStatistics
    );
}


// ======================================================
// تحديث عرض العاملين
// ======================================================

function refreshEmployeeArea() {

    if (
        currentSection ===
        "employees"
    ) {

        renderEmployees();

        updateEmployeeStats();
    }
}


// ======================================================
// عرض الصفحة الحالية
// ======================================================

function renderCurrentView() {

    if (!currentUser) {
        return;
    }


    if (
        currentSection ===
        SECTIONS.SALE
    ) {

        showSalesArea();

        return;
    }


    if (
        [
            SECTIONS.PENDING,
            SECTIONS.READY,
            SECTIONS.FAILED,
            SECTIONS.DELIVERED
        ].includes(
            currentSection
        )
    ) {

        showMaintenanceSection(
            currentSection
        );

        return;
    }


    if (
        currentSection ===
        "employees"
    ) {

        showEmployeesArea();

        return;
    }
}


// ======================================================
// زر الرجوع للأعلى
// ======================================================

const topBtn =
    document.getElementById(
        "topBtn"
    );


if (topBtn) {

    window.addEventListener(
        "scroll",
        function () {

            if (
                window.scrollY >
                500
            ) {

                topBtn.classList.add(
                    "show"
                );

            } else {

                topBtn.classList.remove(
                    "show"
                );
            }
        }
    );


    topBtn.addEventListener(
        "click",
        function () {

            window.scrollTo({
                top:
                    0,

                behavior:
                    "smooth"
            });


            
        }
    );
}



// ======================================================
// BOTTOM NAVIGATION - FINAL FIX
// ======================================================

document.addEventListener("DOMContentLoaded", function () {

    const navHome = document.getElementById("nav-home");
    const navDevices = document.getElementById("nav-devices");
    const navSales = document.getElementById("nav-sales");
    const navPurchases = document.getElementById("nav-purchases");
    const navAccount = document.getElementById("nav-account");
    const navMore = document.getElementById("nav-more");

    const homeSection = document.getElementById("home-section");
    const salesArea = document.querySelector(".sales-area");
    const customersSection = document.getElementById("customers-section");
    const employeesSection = document.getElementById("employees-section");
    const moreSection = document.getElementById("more-section");
    const walletSection = document.getElementById("wallet-section");
    const accountSection = document.getElementById("account-section");
    const moreWallet = document.getElementById("more-wallet");

    const independentSales =
        document.getElementById("independent-sales-section");

    const independentPurchases =
        document.getElementById("independent-purchases-section");

    // ==================================================
    // إخفاء جميع الأقسام
    // ==================================================

    function hideAllSections() {

        const sections = [
            homeSection,
            salesArea,
            customersSection,
            employeesSection,
            moreSection,
            independentSales,
            independentPurchases,
            walletSection,
            accountSection
        ];

        sections.forEach(function (section) {
            if (section) {
                section.style.display = "none";
            }
        });

        // Hide all standalone modules when switching the main navigation.
        document.querySelectorAll(".act-extra-section, #day-close-section, #customer-management-section, #safe-overview-section, #settings-section, #accessories-section, #general-reports-section, #previous-days-section").forEach(function (section) {
            section.style.display = "none";
        });

        // Prevent a stale nested view from remaining visible beside the selected screen.
        document.querySelectorAll(".independent-sales-view, .independent-purchases-view, .more-grid").forEach(function (view) {
            if (view.classList.contains("more-grid")) return;
            view.style.display = "none";
        });

        if (independentSales) {

            independentSales
                .querySelectorAll(".independent-sales-view")
                .forEach(function (view) {
                    view.style.display = "none";
                });

            independentSales
                .querySelectorAll(".independent-sales-card")
                .forEach(function (card) {
                    card.classList.remove("active");
                });
        }
    }

    // ==================================================
    // تفعيل زر الشريط السفلي
    // ==================================================

    function activate(button) {

        document
            .querySelectorAll(".bottom-nav-button")
            .forEach(function (item) {
                item.classList.remove("active");
            });

        if (button) {
            button.classList.add("active");
        }
    }

    // ==================================================
    // إظهار القسم أسفل الهيدر
    // ==================================================

    function showSectionBelowHeader(section) {

        if (!section) {
            return;
        }

        const header = document.querySelector(".header");

        if (header && header.parentNode) {
            header.parentNode.insertBefore(
                section,
                header.nextSibling
            );
        }

        section.style.display = "block";

        window.scrollTo({
            top: 0,
            behavior: "auto"
        });
    }

  // ==================================================
// الرئيسية - إخفاء قسم الأجهزة نهائيًا من الشاشة
// ==================================================

if (navHome) {

    navHome.addEventListener("click", function (event) {

        event.preventDefault();
        event.stopImmediatePropagation();

        hideAllSections();

        // إخفاء قسم الأجهزة بالقوة
        document.querySelectorAll(".sales-area").forEach(function (section) {
            section.style.setProperty("display", "none", "important");
        });

        // إظهار الرئيسية فقط
        if (homeSection) {
            homeSection.style.display = "block";
        }

        activate(navHome);

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }, true);
}


    // ==================================================
    // الأجهزة
    // ==================================================

    if (navDevices) {

        navDevices.addEventListener("click", function (event) {

            event.preventDefault();
            event.stopImmediatePropagation();

            // إخفاء جميع الأقسام الأخرى
            hideAllSections();

            // إظهار قسم الأجهزة فقط
            if (salesArea) {
                salesArea.style.display = "block";
            }

            activate(navDevices);

            if (typeof showSalesArea === "function") {
                showSalesArea();
            }

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }, true);
    }

    // ==================================================
    // المبيعات المستقلة
    // ==================================================

    if (navSales) {

        navSales.addEventListener("click", function (event) {

            event.preventDefault();
            event.stopImmediatePropagation();

            hideAllSections();

            if (independentSales) {

                showSectionBelowHeader(independentSales);

                const salesCards =
                    independentSales.querySelector(
                        ".independent-sales-grid"
                    );

                if (salesCards) {
                    salesCards.style.display = "grid";
                }

                independentSales
                    .querySelectorAll(".independent-sales-view")
                    .forEach(function (view) {
                        view.style.display = "none";
                    });

                independentSales
                    .querySelectorAll(".independent-sales-card")
                    .forEach(function (card) {
                        card.classList.remove("active");
                    });
            }

            activate(navSales);

        }, true);
    }

    // ==================================================
    // المشتريات المستقلة
    // ==================================================

    if (navPurchases) {

        navPurchases.addEventListener("click", function (event) {

            event.preventDefault();
            event.stopImmediatePropagation();

            hideAllSections();

            if (!independentPurchases) {
                console.error(
                    "Purchases section not found: #independent-purchases-section"
                );
                return;
            }

            showSectionBelowHeader(independentPurchases);

            if (typeof window.renderIndependentPurchases === "function") {
                window.renderIndependentPurchases();
            }

            activate(navPurchases);

        }, true);
    }

    // ==================================================
    // حسابي
    // ==================================================

    if (navAccount) {

        navAccount.addEventListener("click", function (event) {

            event.preventDefault();
            event.stopImmediatePropagation();

            hideAllSections();

            if (!accountSection) {
                console.error(
                    "Account section not found: #account-section"
                );
                return;
            }

            showSectionBelowHeader(accountSection);
            activate(navAccount);

        }, true);
    }

    // ==================================================
    // المزيد
    // ==================================================

    if (navMore) {

        navMore.addEventListener("click", function (event) {

            event.preventDefault();
            event.stopImmediatePropagation();

            hideAllSections();

            if (moreSection) {

                showSectionBelowHeader(moreSection);

                const moreGrid =
                    moreSection.querySelector(".more-grid");

                if (moreGrid) {
                    moreGrid.style.display = "grid";
                }

                moreSection
                    .querySelectorAll(".more-card")
                    .forEach(function (card) {
                        card.style.display = "flex";
                    });
            }

            activate(navMore);

        }, true);
    }

    // ==================================================
    // ربط كروت الرئيسية بالأقسام الفعلية
    // ==================================================

    const homeDevices = document.getElementById("home-devices");
    const homeMaintenance = document.getElementById("home-maintenance");
    const homeEmployees = document.getElementById("home-employees");
    const homeSales = document.getElementById("home-sales");

    // كارت الأجهزة والبيع
    if (homeDevices) {
        homeDevices.addEventListener("click", function () {

            if (navDevices) {
                navDevices.click();
            }

        });
    }

    
    // كارت العملاء والصيانة
    if (homeMaintenance) {
        homeMaintenance.addEventListener("click", function (event) {

            event.preventDefault();

            hideAllSections();

            if (!customersSection) {
                console.error(
                    "Customers section not found: #customers-section"
                );
                return;
            }

            showSectionBelowHeader(customersSection);

            // فتح شاشة الصيانة الافتراضية مثل قسم المزيد
            if (typeof showMaintenanceSection === "function") {
                showMaintenanceSection("maintenance-pending");
            }

            activate(navMore);

            window.scrollTo({
                top: 0,
                behavior: "auto"
            });

        });
    }


    // كارت العاملين
    if (homeEmployees) {
        homeEmployees.addEventListener("click", function () {

            hideAllSections();

            if (employeesSection) {
                showSectionBelowHeader(employeesSection);
            } else {
                console.error(
                    "Employees section not found: #employees-section"
                );
            }

            activate(navMore);

        });
    }

    // كارت المبيعات
    if (homeSales) {
        homeSales.addEventListener("click", function () {

            if (navSales) {
                navSales.click();
            }

        });
    }

    // ==================================================
    // فتح المحفظة من المزيد
    // ==================================================

    if (moreWallet) {

        moreWallet.addEventListener("click", function (event) {

            event.preventDefault();
            event.stopPropagation();

            const walletPage =
                document.getElementById("wallet-section");

            document.querySelectorAll(".act-extra-section").forEach(function (section) {
                section.style.display = "none";
            });

            const morePage =
                document.getElementById("more-section");

            if (!walletPage || !morePage) {
                return;
            }

            [
                homeSection,
                salesArea,
                customersSection,
                employeesSection,
                independentSales,
                independentPurchases,
                accountSection
            ].forEach(function (section) {
                if (section) {
                    section.style.display = "none";
                }
            });

            // إبقاء المزيد ظاهراً خلف المحفظة
            morePage.style.display = "block";
            walletPage.style.display = "block";
            walletPage.style.position = "relative";
            walletPage.style.zIndex = "100";

            if (typeof renderWalletTransactions === "function") {
                renderWalletTransactions(walletPage);
            }

            window.scrollTo({
                top: 0,
                behavior: "auto"
            });

        }, true);
    }

});

// ======================================================
// MAINTENANCE SECTION - POSITION FIX
// ======================================================

document.addEventListener("DOMContentLoaded", function () {

    const maintenanceCard =
        document.getElementById("more-maintenance");

    const maintenanceSection =
        document.getElementById("customers-section");

    const moreSection =
        document.getElementById("more-section");

    const header =
        document.querySelector(".header");

    const navMore =
        document.getElementById("nav-more");

    if (!maintenanceCard || !maintenanceSection) {
        return;
    }

    maintenanceCard.addEventListener("click", function (event) {

        event.preventDefault();
        event.stopPropagation();

        // إخفاء الأقسام الأخرى
        [
            document.getElementById("home-section"),
            document.querySelector(".sales-area"),
            document.getElementById("employees-section"),
            moreSection,
            document.getElementById("independent-sales-section"),
            document.getElementById("wallet-section"),
            document.getElementById("account-section")
        ].forEach(function (section) {

            if (section) {
                section.style.display = "none";
            }

        });

        // نقل قسم الصيانة ليظهر مباشرة بعد الهيدر
        if (header && header.parentNode) {

            header.parentNode.insertBefore(
                maintenanceSection,
                header.nextSibling
            );

        }

        // إظهار قسم الصيانة
        maintenanceSection.style.display = "block";

        // فتح شاشة الصيانة الافتراضية
        if (typeof showMaintenanceSection === "function") {
            showMaintenanceSection("maintenance-pending");
        }

        // تفعيل زر المزيد
        document
            .querySelectorAll(".bottom-nav-button")
            .forEach(function (button) {
                button.classList.remove("active");
            });

        if (navMore) {
            navMore.classList.add("active");
        }

        requestAnimationFrame(function () {

            window.scrollTo({
                top: 0,
                behavior: "auto"
            });

        });

    });

});

// ==================================================
// أزرار المبيعات الداخلية
// ==================================================

document.addEventListener(
    "click",
    function (event) {

        const card = event.target.closest(
            ".independent-sales-card"
        );

        if (!card) {
            return;
        }

        event.preventDefault();
        event.stopPropagation();

        const salesSection =
            document.getElementById(
                "independent-sales-section"
            );

            const independentPurchases =
    document.getElementById(
        "independent-purchases-section"
    );

        if (!salesSection) {
            return;
        }

        // إخفاء كل صفحات المبيعات
        document
            .querySelectorAll(
                ".independent-sales-view"
            )
            .forEach(function (view) {
                view.style.display = "none";
            });

        // إزالة التفعيل من كل الكروت
        salesSection
            .querySelectorAll(
                ".independent-sales-card"
            )
            .forEach(function (item) {
                item.classList.remove("active");
            });

        // تفعيل الكارت المضغوط
        card.classList.add("active");

        // معرفة الصفحة المطلوبة
        const viewName =
            card.getAttribute(
                "data-sales-view"
            );

        const target =
            document.getElementById(
                "sales-view-" + viewName
            );

        if (!target) {
            return;
        }

        // إظهار الصفحة
      target.style.display = "block";


        // لو سجل المبيعات
        if (viewName === "history") {
            if (typeof renderSalesHistory === "function") {
                renderSalesHistory();
            }
        }

        // لو المرتجعات
        if (viewName === "returns") {
            if (typeof renderActReturns === "function") {
                renderActReturns();
            }
        }

        // لو التقارير
        if (viewName === "reports") {
            if (typeof renderSalesReports === "function") {
                renderSalesReports();
            }
        }

     
    },
    true
);
// ======================================================
// فتح الرئيسية بعد تسجيل الدخول
// ======================================================

onAuthStateChanged(
    auth,
    function (user) {

        if (!user) {
            return;
        }


        setTimeout(
            function () {

                const homeButton =
                    document.getElementById(
                        "nav-home"
                    );


                const mainPage =
                    document.getElementById(
                        "main-page"
                    );

                    const moreSection =
    document.getElementById(
        "more-section"
    );


                if (
                    homeButton &&
                    mainPage &&
                    mainPage.style.display !==
                        "none"
                ) {

                    homeButton.click();

                }

            },
            300
        );

    }
);


// ======================================================
// WALLET TRANSACTIONS STORAGE
// ======================================================

// ======================================================
// 💳 WALLET - RENDER TRANSACTIONS
// عرض سجل جميع عمليات المحفظة
// ======================================================

function renderWalletTransactions(walletPage) {

    if (!walletPage) {
        return;
    }

    const list =
        walletPage.querySelector(
            "#wallet-transactions-list"
        );

    const count =
        walletPage.querySelector(
            "#wallet-transactions-count"
        );

    const searchInput =
        walletPage.querySelector(
            "#wallet-transactions-search"
        );

    if (!list) {
        return;
    }


    // ==================================================
    // أنواع عمليات المحفظة
    // ==================================================

    const operations = [
        "withdraw",
        "deposit",
        "recharge",
        "bills",
        "transfer"
    ];


    // ==================================================
    // قراءة كل العمليات
    // ==================================================

    let transactions = [];

    operations.forEach(function (operation) {

        try {

            const storageKey =
                getWalletTransactionsStorageKey(
                    operation
                );

            const saved =
                localStorage.getItem(
                    storageKey
                );

            if (!saved) {
                return;
            }

            const parsed =
                JSON.parse(saved);

            if (Array.isArray(parsed)) {

                transactions =
                    transactions.concat(
                        parsed
                    );

            }

        } catch (error) {

            console.error(
                "Wallet render error:",
                error
            );

        }

    });


    // ==================================================
    // ترتيب الأحدث أولًا
    // ==================================================

    transactions.sort(
        function (a, b) {

            return (
                Number(b.createdAt || 0) -
                Number(a.createdAt || 0)
            );

        }
    );


    // ==================================================
    // البحث
    // ==================================================

    const searchValue =
        searchInput
            ? searchInput.value
                .trim()
                .toLowerCase()
            : "";


    const filteredTransactions =
        transactions.filter(
            function (transaction) {

                if (!searchValue) {
                    return true;
                }

                const searchableText =
                    [
                        transaction.id,
                        transaction.operationName,
                        transaction.operation,
                        transaction.service,
                        transaction.account,
                        transaction.statusName,
                        transaction.notes,
                        transaction.amount
                    ]
                        .filter(function (value) {
                            return (
                                value !== undefined &&
                                value !== null
                            );
                        })
                        .join(" ")
                        .toLowerCase();

                return searchableText.includes(
                    searchValue
                );

            }
        );


    // ==================================================
    // العدد
    // ==================================================

    if (count) {

        count.textContent =
            filteredTransactions.length +
            " عملية";

    }


    // ==================================================
    // لا توجد عمليات
    // ==================================================

    if (!filteredTransactions.length) {

        list.innerHTML = `
            <div
                style="
                    text-align:center;
                    padding:35px 20px;
                    color:#8fa0b8;
                    background:#08111e;
                    border:1px solid #1d3048;
                    border-radius:16px;
                "
            >
                📋 لا توجد عمليات محفوظة في سجل المحفظة
            </div>
        `;

        return;
    }


    // ==================================================
    // الأيقونات
    // ==================================================

    const operationIcons = {

        withdraw: "💸",

        deposit: "💰",

        recharge: "📱",

        bills: "🧾",

        transfer: "🔄"

    };


    // ==================================================
    // رسم العمليات
    // ==================================================

    list.innerHTML =
        filteredTransactions
            .map(
                function (transaction) {

                    const icon =
                        operationIcons[
                            transaction.operation
                        ] || "💳";

                        const operationNames = {

    withdraw: "عملية سحب",

    deposit: "عملية إيداع",

    recharge: "عملية شحن",

    bills: "عملية فواتير",

    transfer: "عملية تحويل"

};

const operationName =
    operationNames[
        transaction.operation
    ] || "عملية محفظة";


                    const formattedAmount =
                        Number(
                            transaction.amount || 0
                        ).toLocaleString(
                            "ar-EG"
                        );


                    const formattedDate =
                        transaction.date
                            ? new Date(
                                transaction.date
                            ).toLocaleString(
                                "ar-EG"
                            )
                            : "-";


                    return `

                        <div
                            style="
                                background:#08111e;
                                border:1px solid #1d3048;
                                border-radius:16px;
                                padding:18px;
                                margin-bottom:14px;
                            "
                        >

                            <div
                                style="
                                    display:flex;
                                    justify-content:space-between;
                                    align-items:center;
                                    gap:15px;
                                    margin-bottom:14px;
                                "
                            >

                                <div
                                    style="
                                        display:flex;
                                        align-items:center;
                                        gap:12px;
                                    "
                                >

                                    <div
                                        style="
                                            width:48px;
                                            height:48px;
                                            border-radius:14px;
                                            background:#111d30;
                                            display:flex;
                                            align-items:center;
                                            justify-content:center;
                                            font-size:25px;
                                        "
                                    >
                                        ${icon}
                                    </div>


                                    <div>

                                        <strong
                                            style="
                                                display:block;
                                                font-size:17px;
                                                margin-bottom:5px;
                                            "
                                        >
                                            ${operationName}
                                        </strong>


                                        <small
                                            style="
                                                color:#8fa0b8;
                                            "
                                        >
                                            ${
                                                transaction.service ||
                                                "-"
                                            }
                                        </small>

                                    </div>

                                </div>


                                <strong
                                    style="
                                        color:#6ea8ff;
                                        font-size:18px;
                                        white-space:nowrap;
                                    "
                                >
                                    ${formattedAmount} جنيه
                                </strong>

                            </div>


                            <div
                                style="
                                    display:grid;
                                    grid-template-columns:
                                        repeat(
                                            auto-fit,
                                            minmax(180px, 1fr)
                                        );
                                    gap:10px;
                                    color:#b8c5d8;
                                    font-size:14px;
                                "
                            >

                                <div>
                                    📱 الحساب:
                                    ${
                                        transaction.account ||
                                        "-"
                                    }
                                </div>


                                <div>
                                    🆔 الرقم:
                                    ${
                                        transaction.id ||
                                        "-"
                                    }
                                </div>


                                <div>
                                    🕒 التاريخ:
                                    ${formattedDate}
                                </div>


                                <div>
                                    ✅ الحالة:
                                    ${
                                        transaction.statusName ||
                                        "تم الحفظ"
                                    }
                                </div>

                            </div>


                            ${
                                transaction.notes
                                    ? `
                                        <div
                                            style="
                                                margin-top:12px;
                                                padding-top:12px;
                                                border-top:
                                                    1px solid #1d3048;
                                                color:#8fa0b8;
                                            "
                                        >
                                            📝 ${
                                                transaction.notes
                                            }
                                        </div>
                                    `
                                    : ""
                            }


                            <div
                                style="
                                    display:flex;
                                    gap:10px;
                                    margin-top:16px;
                                "
                            >

                                <button
                                    type="button"
                                    class="wallet-view-transaction"
                                    data-id="${transaction.id}"
                                    data-operation="${transaction.operation}"
                                    style="
                                        flex:1;
                                        padding:11px;
                                        border:1px solid #1d3048;
                                        border-radius:10px;
                                        background:#101c2d;
                                        color:#ffffff;
                                        cursor:pointer;
                                    "
                                >
                                    👁️ تفاصيل
                                </button>


                                <button
                                    type="button"
                                    class="wallet-delete-transaction"
                                    data-id="${transaction.id}"
                                    data-operation="${transaction.operation}"
                                    style="
                                        flex:1;
                                        padding:11px;
                                        border:1px solid #3a2630;
                                        border-radius:10px;
                                        background:#1b1016;
                                        color:#ff9cae;
                                        cursor:pointer;
                                    "
                                >
                                    🗑️ حذف
                                </button>

                            </div>

                        </div>

                    `;

                }
            )
            .join("");

}

// ======================================================
// 👁️ تفاصيل + 🗑️ حذف عمليات المحفظة
// ======================================================

document.addEventListener("click", function (event) {

    // ==================================================
    // 👁️ تفاصيل العملية
    // ==================================================

    const viewButton =
        event.target.closest(
            ".wallet-view-transaction"
        );

    if (viewButton) {

        event.preventDefault();
        event.stopPropagation();

        const id =
            viewButton.dataset.id || "";

        const operation =
            viewButton.dataset.operation || "";

        if (!id || !operation) {
            return;
        }

        const walletPage =
            document.getElementById(
                "wallet-section"
            );

        if (!walletPage) {
            return;
        }

        // نفس مفتاح الحفظ المستخدم في عملية المحفظة
        let userId = "guest";

        if (
            typeof currentUser !== "undefined" &&
            currentUser &&
            currentUser.uid
        ) {
            userId = currentUser.uid;
        }

        const storageKey =
            "actPhoneManager_wallet_transactions_" +
            operation +
            "_" +
            userId;

        let transactions = [];

        try {

            const saved =
                localStorage.getItem(
                    storageKey
                );

            if (saved) {

                const parsed =
                    JSON.parse(saved);

                if (Array.isArray(parsed)) {
                    transactions = parsed;
                }

            }

        } catch (error) {

            console.error(
                "Wallet details load error:",
                error
            );

            return;
        }

        const transaction =
            transactions.find(
                function (item) {
                    return item.id === id;
                }
            );

        if (!transaction) {

            alert(
                "لم يتم العثور على العملية."
            );

            return;
        }

        const operationNames = {

            withdraw: "💸 عملية سحب",

            deposit: "💰 عملية إيداع",

            recharge: "📱 عملية شحن",

            bills: "🧾 عملية فواتير",

            transfer: "🔄 عملية تحويل"

        };

        const operationName =
            operationNames[
                transaction.operation
            ] || "💳 عملية محفظة";

        const amount =
            Number(
                transaction.amount || 0
            ).toLocaleString("ar-EG");

        const date =
            transaction.date
                ? new Date(
                    transaction.date
                ).toLocaleString("ar-EG")
                : "-";

        const detailsMessage =

            operationName +
            "\n\n" +

            "🆔 رقم العملية: " +
            (transaction.id || "-") +

            "\n📱 الحساب / الرقم: " +
            (transaction.account || "-") +

            "\n💰 المبلغ: " +
            amount +
            " جنيه" +

            "\n📋 الخدمة: " +
            (transaction.service || "-") +

            "\n🕒 التاريخ: " +
            date +

            "\n✅ الحالة: " +
            (transaction.statusName || "تم الحفظ") +

            "\n📝 الملاحظات: " +
            (transaction.notes || "-");

        alert(detailsMessage);

        return;
    }


    // ==================================================
    // 🗑️ حذف العملية
    // ==================================================

    const deleteButton =
        event.target.closest(
            ".wallet-delete-transaction"
        );

    if (deleteButton) {

        event.preventDefault();
        event.stopPropagation();

        const id =
            deleteButton.dataset.id || "";

        const operation =
            deleteButton.dataset.operation || "";

        if (!id || !operation) {
            return;
        }

        const confirmDelete =
            confirm(
                "⚠️ هل أنت متأكد من حذف هذه العملية؟\n\n" +
                "لن يمكن استرجاع العملية بعد حذفها."
            );

        if (!confirmDelete) {
            return;
        }

        let userId = "guest";

        if (
            typeof currentUser !== "undefined" &&
            currentUser &&
            currentUser.uid
        ) {
            userId = currentUser.uid;
        }

        const storageKey =
            "actPhoneManager_wallet_transactions_" +
            operation +
            "_" +
            userId;

        let transactions = [];

        try {

            const saved =
                localStorage.getItem(
                    storageKey
                );

            if (saved) {

                const parsed =
                    JSON.parse(saved);

                if (Array.isArray(parsed)) {
                    transactions = parsed;
                }

            }

        } catch (error) {

            console.error(
                "Wallet delete load error:",
                error
            );

            alert(
                "حدث خطأ أثناء قراءة العملية."
            );

            return;
        }

        const oldLength =
            transactions.length;

        transactions =
            transactions.filter(
                function (item) {
                    return item.id !== id;
                }
            );

        if (
            transactions.length ===
            oldLength
        ) {

            alert(
                "لم يتم العثور على العملية."
            );

            return;
        }

        try {
const value = JSON.stringify(transactions);

// الحفظ المحلي
localStorage.setItem(storageKey, value);

// الحفظ السحابي
saveUserDataToCloud(storageKey, value);

        } catch (error) {

            console.error(
                "Wallet delete save error:",
                error
            );

            alert(
                "حدث خطأ أثناء حذف العملية."
            );

            return;
        }

        // تحديث السجل فورًا
        const walletPage =
            document.getElementById(
                "wallet-section"
            );

        if (
            walletPage &&
            typeof renderWalletTransactions ===
                "function"
        ) {

            renderWalletTransactions(
                walletPage
            );

        }

        alert(
            "✅ تم حذف العملية بنجاح."
        );

    }

});

// ======================================================
// 💳 البحث في سجل عمليات المحفظة
// ======================================================

const walletTransactionsSearch =
    document.getElementById(
        "wallet-transactions-search"
    );

if (walletTransactionsSearch) {

    walletTransactionsSearch.addEventListener(
        "input",
        function () {

            const walletPage =
                document.getElementById(
                    "wallet-section"
                );

            if (!walletPage) {
                return;
            }

            renderWalletTransactions(
                walletPage
            );

        }
    );

}
// =========================================================
// ACT PHONE MANAGER
// SALES SYSTEM
// بيع جديد → سجل المبيعات → التقارير
// =========================================================

(function () {

    "use strict";


    /* =========================================================
       STORAGE
    ========================================================= */

    function getSalesStorageKey() {

        if (
            typeof currentUser !== "undefined" &&
            currentUser &&
            currentUser.uid
        ) {

            return (
                "actPhoneManager_sales_" +
                currentUser.uid
            );

        }


        return "actPhoneManager_sales_guest";

    }


    let salesData = [];


    function loadSalesData() {

        try {

            const key =
                getSalesStorageKey();


            const saved =
                localStorage.getItem(key);


            salesData =
                saved
                    ? JSON.parse(saved)
                    : [];


            if (!Array.isArray(salesData)) {

                salesData = [];

            }

        } catch (error) {

            console.error(
                "Sales load error:",
                error
            );

            salesData = [];

        }


        renderSalesHistory();

        renderSalesReports();

        updateNewSaleSummary();

    }


function saveSalesData() {

    try {

        const key = getSalesStorageKey();
        const value = JSON.stringify(salesData);

        // الحفظ المحلي
        localStorage.setItem(
            key,
            value
        );

        // الحفظ السحابي
        saveUserDataToCloud(
            key,
            value
        );

        window.dispatchEvent(new Event("act-sales-data-updated"));
        if (typeof addNotificationFromOperation === "function") {
            addNotificationFromOperation({type:"sale",icon:"🛒",title:"تم تحديث سجل المبيعات",details:"تم حفظ بيانات المبيعات بنجاح"});
        }

    } catch (error) {

        console.error(
            "Sales save error:",
            error
        );

    }

}

    // =========================================================
    // باقي نظام المبيعات يكمل بعد هذا الجزء كما هو
    // =========================================================


    /* =========================================================
       HELPERS
       ========================================================= */

    function salesNumber(value) {

        const number =
            Number(value);

        return Number.isFinite(number)
            ? number
            : 0;
    }


    function salesMoney(value) {

        const number =
            salesNumber(value);

        if (
            typeof formatMoney === "function"
        ) {
            return formatMoney(number);
        }

        return number.toLocaleString("en-US");
    }


    function salesEscape(value) {

        if (
            typeof escapeHTML === "function"
        ) {
            return escapeHTML(
                String(value ?? "")
            );
        }

        return String(value ?? "")
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }


    function getNextInvoiceNumber() {

        let highest = 0;

        salesData.forEach(function (sale) {

            const number =
                parseInt(
                    sale.invoiceNumber,
                    10
                );

            if (
                Number.isFinite(number) &&
                number > highest
            ) {
                highest = number;
            }

        });

        return String(highest + 1)
            .padStart(3, "0");
    }


    function getPaymentName(method) {

        const names = {

            cash: "نقدي / كاش",

            card: "بطاقة",

            transfer: "تحويل",

            installment: "تقسيط",

            credit: "آجل"

        };

        return (
            names[method] ||
            method ||
            "-"
        );
    }


    function getSaleDate(sale) {

        return (
            sale.date ||
            sale.createdAt ||
            ""
        );
    }

    


    function formatSaleDate(dateValue) {

        if (!dateValue) {
            return "-";
        }

        const date =
            new Date(dateValue);

        if (Number.isNaN(date.getTime())) {
            return "-";
        }

        return date.toLocaleString(
            "ar-EG",
            {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit"
            }
        );
    }


    /* =========================================================
       NEW SALE CALCULATIONS
       ========================================================= */

    function getNewSaleValues() {

        const priceInput =
            document.getElementById(
                "sale-price"
            );

        const discountInput =
            document.getElementById(
                "sale-discount"
            );

        const paidInput =
            document.getElementById(
                "sale-paid"
            );

        const price =
            salesNumber(
                priceInput
                    ? priceInput.value
                    : 0
            );

        const discount =
            salesNumber(
                discountInput
                    ? discountInput.value
                    : 0
            );

        const paid =
            salesNumber(
                paidInput
                    ? paidInput.value
                    : 0
            );

        const total =
            Math.max(
                0,
                price - discount
            );

        const due =
            Math.max(
                0,
                total - paid
            );

        return {
            price,
            discount,
            paid,
            total,
            due
        };
    }


    function updateNewSaleSummary() {

        const values =
            getNewSaleValues();


        const view =
            document.getElementById(
                "sales-view-new"
            );

        if (!view) {
            return;
        }


        /*
         * يدعم صندوق الحساب الموجود
         * حتى لو كانت الـ IDs الخاصة
         * بالأرقام مختلفة.
         */

        const calculationBox =
            view.querySelector(
                ".sales-calculation-box"
            );

        if (calculationBox) {

            const valuesElements =
                calculationBox.querySelectorAll(
                    "strong"
                );

            if (valuesElements[0]) {
                valuesElements[0].textContent =
                    "1";
            }

            if (valuesElements[1]) {
                valuesElements[1].textContent =
                    salesMoney(
                        values.total
                    ) + " جنيه";
            }

            if (valuesElements[2]) {
                valuesElements[2].textContent =
                    salesMoney(
                        values.paid
                    ) + " جنيه";
            }

            if (valuesElements[3]) {
                valuesElements[3].textContent =
                    salesMoney(
                        values.due
                    ) + " جنيه";
            }
        }


        /*
         * لو الـ HTML فيه IDs مباشرة
         * هنحدثها أيضًا.
         */

        const totalElement =
            document.getElementById(
                "sales-new-total"
            );

        const paidElement =
            document.getElementById(
                "sales-new-paid"
            );

        const dueElement =
            document.getElementById(
                "sales-new-due"
            );

        if (totalElement) {
            totalElement.textContent =
                salesMoney(values.total);
        }

        if (paidElement) {
            paidElement.textContent =
                salesMoney(values.paid);
        }

        if (dueElement) {
            dueElement.textContent =
                salesMoney(values.due);
        }
    }


    /* =========================================================
       RESET FORM
       ========================================================= */

    function clearNewSaleForm() {

        const ids = [

            "sale-product-name",

            "sale-serial",

            "sale-customer",

            "sale-phone",

            "sale-price",

            "sale-discount",

            "sale-paid",

            "sale-notes"

        ];


        ids.forEach(function (id) {

            const element =
                document.getElementById(id);

            if (element) {
                element.value = "";
            }

        });


        const paymentMethod =
            document.getElementById(
                "sale-payment-method"
            );

        if (paymentMethod) {

            paymentMethod.selectedIndex =
                0;
        }


        updateNewSaleSummary();
    }


    /* =========================================================
       SAVE NEW SALE
       ========================================================= */

    function saveNewSale() {

        const productInput =
            document.getElementById(
                "sale-product-name"
            );

        const serialInput =
            document.getElementById(
                "sale-serial"
            );

        const customerInput =
            document.getElementById(
                "sale-customer"
            );

        const phoneInput =
            document.getElementById(
                "sale-phone"
            );

        const priceInput =
            document.getElementById(
                "sale-price"
            );

        const discountInput =
            document.getElementById(
                "sale-discount"
            );

        const paidInput =
            document.getElementById(
                "sale-paid"
            );

        const paymentInput =
            document.getElementById(
                "sale-payment-method"
            );

        const notesInput =
            document.getElementById(
                "sale-notes"
            );


        if (!productInput) {

            console.error(
                "sale-product-name not found"
            );

            return;
        }


        const productName =
            productInput.value.trim();

        const serial =
            serialInput
                ? serialInput.value.trim()
                : "";

        const customerName =
            customerInput
                ? customerInput.value.trim()
                : "";

        const customerPhone =
            phoneInput
                ? phoneInput.value.trim()
                : "";

        const paymentMethod =
            paymentInput
                ? paymentInput.value
                : "";

        const notes =
            notesInput
                ? notesInput.value.trim()
                : "";


        const values =
            getNewSaleValues();


        /* =========================
           VALIDATION
           ========================= */

        if (!productName) {

            alert(
                "من فضلك اكتب اسم المنتج أو الجهاز."
            );

            productInput.focus();

            return;
        }


        if (values.price <= 0) {

            alert(
                "من فضلك أدخل سعر البيع."
            );

            if (priceInput) {
                priceInput.focus();
            }

            return;
        }


        if (values.discount > values.price) {

            alert(
                "الخصم لا يمكن أن يكون أكبر من سعر البيع."
            );

            if (discountInput) {
                discountInput.focus();
            }

            return;
        }


        if (values.paid > values.total) {

            alert(
                "المبلغ المدفوع لا يمكن أن يكون أكبر من إجمالي الفاتورة."
            );

            if (paidInput) {
                paidInput.focus();
            }

            return;
        }


        if (!paymentMethod) {

            alert(
                "من فضلك اختر طريقة الدفع."
            );

            if (paymentInput) {
                paymentInput.focus();
            }

            return;
        }


        /* =========================
           CREATE INVOICE
           ========================= */

        const now =
            new Date();

        const sale = {

            id:
                typeof createId === "function"
                    ? createId("sale")
                    : "sale_" +
                      Date.now(),

            invoiceNumber:
                getNextInvoiceNumber(),

            productName,

            serial,

            customerName,

            customerPhone,

            price:
                values.price,

            discount:
                values.discount,

            total:
                values.total,

            paid:
                values.paid,

            due:
                values.due,

            paymentMethod,

            notes,

            date:
                now.toISOString(),

            createdAt:
                now.toISOString()

        };


        salesData.unshift(
            sale
        );

        saveSalesData();
        if (customerName && customerPhone && typeof window.actCustomerUpsertFromSale === "function") {
            window.actCustomerUpsertFromSale({ name: customerName, phone: customerPhone });
        }


        /* =========================
           UPDATE EVERYTHING
           ========================= */

        renderSalesHistory();

        renderSalesReports();

        updateNewSaleSummary();


        alert(
            "تم حفظ الفاتورة رقم #" +
            sale.invoiceNumber +
            " بنجاح."
        );


        clearNewSaleForm();


        /*
         * الانتقال تلقائيًا إلى سجل المبيعات
         */

        const historyCard =
            document.querySelector(
                '.independent-sales-card[data-sales-view="history"]'
            );

        if (historyCard) {

            historyCard.click();

        }

    }


    /* =========================================================
       HISTORY FILTERS
       ========================================================= */

    function getFilteredSales() {

        let result =
            salesData.slice();


        const searchInput =
            document.getElementById(
                "sales-history-search"
            );

        const paymentFilter =
            document.getElementById(
                "sales-history-payment-filter"
            );

        const dateFilter =
            document.getElementById(
                "sales-history-date-filter"
            );


        const search =
            searchInput
                ? searchInput.value
                    .trim()
                    .toLowerCase()
                : "";


        const payment =
            paymentFilter
                ? paymentFilter.value
                : "all";


        const date =
            dateFilter
                ? dateFilter.value
                : "all";


        /* =========================
           SEARCH
           ========================= */

        if (search) {

            result =
                result.filter(
                    function (sale) {

                        const text =
                            [
                                sale.invoiceNumber,
                                sale.productName,
                                sale.serial,
                                sale.customerName,
                                sale.customerPhone
                            ]
                            .join(" ")
                            .toLowerCase();

                        return text.includes(
                            search
                        );
                    }
                );
        }


        /* =========================
           PAYMENT
           ========================= */

        if (
            payment &&
            payment !== "all"
        ) {

            result =
                result.filter(
                    function (sale) {

                        return (
                            sale.paymentMethod ===
                            payment
                        );

                    }
                );
        }


        /* =========================
           DATE
           ========================= */

        if (
            date &&
            date !== "all"
        ) {

            const now =
                new Date();


            result =
                result.filter(
                    function (sale) {

                        const saleDate =
                            new Date(
                                getSaleDate(
                                    sale
                                )
                            );

                        if (
                            Number.isNaN(
                                saleDate.getTime()
                            )
                        ) {
                            return false;
                        }


                        if (
                            date === "today"
                        ) {

                            return (
                                saleDate
                                    .getFullYear() ===
                                    now.getFullYear() &&

                                saleDate
                                    .getMonth() ===
                                    now.getMonth() &&

                                saleDate
                                    .getDate() ===
                                    now.getDate()
                            );
                        }


                        if (
                            date === "week" ||
                            date === "7days"
                        ) {

                            const sevenDays =
                                7 *
                                24 *
                                60 *
                                60 *
                                1000;

                            return (
                                now -
                                saleDate <=
                                sevenDays &&
                                saleDate <=
                                now
                            );
                        }


                        if (
                            date === "month"
                        ) {

                            return (
                                saleDate
                                    .getFullYear() ===
                                    now.getFullYear() &&

                                saleDate
                                    .getMonth() ===
                                    now.getMonth()
                            );
                        }


                        return true;

                    }
                );
        }


        return result;
    }


    /* =========================================================
       HISTORY SUMMARY
       ========================================================= */

    function updateHistorySummary(
        visibleSales
    ) {

        const count =
            visibleSales.length;


        const total =
            visibleSales.reduce(
                function (sum, sale) {
                    return (
                        sum +
                        salesNumber(
                            sale.total
                        )
                    );
                },
                0
            );


        const paid =
            visibleSales.reduce(
                function (sum, sale) {
                    return (
                        sum +
                        salesNumber(
                            sale.paid
                        )
                    );
                },
                0
            );


        const due =
            visibleSales.reduce(
                function (sum, sale) {
                    return (
                        sum +
                        salesNumber(
                            sale.due
                        )
                    );
                },
                0
            );


        const countElement =
            document.getElementById(
                "sales-history-count"
            );

        const totalElement =
            document.getElementById(
                "sales-history-total"
            );

        const paidElement =
            document.getElementById(
                "sales-history-paid"
            );

        const dueElement =
            document.getElementById(
                "sales-history-due"
            );


        if (countElement) {
            countElement.textContent =
                count;
        }

        if (totalElement) {
            totalElement.textContent =
                salesMoney(total);
        }

        if (paidElement) {
            paidElement.textContent =
                salesMoney(paid);
        }

        if (dueElement) {
            dueElement.textContent =
                salesMoney(due);
        }
    }


    /* =========================================================
       RENDER SALES HISTORY
       ========================================================= */

    function renderSalesHistory() {

        const list =
            document.getElementById(
                "sales-history-list"
            );

        if (!list) {
            return;
        }


        const visibleSales =
            getFilteredSales();


        updateHistorySummary(
            visibleSales
        );


        if (
            visibleSales.length === 0
        ) {

            list.innerHTML = `
                <tr>
                    <td colspan="10">
                        <div class="sales-empty-state">
                            📋 لا توجد مبيعات حتى الآن
                        </div>
                    </td>
                </tr>
            `;

            return;
        }


        list.innerHTML =
            visibleSales
                .map(
                    function (sale) {

                        return `
                            <tr>

                                <td>
                                    <strong>
                                        #${salesEscape(
                                            sale.invoiceNumber
                                        )}
                                    </strong>
                                </td>

                                <td>
                                    ${salesEscape(
                                        sale.productName
                                    )}

                                    ${
                                        sale.serial
                                            ? `
                                                <br>
                                                <small>
                                                    سريل:
                                                    ${salesEscape(
                                                        sale.serial
                                                    )}
                                                </small>
                                              `
                                            : ""
                                    }
                                </td>

                                <td>
                                    ${salesEscape(
                                        sale.customerName ||
                                        "-"
                                    )}

                                    ${
                                        sale.customerPhone
                                            ? `
                                                <br>
                                                <small>
                                                    ${salesEscape(
                                                        sale.customerPhone
                                                    )}
                                                </small>
                                              `
                                            : ""
                                    }
                                </td>

                                <td>
                                    ${salesMoney(
                                        sale.price
                                    )}
                                </td>

                                <td>
                                    ${salesMoney(
                                        sale.discount
                                    )}
                                </td>

                                <td>
                                    ${salesMoney(
                                        sale.paid
                                    )}
                                </td>

                                <td>
                                    ${salesMoney(
                                        sale.due
                                    )}
                                </td>

                                <td>
                                    ${salesEscape(
                                        getPaymentName(
                                            sale.paymentMethod
                                        )
                                    )}
                                </td>

                                <td>
                                    ${salesEscape(
                                        formatSaleDate(
                                            getSaleDate(
                                                sale
                                            )
                                        )
                                    )}
                                </td>

                                <td>

                                    <button
                                        type="button"
                                        class="sales-print-button"
                                        data-print-sale="${salesEscape(
                                            sale.id
                                        )}"
                                    >
                                        🖨️
                                    </button>

                                    <button
                                        type="button"
                                        class="sales-delete-button"
                                        data-delete-sale="${salesEscape(
                                            sale.id
                                        )}"
                                    >
                                        🗑️
                                    </button>

                                </td>

                            </tr>
                        `;

                    }
                )
                .join("");


        attachHistoryActions();
    }


    /* =========================================================
       HISTORY ACTIONS
       ========================================================= */

    function attachHistoryActions() {

        document
            .querySelectorAll(
                "[data-print-sale]"
            )
            .forEach(
                function (button) {

                    button.onclick =
                        function () {

                            printSaleInvoice(
                                button.getAttribute(
                                    "data-print-sale"
                                )
                            );

                        };

                }
            );


        document
            .querySelectorAll(
                "[data-delete-sale]"
            )
            .forEach(
                function (button) {

                    button.onclick =
                        function () {

                            deleteSale(
                                button.getAttribute(
                                    "data-delete-sale"
                                )
                            );

                        };

                }
            );
    }


    /* =========================================================
       DELETE SALE
       ========================================================= */

    function deleteSale(id) {

        const sale =
            salesData.find(
                function (item) {
                    return item.id === id;
                }
            );


        if (!sale) {
            return;
        }


        const confirmed =
            confirm(
                "هل أنت متأكد من حذف الفاتورة رقم #" +
                sale.invoiceNumber +
                "؟"
            );


        if (!confirmed) {
            return;
        }


        salesData =
            salesData.filter(
                function (item) {
                    return item.id !== id;
                }
            );


        saveSalesData();

        renderSalesHistory();

        renderSalesReports();

    }


    /* =========================================================
       REPORTS
       ========================================================= */

    function getTodaySales() {

        const now =
            new Date();

        return salesData.filter(
            function (sale) {

                const date =
                    new Date(
                        getSaleDate(
                            sale
                        )
                    );

                if (
                    Number.isNaN(
                        date.getTime()
                    )
                ) {
                    return false;
                }

                return (
                    date.getFullYear() ===
                    now.getFullYear() &&

                    date.getMonth() ===
                    now.getMonth() &&

                    date.getDate() ===
                    now.getDate()
                );
            }
        );
    }


    function getMonthSales() {

        const now =
            new Date();

        return salesData.filter(
            function (sale) {

                const date =
                    new Date(
                        getSaleDate(
                            sale
                        )
                    );

                if (
                    Number.isNaN(
                        date.getTime()
                    )
                ) {
                    return false;
                }

                return (
                    date.getFullYear() ===
                    now.getFullYear() &&

                    date.getMonth() ===
                    now.getMonth()
                );
            }
        );
    }


    function sumSales(
        list,
        property
    ) {

        return list.reduce(
            function (sum, sale) {

                return (
                    sum +
                    salesNumber(
                        sale[property]
                    )
                );

            },
            0
        );
    }


    function setReportValue(
        id,
        value
    ) {

        const element =
            document.getElementById(id);

        if (!element) {
            return;
        }

        element.textContent =
            value;
    }


    function renderSalesReports() {

        const todaySales =
            getTodaySales();

        const monthSales =
            getMonthSales();


        const todayTotal =
            sumSales(
                todaySales,
                "total"
            );


        const monthTotal =
            sumSales(
                monthSales,
                "total"
            );


        const allPaid =
            sumSales(
                salesData,
                "paid"
            );


        const allDue =
            sumSales(
                salesData,
                "due"
            );


        const allDiscounts =
            sumSales(
                salesData,
                "discount"
            );


        /* =========================
           REPORT CARDS
           ========================= */

        setReportValue(
            "sales-report-today",
            salesMoney(todayTotal)
        );


        setReportValue(
            "sales-report-month",
            salesMoney(monthTotal)
        );


        setReportValue(
            "sales-report-paid",
            salesMoney(allPaid)
        );


        setReportValue(
            "sales-report-due",
            salesMoney(allDue)
        );


        setReportValue(
            "sales-report-discounts",
            salesMoney(allDiscounts)
        );


        setReportValue(
            "sales-report-count",
            salesData.length
        );


        /* =========================
           TOP PRODUCTS
           ========================= */

        renderTopProducts();


        /* =========================
           PAYMENT STATISTICS
           ========================= */

        renderPaymentStatistics();

    }


    /* =========================================================
       TOP PRODUCTS
       ========================================================= */

    function renderTopProducts() {

        const container =
            document.getElementById(
                "sales-top-products"
            );

        if (!container) {
            return;
        }


        if (!salesData.length) {

            container.innerHTML = `
                <div class="sales-empty-state">
                    📦 لا توجد بيانات مبيعات
                </div>
            `;

            return;
        }


        const products = {};


        salesData.forEach(
            function (sale) {

                const name =
                    sale.productName ||
                    "غير محدد";

                if (!products[name]) {

                    products[name] = {
                        count: 0,
                        total: 0
                    };

                }

                products[name].count++;

                products[name].total +=
                    salesNumber(
                        sale.total
                    );

            }
        );


        const sorted =
            Object.entries(products)
                .sort(
                    function (a, b) {

                        return (
                            b[1].count -
                            a[1].count
                        );

                    }
                )
                .slice(0, 10);


        container.innerHTML =
            sorted
                .map(
                    function (entry) {

                        const name =
                            entry[0];

                        const data =
                            entry[1];

                        return `
                            <div class="sales-report-row">

                                <span>
                                    ${salesEscape(
                                        name
                                    )}
                                </span>

                                <strong>
                                    ${data.count}
                                    عملية
                                    —
                                    ${salesMoney(
                                        data.total
                                    )}
                                    جنيه
                                </strong>

                            </div>
                        `;

                    }
                )
                .join("");

    }


    /* =========================================================
       PAYMENT STATISTICS
       ========================================================= */

    function renderPaymentStatistics() {

        const container =
            document.getElementById(
                "sales-payment-statistics"
            );

        if (!container) {
            return;
        }


        if (!salesData.length) {

            container.innerHTML = `
                <div class="sales-empty-state">
                    💳 لا توجد بيانات دفع
                </div>
            `;

            return;
        }


        const payments = {};


        salesData.forEach(
            function (sale) {

                const method =
                    sale.paymentMethod ||
                    "unknown";


                if (!payments[method]) {

                    payments[method] = {
                        count: 0,
                        total: 0
                    };

                }


                payments[method].count++;

                payments[method].total +=
                    salesNumber(
                        sale.total
                    );

            }
        );


        container.innerHTML =
            Object.entries(payments)
                .map(
                    function (entry) {

                        const method =
                            entry[0];

                        const data =
                            entry[1];

                        return `
                            <div class="sales-report-row">

                                <span>
                                    ${salesEscape(
                                        getPaymentName(
                                            method
                                        )
                                    )}
                                </span>

                                <strong>
                                    ${data.count}
                                    عملية
                                    —
                                    ${salesMoney(
                                        data.total
                                    )}
                                    جنيه
                                </strong>

                            </div>
                        `;

                    }
                )
                .join("");

    }

    /* ========================================================= 
       PRINT SINGLE INVOICE 
       ========================================================= */ 
 
    function printSaleInvoice(id) { 
 
        const sale = 
            salesData.find( 
                function (item) { 
                    return item.id === id; 
                } 
            ); 
 
 
        if (!sale) { 
            return; 
        } 
 
 
        const printWindow = 
            window.open( 
                "", 
                "_blank", 
                "width=800,height=900" 
            ); 
 
 
        if (!printWindow) { 
 
            alert( 
                "المتصفح منع نافذة الطباعة. اسمح بالنوافذ المنبثقة ثم حاول مرة أخرى." 
            ); 
 
            return; 
        } 
 
 
        printWindow.document.write(` 
 
            <!DOCTYPE html> 
 
            <html lang="ar" dir="rtl"> 
 
            <head> 
 
                <meta charset="UTF-8"> 
 
                <title> 
                    فاتورة #${salesEscape( 
                        sale.invoiceNumber 
                    )} 
                </title> 
 
                <style> 
 
                    body { 
                        font-family: 
                            Arial, 
                            Tahoma, 
                            sans-serif; 
 
                        padding: 30px; 
 
                        color: #111; 
                    } 
 
                    .invoice { 
                        max-width: 700px; 
                        margin: auto; 
                    } 
 
                    h1 { 
                        text-align: center; 
                        margin-bottom: 5px; 
                    } 
 
                    .subtitle { 
                        text-align: center; 
                        margin-bottom: 30px; 
                    } 
 
                    .line { 
                        display: flex; 
                        justify-content: space-between; 
                        padding: 10px 0; 
                        border-bottom: 1px solid #ddd; 
                    } 
 
                    .total { 
                        font-size: 22px; 
                        font-weight: bold; 
                    } 
 
                    .footer { 
                        margin-top: 40px; 
                        text-align: center; 
                    } 
 
                </style> 
 
            </head> 
 
            <body> 
 
                <div class="invoice"> 
 
                    <h1> 
                        ACT PHONE MANAGER 
                    </h1> 
 
                    <div class="subtitle"> 
                        فاتورة بيع رقم 
                        #${salesEscape( 
                            sale.invoiceNumber 
                        )} 
                    </div> 
 
                    <div class="line"> 
                        <span>المنتج</span> 
                        <strong> 
                            ${salesEscape( 
                                sale.productName 
                            )} 
                        </strong> 
                    </div> 
 
                    ${ 
                        sale.serial 
                            ? ` 
                                <div class="line"> 
                                    <span>السريل</span> 
                                    <strong> 
                                        ${salesEscape( 
                                            sale.serial 
                                        )} 
                                    </strong> 
                                </div> 
                              ` 
                            : "" 
                    } 
 
                    <div class="line"> 
                        <span>العميل</span> 
                        <strong> 
                            ${salesEscape( 
                                sale.customerName || 
                                "-" 
                            )} 
                        </strong> 
                    </div> 
 
                    ${ 
                        sale.customerPhone 
                            ? ` 
                                <div class="line"> 
                                    <span>الهاتف</span> 
                                    <strong> 
                                        ${salesEscape( 
                                            sale.customerPhone 
                                        )} 
                                    </strong> 
                                </div> 
                              ` 
                            : "" 
                    } 
 
                    <div class="line"> 
                        <span>السعر</span> 
                        <strong> 
                            ${salesMoney( 
                                sale.price 
                            )} 
                            جنيه 
                        </strong> 
                    </div> 
 
                    <div class="line"> 
                        <span>الخصم</span> 
                        <strong> 
                            ${salesMoney( 
                                sale.discount 
                            )} 
                            جنيه 
                        </strong> 
                    </div> 
 
                    <div class="line total"> 
                        <span>الإجمالي</span> 
                        <strong> 
                            ${salesMoney( 
                                sale.total 
                            )} 
                            جنيه 
                        </strong> 
                    </div> 
 
                    <div class="line"> 
                        <span>المدفوع</span> 
                        <strong> 
                            ${salesMoney( 
                                sale.paid 
                            )} 
                            جنيه 
                        </strong> 
                    </div> 
 
                    <div class="line"> 
                        <span>المتبقي</span> 
                        <strong> 
                            ${salesMoney( 
                                sale.due 
                            )} 
                            جنيه 
                        </strong> 
                    </div> 
 
                    <div class="line"> 
                        <span>طريقة الدفع</span> 
                        <strong> 
                            ${salesEscape( 
                                getPaymentName( 
                                    sale.paymentMethod 
                                ) 
                            )} 
                        </strong> 
                    </div> 
 
                    <div class="line"> 
                        <span>التاريخ</span> 
                        <strong> 
                            ${salesEscape( 
                                formatSaleDate( 
                                    getSaleDate( 
                                        sale 
                                    ) 
                                ) 
                            )} 
                        </strong> 
                    </div> 
 
                    ${ 
                        sale.notes 
                            ? ` 
                                <div class="line"> 
                                    <span>ملاحظات</span> 
                                    <strong> 
                                        ${salesEscape( 
                                            sale.notes 
                                        )} 
                                    </strong> 
                                </div> 
                              ` 
                            : "" 
                    } 
 
                    <div class="footer"> 
                        شكرًا لتعاملكم معنا 
                    </div> 
 
                </div> 
 
                <script> 
 
                    window.onload = function () { 
                        window.print(); 
                    }; 
 
                <\/script> 
 
            </body> 
 
            </html> 
 
        `); 
 
 
        printWindow.document.close(); 
 
    } 
 
 
    /* ========================================================= 
       PRINT SALES HISTORY 
       ========================================================= */ 
 
    function printSalesHistory() { 
 
        const visibleSales = 
            getFilteredSales(); 
 
 
        const printWindow = 
            window.open( 
                "", 
                "_blank", 
                "width=1200,height=900" 
            ); 
 
 
        if (!printWindow) { 
 
            alert( 
                "المتصفح منع نافذة الطباعة." 
            ); 
 
            return; 
        } 
 
        let rows = ""; 
 
 
        visibleSales.forEach( 
            function (sale) { 
 
                rows += ` 
 
                    <tr> 
 
                        <td> 
                            #${salesEscape( 
                                sale.invoiceNumber 
                            )} 
                        </td> 
 
                        <td> 
                            ${salesEscape( 
                                sale.productName 
                            )} 
                        </td> 
 
                        <td> 
                            ${salesEscape( 
                                sale.customerName || 
                                "-" 
                            )} 
                        </td> 
 
                        <td> 
                            ${salesMoney( 
                                sale.total 
                            )} 
                        </td> 
 
                        <td> 
                            ${salesMoney( 
                                sale.paid 
                            )} 
                        </td> 
 
                        <td> 
                            ${salesMoney( 
                                sale.due 
                            )} 
                        </td> 
 
                        <td> 
                            ${salesEscape( 
                                getPaymentName( 
                                    sale.paymentMethod 
                                ) 
                            )} 
                        </td> 
 
                    </tr> 
 
                `; 
 
            } 
        ); 
 
 
        printWindow.document.write(` 
 
            <!DOCTYPE html> 
 
            <html lang="ar" dir="rtl"> 
 
            <head> 
 
                <meta charset="UTF-8"> 
 
                <title> 
                    سجل المبيعات 
                </title> 
 
                <style> 
 
                    body { 
                        font-family: 
                            Arial, 
                            Tahoma, 
                            sans-serif; 
 
                        padding: 30px; 
                    } 
 
                    h1 { 
                        text-align: center; 
                    } 
 
                    table { 
                        width: 100%; 
                        border-collapse: collapse; 
                        margin-top: 25px; 
                    } 
 
                    th, 
                    td { 
                        border: 1px solid #ccc; 
                        padding: 10px; 
                        text-align: center; 
                    } 
 
                    th { 
                        font-weight: bold; 
                    } 
 
                </style> 
 
            </head> 
 
            <body> 
 
                <h1> 
                    ACT PHONE MANAGER 
                </h1> 
 
                <h2> 
                    📋 سجل المبيعات 
                </h2> 
 
                <table> 
 
                    <thead> 
 
                        <tr> 
 
                            <th>الفاتورة</th> 
                            <th>المنتج</th> 
                            <th>العميل</th> 
                            <th>الإجمالي</th> 
                            <th>المدفوع</th> 
                            <th>المتبقي</th> 
                            <th>طريقة الدفع</th> 
 
                        </tr> 
 
                    </thead> 
 
                    <tbody> 
 
                        ${rows} 
 
                    </tbody> 
 
                </table> 
 
                <script> 
 
                    window.onload = function () { 
                        window.print(); 
                    }; 
 
                <\/script> 
 
            </body> 
 
            </html> 
 
        `); 
 
 
        printWindow.document.close(); 
 
    } 
 
 
    /* ========================================================= 
       EVENTS 
       ========================================================= */ 
 
    function initSalesEvents() { 
 
        const saveButton = 
            document.getElementById( 
                "save-new-sale-button" 
            ); 
 
        const clearButton = 
            document.getElementById( 
                "clear-new-sale-button" 
            ); 
 
        const printHistoryButton = 
            document.querySelector( 
                "#sales-view-history .sales-print-button" 
            ); 
 
 
        if (saveButton) { 
 
            saveButton.addEventListener( 
                "click", 
                saveNewSale 
            ); 
 
        } 
 
 
        if (clearButton) { 
 
            clearButton.addEventListener( 
                "click", 
                clearNewSaleForm 
            ); 
 
        } 
 
 
        if (printHistoryButton) { 
 
            printHistoryButton.addEventListener( 
                "click", 
                printSalesHistory 
            ); 
 
        } 
 
 
        const calculationInputs = [ 
 
            "sale-price", 
 
            "sale-discount", 
 
            "sale-paid" 
 
        ]; 
 
 
        calculationInputs.forEach( 
            function (id) { 
 
                const input = 
                    document.getElementById( 
                        id 
                    ); 
 
                if (!input) { 
                    return; 
                } 
 
 
                input.addEventListener( 
                    "input", 
                    updateNewSaleSummary 
                ); 
 
                input.addEventListener( 
                    "change", 
                    updateNewSaleSummary 
                ); 
 
            } 
        ); 
 
 
        const searchInput = 
            document.getElementById( 
                "sales-history-search" 
            ); 
 
        const paymentFilter = 
            document.getElementById( 
                "sales-history-payment-filter" 
            ); 
 
        const dateFilter = 
            document.getElementById( 
                "sales-history-date-filter" 
            ); 
 
 
        if (searchInput) { 
 
            searchInput.addEventListener( 
                "input", 
                renderSalesHistory 
            ); 
 
        } 
 
        if (paymentFilter) { 
 
            paymentFilter.addEventListener( 
                "change", 
                renderSalesHistory 
            ); 
 
        } 
 
        if (dateFilter) { 
 
            dateFilter.addEventListener( 
                "change", 
                renderSalesHistory 
            ); 
 
        } 
 
    } 
 
 
 
// ================================================== 
// 💳 أزرار عمليات المحفظة 
// ================================================== 
 
document.addEventListener( 
    "click", 
    function (event) { 
 
        const walletCard = 
            event.target.closest( 
                ".wallet-operation-card" 
            ); 
 
        if (!walletCard) { 
            return; 
        } 
 
        event.preventDefault(); 
        event.stopPropagation(); 
 
        const walletPage = 
            document.getElementById( 
                "wallet-section" 
            ); 
 
        if (!walletPage) { 
            return; 
        } 
 
        const operation = 
            walletCard.getAttribute( 
                "data-wallet-operation" 
            ); 
 
        if (!operation) { 
            return; 
        } 
 
        const operationNames = { 
            withdraw: "عملية سحب", 
            deposit: "عملية إيداع", 
            recharge: "عملية شحن", 
            bills: "عملية فواتير", 
            transfer: "عملية تحويل" 
        }; 
 
        const operationDescriptions = { 
 
            withdraw: 
                "تسجيل عملية سحب - TEST MODE", 
 
            deposit: 
                "تسجيل عملية إيداع - TEST MODE", 
 
            recharge: 
                "تسجيل عملية شحن - TEST MODE", 
 
            bills: 
                "تسجيل عملية فاتورة - TEST MODE", 
 
            transfer: 
                "تسجيل عملية تحويل - TEST MODE" 
 
        }; 
 
        walletPage.dataset.currentOperation = 
            operation; 
 
        const operationsGrid = 
            walletPage.querySelector( 
                ".wallet-operations-grid" 
            ); 
 
        if (operationsGrid) { 
            operationsGrid.style.display = "none"; 
        } 
 
        const operationView = 
            document.getElementById( 
                "wallet-operation-view" 
            ); 
 
        if (operationView) { 
            operationView.style.display = "block"; 
        } 
 
        const title = 
            document.getElementById( 
                "wallet-operation-title" 
            ); 
 
        if (title) { 
            title.textContent = 
                operationNames[operation] || 
                "عملية المحفظة"; 
        } 
 
        const description = 
            document.getElementById( 
                "wallet-operation-description" 
            ); 
 
        if (description) { 
            description.textContent = 
                operationDescriptions[operation] || 
                "تسجيل عملية جديدة - TEST MODE"; 
        } 
 
        const account = 
            document.getElementById( 
                "wallet-account" 
            ); 
 
        const amount = 
            document.getElementById( 
                "wallet-amount" 
            ); 
 
        const service = 
            document.getElementById( 
                "wallet-service" 
            ); 
 
        const notes = 
            document.getElementById( 
                "wallet-notes" 
            ); 
 
        if (account) { 
            account.value = ""; 
        } 
 
        if (amount) { 
            amount.value = ""; 
        } 
 
        if (service) { 
            service.value = ""; 
        } 
 
        if (notes) { 
            notes.value = ""; 
        } 
 
        renderWalletTransactions( 
            walletPage 
        ); 
 
        walletPage.scrollIntoView({ 
            behavior: "auto", 
            block: "start" 
        }); 
 
    }, 
    true 
); 
 
// ====================================================== 
// 💳 WALLET - SAVE OPERATION 
// ====================================================== 
 
function getWalletTransactionsStorageKey(operation) { 
 
    const currentUserKey = 
        (typeof currentUser !== "undefined" && 
         currentUser && 
         currentUser.uid) 
            ? currentUser.uid 
            : "guest"; 
 
    return ( 
        "actPhoneManager_wallet_transactions_" + 
        operation + 
        "_" + 
        currentUserKey 
    ); 
} 
 
 
// ====================================================== 
// 💳 قائمة خدمات المحفظة حسب نوع العملية 
// ====================================================== 
 
const walletServiceOptions = { 
 
    withdraw: [ 
        ["🔴 Vodafone Cash", "Vodafone Cash"], 
        ["🟠 Orange Cash", "Orange Cash"], 
        ["🟢 Etisalat Cash", "Etisalat Cash"], 
        ["🔵 WE Pay", "WE Pay"], 
        ["💳 InstaPay", "InstaPay"], 
        ["🏦 بنك", "بنك"], 
        ["📱 رقم هاتف", "رقم هاتف"] 
    ], 
 
    deposit: [ 
        ["🔴 Vodafone Cash", "Vodafone Cash"], 
        ["🟠 Orange Cash", "Orange Cash"], 
        ["🟢 Etisalat Cash", "Etisalat Cash"], 
        ["🔵 WE Pay", "WE Pay"], 
        ["💳 InstaPay", "InstaPay"], 
        ["🏦 بنك", "بنك"], 
        ["📱 رقم هاتف", "رقم هاتف"] 
    ], 
 
    recharge: [ 
        ["🔴 Vodafone", "Vodafone"], 
        ["🟠 Orange", "Orange"], 
        ["🟢 Etisalat", "Etisalat"], 
        ["🔵 WE", "WE"], 
        ["📦 باقة", "باقة"], 
        ["📱 رصيد", "رصيد"] 
    ], 
 
    bills: [ 
        ["⚡ كهرباء", "كهرباء"], 
        ["💧 مياه", "مياه"], 
        ["🔥 غاز", "غاز"], 
        ["🌐 إنترنت", "إنترنت"], 
        ["☎️ تليفون أرضي", "تليفون أرضي"], 
        ["🧾 فاتورة أخرى", "فاتورة أخرى"] 
    ], 
 
    transfer: [ 
        ["🔴 Vodafone Cash", "Vodafone Cash"], 
        ["🟠 Orange Cash", "Orange Cash"], 
        ["🟢 Etisalat Cash", "Etisalat Cash"], 
        ["🔵 WE Pay", "WE Pay"], 
        ["💳 InstaPay", "InstaPay"], 
        ["🏦 بنك", "بنك"], 
        ["🔄 تحويل داخلي", "تحويل داخلي"] 
    ] 
 
}; 
 
 
// ====================================================== 
// 💳 زر اختيار خدمة المحفظة 
// ====================================================== 
 
document.addEventListener("click", function (event) { 
 
    const serviceButton = 
        event.target.closest( 
            "#wallet-service-button" 
        ); 
 
    if (!serviceButton) { 
        return; 
    } 
 
    event.preventDefault(); 
    event.stopPropagation(); 
 
    const walletPage = 
        document.getElementById( 
            "wallet-section" 
        ); 
 
    if (!walletPage) { 
        return; 
    } 
 
    const operation = 
        walletPage.dataset.currentOperation; 
 
    const options = 
        walletServiceOptions[operation] || []; 
 
    if (!options.length) { 
        return; 
    } 
 
    let menu = 
        document.getElementById( 
            "wallet-service-menu" 
        ); 
 
    if (!menu) { 
 
        menu = 
            document.createElement("div"); 
 
        menu.id = 
            "wallet-service-menu"; 
 
        menu.className = 
            "wallet-service-menu"; 
 
        document.body.appendChild(menu); 
    } 
 
    menu.innerHTML = 
        options.map(function (item) { 
 
            return ` 
                <button 
                    type="button" 
                    class="wallet-service-option" 
                    data-service-value="${item[1]}" 
                > 
                    ${item[0]} 
                </button> 
            `; 
 
        }).join(""); 
 
    const rect = 
        serviceButton.getBoundingClientRect(); 
 
    menu.style.display = 
        "flex"; 
 
    menu.style.position = 
        "fixed"; 
 
    menu.style.top = 
        (rect.bottom + 6) + "px"; 
 
    menu.style.left = 
        rect.left + "px"; 
 
    menu.style.minWidth = 
        Math.max( 
            rect.width, 
            180 
        ) + "px"; 
 
    menu.style.zIndex = 
        "99999"; 
 
}); 
 
 
// ====================================================== 
// 💳 اختيار خدمة من القائمة 
// ====================================================== 
 
document.addEventListener("click", function (event) { 
 
    const option = 
        event.target.closest( 
            ".wallet-service-option" 
        ); 
 
    if (!option) { 
        return; 
    } 
 
    const serviceInput = 
        document.getElementById( 
            "wallet-service" 
        ); 
 
    if (serviceInput) { 
 
        serviceInput.value = 
            option.dataset.serviceValue || ""; 
 
        serviceInput.dispatchEvent( 
            new Event("input", { 
                bubbles: true 
            }) 
        ); 
 
    } 
 
    const menu = 
        document.getElementById( 
            "wallet-service-menu" 
        ); 
 
    if (menu) { 
        menu.style.display = 
            "none"; 
    } 
 
}); 
 
 
// ====================================================== 
// 💳 إغلاق قائمة الخدمات عند الضغط خارجها 
// ====================================================== 
 
document.addEventListener("click", function (event) { 
 
    const menu = 
        document.getElementById( 
            "wallet-service-menu" 
        ); 
 
    const button = 
        document.getElementById( 
            "wallet-service-button" 
        ); 
 
    if (!menu || !button) { 
        return; 
    } 
 
    if ( 
        !menu.contains(event.target) && 
        !button.contains(event.target) 
    ) { 
        menu.style.display = 
            "none"; 
    } 
 
}); 
 
// ====================================================== 
// 💳 حفظ عملية المحفظة 
// ====================================================== 
 
document.addEventListener("click", function (event) { 
 
    const saveButton = 
        event.target.closest("#wallet-save-operation"); 
 
    if (!saveButton) { 
        return; 
    } 
 
    event.preventDefault(); 
    event.stopPropagation(); 
 
    const walletPage = 
        document.getElementById("wallet-section"); 
 
    if (!walletPage) { 
        alert("لم يتم العثور على قسم المحفظة."); 
        return; 
    } 
 
    const operation = 
        walletPage.dataset.currentOperation; 
 
    if (!operation) { 
        alert("من فضلك اختر نوع العملية أولاً."); 
        return; 
    } 
 
    const account = 
        document.getElementById("wallet-account"); 
 
    const amount = 
        document.getElementById("wallet-amount"); 
 
    const service = 
        document.getElementById("wallet-service"); 
 
    const notes = 
        document.getElementById("wallet-notes"); 
 
    const accountValue = 
        account ? account.value.trim() : ""; 
 
    const amountValue = 
        amount ? amount.value.trim() : ""; 
 
    const serviceValue = 
        service ? service.value.trim() : ""; 
 
    const notesValue = 
        notes ? notes.value.trim() : ""; 
 
    if (!accountValue) { 
 
        alert("من فضلك اكتب الحساب أو الرقم."); 
 
        if (account) { 
            account.focus(); 
        } 
 
        return; 
    } 
 
    const numericAmount = 
        Number(amountValue); 
 
    if ( 
        !amountValue || 
        !Number.isFinite(numericAmount) || 
        numericAmount <= 0 
    ) { 
 
        alert("من فضلك اكتب مبلغ صحيح."); 
 
        if (amount) { 
            amount.focus(); 
        } 
 
        return; 
    } 
 
    const operationNames = { 
 
        withdraw: "عملية سحب", 
 
        deposit: "عملية إيداع", 
 
        recharge: "عملية شحن", 
 
        bills: "عملية فواتير", 
 
        transfer: "عملية تحويل" 
 
    }; 
 
    const transaction = { 
 
        id: 
            "WALLET-" + 
            Date.now(), 
 
        operation: 
            operation, 
 
        operationName: 
            operationNames[operation] || 
            "عملية محفظة", 
 
        account: 
            accountValue, 
 
        amount: 
            numericAmount, 
 
        service: 
            serviceValue, 
 
        notes: 
            notesValue, 
 
        status: 
            "completed", 
 
        statusName: 
            "تم الحفظ", 
 
        date: 
            new Date().toISOString(), 
 
        createdAt: 
            Date.now() 
 
    }; 
 
    let userId = "guest"; 
 
    if ( 
        typeof currentUser !== "undefined" && 
        currentUser && 
        currentUser.uid 
    ) { 
        userId = currentUser.uid; 
    } 
 
    const storageKey = 
        "actPhoneManager_wallet_transactions_" + 
        operation + 
        "_" + 
        userId; 
 
    let transactions = []; 
 
    try { 
 
        const saved = 
            localStorage.getItem( 
                storageKey 
            ); 
 
        if (saved) { 
 
            const parsed = 
                JSON.parse(saved); 
 
            if (Array.isArray(parsed)) { 
 
                transactions = 
                    parsed; 
 
            } 
 
        } 
 
    } catch (error) { 
 
        console.error( 
            "❌ Wallet read error:", 
            error 
        ); 
 
        transactions = []; 
 
    } 
 
    transactions.unshift( 
        transaction 
    ); 
 
    try { 
const value = JSON.stringify(transactions);

// الحفظ المحلي
localStorage.setItem(storageKey, value);

// الحفظ السحابي
saveUserDataToCloud(storageKey, value);
window.dispatchEvent(new Event("act-wallet-data-updated"));
if (typeof addNotificationFromOperation === "function") {
    addNotificationFromOperation({ type: "wallet", icon: "💳", title: "تم حفظ عملية محفظة", details: `${transaction.operationName || "عملية مالية"} — ${Number(transaction.amount || 0).toLocaleString("ar-EG")} جنيه`, amount: transaction.amount });
}
        console.log( 
            "✅ Wallet transaction saved:", 
            transaction 
        ); 
 
        console.log( 
            "🔑 Storage key:", 
            storageKey 
        ); 
 
    } catch (error) { 
 
        console.error( 
            "❌ Wallet save error:", 
            error 
        ); 
 
        alert( 
            "حدث خطأ أثناء حفظ العملية." 
        ); 
 
        return; 
    } 
 
    if ( 
        typeof renderWalletTransactions === 
        "function" 
    ) { 
 
        try { 
 
            renderWalletTransactions( 
                walletPage 
            ); 
 
        } catch (error) { 
 
            console.error( 
                "❌ Wallet render error:", 
                error 
            ); 
 
        } 
 
    } 
 
    // تحديث الرصيد فور الحفظ 
    if ( 
        typeof updateWalletBalanceSummary === 
        "function" 
    ) { 
 
        updateWalletBalanceSummary(); 
 
    } 
 
    if (account) { 
        account.value = ""; 
    } 
 
    if (amount) { 
        amount.value = ""; 
    } 
 
    if (service) { 
        service.value = ""; 
    } 
 
    if (notes) { 
        notes.value = ""; 
    } 
 
    const walletOperationView = 
        document.getElementById( 
            "wallet-operation-view" 
        ); 
 
    const operationsGrid = 
        walletPage.querySelector( 
            ".wallet-operations-grid" 
        ); 
 
    if (walletOperationView) { 
 
        walletOperationView.style.display = 
            "none"; 
 
    } 
 
    if (operationsGrid) { 
 
        operationsGrid.style.display = 
            "grid"; 
 
    } 
 
// ==================================================
// ⚡ إضافة السحب والإيداع إلى TODAY ACTIVITY
// ==================================================

if (
    operation === "withdraw" ||
    operation === "deposit"
) {

    const walletActivityNames = {
        withdraw: "سحب محفظة",
        deposit: "إيداع محفظة"
    };

    const walletActivityIcons = {
        withdraw: "💸",
        deposit: "💰"
    };

    addDashboardOperation({
        type: "wallet-" + operation,

        icon:
            walletActivityIcons[operation],

        title:
            walletActivityNames[operation],

        details:
            (
                serviceValue
                    ? serviceValue + " • "
                    : ""
            ) +
            accountValue,

        amount:
            Number(amountValue) || 0
    });
}

    alert( 
        "✅ تم حفظ العملية بنجاح." 
    ); 
 
}); 
 
 
// ====================================================== 
// ↩️ زر رجوع من عملية المحفظة 
// ====================================================== 
 
const walletCancelOperation = 
    document.getElementById( 
        "wallet-cancel-operation" 
    ); 
 
if (walletCancelOperation) { 
 
    walletCancelOperation.addEventListener( 
        "click", 
        function () { 
 
            const walletPage = 
                document.getElementById( 
                    "wallet-section" 
                ); 
 
            if (!walletPage) { 
                return; 
            } 
 
            const operationsGrid = 
                walletPage.querySelector( 
                    ".wallet-operations-grid" 
                ); 
 
            const operationView = 
                document.getElementById( 
                    "wallet-operation-view" 
                ); 
 
            if (operationView) { 
                operationView.style.display = 
                    "none"; 
            } 
 
            if (operationsGrid) { 
                operationsGrid.style.display = 
                    "grid"; 
            } 
 
            walletPage.scrollIntoView({ 
                behavior: "auto", 
                block: "start" 
            }); 
 
        } 
    ); 
 
} 
 
 
 
    /* ========================================================= 
       FIREBASE USER CHANGE 
       ========================================================= */ 
 
    function initSalesAuthListener() { 
 
        if ( 
            typeof onAuthStateChanged === 
                "function" && 
            typeof auth !== 
                "undefined" 
        ) { 
 
            onAuthStateChanged( 
                auth, 
                function () { 
 
                    loadSalesData(); 
 
                } 
            ); 
 
        } 
 
    } 
 
 
    /* ========================================================= 
       INITIALIZE 
       ========================================================= */ 
 
    function initializeSalesSystem() {

        initSalesEvents();

        loadSalesData();

        initSalesAuthListener();

        window.addEventListener("act-user-data-ready", loadSalesData);

    } 
 
 
    if ( 
        document.readyState === 
        "loading" 
    ) { 
 
        document.addEventListener( 
            "DOMContentLoaded", 
            initializeSalesSystem 
        ); 
 
    } else { 
 
        initializeSalesSystem(); 
 
    } 
 
 
    /* ========================================================= 
       GLOBAL ACCESS 
       ========================================================= */ 
 
    window.actPhoneManagerSales = { 
 
        load: 
            loadSalesData, 
 
        save: 
            saveNewSale, 
 
        clear: 
            clearNewSaleForm, 
 
        history: 
            renderSalesHistory, 
 
        reports: 
            renderSalesReports, 
 
        printInvoice: 
            printSaleInvoice, 
 
        printHistory: 
            printSalesHistory 
 
    }; 
 
})(); 
 
/* ========================================================= 
   ACT PHONE MANAGER 
   RETURNS SYSTEM 
   ========================================================= */ 
 
(function () { 
 
    let actReturnsData = []; 
    let actSelectedReturnType = ""; 
    let actSelectedReturnStatus = ""; 
 
    const addReturnButton = 
        document.getElementById("add-return-button"); 
 
    const returnForm = 
        document.getElementById("return-form"); 
 
    const cancelReturnButton = 
        document.getElementById("cancel-return-button"); 
 
    const confirmReturnButton = 
        document.getElementById("confirm-return-button"); 
 
    const returnItemName = 
        document.getElementById("return-item-name"); 
 
    const returnPrice = 
        document.getElementById("return-price"); 
 
    const returnReason = 
        document.getElementById("return-reason"); 
 
    const returnCustomer = 
        document.getElementById("return-customer"); 
 
    const returnsList = 
        document.getElementById("returns-list"); 
 
    const returnsEmpty = 
        document.getElementById("returns-empty"); 
 
    const returnsCount = 
        document.getElementById("returns-count"); 
 
    const returnTypeButtons = 
        document.querySelectorAll( 
            ".return-type-card" 
        ); 
 
    const returnStatusButtons = 
        document.querySelectorAll( 
            ".return-status-card" 
        ); 
 
 
    /* ===================================================== 
       STORAGE 
       ===================================================== */ 
 
    function getReturnsStorageKey() { 
 
        let userId = "guest"; 
 
        if ( 
            typeof currentUser !== "undefined" && 
            currentUser && 
            currentUser.uid 
        ) { 
            userId = currentUser.uid; 
        } 
 
        return "actPhoneManager_returns_" + userId; 
    } 
 
 
    function loadActReturns() { 
 
        try { 
 
            const saved = 
                localStorage.getItem( 
                    getReturnsStorageKey() 
                ); 
 
            actReturnsData = 
                saved 
                    ? JSON.parse(saved) 
                    : []; 
 
            if (!Array.isArray(actReturnsData)) { 
                actReturnsData = []; 
            } 
 
        } catch (error) { 
 
            console.error( 
                "Returns load error:", 
                error 
            ); 
 
            actReturnsData = []; 
        } 
 
        renderActReturns(); 
    } 
 
 function saveActReturns() {

    try {

        const key = getReturnsStorageKey();
        const value = JSON.stringify(actReturnsData);

        // الحفظ المحلي
        localStorage.setItem(
            key,
            value
        );

        // الحفظ السحابي
        saveUserDataToCloud(
            key,
            value
        );

    } catch (error) {

        console.error(
            "Returns save error:",
            error
        );

    }
}
 
 
    /* ===================================================== 
       RESET FORM 
       ===================================================== */ 
 
    function resetReturnForm() { 
 
        actSelectedReturnType = ""; 
        actSelectedReturnStatus = ""; 
 
        if (returnItemName) { 
            returnItemName.value = ""; 
        } 
 
        if (returnPrice) { 
            returnPrice.value = ""; 
        } 
 
        if (returnReason) { 
            returnReason.value = ""; 
        } 
 
        if (returnCustomer) { 
            returnCustomer.value = ""; 
        } 
 
        returnTypeButtons.forEach( 
            button => { 
                button.classList.remove("active"); 
            } 
        ); 
 
        returnStatusButtons.forEach( 
            button => { 
                button.classList.remove("active"); 
            } 
        ); 
    } 
 
 
    /* ===================================================== 
       OPEN FORM 
       ===================================================== */ 
 
    if (addReturnButton) { 
 
        addReturnButton.addEventListener( 
            "click", 
            function () { 
 
                resetReturnForm(); 
 
                if (returnForm) { 
 
                    returnForm.style.display = "block"; 
 
                    setTimeout( 
                        function () { 
 
                            returnForm.scrollIntoView({ 
                                behavior: "smooth", 
                                block: "start" 
                            }); 
 
                        }, 
                        50 
                    ); 
                } 
 
            } 
        ); 
 
    } 
 
 
    /* ===================================================== 
       RETURN TYPE 
       ===================================================== */ 
 
    returnTypeButtons.forEach( 
        button => { 
 
            button.addEventListener( 
                "click", 
                function () { 
 
                    returnTypeButtons.forEach( 
                        item => { 
                            item.classList.remove("active"); 
                        } 
                    ); 
 
                    this.classList.add("active"); 
 
                    actSelectedReturnType = 
                        this.dataset.returnType || ""; 
 
                } 
            ); 
 
        } 
    ); 
 
 
    /* ===================================================== 
       RETURN STATUS 
       ===================================================== */ 
 
    returnStatusButtons.forEach( 
        button => { 
 
            button.addEventListener( 
                "click", 
                function () { 
 
                    returnStatusButtons.forEach( 
                        item => { 
                            item.classList.remove("active"); 
                        } 
                    ); 
 
                    this.classList.add("active"); 
 
                    actSelectedReturnStatus = 
                        this.dataset.returnStatus || ""; 
 
                } 
            ); 
 
        } 
    ); 
 
 
    /* ===================================================== 
       CANCEL 
       ===================================================== */ 
 
    if (cancelReturnButton) { 
 
        cancelReturnButton.addEventListener( 
            "click", 
            function () { 
 
                resetReturnForm(); 
 
                if (returnForm) { 
                    returnForm.style.display = "none"; 
                } 
 
            } 
        ); 
 
    } 
 
 
    /* ===================================================== 
       CONFIRM RETURN 
       ===================================================== */ 
 
    if (confirmReturnButton) { 
 
        confirmReturnButton.addEventListener( 
            "click", 
            function () { 
 
                const itemName = 
                    returnItemName 
                        ? returnItemName.value.trim() 
                        : ""; 
 
                const price = 
                    returnPrice && 
                    returnPrice.value !== "" 
                        ? Number(returnPrice.value) 
                        : 0; 
 
                const reason = 
                    returnReason 
                        ? returnReason.value.trim() 
                        : ""; 
 
                const customer = 
                    returnCustomer 
                        ? returnCustomer.value.trim() 
                        : ""; 
 
                if (!actSelectedReturnType) { 
 
                    alert( 
                        "من فضلك اختر نوع المرتجع." 
                    ); 
 
                    return; 
                } 
 
                if (!itemName) { 
 
                    alert( 
                        "من فضلك اكتب اسم المنتج." 
                    ); 
 
                    if (returnItemName) { 
                        returnItemName.focus(); 
                    } 
 
                    return; 
                } 
 
                if (!actSelectedReturnStatus) { 
 
                    alert( 
                        "من فضلك اختر حالة المنتج." 
                    ); 
 
                    return; 
                } 
 
                if (!reason) { 
 
                    alert( 
                        "من فضلك اكتب سبب المرتجع." 
                    ); 
 
                    if (returnReason) { 
                        returnReason.focus(); 
                    } 
 
                    return; 
                } 
 
                const typeNames = { 
 
                    device: "جهاز", 
 
                    part: "قطعة", 
 
                    other: "أخرى" 
 
                }; 
 
                const statusNames = { 
 
                    working: "شغال", 
 
                    "not-working": "مش شغال" 
 
                }; 
 
                const newReturn = { 
 
                    id: 
                        Date.now().toString(), 
 
                    type: 
                        actSelectedReturnType, 
 
                    typeName: 
                        typeNames[ 
                            actSelectedReturnType 
                        ] || "أخرى", 
 
                    itemName: 
                        itemName, 
 
                    price: 
                        price, 
 
                    status: 
                        actSelectedReturnStatus, 
 
                    statusName: 
                        statusNames[ 
                            actSelectedReturnStatus 
                        ] || "", 
 
                    reason: 
                        reason, 
 
                    customer: 
                        customer, 
 
                    date: 
                        new Date().toISOString() 
 
                }; 
 
                actReturnsData.unshift( 
                    newReturn 
                ); 
 
                saveActReturns(); 
 
                renderActReturns(); 
 
                resetReturnForm(); 
 
                if (returnForm) { 
                    returnForm.style.display = "none"; 
                } 
 
                alert( 
                    "تم تسجيل المرتجع بنجاح ✅" 
                ); 
 
            } 
        ); 
 
    } 
 
 
    /* ===================================================== 
       RENDER RETURNS 
       ===================================================== */ 
 
    function renderActReturns() { 
 
        if (!returnsList) { 
            return; 
        } 
 
        const count = 
            actReturnsData.length; 
 
        if (returnsCount) { 
 
            returnsCount.textContent = 
                count + " مرتجع"; 
 
        } 
 
        if (count === 0) { 
 
            returnsList.innerHTML = ` 
                <div 
                    id="returns-empty" 
                    class="returns-empty" 
                > 
                    <span>↩️</span> 
 
                    <strong> 
                        لا توجد مرتجعات حتى الآن 
                    </strong> 
 
                    <small> 
                        عند إضافة مرتجع سيظهر هنا 
                    </small> 
                </div> 
            `; 
 
            return; 
        } 
 
        returnsList.innerHTML = 
            actReturnsData 
                .map( 
                    item => { 
 
                        const date = 
                            item.date 
                                ? new Date( 
                                    item.date 
                                ).toLocaleString( 
                                    "ar-EG" 
                                ) 
                                : ""; 
 
                        return ` 
                            <div 
                                class="return-item-card" 
                            > 
 
                                <div 
                                    class="return-item-top" 
                                > 
 
                                    <div> 
                                        <span 
                                            class="return-item-icon" 
                                        > 
                                            ↩️ 
                                        </span> 
 
                                        <div> 
                                            <strong> 
                                                ${escapeReturnHTML( 
                                                    item.itemName 
                                                )} 
                                            </strong> 
 
                                            <small> 
                                                ${escapeReturnHTML( 
                                                    item.typeName 
                                                )} 
                                            </small> 
                                        </div> 
                                    </div> 
 
                                    <div 
                                        class="return-item-price" 
                                    > 
                                        ${Number( 
                                            item.price || 0 
                                        ).toLocaleString( 
                                            "ar-EG" 
                                        )} جنيه 
                                    </div> 
 
                                </div> 
 
                                <div 
                                    class="return-item-info" 
                                > 
 
                                    <span> 
                                        الحالة: 
                                        <b 
                                            class="${ 
                                                item.status === 
                                                "working" 
                                                    ? "return-working" 
                                                    : "return-not-working" 
                                            }" 
                                        > 
                                            ${escapeReturnHTML( 
                                                item.statusName 
                                            )} 
                                        </b> 
                                    </span> 
 
                                    ${ 
                                        item.customer 
                                            ? ` 
                                                <span> 
                                                    العميل: 
                                                    <b> 
                                                        ${escapeReturnHTML( 
                                                            item.customer 
                                                        )} 
                                                    </b> 
                                                </span> 
                                            ` 
                                            : "" 
                                    } 
 
                                </div> 
 
                                <div 
                                    class="return-item-reason" 
                                > 
                                    <strong> 
                                        سبب المرتجع: 
                                    </strong> 
 
                                    <p> 
                                        ${escapeReturnHTML( 
                                            item.reason 
                                        )} 
                                    </p> 
                                </div> 
 
                                <div 
                                    class="return-item-date" 
                                > 
                                    ${escapeReturnHTML( 
                                        date 
                                    )} 
                                </div> 
 
                            </div> 
                        `; 
 
                    } 
                ) 
                .join(""); 
 
    } 
 
 
    /* ===================================================== 
       HTML SAFETY 
       ===================================================== */ 
 
    function escapeReturnHTML(value) { 
 
        return String(value ?? "") 
            .replace( 
                /&/g, 
                "&amp;" 
            ) 
            .replace( 
                /</g, 
                "&lt;" 
            ) 
            .replace( 
                />/g, 
                "&gt;" 
            ) 
            .replace( 
                /"/g, 
                "&quot;" 
            ) 
            .replace( 
                /'/g, 
                "&#039;" 
            ); 
 
    } 
 
 
    /* ===================================================== 
       WHEN RETURNS PAGE OPENS 
       ===================================================== */ 
 
    document.addEventListener( 
        "click", 
        function (event) { 
 
            const returnsButton = 
                event.target.closest( 
                    '.independent-sales-card[data-sales-view="returns"]' 
                ); 
 
            if (!returnsButton) { 
                return; 
            } 
 
            setTimeout( 
                function () { 
                    loadActReturns(); 
                }, 
                50 
            ); 
 
        }, 
        true 
    ); 
 
 
    /* ===================================================== 
       INITIAL LOAD 
       ===================================================== */ 
 
    loadActReturns(); 
 
})(); 
/* ========================================================= 
   DEVICE SUB TABS 
   بيع التلفونات / مشتريات التلفونات 
   ========================================================= */ 
 
document.addEventListener("DOMContentLoaded", function () { 
 
    const saleTab = 
        document.getElementById("device-sale-tab"); 
 
    const purchaseTab = 
        document.getElementById("device-purchase-tab"); 
 
    const saleSection = 
        document.getElementById("phone-sale-section"); 
 
    const purchasesSection = 
        document.getElementById("phone-purchases-section"); 
 
    const purchaseForm = 
        document.getElementById("phone-purchase-form"); 
 
    const addPurchaseButton = 
        document.getElementById("phone-purchase-add-button"); 
 
    const closePurchaseButton = 
        document.getElementById("close-phone-purchase-form"); 
 
    const savePurchaseButton = 
        document.getElementById("save-phone-purchase"); 
 
    const purchasesList = 
        document.getElementById("phone-purchases-list"); 
 
const purchasesSearchInput =
    document.getElementById(
        "phone-purchases-search-input"
    );


    if (!saleTab || !purchaseTab) { 
        return; 
    } 
 function getPhonePurchasesStorageKey() {

    const uid =
        currentUser && currentUser.uid
            ? currentUser.uid
            : "guest";

    return "actPhoneManager_phonePurchases_" + uid;
}


let phonePurchases = [];

try {

    const key = getPhonePurchasesStorageKey();

    phonePurchases = JSON.parse(
        localStorage.getItem(key) || "[]"
    );

    if (!Array.isArray(phonePurchases)) {
        phonePurchases = [];
    }

} catch (error) {

    console.error("Phone purchases load error:", error);

    phonePurchases = [];
}


let editingPurchaseId = null;


function savePhonePurchases() {

    try {

        const key = getPhonePurchasesStorageKey();
        const value = JSON.stringify(phonePurchases);

        // الحفظ المحلي
        localStorage.setItem(key, value);

        // الحفظ السحابي
        saveUserDataToCloud(key, value);
        if (typeof addNotificationFromOperation === "function") {
            addNotificationFromOperation({ type: "phone-purchase", icon: "📱", title: "تم حفظ مشتريات تلفون", details: "تم تحديث سجل مشتريات الأجهزة" });
        }
        window.dispatchEvent(new Event("act-purchases-data-updated"));

    } catch (error) {

        console.error(
            "Phone purchases save error:",
            error
        );

    }
}
 
    function clearPurchaseForm() { 
 
        const phone = 
            document.getElementById( 
                "purchase-phone-name" 
            ); 
 
        const serial = 
            document.getElementById( 
                "purchase-serial" 
            ); 
 
        const seller = 
            document.getElementById( 
                "purchase-seller-name" 
            ); 
 
        const sellerPhone = 
            document.getElementById( 
                "purchase-seller-phone" 
            ); 
 
        const price = 
            document.getElementById( 
                "purchase-price" 
            ); 
 
        const date = 
            document.getElementById( 
                "purchase-date" 
            ); 
 
        const notes = 
            document.getElementById( 
                "purchase-notes" 
            ); 
 
        if (phone) { 
            phone.value = ""; 
        } 
 
        if (serial) { 
            serial.value = ""; 
        } 
 
        if (seller) { 
            seller.value = ""; 
        } 
 
        if (sellerPhone) { 
            sellerPhone.value = ""; 
        } 
 
        if (price) { 
            price.value = ""; 
        } 
 
        if (date) { 
 
            date.value = 
                typeof getToday === "function" 
                    ? getToday() 
                    : ""; 
 
        } 
 
        if (notes) { 
            notes.value = ""; 
        } 
 
        editingPurchaseId = null; 
 
        if (savePurchaseButton) { 
 
            savePurchaseButton.textContent = 
                "💾 حفظ المشتريات"; 
 
        } 
 
    } 


function updateActPurchaseDashboard() {
    const countElement = document.getElementById(
        "act-purchase-stat-count"
    );

    const totalElement = document.getElementById(
        "act-purchase-stat-total"
    );

    const monthElement = document.getElementById(
        "act-purchase-stat-month"
    );

    if (!countElement || !totalElement || !monthElement) {
        return;
    }

    const purchases = Array.isArray(phonePurchases)
        ? phonePurchases
        : [];

    const total = purchases.reduce(function (sum, purchase) {
        return sum + Math.max(0, Number(purchase.price) || 0);
    }, 0);

    const now = new Date();

    const currentMonth =
        now.getFullYear() + "-" +
        String(now.getMonth() + 1).padStart(2, "0");

    const monthCount = purchases.filter(function (purchase) {
        return typeof purchase.date === "string" &&
            purchase.date.startsWith(currentMonth);
    }).length;

    countElement.textContent =
        purchases.length.toLocaleString("ar-EG");

    totalElement.textContent =
        total.toLocaleString("ar-EG", {
            maximumFractionDigits: 2
        }) + " ج.م";

    monthElement.textContent =
        monthCount.toLocaleString("ar-EG");
}


 function renderPhonePurchases() {

    if (!purchasesList) {
        return;
    }

    const searchTerm = purchasesSearchInput
        ? purchasesSearchInput.value.trim().toLowerCase()
        : "";

    const filteredPurchases = phonePurchases.filter(
        function (purchase) {

            const searchableText = [
                purchase.phoneName,
                purchase.serial,
                purchase.sellerName,
                purchase.sellerPhone,
                purchase.date,
                purchase.notes
            ].join(" ").toLowerCase();

            return searchableText.includes(searchTerm);
        }
    );
 
        if (!phonePurchases.length) { 
 
            purchasesList.innerHTML = ` 
 
                <div class="empty-state"> 
 
                    <div style="font-size:45px;"> 
                        🛒 
                    </div> 
 
                    <h3> 
                        لا توجد مشتريات 
                    </h3> 
 
                    <p> 
                        اضغط على "إضافة موبايل مشتريات" 
                        لإضافة أول جهاز. 
                    </p> 
 
                </div> 
 
            `; 
 
            return; 
        } 
 
        purchasesList.innerHTML = 
           filteredPurchases
    .map(
                    function ( 
                        purchase, 
                        index 
                    ) { 
 
                        return ` 
 
                            <article 
                                class="device-card purchase-card" 
                            > 
 
                                <div 
                                    class="device-card-top" 
                                    style=" 
                                        display:flex; 
                                        align-items:center; 
                                        justify-content:space-between; 
                                        gap:10px; 
                                        flex-wrap:wrap; 
                                    " 
                                > 
 
                                    <div 
                                        class="device-number" 
                                    > 
                                        #${index + 1} 
                                    </div> 
 
                                    <div 
                                        class="device-actions" 
                                        style=" 
                                            display:flex; 
                                            align-items:center; 
                                            gap:6px; 
                                            flex-wrap:wrap; 
                                        " 
                                    > 
 
                                        <button 
                                            type="button" 
                                            class="purchase-edit-button" 
                                            data-id="${purchase.id}" 
                                            title="تعديل المشتريات" 
                                        > 
                                            ✏️ تعديل 
                                        </button> 
 
                                        <button 
                                            type="button" 
                                            class="purchase-print-button" 
                                            data-id="${purchase.id}" 
                                            title="طباعة المشتريات" 
                                        > 
                                            🖨️ طباعة 
                                        </button> 
 
                                        <button 
                                            type="button" 
                                            class="purchase-delete-button" 
                                            data-id="${purchase.id}" 
                                            title="حذف المشتريات" 
                                        > 
                                            🗑️ حذف 
                                        </button> 
 
                                    </div> 
 
                                </div> 
 
                                <div 
                                    class="device-card-icon" 
                                    style=" 
                                        font-size:38px; 
                                        margin:14px 0; 
                                    " 
                                > 
                                    🛒 
                                </div> 
 
                                <h3> 
                                    ${escapeHTML( 
                                        purchase.phoneName || "" 
                                    )} 
                                </h3> 
 
                                ${ 
                                    purchase.serial 
                                        ? ` 
 
                                            <div class="device-info"> 
 
                                                🔢 
 
                                                ${escapeHTML( 
                                                    purchase.serial 
                                                )} 
 
                                            </div> 
 
                                        ` 
                                        : "" 
                                } 
 
                                ${ 
                                    purchase.sellerName 
                                        ? ` 
 
                                            <div class="device-info"> 
 
                                                👤 
 
                                                ${escapeHTML( 
                                                    purchase.sellerName 
                                                )} 
 
                                            </div> 
 
                                        ` 
                                        : "" 
                                } 
 
                                ${ 
                                    purchase.sellerPhone 
                                        ? ` 
 
                                            <div class="device-info"> 
 
                                                📞 
 
                                                ${escapeHTML( 
                                                    purchase.sellerPhone 
                                                )} 
 
                                            </div> 
                                        ` 
                                        : "" 
                                } 
 
                                ${ 
                                    purchase.price 
                                        ? ` 
 
                                            <div class="device-price"> 
 
                                                💰 
 
                                                ${formatMoney( 
                                                    purchase.price 
                                                )} 
 
                                            </div> 
 
                                        ` 
                                        : "" 
                                } 
 
                                ${ 
                                    purchase.date 
                                        ? ` 
 
                                            <div class="device-info"> 
 
                                                📅 
 
                                                ${escapeHTML( 
                                                    purchase.date 
                                                )} 
 
                                            </div> 
 
                                        ` 
                                        : "" 
                                } 
 
                                ${ 
                                    purchase.notes 
                                        ? ` 
 
                                            <div class="device-notes"> 
 
                                                📝 
 
                                                ${escapeHTML( 
                                                    purchase.notes 
                                                )} 
 
                                            </div> 
 
                                        ` 
                                        : "" 
                                } 
 
                            </article> 
 
                        `; 
 
                    } 
                ) 
                .join(""); 
 
        attachPurchaseEvents(); 
 
    } 
 
    function attachPurchaseEvents() { 
 
        if (!purchasesList) { 
            return; 
        } 
 
        purchasesList 
            .querySelectorAll( 
                ".purchase-edit-button" 
            ) 
            .forEach( 
                function (button) { 
 
                    button.addEventListener( 
                        "click", 
                        function () { 
 
                            const id = 
                                this.dataset.id; 
 
                            const purchase = 
                                phonePurchases.find( 
                                    function (item) { 
 
                                        return String( 
                                            item.id 
                                        ) === String(id); 
 
                                    } 
                                ); 
 
                            if (!purchase) { 
 
                                alert( 
                                    "المشتريات غير موجودة ❌" 
                                ); 
 
                                return; 
 
                            } 
 
                            const phone = 
                                document.getElementById( 
                                    "purchase-phone-name" 
                                ); 
 
                            const serial = 
                                document.getElementById( 
                                    "purchase-serial" 
                                ); 
 
                            const seller = 
                                document.getElementById( 
                                    "purchase-seller-name" 
                                ); 
 
                            const sellerPhone = 
                                document.getElementById( 
                                    "purchase-seller-phone" 
                                ); 
 
                            const price = 
                                document.getElementById( 
                                    "purchase-price" 
                                ); 
 
                            const date = 
                                document.getElementById( 
                                    "purchase-date" 
                                ); 
 
                            const notes = 
                                document.getElementById( 
                                    "purchase-notes" 
                                ); 
 
                            if (phone) { 
                                phone.value = 
                                    purchase.phoneName || ""; 
                            } 
 
                            if (serial) { 
                                serial.value = 
                                    purchase.serial || ""; 
                            } 
 
                            if (seller) { 
                                seller.value = 
                                    purchase.sellerName || ""; 
                            } 
 
                            if (sellerPhone) { 
                                sellerPhone.value = 
                                    purchase.sellerPhone || ""; 
                            } 
 
                            if (price) { 
                                price.value = 
                                    purchase.price || ""; 
                            } 
 
                            if (date) { 
                                date.value = 
                                    purchase.date || ""; 
                            } 
 
                            if (notes) { 
                                notes.value = 
                                    purchase.notes || ""; 
                            } 
 
                            editingPurchaseId = 
                                purchase.id; 
 
                            if (purchaseForm) { 
 
                                purchaseForm.style.display = 
                                    "block"; 
 
                                purchaseForm.scrollIntoView({ 
                                    behavior: "smooth", 
                                    block: "center" 
                                }); 
 
                            } 
 
                            if (savePurchaseButton) { 
 
                                savePurchaseButton.textContent = 
                                    "💾 حفظ التعديل"; 
 
                            } 
 
                        } 
                    ); 
 
                } 
            ); 
 
        purchasesList 
            .querySelectorAll( 
                ".purchase-print-button" 
            ) 
            .forEach( 
                function (button) { 
 
                    button.addEventListener( 
                        "click", 
                        function () { 
 
                            const id = 
                                this.dataset.id; 
 
                            printPhonePurchase(id); 
 
                        } 
                    ); 
 
                } 
            ); 
 
        purchasesList 
            .querySelectorAll( 
                ".purchase-delete-button" 
            ) 
            .forEach( 
                function (button) { 
 
                    button.addEventListener( 
                        "click", 
                        function () { 
 
                            const id = 
                                this.dataset.id; 
 
                            const confirmed = 
                                confirm( 
                                    currentLanguage === "ar" 
                                        ? "هل تريد حذف هذه المشتريات؟" 
                                        : "Delete this purchase?" 
                                ); 
 
                            if (!confirmed) { 
                                return; 
                            } 
 
                            phonePurchases = 
                                phonePurchases.filter( 
                                    function (purchase) { 
 
                                        return String( 
                                            purchase.id 
                                        ) !== String(id); 
 
                                    } 
                                ); 
 savePhonePurchases();

renderPhonePurchases();
                        } 
                    ); 
 
                } 
            ); 
 
    } 
 
    // إعادة تحميل مشتريات الحساب الصحيح بعد اكتمال المزامنة.
    window.addEventListener("act-user-data-ready", function () {
        try {
            const key = getPhonePurchasesStorageKey();
            const storedData = localStorage.getItem(key);
            const parsedData = storedData ? JSON.parse(storedData) : [];
            phonePurchases = Array.isArray(parsedData) ? parsedData : [];
            renderPhonePurchases();
            updateActPurchaseDashboard();
            console.log("ACT Phone Purchases Loaded:", key, phonePurchases.length);
        } catch (error) {
            console.error("Phone purchases reload error:", error);
            phonePurchases = [];
            renderPhonePurchases();
            updateActPurchaseDashboard();
        }
    });


    function printPhonePurchase(id) { 
 
        const purchase = 
            phonePurchases.find( 
                function (item) { 
 
                    return String( 
                        item.id 
                    ) === String(id); 
 
                } 
            ); 
 
        if (!purchase) { 
 
            alert( 
                "المشتريات غير موجودة ❌" 
            ); 
 
            return; 
 
        } 
 
        const printWindow = 
            window.open( 
                "", 
                "_blank", 
                "width=800,height=700" 
            ); 
 
        if (!printWindow) { 
 
            alert( 
                "لم يتم فتح نافذة الطباعة. اسمح بالنوافذ المنبثقة من المتصفح." 
            ); 
 
            return; 
 
        } 
 
        const phoneName = 
            escapeHTML( 
                purchase.phoneName || "-" 
            ); 
 
        const serial = 
            escapeHTML( 
                purchase.serial || "-" 
            ); 
 
        const sellerName = 
            escapeHTML( 
                purchase.sellerName || "-" 
            ); 
 
        const sellerPhone = 
            escapeHTML( 
                purchase.sellerPhone || "-" 
            ); 
 
        const price = 
            purchase.price 
                ? formatMoney( 
                    purchase.price 
                ) 
                : "-"; 
 
        const date = 
            escapeHTML( 
                purchase.date || "-" 
            ); 
 
        const notes = 
            escapeHTML( 
                purchase.notes || "-" 
            ); 
 
        printWindow.document.write(` 
 
            <!DOCTYPE html> 
 
            <html 
                lang="ar" 
                dir="rtl" 
            > 
 
            <head> 
 
                <meta charset="UTF-8"> 
 
                <title> 
                    فاتورة شراء - ${phoneName} 
                </title> 
 
                <style> 
 
                    * { 
                        box-sizing:border-box; 
                    } 
 
                    body { 
 
                        margin:0; 
 
                        padding:30px; 
 
                        background:#fff; 
 
                        color:#111; 
 
                        font-family: 
                            Arial, 
                            Tahoma, 
                            sans-serif; 
 
                        direction:rtl; 
 
                    } 
 
                    .print-container { 
 
                        max-width:700px; 
 
                        margin:auto; 
 
                        border:1px solid #ddd; 
 
                        border-radius:16px; 
 
                        padding:25px; 
 
                    } 
 
                    .print-header { 
 
                        text-align:center; 
 
                        border-bottom: 
                            2px solid #222; 
 
                        padding-bottom:18px; 
 
                        margin-bottom:20px; 
 
                    } 
 
                    .print-header h1 { 
 
                        margin:0 0 8px; 
 
                        font-size:25px; 
 
                    } 
 
                    .print-header p { 
 
                        margin:0; 
 
                        color:#666; 
 
                        font-size:13px; 
 
                    } 
 
                    .purchase-title { 
 
                        text-align:center; 
 
                        font-size:20px; 
 
                        font-weight:bold; 
 
                        margin-bottom:20px; 
 
                    } 
 
                    .info-row { 
 
                        display:flex; 
 
                        justify-content:space-between; 
 
                        gap:20px; 
 
                        padding:12px 0; 
 
                        border-bottom: 
                            1px solid #eee; 
 
                    } 
 
                    .info-label { 
 
                        font-weight:bold; 
 
                        color:#444; 
 
                    } 
 
                    .info-value { 
 
                        text-align:left; 
 
                        color:#111; 
 
                        word-break:break-word; 
 
                    } 
 
                    .price { 
 
                        font-size:20px; 
 
                        font-weight:bold; 
 
                    } 
 
                    .notes { 
 
                        margin-top:20px; 
 
                        padding:15px; 
 
                        background:#f5f5f5; 
 
                        border-radius:10px; 
 
                    } 
 
                    .footer { 
 
                        margin-top:25px; 
 
                        padding-top:15px; 
 
                        border-top: 
                            1px solid #ddd; 
 
                        text-align:center; 
 
                        color:#777; 
 
                        font-size:11px; 
 
                    } 
 
                    @media print { 
 
                        body { 
                            padding:0; 
                        } 
 
                        .print-container { 
                            border:0; 
                            max-width:none; 
                        } 
 
                    } 
 
                </style> 
 
            </head> 
 
            <body> 
 
                <div class="print-container"> 
 
                    <div class="print-header"> 
 
                        <h1> 
                            ACT PHONE MANAGER 
                        </h1> 
 
                        <p> 
                           إدارة متكاملة.. لخدمة أسرع وأدق 
                        </p> 
 
                    </div> 
 
                    <div class="purchase-title"> 
 
                        🛒 فاتورة شراء موبايل 
 
                    </div> 
 
                    <div class="info-row"> 
 
                        <span class="info-label"> 
                            اسم الجهاز 
                        </span> 
 
                        <span class="info-value"> 
                            ${phoneName} 
                        </span> 
 
                    </div> 
 
                    <div class="info-row"> 
 
                        <span class="info-label"> 
                            السيريال 
                        </span> 
 
                        <span class="info-value"> 
                            ${serial} 
                        </span> 
 
                    </div> 
 
                    <div class="info-row"> 
 
                        <span class="info-label"> 
                            اسم البائع 
                        </span> 
 
                        <span class="info-value"> 
                            ${sellerName} 
                        </span> 
 
                    </div> 
 
                    <div class="info-row"> 
 
                        <span class="info-label"> 
                            رقم البائع 
                        </span> 
 
                        <span class="info-value"> 
                            ${sellerPhone} 
                        </span> 
 
                    </div> 
 
                    <div class="info-row"> 
 
                        <span class="info-label"> 
                            سعر الشراء 
                        </span> 
 
                        <span class="info-value price"> 
                            ${price} 
                        </span> 
 
                    </div> 
 
                    <div class="info-row"> 
 
                        <span class="info-label"> 
                            تاريخ الشراء 
                        </span> 
 
                        <span class="info-value"> 
                            ${date} 
                        </span> 
 
                    </div> 
 
                    <div class="notes"> 
 
                        <strong> 
                            📝 الملاحظات 
                        </strong> 
 
                        <div style="margin-top:8px;"> 
                            ${notes} 
                        </div> 
 
                    </div> 
 
                    <div class="footer"> 
 
                        تم إنشاء المستند بواسطة 
                        ACT PHONE MANAGER 
 
                    </div> 
 
                </div> 
 
                <script> 
 
                    window.onload = function () { 
 
                        window.print(); 
 
                    }; 
 
                <\/script> 
 
            </body> 
 
            </html> 
 
        `); 
 
        printWindow.document.close(); 
 
    } 
 
    function savePhonePurchase() { 
 
        const phone = 
            document.getElementById( 
                "purchase-phone-name" 
            ); 
 
        const serial = 
            document.getElementById( 
                "purchase-serial" 
            ); 
 
        const seller = 
            document.getElementById( 
                "purchase-seller-name" 
            ); 
 
        const sellerPhone = 
            document.getElementById( 
                "purchase-seller-phone" 
            ); 
 
        const price = 
            document.getElementById( 
                "purchase-price" 
            ); 
 
        const date = 
            document.getElementById( 
                "purchase-date" 
            ); 
 
        const notes = 
            document.getElementById( 
                "purchase-notes" 
            ); 
 
        const phoneName = 
            phone 
                ? phone.value.trim() 
                : ""; 
 
        const sellerName = 
            seller 
                ? seller.value.trim() 
                : ""; 
 
        if (!phoneName) { 
 
            alert( 
                currentLanguage === "ar" 
                    ? "من فضلك اكتب اسم الجهاز." 
                    : "Please enter the device name." 
            ); 
 
            if (phone) { 
                phone.focus(); 
            } 
 
            return; 
 
        } 
 
        if (!sellerName) { 
 
            alert( 
                currentLanguage === "ar" 
                    ? "من فضلك اكتب اسم البائع." 
                    : "Please enter the seller name." 
            ); 
 
            if (seller) { 
                seller.focus(); 
            } 
 
            return; 
 
        } 
 
        if (editingPurchaseId) { 
 
            const purchaseIndex = 
                phonePurchases.findIndex( 
                    function (purchase) { 
 
                        return String( 
                            purchase.id 
                        ) === String( 
                            editingPurchaseId 
                        ); 
 
                    } 
                ); 
 
            if (purchaseIndex === -1) { 
 
                alert( 
                    "المشتريات غير موجودة ❌" 
                ); 
 
                editingPurchaseId = null; 
 
                return; 
 
            } 
 
            const oldPurchase = 
                phonePurchases[ 
                    purchaseIndex 
                ]; 
 
            phonePurchases[ 
                purchaseIndex 
            ] = { 
 
                ...oldPurchase, 
 
                phoneName: 
                    phoneName, 
 
                serial: 
                    serial 
                        ? serial.value.trim() 
                        : "", 
 
                sellerName: 
                    sellerName, 
 
                sellerPhone: 
                    sellerPhone 
                        ? sellerPhone.value.trim() 
                        : "", 
 
                price: 
                    price 
                        ? price.value 
                        : "", 
 
                date: 
                    date 
                        ? date.value 
                        : "", 
 
                notes: 
                    notes 
                        ? notes.value.trim() 
                        : "", 
 
                updatedAt: 
                    new Date().toISOString() 
 
            }; 
 
            savePhonePurchases(); 
 
            renderPhonePurchases(); 
 
            clearPurchaseForm(); 
 
            if (purchaseForm) { 
 
                purchaseForm.style.display = 
                    "none"; 
 
            } 
 
            alert( 
                currentLanguage === "ar" 
                    ? "تم تعديل المشتريات بنجاح ✅" 
                    : "Purchase updated successfully." 
            ); 
 
            return; 
 
        } 
 
        const purchase = { 
 
            id: 
                "purchase-" + 
                Date.now(), 
 
            phoneName: 
                phoneName, 
 
            serial: 
                serial 
                    ? serial.value.trim() 
                    : "", 
 
            sellerName: 
                sellerName, 
 
            sellerPhone: 
                sellerPhone 
                    ? sellerPhone.value.trim() 
                    : "", 
 
            price: 
                price 
                    ? price.value 
                    : "", 
 
            date: 
                date 
                    ? date.value 
                    : "", 
 
            notes: 
                notes 
                    ? notes.value.trim() 
                    : "", 
 
            createdAt: 
                new Date().toISOString() 
 
        }; 
 
        phonePurchases.unshift( 
            purchase 
        ); 
 
        savePhonePurchases(); 
 
        renderPhonePurchases(); 
 
        clearPurchaseForm(); 
 
        if (purchaseForm) { 
 
            purchaseForm.style.display = 
                "none"; 
 
        } 
 
        alert( 
            currentLanguage === "ar" 
                ? "تم حفظ الموبايل في المشتريات بنجاح ✅" 
                : "Purchase saved successfully." 
        ); 
 
    } 
 
    function openSaleTab() { 
 
        saleTab.classList.add("active"); 
 
        purchaseTab.classList.remove("active"); 
 
        if (saleSection) { 
 
            saleSection.style.display = 
                "block"; 
 
        } 
 
        if (purchasesSection) { 
 
            purchasesSection.style.display = 
                "none"; 
 
        } 
 
        if (purchaseForm) { 
 
            purchaseForm.style.display = 
                "none"; 
 
        } 
 
        clearPurchaseForm(); 
 
        if ( 
            typeof renderSaleDevices === 
            "function" 
        ) { 
 
            renderSaleDevices(); 
 
        } 
 
    } 
 
    function openPurchaseTab() { 
 
        saleTab.classList.remove("active"); 
 
        purchaseTab.classList.add("active"); 
 
        if (saleSection) { 
 
            saleSection.style.display = 
                "none"; 
 
        } 
 
        if (purchasesSection) { 
 
            purchasesSection.style.display = 
                "block"; 
 
        } 
 
        if (purchaseForm) { 
 
            purchaseForm.style.display = 
                "none"; 
 
        } 
 
        renderPhonePurchases(); 
 
    } 
 if (purchasesSearchInput) {

    purchasesSearchInput.addEventListener(
        "input",
        function () {
            renderPhonePurchases();
        }
    );

}
 
saleTab.addEventListener(
    "click",
    openSaleTab
);

purchaseTab.addEventListener(
    "click",
    openPurchaseTab
);


 
    if (addPurchaseButton) { 
 
        addPurchaseButton.addEventListener( 
            "click", 
            function () { 
 
                editingPurchaseId = null; 
 
                clearPurchaseForm(); 
 
                if (purchaseForm) { 
 
                    purchaseForm.style.display = 
                        "block"; 
 
                    purchaseForm.scrollIntoView({ 
                        behavior: "smooth", 
                        block: "center" 
                    }); 
 
                } 
 
                if (savePurchaseButton) { 
 
                    savePurchaseButton.textContent = 
                        "💾 حفظ المشتريات"; 
 
                } 
 
            } 
        ); 
 
    } 
 
    if (closePurchaseButton) { 
 
        closePurchaseButton.addEventListener( 
            "click", 
            function () { 
 
                clearPurchaseForm(); 
 
                if (purchaseForm) { 
 
                    purchaseForm.style.display = 
                        "none"; 
 
                } 
 
            } 
        ); 
 
    } 
 
    if (savePurchaseButton) { 
 
        savePurchaseButton.addEventListener( 
            "click", 
            savePhonePurchase 
        ); 
 
    } 
 
    openSaleTab(); 
 
}); 
 
// ====================================================== 
// 💳 ACT WALLET — CLOSE BUTTON 
// ====================================================== 
 
const walletCloseButton = 
    document.getElementById("wallet-close-button"); 
 
if (walletCloseButton) { 
 
    walletCloseButton.addEventListener("click", function () { 
 
        const walletSection = 
            document.getElementById("wallet-section"); 
 
        if (walletSection) { 
            walletSection.style.display = "none"; 
        } 
 
        const operationView = 
            document.getElementById("wallet-operation-view"); 
 
        if (operationView) { 
            operationView.style.display = "none"; 
        } 
 
        const operationsGrid = 
            document.querySelector( 
                "#wallet-section .wallet-operations-grid" 
            ); 
 
        if (operationsGrid) { 
            operationsGrid.style.display = "grid"; 
        } 
 
        const moreButton = 
            document.getElementById("nav-more"); 
 
        if (moreButton) { 
            moreButton.click(); 
        } 
 
    }); 
 
} 
 
// ====================================================== 
// 💳 ACT WALLET — AUTO BALANCE CALCULATOR 
// ====================================================== 
 
function updateWalletBalanceSummary() { 
 
    const currentBalanceElement = 
        document.getElementById("wallet-current-balance"); 
 
    const totalWithdrawElement = 
        document.getElementById("wallet-total-withdraw"); 
 
    const totalDepositElement = 
        document.getElementById("wallet-total-deposit"); 
 
    const afterWithdrawElement = 
        document.getElementById("wallet-balance-after-withdraw"); 
 
    const afterDepositElement = 
        document.getElementById("wallet-balance-after-deposit"); 
 
    if ( 
        !currentBalanceElement || 
        !totalWithdrawElement || 
        !totalDepositElement || 
        !afterWithdrawElement || 
        !afterDepositElement 
    ) { 
        return; 
    } 
 
    let userId = "guest"; 
 
    if ( 
        typeof currentUser !== "undefined" && 
        currentUser && 
        currentUser.uid 
    ) { 
        userId = currentUser.uid; 
    } 
 
    let totalWithdraw = 0; 
    let totalDeposit = 0; 
 
    try { 
 
        const withdrawKey = 
            "actPhoneManager_wallet_transactions_withdraw_" + 
            userId; 
 
        const withdrawData = 
            JSON.parse( 
                localStorage.getItem(withdrawKey) || "[]" 
            ); 
 
        if (Array.isArray(withdrawData)) { 
 
            totalWithdraw = 
                withdrawData.reduce( 
                    function (total, transaction) { 
 
                        return ( 
                            total + 
                            Number(transaction.amount || 0) 
                        ); 
 
                    }, 
                    0 
                ); 
 
        } 
 
    } catch (error) { 
 
        console.error( 
            "Wallet withdraw balance error:", 
            error 
        ); 
 
    } 
 
    try { 
 
        const depositKey = 
            "actPhoneManager_wallet_transactions_deposit_" + 
            userId; 
 
        const depositData = 
            JSON.parse( 
                localStorage.getItem(depositKey) || "[]" 
            ); 
 
        if (Array.isArray(depositData)) { 
 
            totalDeposit = 
                depositData.reduce( 
                    function (total, transaction) { 
 
                        return ( 
                            total + 
                            Number(transaction.amount || 0) 
                        ); 
 
                    }, 
                    0 
                ); 
 
        } 
 
    } catch (error) { 
 
        console.error( 
            "Wallet deposit balance error:", 
            error 
        ); 
 
    } 
 
    const currentBalance = 
        totalDeposit - totalWithdraw; 
 
    function formatMoney(amount) { 
 
        return ( 
            Number(amount || 0).toLocaleString( 
                "ar-EG", 
                { 
                    minimumFractionDigits: 2, 
                    maximumFractionDigits: 2 
                } 
            ) + 
            " ج.م" 
        ); 
 
    } 
 
    totalWithdrawElement.textContent = 
        formatMoney(totalWithdraw); 
 
    totalDepositElement.textContent = 
        formatMoney(totalDeposit); 
 
    currentBalanceElement.textContent = 
        formatMoney(currentBalance); 
 
    afterWithdrawElement.textContent = 
        formatMoney(currentBalance); 
 
    afterDepositElement.textContent = 
        formatMoney(currentBalance); 
 
} 
 
updateWalletBalanceSummary();

 // ======================================================
 // 🔒 فتح صفحة إقفال اليوم
 // ======================================================

const moreDayClose = document.getElementById("more-day-close");
const dayCloseSection = document.getElementById("day-close-section");
const dayCloseBackButton = document.getElementById("day-close-back-button");

if (dayCloseBackButton) {
    dayCloseBackButton.onclick = function () {
        if (dayCloseSection) {
            dayCloseSection.style.display = "none";
        }

        if (mainPage) {
            mainPage.style.display = "block";
        }

        if (moreSection) {
            moreSection.style.display = "block";
        }
    };
}const mainPage = document.getElementById("main-page");
const walletSection = document.getElementById("wallet-section");
const moreSection = document.getElementById("more-section");

// ======================================================
// فتح إقفال اليوم
// ======================================================

if (moreDayClose) {
    moreDayClose.addEventListener("click", function () {

        if (mainPage) {
mainPage.style.display = "block";        }

        if (moreSection) {
            moreSection.style.display = "none";
        }

        if (walletSection) {
            walletSection.style.display = "none";
        }

        if (dayCloseSection) {
            dayCloseSection.style.display = "block";
        }

        const dateElement = document.getElementById("day-close-current-date");

        if (dateElement) {
            const today = new Date();

            dateElement.textContent = today.toLocaleDateString("ar-EG", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric"
            });
        }

        ensurePreviousDaysClosed();
        renderDayCloseCurrentSummary();
        renderPreviousDays();
    });
}

// ======================================================
// زر الرجوع من إقفال اليوم
// ======================================================

if (dayCloseBackButton) {
    dayCloseBackButton.addEventListener("click", function () {

        if (dayCloseSection) {
            dayCloseSection.style.display = "none";
        }

        if (mainPage) {
            mainPage.style.display = "block";
        }
    });
}

/* ======================================================
   ACT PHONE MANAGER — PREMIUM ACCOUNT PROFILE
   عرض البيانات بعد الحفظ + تعديل عند الطلب
====================================================== */

(function initAccountProfile() {
    "use strict";

    const form = document.getElementById("account-profile-form");
    const photoInput = document.getElementById("account-photo-input");
    const photoPreview = document.getElementById("account-photo-preview");
    const resetButton = document.getElementById("account-reset-button");
    const logoutButton = document.getElementById("account-logout-button");
    const birthDateInput = document.getElementById("account-birth-date");
    const ageInput = document.getElementById("account-age");
    const profileCard = document.querySelector(
        "#account-section .account-profile-card"
    );

    if (!form || !photoPreview || !profileCard) {
        console.warn("Account profile elements were not found.");
        return;
    }

    const section = document.getElementById("account-section");

    const fieldIds = [
        "account-full-name",
        "account-nickname",
        "account-birth-date",
        "account-gender",
        "account-job",
        "account-phone",
        "account-country",
        "account-city",
        "account-address",
        "account-workplace",
        "account-website",
        "account-bio"
    ];

    const fieldLabels = {
        "account-full-name": "الاسم الكامل",
        "account-nickname": "اسم الشهرة",
        "account-birth-date": "تاريخ الميلاد",
        "account-gender": "النوع",
        "account-job": "الوظيفة",
        "account-phone": "رقم الهاتف",
        "account-country": "الدولة",
        "account-city": "المدينة",
        "account-address": "العنوان",
        "account-workplace": "جهة العمل",
        "account-website": "الموقع الإلكتروني",
        "account-bio": "نبذة عنك"
    };

    let activeUser = null;
    let selectedPhoto = "";
    let originalProfile = {};
    let hasSavedProfile = false;
    let authListenerStarted = false;

    const defaultPhoto =
        photoPreview.dataset.defaultPhoto ||
        photoPreview.getAttribute("src") ||
        "";

    // ==================================================
    // إنشاء تنسيق وضع العرض
    // ==================================================

    if (!document.getElementById("account-view-mode-styles")) {
        const style = document.createElement("style");
        style.id = "account-view-mode-styles";

        style.textContent = `
            #account-section .account-view-mode {
                display: grid;
                gap: 16px;
                margin: 0 0 18px;
            }

            #account-section .account-view-group {
                padding: 20px;
                background: #101c30;
                border: 1px solid #263a56;
                border-radius: 14px;
            }

            #account-section .account-view-group h3 {
                margin: 0 0 16px;
                padding-bottom: 12px;
                border-bottom: 1px solid #263a56;
                color: #edf4ff;
                font-size: 16px;
            }

            #account-section .account-view-grid {
                display: grid;
                grid-template-columns: repeat(2, minmax(0, 1fr));
                gap: 12px;
            }

            #account-section .account-view-item {
                min-width: 0;
                padding: 13px;
                background: #0b1424;
                border: 1px solid #24344c;
                border-radius: 9px;
            }

            #account-section .account-view-item.account-view-wide {
                grid-column: 1 / -1;
            }

            #account-section .account-view-label {
                display: block;
                margin-bottom: 7px;
                color: #94a3b8;
                font-size: 12px;
            }

            #account-section .account-view-value {
                display: block;
                color: #f1f5f9;
                font-size: 14px;
                line-height: 1.8;
                overflow-wrap: anywhere;
                white-space: pre-wrap;
            }

            #account-section .account-view-value a {
                color: #7dd3fc;
                overflow-wrap: anywhere;
            }

            #account-section .account-view-empty {
                padding: 20px;
                border: 1px dashed #30435e;
                border-radius: 10px;
                color: #94a3b8;
                text-align: center;
                line-height: 1.9;
            }

            #account-section .account-edit-profile-button {
                width: 100%;
                min-height: 48px;
                padding: 12px 18px;
                border: 0;
                border-radius: 10px;
                background: #0284c7;
                color: white;
                font: inherit;
                font-weight: 800;
                cursor: pointer;
                transition: background 0.2s ease;
            }

            #account-section .account-edit-profile-button:hover {
                background: #0ea5e9;
            }

            #account-section .account-view-mode[hidden],
            #account-section #account-profile-form[hidden] {
                display: none !important;
            }

            @media (max-width: 600px) {
                #account-section .account-view-group {
                    padding: 15px;
                }

                #account-section .account-view-grid {
                    grid-template-columns: minmax(0, 1fr);
                }

                #account-section .account-view-item.account-view-wide {
                    grid-column: auto;
                }
            }
        `;

        document.head.appendChild(style);
    }

    // ==================================================
    // تجهيز واجهة عرض البيانات وزر التعديل
    // ==================================================

    const viewContainer = document.createElement("div");
    viewContainer.className = "account-view-mode";
    viewContainer.hidden = true;

    profileCard.insertAdjacentElement("afterend", viewContainer);

    const editButton = document.createElement("button");
    editButton.type = "button";
    editButton.className = "account-edit-profile-button";
    editButton.textContent = "✏️ تعديل بياناتي";

    viewContainer.appendChild(editButton);

    // ==================================================
    // Firebase / Google
    // ==================================================

    function getProviderData() {
        if (!activeUser || !Array.isArray(activeUser.providerData)) {
            return [];
        }

        return activeUser.providerData;
    }

    function getFirebaseValue(property) {
        if (!activeUser) return "";

        if (activeUser[property]) {
            return activeUser[property];
        }

        for (const provider of getProviderData()) {
            if (provider && provider[property]) {
                return provider[property];
            }
        }

        return "";
    }

    function getFirebasePhoto() {
        return getFirebaseValue("photoURL") || defaultPhoto;
    }

    function getProfileKey() {
        return activeUser && activeUser.uid
            ? "actPhoneManager_account_profile_" + activeUser.uid
            : "actPhoneManager_account_profile_guest";
    }

    // ==================================================
    // قراءة وحفظ الملف الشخصي
    // ==================================================

    function readProfile() {
        try {
            const raw = localStorage.getItem(getProfileKey());

            if (!raw) return {};

            const parsed = JSON.parse(raw);

            return parsed &&
                typeof parsed === "object" &&
                !Array.isArray(parsed)
                ? parsed
                : {};
        } catch (error) {
            console.error("Account profile read error:", error);
            return {};
        }
    }

    function getAutomaticProfile() {
        return {
            "account-full-name": getFirebaseValue("displayName") || "",
            "account-phone": getFirebaseValue("phoneNumber") || "",
            photo: ""
        };
    }

    function getFieldValues() {
        const data = {};

        fieldIds.forEach(function (id) {
            const field = document.getElementById(id);

            if (field) {
                data[id] = field.value.trim();
            }
        });

        data.photo = selectedPhoto || "";
        return data;
    }

    function setFieldValues(data) {
        const profile = data || {};

        fieldIds.forEach(function (id) {
            const field = document.getElementById(id);

            if (field) {
                field.value =
                    profile[id] !== undefined &&
                    profile[id] !== null
                        ? profile[id]
                        : "";
            }
        });

        selectedPhoto = profile.photo || "";

        photoPreview.src = selectedPhoto || getFirebasePhoto();

        const emailField = document.getElementById("account-email");

        if (emailField) {
            emailField.value = getFirebaseValue("email") || "";
        }

        updateAge();
        updateProfileHeader();
    }

    // ==================================================
    // حساب العمر
    // ==================================================

    function updateAge() {
        if (!birthDateInput || !ageInput) return;

        if (!birthDateInput.value) {
            ageInput.value = "";
            return;
        }

        const birthDate = new Date(
            birthDateInput.value + "T00:00:00"
        );

        const today = new Date();

        if (
            Number.isNaN(birthDate.getTime()) ||
            birthDate > today
        ) {
            ageInput.value = "";
            return;
        }

        let age = today.getFullYear() - birthDate.getFullYear();

        if (
            today.getMonth() < birthDate.getMonth() ||
            (
                today.getMonth() === birthDate.getMonth() &&
                today.getDate() < birthDate.getDate()
            )
        ) {
            age--;
        }

        ageInput.value = String(age);
    }

    // ==================================================
    // تحديث رأس الحساب
    // ==================================================

    function updateProfileHeader() {
        const nameField = document.getElementById("account-full-name");
        const nicknameField = document.getElementById("account-nickname");
        const displayName = document.getElementById("account-display-name");
        const displayEmail = document.getElementById("account-display-email");
        const emailField = document.getElementById("account-email");

        const name =
            (nicknameField && nicknameField.value.trim()) ||
            (nameField && nameField.value.trim()) ||
            getFirebaseValue("displayName") ||
            "اسم المستخدم";

        const email = getFirebaseValue("email") || "";

        if (displayName) displayName.textContent = name;

        if (displayEmail) {
            displayEmail.textContent = email || "لا يوجد بريد إلكتروني";
        }

        if (emailField) emailField.value = email;

        const userId = document.getElementById("account-user-id");

        if (userId) {
            userId.textContent =
                activeUser && activeUser.uid
                    ? activeUser.uid
                    : "حساب زائر";
        }

        const createdAt = document.getElementById("account-created-at");
        const creationTime =
            activeUser &&
            activeUser.metadata &&
            activeUser.metadata.creationTime;

        if (createdAt) {
            createdAt.textContent = creationTime
                ? new Date(creationTime).toLocaleDateString("ar-EG")
                : "غير متاح";
        }

        const loginMethod = document.getElementById("account-login-method");

        if (loginMethod) {
            const providers = getProviderData().map(function (item) {
                return item.providerId;
            });

            if (providers.includes("google.com")) {
                loginMethod.textContent = "Google";
            } else if (providers.includes("password")) {
                loginMethod.textContent = "البريد الإلكتروني";
            } else {
                loginMethod.textContent = activeUser ? "طريقة أخرى" : "زائر";
            }
        }
    }

    // ==================================================
    // تنسيق القيم للعرض
    // ==================================================

    function getDisplayValue(id, value) {
        if (!value) return "";

        if (id === "account-gender") {
            const genderLabels = {
                male: "ذكر",
                female: "أنثى",
                other: "أفضل عدم التحديد"
            };

            return genderLabels[value] || value;
        }

        if (id === "account-birth-date") {
            const date = new Date(value + "T00:00:00");

            return Number.isNaN(date.getTime())
                ? value
                : date.toLocaleDateString("ar-EG");
        }

        return value;
    }

    function createViewItem(label, value, wide, website) {
        const item = document.createElement("div");
        item.className = "account-view-item";

        if (wide) {
            item.classList.add("account-view-wide");
        }

        const labelElement = document.createElement("span");
        labelElement.className = "account-view-label";
        labelElement.textContent = label;

        const valueElement = document.createElement("span");
        valueElement.className = "account-view-value";

        if (website && value) {
            try {
                const url = new URL(value);

                if (url.protocol === "http:" || url.protocol === "https:") {
                    const link = document.createElement("a");
                    link.href = url.href;
                    link.target = "_blank";
                    link.rel = "noopener noreferrer";
                    link.textContent = value;
                    valueElement.appendChild(link);
                } else {
                    valueElement.textContent = value;
                }
            } catch (error) {
                valueElement.textContent = value;
            }
        } else {
            valueElement.textContent = value;
        }

        item.append(labelElement, valueElement);
        return item;
    }

    // ==================================================
    // بناء واجهة العرض من البيانات المكتوبة فقط
    // ==================================================

    function renderViewMode() {
        viewContainer.replaceChildren();

        const groups = [
            {
                title: "🪪 البيانات الشخصية",
                fields: [
                    "account-full-name",
                    "account-nickname",
                    "account-birth-date",
                    "account-gender",
                    "account-job"
                ]
            },
            {
                title: "📞 بيانات الاتصال",
                fields: [
                    "account-phone",
                    "account-country",
                    "account-city",
                    "account-address"
                ]
            },
            {
                title: "✨ معلومات إضافية",
                fields: [
                    "account-workplace",
                    "account-website",
                    "account-bio"
                ]
            }
        ];

        let visibleItems = 0;

        groups.forEach(function (group) {
            const items = [];

            group.fields.forEach(function (id) {
                const field = document.getElementById(id);

                if (!field) return;

                const rawValue = field.value.trim();

                // لا نعرض أي حقل فارغ.
                if (!rawValue) return;

                const value = getDisplayValue(id, rawValue);

                items.push(
                    createViewItem(
                        fieldLabels[id],
                        value,
                        id === "account-address" ||
                        id === "account-bio" ||
                        id === "account-website",
                        id === "account-website"
                    )
                );
            });

            // العمر محسوب تلقائيًا من تاريخ الميلاد.
            if (
                group.title === "🪪 البيانات الشخصية" &&
                ageInput &&
                ageInput.value.trim() &&
                document.getElementById("account-birth-date").value
            ) {
                items.push(
                    createViewItem(
                        "العمر",
                        ageInput.value + " سنة",
                        false,
                        false
                    )
                );
            }

            if (!items.length) return;

            const groupElement = document.createElement("div");
            groupElement.className = "account-view-group";

            const heading = document.createElement("h3");
            heading.textContent = group.title;

            const grid = document.createElement("div");
            grid.className = "account-view-grid";

            items.forEach(function (item) {
                grid.appendChild(item);
            });

            groupElement.append(heading, grid);
            viewContainer.appendChild(groupElement);

            visibleItems += items.length;
        });

        if (!visibleItems) {
            const empty = document.createElement("div");
            empty.className = "account-view-empty";
            empty.textContent =
                "لسه مفيش بيانات شخصية محفوظة. اضغط على «تعديل بياناتي» لإضافة بياناتك.";
            viewContainer.appendChild(empty);
        }

        // زر التعديل يظهر أسفل بيانات العرض.
        viewContainer.appendChild(editButton);
    }

    // ==================================================
    // التحكم في وضعي العرض والتعديل
    // ==================================================

    function showViewMode() {
        updateAge();
        updateProfileHeader();
        renderViewMode();

        form.hidden = true;
        viewContainer.hidden = false;
    }

    function showEditMode() {
        viewContainer.hidden = true;
        form.hidden = false;
    }

    editButton.addEventListener("click", function () {
        setFieldValues(getFieldValues());
        showEditMode();
    });

    // ==================================================
    // تحميل الملف الشخصي
    // ==================================================

    function loadProfile() {
        const saved = readProfile();
        const automatic = getAutomaticProfile();

        hasSavedProfile = Object.keys(saved).length > 0;

        const merged = Object.assign({}, automatic, saved);

        originalProfile = Object.assign({}, merged);

        setFieldValues(merged);

        if (hasSavedProfile) {
            showViewMode();
        } else {
            showEditMode();
        }
    }

    // ==================================================
    // حفظ البيانات والعودة لوضع العرض
    // ==================================================

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        try {
            updateAge();

            const data = getFieldValues();
const key = getProfileKey();
const value = JSON.stringify(data);

// الحفظ المحلي
localStorage.setItem(key, value);

// الحفظ السحابي
saveUserDataToCloud(key, value);

            originalProfile = Object.assign({}, data);
            hasSavedProfile = true;

            setFieldValues(data);
            showViewMode();

            alert("تم حفظ بيانات حسابك بنجاح.");
        } catch (error) {
            console.error("Account profile save error:", error);

            alert(
                "تعذر حفظ البيانات. قد تكون مساحة التخزين ممتلئة."
            );
        }
    });

    // ==================================================
    // تحديث العمر تلقائيًا
    // ==================================================

    if (birthDateInput) {
        birthDateInput.addEventListener("input", updateAge);
        birthDateInput.addEventListener("change", updateAge);
    }

    // ==================================================
    // تحديث رأس الحساب أثناء الكتابة
    // ==================================================

    ["account-full-name", "account-nickname"].forEach(function (id) {
        const field = document.getElementById(id);

        if (field) {
            field.addEventListener("input", updateProfileHeader);
        }
    });

    // ==================================================
    // رفع صورة شخصية
    // ==================================================

    if (photoInput) {
        photoInput.addEventListener("change", function () {
            const file = photoInput.files && photoInput.files[0];

            if (!file) return;

            if (!file.type.startsWith("image/")) {
                alert("اختر ملف صورة صالحًا.");
                photoInput.value = "";
                return;
            }

            if (file.size > 8 * 1024 * 1024) {
                alert("حجم الصورة كبير. اختر صورة أقل من 8 ميجابايت.");
                photoInput.value = "";
                return;
            }

            const reader = new FileReader();

            reader.onload = function () {
                const image = new Image();

                image.onload = function () {
                    const maxSize = 500;
                    const scale = Math.min(
                        1,
                        maxSize / Math.max(image.width, image.height)
                    );

                    const canvas = document.createElement("canvas");

                    canvas.width = Math.max(
                        1,
                        Math.round(image.width * scale)
                    );

                    canvas.height = Math.max(
                        1,
                        Math.round(image.height * scale)
                    );

                    const context = canvas.getContext("2d");

                    if (!context) {
                        alert("تعذر تجهيز الصورة.");
                        return;
                    }

                    context.drawImage(
                        image,
                        0,
                        0,
                        canvas.width,
                        canvas.height
                    );

                    selectedPhoto = canvas.toDataURL("image/jpeg", 0.78);
                    photoPreview.src = selectedPhoto;
                };

                image.onerror = function () {
                    alert("تعذر فتح الصورة المختارة.");
                };

                image.src = reader.result;
            };

            reader.onerror = function () {
                alert("تعذر قراءة ملف الصورة.");
            };

            reader.readAsDataURL(file);
        });
    }

    // ==================================================
    // إلغاء التعديلات
    // ==================================================

    if (resetButton) {
        resetButton.addEventListener("click", function () {
            setFieldValues(originalProfile);

            if (photoInput) {
                photoInput.value = "";
            }

            if (hasSavedProfile) {
                showViewMode();
            } else {
                showEditMode();
            }
        });
    }

    // ==================================================
    // تسجيل الخروج
    // ==================================================

    if (logoutButton) {
        logoutButton.addEventListener("click", async function () {
            if (!activeUser) {
                alert("لا يوجد حساب مسجل الدخول حاليًا.");
                return;
            }

            if (!window.confirm("هل تريد تسجيل الخروج؟")) {
                return;
            }

            logoutButton.disabled = true;

            try {
                await signOut(auth);
            } catch (error) {
                console.error("Account logout error:", error);
                alert("تعذر تسجيل الخروج. حاول مرة أخرى.");
            } finally {
                logoutButton.disabled = false;
            }
        });
    }

    // ==================================================
    // مراقبة تسجيل الدخول
    // ==================================================

    if (
        authListenerStarted ||
        typeof onAuthStateChanged !== "function" ||
        typeof auth === "undefined"
    ) {
        console.warn("Account profile: Firebase Auth is unavailable.");
        return;
    }

    authListenerStarted = true;

    onAuthStateChanged(auth, function (user) {
        activeUser = user || null;
        selectedPhoto = "";
        originalProfile = {};
        hasSavedProfile = false;

        if (photoInput) {
            photoInput.value = "";
        }

        if (!activeUser) {
            fieldIds.forEach(function (id) {
                const field = document.getElementById(id);

                if (field) field.value = "";
            });

            const emailField = document.getElementById("account-email");

            if (emailField) emailField.value = "";

            photoPreview.src = defaultPhoto;
            viewContainer.hidden = true;
            form.hidden = false;

            updateAge();
            updateProfileHeader();
            return;
        }

        loadProfile();
    });

})();

/* =========================================================
   ACT INDEPENDENT PURCHASES - COMPLETE SYSTEM
   تسجيل وحساب وبحث وتعديل وحذف وإحصائيات وحفظ مستقل
========================================================= */

document.addEventListener("DOMContentLoaded", function () {
    "use strict";

    const section = document.getElementById(
        "independent-purchases-section"
    );

    if (!section) {
        console.error("Independent purchases section not found.");
        return;
    }

    const form = section.querySelector("#ind-purchase-form");
    const productInput = section.querySelector("#ind-purchase-product");
    const supplierInput = section.querySelector("#ind-purchase-supplier");
    const quantityInput = section.querySelector("#ind-purchase-quantity");
    const priceInput = section.querySelector("#ind-purchase-unit-price");
    const paidInput = section.querySelector("#ind-purchase-paid");
    const dateInput = section.querySelector("#ind-purchase-date");
    const notesInput = section.querySelector("#ind-purchase-notes");
    const categoryInput = section.querySelector("#ind-purchase-category");
    const previewTotal = section.querySelector(
        "#ind-purchase-preview-total"
    );
    const purchasesList = section.querySelector("#ind-purchases-list");
    const searchInput = section.querySelector("#ind-purchases-search");
    const saveButton = form
        ? form.querySelector('[type="submit"]')
        : null;

    if (
        !form || !productInput || !supplierInput ||
        !quantityInput || !priceInput || !paidInput ||
        !dateInput || !notesInput || !categoryInput ||
        !previewTotal || !purchasesList || !searchInput
    ) {
        console.error("Independent purchases form is incomplete.");
        return;
    }

    const countElement = section.querySelector("#ind-purchases-count");
    const totalElement = section.querySelector("#ind-purchases-total");
    const quantityElement = section.querySelector(
        "#ind-purchases-quantity"
    );

    const categoryNames = {
        phones: "تلفونات",
        accessories: "إكسسوارات",
        parts: "قطع غيار"
    };

    let purchases = [];
    let editingId = null;

    function getToday() {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, "0");
        const day = String(now.getDate()).padStart(2, "0");

        return `${year}-${month}-${day}`;
    }

    function getStorageKey() {
        let uid = "guest";

        try {
            if (
                typeof currentUser !== "undefined" &&
                currentUser &&
                currentUser.uid
            ) {
                uid = currentUser.uid;
            }
        } catch (error) {
            uid = "guest";
        }

        return "actPhoneManager_independentPurchases_" + uid;
    }

    function loadPurchases() {
        try {
            const saved = localStorage.getItem(getStorageKey());
            const parsed = saved ? JSON.parse(saved) : [];

            purchases = Array.isArray(parsed) ? parsed : [];
        } catch (error) {
            purchases = [];
            console.error("Could not load independent purchases.", error);
        }
    }
function savePurchases() {
    try {

        const key = getStorageKey();
        const value = JSON.stringify(purchases);

        // الحفظ المحلي
        localStorage.setItem(key, value);

        // الحفظ السحابي
        saveUserDataToCloud(key, value);

        window.dispatchEvent(new Event("act-purchases-data-updated"));
        if (typeof addNotificationFromOperation === "function") {
            addNotificationFromOperation({type:"purchase",icon:"📦",title:"تم حفظ عملية شراء",details:"تم تحديث سجل المشتريات بنجاح"});
        }

        return true;

    } catch (error) {

        alert(
            "تعذر حفظ المشتريات في المتصفح. تأكد من توفر مساحة تخزين."
        );

        console.error(
            "Could not save independent purchases.",
            error
        );

        return false;
    }
}

    function money(value) {
        return Number(value || 0).toLocaleString("ar-EG", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }) + " جنيه";
    }

    function getFormTotal() {
        const quantity = Number(quantityInput.value);
        const price = Number(priceInput.value);

        if (
            !Number.isFinite(quantity) ||
            !Number.isFinite(price) ||
            quantity <= 0 ||
            price < 0
        ) {
            return 0;
        }

        return quantity * price;
    }

    function updatePreview() {
        previewTotal.textContent = money(getFormTotal());
    }

    function makeId() {
        if (
            window.crypto &&
            typeof window.crypto.randomUUID === "function"
        ) {
            return window.crypto.randomUUID();
        }

        return Date.now().toString(36) +
            Math.random().toString(36).slice(2);
    }

    function escapeHTML(value) {
        return String(value == null ? "" : value).replace(
            /[&<>"']/g,
            function (character) {
                return {
                    "&": "&amp;",
                    "<": "&lt;",
                    ">": "&gt;",
                    '"': "&quot;",
                    "'": "&#39;"
                }[character];
            }
        );
    }

    function updateStats() {
        const totalValue = purchases.reduce(function (sum, purchase) {
            return sum + Number(purchase.total || 0);
        }, 0);

        const totalQuantity = purchases.reduce(function (sum, purchase) {
            return sum + Number(purchase.quantity || 0);
        }, 0);

        if (countElement) {
            countElement.textContent = purchases.length.toLocaleString("ar-EG");
        }

        if (totalElement) {
            totalElement.textContent = money(totalValue);
        }

        if (quantityElement) {
            quantityElement.textContent =
                totalQuantity.toLocaleString("ar-EG");
        }
    }

    function renderPurchases() {
        updateStats();

        const query = searchInput.value.trim().toLocaleLowerCase();

        const filtered = purchases.filter(function (purchase) {
            const searchable = [
                purchase.product,
                purchase.supplier,
                purchase.date,
                purchase.notes,
                categoryNames[purchase.category] || purchase.category
            ].join(" ").toLocaleLowerCase();

            return searchable.includes(query);
        });

        if (filtered.length === 0) {
            purchasesList.innerHTML =
                '<div class="ind-purchases-empty">' +
                (
                    purchases.length
                        ? "لا توجد نتائج مطابقة للبحث."
                        : "لا توجد عمليات شراء مسجلة حتى الآن."
                ) +
                "</div>";
            return;
        }

        purchasesList.innerHTML = filtered.map(function (purchase) {
            return `
                <article class="ind-purchase-record"
                    style="padding:16px;margin-bottom:12px;border:1px solid #64748b55;border-radius:14px;background:var(--input-bg,#0b1626);">

                    <div style="display:flex;justify-content:space-between;gap:12px;flex-wrap:wrap;">
                        <div>
                            <strong style="font-size:17px;">
                                ${escapeHTML(purchase.product)}
                            </strong>
                            <div style="opacity:.75;margin-top:7px;">
                                ${escapeHTML(categoryNames[purchase.category] || "مشتريات")}
                                ${purchase.supplier
                                    ? " • المورد: " + escapeHTML(purchase.supplier)
                                    : ""}
                            </div>
                        </div>

                        <strong style="color:#38bdf8;">
                            ${escapeHTML(money(purchase.total))}
                        </strong>
                    </div>

                    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(130px,1fr));gap:10px;margin-top:14px;font-size:13px;">
                        <div>الكمية: ${escapeHTML(purchase.quantity)}</div>
                        <div>سعر القطعة: ${escapeHTML(money(purchase.unitPrice))}</div>
                        <div>المدفوع: ${escapeHTML(money(purchase.paid))}</div>
                        <div>التاريخ: ${escapeHTML(purchase.date)}</div>
                    </div>

                    ${purchase.notes ? `
                        <div style="margin-top:12px;opacity:.8;white-space:pre-wrap;">
                            ملاحظات: ${escapeHTML(purchase.notes)}
                        </div>
                    ` : ""}

                    <div style="display:flex;gap:9px;flex-wrap:wrap;margin-top:15px;">
                        <button type="button"
                            data-purchase-action="edit"
                            data-purchase-id="${escapeHTML(purchase.id)}"
                            style="padding:9px 15px;border:0;border-radius:9px;cursor:pointer;">
                            ✏️ تعديل
                        </button>

                        <button type="button"
                            data-purchase-action="delete"
                            data-purchase-id="${escapeHTML(purchase.id)}"
                            style="padding:9px 15px;border:0;border-radius:9px;cursor:pointer;">
                            🗑️ حذف
                        </button>
                    </div>
                </article>
            `;
        }).join("");
    }

    function clearForm() {
        form.reset();
        editingId = null;
        categoryInput.value = "phones";
        dateInput.value = getToday();

        section.querySelectorAll("[data-purchase-category]").forEach(
            function (button) {
                button.classList.toggle(
                    "active",
                    button.dataset.purchaseCategory === "phones"
                );
            }
        );

        if (saveButton) {
            saveButton.textContent = "💾 حفظ عملية الشراء";
        }

        updatePreview();
    }

    function editPurchase(id) {
        const purchase = purchases.find(function (item) {
            return item.id === id;
        });

        if (!purchase) {
            return;
        }

        editingId = purchase.id;
        productInput.value = purchase.product || "";
        supplierInput.value = purchase.supplier || "";
        quantityInput.value = purchase.quantity;
        priceInput.value = purchase.unitPrice;
        paidInput.value = purchase.paid || 0;
        dateInput.value = purchase.date || getToday();
        notesInput.value = purchase.notes || "";
        categoryInput.value = purchase.category || "phones";

        section.querySelectorAll("[data-purchase-category]").forEach(
            function (button) {
                button.classList.toggle(
                    "active",
                    button.dataset.purchaseCategory === categoryInput.value
                );
            }
        );

        if (saveButton) {
            saveButton.textContent = "💾 حفظ التعديلات";
        }

        updatePreview();

        form.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

        productInput.focus();
    }

    // تحديث الإجمالي مباشرة عند تغيير الكمية أو السعر
    quantityInput.addEventListener("input", updatePreview);
    priceInput.addEventListener("input", updatePreview);

    // اختيار تصنيف المشتريات
    section.querySelectorAll("[data-purchase-category]").forEach(
        function (button) {
            button.addEventListener("click", function () {
                const category = button.dataset.purchaseCategory;

                if (!categoryNames[category]) {
                    return;
                }

                categoryInput.value = category;

                section.querySelectorAll("[data-purchase-category]").forEach(
                    function (item) {
                        item.classList.toggle("active", item === button);
                    }
                );
            });
        }
    );

    // حفظ عملية شراء جديدة أو تعديل عملية موجودة
    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const product = productInput.value.trim();
        const supplier = supplierInput.value.trim();
        const quantity = Number(quantityInput.value);
        const unitPrice = Number(priceInput.value);
        const paid = Number(paidInput.value || 0);
        const date = dateInput.value;
        const notes = notesInput.value.trim();
        const category = categoryInput.value;

        if (!product) {
            alert("اكتب اسم المنتج أولًا.");
            productInput.focus();
            return;
        }

        if (
            !Number.isSafeInteger(quantity) ||
            quantity < 1
        ) {
            alert("أدخل كمية صحيحة لا تقل عن قطعة واحدة.");
            quantityInput.focus();
            return;
        }

        if (
            !Number.isFinite(unitPrice) ||
            unitPrice < 0 ||
            !Number.isFinite(paid) ||
            paid < 0
        ) {
            alert("تأكد من صحة سعر القطعة والمبلغ المدفوع.");
            return;
        }

        if (!date) {
            alert("اختر تاريخ الشراء.");
            dateInput.focus();
            return;
        }

        if (!categoryNames[category]) {
            alert("اختر تصنيفًا صحيحًا للمشتريات.");
            return;
        }

        const total = quantity * unitPrice;

        if (!Number.isFinite(total)) {
            alert("إجمالي العملية أكبر من القيمة التي يمكن حسابها.");
            return;
        }

        const record = {
            id: editingId || makeId(),
            product: product,
            supplier: supplier,
            quantity: quantity,
            unitPrice: unitPrice,
            total: total,
            paid: paid,
            date: date,
            notes: notes,
            category: category,
            updatedAt: new Date().toISOString()
        };

        const previousPurchases = purchases.slice();

        if (editingId) {
            purchases = purchases.map(function (purchase) {
                return purchase.id === editingId ? record : purchase;
            });
        } else {
            purchases.unshift(record);
        }

        if (!savePurchases()) {
            purchases = previousPurchases;
            return;
        }

        clearForm();
        renderPurchases();

        alert(
            editingId
                ? "تم تحديث عملية الشراء بنجاح."
                : "تم حفظ عملية الشراء بنجاح."
        );
    });

    // البحث في السجل
    searchInput.addEventListener("input", renderPurchases);

    // التعديل والحذف من سجل المشتريات
    purchasesList.addEventListener("click", function (event) {
        const button = event.target.closest("[data-purchase-action]");

        if (!button || !purchasesList.contains(button)) {
            return;
        }

        const id = button.dataset.purchaseId;
        const action = button.dataset.purchaseAction;

        if (action === "edit") {
            editPurchase(id);
            return;
        }

        if (action === "delete") {
            const purchase = purchases.find(function (item) {
                return item.id === id;
            });

            if (!purchase) {
                return;
            }

            if (!confirm(
                'هل أنت متأكد من حذف عملية شراء "' +
                purchase.product +
                '"؟'
            )) {
                return;
            }

            const previousPurchases = purchases.slice();

            purchases = purchases.filter(function (item) {
                return item.id !== id;
            });

            if (!savePurchases()) {
                purchases = previousPurchases;
                return;
            }

            if (editingId === id) {
                clearForm();
            }

            renderPurchases();
        }
    });

    // يسمح لزر الشريط السفلي بتحديث السجل بعد تغيير المستخدم
    window.renderIndependentPurchases = function () {
        loadPurchases();
        renderPurchases();
    };

    window.addEventListener("act-user-data-ready", function () {
        loadPurchases();
        renderPurchases();
    });

    dateInput.value = getToday();
    loadPurchases();
    updatePreview();
    renderPurchases();
});

// ======================================================
// ACT PHONE MANAGER - NOTIFICATIONS BELL
// PREMIUM NOTIFICATIONS SYSTEM
// ======================================================

let actNotifications = [];

// مفتاح تخزين إشعارات المستخدم
function getActNotificationsKey() {
    const uid =
        typeof currentUser !== "undefined" &&
        currentUser &&
        currentUser.uid
            ? currentUser.uid
            : "guest";

    return "actPhoneManager_notifications_" + uid;
}

// تحميل الإشعارات
function loadActNotifications() {
    try {
        const saved = localStorage.getItem(getActNotificationsKey());

        actNotifications = saved ? JSON.parse(saved) : [];

        if (!Array.isArray(actNotifications)) {
            actNotifications = [];
        }
    } catch (error) {
        console.error("Notifications load error:", error);
        actNotifications = [];
    }
}

// حفظ الإشعارات محليًا وسحابيًا
function saveActNotifications() {
    try {
        const key = getActNotificationsKey();
        const value = JSON.stringify(actNotifications);

        localStorage.setItem(key, value);

        if (typeof saveUserDataToCloud === "function") {
            saveUserDataToCloud(key, value);
        }

    } catch (error) {
        console.error("Notifications save error:", error);
    }
}

// إضافة إشعار جديد
function addNotificationFromOperation(operation) {
    if (!operation) return;

    loadActNotifications();

    actNotifications.unshift({
        id: operation.id || createId("notification"),
        type: operation.type || "general",
        icon: operation.icon || "🔔",
        title: operation.title || "إشعار جديد",
        details: operation.details || "",
        amount: operation.amount ?? null,
        createdAt: operation.createdAt || new Date().toISOString(),
        read: false
    });

    actNotifications = actNotifications.slice(0, 100);

    saveActNotifications();
    renderActNotifications();

    try {
        if (typeof Notification !== "undefined" && Notification.permission === "granted" && document.visibilityState === "hidden") {
            const show = registration => {
                if (registration && typeof registration.showNotification === "function") {
                    registration.showNotification(operation.title || "إشعار ACT Manager", {
                        body: operation.details || "تم تسجيل عملية جديدة في البرنامج.",
                        icon: "./icons/icon-192.png",
                        badge: "./icons/icon-192.png",
                        tag: operation.type || "act-operation"
                    });
                } else {
                    new Notification(operation.title || "إشعار ACT Manager", { body: operation.details || "تم تسجيل عملية جديدة في البرنامج.", icon: "./icons/icon-192.png" });
                }
            };
            if ("serviceWorker" in navigator) navigator.serviceWorker.ready.then(show).catch(() => show(null));
            else show(null);
        }
    } catch (notificationError) {
        console.warn("ACT system notification unavailable:", notificationError);
    }

}


// ======================================================
// عرض الإشعارات مع زر حذف كل إشعار بشكل منفصل
// ======================================================

function renderActNotifications() {

    const list = document.getElementById("notification-list");
    const count = document.getElementById("notification-unread-count");

    if (!list) return;

    // حساب عدد الإشعارات غير المقروءة
    const unreadCount = actNotifications.filter(
        notification => !notification.read
    ).length;

    // تحديث عداد الإشعارات
    if (count) {
        count.textContent = unreadCount > 99 ? "99+" : unreadCount;
        count.style.display = unreadCount ? "inline-flex" : "none";
    }

    // إذا لم توجد إشعارات
    if (!actNotifications.length) {

        list.innerHTML = `
            <div class="notification-empty">
                لا توجد إشعارات حتى الآن
            </div>
        `;

        return;
    }

    // عرض جميع الإشعارات
    list.innerHTML = actNotifications.map(notification => `

        <div
            class="notification-item ${notification.read ? "is-read" : "is-unread"}"
            data-notification-id="${escapeHTML(notification.id)}"
        >

            <span class="notification-item-icon">
                ${escapeHTML(notification.icon || "🔔")}
            </span>

            <span class="notification-item-content">

                <strong>
                    ${escapeHTML(notification.title || "")}
                </strong>

                ${
                    notification.details
                        ? `<small>${escapeHTML(notification.details)}</small>`
                        : ""
                }

                <small>
                    ${escapeHTML(getCurrentTimeFromDate(notification.createdAt))}
                </small>

            </span>

            ${
                notification.read
                    ? ""
                    : `<span class="notification-unread-dot"></span>`
            }

            <!-- زر حذف الإشعار -->
            <button
                type="button"
                class="notification-delete-button"
                data-delete-notification="${escapeHTML(notification.id)}"
                aria-label="حذف الإشعار"
                title="حذف الإشعار"
            >✕</button>

        </div>

    `).join("");

    // التعامل مع الضغط على الإشعار
    list.querySelectorAll(".notification-item").forEach(item => {

        item.addEventListener("click", function (event) {

            const notificationId = this.dataset.notificationId;

            // التأكد من الضغط على زر الحذف
            const deleteButton = event.target.closest(
                "[data-delete-notification]"
            );

            // حذف الإشعار المحدد فقط
            if (deleteButton) {

                event.preventDefault();
                event.stopPropagation();

                actNotifications = actNotifications.filter(
                    notification =>
                        String(notification.id) !== String(notificationId)
                );

                saveActNotifications();
                renderActNotifications();

                return;
            }

            // تحديد الإشعار كمقروء
            const notification = actNotifications.find(
                notification =>
                    String(notification.id) === String(notificationId)
            );

            if (!notification || notification.read) return;

            notification.read = true;

            saveActNotifications();
            renderActNotifications();

        });

    });

}

// تحديد جميع الإشعارات كمقروءة
function markAllActNotificationsRead() {
    if (!Array.isArray(actNotifications)) return;

    actNotifications.forEach(function (notification) {
        if (notification) {
            notification.read = true;
        }
    });

    saveActNotifications();
    renderActNotifications();
}

// تشغيل نظام الإشعارات
function initActNotifications() {
    const bell = document.getElementById("notification-bell-button");
    const panel = document.getElementById("notification-panel");
    const markAll = document.getElementById("notification-mark-all-read");

    loadActNotifications();
    renderActNotifications();

    if (!bell || !panel) {
        console.warn("Notifications: bell or panel not found.");
        return;
    }

    if (!bell.dataset.notificationsReady) {
        bell.dataset.notificationsReady = "true";

        panel.hidden = true;
        panel.style.display = "none";

        bell.setAttribute("aria-expanded", "false");

        // فتح وإغلاق لوحة الإشعارات
        bell.addEventListener("click", function (event) {
            event.preventDefault();
            event.stopPropagation();

            const shouldOpen = panel.hidden;

            panel.hidden = !shouldOpen;
            panel.style.display = shouldOpen ? "flex" : "none";

            bell.setAttribute("aria-expanded", String(shouldOpen));
        });

        // منع إغلاق اللوحة عند الضغط داخلها
        panel.addEventListener("click", function (event) {
            event.stopPropagation();
        });

        // الإغلاق عند الضغط خارج اللوحة
        document.addEventListener("click", function () {
            panel.hidden = true;
            panel.style.display = "none";
            bell.setAttribute("aria-expanded", "false");
        });

        // الإغلاق بزر Escape
        document.addEventListener("keydown", function (event) {
            if (event.key === "Escape") {
                panel.hidden = true;
                panel.style.display = "none";
                bell.setAttribute("aria-expanded", "false");
            }
        });
    }

    // زر تحديد الكل كمقروء
    if (markAll && !markAll.dataset.notificationsReady) {
        markAll.dataset.notificationsReady = "true";

        markAll.addEventListener(
            "click",
            markAllActNotificationsRead
        );
    }
}

// بدء التشغيل
if (document.readyState === "loading") {
    document.addEventListener(
        "DOMContentLoaded",
        initActNotifications
    );
} else {
    initActNotifications();
}

// تحديث الإشعارات عند تغير الحساب
if (
    typeof auth !== "undefined" &&
    auth &&
    typeof auth.onAuthStateChanged === "function"
) {
    auth.onAuthStateChanged(function () {
        loadActNotifications();
        renderActNotifications();
    });
}

/* =====================================================
   ACT MARKET DASHBOARD — REAL DATA
   PREMIUM BLUE LINE CHART
===================================================== */

(function () {
    "use strict";

    const $ = id => document.getElementById(id);
    let period = 7;

    function readArray(key) {
        try {
            const value = JSON.parse(localStorage.getItem(key) || "[]");
            return Array.isArray(value) ? value : [];
        } catch (error) {
            console.error("Dashboard read error:", key, error);
            return [];
        }
    }

    function getSales() {
        const uid =
            typeof currentUser !== "undefined" && currentUser
                ? currentUser.uid
                : "guest";

        return readArray("actPhoneManager_sales_" + uid);
    }

    function getDate(item) {
        if (!item) return null;
        const raw = item.date || item.createdAt || item.saleDate ||
            item.purchaseDate || item.receiveDate || item.timestamp || item.created_at || "";
        if (!raw) return null;
        if (raw && typeof raw.toDate === "function") {
            const converted = raw.toDate();
            return converted instanceof Date && !Number.isNaN(converted.getTime()) ? converted : null;
        }
        // Parse YYYY-MM-DD as a local calendar date, not UTC.
        const dateOnly = String(raw).match(/^(\d{4})-(\d{2})-(\d{2})$/);
        const date = dateOnly
            ? new Date(Number(dateOnly[1]), Number(dateOnly[2]) - 1, Number(dateOnly[3]))
            : new Date(raw);
        return Number.isNaN(date.getTime()) ? null : date;
    }

    function numeric(value) {
        if (typeof value === "number") return Number.isFinite(value) ? value : 0;
        const normalized = String(value == null ? "" : value)
            .replace(/[٠-٩]/g, d => String("٠١٢٣٤٥٦٧٨٩".indexOf(d)))
            .replace(/[۰-۹]/g, d => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d)))
            .replace(/[٬,،\s]/g, "").replace(/٫/g, ".").replace(/[^0-9.+-]/g, "");
        const parsed = Number(normalized);
        return Number.isFinite(parsed) ? parsed : 0;
    }

    function amount(item) {
        if (!item) return 0;
        for (const field of ["total", "totalPrice", "finalPrice", "salePrice", "unitPrice", "price", "amount"]) {
            const value = item[field];
            if (value !== undefined && value !== null && value !== "") return numeric(value);
        }
        return 0;
    }

    function getDevices() {
        const key = typeof getUserKey === "function"
            ? getUserKey("devices")
            : "actPhoneManager_devices_guest";
        return readArray(key);
    }

    function money(value) {
        return Number(value || 0).toLocaleString("ar-EG", {
            maximumFractionDigits: 0
        });
    }

    function inRange(item, start, end) {
        const date = getDate(item);
        return date && date >= start && date < end;
    }

    function sum(items) {
        return items.reduce((total, item) => total + amount(item), 0);
    }

    function setText(id, value) {
        const element = $(id);
        if (element) element.textContent = value;
    }

    function changeText(id, current, previous) {
        const element = $(id);
        if (!element) return;

        if (previous === 0) {
            element.textContent = current === 0
                ? "لا توجد حركة"
                : "لا توجد فترة سابقة للمقارنة";

            element.className = "act-change";
            return;
        }

        const change =
            ((current - previous) / Math.abs(previous)) * 100;

        const up = change >= 0;

        element.textContent =
            (up ? "▲ " : "▼ ") +
            Math.abs(change).toLocaleString("ar-EG", {
                maximumFractionDigits: 1
            }) +
            "% مقارنة بالفترة السابقة";

        element.className =
            "act-change " + (up ? "is-up" : "is-down");
    }

    function drawLine(daily) {
        const chart = $("act-sales-line-chart");
        const axis = $("act-sales-chart-axis");

        if (!chart || !axis) return;

        const maxValue = Math.max(
            ...daily.map(day => day.sales),
            1
        );

        const chartMax = Math.ceil(maxValue / 5) * 5 || 5;

        const width = 720;
        const height = 300;
        const left = 75;
        const right = 15;
        const top = 25;
        const bottom = 245;

        const plotWidth = width - left - right;
        const plotHeight = bottom - top;

        const points = daily.map((day, index) => {
            const x = left +
                index * plotWidth /
                Math.max(daily.length - 1, 1);

            const y = bottom -
                (day.sales / chartMax) * plotHeight;

            return {
                x,
                y,
                value: day.sales,
                date: day.date
            };
        });

        const linePath = points.map((point, index) =>
            (index ? "L" : "M") +
            point.x.toFixed(2) + " " +
            point.y.toFixed(2)
        ).join(" ");

        const first = points[0];
        const last = points[points.length - 1];

        const areaPath = points.length
            ? linePath +
              " L " + last.x + " " + bottom +
              " L " + first.x + " " + bottom +
              " Z"
            : "";

        const grid = [];

        for (let i = 0; i <= 4; i++) {
            const ratio = i / 4;
            const y = top + ratio * plotHeight;
            const value = chartMax * (1 - ratio);

            grid.push(`
                <line
                    x1="${left}"
                    y1="${y}"
                    x2="${width - right}"
                    y2="${y}"
                    stroke="#7890aa"
                    stroke-opacity=".17"
                    stroke-dasharray="4 6"
                />

                <text
                    x="${left - 12}"
                    y="${y + 4}"
                    text-anchor="end"
                    fill="#91A7BE"
                    font-size="12"
                >${money(value)}</text>
            `);
        }

        if (!points.length) {
            chart.innerHTML = `
                <div class="act-chart-empty">
                    لا توجد بيانات مبيعات في الفترة المحددة.
                </div>
            `;
            axis.innerHTML = "";
            return;
        }

        chart.innerHTML = `
            <svg
                viewBox="0 0 ${width} ${height}"
                role="img"
                aria-label="حركة المبيعات اليومية"
                style="width:100%;height:auto;display:block"
            >
                <defs>
                    <linearGradient
                        id="actSalesAreaGradient"
                        x1="0" y1="0"
                        x2="0" y2="1"
                    >
                        <stop offset="0%" stop-color="#20B9FF" stop-opacity=".35"/>
                        <stop offset="100%" stop-color="#087BFF" stop-opacity="0"/>
                    </linearGradient>

                    <filter
                        id="actSalesGlow"
                        x="-50%" y="-50%"
                        width="200%" height="200%"
                    >
                        <feGaussianBlur stdDeviation="4" result="blur"/>
                        <feMerge>
                            <feMergeNode in="blur"/>
                            <feMergeNode in="SourceGraphic"/>
                        </feMerge>
                    </filter>
                </defs>

                ${grid.join("")}

                <path d="${areaPath}" fill="url(#actSalesAreaGradient)"/>

                <path
                    d="${linePath}"
                    fill="none"
                    stroke="#20B9FF"
                    stroke-width="3.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    filter="url(#actSalesGlow)"
                />

                ${points.map(point => `
                    <circle
                        cx="${point.x}"
                        cy="${point.y}"
                        r="7"
                        fill="#20B9FF"
                        opacity=".18"
                    />

                    <circle
                        cx="${point.x}"
                        cy="${point.y}"
                        r="3.5"
                        fill="#FFFFFF"
                        stroke="#20B9FF"
                        stroke-width="2"
                    >
                        <title>
                            ${point.date.toLocaleDateString("ar-EG")}
                            — ${money(point.value)} جنيه
                        </title>
                    </circle>
                `).join("")}
            </svg>
        `;

        const step = Math.max(1, Math.ceil(daily.length / 7));

        axis.innerHTML = daily
            .filter((day, index) =>
                index % step === 0 ||
                index === daily.length - 1
            )
            .map(day => `
                <span>
                    ${day.date.toLocaleDateString("ar-EG", {
                        day: "numeric",
                        month: "short"
                    })}
                </span>
            `)
            .join("");
    }

    function drawComparison(
        sales,
        purchases,
        previousSales,
        previousPurchases
    ) {
        const chart = $("act-sales-purchases-chart");
        if (!chart) return;

        const max = Math.max(
            sales,
            purchases,
            previousSales,
            previousPurchases,
            1
        );

        const bars = [
            {
                label: "المبيعات الحالية",
                value: sales,
                cls: "act-bar-sales"
            },
            {
                label: "المبيعات السابقة",
                value: previousSales,
                cls: "act-bar-sales act-bar-muted"
            },
            {
                label: "المشتريات الحالية",
                value: purchases,
                cls: "act-bar-purchases"
            },
            {
                label: "المشتريات السابقة",
                value: previousPurchases,
                cls: "act-bar-purchases act-bar-muted"
            }
        ];

        chart.innerHTML = bars.map(bar => `
            <div class="act-bar-row">
                <div class="act-bar-label">
                    <span>${bar.label}</span>
                    <strong>${money(bar.value)} ج.م</strong>
                </div>

                <div class="act-bar-track">
                    <span
                        class="${bar.cls}"
                        style="width:${Math.max(0, bar.value / max * 100)}%"
                    ></span>
                </div>
            </div>
        `).join("");
    }

    function render() {
        const now = new Date();

        const end = new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate() + 1
        );

        const start = new Date(end);
        start.setDate(start.getDate() - period);

        const previousStart = new Date(start);
        previousStart.setDate(previousStart.getDate() - period);

        const sales = getSales();

        const uid =
            typeof currentUser !== "undefined" && currentUser && currentUser.uid
                ? currentUser.uid
                : "guest";

        const purchasesKey = typeof getUserKey === "function"
            ? getUserKey("independentPurchases")
            : "actPhoneManager_independentPurchases_" + uid;
        const purchases = readArray(purchasesKey);
        const devices = getDevices();

        const currentSales = sales.filter(item =>
            inRange(item, start, end)
        );

        const currentPurchases = purchases.filter(item =>
            inRange(item, start, end)
        );

        const previousSalesItems = sales.filter(item =>
            inRange(item, previousStart, start)
        );

        const previousPurchaseItems = purchases.filter(item =>
            inRange(item, previousStart, start)
        );

        const salesTotal = sum(currentSales);
        const purchasesTotal = sum(currentPurchases);

        const previousSalesTotal = sum(previousSalesItems);
        const previousPurchasesTotal = sum(previousPurchaseItems);

        setText("act-kpi-sales-value", money(salesTotal));
        setText("act-kpi-purchases-value", money(purchasesTotal));
        setText("act-kpi-net-value", money(salesTotal - purchasesTotal));

        setText(
            "act-kpi-count-value",
            currentSales.length.toLocaleString("ar-EG")
        );

        const saleDevices = devices.filter(item => {
            const status = String(item.status || "").trim();
            return status === "البيع" || item.section === "sale" ||
                item.category === "sale" || item.category === "بيع";
        });
        const inventoryValue = saleDevices.reduce((total, item) =>
            total + numeric(item.price || item.salePrice || item.sellingPrice || 0), 0
        );
        setText("act-kpi-inventory-value", money(inventoryValue));
        setText("act-kpi-inventory-count", saleDevices.length.toLocaleString("ar-EG") + " جهاز مسجل للبيع");

        setText("act-kpi-period-label", "آخر " + period + " أيام");

        changeText("act-kpi-sales-change", salesTotal, previousSalesTotal);
        changeText("act-kpi-purchases-change", purchasesTotal, previousPurchasesTotal);

        changeText(
            "act-kpi-count-change",
            currentSales.length,
            previousSalesItems.length
        );

        const netProgress = $("act-kpi-net-progress");

        if (netProgress) {
            const ratio = salesTotal > 0
                ? Math.max(
                    0,
                    Math.min(
                        100,
                        (salesTotal - purchasesTotal) / salesTotal * 100
                    )
                )
                : 0;

            netProgress.style.width = ratio + "%";
        }

        setText(
            "act-kpi-net-note",
            salesTotal >= purchasesTotal
                ? "المبيعات أعلى من المشتريات"
                : "المشتريات أعلى من المبيعات"
        );

        const daily = [];

        for (let i = 0; i < period; i++) {
            const dayStart = new Date(start);
            dayStart.setDate(start.getDate() + i);

            const dayEnd = new Date(dayStart);
            dayEnd.setDate(dayEnd.getDate() + 1);

            daily.push({
                date: dayStart,
                sales: sum(
                    currentSales.filter(item =>
                        inRange(item, dayStart, dayEnd)
                    )
                )
            });
        }

        drawLine(daily);

        drawComparison(
            salesTotal,
            purchasesTotal,
            previousSalesTotal,
            previousPurchasesTotal
        );
    }

    document.querySelectorAll("[data-act-period]")
        .forEach(button => {
            button.addEventListener("click", function () {
                period = Number(this.dataset.actPeriod) || 7;

                document.querySelectorAll("[data-act-period]")
                    .forEach(item => {
                        item.classList.toggle("is-active", item === this);
                    });

                render();
            });
        });

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", render);
    } else {
        render();
    }

    window.addEventListener("storage", render);
    window.addEventListener("focus", render);
    window.addEventListener("act-user-data-ready", render);
    window.addEventListener("act-sales-data-updated", render);
    window.addEventListener("act-purchases-data-updated", render);

    setInterval(render, 10000);

})();

/* =====================================================
   ACT BUSINESS INTELLIGENCE — KPI SHORTCUT ARROWS
===================================================== */
(function(){
  document.querySelectorAll('[data-act-kpi-link]').forEach(button=>button.addEventListener('click',()=>{
    const target=button.dataset.actKpiLink;
    if(target==='sales'){document.getElementById('nav-sales')?.click();return;}
    if(target==='purchases'){document.getElementById('nav-purchases')?.click();return;}
    if(target==='reports'){document.getElementById('more-section')?.style.setProperty('display','block');document.getElementById('nav-more')?.click();document.getElementById('more-reports')?.click();}
  }));
})();

/* ==========================================
   ACT TOP PROFILE — EXISTING ACCOUNT DATA
========================================== */

(function initTopProfileMenu() {
    const profile = document.getElementById("top-profile");
    const toggle = document.getElementById("top-profile-toggle");
    const dropdown = document.getElementById("top-profile-dropdown");

    if (!profile || !toggle || !dropdown) return;

    const topPhoto = document.getElementById("top-profile-photo");
    const topName = document.getElementById("top-profile-name");
    const menuName = document.getElementById("top-profile-menu-name");
    const menuEmail = document.getElementById("top-profile-menu-email");

    function syncProfile() {
        const sourcePhoto = document.getElementById("account-photo-preview");
        const sourceName = document.getElementById("account-display-name");
        const sourceEmail = document.getElementById("account-display-email");

        if (sourcePhoto && sourcePhoto.src) {
            topPhoto.src = sourcePhoto.src;
        }

        const name = sourceName?.textContent?.trim() || "اسم المستخدم";
        const email = sourceEmail?.textContent?.trim() || "";

        topName.textContent = name;
        menuName.textContent = name;
        menuEmail.textContent = email;
    }

    function closeMenu() {
        dropdown.hidden = true;
        toggle.setAttribute("aria-expanded", "false");
    }

    toggle.addEventListener("click", function (event) {
        event.stopPropagation();
        syncProfile();

        dropdown.hidden = !dropdown.hidden;

        toggle.setAttribute(
            "aria-expanded",
            String(!dropdown.hidden)
        );
    });

    dropdown.addEventListener("click", function (event) {
        event.stopPropagation();

        const action = event.target.closest("[data-top-profile-action]");
        if (!action) return;

        closeMenu();

        if (action.dataset.topProfileAction === "account") {
            const accountButton = document.getElementById("nav-account");
            if (accountButton) accountButton.click();
        }

        if (action.dataset.topProfileAction === "logout") {
            const logoutButton = document.getElementById("account-logout-button");

            if (logoutButton) {
                logoutButton.click();
            } else {
                console.error("Account logout button was not found.");
            }
        }
    });

    document.addEventListener("click", function (event) {
        if (!profile.contains(event.target)) closeMenu();
    });

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") closeMenu();
    });

    syncProfile();

    const accountSection = document.getElementById("account-section");

    if (accountSection) {
        const observer = new MutationObserver(syncProfile);

        observer.observe(accountSection, {
            subtree: true,
            childList: true,
            characterData: true,
            attributes: true
        });
    }
})();


document.documentElement.classList.toggle(
    "android-device",
    /Android/i.test(navigator.userAgent)
);

/* =========================================================
   ACT MANAGER — GLOBAL SMART SEARCH
   بحث شامل في الأقسام والبيانات والسجلات
   يوضع في نهاية ملف script.js
========================================================= */

(function ACTGlobalSearch() {
    "use strict";

    if (window.actGlobalSearchReady) return;
    window.actGlobalSearchReady = true;

    const input = document.getElementById("act-nav-search");
    const searchBox = input
        ? input.closest(".act-nav-search")
        : null;

    if (!input || !searchBox) {
        console.warn("ACT Global Search: search input not found.");
        return;
    }

    /* =========================================
       إنشاء قائمة النتائج
    ========================================= */

    const resultsBox = document.createElement("div");
    resultsBox.id = "act-global-search-results";
    resultsBox.setAttribute("role", "listbox");
    resultsBox.setAttribute("aria-label", "نتائج البحث");

    Object.assign(resultsBox.style, {
        position: "absolute",
        top: "calc(100% + 10px)",
        right: "0",
        left: "0",
        zIndex: "999999",
        display: "none",
        maxHeight: "min(65vh, 480px)",
        overflowY: "auto",
        padding: "8px",
        borderRadius: "14px",
        border: "1px solid rgba(55, 170, 255, .28)",
        background: "#081321",
        boxShadow: "0 15px 45px rgba(0,0,0,.45)",
        color: "#eef7ff",
        textAlign: "right",
        direction: "rtl"
    });

    if (getComputedStyle(searchBox).position === "static") {
        searchBox.style.position = "relative";
    }

    searchBox.appendChild(resultsBox);

    const style = document.createElement("style");
    style.textContent = `
        #act-global-search-results .act-search-result {
            width: 100%;
            display: flex;
            align-items: center;
            gap: 11px;
            padding: 11px 12px;
            margin: 3px 0;
            border: 1px solid transparent;
            border-radius: 10px;
            background: transparent;
            color: #eef7ff;
            text-align: right;
            cursor: pointer;
            font: inherit;
        }

        #act-global-search-results .act-search-result:hover,
        #act-global-search-results .act-search-result:focus {
            outline: none;
            background: rgba(30, 145, 255, .15);
            border-color: rgba(55, 170, 255, .3);
        }

        #act-global-search-results .act-search-icon {
            width: 35px;
            height: 35px;
            flex: 0 0 35px;
            display: grid;
            place-items: center;
            border-radius: 10px;
            background: rgba(32, 170, 255, .13);
            font-size: 17px;
        }

        #act-global-search-results .act-search-text {
            min-width: 0;
            flex: 1;
        }

        #act-global-search-results .act-search-title {
            display: block;
            font-size: 13px;
            font-weight: 700;
            overflow-wrap: anywhere;
        }

        #act-global-search-results .act-search-detail {
            display: block;
            margin-top: 4px;
            color: #91a9c2;
            font-size: 11px;
            overflow-wrap: anywhere;
        }

        #act-global-search-results .act-search-empty {
            padding: 18px 10px;
            text-align: center;
            color: #9eb2c8;
            font-size: 13px;
        }

        #act-global-search-results .act-search-heading {
            padding: 8px 10px 5px;
            color: #42baff;
            font-size: 11px;
            font-weight: 800;
        }

        @media(max-width:700px) {
            #act-global-search-results {
                position: fixed !important;
                top: 78px !important;
                right: 10px !important;
                left: 10px !important;
                width: auto !important;
                max-height: 65vh !important;
            }
        }
    `;

    document.head.appendChild(style);

    /* =========================================
       أدوات عامة
    ========================================= */

    function getCurrentUid() {
        try {
            if (
                typeof currentUser !== "undefined" &&
                currentUser &&
                currentUser.uid
            ) {
                return currentUser.uid;
            }
        } catch (error) {}

        try {
            if (
                typeof auth !== "undefined" &&
                auth &&
                auth.currentUser &&
                auth.currentUser.uid
            ) {
                return auth.currentUser.uid;
            }
        } catch (error) {}

        return "guest";
    }

    function normalize(value) {
        return String(value == null ? "" : value)
            .toLocaleLowerCase("ar")
            .replace(/[أإآ]/g, "ا")
            .replace(/ة/g, "ه")
            .replace(/ى/g, "ي")
            .replace(/[ًٌٍَُِّْـ]/g, "")
            .trim();
    }

    function escapeHTML(value) {
        return String(value == null ? "" : value).replace(
            /[&<>"']/g,
            function (character) {
                return {
                    "&": "&amp;",
                    "<": "&lt;",
                    ">": "&gt;",
                    '"': "&quot;",
                    "'": "&#39;"
                }[character];
            }
        );
    }

    function getObjectText(value, depth) {
        depth = depth || 0;

        if (depth > 4 || value == null) return "";

        if (
            typeof value === "string" ||
            typeof value === "number"
        ) {
            return String(value);
        }

        if (Array.isArray(value)) {
            return value.map(item =>
                getObjectText(item, depth + 1)
            ).join(" ");
        }

        if (typeof value === "object") {
            return Object.entries(value)
                .map(([key, item]) => {
                    if (
                        typeof item === "function" ||
                        item == null
                    ) {
                        return "";
                    }

                    return key + " " + getObjectText(item, depth + 1);
                })
                .join(" ");
        }

        return "";
    }

    function getRecordTitle(record) {
        if (!record || typeof record !== "object") {
            return String(record || "سجل");
        }

        const fields = [
            "name",
            "customerName",
            "productName",
            "product",
            "phoneName",
            "deviceName",
            "title",
            "supplier",
            "sellerName",
            "employeeName",
            "fullName",
            "account",
            "service",
            "operationName",
            "invoiceNumber",
            "serial",
            "id"
        ];

        for (const field of fields) {
            if (
                record[field] !== undefined &&
                record[field] !== null &&
                String(record[field]).trim()
            ) {
                return String(record[field]);
            }
        }

        return "سجل محفوظ";
    }

    function getRecordDetail(record) {
        if (!record || typeof record !== "object") return "";

        const fields = [
            "customerPhone",
            "sellerPhone",
            "phone",
            "serial",
            "date",
            "statusName",
            "section",
            "job",
            "category",
            "notes",
            "amount",
            "total",
            "price"
        ];

        return fields
            .filter(field =>
                record[field] !== undefined &&
                record[field] !== null &&
                String(record[field]).trim()
            )
            .slice(0, 4)
            .map(field => String(record[field]))
            .join(" • ");
    }

    /* =========================================
       تحديد القسم المرتبط بكل نتيجة
    ========================================= */

    function getDestination(key, record) {
        const source = normalize(key);

        if (source.includes("account_profile")) {
            return {
                button: "nav-account",
                section: "account-section"
            };
        }

        if (source.includes("accessories")) {
            return { button: "nav-more", section: "accessories-section", target: "more-accessories" };
        }
        if (source.includes("settings")) {
            return { button: "nav-more", section: "settings-section", target: "more-settings" };
        }

        if (source.includes("general-reports") || source.includes("reports")) {
            return { button: "nav-more", section: "general-reports-section", target: "more-reports" };
        }

        if (source.includes("notifications")) {
            return {
                button: "nav-more",
                section: "more-section",
                target: "notification-bell-button"
            };
        }

        if (source.includes("wallet")) {
            return {
                button: "nav-more",
                section: "wallet-section"
            };
        }

        if (source.includes("employee")) {
            return {
                button: "nav-more",
                section: "employees-section"
            };
        }

        if (source.includes("independentpurchases")) {
            return {
                button: "nav-purchases",
                section: "independent-purchases-section"
            };
        }

        if (
            source.includes("phonepurchases") ||
            source.includes("purchases")
        ) {
            return {
                button: "nav-purchases",
                section: "independent-purchases-section"
            };
        }

        if (source.includes("returns")) {
            return {
                button: "nav-sales",
                section: "independent-sales-section",
                target: "sales-view-returns"
            };
        }

        if (source.includes("sales")) {
            return {
                button: "nav-sales",
                section: "independent-sales-section",
                target: "sales-view-history"
            };
        }

        if (source.includes("devices")) {
            return {
                button: "nav-devices",
                section: "customers-section"
            };
        }

        if (source.includes("dashboard")) {
            return {
                button: "nav-home",
                section: "home-section"
            };
        }

        if (source.includes("dayclose")) {
            return {
                button: "nav-more",
                section: "day-close-section"
            };
        }

        return {
            button: "nav-home",
            section: "home-section"
        };
    }

    function getSectionDestination(element) {
        const id = element.id || "";
        const text = normalize(
            element.innerText ||
            element.textContent ||
            element.getAttribute("aria-label") ||
            ""
        );

        const section = element.closest(
            "section, [id$='-section'], .section"
        );

        if (id === "nav-home" || id === "nav-devices" ||
            id === "nav-sales" || id === "nav-purchases" ||
            id === "nav-account" || id === "nav-more") {
            return {
                button: id,
                section: element.dataset.section || ""
            };
        }

        if (id.includes("accessories") || text.includes("الاكسسوار")) {
            return { button: "nav-more", section: "accessories-section", target: "more-accessories" };
        }
        if (id.includes("reports") || text.includes("التقارير")) {
            return { button: "nav-more", section: "general-reports-section", target: "more-reports" };
        }
        if (id.includes("settings") || text.includes("الاعدادات")) {
            return { button: "nav-more", section: "settings-section", target: "more-settings" };
        }

        if (
            id.includes("employee") ||
            text.includes("الموظف") ||
            text.includes("العامل")
        ) {
            return {
                button: "nav-more",
                section: "employees-section"
            };
        }

        if (
            id.includes("maintenance") ||
            text.includes("الصيانه") ||
            text.includes("الاصلاح")
        ) {
            return {
                button: "nav-devices",
                section: "customers-section",
                target: id || ""
            };
        }

        if (
            id.includes("wallet") ||
            text.includes("الخزنه") ||
            text.includes("المحفظه")
        ) {
            return {
                button: "nav-more",
                section: "wallet-section"
            };
        }

        if (
            id.includes("day-close") ||
            text.includes("اقفال اليوم")
        ) {
            return {
                button: "nav-more",
                section: "day-close-section"
            };
        }

        if (section && section.id) {
            return {
                button: "nav-home",
                section: section.id
            };
        }

        return {
            button: "nav-home",
            section: "home-section"
        };
    }

    /* =========================================
       قراءة بيانات التخزين الخاصة بالمستخدم
    ========================================= */

    function readStoredRecords() {
        const results = [];
        const uid = getCurrentUid();

        const allowedKeys = [
            "actPhoneManager_devices_" + uid,
            "actPhoneManager_employees_" + uid,
            "actPhoneManager_accessories_" + uid,
            "actPhoneManager_dashboard_operations_" + uid,
            "actPhoneManager_sales_" + uid,
            "actPhoneManager_independentPurchases_" + uid,
            "actPhoneManager_phonePurchases_" + uid,
            "actPhoneManager_returns_" + uid,
            "actPhoneManager_account_profile_" + uid,
            "actPhoneManager_notifications_" + uid,
            "actPhoneManager_wallet_transactions_withdraw_" + uid,
            "actPhoneManager_wallet_transactions_deposit_" + uid,
            "actPhoneManager_wallet_transactions_recharge_" + uid,
            "actPhoneManager_wallet_transactions_bills_" + uid,
            "actPhoneManager_wallet_transactions_transfer_" + uid,
            "actPhoneManager_day_close_archives_" + uid,
            "actPhoneManager_phonePurchases"
        ];

        const keys = new Set(allowedKeys);

        // إضافة مفاتيح ACT الخاصة بالمستخدم الحالي فقط.
        try {
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);

                if (!key || !key.startsWith("actPhoneManager_")) {
                    continue;
                }

                if (
                    key.endsWith("_" + uid) ||
                    key.includes("_" + uid + "_") ||
                    key === "actPhoneManager_phonePurchases"
                ) {
                    keys.add(key);
                }
            }
        } catch (error) {
            console.warn("Search storage scan error:", error);
        }

        keys.forEach(function (key) {
            try {
                const raw = localStorage.getItem(key);
                if (!raw) return;

                const parsed = JSON.parse(raw);
                if (!Array.isArray(parsed)) return;

                parsed.forEach(function (record) {
                    if (!record || typeof record !== "object") return;

                    results.push({
                        kind: "record",
                        key: key,
                        record: record,
                        title: getRecordTitle(record),
                        detail: getRecordDetail(record),
                        searchText: normalize(
                            key + " " + getObjectText(record)
                        ),
                        destination: getDestination(key, record)
                    });
                });
            } catch (error) {
                // نتجاوز المفاتيح غير القابلة للتحليل.
            }
        });

        // البيانات الموجودة في الذاكرة إذا لم تكن موجودة بالتخزين.
        try {
            if (
                typeof devices !== "undefined" &&
                Array.isArray(devices)
            ) {
                devices.forEach(function (record) {
                    results.push({
                        kind: "record",
                        key: "devices",
                        record: record,
                        title: getRecordTitle(record),
                        detail: getRecordDetail(record),
                        searchText: normalize(getObjectText(record)),
                        destination: {
                            button: "nav-devices",
                            section: "customers-section"
                        }
                    });
                });
            }
        } catch (error) {}

        try {
            if (
                typeof employees !== "undefined" &&
                Array.isArray(employees)
            ) {
                employees.forEach(function (record) {
                    results.push({
                        kind: "record",
                        key: "employees",
                        record: record,
                        title: getRecordTitle(record),
                        detail: getRecordDetail(record),
                        searchText: normalize(getObjectText(record)),
                        destination: {
                            button: "nav-more",
                            section: "employees-section"
                        }
                    });
                });
            }
        } catch (error) {}

        return results;
    }

    /* =========================================
       البحث في عناصر الواجهة والأقسام
    ========================================= */

    function readInterfaceItems() {
        const results = [];

        const elements = document.querySelectorAll(
            [
                ".bottom-nav-button",
                ".act-mobile-menu-toggle",
                ".act-mobile-menu-popup button",
                ".sections-buttons button",
                ".sections-buttons a",
                "button[data-section]",
                "button[data-target]",
                "[data-sales-view]",
                "[data-purchase-category]",
                ".independent-sales-card",
                ".maintenance-buttons button",
                ".employee-buttons button",
                "#more-section button",
                "#more-section a",
                "#home-section button",
                "#home-section a",
                "#customers-section button",
                "#employees-section button",
                "#wallet-section button",
                "#day-close-section button"
            ].join(",")
        );

        elements.forEach(function (element) {
            if (
                element === input ||
                element.closest("#act-global-search-results")
            ) {
                return;
            }

            const label = (
                element.innerText ||
                element.textContent ||
                element.getAttribute("aria-label") ||
                element.title ||
                ""
            ).trim();

            if (!label || label.length > 180) return;

            const destination = getSectionDestination(element);

            results.push({
                kind: "interface",
                title: label,
                detail: "قسم أو زر داخل البرنامج",
                searchText: normalize(
                    label + " " +
                    element.id + " " +
                    element.className + " " +
                    element.getAttribute("aria-label")
                ),
                element: element,
                destination: destination
            });
        });

        // الأقسام الرئيسية نفسها.
        const sections = document.querySelectorAll(
            [
                "#home-section",
                "#sales-section",
                "#independent-sales-section",
                "#independent-purchases-section",
                "#customers-section",
                "#employees-section",
                "#wallet-section",
                "#day-close-section",
                "#account-section",
                "#more-section",
                "#attendance-section",
                "#salaries-section",
                "#employee-statistics-section",
                "#phone-sale-section",
                "#phone-purchases-section"
            ].join(",")
        );

        sections.forEach(function (section) {
            const heading = section.querySelector(
                "h1, h2, h3, .section-title, .section-header"
            );

            const label = (
                heading?.innerText ||
                section.getAttribute("aria-label") ||
                section.id
            ).trim();

            if (!label) return;

            results.push({
                kind: "section",
                title: label,
                detail: "قسم في البرنامج",
                searchText: normalize(label + " " + section.id),
                destination: getSectionDestination(section)
            });
        });

        return results;
    }

    /* =========================================
       فتح القسم المطلوب
    ========================================= */

    function clickButton(id) {
        const button = document.getElementById(id);

        if (!button) return false;

        button.click();
        return true;
    }

    function findMatchingVisibleRecord(record) {
        const possibleIds = [
            record?.id,
            record?.serial,
            record?.invoiceNumber
        ].filter(Boolean).map(String);

        if (possibleIds.length) {
            for (const id of possibleIds) {
                const selectors = [
                    `[data-id="${CSS.escape(id)}"]`,
                    `[data-device-id="${CSS.escape(id)}"]`,
                    `[data-employee-id="${CSS.escape(id)}"]`,
                    `[data-purchase-id="${CSS.escape(id)}"]`,
                    `[data-sale-id="${CSS.escape(id)}"]`
                ];

                for (const selector of selectors) {
                    try {
                        const element = document.querySelector(selector);

                        if (element) return element;
                    } catch (error) {}
                }
            }
        }

        const title = normalize(getRecordTitle(record));

        if (!title || title === "سجل محفوظ") return null;

        const candidates = document.querySelectorAll(
            [
                ".device-card",
                ".maintenance-card",
                ".employee-card",
                ".sale-record",
                ".ind-purchase-record",
                ".phone-purchase-card",
                ".wallet-transaction",
                "tr"
            ].join(",")
        );

        for (const element of candidates) {
            if (
                normalize(element.innerText || "")
                    .includes(title)
            ) {
                return element;
            }
        }

        return null;
    }

    function navigateToResult(result) {
        closeResults();

        const destination = result.destination || {};
        const buttonId = destination.button;
        const sectionId = destination.section;

        if (buttonId) {
            clickButton(buttonId);
        }

        // فتح العرض الفرعي للمبيعات عند الحاجة.
        if (destination.target) {
            const target = document.getElementById(destination.target);

            if (target) {
                if (
                    target.classList.contains("independent-sales-card")
                ) {
                    target.click();
                } else if (
                    target.id === "notification-bell-button"
                ) {
                    target.click();
                }
            }
        }

        // فتح قسم فرعي معروف بعد تنفيذ التنقل الرئيسي.
        if (sectionId) {
            // Search navigation must open one destination only, not leave the previous module visible.
            document.querySelectorAll(".act-extra-section, #day-close-section, #home-section, .sales-area, #customers-section, #employees-section, #more-section, #independent-sales-section, #independent-purchases-section, #wallet-section, #account-section").forEach(function (peer) {
                if (peer.id !== sectionId && !peer.contains(document.getElementById(sectionId))) peer.style.display = "none";
            });
            const section = document.getElementById(sectionId);

            if (section) {
                const hidden = section.hidden ||
                    getComputedStyle(section).display === "none";

                if (hidden && !destination.target) {
                    section.hidden = false;
                    section.style.display = "";
                }

                section.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        }

        if (result.kind === "interface" && result.element) {
            const element = result.element;

            if (element.isConnected) {
                element.click();

                setTimeout(function () {
                    element.scrollIntoView({
                        behavior: "smooth",
                        block: "center"
                    });
                }, 150);

                return;
            }
        }

        if (result.kind === "record" && result.record) {
            setTimeout(function () {
                const element = findMatchingVisibleRecord(result.record);

                if (element) {
                    element.scrollIntoView({
                        behavior: "smooth",
                        block: "center"
                    });

                    element.style.outline =
                        "2px solid #20baff";

                    element.style.outlineOffset = "4px";

                    setTimeout(function () {
                        element.style.outline = "";
                        element.style.outlineOffset = "";
                    }, 2200);
                }
            }, 350);
        }
    }

    /* =========================================
       عرض النتائج
    ========================================= */

    function closeResults() {
        resultsBox.style.display = "none";
        input.setAttribute("aria-expanded", "false");
    }

    function showResults() {
        resultsBox.style.display = "block";
        input.setAttribute("aria-expanded", "true");
    }

    function renderResults(query) {
        const normalizedQuery = normalize(query);

        resultsBox.innerHTML = "";

        if (normalizedQuery.length < 2) {
            closeResults();
            return;
        }

        const interfaceItems = readInterfaceItems();
        const dataItems = readStoredRecords();

        const allItems = interfaceItems.concat(dataItems);

        const matches = [];
        const seen = new Set();

        allItems.forEach(function (item) {
            if (!item.searchText.includes(normalizedQuery)) {
                return;
            }

            const identity = [
                item.kind,
                item.title,
                item.detail,
                item.key || ""
            ].join("|");

            if (seen.has(identity)) return;

            seen.add(identity);
            matches.push(item);
        });

        // إظهار نتائج الواجهة أولاً ثم السجلات.
        matches.sort(function (a, b) {
            if (a.kind === b.kind) return 0;
            return a.kind === "interface" ? -1 : 1;
        });

        const limited = matches.slice(0, 35);

        if (!limited.length) {
            resultsBox.innerHTML = `
                <div class="act-search-empty">
                    <div style="font-size:24px;margin-bottom:8px;">🔎</div>
                    لا توجد نتائج مطابقة لـ
                    <strong>${escapeHTML(query)}</strong>
                </div>
            `;

            showResults();
            return;
        }

        let lastGroup = "";

        limited.forEach(function (item, index) {
            const group = item.kind === "record"
                ? "السجلات والبيانات"
                : "الأقسام والأزرار";

            if (group !== lastGroup) {
                const heading = document.createElement("div");
                heading.className = "act-search-heading";
                heading.textContent = group;
                resultsBox.appendChild(heading);
                lastGroup = group;
            }

            const button = document.createElement("button");
            button.type = "button";
            button.className = "act-search-result";
            button.setAttribute("role", "option");

            const icon = item.kind === "record"
                ? "📄"
                : item.kind === "section"
                    ? "📂"
                    : "🔹";

            button.innerHTML = `
                <span class="act-search-icon">${icon}</span>

                <span class="act-search-text">
                    <span class="act-search-title">
                        ${escapeHTML(item.title)}
                    </span>

                    <span class="act-search-detail">
                        ${escapeHTML(item.detail || "نتيجة بحث")}
                    </span>
                </span>

                <span style="color:#55bdff;font-size:17px;">‹</span>
            `;

            button.addEventListener("click", function () {
                navigateToResult(item);
                input.value = "";
            });

            resultsBox.appendChild(button);
        });

        const footer = document.createElement("div");
        footer.className = "act-search-empty";
        footer.textContent =
            "عدد النتائج: " + matches.length.toLocaleString("ar-EG");

        resultsBox.appendChild(footer);

        showResults();
    }

    /* =========================================
       تشغيل البحث والتفاعل
    ========================================= */

    input.setAttribute("autocomplete", "off");
    input.setAttribute("aria-haspopup", "listbox");
    input.setAttribute("aria-expanded", "false");

    input.addEventListener("input", function () {
        renderResults(this.value);
    });

    input.addEventListener("focus", function () {
        if (this.value.trim().length >= 2) {
            renderResults(this.value);
        }
    });

    input.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            closeResults();
            input.blur();
            return;
        }

        if (event.key === "Enter") {
            const firstResult = resultsBox.querySelector(
                ".act-search-result"
            );

            if (firstResult) {
                event.preventDefault();
                firstResult.click();
            }
        }

        if (event.key === "ArrowDown") {
            const firstResult = resultsBox.querySelector(
                ".act-search-result"
            );

            if (firstResult) {
                event.preventDefault();
                firstResult.focus();
            }
        }
    });

    resultsBox.addEventListener("keydown", function (event) {
        const buttons = Array.from(
            resultsBox.querySelectorAll(".act-search-result")
        );

        const currentIndex = buttons.indexOf(document.activeElement);

        if (event.key === "ArrowDown") {
            event.preventDefault();

            const next = buttons[currentIndex + 1] || buttons[0];
            if (next) next.focus();
        }

        if (event.key === "ArrowUp") {
            event.preventDefault();

            if (currentIndex <= 0) {
                input.focus();
            } else {
                buttons[currentIndex - 1].focus();
            }
        }

        if (event.key === "Escape") {
            closeResults();
            input.focus();
        }
    });

    document.addEventListener("click", function (event) {
        if (
            !searchBox.contains(event.target) &&
            !resultsBox.contains(event.target)
        ) {
            closeResults();
        }
    });

    // إعادة تحميل النتائج عند تغيير الحساب.
    window.addEventListener("focus", function () {
        if (input.value.trim().length >= 2) {
            renderResults(input.value);
        }
    });

    console.log("ACT Global Search initialized successfully.");

})();
// =================================================
// SHOP NOTIFICATIONS MODAL — ALL DEVICES
// =================================================

(function () {

    const toggle = document.getElementById("shop-notifications-toggle");
    const modal = document.getElementById("shop-notifications-modal");
    const closeButton = document.getElementById("shop-notifications-modal-close");
    const modalList = document.getElementById("shop-notifications-modal-list");

    if (!toggle || !modal || !closeButton || !modalList) {
        return;
    }

    function openShopNotifications() {

        // تحديث جميع التنبيهات قبل فتح النافذة
        if (typeof renderShopNotifications === "function") {
            renderShopNotifications();
        }

        // قراءة جميع أجهزة الصيانة مباشرة
        const allDevices = Array.isArray(devices) ? devices : [];

        const statusMap = {
            "قيد الإصلاح": SECTIONS.PENDING,
            "جاهز": SECTIONS.READY,
            "لم يتم الإصلاح": SECTIONS.FAILED,
            "تم التسليم": SECTIONS.DELIVERED
        };

        const statusDetails = {
            [SECTIONS.PENDING]: {
                icon: "🟡",
                label: "قيد الإصلاح"
            },
            [SECTIONS.READY]: {
                icon: "🟢",
                label: "جاهز للتسليم"
            },
            [SECTIONS.FAILED]: {
                icon: "🔴",
                label: "لم يتم الإصلاح"
            }
        };

        const escapeHTML = value =>
            String(value ?? "").replace(/[&<>"']/g, char => ({
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#39;"
            })[char]);

        // استخراج كل الأجهزة التي تحتاج متابعة
        const dismissedIds = typeof getDismissedShopNotifications === "function" ? getDismissedShopNotifications() : [];
        const maintenanceDevices = allDevices.filter(device => {

            const category =
                device.category ||
                statusMap[device.status] ||
                null;

            const notificationId = String(device.id || (device.phoneName + "_" + (device.customerName || "")));
            if (dismissedIds.includes(notificationId)) return false;
            return (
                (
                    device.section === "maintenance" ||
                    [
                        SECTIONS.PENDING,
                        SECTIONS.READY,
                        SECTIONS.FAILED,
                        SECTIONS.DELIVERED
                    ].includes(category)
                ) &&
                [
                    SECTIONS.PENDING,
                    SECTIONS.READY,
                    SECTIONS.FAILED
                ].includes(category)
            );

        });

        // إنشاء إشعار مستقل لكل جهاز
        if (maintenanceDevices.length) {

            modalList.innerHTML = maintenanceDevices.map(device => {

                const category =
                    device.category ||
                    statusMap[device.status];

                const info = statusDetails[category];

                if (!info) return "";

                return `
                    <div
                        class="premium-notification-item"
                        data-shop-notification="${escapeHTML(device.id || "")}"
                    >

                        <span class="notification-icon">
                            ${info.icon}
                        </span>

                        <div class="notification-content">

                            <strong>
                                ${escapeHTML(device.phoneName || "جهاز بدون اسم")}
                            </strong>

                            <small>
                                ${info.label}
                                · العميل:
                                ${escapeHTML(device.customerName || "غير محدد")}
                            </small>

                        </div>
                        <button type="button" class="shop-notification-dismiss" data-dismiss-shop-notification="${escapeHTML(device.id || (device.phoneName + "_" + (device.customerName || "")))}" aria-label="حذف التنبيه" title="حذف التنبيه">✕</button>

                    </div>
                `;

            }).join("");

        } else {

            modalList.innerHTML = `
                <div class="premium-notification-empty">
                    <span>✓</span>
                    <strong>المحل يعمل بشكل طبيعي</strong>
                    <small>لا توجد تنبيهات حالياً</small>
                </div>
            `;

        }

        modal.hidden = false;
        toggle.setAttribute("aria-expanded", "true");

        closeButton.focus();
    }

    function closeShopNotifications() {

        modal.hidden = true;

        toggle.setAttribute("aria-expanded", "false");

        toggle.focus();
    }

    toggle.addEventListener("click", function (event) {

        event.preventDefault();

        openShopNotifications();
    });

    closeButton.addEventListener("click", closeShopNotifications);
    modalList.addEventListener("click", function(event) {
        const button = event.target.closest("[data-dismiss-shop-notification]");
        if (!button) return;
        event.preventDefault(); event.stopPropagation();
        if (typeof dismissShopNotification === "function") dismissShopNotification(button.dataset.dismissShopNotification);
        openShopNotifications();
    });
    window.addEventListener("act-shop-notifications-updated", () => { if (!modal.hidden) openShopNotifications(); });

    modal.addEventListener("click", function (event) {

        if (event.target === modal) {
            closeShopNotifications();
        }

    });

    document.addEventListener("keydown", function (event) {

        if (event.key === "Escape" && !modal.hidden) {
            closeShopNotifications();
        }

    });

})();

/* =================================================
   DASHBOARD OPERATIONS MODAL
================================================= */

(function () {

    const toggle = document.getElementById("dashboard-operations-toggle");
    const modal = document.getElementById("dashboard-operations-modal");
    const closeButton = document.getElementById("dashboard-operations-modal-close");

    const originalList = document.getElementById("dashboard-latest-operations");
    const modalList = document.getElementById("dashboard-operations-modal-list");

    if (!toggle || !modal || !closeButton || !originalList || !modalList) {
        return;
    }

    function openOperationsModal() {

        modalList.replaceChildren(
            ...Array.from(originalList.children).map(item => item.cloneNode(true))
        );

        modal.hidden = false;
        toggle.setAttribute("aria-expanded", "true");

        closeButton.focus();
    }

    function closeOperationsModal() {
        modal.hidden = true;
        toggle.setAttribute("aria-expanded", "false");
        toggle.focus();
    }

    toggle.addEventListener("click", function (event) {
        event.preventDefault();
        openOperationsModal();
    });

    closeButton.addEventListener("click", closeOperationsModal);

    modal.addEventListener("click", function (event) {
        if (event.target === modal) {
            closeOperationsModal();
        }
    });

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape" && !modal.hidden) {
            closeOperationsModal();
        }
    });

})();


/* =====================================================
   ACT MANAGER — MOBILE NAVIGATION CONTROLS
===================================================== */

(function initActMobileControls() {
    "use strict";

    const navigation = document.getElementById("bottom-navigation");

    if (!navigation || navigation.dataset.mobileControlsReady === "true") {
        return;
    }

    const menuToggle = document.getElementById("mobile-nav-menu-toggle");
    const menu = document.getElementById("mobile-nav-menu");

    const searchToggle = document.getElementById("mobile-search-toggle");
    const searchInput = document.getElementById("act-nav-search");
    const searchBox = searchInput?.closest(".act-nav-search");

    const logoutButton = document.getElementById("mobile-nav-logout");
    const existingLogout = document.getElementById("account-logout-button");

    const links = navigation.querySelector(".act-nav-links");


    /* =====================================
       1. إغلاق وفتح قائمة الأقسام
    ===================================== */

    function closeMobileMenu() {
        if (!menu || !menuToggle) return;

        menu.hidden = true;
        menuToggle.setAttribute("aria-expanded", "false");
    }

    function openMobileMenu() {
        if (!menu || !menuToggle) return;

        menu.hidden = false;
        menuToggle.setAttribute("aria-expanded", "true");
    }


    /* =====================================
       2. إغلاق البحث
    ===================================== */

    function closeMobileSearch() {
        if (!searchBox) return;

        searchBox.classList.remove("mobile-search-open");
    }


    /* =====================================
       3. إنشاء قائمة الأقسام
       الرئيسية أول عنصر داخل ☰
    ===================================== */

    if (menuToggle && menu && links) {

        const originalButtons = Array.from(
            links.querySelectorAll(".bottom-nav-button")
        );

        menu.replaceChildren();

        originalButtons.forEach(originalButton => {

            const item = document.createElement("button");

            item.type = "button";
            item.className = "mobile-nav-menu-item";

            // نسخ محتوى الزر الأصلي
            item.innerHTML = originalButton.innerHTML;

            // تمييز الرئيسية داخل القائمة
            if (originalButton.id === "nav-home") {
                item.classList.add("mobile-menu-home-item");
            }

            // تحسين وضوح الأيقونات
            item.querySelectorAll("i, svg, .icon, img").forEach(icon => {

                icon.style.setProperty("opacity", "1", "important");
                icon.style.setProperty("visibility", "visible", "important");
                icon.style.setProperty("filter", "none", "important");
                icon.style.setProperty("flex-shrink", "0", "important");

                if (icon.tagName.toLowerCase() === "svg") {
                    icon.style.setProperty("width", "23px", "important");
                    icon.style.setProperty("height", "23px", "important");
                    icon.style.setProperty("stroke", "#42baff", "important");
                    icon.style.setProperty("stroke-width", "2.2", "important");
                }

                if (icon.tagName.toLowerCase() === "i") {
                    icon.style.setProperty("font-size", "22px", "important");
                    icon.style.setProperty("color", "#42baff", "important");
                }

                if (icon.tagName.toLowerCase() === "img") {
                    icon.style.setProperty("width", "23px", "important");
                    icon.style.setProperty("height", "23px", "important");
                    icon.style.setProperty("object-fit", "contain", "important");
                }
            });

            // تنسيق عناصر القائمة
            item.style.cssText = [
                "display:flex",
                "align-items:center",
                "gap:12px",
                "width:100%",
                "padding:13px 14px",
                "margin:3px 0",
                "border:0",
                "border-radius:10px",
                "background:transparent",
                "color:#edf4ff",
                "font:inherit",
                "text-align:right",
                "cursor:pointer"
            ].join(";");

            // تشغيل القسم الأصلي عند الضغط
            item.addEventListener("click", function () {
                closeMobileMenu();
                originalButton.click();
            });

            menu.appendChild(item);
        });


        // زر فتح وإغلاق القائمة
        menuToggle.addEventListener("click", function (event) {

            event.preventDefault();
            event.stopPropagation();

            if (menu.hidden) {
                openMobileMenu();
            } else {
                closeMobileMenu();
            }
        });

        menu.addEventListener("click", function (event) {
            event.stopPropagation();
        });

        // إغلاق القائمة عند الضغط خارجها
        document.addEventListener("click", function (event) {

            if (
                !menu.hidden &&
                !menu.contains(event.target) &&
                !menuToggle.contains(event.target)
            ) {
                closeMobileMenu();
            }
        });
    }


    /* =====================================
       4. زر البحث
    ===================================== */

    if (searchToggle && searchBox && searchInput) {

        searchToggle.addEventListener("click", function (event) {

            event.preventDefault();
            event.stopPropagation();

            const isOpen = searchBox.classList.contains(
                "mobile-search-open"
            );

            if (isOpen) {

                closeMobileSearch();
                searchInput.blur();

            } else {

                closeMobileMenu();
                searchBox.classList.add("mobile-search-open");

                setTimeout(function () {
                    searchInput.focus();
                }, 50);
            }
        });

        searchBox.addEventListener("click", function (event) {
            event.stopPropagation();
        });

        document.addEventListener("click", function (event) {

            if (
                searchBox.classList.contains("mobile-search-open") &&
                !searchBox.contains(event.target) &&
                !searchToggle.contains(event.target)
            ) {
                closeMobileSearch();
            }
        });
    }


    /* =====================================
       5. زر تسجيل الخروج
       يستخدم تسجيل الخروج الأصلي
    ===================================== */

    if (logoutButton && existingLogout) {

        logoutButton.addEventListener("click", function (event) {

            event.preventDefault();
            existingLogout.click();
        });
    }


    /* =====================================
       6. إغلاق القوائم بزر Escape
    ===================================== */

    document.addEventListener("keydown", function (event) {

        if (event.key === "Escape") {
            closeMobileMenu();
            closeMobileSearch();
        }
    });


    /* =====================================
       7. إنهاء التهيئة
    ===================================== */

    navigation.dataset.mobileControlsReady = "true";

    console.log("ACT Mobile Navigation initialized.");

})();
// ==========================================
// ACT MANAGER — PWA SERVICE WORKER
// ==========================================

if ("serviceWorker" in navigator) {

    window.addEventListener("load", async () => {

        try {

            const registration =
                await navigator.serviceWorker.register(
                    "./service-worker.js"
                );

            console.log(
                "ACT Manager PWA: Service Worker Registered",
                registration.scope
            );

        } catch (error) {

            console.error(
                "ACT Manager PWA Registration Error:",
                error
            );

        }

    });

}

// ======================================================
// ACT EXTRA MODULES: ACCESSORIES + GENERAL REPORTS
// Local-first storage, cloud sync, stock movements, notifications.
// ======================================================
(function initActExtraModules(){
  "use strict";
  const $ = id => document.getElementById(id);
  const accessoriesSection = $('accessories-section');
  const reportsSection = $('general-reports-section');
  const settingsSection = $('settings-section');
  const customersModule = $('customer-management-section');
  const safeSection = $('safe-overview-section');
  const more = $('more-section');
  const main = $('main-page');

  // IMPORTANT: these screens were nested inside #devices-main-section (.sales-area).
  // openExtra() correctly hides .sales-area, but that also hid every nested screen,
  // leaving Customers, Employees, Safe and Settings completely blank. Move the
  // standalone modules to the shared app-content container before wiring handlers.
  const appContent = document.querySelector('#main-page > #app-content') ||
                     document.getElementById('app-content');
  if (appContent) {
    [
      $('employees-section'),
      $('customer-management-section'),
      $('safe-overview-section'),
      $('settings-section')
    ].forEach(section => {
      if (section && section.parentElement !== appContent) {
        appContent.appendChild(section);
      }
    });
  } else {
    console.error('ACT Manager: app-content container not found; standalone modules were not relocated.');
  }

  if (!accessoriesSection || !reportsSection) return;

  const storageKey = () => typeof getUserKey === 'function' ? getUserKey('accessories') : 'actPhoneManager_accessories_guest';
  const movementsKey = () => typeof getUserKey === 'function' ? getUserKey('accessoryMovements') : 'actPhoneManager_accessoryMovements_guest';
  const readKey = key => { try { const v=JSON.parse(localStorage.getItem(key)||'[]'); return Array.isArray(v)?v:[]; } catch(e){ console.error('ACT extra read error',key,e); return []; } };
  const read = () => readKey(storageKey());
  const saveKey = (key, rows) => {
    const raw=JSON.stringify(rows);
    try { localStorage.setItem(key,raw); } catch(error) { console.error('ACT extra local save failed',error); alert('تعذر الحفظ على هذا الجهاز. تأكد من مساحة التخزين.'); return false; }
    if(typeof saveUserDataToCloud==='function') { try { saveUserDataToCloud(key,raw); } catch(error) { console.error('ACT extra cloud queue error',error); } }
    window.dispatchEvent(new Event('act-user-data-ready'));
    window.dispatchEvent(new Event('act-accessories-data-updated'));
    return true;
  };
  const save = rows => saveKey(storageKey(),rows);
  const notify = (title,details,icon='🎧',type='accessories') => {
    if(typeof addNotificationFromOperation==='function') addNotificationFromOperation({type,title,details,icon,createdAt:new Date().toISOString()});
  };
  let editingId=null;
  function hideExtras(){accessoriesSection.style.display='none';reportsSection.style.display='none';if(settingsSection)settingsSection.style.display='none';if(customersModule)customersModule.style.display='none';if(safeSection)safeSection.style.display='none';const employeesSection=$('employees-section');if(employeesSection)employeesSection.style.display='none';}
  function openExtra(section){
    if(!section)return;
    hideExtras();
    [
      $('home-section'),document.querySelector('.sales-area'),$('customers-section'),
      $('employees-section'),$('wallet-section'),$('account-section'),$('safe-overview-section'),
      $('independent-sales-section'),$('independent-purchases-section'),$('day-close-section')
    ].forEach(part=>{if(part)part.style.display='none';});
    if(more) more.style.display='none';
    if(main) main.style.display='block';
    section.style.display='block';
    $('nav-more')?.classList.add('active');
    document.querySelectorAll('.bottom-nav-button').forEach(button=>{if(button.id!=='nav-more')button.classList.remove('active');});
    if(section===accessoriesSection) renderAccessories(); else if(section===reportsSection) renderReports(); else if(section===customersModule) renderCustomers(); else if(section===settingsSection) renderSettings(); else if(section===safeSection) renderSafeOverview();
    window.scrollTo({top:0,behavior:'smooth'});
  }
  function renderAccessories(){
    const list=$('accessory-list'); if(!list)return;
    const q=($('accessory-search')?.value||'').trim().toLocaleLowerCase();
    const rows=read().filter(x=>String(x.name||'').toLocaleLowerCase().includes(q)||String(x.code||'').toLocaleLowerCase().includes(q));
    list.innerHTML='';
    const all=read();
    const stats=$('act-accessory-stats');
    if(stats){const units=all.reduce((a,x)=>a+(Number(x.quantity)||0),0);const cost=all.reduce((a,x)=>a+(Number(x.quantity)||0)*(Number(x.cost)||0),0);const retail=all.reduce((a,x)=>a+(Number(x.quantity)||0)*(Number(x.price)||0),0);stats.innerHTML=[['الأصناف',all.length,'🎧'],['إجمالي القطع',units,'📦'],['قيمة المخزون بالتكلفة',money(cost)+' ج.م','💰'],['القيمة بسعر البيع',money(retail)+' ج.م','🏷️']].map(x=>`<article class="act-module-stat"><span>${x[2]}</span><small>${x[0]}</small><strong>${x[1]}</strong></article>`).join('');}
    const count=$('accessory-result-count');if(count)count.textContent=`${rows.length} صنف`;
    renderAccessoryMovements();
    if(!rows.length){list.innerHTML='<div class="act-extra-empty">لا توجد أصناف مطابقة. أضف أول صنف من النموذج.</div>';return;}
    rows.forEach(item=>{
      const card=document.createElement('article');card.className='act-extra-item';
      const info=document.createElement('div');
      const title=document.createElement('strong');title.textContent=item.name||'بدون اسم';
      const meta=document.createElement('small');meta.textContent=`الكود: ${item.code||'—'} | المتاح: ${item.quantity} | شراء: ${item.cost} | بيع: ${item.price}`;
      info.append(title,meta);
      const actions=document.createElement('div');actions.className='act-extra-actions';
      const edit=document.createElement('button');edit.type='button';edit.textContent='تعديل';edit.onclick=()=>{editingId=item.id;$('accessory-name').value=item.name||'';$('accessory-code').value=item.code||'';$('accessory-quantity').value=item.quantity??0;$('accessory-cost').value=item.cost??0;$('accessory-price').value=item.price??0;const saveButton=$('accessory-save-button');if(saveButton)saveButton.textContent='💾 حفظ التعديلات';$('accessory-form')?.scrollIntoView({behavior:'smooth',block:'center'});};
      const sale=document.createElement('button');sale.type='button';sale.textContent='تسجيل بيع قطعة';sale.disabled=Number(item.quantity)<=0;sale.onclick=()=>{
        const rowsNow=read();const current=rowsNow.find(x=>x.id===item.id);if(!current||Number(current.quantity)<=0){alert('الكمية غير متاحة.');return;}
        const quantity=Number(current.quantity)-1;current.quantity=quantity;current.updatedAt=new Date().toISOString();
        if(!save(rowsNow))return;
        const movements=readKey(movementsKey());movements.unshift({id:'accmove_'+Date.now(),itemId:item.id,name:item.name,kind:'sale',quantity:1,unitPrice:Number(item.price)||0,total:Number(item.price)||0,date:new Date().toISOString()});saveKey(movementsKey(),movements);
        notify('تم تسجيل بيع إكسسوار',`${item.name} — قطعة واحدة — ${Number(item.price)||0} جنيه`,'🛒');renderAccessories();
      };
      const adjust=document.createElement('button');adjust.type='button';adjust.textContent='تسوية الكمية';adjust.onclick=()=>{const raw=prompt('أدخل مقدار التغيير: رقم موجب للإضافة أو رقم سالب للصرف', '1');if(raw===null)return;const delta=Number(raw);if(!Number.isInteger(delta)||delta===0){alert('أدخل عددًا صحيحًا غير صفر.');return;}const rowsNow=read();const current=rowsNow.find(x=>x.id===item.id);if(!current)return;const nextQty=Number(current.quantity||0)+delta;if(nextQty<0){alert('لا يمكن أن تصبح الكمية أقل من صفر.');return;}current.quantity=nextQty;current.updatedAt=new Date().toISOString();if(save(rowsNow)){const moves=readKey(movementsKey());moves.unshift({id:'accmove_'+Date.now(),itemId:item.id,name:item.name,kind:delta>0?'stock_in':'stock_out',quantity:Math.abs(delta),delta,date:new Date().toISOString()});saveKey(movementsKey(),moves);notify(delta>0?'تمت إضافة كمية للمخزون':'تم صرف كمية من المخزون',`${item.name} — ${Math.abs(delta)} قطعة`,'📦');renderAccessories();}};
      const del=document.createElement('button');del.type='button';del.textContent='حذف';del.onclick=()=>{if(!confirm('تأكيد حذف الصنف؟'))return;const next=read().filter(x=>x.id!==item.id);if(save(next)){notify('تم حذف صنف إكسسوارات',item.name,'🗑️');renderAccessories();}};
      actions.append(edit,sale,adjust,del);card.append(info,actions);list.append(card);
    });
  }
  function renderAccessoryMovements(){
    const target=$('accessory-movements-list');if(!target)return;
    const rows=readKey(movementsKey()).slice(0,12);target.innerHTML='';
    if(!rows.length){target.innerHTML='<div class="act-extra-empty">لا توجد حركات مخزون مسجلة حتى الآن.</div>';return;}
    rows.forEach(m=>{const card=document.createElement('article');card.className='act-extra-item';const label=m.kind==='stock_in'?'إضافة مخزون':m.kind==='stock_out'?'صرف مخزون':m.kind==='sale'?'بيع إكسسوار':'حركة مخزون';const info=document.createElement('div');const title=document.createElement('strong');title.textContent=`${m.name||'صنف'} — ${label}`;const meta=document.createElement('small');meta.textContent=`الكمية: ${m.quantity||1} · ${new Date(m.date||Date.now()).toLocaleString('ar-EG')}`;info.append(title,meta);card.append(info);target.append(card);});
  }
  $('accessory-cancel-edit')?.addEventListener('click',()=>{editingId=null;$('accessory-form')?.reset();const b=$('accessory-save-button');if(b)b.textContent='💾 حفظ الصنف';});
  $('accessory-form')?.addEventListener('submit',e=>{
    e.preventDefault();
    const name=$('accessory-name').value.trim();
    const quantity=Number($('accessory-quantity').value),cost=Number($('accessory-cost').value),price=Number($('accessory-price').value);
    if(!name||![quantity,cost,price].every(Number.isFinite)||!Number.isInteger(quantity)||quantity<0||cost<0||price<0){alert('راجع اسم الصنف والكمية الصحيحة وأسعار الشراء والبيع');return;}
    const rows=read();const existing=rows.find(x=>x.id===editingId);
    const item={id:editingId||('acc_'+Date.now()+'_'+Math.random().toString(36).slice(2,7)),name,code:$('accessory-code').value.trim(),quantity,cost,price,createdAt:existing?.createdAt||new Date().toISOString(),updatedAt:new Date().toISOString()};
    const index=rows.findIndex(x=>x.id===editingId);if(index>=0)rows[index]=item;else rows.unshift(item);
    if(!save(rows))return;
    notify(editingId?'تم تحديث صنف إكسسوارات':'تمت إضافة صنف إكسسوارات',`${name} — الكمية ${quantity}`,'🎧');
    editingId=null;e.target.reset();const saveButton=$('accessory-save-button');if(saveButton)saveButton.textContent='💾 حفظ الصنف';renderAccessories();
  });
  $('accessory-search')?.addEventListener('input',renderAccessories);

  function readArrayFor(type){const key=typeof getUserKey==='function'?getUserKey(type):`actPhoneManager_${type}_guest`;return readKey(key);}
  function money(value){return Number(value||0).toLocaleString('ar-EG',{maximumFractionDigits:2});}
  function sum(rows,fields){return rows.reduce((acc,row)=>{for(const f of fields){if(row[f]!==undefined&&row[f]!==null&&row[f]!==''){const n=Number(row[f]);if(Number.isFinite(n))return acc+n;}}return acc;},0);}
  function renderReports(){
    const target=$('general-reports-content');if(!target)return;
    const devices=readArrayFor('devices'),sales=readArrayFor('sales'),purchases=readArrayFor('independentPurchases'),employees=readArrayFor('employees'),accessories=read();
    const salesTotal=sum(sales,['total','totalPrice','finalPrice','salePrice','price','amount']);
    const purchaseTotal=sum(purchases,['total','totalPrice','amount']);
    const inventoryValue=devices.filter(x=>x.status==='البيع'||x.section==='sale'||x.category==='sale').reduce((a,x)=>a+(Number(x.price||x.salePrice||0)||0),0);
    const accessoryValue=accessories.reduce((a,x)=>a+(Number(x.quantity)||0)*(Number(x.cost)||0),0);
    const specs=[['إجمالي المبيعات',money(salesTotal)+' ج.م'],['إجمالي المشتريات',money(purchaseTotal)+' ج.م'],['فرق الحركة',money(salesTotal-purchaseTotal)+' ج.م'],['عمليات البيع',sales.length],['عمليات الشراء',purchases.length],['الأجهزة المسجلة',devices.length],['قيمة الأجهزة المعروضة',money(inventoryValue)+' ج.م'],['أصناف الإكسسوارات',accessories.length],['قيمة مخزون الإكسسوارات بالتكلفة',money(accessoryValue)+' ج.م'],['الموظفون',employees.length],['سجل الأيام السابقة',readKey(typeof getUserKey==='function'?getUserKey('day_closes'):'actPhoneManager_day_closes_guest').length]];
    target.innerHTML='';
    specs.forEach(([label,value])=>{const card=document.createElement('div');card.className='act-extra-item';const name=document.createElement('strong');name.textContent=label;const val=document.createElement('span');val.textContent=String(value);card.append(name,val);target.append(card);});
    const note=document.createElement('p');note.className='act-extra-note';note.textContent='ملاحظة: فرق المبيعات والمشتريات مؤشر حركة نقدية مبسط وليس صافي الربح أو قائمة دخل محاسبية.';target.append(note);
  }
  $('general-reports-refresh')?.addEventListener('click',renderReports);
  $('more-accessories')?.addEventListener('click',()=>openExtra(accessoriesSection));
  $('more-reports')?.addEventListener('click',()=>openExtra(reportsSection));
  $('more-settings')?.addEventListener('click',()=>{if(settingsSection)openExtra(settingsSection);});
  $('more-customers')?.addEventListener('click',()=>{if(customersModule)openExtra(customersModule);});
  $('more-employees')?.addEventListener('click',()=>{
    hideExtras();
    if(more)more.style.display='none';
    // The login shell hides the complete app until a section explicitly reveals it.
    // Employees previously used the legacy renderer without revealing #main-page.
    if(main)main.style.display='block';
    [ $('home-section'), document.querySelector('.sales-area'), $('customers-section'),
      $('wallet-section'), $('account-section'), $('independent-sales-section'),
      $('independent-purchases-section'), $('day-close-section')
    ].forEach(part=>{if(part)part.style.display='none';});
    if(typeof showEmployeesArea==='function')showEmployeesArea();
    const section=$('employees-section');
    if(section)section.style.display='block';
    $('nav-more')?.classList.add('active');
    document.querySelectorAll('.bottom-nav-button').forEach(button=>{
      if(button.id!=='nav-more')button.classList.remove('active');
    });
    if(typeof renderEmployees==='function')renderEmployees();
    window.scrollTo({top:0,behavior:'smooth'});
  });
  $('more-safe')?.addEventListener('click',()=>{if(safeSection)openExtra(safeSection);});

  // Dedicated customer CRM (kept separate from maintenance records).
  const customerKey=()=>typeof getUserKey==='function'?getUserKey('customers'):'actPhoneManager_customers_guest';
  const readCustomers=()=>readKey(customerKey());
  let editingCustomerId=null;
  function saveCustomers(rows){const raw=JSON.stringify(rows);try{localStorage.setItem(customerKey(),raw);}catch(err){console.error('Customer save failed',err);alert('تعذر حفظ بيانات العميل على هذا الجهاز.');return false;}if(typeof saveUserDataToCloud==='function'){try{saveUserDataToCloud(customerKey(),raw);}catch(err){console.error('Customer cloud sync failed',err);}}window.dispatchEvent(new Event('act-user-data-ready'));return true;}
  function renderCustomers(){const list=$('act-customer-list');if(!list)return;const all=readCustomers();const q=($('act-customer-search')?.value||'').trim().toLocaleLowerCase();const rows=all.filter(x=>[x.name,x.phone,x.email,x.address].some(v=>String(v||'').toLocaleLowerCase().includes(q)));const stats=$('act-customer-stats');if(stats)stats.innerHTML=[['إجمالي العملاء',all.length,'👥'],['لديهم هاتف',all.filter(x=>x.phone).length,'📱'],['أضيفوا هذا الشهر',all.filter(x=>String(x.createdAt||'').slice(0,7)===new Date().toISOString().slice(0,7)).length,'🗓️']].map(x=>`<article class="act-module-stat"><span>${x[2]}</span><small>${x[0]}</small><strong>${x[1]}</strong></article>`).join('');const count=$('act-customer-count');if(count)count.textContent=`${rows.length} عميل`;list.innerHTML='';if(!rows.length){list.innerHTML='<div class="act-extra-empty">لا توجد نتائج. أضف أول عميل من النموذج.</div>';return;}rows.forEach(customer=>{const card=document.createElement('article');card.className='act-extra-item act-customer-card';const info=document.createElement('div');const title=document.createElement('strong');title.textContent=customer.name||'عميل بدون اسم';const meta=document.createElement('small');meta.textContent=`📱 ${customer.phone||'بدون هاتف'}${customer.email?' · ✉️ '+customer.email:''}${customer.address?' · 📍 '+customer.address:''}`;info.append(title,meta);if(customer.notes){const note=document.createElement('small');note.textContent='ملاحظات: '+customer.notes;info.append(note);}const actions=document.createElement('div');actions.className='act-extra-actions';const invoices=document.createElement('button');invoices.type='button';invoices.textContent='سجل الفواتير';invoices.onclick=()=>showCustomerInvoices(customer);const edit=document.createElement('button');edit.type='button';edit.textContent='تعديل';edit.onclick=()=>{editingCustomerId=customer.id;$('act-customer-name').value=customer.name||'';$('act-customer-phone').value=customer.phone||'';$('act-customer-email').value=customer.email||'';$('act-customer-address').value=customer.address||'';$('act-customer-notes').value=customer.notes||'';$('act-customer-save').textContent='حفظ التعديلات';$('act-customer-form').scrollIntoView({behavior:'smooth',block:'center'});};const del=document.createElement('button');del.type='button';del.textContent='حذف';del.onclick=()=>{if(!confirm('تأكيد حذف ملف العميل؟ لن يتم حذف فواتيره أو عمليات البيع السابقة.'))return;if(saveCustomers(readCustomers().filter(x=>x.id!==customer.id))){notify('تم حذف ملف عميل',customer.name,'👥','customers');renderCustomers();}};actions.append(invoices,edit,del);card.append(info,actions);list.append(card);});}
  window.actCustomerUpsertFromSale=function(data){if(!data||!data.name||!data.phone)return;const rows=readCustomers();const phone=String(data.phone).trim();const existing=rows.find(x=>String(x.phone||'').trim()===phone);if(existing){existing.name=String(data.name).trim();existing.updatedAt=new Date().toISOString();}else{rows.unshift({id:'cust_'+Date.now(),name:String(data.name).trim(),phone,email:'',address:'',notes:'تم إنشاء الملف تلقائيًا من فاتورة بيع',createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()});}saveCustomers(rows);};
  function showCustomerInvoices(customer){const sales=readArrayFor('sales');const invoices=sales.filter(x=>String(x.customerPhone||'').trim()===String(customer.phone||'').trim()||(String(x.customerName||'').trim()===String(customer.name||'').trim()&&customer.name));const details=invoices.length?invoices.slice(0,20).map(x=>`${x.invoiceNumber||x.id||'فاتورة'} — ${money(x.total??x.price??0)} ج.م — ${String(x.date||x.createdAt||'').slice(0,10)}`).join('\n'):'لا توجد فواتير مطابقة لهذا العميل في سجل المبيعات.';alert(`سجل فواتير: ${customer.name}\n\n${details}`);}
  $('act-customer-form')?.addEventListener('submit',e=>{e.preventDefault();const name=$('act-customer-name').value.trim(),phone=$('act-customer-phone').value.trim();if(!name||!phone){alert('اكتب اسم العميل ورقم الهاتف.');return;}const rows=readCustomers();const duplicate=rows.find(x=>x.id!==editingCustomerId&&x.phone===phone);if(duplicate){alert('رقم الهاتف مسجل بالفعل لعميل آخر.');return;}const existing=rows.find(x=>x.id===editingCustomerId);const item={id:editingCustomerId||('cust_'+Date.now()),name,phone,email:$('act-customer-email').value.trim(),address:$('act-customer-address').value.trim(),notes:$('act-customer-notes').value.trim(),createdAt:existing?.createdAt||new Date().toISOString(),updatedAt:new Date().toISOString()};const index=rows.findIndex(x=>x.id===editingCustomerId);if(index>=0)rows[index]=item;else rows.unshift(item);if(saveCustomers(rows)){notify(editingCustomerId?'تم تحديث بيانات عميل':'تمت إضافة عميل جديد',`${name} — ${phone}`,'👥','customers');editingCustomerId=null;e.target.reset();$('act-customer-save').textContent='💾 حفظ العميل';renderCustomers();}});
  $('act-customer-search')?.addEventListener('input',renderCustomers);
  $('act-customer-cancel')?.addEventListener('click',()=>{editingCustomerId=null;$('act-customer-form')?.reset();$('act-customer-save').textContent='💾 حفظ العميل';});

  // Cashbox overview is separate from the wallet-operation screen.
  function walletRows(operation){const key=typeof getWalletTransactionsStorageKey==='function'?getWalletTransactionsStorageKey(operation):`actPhoneManager_wallet_transactions_${operation}_${typeof currentUser!=='undefined'&&currentUser?currentUser.uid:'guest'}`;return readKey(key);}
  function renderSafeOverview(){const deposits=walletRows('deposit'),withdrawals=walletRows('withdraw');const totalDeposit=deposits.reduce((a,x)=>a+(Number(x.amount)||0),0),totalWithdraw=withdrawals.reduce((a,x)=>a+(Number(x.amount)||0),0);const stats=$('act-safe-stats');if(stats)stats.innerHTML=[['الرصيد المحسوب',money(totalDeposit-totalWithdraw)+' ج.م','💰'],['إجمالي الإيداعات',money(totalDeposit)+' ج.م','📥'],['إجمالي السحوبات',money(totalWithdraw)+' ج.م','📤'],['عدد العمليات',deposits.length+withdrawals.length,'🧾']].map(x=>`<article class="act-module-stat"><span>${x[2]}</span><small>${x[0]}</small><strong>${x[1]}</strong></article>`).join('');const target=$('act-safe-transactions');if(!target)return;const rows=[...deposits.map(x=>({...x,_kind:'إيداع'})),...withdrawals.map(x=>({...x,_kind:'سحب'}))].sort((a,b)=>new Date(b.date||b.createdAt||0)-new Date(a.date||a.createdAt||0)).slice(0,20);target.innerHTML='';if(!rows.length){target.innerHTML='<div class="act-extra-empty">لا توجد عمليات إيداع أو سحب مسجلة حتى الآن.</div>';return;}rows.forEach(x=>{const card=document.createElement('article');card.className='act-extra-item';const info=document.createElement('div');const title=document.createElement('strong');title.textContent=`${x._kind} — ${x.service||x.operationName||'عملية خزنة'}`;const meta=document.createElement('small');meta.textContent=`${x.account||'—'} · ${new Date(x.date||x.createdAt||Date.now()).toLocaleString('ar-EG')} · ${x.statusName||'مسجلة'}`;const amount=document.createElement('strong');amount.textContent=money(x.amount||0)+' ج.م';amount.style.color=x._kind==='إيداع'?'#28c98b':'#ff9b78';info.append(title,meta);card.append(info,amount);target.append(card);});}
  $('act-safe-open-wallet')?.addEventListener('click',()=>{$('more-wallet')?.click();});
  $('act-safe-refresh')?.addEventListener('click',renderSafeOverview);
  window.addEventListener('act-wallet-data-updated',()=>{if(safeSection&&safeSection.style.display!=='none')renderSafeOverview();});

  // Settings actions: preferences, browser notifications, PWA install and update check.
  let deferredInstallPrompt=null;window.addEventListener('beforeinstallprompt',event=>{event.preventDefault();deferredInstallPrompt=event;const status=$('act-pwa-status');if(status)status.textContent='التطبيق جاهز للتثبيت على هذا الجهاز.';});
  function renderSettings(){const lang=$('act-settings-language'),theme=$('act-settings-theme');if(lang)lang.value=localStorage.getItem('actPhoneManager_language')||'ar';if(theme)theme.value=localStorage.getItem('actPhoneManager_theme')||'dark';const permission=$('act-notification-permission-status');if(permission){permission.textContent=typeof Notification==='undefined'?'هذا المتصفح لا يدعم إشعارات النظام':Notification.permission==='granted'?'إشعارات النظام مفعّلة':Notification.permission==='denied'?'تم حظر الإشعارات من إعدادات المتصفح':'لم يتم منح إذن الإشعارات بعد';}const pwa=$('act-pwa-status');if(pwa&&'serviceWorker'in navigator){navigator.serviceWorker.getRegistration().then(reg=>{pwa.textContent=reg?'التطبيق مسجل ويعمل كـ PWA على هذا الجهاز.':'لم يتم تسجيل Service Worker بعد.';}).catch(()=>{pwa.textContent='تعذر قراءة حالة التطبيق.';});}}
  async function refreshActStorageStatus(requestPermission=false){
    const status=$('act-storage-status');
    if(!status)return;
    if(!navigator.storage || !navigator.storage.estimate){status.textContent='المتصفح لا يتيح عرض تفاصيل مساحة التخزين.';return;}
    try{
      let persisted=false;
      if(requestPermission && navigator.storage.persist){persisted=await navigator.storage.persist();}
      else if(navigator.storage.persisted){persisted=await navigator.storage.persisted();}
      const estimate=await navigator.storage.estimate();
      const used=Number(estimate.usage||0),quota=Number(estimate.quota||0);
      const gb=n=> (n/1024/1024/1024).toFixed(2);
      status.textContent=`المستخدم: ${gb(used)} جيجابايت — الحد الذي يتيحه المتصفح حاليًا: ${gb(quota)} جيجابايت — حماية التخزين: ${persisted?'مفعّلة':'لم يمنحها المتصفح'}. لا يمكن حجز 2 جيجابايت بالقوة؛ المساحة يحددها المتصفح والجهاز.`;
    }catch(error){console.warn('ACT storage estimate unavailable',error);status.textContent='تعذر قراءة مساحة التخزين من المتصفح.';}
  }
  $('act-protect-storage')?.addEventListener('click',()=>refreshActStorageStatus(true));
  refreshActStorageStatus(false);

  $('act-save-settings')?.addEventListener('click',()=>{const lang=$('act-settings-language')?.value||'ar',theme=$('act-settings-theme')?.value||'dark';if(!['ar','en'].includes(lang)||!['dark','light'].includes(theme))return;localStorage.setItem('actPhoneManager_language',lang);localStorage.setItem('actPhoneManager_theme',theme);if(typeof applyLanguage==='function'){try{currentLanguage=lang;applyLanguage();}catch(err){console.warn('Language apply issue',err);}}if(typeof applyTheme==='function')applyTheme();const status=$('act-backup-status');if(status)status.textContent='تم حفظ اللغة والمظهر وتطبيقهما.';notify('تم تحديث إعدادات النظام','تم حفظ اللغة والمظهر','⚙️','settings');});
  $('act-enable-notifications')?.addEventListener('click',async()=>{if(typeof Notification==='undefined'){alert('المتصفح لا يدعم إشعارات النظام.');return;}try{const result=await Notification.requestPermission();renderSettings();if(result==='granted')notify('تم تفعيل إشعارات النظام','يمكن للمتصفح الآن عرض الإشعارات بعد منح الإذن','🔔','settings');}catch(err){console.error('Notification permission error',err);alert('تعذر طلب إذن الإشعارات.');}});
  $('act-install-app')?.addEventListener('click',async()=>{if(!deferredInstallPrompt){const status=$('act-pwa-status');if(status)status.textContent='إذا لم يظهر خيار التثبيت، افتح قائمة المتصفح واختر تثبيت التطبيق أو إضافة إلى الشاشة الرئيسية.';return;}deferredInstallPrompt.prompt();try{await deferredInstallPrompt.userChoice;}catch(err){console.warn('PWA install prompt result unavailable',err);}deferredInstallPrompt=null;});
  $('act-check-update')?.addEventListener('click',async()=>{const status=$('act-pwa-status');try{if(!('serviceWorker'in navigator)){if(status)status.textContent='Service Worker غير مدعوم في هذا المتصفح.';return;}const reg=await navigator.serviceWorker.getRegistration();if(!reg){if(status)status.textContent='لا يوجد Service Worker مسجل. تحقق من فتح الموقع عبر HTTPS أو localhost.';return;}await reg.update();if(status)status.textContent='تم فحص التحديثات. إذا وُجد تحديث فسيتم تحميله حسب دورة Service Worker.';}catch(err){console.error('PWA update check failed',err);if(status)status.textContent='تعذر فحص التحديثات: '+(err.message||'خطأ غير معروف');}});

  // Export/import ACT-only local data for user-controlled device backups.
  $('act-export-backup')?.addEventListener('click',()=>{
    const data={format:'ACT_MANAGER_BACKUP',version:1,exportedAt:new Date().toISOString(),data:{}};
    for(let i=0;i<localStorage.length;i++){const key=localStorage.key(i);if(key&&key.startsWith('actPhoneManager_'))data.data[key]=localStorage.getItem(key);}
    const blob=new Blob([JSON.stringify(data,null,2)],{type:'application/json'});
    const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;
    a.download='ACT_Manager_Backup_'+new Date().toISOString().slice(0,10)+'.json';
    document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);
    const status=$('act-backup-status');if(status)status.textContent='تم إنشاء ملف النسخة الاحتياطية. احتفظ به في مكان آمن.';
    notify('تم إنشاء نسخة احتياطية','تم تصدير بيانات ACT Manager إلى ملف على جهازك','💾','backup');
  });
  $('act-import-backup')?.addEventListener('change',async event=>{
    const file=event.target.files&&event.target.files[0];if(!file)return;
    try{
      const parsed=JSON.parse(await file.text());
      if(!parsed||parsed.format!=='ACT_MANAGER_BACKUP'||!parsed.data||typeof parsed.data!=='object'||Array.isArray(parsed.data))throw new Error('invalid backup format');
      const entries=Object.entries(parsed.data).filter(([key,value])=>key.startsWith('actPhoneManager_')&&typeof value==='string');
      if(!entries.length)throw new Error('empty backup');
      if(!confirm(`سيتم استعادة ${entries.length} عنصرًا من النسخة الاحتياطية واستبدال العناصر المطابقة. هل تريد المتابعة؟`))return;
      entries.forEach(([key,value])=>localStorage.setItem(key,value));
      if(typeof saveUserDataToCloud==='function') entries.forEach(([key,value])=>{try{saveUserDataToCloud(key,value);}catch(syncError){console.error('Backup cloud sync failed',key,syncError);}});
      window.dispatchEvent(new Event('act-user-data-ready'));
      const status=$('act-backup-status');if(status)status.textContent=`تمت استعادة ${entries.length} عنصرًا. أعد تحميل الصفحة لتحديث جميع الأقسام.`;
      notify('تمت استعادة نسخة احتياطية',`تم استعادة ${entries.length} عنصرًا`,'♻️','backup');
    }catch(error){console.error('ACT backup restore error',error);alert('ملف النسخة الاحتياطية غير صالح أو يحتوي على بيانات غير مكتملة. لم يتم استيراد الملف.');}
    finally{event.target.value='';}
  });
  document.querySelectorAll('[data-act-extra-back]').forEach(btn=>btn.addEventListener('click',()=>{hideExtras();if(more)more.style.display='block';}));
  window.addEventListener('act-user-data-ready',()=>{if(accessoriesSection.style.display!=='none')renderAccessories();if(reportsSection.style.display!=='none')renderReports();if(customersModule&&customersModule.style.display!=='none')renderCustomers();if(safeSection&&safeSection.style.display!=='none')renderSafeOverview();});
  window.addEventListener('act-accessories-data-updated',()=>{if(reportsSection.style.display!=='none')renderReports();});
})();


// ACT MANUAL DAILY CLOSE ACTION
document.getElementById("manual-day-close-button")?.addEventListener("click", function () {
    const today = typeof getToday === "function" ? getToday() : new Date().toISOString().slice(0, 10);
    if (!confirm("تأكيد حفظ إقفال اليوم؟ سيتم حفظ لقطة من حركة اليوم في سجل الأيام السابقة.")) return;
    const saved = typeof closeDay === "function" ? closeDay(today) : false;
    if (!saved) { alert("اليوم محفوظ بالفعل في سجل الأيام السابقة، أو تعذر حفظه."); return; }
    if (typeof addNotificationFromOperation === "function") addNotificationFromOperation({ type: "day-close", icon: "🔒", title: "تم إقفال اليوم", details: "تم حفظ ملخص حركة اليوم في سجل الأيام السابقة." });
    if (typeof renderDayCloseCurrentSummary === "function") renderDayCloseCurrentSummary();
    if (typeof renderPreviousDays === "function") renderPreviousDays();
    alert("تم حفظ إقفال اليوم بنجاح.");
});
