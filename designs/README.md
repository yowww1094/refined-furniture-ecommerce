# Design Reference

This folder contains the raw Figma file for the Furniture Ecommerce design.

## Source
- Figma file: https://www.figma.com/design/BeEUrHJor6K0Ps57054c2m/Furniture-Ecommerce?node-id=0-1
- Accessed via personal access token with file_read permissions.

## Contents
- `figma.json`: The full JSON export of the Figma file (approx 2.9 MB). Contains all pages, components, styles, and assets.

## Usage
You can inspect this file to extract visual specs, dimensions, colors, typography, and component layouts for implementing the UI in the Next.js application.

### Quick extraction examples (if you have jq or python):
```bash
# List all frame names (requires jq)
jq -r '.. | objects | select(.type=="FRAME")?.name? // empty' figma.json | sort -u

# Or using Python (if available)
python -c "import json; data=json.load(open('figma.json')); \
def walk(n): \
  if isinstance(n,dict): \
    if n.get('type')=='FRAME' and 'name' in n: print(n['name']); \
    [v for v in n.values() if isinstance(v,(list,dict)) and isinstance(v,list) and [walk(i) for i in v] or [v for v in n.values() if isinstance(v,dict) and [walk(v)]]"; \
  elif isinstance(n,list): [walk(i) for i in n]; \
walk(data)"
```

### Notes
- The file is minified (single line). Use a JSON formatter or viewer for easier navigation.
- Ensure you keep the token secure; do not commit it to the repository.