# 🤖 Kaiji - Assistant Virtuel Personnel

Bienvenue ! Ceci est le code de **Kaiji**, ton assistant personnel insolent et ultra-génie ! 

## 📋 Prérequis

- Python 3.8+
- Une clé API Groq (gratuite sur https://console.groq.com)

## 🚀 Installation

### 1. Clone le dépôt
```bash
git clone https://github.com/sandrinahbototarezy-cell/Boss_At_17.git
cd Boss_At_17
git checkout boss_at_17.ipynb
```

### 2. Installe les dépendances
```bash
pip install openai python-dotenv
```

### 3. Configure ta clé API
- Copie le fichier `.env.example` en `.env`
- Ouvre `.env` et mets ta vraie clé Groq :
```
GROQ_API_KEY=gsk_xxxxxxxxxxxxxxxxxx
```

### 4. Lance Kaiji
```bash
python kaiji.py
```

## ⚠️ IMPORTANT - Sécurité

**Ne JAMAIS commit ta clé API sur GitHub !** Le fichier `.env` est ignoré par `.gitignore`, donc tu es en sécurité. 

Ta clé reste :
- ✅ Locale sur ton ordi/téléphone
- ✅ Protégée
- ✅ Prête à l'emploi

## 📝 Notes

- Kaiji utilise le modèle `llama-3.1-8b-instant` de Groq
- Le style est manga insolent type Gojo
- Il aide à réviser en donnant des indices au lieu de réponses toutes faites

---

**Bon courage avec Kaiji ! 🔥**
