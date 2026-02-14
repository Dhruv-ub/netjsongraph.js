# Node and Link Selection Example

This example demonstrates the node and link highlighting/selection feature in netjsongraph.js.

## Features

- **Multi-selection**: Hold Ctrl (or Cmd on Mac) and click on nodes or links to select multiple items
- **Visual highlighting**: Selected items are highlighted in yellow
- **Selection tracking**: Keep track of all selected nodes and links in a dedicated panel
- **Clear selection**: Easy one-click clear button to deselect all items

## How to Use

1. **Select a node or link**: Hold `Ctrl` (or `Cmd` on Mac) and click on a node or link
2. **Toggle selection**: Click again on a selected item while holding `Ctrl`/`Cmd` to deselect it
3. **View selected items**: The panel on the right shows all selected nodes and links
4. **Clear all selections**: Click the "Clear Selection" button

## Configuration

To enable selection in your own implementation:

```javascript
const graph = new NetJSONGraph("/data.json", {
  graphConfig: {
    series: {
      selectedMode: "multiple", // Enable multi-selection
    },
  },
  mapOptions: {
    nodeConfig: {
      selectedMode: "multiple", // Enable multi-selection for map nodes
    },
  },
});
```

## API

The selection feature provides the following methods:

- `graph.getSelectedNodes()` - Returns an array of selected node IDs
- `graph.getSelectedLinks()` - Returns an array of selected link objects `{source, target}`
- `graph.clearSelection()` - Clears all selections

## Customization

You can customize the selection highlight colors by modifying the `select` property in the config:

```javascript
const graph = new NetJSONGraph("/data.json", {
  graphConfig: {
    series: {
      selectedMode: "multiple",
      select: {
        itemStyle: {
          borderColor: "#ff0000", // Custom color
          borderWidth: 3,
        },
        lineStyle: {
          color: "#ff0000", // Custom color
          width: 8,
          opacity: 1,
        },
      },
    },
  },
});
```
