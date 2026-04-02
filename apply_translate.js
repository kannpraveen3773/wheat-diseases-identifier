const fs = require('fs');
const path = require('path');

const files = ['index.html', 'dashboard.html', 'diagnostics.html', 'disease_info.html', 'login.html', 'signup.html'];

const googleScript = `
<script type="text/javascript">
function googleTranslateElementInit() {
  new google.translate.TranslateElement({pageLanguage: 'en', includedLanguages: 'hi,ta,pa,te,kn,en', layout: google.translate.TranslateElement.InlineLayout.SIMPLE}, 'google_translate_element');
}
</script>
<script type="text/javascript" src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"></script>
</body>`;

const translateDiv = `<div id="google_translate_element" class="ml-4 flex items-center"></div>`;

for (const file of files) {
    const fullPath = path.join(__dirname, 'Frontend', file);
    if (!fs.existsSync(fullPath)) continue;
    
    let content = fs.readFileSync(fullPath, 'utf8');

    // 1. Remove old custom dashboard modal toggle button
    content = content.replace(/<div class="flex items-center gap-2 px-3 py\.5 rounded-full.*?onclick="toggleLanguageModal\(\)".*?<\/div>/s, translateDiv);

    // Also the exact string in dashboard.html
    const dashboardToggle = `<div class="flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-container-lowest border border-outline-variant/20 cursor-pointer hover:bg-emerald-50 transition-colors active:scale-95 transition-transform"
                onclick="toggleLanguageModal()">
                <span class="material-symbols-outlined text-emerald-600 text-lg" data-icon="language">language</span>
                <span class="font-label text-xs font-bold text-on-surface-variant" id="currentLangLabel">English</span>
                <span class="material-symbols-outlined text-on-surface-variant text-sm"
                    data-icon="expand_more">expand_more</span>
            </div>`;
    content = content.replace(dashboardToggle, translateDiv);

    // Remove old Language Modal and script from dashboard
    content = content.replace(/<!-- Language Selection Modal.*?<!-- Language Success Toast -->.*?<\/div>\s*<\/div>/s, '');
    content = content.replace(/<script>\s*function toggleLanguageModal.*?<\/script>/s, '');

    // 2. Remove language button in disease_info.html
    const diseaseToggle = `<button class="text-slate-600 dark:text-slate-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-colors p-2 rounded-full">
<span class="material-symbols-outlined" data-icon="language">language</span>
</button>`;
    content = content.replace(diseaseToggle, translateDiv);

    // 3. For index.html, signup.html, login.html: inject before closing header div or header tag
    if (!content.includes('id="google_translate_element"')) {
        // If there is a <div class="flex items-center gap-4"> right before </header>
        content = content.replace(/(<div class="flex items-center.*?)(<\/div>\s*<\/header>)/s, '$1\n            ' + translateDiv + '\n        $2');
    }
    
    // Ensure fallback just in case the above regex missed something:
    if (!content.includes('id="google_translate_element"')) {
        content = content.replace('</header>', '    ' + translateDiv + '\n</header>');
    }

    // 4. Inject script before </body>
    if (!content.includes('googleTranslateElementInit')) {
        content = content.replace(/<\/body>\s*(<\/html>)?/is, googleScript + '\n</html>');
    }

    fs.writeFileSync(fullPath, content, 'utf8');
    console.log(`Updated ${file}`);
}
