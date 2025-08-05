// دليل مرجع تطوير الويب - JavaScript
// ملف JavaScript محدث للتصميم الجديد بالجدول

// المتغيرات العامة
let htmlCommands = [];
let cssCommands = [];
let javascriptCommands = [];
let currentTab = 'html';
let filteredCommands = [];

// عناصر DOM الرئيسية
const elements = {
    navButtons: null,
    tabContents: null,
    searchInput: null,
    clearSearchBtn: null,
    typeFilter: null,
    modalOverlay: null,
    modalClose: null,
    copyBtn: null,
    loadingSpinner: null,
    htmlCount: null,
    cssCount: null,
    jsCount: null
};

// تهيئة التطبيق عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    console.log('تم تحميل الصفحة، بدء التهيئة...');
    initializeElements();
    initializeApp();
});

// تهيئة عناصر DOM
function initializeElements() {
    elements.navButtons = document.querySelectorAll('.nav-btn');
    elements.tabContents = document.querySelectorAll('.tab-content');
    elements.searchInput = document.getElementById('search-input');
    elements.clearSearchBtn = document.getElementById('clear-search');
    elements.typeFilter = document.getElementById('type-filter');
    elements.modalOverlay = document.getElementById('modal-overlay');
    elements.modalClose = document.getElementById('modal-close');
    elements.copyBtn = document.getElementById('copy-btn');
    elements.loadingSpinner = document.getElementById('loading-spinner');
    elements.htmlCount = document.getElementById('html-count');
    elements.cssCount = document.getElementById('css-count');
    elements.jsCount = document.getElementById('js-count');
    
    console.log('تم تهيئة عناصر DOM');
}

// تهيئة التطبيق الرئيسية
async function initializeApp() {
    try {
        showLoading();
        console.log('بدء تحميل البيانات...');
        
        // تحميل جميع البيانات
        await loadAllData();
        
        // تحديث الإحصائيات
        updateStatistics();
        
        // إعداد مستمعي الأحداث
        setupEventListeners();
        
        // عرض المحتوى الأولي
        displayCommands('html');
        
        // إعداد خيارات التصفية
        setupFilterOptions();
        
        console.log('تم تحميل التطبيق بنجاح');
        
    } catch (error) {
        console.error('خطأ في تهيئة التطبيق:', error);
        showError('حدث خطأ في تحميل البيانات. يرجى إعادة تحميل الصفحة.');
    } finally {
        hideLoading();
    }
}

// تحميل جميع البيانات
async function loadAllData() {
    const promises = [
        loadHTMLCommands(),
        loadCSSCommands(),
        loadJavaScriptCommands()
    ];
    
    await Promise.all(promises);
    console.log('تم تحميل جميع البيانات');
}

// تحميل أوامر HTML
async function loadHTMLCommands() {
    try {
        console.log('تحميل بيانات HTML...');
        const response = await fetch('html-commands.json');
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        htmlCommands = data.html_commands || [];
        console.log(`تم تحميل ${htmlCommands.length} عنصر HTML`);
        
    } catch (error) {
        console.error('خطأ في تحميل بيانات HTML:', error);
        htmlCommands = [];
    }
}

// تحميل أوامر CSS
async function loadCSSCommands() {
    try {
        console.log('تحميل بيانات CSS...');
        const response = await fetch('css-commands.json');
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        cssCommands = data.css_commands || [];
        console.log(`تم تحميل ${cssCommands.length} خاصية CSS`);
        
    } catch (error) {
        console.error('خطأ في تحميل بيانات CSS:', error);
        cssCommands = [];
    }
}

// تحميل أوامر JavaScript
async function loadJavaScriptCommands() {
    try {
        console.log('تحميل بيانات JavaScript...');
        const response = await fetch('javascript-commands.json');
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        javascriptCommands = data.javascript_commands || [];
        console.log(`تم تحميل ${javascriptCommands.length} دالة JavaScript`);
        
    } catch (error) {
        console.error('خطأ في تحميل بيانات JavaScript:', error);
        javascriptCommands = [];
    }
}

// تحديث الإحصائيات
function updateStatistics() {
    if (elements.htmlCount) {
        animateCounter(elements.htmlCount, htmlCommands.length);
    }
    if (elements.cssCount) {
        animateCounter(elements.cssCount, cssCommands.length);
    }
    if (elements.jsCount) {
        animateCounter(elements.jsCount, javascriptCommands.length);
    }
    
    console.log('تم تحديث الإحصائيات');
}

