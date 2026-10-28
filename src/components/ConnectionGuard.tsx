import { Component, useSyncExternalStore, type ReactNode } from "react";
import { useLocation } from "react-router-dom";
import PageStatus from "../pages/PageStatus";

function subscribe(update: () => void) {
  window.addEventListener("online", update);
  window.addEventListener("offline", update);
  return () => { window.removeEventListener("online", update); window.removeEventListener("offline", update); };
}
const connected = () => navigator.onLine;

class PageLoadBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? <PageStatus mode={navigator.onLine ? "error" : "offline"} /> : this.props.children; }
}

export default function ConnectionGuard({ children }: { children: ReactNode }) {
  const online = useSyncExternalStore(subscribe, connected, () => true);
  const { pathname } = useLocation();
  return <>{!online && <PageStatus mode="offline" />}<div style={{ display: online ? "contents" : "none" }}><PageLoadBoundary key={pathname}>{children}</PageLoadBoundary></div></>;
}
