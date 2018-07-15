let indicator_colors = {
  "critical": "#e74c3c",
  "major": "#e67e22",
  "minor": "#f1c40f",
  "maintenance": "#3498DB",
  "none": "#333333"
};

module.exports = function (status) {
  return indicator_colors[status] || indicator_colors["none"];
};