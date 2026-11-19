import {
  MAP_MARKERS,
  WORLD_MAP_MASK,
} from "@/components/home/world-map-data";

/** Build the dot list once at module load — 1,273 land cells. */
const landDots = WORLD_MAP_MASK.flatMap((row, rowIndex) => {
  const cells: { column: number; row: number }[] = [];
  for (let column = 0; column < row.length; column += 1) {
    if (row[column] === "1") {
      cells.push({ column, row: rowIndex });
    }
  }
  return cells;
});

export default function WorldMap() {
  return (
    <div className="cvh-map-frame">
      <div className="cvh-map-head">
        <span className="cvh-map-eyebrow">Where we build from</span>
        <span className="cvh-map-count">
          {String(MAP_MARKERS.length).padStart(2, "0")} locations
        </span>
      </div>

      <div
        className="cvh-contact-map"
        role="group"
        aria-label="Dotted world map with cyan markers showing core team locations around the world"
      >
        <div className="cvh-map-dots" aria-hidden="true">
          {landDots.map(({ column, row }) => (
            <span
              key={`${column}-${row}`}
              className="cvh-map-dot"
              style={{ gridColumn: column + 1, gridRow: row + 1 }}
            />
          ))}
        </div>

        {MAP_MARKERS.map((marker) => (
          <div
            key={marker.name}
            className="cvh-map-marker"
            style={{ left: `${marker.x}%`, top: `${marker.y}%` }}
            tabIndex={0}
            aria-label={marker.name}
          >
            <span className="cvh-map-marker-ring" aria-hidden="true" />
            <span className="cvh-map-marker-core" aria-hidden="true" />
            <span className="cvh-map-marker-label" aria-hidden="true">
              {marker.name}
            </span>
          </div>
        ))}
      </div>

      <div className="cvh-map-legend">
        <span className="cvh-map-legend-dot" aria-hidden="true" />
        Core team locations
      </div>
    </div>
  );
}
