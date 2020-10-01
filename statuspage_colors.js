const page_colors = {
  "critical": "#e74c3c",
  "major": "#e67e22",
  "minor": "#f1c40f",
  "maintenance": "#3498DB",
  "none": "#333333"
};

const component_colors = {
  "operational": "#2FCC66",
  "degraded_performance": "#F1C40F",
  "partial_outage": "#E67E22",
  "major_outage": "#E74C3C",
  "under_maintenance": "#3498DB"
};

module.exports.pageStatusColor = function (status) {
  return page_colors[status] || page_colors["none"];
};

module.exports.componentStatusColor = function componentStatusColor(status) {
  return component_colors[status] || page_colors['none'];
};