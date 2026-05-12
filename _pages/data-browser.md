---
title: "Data Browser"
permalink: /data-browser/
layout: single
author_profile: false
---

## EpiBarrier 跨癌种免疫排斥数据浏览

在这里，您可以交互式地探索我们研究中核心的泛癌免疫-上皮排斥数据。

<div id="zscore-chart" style="width:100%;height:500px;"></div>

<script src="https://cdn.plot.ly/plotly-latest.min.js"></script>
<script>
  // 这里是示例数据，你可以替换为从 /files/results.json 读取
  var cancer_types = ['BRCA', 'CRC', 'OV', 'CESC', 'LUAD'];
  var z_scores = [-84.5, -86.4, -39.4, -57.7, -20.8];
  var colors = ['#E41A1C', '#377EB8', '#4DAF4A', '#984EA3', '#FF7F00'];

  var trace = {
    x: cancer_types,
    y: z_scores,
    type: 'bar',
    marker: { color: colors },
    text: z_scores.map(String),
    textposition: 'auto',
  };

  var layout = {
    title: 'CD8⁺ T-cell Immune-Epithelial Exclusion Z-scores (Pan-Cancer)',
    yaxis: { title: 'Z-score (negative = exclusion)', zeroline: true },
    plot_bgcolor: '#f9f9f9',
    paper_bgcolor: '#ffffff'
  };

  Plotly.newPlot('zscore-chart', [trace], layout);
</script>

> 以上为示例图表。完整交互式数据查询和空间表达分布功能正在持续更新中。
