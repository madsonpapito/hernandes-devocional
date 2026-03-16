# App UI/UX: Hernandes Dias Lopes Devotional (PWA)

## Core User Flow
1. **Login**: Simple email/password (Supabase Auth).
2. **Dashboard (Jornada Diária)**: Large, beautiful card for today's devocional.
3. **Devocional View**: Scripture -> Commentary (Audio/Text) -> Prayer.
4. **Library**: Search/Browse past studies and series.
5. **Profile/Streaks**: See your daily habit progress.

## Screens (Mobile-First)

### 1. Dashboard (Home)
- **Top Bar**: Avatar, Streaks (🔥 12 days).
- **Greeting**: "Bom dia, [Nome]. Vamos mergulhar na Palavra?"
- **Today's Card**: Background image of a peaceful landscape. 
    - Text: "A Soberania de Deus" (Romanos 8:28).
    - Action: "Começar Devocional".
- **Bottom Navigation**: Home, Biblioteca, Orações, Perfil.

### 2. Devocional Player
- **Top Bar**: Back button, Share button.
- **Audio Player (Mini)**: Fixed at the top or bottom once started. Play/Pause, 15s Rewind/Forward.
- **Content Flow**:
    - **Leitura**: Text of the Bible verse (Large, readable font).
    - **Comentário**: The core expository text by Hernandes Dias Lopes.
    - **Oração Meditada**: A guided prayer text or audio.

### 3. Biblioteca (Library)
- **Categories**: Series (Romanos, Salmos, Gálatas), Tópicos (Família, Ansiedade, Perdão).
- **Format**: Grid of cards with high-quality thumbnails.

### 4. Perfil (Profile)
- **Stats**: Total devotionals completed, Current Streak, Badges.
- **Settings**: Notification times, Account, Logout.

## UI Principles
- **Dark Mode by Default**: Easier on the eyes for early morning or late night devotionals.
- **Typography**: Focus on readability (Serif for long texts).
- **Minimalist**: No clutter. The focus is the Word and the Commentary.
- **Haptic Feedback**: Subtle feedback for completing a step.
