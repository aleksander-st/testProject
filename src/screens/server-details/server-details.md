# Server Details

- Route: `/servers/vpn-ams-01`
- Figma: `LearnWorkspace DEMO`, node `91:241` (`Screen/ServerDetails`)
- Base components: `Button`, `Badge`, `Breadcrumb`, `Tabs`, `LinkItem`
- Shared domain composition: `ProductHeader`
- Local domain compositions: `ConfigItem`, `LoadMetric`, `MetricChart`, `EventRow`
- Mock data: server metadata, configuration and events come from `src/data/`; charts keep the visual Figma fixtures
- Assets: eight exact SVG chart layers exported from Figma and stored in `assets/`
- Behavior: dynamic server routes, console feedback, restart/stop/start states, period and tab switching, missing-server and empty-event states

Candidates for extraction after reuse on another screen: `ConfigItem`, `LoadMetric`, `MetricChart`, `EventRow`.
