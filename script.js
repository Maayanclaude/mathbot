function startChat() {
  document.getElementById("welcome").style.display = "none";
  document.getElementById("chat").style.display = "block";
}

function sendMessage() {
  const input = document.getElementById("userInput").value;
  const bubble = document.getElementById("chatBubble");

  if (!input.trim()) {
    bubble.innerText = "🤔 כתבי שאלה כדי שאתחיל לעזור.";
    return;
  }

  bubble.innerText = "חושבת על זה... 🤓";

  // שלב ראשון - רק מציגה את מה שהמשתמש כתב
  setTimeout(() => {
    bubble.innerText = `שאלת: "${input}"\n\n (בהמשך אענה עם GPT 😄)`;
    document.getElementById("userInput").value = "";
  }, 1000);
}