// تحريك العداد
function animateCounter(element, target) {
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current);
    }, 30);
}

// إعداد مستمعي الأحداث
function setupEventListeners() {
    // أزرار التنقل
    if (elements.navButtons) {
        elements.navButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const tab = btn.dataset.tab;
                switchTab(tab);
            });
        });
    }
    
    // البحث
    if (elements.searchInput) {
        elements.searchInput.addEventListener('input', handleSearch);
    }
    
    if (elements.clearSearchBtn) {
        elements.clearSearchBtn.addEventListener('click', clearSearch);
    }
    
    // التصفية
    if (elements.typeFilter) {
        elements.typeFilter.addEventListener('change', handleFilter);
    }
    
    // النافذة المنبثقة
    if (elements.modalClose) {
        elements.modalClose.addEventListener('click', closeModal);
    }
    
    if (elements.modalOverlay) {
        elements.modalOverlay.addEventListener('click', (e) => {
            if (e.target === elements.modalOverlay) {
                closeModal();
            }
        });
    }
    
    // زر النسخ
    if (elements.copyBtn) {
        elements.copyBtn.addEventListener('click', copyCode);
    }
    
    // اختصارات لوحة المفاتيح
    document.addEventListener('keydown', handleKeyboard);
    
    console.log('تم إعداد مستمعي الأحداث');
}

// تبديل التبويبات
function switchTab(tab) {
    console.log(`التبديل إلى تبويب: ${tab}`);
    
    // تحديث أزرار التنقل
    if (elements.navButtons) {
        elements.navButtons.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.tab === tab);
        });
    }
    
    // تحديث المحتوى
    if (elements.tabContents) {
        elements.tabContents.forEach(content => {
            content.classList.toggle('active', content.id === `${tab}-tab`);
        });
    }
    
    currentTab = tab;
    displayCommands(tab);
    setupFilterOptions();
    clearSearch();
}

// عرض الأوامر
function displayCommands(tab) {
    const container = document.getElementById(`${tab}-commands`);
    if (!container) {
        console.error(`لم يتم العثور على حاوية ${tab}`);
        return;
    }
    
    let commands = [];
    
    switch(tab) {
        case 'html':
            commands = htmlCommands;
            break;
        case 'css':
            commands = cssCommands;
            break;
        case 'javascript':
            commands = javascriptCommands;
            break;
        default:
            console.error(`تبويب غير معروف: ${tab}`);
            return;
    }
    
    filteredCommands = commands;
    renderCommandsTable(container, commands);
    console.log(`تم عرض ${commands.length} أمر في تبويب ${tab}`);
}

// رسم جدول الأوامر
function renderCommandsTable(container, commands) {
    if (!container) return;
    
    container.innerHTML = '';
    
    if (commands.length === 0) {
        container.innerHTML = `
            <div class="no-results">
                <i class="fas fa-search"></i>
                <h3>لا توجد نتائج</h3>
                <p>لم يتم العثور على أوامر تطابق البحث</p>
            </div>
        `;
        return;
    }
    
    // إنشاء الجدول
    const table = document.createElement('table');
    table.className = 'commands-table';
    
    // إنشاء رأس الجدول
    const thead = document.createElement('thead');
    thead.innerHTML = `
        <tr>
            <th>اسم الأمر</th>
            <th>النوع</th>
        </tr>
    `;
    table.appendChild(thead);
    
    // إنشاء جسم الجدول
    const tbody = document.createElement('tbody');
    
    commands.forEach((command, index) => {
        const row = createTableRow(command, index);
        tbody.appendChild(row);
    });
    
    table.appendChild(tbody);
    container.appendChild(table);
}

// إنشاء صف في الجدول
function createTableRow(command, index) {
    const row = document.createElement('tr');
    row.style.animationDelay = `${index * 0.05}s`;
    row.setAttribute('tabindex', '0');
    
    row.innerHTML = `
        <td class="command-name-cell">${escapeHtml(command.name)}</td>
        <td class="command-type-cell">
            <span class="command-type-badge">${escapeHtml(command.type)}</span>
        </td>
    `;
    
    // إضافة مستمع النقر
    row.addEventListener('click', () => {
        showModal(command);
    });
    
    // إضافة دعم لوحة المفاتيح
    row.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            showModal(command);
        }
    });
    
    return row;
}

