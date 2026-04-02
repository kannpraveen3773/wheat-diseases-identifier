const fs = require('fs');

const file = 'Frontend/dashboard.html';
let content = fs.readFileSync(file, 'utf8');
let lines = content.split('\n');

const newButtons = `                <button
                    class="flex flex-col items-center gap-2 p-6 rounded-2xl border-2 border-outline-variant/30 hover:border-primary/50 hover:bg-primary/5 transition-all"
                    onclick="selectLanguage('தமிழ்')">
                    <span class="text-lg font-black text-on-surface">தமிழ்</span>
                    <span class="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Tamil</span>
                </button>
                <button
                    class="flex flex-col items-center gap-2 p-6 rounded-2xl border-2 border-outline-variant/30 hover:border-primary/50 hover:bg-primary/5 transition-all"
                    onclick="selectLanguage('हिन्दी')">
                    <span class="text-lg font-black text-on-surface">हिन्दी</span>
                    <span class="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Hindi</span>
                </button>
                <button
                    class="flex flex-col items-center gap-2 p-6 rounded-2xl border-2 border-outline-variant/30 hover:border-primary/50 hover:bg-primary/5 transition-all"
                    onclick="selectLanguage('ਪੰਜਾਬੀ')">
                    <span class="text-lg font-black text-on-surface">ਪੰਜਾਬੀ</span>
                    <span class="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Punjabi</span>
                </button>
                <button
                    class="flex flex-col items-center gap-2 p-6 rounded-2xl border-2 border-outline-variant/30 hover:border-primary/50 hover:bg-primary/5 transition-all"
                    onclick="selectLanguage('తెలుగు')">
                    <span class="text-lg font-black text-on-surface">తెలుగు</span>
                    <span class="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Telugu</span>
                </button>
                <button
                    class="flex flex-col items-center gap-2 p-6 rounded-2xl border-2 border-outline-variant/30 hover:border-primary/50 hover:bg-primary/5 transition-all"
                    onclick="selectLanguage('ಕನ್ನಡ')">
                    <span class="text-lg font-black text-on-surface">ಕನ್ನಡ</span>
                    <span class="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Kannada</span>
                </button>`;

