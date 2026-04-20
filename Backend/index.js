const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
// 1. Importamos la NUEVA librería oficial
const { GoogleGenAI } = require('@google/genai');

dotenv.config();
console.log("¿El servidor encontró la llave?:", process.env.GEMINI_KEY ? "✅ SÍ, todo en orden" : "❌ NO, está vacía o no lee el archivo");
const app = express();
app.use(cors());
app.use(express.json());

// 2. Inicializamos con la nueva sintaxis (le pasamos tu llave del .env)
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_KEY });

// Ruta para procesar la IA
app.post('/api/ai/process', async (req, res) => {
    const { prompt } = req.body;
    try {
        // 3. Usamos el nuevo formato de llamada y el modelo Gemini 3 Flash
        const response = await ai.models.generateContent({
            model: "gemini-3-flash-preview", 
            contents: prompt,
        });

        // 4. Devolvemos el texto al Frontend
        res.json({ text: response.text });
        
    } catch (error) {
        // Mejoramos el registro de errores para ver exactamente qué falla
        console.error("❌ Error detallado en el servidor:", error.message);
        res.status(500).json({ error: "Fallo en la comunicación con la IA", detalle: error.message });
    }
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`✅ Servidor corriendo en http://localhost:${PORT} con el NUEVO SDK de Gemini`);
});