import { useTexture } from "@react-three/drei";
import { useHeightfield } from "@react-three/cannon";
import { useAsset } from "use-asset";

const canvas = document.createElement("canvas");
const context = canvas.getContext("2d");
if (context) context.imageSmoothingEnabled = false;

/**
 * Returns matrix data to be passed to heightfield.
 * set elementSize as `size` / matrix[0].length (image width)
 * and rotate heightfield to match (rotation.x = -Math.PI/2)
 */
function createHeightfieldMatrix(image) {
  if (!context) {
    throw new Error("Heightfield could not be created");
  }
  const width = image.width;
  const height = image.height;
  const matrix = Array(width);
  const row = Array(height);
  const scale = 40; // determines the vertical scale of the heightmap
  let p;

  canvas.width = width;
  canvas.height = height;
  context.drawImage(image, 0, 0, width, height);

  const { data } = context.getImageData(0, 0, width, height);

  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      // pixel data is [r, g, b, alpha]
      // since image is in b/w -> any rgb val
      p = (data[4 * (y * width + x)] * scale) / 255;
      row[y] = Number(Math.max(0, p).toPrecision(2)) / 4;
    }
    matrix[x] = [...row];
  }
  context.clearRect(0, 0, width, height);
  return matrix;
}

export function Heightmap({ elementSize, position, rotation }) {
  const heightmap = useTexture("/textures/map_1024_2.png");
  const heights = useAsset(
    async () => createHeightfieldMatrix(heightmap.image),
    heightmap
  );
  useHeightfield(
    () => ({ args: [heights, { elementSize }], position, rotation }),
    undefined,
    [elementSize, position, rotation]
  );
  return null;
}
