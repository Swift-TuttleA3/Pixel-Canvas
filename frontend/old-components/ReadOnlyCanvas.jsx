import { Stage, Layer, Rect } from "react-konva";
import PropTypes from "prop-types";

const ReadOnlyCanvas = ({ rectangles }) => {
  return (
    <div>
      <Stage
        width={768}
        height={512}
        style={{ border: "5px solid black", cursor: "not-allowed" }}
      >
        <Layer>
          {rectangles.map((rect, index) => (
            <Rect
              key={index}
              x={rect.position_x}
              y={rect.position_y}
              width={1}
              height={1}
              fill={rect.color}
            />
          ))}
        </Layer>
      </Stage>
    </div>
  );
};

ReadOnlyCanvas.propTypes = {
  rectangles: PropTypes.array.isRequired,
};

export default ReadOnlyCanvas;