import { useMemo } from "react";
import { useParams } from "react-router-dom";
import ShortsViewer from "../components/ShortsViewer";
import { mockReels } from "../../../assets/data/dummydata/Notio";

export default function ShortsViewerRoute() {
  const { id } = useParams();

  const activeId = useMemo(() => {
    const exists = mockReels.some((r) => r.id === id);
    return exists ? (id as string) : mockReels[0]?.id ?? "1";
  }, [id]);

  return (
    <ShortsViewer
      initialFeed={mockReels}
      initialActiveId={activeId}
      muted={true}
      onExit={() => window.history.back()}
    />
  );
}
