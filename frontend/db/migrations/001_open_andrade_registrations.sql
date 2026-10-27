CREATE TABLE IF NOT EXISTS public.open_andrade_registrations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  responsible_name text NOT NULL,
  student_name text NOT NULL,
  kyorugui boolean NOT NULL DEFAULT false,
  poomsae boolean NOT NULL DEFAULT false,
  amount_cents integer NOT NULL DEFAULT 3000,
  payment_status text NOT NULL DEFAULT 'pending',
  created_at timestamptz NOT NULL DEFAULT now(),
  paid_at timestamptz,
  CONSTRAINT open_andrade_registration_has_modality
    CHECK (kyorugui OR poomsae),
  CONSTRAINT open_andrade_registration_fixed_amount
    CHECK (amount_cents = 3000),
  CONSTRAINT open_andrade_registration_payment_status
    CHECK (payment_status IN ('pending', 'paid')),
  CONSTRAINT open_andrade_registration_paid_at
    CHECK (
      (payment_status = 'pending' AND paid_at IS NULL)
      OR (payment_status = 'paid' AND paid_at IS NOT NULL)
    )
);

CREATE INDEX IF NOT EXISTS open_andrade_registrations_status_created_idx
  ON public.open_andrade_registrations (payment_status, created_at DESC);
