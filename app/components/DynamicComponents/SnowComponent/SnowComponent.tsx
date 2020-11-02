import React, { useEffect, useState } from "react"
import Toggle from "app/components/Toggle"
import classes from "./SnowComponent.module.scss"

// thanks to https://gist.github.com/OmShiv/4368164
const createSnow = () => {
	const flakes: any[] = [],
		canvas = document.createElement("canvas"),
		ctx = canvas.getContext("2d") as CanvasRenderingContext2D,
		flakeCount = 400,
		mX = -100,
		mY = -100

	const id = "createsnowcanvas"
	canvas.classList.add(classes.canvas)
	canvas.id = id
	document.body.appendChild(canvas)

	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	
	
	function snow() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		for (var i = 0; i < flakeCount; i++) {
			var flake = flakes[i],
				x = mX,
				y = mY,
				minDist = 100,
				x2 = flake.x,
				y2 = flake.y;

			var dist = Math.sqrt((x2 - x) * (x2 - x) + (y2 - y) * (y2 - y)),
				dx = x2 - x,
				dy = y2 - y;

			if (dist < minDist) {
				var force = minDist / (dist * dist),
					xcomp = (x - x2) / dist,
					ycomp = (y - y2) / dist,
					deltaV = force / 2;

				flake.velX -= deltaV * xcomp;
				flake.velY -= deltaV * ycomp;

			} else {
				flake.velX *= .98;
				if (flake.velY <= flake.speed) {
					flake.velY = flake.speed
				}
				flake.velX += Math.cos(flake.step += .05) * flake.stepSize;
			}

			ctx.fillStyle = "rgba(255,255,255," + flake.opacity + ")";
			flake.y += flake.velY;
			flake.x += flake.velX;
				
			if (flake.y >= canvas.height || flake.y <= 0) {
				reset(flake);
			}


			if (flake.x >= canvas.width || flake.x <= 0) {
				reset(flake);
			}

			ctx.beginPath();
			ctx.arc(flake.x, flake.y, flake.size, 0, Math.PI * 2);
			ctx.fill();
		}

		const reqAnimFrame = (cb: () => any) => {
			const requestAnimationFrame = window.requestAnimationFrame || (window as any).mozRequestAnimationFrame || window.webkitRequestAnimationFrame || (window as any).msRequestAnimationFrame ||
			function(callback) {
				window.setTimeout(callback, 1000 / 60);
			};
			return requestAnimationFrame(cb)
		}
		
		return reqAnimFrame(snow);
	};

	
	function reset(flake) {
		flake.x = Math.floor(Math.random() * canvas.width);
		flake.y = 0;
		flake.size = (Math.random() * 3) + 2;
		flake.speed = (Math.random() * 1) + 0.5;
		flake.velY = flake.speed;
		flake.velX = 0;
		flake.opacity = (Math.random() * 0.5) + 0.3;
	}

	const resize = () => {
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
	}

	function start() {
		for (var i = 0; i < flakeCount; i++) {
			var x = Math.floor(Math.random() * canvas.width),
				y = Math.floor(Math.random() * canvas.height),
				size = (Math.random() * 3) + 2,
				speed = (Math.random() * 1) + 0.5,
				opacity = (Math.random() * 0.5) + 0.3;

			flakes.push({
				speed: speed,
				velY: speed,
				velX: 0,
				x: x,
				y: y,
				size: size,
				stepSize: (Math.random()) / 30,
				step: 0,
				opacity: opacity
			});
		}

		window.addEventListener("resize", resize)

		return snow();
	};


	const stop = (number?: number) => {
		window.removeEventListener("resize", resize)
		if (number) window.cancelAnimationFrame(number)
		if (!canvas) return
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		canvas.remove()
	}

	return {
		start, 
		stop
	}
}

export const SnowComponent = ({ editorMode }) => {
	const [showSnow, setShowSnow] = useState(true)
	useEffect(() => {
		if (showSnow) {
			const { stop, start } = createSnow()
			start()
			return () => {
				if (stop) {
					stop()
				}
			}
		}
	}, [showSnow])
	if (editorMode) {
		return (
			<div>
        Forhåndsvisning av snøfall. Kun du ser denne visningen.
				<br />
				<Toggle
					checked={showSnow}
					onChange={() => setShowSnow(!showSnow)}
					id="previewofconfetti"
					label={<>Skru {showSnow ? "av " : "på "}forhåndsvisning av snøfall</>}
				/>
			</div>
		)
	}
	return null
}

export default SnowComponent