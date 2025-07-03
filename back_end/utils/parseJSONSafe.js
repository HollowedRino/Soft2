export const parseJSONSafe = (str) => {
  try {
    return JSON.parse(str);
  } catch (e) {
    // Intenta arreglar respuestas mal formateadas
    try {
      const fixed = str
        .replace(/INTENCION/g, '"INTENCION"')
        .replace(/VALOR/g, '"VALOR"')
        .replace(/:\s*([^\n]+)/g, (match, p1) =>
          `: "${p1.replace(/"/g, "").trim()}"`
        );
      return JSON.parse(fixed);
    } catch (err) {
      return null;
    }
  }
};
