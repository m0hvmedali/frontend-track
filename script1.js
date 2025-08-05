// تهيئة الصفحة
document.addEventListener('DOMContentLoaded', function() {
    initializeHero();
    initializeNavigation();
    initializeProgressBar();
    initializePlayground();
    initializeSyntaxHighlighting();
    initializeAnimations();
});

// تهيئة القسم الرئيسي
function initializeHero() {
    const heroCode = document.getElementById('hero-code');
    const codeText = `// مرحباً بك في عالم JavaScript!
function welcomeMessage() {
    const name = 'المطور الجديد';
    const message = \`أهلاً وسهلاً \${name}!\`;
    
    console.log(message);
    console.log('🚀 لنبدأ رحلة التعلم!');
}

welcomeMessage();

// إنشاء كائن للمستخدم
const user = {
    name: 'أحمد',
    level: 'مبتدئ',
    progress: 0,
    
    updateProgress(newProgress) {
        this.progress = newProgress;
        console.log(\`التقدم: \${this.progress}%\`);
    }
};

user.updateProgress(25);`;

    typeWriter(heroCode, codeText, 50);
}

// تأثير الكتابة
function typeWriter(element, text, speed) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else {
            // تطبيق تمييز الكود بعد انتهاء الكتابة
            Prism.highlightElement(element);
        }
    }
    
    type();
}

// تهيئة شريط التنقل
function initializeNavigation() {
    const navbar = document.querySelector('.navbar');
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    // تأثير الشفافية عند التمرير
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        }
    });
    
    // قائمة الهاتف المحمول
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });
    
    // التنقل السلس
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            scrollToSection(targetId);
        });
    });
}

// التنقل إلى قسم معين
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const offsetTop = section.offsetTop - 70;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// تهيئة شريط التقدم
function initializeProgressBar() {
    const progressFill = document.querySelector('.progress-fill');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        
        progressFill.style.width = scrollPercent + '%';
    });
}

// تهيئة ساحة التجريب
function initializePlayground() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    // تبديل التبويبات
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tabName = this.getAttribute('data-tab');
            
            // إزالة الفئة النشطة من جميع التبويبات
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            // إضافة الفئة النشطة للتبويب المحدد
            this.classList.add('active');
            document.getElementById(tabName + '-tab').classList.add('active');
        });
    });
}

// تشغيل الأمثلة
function runExample(exampleId) {
    const codeElement = document.getElementById(exampleId);
    const outputElement = document.getElementById('output-' + exampleId);
    
    if (!codeElement || !outputElement) return;
    
    const code = codeElement.textContent;
    outputElement.innerHTML = '';
    
    // إنشاء console مخصص لالتقاط النتائج
    const originalConsole = window.console;
    const outputs = [];
    
    window.console = {
        log: function(...args) {
            outputs.push(args.map(arg => 
                typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
            ).join(' '));
            originalConsole.log(...args);
        },
        error: function(...args) {
            outputs.push('❌ خطأ: ' + args.join(' '));
            originalConsole.error(...args);
        },
        warn: function(...args) {
            outputs.push('⚠️ تحذير: ' + args.join(' '));
            originalConsole.warn(...args);
        }
    };
    
    try {
        // تنفيذ الكود
        eval(code);
        
        // عرض النتائج
        if (outputs.length > 0) {
            outputElement.textContent = outputs.join('\n');
        } else {
            outputElement.textContent = '✅ تم تنفيذ الكود بنجاح (لا توجد مخرجات)';
        }
        
        // تأثير بصري للنجاح
        outputElement.style.borderLeft = '4px solid #4ecdc4';
        
    } catch (error) {
        outputElement.textContent = '❌ خطأ: ' + error.message;
        outputElement.style.borderLeft = '4px solid #ff6b6b';
    } finally {
        // استعادة console الأصلي
        window.console = originalConsole;
    }
    
    // تأثير الرسوم المتحركة
    outputElement.style.opacity = '0';
    outputElement.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        outputElement.style.transition = 'all 0.3s ease';
        outputElement.style.opacity = '1';
        outputElement.style.transform = 'translateY(0)';
    }, 100);
}

