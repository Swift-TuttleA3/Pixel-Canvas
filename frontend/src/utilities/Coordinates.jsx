const Coordinates = ({ coordinates }) => {
  return (
    <div id="coordinates">
      X:   {Math.floor(coordinates.x * 2)} Y:   {Math.floor(coordinates.y * 2)}
     </div>
  );
};

export default Coordinates;
