# Dashboard

- Route: `/dashboard`
- Figma: `LearnWorkspace DEMO`, node `86:199` (`Screen/Dashboard`)
- Base components: `Button`, `Badge`, `LinkItem`
- Shared domain composition: `ProductHeader`
- Local domain compositions: `StatCard`, `ServerCard`, `ActivityRow`
- Mock data: balance, forecast, servers and operations come from `src/data/`
- Behavior: create-server navigation, server-details links, demo top-up, restart-all loading state, service-status Toast, empty and low-balance states

Candidates for extraction after reuse on another screen: `StatCard`, `ServerCard`, `ActivityRow`.
