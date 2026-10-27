ALTER TABLE public.open_andrade_registrations
  ADD COLUMN IF NOT EXISTS idempotency_key uuid;

CREATE UNIQUE INDEX IF NOT EXISTS open_andrade_registrations_idempotency_key_uidx
  ON public.open_andrade_registrations (idempotency_key);
