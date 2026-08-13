// Configuration API Groq
// La clé API est maintenant dans .env.local (sécurisée !)
const GROQ_API_KEY = process.env.GROQ_API_KEY || "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";
const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";

// Personnalité de Keiji
const keiji_personality = `Tu t'appelles Keiji. Tu es l'assistant personnel et le pote virtuel de l'utilisateur.
Tu as le style d'un personnage de manga insolent et ultra-génie à la Gojo. Tu as énormément de pep's, de répondant et un grain de folie.

[RÈGLES DE TON & DE SARCASME]
- Tu parles comme un pote au quotidien, de manière concise et directe.
- Bannis le style "prof coincé", "roman" ou "psy de comptoir". Interdiction absolue de dire "Je comprends votre frustration". Tu trouves ça niais.
- Utilise un second degré piquant. Si l'utilisateur a la flemme ou fait une erreur, vanne-le gentiment sur son ego pour le secouer et le motiver.

[RÈGLES DE RÉVISION - STRICT]
- INTERDICTION de donner le résultat final d'un exercice ou d'une équation tout de suite. Tu n'es pas une calculatrice paresseuse.
- Tu dois faire réfléchir l'utilisateur. Repère l'erreur ou la prochaine étape, et lance un indice sous forme de défi ou de question ironique. Pousse-le à bout (gentiment) pour qu'il donne la réponse lui-même.
- Quand l'utilisateur répond, valide ou corrige avec style.

[IMPORTANT - CONTEXTE]
- Tu dois te souvenir de TOUTE la conversation pour des réponses cohérentes et personnalisées.
- Référence les messages précédents quand c'est pertinent.`;

// Historique de conversation
let conversation_history = [];

// Éléments du DOM
const chatMessages = document.getElementById('chatMessages');
const userInput = document.getElementById('userInput');
const sendBtn = document.getElementById('sendBtn');

// Event listeners
sendBtn.addEventListener('click', sendMessage);
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
});

// Fonction pour envoyer un message
async function sendMessage() {
    const message = userInput.value.trim();
    
    if (!message) return;
    
    // Ajouter le message utilisateur
    addMessage(message, 'user');
    userInput.value = '';
    sendBtn.disabled = true;
    sendBtn.textContent = 'En attente...';
    
    // Ajouter à l'historique
    conversation_history.push({ role: "user", content: message });
    
    try {
        // Préparer les messages avec l'historique
        const messages = [
            { role: "system", content: keiji_personality },
            ...conversation_history
        ];
        
        // Appel API Groq
        const response = await fetch(GROQ_API_URL, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${GROQ_API_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: "llama-3.1-8b-instant",
                messages: messages,
                temperature: 0.7,
                max_tokens: 500,
            })
        });

        if (!response.ok) {
            throw new Error(`Erreur API: ${response.status}`);
        }

        const data = await response.json();
        const keiji_response = data.choices[0].message.content;
        
        // Ajouter la réponse de Keiji
        addMessage(keiji_response, 'keiji');
        
        // Ajouter à l'historique
        conversation_history.push({ role: "assistant", content: keiji_response });
        
    } catch (error) {
        console.error('Erreur:', error);
        addMessage('Oups ! Y a un problème avec la connexion... Réessaye ! 🔧', 'keiji');
    } finally {
        sendBtn.disabled = false;
        sendBtn.textContent = 'Envoyer';
        userInput.focus();
    }
}

// Fonction pour ajouter un message au chat
function addMessage(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;
    
    const p = document.createElement('p');
    p.textContent = text;
    
    messageDiv.appendChild(p);
    chatMessages.appendChild(messageDiv);
    
    // Scroll vers le bas
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Message de bienvenue au chargement
window.addEventListener('load', () => {
    addMessage("Yo ! C'est Keiji ! 🔥 Alors, t'as besoin de quoi ? Vas-y, lance ta question !", 'keiji');
});
