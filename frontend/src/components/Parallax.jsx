import {
  MouseParallaxContainer,
  MouseParallaxChild,
} from "react-parallax-mouse";

const pixelArr = [
  {
    size: 6,
    factor: 0.06,
  },
  {
    size: 12,
    factor: 0.12,
  },
  {
    size: 18,
    factor: 0.18,
  },
  {
    size: 24,
    factor: 0.24,
  },
  {
    size: 30,
    factor: 0.3,
  },
];

let renderArr = [];
const pixelCount = 50;
for (let i = 0; i < pixelCount; i++) {
  renderArr.push(pixelArr[Math.floor(Math.random() * pixelArr.length)]);
}

renderArr.sort((a, b) => a.size - b.size);

const colors = [
  "rgba(113, 124, 179, 1)",
  "rgba(209, 100, 91, 1)",
  "rgba(231, 200, 140, 1)",
  "rgba(240, 154, 100, 1)",
  "rgba(50, 150, 148, 1)",
  "rgba(148, 93, 78, 1)",
  "rgba(235, 140, 128, 1)",
];

function getRandomColor() {
  const randNum = Math.floor(Math.random() * colors.length);
  return colors[randNum];
}

const Parallax = () => {
  return (
    <>
      <MouseParallaxContainer
        containerStyle={{
          width: "100dvw",
          height: "100dvh",
        }}
      >
        {renderArr.map((pixel, index) => (
          <MouseParallaxChild
            key={`childComp ${index}`}
            factorX={pixel.factor}
            factorY={pixel.factor}
          >
            <div
              key={`div ${index}`}
              style={{
                width: `${pixel.size}px`,
                height: `${pixel.size}px`,
                backgroundColor: `${getRandomColor(colors)}`,
                position: "absolute",
                top: `${Math.floor(Math.random() * window.innerHeight)}px`,
                left: `${Math.floor(Math.random() * window.innerWidth)}px`,
              }}
            ></div>
          </MouseParallaxChild>
        ))}
      </MouseParallaxContainer>
    </>
  );
};

export default Parallax;
