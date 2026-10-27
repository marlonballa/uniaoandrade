CREATE TABLE IF NOT EXISTS public.open_andrade_rate_limits (
  key_hash text PRIMARY KEY,
  window_started_at timestamptz NOT NULL,
  request_count integer NOT NULL CHECK (request_count > 0),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT open_andrade_rate_limit_key_hash_format
    CHECK (key_hash ~ '^[a-f0-9]{64}$')
);
