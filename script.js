בסדר גמור! אני מבין שאת רוצה את קובץ ה-script.js המלא והעדכני ביותר, כדי לוודא ששום דבר לא חסר.

הנה קובץ ה-script.js המלא והשלם שאת צריכה להדביק לקובץ שלך. וודאי שאת מחליפה את כל התוכן הקיים בקובץ ה-script.js שלך בקוד הבא:

JavaScript

// הגדרת קלאס לבוט המנחה MathProblemGuidingBot
class MathProblemGuidingBot {
    constructor() {
        this.guidingQuestions = [
            "א. מהי השאלה המרכזית בבעיה? (מה צריך למצוא?)",
            "ב. אילו נתונים רלוונטיים קיימים בבעיה? (מה אני יודע?)",
            "ג. אילו נתונים או ידע חסרים לי לצורך פתרון? (מה אני לא יודע?)"
        ];
        this.currentQuestionIndex = 0;
        this.studentGuidingAnswers = {
            'א': "",
            'ב': "",
            'ג': ""
        };
        this.dialogStage = 'start';
        this.currentProblem = "דוגמה: אבא קנה 5 תפוחים ואמא קנתה 3 תפוחים. כמה תפוחים יש בסך הכל?";
    }

    // פונקציה להתחלת השיחה הראשונית של הבוט
    startConversationLogic() {
        let welcomeMessage = "שלום! אני כאן כדי לעזור לך לפתור בעיות מתמטיות.";
        welcomeMessage += "<br>אני לא אגלה לך את התשובות, אלא אנחה אותך לחשוב בעצמך.";
        welcomeMessage += "<br>זכור, ההבנה, הדרך והחשיבה – ולא רק התשובה – הם ליבת הלמידה.";
        this.postBotMessage(welcomeMessage);

        setTimeout(() => {
            this.postBotMessage(`הנה הבעיה שעלינו לפתור:<br>'${this.currentProblem}'`);
            this.dialogStage = 'asking_guiding_questions';
            setTimeout(() => {
                this.askGuidingQuestion();
            }, 1000);
        }, 1500);
    }

    // פונקציה לשאילת שאלות מנחות מהרשימה
    askGuidingQuestion() {
        if (this.currentQuestionIndex < this.guidingQuestions.length) {
            this.postBotMessage(this.guidingQuestions[this.currentQuestionIndex]);
        } else {
            this.postBotMessage("מעולה! סיימנו את השאלות המנחות.");
            this.postBotMessage("עכשיו, כשיש לך תמונה טובה יותר של הבעיה, בוא/י נחשוב על איך לתרגם אותה למתמטיקה.");
            this.dialogStage = 'problem_translation_help';
            setTimeout(() => {
                this.askForFirstStepInTranslation();
            }, 1000);
        }
    }

    // פונקציה לבקשת צעד ראשון בתרגום הבעיה
    askForFirstStepInTranslation() {
        this.postBotMessage("איך היית מתחיל/ה לתרגם את הבעיה הזו למספרים ופעולות חשבון?");
        this.postBotMessage("מה הדבר הראשון שהיית כותב/ת או מחשב/ת?");
    }

    // פונקציה לטיפול בקלט מהתלמיד ולמתן תגובה
    handleStudentInputLogic(userInput) {
        let botResponse = "";
        let nextAction = null;

        if (this.dialogStage === 'asking_guiding_questions') {
            const questionKeyMap = {0: 'א', 1: 'ב', 2: 'ג'};
            const currentKey = questionKeyMap[this.currentQuestionIndex];
            this.studentGuidingAnswers[currentKey] = userInput;
            botResponse = `תודה על התשובה. בוא/י נתקדם.`;

            if (currentKey === 'א') {
                if (userInput.length < 5 || !userInput.includes("כמה")) {
                    botResponse += "<br>נסה/נסי לנסח את השאלה המרכזית בצורה מדויקת יותר. מה בדיוק אנחנו רוצים לגלות בסוף?";
                } else {
                    botResponse += "<br>מעולה, זה עוזר לנו למקד את המטרה.";
                }
            } else if (currentKey === 'ב') {
                if (!/\d/.test(userInput)) {
                    botResponse += "<br>האם יש מספרים או כמויות שמצוינים בבעיה? נסה/נסי למצוא את כולם.";
                } else {
                    botResponse += "<br>יופי, זיהית את הנתונים החשובים.";
                }
            } else if (currentKey === 'ג') {
                if (userInput.includes("אין") || userInput.includes("כלום")) {
                    botResponse += "<br>האם בטוח שכל המידע שאתה צריך נמצא בבעיה? אולי צריך לדעת משהו נוסף?";
                } else {
                    botResponse += "<br>חשוב לבדוק אם חסר משהו לפני שמתחילים לפתור.";
                }
            }

            this.currentQuestionIndex++;
            nextAction = () => this.askGuidingQuestion();
        } else if (this.dialogStage === 'problem_translation_help') {
            const userInputLower = userInput.toLowerCase();
            botResponse = `אתה אומר: '${userInput}'.`;

            if (userInputLower.includes('חיבור') || userInputLower.includes('+') || userInputLower.includes('ועוד') || userInputLower.includes('יותר')) {
                botResponse += "<br>נשמע שאתה חושב על פעולת חיבור. למה דווקא חיבור במקרה הזה?";
            } else if (userInputLower.includes('חיסור') || userInputLower.includes('-') || userInputLower.includes('פחות')) {
                botResponse += "<br>אתה מציע חיסור. מה גורם לך לחשוב שזו הפעולה הנכונה כאן?";
            } else if (userInputLower.includes("מספרים") && !(['+', '-', '*', '/'].some(op => userInputLower.includes(op)))) {
                botResponse += "<br>השתמשת במספרים, וזה מצוין. איזו פעולה מתמטית אתה חושב שצריך לבצע איתם?";
            } else if (userInputLower.includes("לא יודע") || userInputLower.includes("קשה לי")) {
                botResponse += "<br>זה בסדר גמור להרגיש ככה. בוא/י ננסה לפשט. אם אבא קנה 5 תפוחים ואמא קנתה 3, ורוצים לדעת 'כמה יש בסך הכל' - איזו פעולה יכולה לאחד את הכמויות?";
            } else if (userInputLower.includes("תשובה") || userInputLower.includes("פתרון")) {
                botResponse += "<br>זכור, אני לא נותן תשובות. אני כאן כדי לעזור לך להבין את הדרך. מה הצעד הראשון *שלך* בפתרון?";
            } else {
                botResponse += "<br>מעניין. איך הגעת למחשבה הזו? מה עזר לך להבין את הקשר בין המילים למספרים בבעיה?";
            }
            botResponse += "<br>מהו ההיגיון שעומד מאחורי הדרך שבה בחרת?";
        }

        this.postBotMessage(botResponse);
        if (nextAction) {
            setTimeout(nextAction, 1500);
        }
    }

