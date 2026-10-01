# Socket.IO Event Reference

| Event | Direction | Payload | Description |
| :--- | :--- | :--- | :--- |
| `ONLINE_COUNT` | Server -> Client | `number` | Active connected user count |
| `ISSUE_ADDED` | Server -> Client | `Issue` | Emitted when new incident is injected |
| `ISSUE_UPDATED` | Server -> Client | `Issue` | Emitted when incident changes status |
| `ISSUE_DELETED` | Server -> Client | `string` | Emitted when incident is removed |
| `REFRESH_ALL` | Server -> Client | `null` | Emitted when data is synchronized |