// تشغيل كود ساحة التجريب
function runPlaygroundCode() {
    const jsEditor = document.getElementById('js-editor');
    const htmlEditor = document.getElementById('html-editor');
    const cssEditor = document.getElementById('css-editor');
    const consoleOutput = document.getElementById('console-output');
    const previewOutput = document.getElementById('preview-output');
    
    // مسح النتائج السابقة
    consoleOutput.innerHTML = '';
    previewOutput.innerHTML = '';
    
    const jsCode = jsEditor.value;
    const htmlCode = htmlEditor.value;
    const cssCode = cssEditor.value;
    
    // إنشاء console مخصص
    const outputs = [];
    const originalConsole = window.console;
    
    window.console = {
        log: function(...args) {
            const output = args.map(arg => 
                typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
            ).join(' ');
            outputs.push('> ' + output);
            consoleOutput.textContent = outputs.join('\n');
            originalConsole.log(...args);
        },
        error: function(...args) {
            outputs.push('❌ ' + args.join(' '));
            consoleOutput.textContent = outputs.join('\n');
            originalConsole.error(...args);
        },
        warn: function(...args) {
            outputs.push('⚠️ ' + args.join(' '));
            consoleOutput.textContent = outputs.join('\n');
            originalConsole.warn(...args);
        }
    };
    
    try {
        // تنفيذ JavaScript
        if (jsCode.trim()) {
            eval(jsCode);
        }
        
        // إنشاء معاينة HTML/CSS
        if (htmlCode.trim() || cssCode.trim()) {
            const iframe = document.createElement('iframe');
            iframe.style.width = '100%';
            iframe.style.height = '100%';
            iframe.style.border = 'none';
            
            previewOutput.appendChild(iframe);
            
            const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
            const fullHtml = `
                <!DOCTYPE html>
                <html lang="ar" dir="rtl">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <style>${cssCode}</style>
                </head>
                <body>
                    ${htmlCode}
                    <script>
                        // ربط console بالنافذة الرئيسية
                        window.parent.console = window.parent.console;
                        ${jsCode}
                    </script>
                </body>
                </html>
            `;
            
            iframeDoc.open();
            iframeDoc.write(fullHtml);
            iframeDoc.close();
        }
        
    } catch (error) {
        outputs.push('❌ خطأ: ' + error.message);
        consoleOutput.textContent = outputs.join('\n');
    } finally {
        window.console = originalConsole;
    }
}

// مسح المحرر
function clearEditor() {
    const activeTab = document.querySelector('.tab-content.active textarea');
    if (activeTab) {
        activeTab.value = '';
    }
}

// تنسيق الكود
function formatCode() {
    const activeTab = document.querySelector('.tab-content.active textarea');
    if (activeTab) {
        // تنسيق بسيط للكود
        let code = activeTab.value;
        
        // إضافة مسافات بادئة بسيطة
        const lines = code.split('\n');
        let indentLevel = 0;
        const formattedLines = lines.map(line => {
            const trimmedLine = line.trim();
            
            if (trimmedLine.includes('}')) {
                indentLevel = Math.max(0, indentLevel - 1);
            }
            
            const formattedLine = '    '.repeat(indentLevel) + trimmedLine;
            
            if (trimmedLine.includes('{')) {
                indentLevel++;
            }
            
            return formattedLine;
        });
        
        activeTab.value = formattedLines.join('\n');
    }
}

// مسح النتائج
function clearOutput() {
    document.getElementById('console-output').innerHTML = '';
    document.getElementById('preview-output').innerHTML = '';
}

