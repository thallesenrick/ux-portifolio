import type { projects } from "../../data/projects";

export default function ProjectPreview({ tone }: { tone: (typeof projects)[number]["tone"] }) {
  return <div className={`project-preview project-preview--${tone}`} aria-hidden="true">
    <div className="preview-browser">
      <div className="preview-toolbar"><i /><i /><i /><span /></div>
      {tone === "sand" ? <div className="preview-portfolio"><div><small>DESIGN / DEVELOP</small><strong>Make it<br />meaningful.</strong><span /></div><div className="preview-portrait"><i /></div></div>
        : tone === "lavender" ? <div className="preview-dashboard"><aside><i /><i /><i /><i /></aside><div><div className="preview-stats"><i /><i /><i /></div><div className="preview-chart">{[35,65,48,85,62,95,74].map((height,index)=><i key={index} style={{height: height + "%"}} />)}</div></div></div>
        : <div className="preview-shop"><div className="preview-product"><span /></div><div><small>EVERYDAY OBJECTS</small><strong>Less, but<br />better.</strong><i /><b /></div></div>}
    </div>
  </div>;
}
