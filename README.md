# node-red-contrib-convert-1-0

Node-RED node that normalizes a payload to an internal `1`/`0` value and outputs it in a chosen format.

## Install

From your Node-RED user directory (usually `~/.node-red`):

```bash
npm install /path/to/node-red-convert-1-0
```

Or install via **Manage palette** → **Install** → search for `node-red-contrib-convert-1-0` (after publishing).

Restart Node-RED after install. The node appears in the **function** category as **convert 1/0**.

## Configuration

| Output | `msg.payload` |
|--------|---------------|
| String (1/0) | `"1"` / `"0"` |
| String (ON/OFF) | `"ON"` / `"OFF"` |
| Number (1/0) | `1` / `0` |
| Boolean | `true` / `false` |

## Input normalization

| Type | Rule |
|------|------|
| string | Lowercased and trimmed; `"1"` if one of: `online`, `true`, `on`, `1`, `open`, `opened`, `active`; otherwise `"0"` |
| number | `"1"` if not `0`, otherwise `"0"` |
| boolean | `"1"` if true, otherwise `"0"` |
| other | Left unchanged |

Side properties (for compatibility with the original subflow):

- `msg.payload_10` — normalized `"1"` / `"0"` (or original payload for other types)
- `msg.payload_bool` — `true` when `payload_10 === "1"`
