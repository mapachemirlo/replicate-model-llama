# 🤖 Replicate AI Chat

Chat web con modelos Llama 2 70B y Mistral 7B usando [Replicate](https://replicate.com/).  
¡Conversá con IA de última generación desde tu navegador!

![Demo UI](https://user-images.githubusercontent.com/placeholder/demo.png)

---

## 🚀 Características

- **Modelos disponibles:**  
  - 🦙 Llama 2 70B (Meta)
  - ⚡ Mistral 7B (Mistral AI)
- Interfaz web moderna y responsiva
- Ajuste de temperatura y tokens máximos
- Fácil de desplegar localmente

---

## 🛠️ Instalación

1. **Clona el repositorio:**
   ```sh
   git clone https://github.com/tuusuario/replicate-ai-chat.git
   cd replicate-ai-chat
   ```

2. **Instala dependencias:**
   ```sh
   npm install
   ```

3. **Configura tu archivo `.env`:**
   - Copia `.env.example` a `.env`
   - Agrega tu token de Replicate:
     ```
     REPLICATE_API_TOKEN=tu_token_aqui
     PORT=3000
     ```

4. **Inicia la app:**
   ```sh
   npm start
   ```

5. **Abre en tu navegador:**  
   [http://localhost:3000](http://localhost:3000)

---

## 📁 Estructura del proyecto

```
.env
.env.example
.gitignore
app.js
package.json
README.md
public/
  index.html
```

---

## ⚙️ Variables de entorno

- `REPLICATE_API_TOKEN`: Tu token de [Replicate](https://replicate.com/account/api-tokens)
- `PORT`: Puerto para el servidor (opcional, por defecto 3000)

---

## 📝 Notas

- El modelo **Mistral** puede ser menos estable que Llama.
- Si no tienes token, crea una cuenta gratis en [Replicate](https://replicate.com/).
- El frontend está en [`public/index.html`](public/index.html), el backend en [`app.js`](app.js).

---

## 📄 License

MIT License. See `LICENSE` file for details.



