# Todo

- modify the navbar. ✅
- add a modal register for first time user.
- integrate upload thing.
- remove supabase from the app.
- add registration form ( autfill some data ).
- create admin dashboard with features like create event, add blog, send notifications, get  the list of candidates joined for the events , specific event analytics, user verification ( when user attend the event ), access management ( admin can give access to use r as volunteer ) 
- create volunteer dashboard with features like admin of specific event and can send notifications to registered user, user verification ( when user attend the event )

----------------------------ENV---------------------------------------------------------------------

# When adding additional environment variables, the schema in "/src/env.js"
# should be updated accordingly.

# Prisma
# https://www.prisma.io/docs/reference/database-reference/connection-urls#env

# 7cdaace7263995d12b3143a01c4d606dfa0876ecdeb938e0613f52b15eb53d15
BETTER_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_BASE_URL=http://localhost:3000

# Connect to Supabase via connection pooling with Supavisor.
DATABASE_URL="postgresql://EI_DB_owner:npg_dL4cWzfMisV1@ep-falling-hat-a1v9euec-pooler.ap-southeast-1.aws.neon.tech/EI_DB?sslmode=require"

# Direct connection to the database. Used for migrations.
DIRECT_URL="postgresql://postgres.hmrvazaoddsexmrgydqx:IrHDtp1dkYPKHEgT@aws-0-ap-south-1.pooler.supabase.com:5432
/postgres"
        

NEXT_PUBLIC_SUPABASE_URL=https://hmrvazaoddsexmrgydqx.supabase.co
NEXT_PUBLIC_SUPABASE_PROJECT_URL=https://hmrvazaoddsexmrgydqx.supabase.co

NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhtcnZhemFvZGRzZXhtcmd5ZHF4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg1MTY4MzgsImV4cCI6MjA1NDA5MjgzOH0.NIx471v_5AFsjPKbZV94eY8sTjccedrnUnpjAM285vY

NEXT_PUBLIC_SUPABASE_SERVICE_ROLE=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhtcnZhemFvZGRzZXhtcmd5ZHF4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczODUxNjgzOCwiZXhwIjoyMDU0MDkyODM4fQ.WhDIx_N0uNwwA_rkhDm9rua8Hl-qVJerNV7jrQ5lygY



NEXT_PUBLIC_PUBLIC_KEY="public_k0VCbyMihA4Jy4I/i9zjfe0fCwU="
NEXT_PUBLIC_URL_ENDPOINT=https://ik.imagekit.io/rolex9900
PRIVATE_KEY="private_IZ1xzklmkqZUy2aMBXmZeaS/RaU="

157.33.214.210


# TURSO_DATABASE_URL=libsql://ei-db-rolex.aws-ap-south-1.turso.io
TURSO_DATABASE_URL=libsql://ei-db-rolex.aws-ap-south-1.turso.io
TURSO_AUTH_TOKEN=eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3NDM1MzQ0NjAsImlkIjoiMmM0YjE1MWQtMTZhNy00MWI4LThjYzUtYmQwZDUyMjI2NDVmIiwicmlkIjoiMzMyY2M4YzQtZDExZS00YWFlLWI4MDEtOGQ2Mjg0NGUzN2E3In0.EowPDuENMS_e2JxRBIGBmQSUHhsnLbbAa_0V7GHrKFKTzhnglffJN4oKyU70-1XiLRf1PZgzKGydwh0lzVX6Ag
TURSO_DATABASE_ID=2c4b151d-16a7-41b8-8cc5-bd0d5222645f

# TURSO_DATABASE_URL=file:./data/dev.db

# Auth Secrets
AUTH_SECRET="xDUmuEe5jw0kLU/ipbcwwosJsDLH/g4fp4CiiagW468="

AUTH_GOOGLE_SECRET=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
AUTH_GOOGLE_ID=466142401983-rlrm5jue33dao35rtm11oo8kjh7riln2.apps.googleusercontent.com
AUTH_TRUST_HOST=true


# Posthog
NEXT_PUBLIC_POSTHOG_KEY=phc_9GIIuwpH8UgVmurpEa43JoCcBX5Q7SWayaezxU6VbWY
NEXT_PUBLIC_POSTHOG_HOST=https://us.i.posthog.com
