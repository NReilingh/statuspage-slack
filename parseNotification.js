const impact_color = {
  "none": "#333333",
  "minor": "#F1C40F",
  "major": "#E67E22",
  "critical": "#E74C3C",
  "maintenance": "#3498DB",
};

const status_color = {
  "operational": "#2FCC66",
  "degraded_performance": impact_color.minor,
  "partial_outage": impact_color.major,
  "major_outage": impact_color.critical,
  "under_maintenance": impact_color.maintenance
};

module.exports = function parseNotification(payload) {
  let notificationType;
  let attachment;

  if (payload.component)
  {
    with (payload.component) {
      notificationType = 'component';
      attachment = {
        color: status_color[status],
        fallback: `${name}: [${status}]`,
        fields: [
          {
            title: name,
            value: status.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
          }
        ]
      };
    }
  }
  else if (payload.incident)
  {
    const incident_status_color = {
      "scheduled": impact_color.none,
      "in_progress": status_color.under_maintenance,
      "verifying": status_color.under_maintenance,
      "completed": status_color.operational,
      "investigating": impact_color[payload.incident.impact],
      "identified": impact_color[payload.incident.impact],
      "monitoring": status_color.under_maintenance,
      "resolved": status_color.operational
    };
    with (payload.incident) {
      notificationType = 'incident';
      attachment = {
        color: incident_status_color[status],
        fallback: `[${status}]: ${name}` + (['investigating', 'identified'].includes(status) ? ` [${impact}]` : ''),
        title: `${name} [${status}]`,
        title_link: shortlink,
        text: incident_updates[0].body
      };
    }
  }

  return {
    type: notificationType,
    page_status: payload.page.status_description,
    attachment: attachment
  };
};
