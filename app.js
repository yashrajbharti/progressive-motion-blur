const canvas = document.getElementById("progressiveBlurCanvas");
const ctx = canvas.getContext("2d");
const angleSlider = document.getElementById("angleSlider");
const inputRadios = document.querySelectorAll("md-radio");
const textFields = document.querySelectorAll("md-outlined-text-field");
const arrow = document.querySelector(".arrow");
const chips = document.querySelectorAll("md-assist-chip");

let angle = 0;
let offsetX = 0;
let offsetY = 0;
let value = 0;
let increment = 0.02;

const img = new Image();
img.src = "https://picsum.photos/300/300"; // You can try with "sample.jpg"
img.onload = () => {
  applyProgressiveBlur(img, 0, 0, 0, 0, 0.02);
};

const angleToAngle = new Map([
  ["to right", 0],
  ["to bottom", 90],
  ["to left", 180],
  ["to top", 270],
  ["top-right", 45],
  ["top-left", 135],
  ["bottom-left", 225],
  ["bottom-right", 315],
]);

/**
 * Apply progressive blur.
 * @param {HTMLImageElement} img - The image element.
 * @param {number|string} angle - Angle in degrees (0-360) or string like `to right`.
 * @param {number} offsetX - x-offset for start point of blur effect.
 * @param {number} offsetY - y-offset for start point of blur effect.
 * @param {number} value - value of blur (in px).
 * @param {number} increment - ending value (in px) of blur.
 */
const applyProgressiveBlur = (
  img,
  angle,
  offsetX,
  offsetY,
  value,
  increment
) => {
  const stripWidth = 1;
  const blurStep = increment;

  if (typeof angle === "string") angle = angleToAngle.get(angle);
  const radians = (angle * Math.PI) / 180;
  const angleX = Math.cos(radians);
  const angleY = Math.sin(radians);

  let startX = offsetX * canvas.width,
    startY = offsetY * canvas.height;

  const diagonal = Math.sqrt(canvas.width ** 2 + canvas.height ** 2);
  const strips = Math.ceil(diagonal / stripWidth);

  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

  for (let i = 0; i < strips; i++) {
    const blurValue = value + blurStep * i;

    const x = startX + i * stripWidth * angleX;
    const y = startY + i * stripWidth * angleY;

    ctx.save();
    ctx.beginPath();
    ctx.rect(x, y, canvas.width, canvas.height);
    ctx.clip();

    ctx.filter = `blur(${blurValue}px)`;
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    ctx.restore();
  }
  changeOutput();
};

angleSlider.addEventListener("input", () => {
  angle = (angleSlider.value / angleSlider.max) * 360;
  setArrowAngle(angle);
  applyEffects();
});

inputRadios.forEach((radio) => {
  radio.addEventListener("change", () => {
    angle = angleToAngle.get(radio.value);
    setArrowAngle(angle);
    applyEffects();
  });
});

const setArrowAngle = (angle) => {
  arrow.style.rotate = angle + "deg";
};

textFields.forEach((textField, index) => {
  textField.addEventListener("input", () => {
    switch (index) {
      case 0:
        offsetX = textField.value;
        setOffsetTriangle(offsetX, "x");
        break;
      case 1:
        offsetY = textField.value;
        setOffsetTriangle(offsetY, "y");
        break;
      case 2:
        value = textField.value;
        break;
      case 3:
        increment = textField.value;
    }
    applyEffects();
  });
});

const setOffsetTriangle = (offsetValue, offsetProperty) => {
  if (offsetProperty === "x") {
    document.querySelector(".triangleX").style.translate = `${
      offsetValue * canvas.width
    }px 0`;
  }
  if (offsetProperty === "y") {
    document.querySelector(".triangleY").style.translate = `0 ${
      offsetValue * canvas.height
    }px`;
  }
};

chips.forEach((chip, index) => {
  chip.addEventListener("click", () => {
    const values = chip.label.slice(1, -1).split(",");

    angle = +values[0];
    offsetX = +values[1];
    offsetY = +values[2];
    value = +values[3];
    increment = +values[4];

    setOffsetTriangle(offsetX, "x");
    setOffsetTriangle(offsetY, "y");
    setArrowAngle(angle);
    applyEffects();
  });
});

const changeOutput = () => {
  document.querySelector(
    "output"
  ).innerHTML = `<p class="code">filter: <mark class="green">motion-blur</mark>(${~~angle}, ${
    offsetX || 0
  }, ${offsetY || 0}, <mark class="red">${value || 0}</mark>,
    <mark class="red">${increment || 0}</mark>,
    <mark class="green">progressive</mark>)
</p>`;
};

const applyEffects = () => {
  applyProgressiveBlur(img, angle, offsetX, offsetY, value, increment);
};
