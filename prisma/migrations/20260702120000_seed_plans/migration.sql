-- Seed the fixed plan catalogue. The portal reads plans from this table, so
-- without these rows the admin "assign plan" dropdown and the client "upgrade /
-- compare packages" page are empty. Idempotent (ON CONFLICT DO NOTHING) so it is
-- safe to re-run and never clobbers manually-edited rows. Text here is the
-- canonical German fallback; the portal localises name/description/features by
-- `key` at render time (see src/lib/portal-i18n.ts).
INSERT INTO "Plan" ("id", "key", "name", "priceChf", "description", "features", "sortOrder") VALUES
  ('plan_free',         'free',         'Free',                0,    'Kostenloser Zugang zum Kundenportal.',                     ARRAY['Portal-Zugang','System-Übersicht','1 kostenloser Service'],                                                             0),
  ('plan_starter',      'starter',      'Einzelpraxis',        500,  'Für Einzelpraxen, die zuverlässigen IT-Support brauchen.', ARRAY['Remote IT-Support','Basis-Monitoring','E-Mail-Konfiguration','Monatlicher Statusbericht','Backup-Management'],          1),
  ('plan_professional', 'professional', 'Gemeinschaftspraxis', 1200, 'Für Gemeinschaftspraxen mit erweiterten Anforderungen.',   ARRAY['Alles aus Starter','Vor-Ort-Support','VLAN & VPN Setup','tomedo-Integration','Cybersecurity-Audit'],                     2),
  ('plan_enterprise',   'enterprise',   'Ärztezentrum',        2500, 'Für Ärztezentren mit mehreren Standorten.',                ARRAY['Alles aus Professional','Multi-Standort-VPN','Labor-Middleware','24/7 Priority-Support','Dedizierter Ansprechpartner'], 3)
ON CONFLICT ("key") DO NOTHING;
