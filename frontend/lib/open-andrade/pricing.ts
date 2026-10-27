export const OPEN_ANDRADE_ONE_MODALITY_FEE_CENTS = 3000;
export const OPEN_ANDRADE_TWO_MODALITIES_FEE_CENTS = 4500;

export function getOpenAndradeFeeCents(kyorugui: boolean, poomsae: boolean) {
  return kyorugui && poomsae
    ? OPEN_ANDRADE_TWO_MODALITIES_FEE_CENTS
    : OPEN_ANDRADE_ONE_MODALITY_FEE_CENTS;
}
