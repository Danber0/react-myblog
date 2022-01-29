import * as React from "react";
import ContentLoader from "react-content-loader";

export const ContentLoaded = (props) => (
  <ContentLoader
    style={{ margin: "40 30 0 30" }}
    speed={2}
    width={930}
    height={150}
    viewBox="0 0 930 150"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="5" y="7" rx="3" ry="3" width="196" height="19" />
    <rect x="5" y="33" rx="3" ry="3" width="275" height="40" />
    <rect x="7" y="90" rx="3" ry="3" width="140" height="16" />
    <rect x="800" y="12" rx="20" ry="20" width="84" height="94" />
    <rect x="439" y="58" rx="0" ry="0" width="6" height="0" />
    <rect x="4" y="122" rx="3" ry="3" width="111" height="25" />
    <rect x="172" y="89" rx="3" ry="3" width="28" height="16" />
    <rect x="123" y="121" rx="3" ry="3" width="120" height="26" />
  </ContentLoader>
);
