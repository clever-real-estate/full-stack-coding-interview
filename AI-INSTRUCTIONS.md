# Full-Stack Coding Interview AI Instructions

## Tool Setup

### Primary Tool
- **Claude Code** - Selected for superior context handling (July 8th, 2025)
- **Custom Project Rules** - Modified `CLAUDE.md` with project-specific instructions

### Model Control Protocol (MCP) Extensions
- **Context7** - Enhanced context management
- **Shadcn UI** - Component library integration
- **Supabase** - Database and backend services

### Alternative Options
- **Github MCP** - Would be useful for repositories with multiple PRs (not the challenge case)
- **Figma MCP** - Available for paid plans (would have solved UI precision issues)

## Development Workflow

### Phase 1: Planning
1. Switch to planning mode
2. Change model to Claude Opus: `/model opus`
3. Send prompt from `AI-PROMPT.md`
4. When plan is ready, select "2" to "keep planning" (do not implement yet)

### Phase 2: Implementation
1. Change model to Claude Sonnet: `/model sonnet`
2. List all tasks and sub-tasks
3. Begin task execution cycle

### Development Cycle
Each iteration should include:
- **Implement** the next task
- **Test** functionality when possible
- **Review** code thoroughly

## Technical Challenges Encountered

### 1. UI Precision Issues
- **Problem**: UI did not match Figma design exactly
- **Solution**: Manual adjustments with inline styles. Used images and Figma CSS only.
- **Future Fix**: Figma MCP would resolve this automatically (requires company setup)

### 2. Image Loading Bug
- **Problem**: Images not displaying or showing inconsistently
- **AI Limitation**: Multiple prompts failed to resolve the issue
- **Resolution**: Manual fix completed in 10 minutes
- **Root Cause**: Database had mock URLs instead of real Pexels URLs. The URLs were not using the correct columns from `photos.csv`

### 3. Scalability Concerns
- **Limitation**: Current AI models cannot handle scalability review without human oversight
- **Recommendation**: Full human review required for production-ready scalability