export const generarPromptAnalisis = (mensajeUsuario) => {
  return `Mensaje: "${mensajeUsuario}"
Responde con un JSON que indique la intención y el valor.
Ejemplos:
"paracetamol" → {"INTENCION": "buscar_medicamento", "VALOR": "paracetamol"}
"botica en Jesús María" → {"INTENCION": "buscar_botica_distrito", "VALOR": "Jesús María"}
"botica BTL" → {"INTENCION": "buscar_botica_nombre", "VALOR": "BTL"}
"¿Qué puedes hacer?" → {"INTENCION": "consultar_funcionalidades", "VALOR": "-"}
"¿Para qué sirves?" → {"INTENCION": "consultar_funcionalidades", "VALOR": "-"}
Desconocido → {"INTENCION": "desconocido", "VALOR": "-"}`;
};