// عرض النافذة المنبثقة
function showModal(command) {
    const modalTitle = document.getElementById('modal-title');
    const modalType = document.getElementById('modal-type');
    const modalSyntax = document.getElementById('modal-syntax');
    const modalDescription = document.getElementById('modal-description');
    const modalExample = document.getElementById('modal-example');
    const modalExplanation = document.getElementById('modal-explanation');
    
    if (modalTitle) modalTitle.textContent = command.name;
    if (modalType) modalType.textContent = command.type;
    if (modalSyntax) modalSyntax.textContent = command.syntax;
    if (modalDescription) modalDescription.textContent = command.description;
    if (modalExample) modalExample.textContent = command.example;
    if (modalExplanation) modalExplanation.textContent = command.explanation;
    
    if (elements.modalOverlay) {
        elements.modalOverlay.classList.add('show');
    }
    
    document.body.style.overflow = 'hidden';
    
    // التركيز على زر الإغلاق للوصولية
    setTimeout(() => {
        if (elements.modalClose) {
            elements.modalClose.focus();
        }
    }, 100);
    
    console.log(`تم عرض النافذة المنبثقة للأمر: ${command.name}`);
}

// إغلاق النافذة المنبثقة
function closeModal() {
    if (elements.modalOverlay) {
        elements.modalOverlay.classList.remove('show');
    }
    
    document.body.style.overflow = 'auto';
    
    // إعادة تعيين زر النسخ
    if (elements.copyBtn) {
        elements.copyBtn.classList.remove('copied');
        elements.copyBtn.innerHTML = '<i class="fas fa-copy"></i> نسخ الكود';
    }
    
    console.log('تم إغلاق النافذة المنبثقة');
}

// نسخ الكود
async function copyCode() {
    const codeElement = document.getElementById('modal-example');
    if (!codeElement) return;
    
    const code = codeElement.textContent;
    
    try {
        await navigator.clipboard.writeText(code);
        showCopySuccess();
        console.log('تم نسخ الكود بنجاح');
    } catch (err) {
        console.warn('فشل في استخدام Clipboard API، استخدام الطريقة البديلة');
        fallbackCopyTextToClipboard(code);
    }
}

// عرض رسالة نجاح النسخ
function showCopySuccess() {
    if (elements.copyBtn) {
        elements.copyBtn.classList.add('copied');
        elements.copyBtn.innerHTML = '<i class="fas fa-check"></i> تم النسخ';
        
        setTimeout(() => {
            elements.copyBtn.classList.remove('copied');
            elements.copyBtn.innerHTML = '<i class="fas fa-copy"></i> نسخ الكود';
        }, 2000);
    }
}

// طريقة بديلة لنسخ النص
function fallbackCopyTextToClipboard(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        const successful = document.execCommand('copy');
        if (successful) {
            showCopySuccess();
            console.log('تم نسخ الكود باستخدام الطريقة البديلة');
        } else {
            console.error('فشل في نسخ الكود');
        }
    } catch (err) {
        console.error('خطأ في نسخ الكود:', err);
    }
    
    document.body.removeChild(textArea);
}

// معالجة البحث
function handleSearch() {
    const query = elements.searchInput ? elements.searchInput.value.toLowerCase().trim() : '';
    
    if (elements.clearSearchBtn) {
        if (query) {
            elements.clearSearchBtn.classList.add('show');
        } else {
            elements.clearSearchBtn.classList.remove('show');
        }
    }
    
    filterCommands();
}

// مسح البحث
function clearSearch() {
    if (elements.searchInput) {
        elements.searchInput.value = '';
    }
    
    if (elements.clearSearchBtn) {
        elements.clearSearchBtn.classList.remove('show');
    }
    
    if (elements.typeFilter) {
        elements.typeFilter.value = '';
    }
    
    filterCommands();
}

// معالجة التصفية
function handleFilter() {
    filterCommands();
}

