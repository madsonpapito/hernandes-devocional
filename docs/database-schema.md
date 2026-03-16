# Database Schema (Supabase / PostgreSQL)

## Table: profiles
Stores user-specific metadata.
- `id`: uuid (references auth.users.id)
- `full_name`: text
- `avatar_url`: text
- `current_streak`: integer (default 0)
- `last_devotional_at`: timestamp with time zone
- `subscription_status`: text (free, premium, cancelled)
- `subscription_ends_at`: timestamp with time zone

## Table: devotionals
The core content items.
- `id`: uuid (primary key)
- `title`: text
- `slug`: text (unique)
- `scripture_reference`: text (e.g., "Romanos 8:28")
- `scripture_text`: text
- `commentary_text`: text
- `audio_url`: text (link to storage bucket)
- `prayer_text`: text
- `image_url`: text
- `publish_date`: date (for the daily path)
- `series_id`: uuid (references series.id)
- `is_premium`: boolean (default true)

## Table: series
Groups of devotionals.
- `id`: uuid (primary key)
- `name`: text
- `description`: text
- `thumbnail_url`: text
- `is_active`: boolean (default true)

## Table: user_progress
Tracks which devotionals each user has completed.
- `id`: uuid (primary key)
- `user_id`: uuid (references auth.users.id)
- `devotional_id`: uuid (references devotionals.id)
- `completed_at`: timestamp with time zone (default now())

## Table: subscriptions
Tracks payments and membership.
- `id`: uuid (primary key)
- `user_id`: uuid (references auth.users.id)
- `provider`: text (hotmart, stripe)
- `provider_subscription_id`: text
- `status`: text (active, trialing, past_due, canceled)
- `plan_id`: text
- `amount`: integer
- `currency`: text

## Policies (RLS)
- **profiles**: Users can only read/update their own profile.
- **devotionals**: All authenticated users can read. Premium content restricted via application logic or Supabase Edge Functions.
- **user_progress**: Users can only read/insert their own progress.
- **series**: All authenticated users can read.
