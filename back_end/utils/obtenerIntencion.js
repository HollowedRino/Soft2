import { genAI } from "../configs/gemini.js";
import { generarPromptAnalisis } from "../prompts/generarPromptAnalisis.js";
import { extractJson } from "./extractJson.js";
import { parseJSONSafe } from "./parseJSONSafe.js";

export const obtenerIntencion = async(mensajeUsuario) => {
  const prompt = generarPromptAnalisis(mensajeUsuario);

  const response = await genAI.models.generateContent({
    model: "gemini-2.0-flash-lite",
    contents: prompt,
    config: {
      responseMimeType: "application/json"
    }
  });
  console.log(response);
  const text = response.candidates[0].content.parts[0].text;
  console.log("Texto generado por Gemini:", text);
  return parseJSONSafe(extractJson(text));
}