// تحميل الأمثلة السريعة
function loadExample(exampleType) {
    const jsEditor = document.getElementById('js-editor');
    const htmlEditor = document.getElementById('html-editor');
    const cssEditor = document.getElementById('css-editor');
    
    // تفعيل تبويب JavaScript
    document.querySelector('.tab-btn[data-tab="js"]').click();
    
    const examples = {
        calculator: {
            js: `// آلة حاسبة بسيطة
function calculator() {
    const num1 = parseFloat(prompt('أدخل الرقم الأول:'));
    const operator = prompt('أدخل العملية (+, -, *, /):');
    const num2 = parseFloat(prompt('أدخل الرقم الثاني:'));
    
    let result;
    
    switch(operator) {
        case '+':
            result = num1 + num2;
            break;
        case '-':
            result = num1 - num2;
            break;
        case '*':
            result = num1 * num2;
            break;
        case '/':
            result = num2 !== 0 ? num1 / num2 : 'لا يمكن القسمة على صفر';
            break;
        default:
            result = 'عملية غير صحيحة';
    }
    
    console.log(\`النتيجة: \${num1} \${operator} \${num2} = \${result}\`);
    return result;
}

// تشغيل الآلة الحاسبة
calculator();`,
            html: '',
            css: ''
        },
        
        todo: {
            js: `// قائمة المهام
let tasks = [];

function addTask(taskText) {
    const task = {
        id: Date.now(),
        text: taskText,
        completed: false,
        createdAt: new Date().toLocaleString('ar-SA')
    };
    
    tasks.push(task);
    console.log(\`✅ تمت إضافة المهمة: "\${taskText}"\`);
    displayTasks();
}

function completeTask(taskId) {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
        task.completed = true;
        console.log(\`✅ تم إنجاز المهمة: "\${task.text}"\`);
        displayTasks();
    }
}

function deleteTask(taskId) {
    const taskIndex = tasks.findIndex(t => t.id === taskId);
    if (taskIndex > -1) {
        const deletedTask = tasks.splice(taskIndex, 1)[0];
        console.log(\`🗑️ تم حذف المهمة: "\${deletedTask.text}"\`);
        displayTasks();
    }
}

function displayTasks() {
    console.log('\\n📋 قائمة المهام:');
    console.log('================');
    
    if (tasks.length === 0) {
        console.log('لا توجد مهام');
        return;
    }
    
    tasks.forEach((task, index) => {
        const status = task.completed ? '✅' : '⏳';
        console.log(\`\${index + 1}. \${status} \${task.text}\`);
    });
    
    const completedCount = tasks.filter(t => t.completed).length;
    console.log(\`\\nالمهام المكتملة: \${completedCount}/\${tasks.length}\`);
}

// إضافة بعض المهام للتجربة
addTask('تعلم JavaScript');
addTask('بناء مشروع ويب');
addTask('قراءة كتاب برمجة');

// إنجاز مهمة
completeTask(tasks[0].id);`,
            html: '',
            css: ''
        },
        
        clock: {
            js: `// ساعة رقمية
function updateClock() {
    const now = new Date();
    
    const time = {
        hours: now.getHours().toString().padStart(2, '0'),
        minutes: now.getMinutes().toString().padStart(2, '0'),
        seconds: now.getSeconds().toString().padStart(2, '0')
    };
    
    const date = {
        day: now.getDate(),
        month: now.getMonth() + 1,
        year: now.getFullYear(),
        weekday: ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'][now.getDay()]
    };
    
    const timeString = \`\${time.hours}:\${time.minutes}:\${time.seconds}\`;
    const dateString = \`\${date.weekday}, \${date.day}/\${date.month}/\${date.year}\`;
    
    console.clear();
    console.log('🕐 الساعة الرقمية');
    console.log('==================');
    console.log(\`⏰ الوقت: \${timeString}\`);
    console.log(\`📅 التاريخ: \${dateString}\`);
    
    // معلومات إضافية
    const period = time.hours >= 12 ? 'مساءً' : 'صباحاً';
    const hour12 = time.hours % 12 || 12;
    console.log(\`🌅 الوقت (12 ساعة): \${hour12}:\${time.minutes} \${period}\`);
    
    // حالة اليوم
    const hour = parseInt(time.hours);
    let dayPeriod;
    if (hour >= 5 && hour < 12) dayPeriod = '🌅 صباح الخير';
    else if (hour >= 12 && hour < 17) dayPeriod = '☀️ ظهيرة سعيدة';
    else if (hour >= 17 && hour < 21) dayPeriod = '🌆 مساء الخير';
    else dayPeriod = '🌙 ليلة سعيدة';
    
    console.log(dayPeriod);
}

// تحديث الساعة كل ثانية
updateClock();
setInterval(updateClock, 1000);

console.log('\\n⚡ الساعة تعمل الآن! ستتحدث كل ثانية.');`,
            html: '',
            css: ''
        },
        
        colors: {
            js: `// مولد الألوان العشوائية
class ColorGenerator {
    constructor() {
        this.colors = [];
    }
    
    // توليد لون عشوائي بصيغة HEX
    generateHexColor() {
        const hex = Math.floor(Math.random() * 16777215).toString(16);
        return '#' + hex.padStart(6, '0');
    }
    
    // توليد لون عشوائي بصيغة RGB
    generateRgbColor() {
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        return \`rgb(\${r}, \${g}, \${b})\`;
    }
    
    // توليد لون عشوائي بصيغة HSL
    generateHslColor() {
        const h = Math.floor(Math.random() * 360);
        const s = Math.floor(Math.random() * 100);
        const l = Math.floor(Math.random() * 100);
        return \`hsl(\${h}, \${s}%, \${l}%)\`;
    }
    
    // توليد مجموعة ألوان متناسقة
    generatePalette(count = 5) {
        const palette = [];
        const baseHue = Math.floor(Math.random() * 360);
        
        for (let i = 0; i < count; i++) {
            const hue = (baseHue + (i * 360 / count)) % 360;
            const saturation = 70 + Math.random() * 30;
            const lightness = 40 + Math.random() * 40;
            palette.push(\`hsl(\${Math.floor(hue)}, \${Math.floor(saturation)}%, \${Math.floor(lightness)}%)\`);
        }
        
        return palette;
    }
    
    // عرض الألوان
    displayColors() {
        console.log('🎨 مولد الألوان العشوائية');
        console.log('==========================');
        
        console.log('\\n🔸 ألوان فردية:');
        console.log('HEX:', this.generateHexColor());
        console.log('RGB:', this.generateRgbColor());
        console.log('HSL:', this.generateHslColor());
        
        console.log('\\n🎭 مجموعة ألوان متناسقة:');
        const palette = this.generatePalette();
        palette.forEach((color, index) => {
            console.log(\`اللون \${index + 1}: \${color}\`);
        });
        
        console.log('\\n💡 نصائح الألوان:');
        this.showColorTips();
    }
    
    showColorTips() {
        const tips = [
            'استخدم الألوان المتناسقة لتصميم أفضل',
            'الألوان الدافئة تعطي شعوراً بالطاقة',
            'الألوان الباردة تعطي شعوراً بالهدوء',
            'تجنب استخدام ألوان كثيرة في التصميم الواحد',
            'اختبر الألوان على خلفيات مختلفة'
        ];
        
        const randomTip = tips[Math.floor(Math.random() * tips.length)];
        console.log('💡', randomTip);
    }
}

// إنشاء مولد الألوان
const colorGen = new ColorGenerator();

// عرض الألوان
colorGen.displayColors();

// توليد ألوان جديدة كل 3 ثوان
console.log('\\n⚡ سيتم توليد ألوان جديدة كل 3 ثوان...');
setInterval(() => {
    console.log('\\n' + '='.repeat(50));
    colorGen.displayColors();
}, 3000);`,
            html: '',
            css: ''
        }
    };
    
    if (examples[exampleType]) {
        const example = examples[exampleType];
        jsEditor.value = example.js;
        htmlEditor.value = example.html;
        cssEditor.value = example.css;
        
        // تشغيل المثال تلقائياً
        setTimeout(() => {
            runPlaygroundCode();
        }, 500);
    }
}

