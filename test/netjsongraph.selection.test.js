/**
 * @jest-environment jsdom
 */

import NetJSONGraph from "../src/js/netjsongraph";

describe("Selection functionality", () => {
  const JSONFILE = "./spec/data/netjsongraph.json";
  let graph;

  beforeEach(() => {
    graph = new NetJSONGraph(JSONFILE, {
      render: "graph",
      graphConfig: {
        series: {
          selectedMode: "multiple",
        },
      },
    });
  });

  afterEach(() => {
    if (graph && graph.echarts) {
      graph.echarts.dispose();
    }
  });

  test("should have selection tracking initialized", () => {
    /* eslint-disable no-underscore-dangle */
    expect(graph._selection).toBeDefined();
    expect(graph._selection.nodes).toEqual([]);
    expect(graph._selection.links).toEqual([]);
    /* eslint-enable no-underscore-dangle */
  });

  test("should have selection methods", () => {
    expect(typeof graph.getSelectedNodes).toBe("function");
    expect(typeof graph.getSelectedLinks).toBe("function");
    expect(typeof graph.clearSelection).toBe("function");
  });

  test("getSelectedNodes should return empty array initially", () => {
    const selectedNodes = graph.getSelectedNodes();
    expect(Array.isArray(selectedNodes)).toBe(true);
    expect(selectedNodes.length).toBe(0);
  });

  test("getSelectedLinks should return empty array initially", () => {
    const selectedLinks = graph.getSelectedLinks();
    expect(Array.isArray(selectedLinks)).toBe(true);
    expect(selectedLinks.length).toBe(0);
  });

  test("clearSelection should reset selection arrays", () => {
    /* eslint-disable no-underscore-dangle */
    // Manually add some selections
    graph._selection.nodes.push("node1", "node2");
    graph._selection.links.push({source: "node1", target: "node2"});

    expect(graph.getSelectedNodes().length).toBe(2);
    expect(graph.getSelectedLinks().length).toBe(1);

    graph.clearSelection();

    expect(graph.getSelectedNodes().length).toBe(0);
    expect(graph.getSelectedLinks().length).toBe(0);
    /* eslint-enable no-underscore-dangle */
  });

  test("getSelectedNodes should return a copy, not the original array", () => {
    /* eslint-disable no-underscore-dangle */
    graph._selection.nodes.push("node1");
    const nodes1 = graph.getSelectedNodes();
    const nodes2 = graph.getSelectedNodes();

    expect(nodes1).toEqual(nodes2);
    expect(nodes1).not.toBe(nodes2);
    expect(nodes1).not.toBe(graph._selection.nodes);
    /* eslint-enable no-underscore-dangle */
  });

  test("getSelectedLinks should return a copy, not the original array", () => {
    /* eslint-disable no-underscore-dangle */
    const link = {source: "node1", target: "node2"};
    graph._selection.links.push(link);
    const links1 = graph.getSelectedLinks();
    const links2 = graph.getSelectedLinks();

    expect(links1).toEqual(links2);
    expect(links1).not.toBe(links2);
    expect(links1[0]).not.toBe(link);
    /* eslint-enable no-underscore-dangle */
  });

  test("should have selectedMode configured in graphConfig", () => {
    expect(graph.config.graphConfig.series.selectedMode).toBe("multiple");
  });

  test("should have select style configured in graphConfig", () => {
    expect(graph.config.graphConfig.series.select).toBeDefined();
    expect(graph.config.graphConfig.series.select.itemStyle).toBeDefined();
    expect(graph.config.graphConfig.series.select.lineStyle).toBeDefined();
  });

  test("should have select style configured in mapOptions", () => {
    expect(graph.config.mapOptions.nodeConfig.select).toBeDefined();
    expect(graph.config.mapOptions.linkConfig.select).toBeDefined();
  });
});
