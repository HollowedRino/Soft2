export const formatearResultados = (resultados) => {
  if (!resultados || (Array.isArray(resultados) && resultados.length === 0)) {
    return "No se encontraron resultados.";
  }

  // Asegurarse de que siempre sea un array
  if (!Array.isArray(resultados)) resultados = [resultados];

  // Mostrar cada propiedad del objeto
  return resultados.map((item, index) => {
    const partes = [`Resultado ${index + 1}:`];
    
    for (const [clave, valor] of Object.entries(item)) {
      if (typeof valor === "object" && valor !== null) {
        // Subpropiedades (como Distrito)
        for (const [subClave, subValor] of Object.entries(valor)) {
          partes.push(`  ${clave}.${subClave}: ${subValor}`);
        }
      } else {
        partes.push(`${clave}: ${valor}`);
      }
    }

    return partes.join("\n");
  }).join("\n\n");
};
