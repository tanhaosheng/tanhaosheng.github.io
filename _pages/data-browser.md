---
title: "Data Browser"
permalink: /data-browser/
layout: single
author_profile: false
---

## Interactive Pan-Cancer Immune Exclusion Data

Explore key findings from the EpiBarrier study. This bar chart shows the CD8⁺ T-cell immune‑epithelial exclusion Z‑score across five representative cancer types. A more negative Z‑score indicates stronger active exclusion of CD8⁺ T cells from the tumor epithelial compartment.

<div id="zscore-chart" style="width:100%; height:500px;"></div>

<!-- Load Plotly.js -->
<script src="https://cdn.plot.ly/plotly-latest.min.js"></script>
<script>
  // Sample data – replace with dynamic loading from /files/results.json when ready
  const cancerTypes = ['BRCA', 'CRC', 'OV', 'CESC', 'LUAD'];
  const zScores = [-84.5, -86.4, -39.4, -57.7, -20.8];
  const colors = ['#E41A1C', '#377EB8', '#4DAF4A', '#984EA3', '#FF7F00'];

  const data = [{
    x: cancerTypes,
    y: zScores,
    type: 'bar',
    marker: { color: colors },
    text: zScores.map(String),
    textposition: 'auto',
  }];

  const layout = {
    title: {
      text: 'CD8⁺ T-cell Immune–Epithelial Exclusion Z‑scores (Pan‑Cancer)',
      font: { size: 18 }
    },
    yaxis: {
      title: 'Z‑score (negative = active exclusion)',
      zeroline: true
    },
    xaxis: {
      title: 'Cancer type'
    },
    plot_bgcolor: '#f9f9f9',
    paper_bgcolor: '#ffffff'
  };

  const config = {
    responsive: true,
    displayModeBar: true,
    modeBarButtonsToRemove: ['lasso2d', 'select2d']
  };

  Plotly.newPlot('zscore-chart', data, layout, config);
</script>

> **Note:** The chart above shows representative Z‑scores. Full interactive query functionality (e.g., search by gene, cell type, or sample) and spatial expression viewers are under active development and will be available soon.
