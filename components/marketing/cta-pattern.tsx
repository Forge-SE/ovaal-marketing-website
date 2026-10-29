import { motion } from "framer-motion";

function createLayers() {
  const layers = ["", "", ""];
  for (let row = 0; row < 38; row++) {
    for (let column = 0; column < 65; column++) {
      const x = column * 9;
      const y = row * 9;
      const distance = ((x - 300) / 265) ** 2 + ((y - 315) / 235) ** 2;
      const seed = (column * 73 + row * 151 + column * row * 19) % 101;
      const density = distance < .85 ? 69 : distance < 1.12 ? 37 : distance < 1.42 ? 11 : 0;
      if (seed >= density) continue;
      const size = seed % 4 === 0 ? 5 : 4;
      layers[seed % 3] += `M${x} ${y}h${size}v${size}h-${size}Z`;
    }
  }
  return layers;
}

const layers = createLayers();

export function CtaPattern({ active = false, reduceMotion = false }: { active?: boolean; reduceMotion?: boolean }) {
  return <svg aria-hidden="true" viewBox="0 0 585 342" fill="currentColor" className="h-auto w-full overflow-visible">{layers.map((path, index) => <motion.path key={index} d={path} initial={false} animate={{ scale: active && !reduceMotion ? 1.06 + index * .025 : 1, y: active && !reduceMotion ? -4 - index * 3 : 0, opacity: active ? [.6, .85, 1][index] : [.4, .7, 1][index] }} style={{ transformOrigin: "300px 315px" }} transition={{ duration: reduceMotion ? 0 : .5, ease: [.2, 0, 0, 1] }} />)}</svg>;
}
