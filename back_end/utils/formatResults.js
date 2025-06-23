export const formatearResultados = (resultados, intencion = '') => {
  if (!resultados || (Array.isArray(resultados) && resultados.length === 0)) {
    return "No se encontraron resultados.";
  }

  if (!Array.isArray(resultados)) resultados = [resultados];

  return resultados.map((item, index) => {
    const partes = [`Resultado ${index + 1}:`];

    // Si la intención es buscar medicamento, mostrar toda la info detallada
    if (intencion === 'buscar_medicamento') {
      partes.push(`Nombre: ${item.nombre}`);
      partes.push(`Descripción: ${item.descripcion}`);
      partes.push(`Fabricante: ${item.fabricante}`);
      partes.push(`Categoría: ${item.categoria}`);
      partes.push(`Precio: S/ ${item.precio}`);
      partes.push(`Requiere receta: ${item.requiere_receta ? 'Sí' : 'No'}`);
      partes.push(`Disponible: ${item.estado_medicamento ? 'Sí' : 'No'}`);

      if (item.boticas && item.boticas.length > 0) {
        partes.push(`\nDisponible en boticas:`);

        item.boticas.forEach((botica, idx) => {
          partes.push(`  - ${botica.nombre} en ${botica.direccion}, ${botica.distrito?.nombre_distrito || 'distrito desconocido'}`);
          partes.push(`    Horario: ${botica.horario_apertura} a ${botica.horario_cierre}`);
          partes.push(`    Teléfono: ${botica.telefono_botica}`);
          partes.push(`    Stock: ${botica.inventario?.cantidad_disponible || 0} unidades`);
        });
      } else {
        partes.push(`No se encontraron boticas con stock disponible.`);
      }

    } else {
      // Formato genérico para otras intenciones
      for (const [clave, valor] of Object.entries(item)) {
        if (typeof valor === "object" && valor !== null) {
          for (const [subClave, subValor] of Object.entries(valor)) {
            partes.push(`  ${clave}.${subClave}: ${subValor}`);
          }
        } else {
          partes.push(`${clave}: ${valor}`);
        }
      }
    }

    return partes.join("\n");
  }).join("\n\n");
};