    // פונקציה להצגת הודעת בוט בתיבת הצ'אט
    postBotMessage(message) {
        const chatBox = document.getElementById('chat-box');
        const botMessageDiv = document.createElement('div');
        botMessageDiv.classList.add('message', 'bot-message');
        botMessageDiv.innerHTML = message;
        chatBox.appendChild(botMessageDiv);
        chatBox.scrollTop = chatBox.scrollHeight; // גלילה לתחתית הצ'אט
    }

    // פונקציה להצגת הודעת תלמיד בתיבת הצ'אט
    postStudentMessage(message) {
        const chatBox = document.getElementById('chat-box');
        const studentMessageDiv = document.createElement('div');
        studentMessageDiv.classList.add('message', 'student-message');
        studentMessageDiv.textContent = message;
        chatBox.appendChild(studentMessageDiv);
        chatBox.scrollTop = chatBox.scrollHeight; // גלילה לתחתית הצ'אט
    }
}

// יצירת מופע (אינסטנס) של הבוט
const myGuidingBot = new MathProblemGuidingBot();

// פונקציה להפעלת הצ'אט (מופעלת בלחיצה על כפתור "שנתחיל?")
function startChat() {
    // הסתרת מסך הפתיחה והצגת מיכל הצ'אט
    document.getElementById("welcome-screen").style.display = "none";
    document.getElementById("chat-container").style.display = "block";
    // התחלת הלוגיקה של הבוט המנחה
    myGuidingBot.startConversationLogic();
}

// פונקציה לשליחת הודעה (מופעלת בלחיצה על כפתור השליחה)
function sendMessage() {
    const userInputElement = document.getElementById("user-input");
    const input = userInputElement.value;

    // הצגת הודעת התלמיד בתיבת הצ'אט
    myGuidingBot.postStudentMessage(input); // הוספנו כאן את הצגת הודעת התלמיד

    if (!input.trim()) {
        myGuidingBot.postBotMessage("🤔 כתבי שאלה או תגובה כדי שאוכל לעזור.");
        return;
    }

    // טיפול בקלט המשתמש באמצעות לוגיקת הבוט המנחה
    myGuidingBot.handleStudentInputLogic(input);
    userInputElement.value = ""; // ניקוי שדה הקלט
}


// **מאזיני אירועים (Event Listeners) - אלו השורות הקריטיות!**
// אלו מחברים את כפתורי ה-HTML לפונקציות ה-JavaScript המתאימות.
document.addEventListener('DOMContentLoaded', () => {
    // מאזין לכפתור "שנתחיל?" במסך הפתיחה
    const startButton = document.getElementById('start-button');
    if (startButton) {
        startButton.addEventListener('click', startChat);
    }

    // מאזין לכפתור השליחה בתוך מסך הצ'אט
    const sendButton = document.getElementById('send-button');
    if (sendButton) {
        sendButton.addEventListener('click', sendMessage);
    }

    // אופציונלי: מאזין ללחיצה על Enter בשדה הקלט כדי לשלוח הודעה
    const userInput = document.getElementById('user-input');
    if (userInput) {
        userInput.addEventListener('keypress', (event) => {
            if (event.key === 'Enter') {
                sendMessage();
            }
        });
    }
});

