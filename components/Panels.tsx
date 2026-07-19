import { panels } from "@/lib/content";
import DocStack from "@/components/DocStack";
import NetWorthChart from "@/components/NetWorthChart";

export default function Panels() {
  return (
    <div className="panels">
      <div className="panel light cream">
        <DocStack items={panels.left.docRow} />
        <h3>{panels.left.title}</h3>
        <p>{panels.left.description}</p>
        <div className="learn">{panels.left.learnLabel}</div>
      </div>

      <div className="panel center">
        <div className="center-brand">{panels.center.brand}</div>
        <div className="center-art">
          <NetWorthChart syncedLabel={panels.center.syncedLabel} />
        </div>
        <div className="center-foot">{panels.center.footLabel}</div>
      </div>

      <div className="panel light lavender">
        <DocStack items={panels.right.docRow} />
        <h3>{panels.right.title}</h3>
        <p>{panels.right.description}</p>
        <div className="learn">{panels.right.learnLabel}</div>
      </div>
    </div>
  );
}
