ALTER TABLE public.open_andrade_registrations
  DROP CONSTRAINT IF EXISTS open_andrade_registration_fixed_amount;

ALTER TABLE public.open_andrade_registrations
  DROP CONSTRAINT IF EXISTS open_andrade_registration_amount_matches_modalities;

ALTER TABLE public.open_andrade_registrations
  ADD CONSTRAINT open_andrade_registration_amount_matches_modalities
  CHECK (
    amount_cents = CASE
      WHEN kyorugui AND poomsae THEN 4500
      ELSE 3000
    END
  );