// تهيئة تمييز الكود
function initializeSyntaxHighlighting() {
    // تطبيق تمييز الكود على جميع العناصر
    Prism.highlightAll();
}

// تهيئة الرسوم المتحركة
function initializeAnimations() {
    // مراقب التقاطع للرسوم المتحركة
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // مراقبة العناصر للرسوم المتحركة
    document.querySelectorAll('.intro-card, .example-item, .quick-example').forEach(el => {
        observer.observe(el);
    });
    
    // تأثيرات الماوس للبطاقات
    document.querySelectorAll('.intro-card, .example-item').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // تأثير الجسيمات للخلفية
    createParticles();
}

// إنشاء تأثير الجسيمات
function createParticles() {
    const hero = document.querySelector('.hero');
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles-container';
    particlesContainer.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1;
    `;
    
    hero.appendChild(particlesContainer);
    
    // إنشاء الجسيمات
    for (let i = 0; i < 50; i++) {
        createParticle(particlesContainer);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.style.cssText = `
        position: absolute;
        width: 4px;
        height: 4px;
        background: rgba(255, 255, 255, 0.6);
        border-radius: 50%;
        pointer-events: none;
    `;
    
    // موضع عشوائي
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    
    // حركة عشوائية
    const duration = 3000 + Math.random() * 4000;
    const delay = Math.random() * 2000;
    
    particle.style.animation = `particleFloat ${duration}ms ${delay}ms infinite linear`;
    
    container.appendChild(particle);
}

// إضافة CSS للجسيمات
const particleStyles = document.createElement('style');
particleStyles.textContent = `
    @keyframes particleFloat {
        0% {
            transform: translateY(100vh) translateX(0);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100px) translateX(${Math.random() * 200 - 100}px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(particleStyles);

// تأثيرات إضافية للتفاعل
document.addEventListener('mousemove', function(e) {
    const shapes = document.querySelectorAll('.shape');
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    shapes.forEach((shape, index) => {
        const speed = (index + 1) * 0.5;
        const x = (mouseX - 0.5) * speed;
        const y = (mouseY - 0.5) * speed;
        
        shape.style.transform = `translate(${x}px, ${y}px)`;
    });
});

// تأثير الكتابة للعناوين
function animateText(element) {
    const text = element.textContent;
    element.textContent = '';
    element.style.borderRight = '2px solid';
    
    let i = 0;
    const timer = setInterval(() => {
        element.textContent += text[i];
        i++;
        
        if (i === text.length) {
            clearInterval(timer);
            setTimeout(() => {
                element.style.borderRight = 'none';
            }, 500);
        }
    }, 100);
}

// تطبيق تأثيرات إضافية عند التحميل
window.addEventListener('load', function() {
    // تأثير ظهور تدريجي للصفحة
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
    
    // تأثيرات صوتية (اختيارية)
    addSoundEffects();
});

// إضافة تأثيرات صوتية
function addSoundEffects() {
    // يمكن إضافة أصوات للنقرات والتفاعلات
    document.querySelectorAll('.btn, .run-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            // تأثير بصري للنقر
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
}

// وظائف مساعدة إضافية
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#4ecdc4' : type === 'error' ? '#ff6b6b' : '#667eea'};
        color: white;
        padding: 15px 25px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// حفظ التقدم في التخزين المحلي
function saveProgress(section, completed = true) {
    const progress = JSON.parse(localStorage.getItem('jsLearningProgress') || '{}');
    progress[section] = {
        completed,
        timestamp: new Date().toISOString()
    };
    localStorage.setItem('jsLearningProgress', JSON.stringify(progress));
}

function getProgress() {
    return JSON.parse(localStorage.getItem('jsLearningProgress') || '{}');
}

// تهيئة نظام التقدم
function initializeProgressSystem() {
    const progress = getProgress();
    
    // عرض التقدم في واجهة المستخدم
    Object.keys(progress).forEach(section => {
        const element = document.querySelector(`[data-section="${section}"]`);
        if (element && progress[section].completed) {
            element.classList.add('completed');
        }
    });
}

