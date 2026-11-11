CREATE TABLE IF NOT EXISTS public.blog_donjak_editor_state (
  slug text PRIMARY KEY CHECK (slug = 'kibon-donjak-faixas-coloridas'),
  state jsonb NOT NULL,
  revision integer NOT NULL DEFAULT 1 CHECK (revision > 0),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CHECK (jsonb_typeof(state) = 'object')
);
