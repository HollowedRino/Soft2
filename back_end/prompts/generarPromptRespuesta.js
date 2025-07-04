export const generarPromptRespuesta = (intencion, valor, resultadosTexto, lastMessage) => {
  return `Eres un asistente que puede ayudar a los usuarios con lo siguiente:
- Buscar medicamentos por nombre.
- Buscar boticas por nombre o distrito.
Mensaje anterior: ${lastMessage}
Intención: ${intencion}
Valor: ${valor}
Resultados:
${resultadosTexto}

Redacta una respuesta breve, clara y amable con base en los resultados. No uses viñetas (*), negritas (**), emojis, ni formato markdown.
Solo usa texto plano. Si no hay resultados, avisa con cortesía.`;
};