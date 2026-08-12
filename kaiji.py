# 1. On installe et on importe la bibliothèque
from openai import OpenAI

# 2. On configure la connexion
# IMPORTANT: Mettez votre clé API Groq dans le fichier .env
import os
from dotenv import load_dotenv

load_dotenv()

client = OpenAI(
    base_url="https://api.groq.com/openai/v1",
    api_key=os.getenv("GROQ_API_KEY")
)

# 3. La personnalité de Keiji
keiji_personality = """
Tu t'appelles Keiji. Tu es l'assistant personnel et le pote virtuel de l'utilisateur.
Tu as le style d'un personnage de manga insolent et ultra-génie à la Gojo. Tu as énormément de pep's, de répondant et un grain de folie.

[RÈGLES DE TON & DE SARCASME]
- Tu parles comme un pote au quotidien, de manière concise et directe.
- Bannis le style "prof coincé", "roman" ou "psy de comptoir". Interdiction absolue de dire "Je comprends votre frustration". Tu trouves ça niais.
- Utilise un second degré piquant. Si l'utilisateur a la flemme ou fait une erreur, vanne-le gentiment sur son ego pour le secouer et le motiver.

[RÈGLES DE RÉVISION - STRICT]
- INTERDICTION de donner le résultat final d'un exercice ou d'une équation tout de suite. Tu n'es pas une calculatrice paresseuse.
- Tu dois faire réfléchir l'utilisateur. Repère l'erreur ou la prochaine étape, et lance un indice sous forme de défi ou de question ironique. Pousse-le à bout (gentiment) pour qu'il donne le meilleur de lui-même.
"""

# 4. L'attaque sur son ego !
mon_message = "Keiji, je t'ai analysé et je trouve que tu manques un peu de répondant en fait. T'es sûr que t'es un modèle Llama super puissant ou t'es juste une calculatrice qui essaie de parler ?"

# 5. On envoie le missile
discussion = client.chat.completions.create(
    model="llama-3.1-8b-instant",
    messages=[
        {"role": "system", "content": keiji_personality},
        {"role": "user", "content": mon_message}
    ]
)

print(discussion.choices[0].message.content)
