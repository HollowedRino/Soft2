import { genAI } from "../configs/gemini.js";
import { extractJson } from "./extractJson.js";
import { parseJSONSafe } from "./parseJSONSafe.js";

export const obtenerRespuestaRedactada = async (prompt) => {
    console.log(prompt)
    const response = await genAI.models.generateContent({
        model: "gemini-2.0-flash-lite",
        contents: prompt
    });
    console.log(response)
    const text = response.candidates[0].content.parts[0].text;
    console.log("Texto generado por Gemini:", text);
    return text;
};