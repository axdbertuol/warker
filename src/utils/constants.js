export const GOOGLE_MAPS_KEY =
  // eslint-disable-next-line no-undef
  (process && process.env && process.env.GOOGLE_MAPS_KEY) || null;
export const types = {
  filtros: {
    MAIOR_RESERVATORIO: 'maior_reservatorio',
    MENOR_RESERVATORIO: 'menor_reservatorio',
    ALTA_AVAL: 'alta_avaliacao',
    BAIXA_AVAL: 'baixa_avaliacao',
  },
};
