const downloaded = ({
    label,themes,source,targetAudience,languages
}) => {
    window.gtag('event', 'Download', {
      "event_category":themes,
      "event_label": `label:${label}|languages:${languages}|source:${source}|targetAudience:${targetAudience}`,
    });
}
export default downloaded;