const newTranslations = `                'हिन्दी': {
                    detect: 'बीमारी का पता लगाएं',
                    headline: 'त्वरित फसल <br/><span class="text-primary">बुद्धिमत्ता।</span>',
                    subtext: 'बीमारियों की पहचान करने और सेकंडों में विशेषज्ञ उपचार योजनाएं प्राप्त करने के लिए अपने गेहूं के पत्तों की एक स्पष्ट तस्वीर अपलोड करें।',
                    upload: 'खेत की छवि अपलोड करें',
                    severity: 'गंभीरता: उच्च',
                    rust: 'गेहूं के पत्तों का रस्ट'
                },
                'தமிழ்': {
                    detect: 'நோயைக் கண்டறியவும்',
                    headline: 'உடனடி பயிர் <br/><span class="text-primary">அறிவுத்திறன்.</span>',
                    subtext: 'நோய்களைக் கண்டறிந்து வினாடிகளில் நிபுணர் சிகிச்சை திட்டங்களைப் பெற உங்கள் கோதுமை இலைகளின் தெளிவான புகைப்படத்தைப் பதிவேற்றவும்.',
                    upload: 'வயல் படத்தைப் பதிவேற்றவும்',
                    severity: 'தீவிரம்: அதிகம்',
                    rust: 'கோதுமை இலை துரு நோய்'
                },
                'ਪੰਜਾਬੀ': {
                    detect: 'ਬਿਮਾਰੀ ਦਾ ਪਤਾ ਲਗਾਓ',
                    headline: 'ਤੁਰੰਤ ਫਸਲ <br/><span class="text-primary">ਖੁਫੀਆ ਜਾਣਕਾਰੀ।</span>',
                    subtext: 'ਬਿਮਾਰੀਆਂ ਦੀ ਪਛਾਣ ਕਰਨ ਅਤੇ ਸਕਿੰਟਾਂ ਦੇ ਅੰਦਰ ਮਾਹਰ ਇਲਾਜ ਯੋਜਨਾਵਾਂ ਪ੍ਰਾਪਤ ਕਰਨ ਲਈ ਆਪਣੇ ਕਣਕ ਦੇ ਪੱਤਿਆਂ ਦੀ ਇੱਕ ਸਾਫ਼ ਫੋਟੋ ਅੱਪਲੋਡ ਕਰੋ।',
                    upload: 'ਖੇਤ ਦੀ ਫੋਟੋ ਅੱਪਲੋਡ ਕਰੋ',
                    severity: 'ਗੰਭੀਰਤਾ: ਉੱਚ',
                    rust: 'ਕਣਕ ਦੇ ਪੱਤੇ ਦੀ ਕੁੰਗੀ'
                },
                'తెలుగు': {
                    detect: 'వ్యాధిని గుర్తించండి',
                    headline: 'తక్షణ పంట <br/><span class="text-primary">మేధస్సు.</span>',
                    subtext: 'వ్యాధులను గుర్తించడానికి మరియు సెకన్లలో నిపుణుల చికిత్స ప్రణాళికలను స్వీకరించడానికి మీ గోధుమ ఆకుల స్పష్టమైన ఫోటోను అప్‌లోడ్ చేయండి.',
                    upload: 'క్షేత్ర చిత్రాన్ని అప్‌లోడ్ చేయండి',
                    severity: 'తీవ్రత: అధికం',
                    rust: 'గోధుమ ఆకు తుప్పు'
                },
                'ಕನ್ನಡ': {
                    detect: 'ರೋಗವನ್ನು ಪತ್ತೆಹಚ್ಚಿ',
                    headline: 'ತ್ವರಿತ ಬೆಳೆ <br/><span class="text-primary">ಬುದ್ಧಿಮತ್ತೆ.</span>',
                    subtext: 'ರೋಗಗಳನ್ನು ಗುರುತಿಸಲು ಮತ್ತು ಸೆಕೆಂಡುಗಳಲ್ಲಿ ತಜ್ಞರ ಚಿಕಿತ್ಸಾ ಯೋಜನೆಗಳನ್ನು ಪಡೆಯಲು ನಿಮ್ಮ ಗೋಧಿ ಎಲೆಗಳ ಸ್ಪಷ್ಟ ಫೋಟೋವನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ.',
                    upload: 'ಕ್ಷೇತ್ರದ ಚಿತ್ರವನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ',
                    severity: 'ತೀವ್ರತೆ: ಹೆಚ್ಚು',
                    rust: 'ಗೋಧಿ ಎಲೆ ತುಕ್ಕು'
                }`;

// Replace lines 106-135 with newButtons
lines.splice(105, 30, newButtons);

// Replace lines 386-427 (now offset by new array length)
// Wait, replacing 30 lines with 30 lines (since it's a string, it becomes 1 element unless we split).
lines = lines.join('\n').split('\n'); // re-normalize just in case

// Find index of `                'à¤¹à¤¿à¤¨à¥ à¤¦à¥€': {` or the offset
const translationsStart = lines.findIndex(l => l.includes('English') && l.includes('rust:')) + 2; 

const fullContent = fs.readFileSync(file, 'utf8');

// Regex replace instead of line numbers to be perfectly safe against offsets
let newContent = fullContent
    // Replace buttons
    .replace(/<button[\s\S]*?Tamil[\s\S]*?Kannada[\s\S]*?<\/button>/m, newButtons)
    // Replace translations
    .replace(/'[à-ÿ]{2,}': \{[\s\S]*?Kannada.*?rust:.*?\n\s*\}/m, newTranslations);

fs.writeFileSync(file, newContent, 'utf8');
console.log("Replaced successfully!");
