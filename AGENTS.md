# Agent Instructions & Project Rules — Campus Verse

## 🚀 Git & GitHub Synchronization Rule
- **Primary Remote**: `origin` -> `https://github.com/Satvik-4web/campus-verse.git`
- **Production Branch**: `master`
- **Live Vercel URL**: `https://campus-verse-puce.vercel.app/`

### Mandatory Protocol: "Always Connect to GitHub"
1. **Always Keep in Sync**:
   - Before starting and immediately after finishing any code change, feature addition, or bugfix, the agent MUST ensure local and remote git repositories are connected and synchronized.
2. **Build Verification**:
   - Run `npm run build` to confirm code integrity before pushing.
3. **Commit & Push Immediately**:
   - Automatically stage, commit with a concise descriptive message, and push directly to `origin master`.
   - Never leave uncommitted changes or unpushed commits in the workspace.
4. **Vercel Deployment Guarantee**:
   - Pushing to `origin master` triggers Vercel's automated CI/CD pipeline, ensuring the kiosk and online users always access the latest production build.