// تصفية الأوامر
function filterCommands() {
    let commands = [];
    
    switch(currentTab) {
        case 'html':
            commands = htmlCommands;
            break;
        case 'css':
            commands = cssCommands;
            break;
        case 'javascript':
            commands = javascriptCommands;
            break;
    }
    
    const query = elements.searchInput ? elements.searchInput.value.toLowerCase().trim() : '';
    const typeValue = elements.typeFilter ? elements.typeFilter.value : '';
    
    let filtered = commands;
    
    // تصفية حسب البحث
    if (query) {
        filtered = filtered.filter(command => 
            command.name.toLowerCase().includes(query) ||
            command.description.toLowerCase().includes(query) ||
            command.type.toLowerCase().includes(query)
        );
    }
    
    // تصفية حسب النوع
    if (typeValue) {
        filtered = filtered.filter(command => command.type === typeValue);
    }
    
    filteredCommands = filtered;
    const container = document.getElementById(`${currentTab}-commands`);
    renderCommandsTable(container, filtered);
    
    console.log(`تم تصفية ${filtered.length} أمر من أصل ${commands.length}`);
}

// إعداد خيارات التصفية
function setupFilterOptions() {
    if (!elements.typeFilter) return;
    
    let commands = [];
    
    switch(currentTab) {
        case 'html':
            commands = htmlCommands;
            break;
        case 'css':
            commands = cssCommands;
            break;
        case 'javascript':
            commands = javascriptCommands;
            break;
    }
    
    const types = [...new Set(commands.map(cmd => cmd.type))];
    
    elements.typeFilter.innerHTML = '<option value="">جميع الأنواع</option>';
    types.forEach(type => {
        const option = document.createElement('option');
        option.value = type;
        option.textContent = type;
        elements.typeFilter.appendChild(option);
    });
}

// معالجة اختصارات لوحة المفاتيح
function handleKeyboard(e) {
    // مفتاح Escape لإغلاق النافذة المنبثقة
    if (e.key === 'Escape' && elements.modalOverlay && elements.modalOverlay.classList.contains('show')) {
        closeModal();
    }
    
    // Ctrl/Cmd + K للتركيز على البحث
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        if (elements.searchInput) {
            elements.searchInput.focus();
        }
    }
    
    // اختصارات التنقل
    if (e.altKey) {
        switch(e.key) {
            case '1':
                e.preventDefault();
                switchTab('html');
                break;
            case '2':
                e.preventDefault();
                switchTab('css');
                break;
            case '3':
                e.preventDefault();
                switchTab('javascript');
                break;
        }
    }
}

// دوال مساعدة
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function showLoading() {
    if (elements.loadingSpinner) {
        elements.loadingSpinner.classList.add('show');
    }
}

function hideLoading() {
    if (elements.loadingSpinner) {
        elements.loadingSpinner.classList.remove('show');
    }
}

function showError(message) {
    console.error('خطأ:', message);
    
    // إنشاء رسالة خطأ
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.innerHTML = `
        <div class="error-content">
            <i class="fas fa-exclamation-triangle"></i>
            <h3>خطأ</h3>
            <p>${message}</p>
            <button onclick="location.reload()" class="retry-btn">
                <i class="fas fa-redo"></i> إعادة المحاولة
            </button>
        </div>
    `;
    
    document.body.appendChild(errorDiv);
    
    // إضافة أنماط الخطأ
    if (!document.getElementById('error-styles')) {
        const style = document.createElement('style');
        style.id = 'error-styles';
        style.textContent = `
            .error-message {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.8);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 4000;
            }
            .error-content {
                background: white;
                padding: 2rem;
                border-radius: 15px;
                text-align: center;
                max-width: 400px;
                box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            }
            .error-content i {
                font-size: 3rem;
                color: #e53e3e;
                margin-bottom: 1rem;
            }
            .error-content h3 {
                font-size: 1.5rem;
                color: #333;
                margin-bottom: 1rem;
            }
            .error-content p {
                color: #666;
                margin-bottom: 1.5rem;
            }
            .retry-btn {
                background: #667eea;
                color: white;
                border: none;
                padding: 10px 20px;
                border-radius: 8px;
                cursor: pointer;
                font-family: inherit;
                font-size: 1rem;
                transition: all 0.3s ease;
            }
            .retry-btn:hover {
                background: #5a67d8;
                transform: translateY(-2px);
            }
        `;
        document.head.appendChild(style);
    }
}

// تصدير الدوال للاستخدام العام (إذا لزم الأمر)
window.webReferenceGuide = {
    switchTab,
    showModal,
    closeModal,
    copyCode,
    clearSearch,
    filterCommands
};

console.log('تم تحميل ملف JavaScript المحدث بنجاح');

