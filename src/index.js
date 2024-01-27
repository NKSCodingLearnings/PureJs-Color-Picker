import PickerUI from "./PickerUI.js";

const colorStops = [
  { color: [255, 0, 0], position: 0 },
  { color: [255, 255, 0], position: 17 },
  { color: [0, 255, 0], position: 33 },
  { color: [0, 255, 255], position: 50 },
  { color: [0, 0, 255], position: 67 },
  { color: [255, 0, 255], position: 83 },
  { color: [255, 0, 0], position: 100 },
];
const interpolateColors = (color1, color2, percentage) => {
  return [
    Math.round(color1[0] + (color2[0] - color1[0]) * percentage),
    Math.round(color1[1] + (color2[1] - color1[1]) * percentage),
    Math.round(color1[2] + (color2[2] - color1[2]) * percentage),
  ];
};
const positionInSlider = (targetColor) => {
  for (let i = 0; i < colorStops.length - 1; i++) {
    const first = colorStops[i].color,
      second = colorStops[i + 1].color;
    let lie = isColorBetween(first, second, targetColor);
    if (lie) {
      for (let j = 0; j < targetColor.length; j++) {
        if (first[j] !== second[j]) {
          let p = (targetColor[j] - first[j]) / (second[j] - first[j]);
          return (
            colorStops[i].position +
            (colorStops[i + 1].position - colorStops[i].position) * p
          );
        }
      }
    }
  }
  return 0;
};
const isColorBetween = (colorA, colorC, colorB) => {
  return (
    colorB[0] >= Math.min(colorA[0], colorC[0]) &&
    colorB[0] <= Math.max(colorA[0], colorC[0]) &&
    colorB[1] >= Math.min(colorA[1], colorC[1]) &&
    colorB[1] <= Math.max(colorA[1], colorC[1]) &&
    colorB[2] >= Math.min(colorA[2], colorC[2]) &&
    colorB[2] <= Math.max(colorA[2], colorC[2])
  );
};
const hexToRgb = (hex) => {
  const bigint = parseInt(hex, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  return [r, g, b];
};
const rgbaToHex = (c, a) => {
  return `#${c[0].toString(16).padStart(2, "0")}${c[1]
    .toString(16)
    .padStart(2, "0")}${c[2].toString(16).padStart(2, "0")}${
    a !== 1
      ? Math.round(a * 255)
          .toString(16)
          .padStart(2, "0")
      : ""
  }`.toUpperCase();
};
const getPosition = (target)=> {
  const targetRect = target.getBoundingClientRect();

  const spaceAbove = targetRect.top;
  const spaceBelow = window.innerHeight - targetRect.bottom;
  const spaceLeft = targetRect.left;
  const spaceRight = window.innerWidth - targetRect.right;

  let width, height;
  if (window.innerWidth > (window.innerHeight + 12)) {
    height = Math.min(528, Math.max(368, spaceAbove, spaceBelow));
    width = (height - 188) * (15 / 10) + 30;
  }else{
    width = Math.min(540, Math.max(300, spaceRight, spaceLeft));
    height = (width - 30) * (10 / 15) + 188;
  }

  let top, left;

  if (spaceBelow >= height) {
    top = targetRect.bottom;
  } 
  else if (spaceAbove >= height) {
    top = targetRect.top - height;
  } 
  else if (spaceAbove >= spaceBelow) {
    top = 0;
  }
  else if (spaceAbove < spaceBelow) {
    top = window.innerHeight - height;
  }
  else {
    top = window.innerHeight / 2 - height / 2;
  }

  if (spaceRight >= width) {
    left = targetRect.right;
  } 
  else if (spaceLeft >= width) {
    left = targetRect.left - width;
  }
  else if (spaceLeft >= spaceRight) {
    left = 0;
  }
  else if (spaceLeft < spaceRight) {
    left = window.innerWidth - width;
  }
  else {
    left = window.innerWidth / 2 - width / 2;
  }
  return {top:top,left:left,height:height,width:width};
}
const icons = {
  copy:`data:image/svg+xml,%3Csvg style='fill:white;' xmlns='http://www.w3.org/2000/svg' height='24' viewBox='0 -960 960 960' width='24'%3E%3Cpath d='M360-240q-33 0-56.5-23.5T280-320v-480q0-33 23.5-56.5T360-880h360q33 0 56.5 23.5T800-800v480q0 33-23.5 56.5T720-240H360Zm0-80h360v-480H360v480ZM200-80q-33 0-56.5-23.5T120-160v-560h80v560h440v80H200Zm160-240v-480 480Z'/%3E%3C/svg%3E`,
  done:`data:image/svg+xml,%3Csvg style='fill:white;' xmlns='http://www.w3.org/2000/svg' height='24' viewBox='0 -960 960 960' width='24'%3E%3Cpath d='M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z'/%3E%3C/svg%3E`,
  unfold:`data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' height='24' viewBox='0 -960 960 960' width='24'%3E%3Cpath d='M480-120 300-300l58-58 122 122 122-122 58 58-180 180ZM358-598l-58-58 180-180 180 180-58 58-122-122-122 122Z'/%3E%3C/svg%3E`,
  transparent:`data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25'%3E%3Cdefs%3E%3Cpattern id='checkerboard' width='16' height='16' patternUnits='userSpaceOnUse'%3E%3Crect width='8' height='8' fill='%23c8c8c8'/%3E%3Crect x='8' y='8' width='8' height='8' fill='%23fff'/%3E%3Crect width='8' height='8' y='8' fill='%23fff'/%3E%3Crect x='8' width='8' height='8' y='8' fill='%23c8c8c8'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23checkerboard)'/%3E%3C/svg%3E`
};

var picker;
class ColorPicker {
  main;
  slider;
  shown = false;
  mode = "rgb";
  sliding = null;
  position = 0;
  position2 = [100, 0];
  color = [255, 0, 0];
  color2 = [255, 0, 0];
  color2Alpha = 1;
  po = { x: 0, y: 0 };
  value = "";
  dismissable = {dismiss:null};

  constructor() {
    this.container = document.createElement("div");
    this.shadow = this.container.attachShadow({mode:"open"});
    let style = document.createElement("style");
    style.textContent = `.colorPicker{inset:0;max-width:540px;min-width:300px;position:fixed;height:fit-content;z-index:5000;background:#fff;padding:15px;box-sizing:border-box;box-shadow:inset 0 0 3px 2px #5a5a5a}.pickColor{height:40px;box-shadow:inset 0 0 2px 3px #eee;box-sizing:border-box;border-radius:3px;cursor:pointer}.a,.b{position:absolute;top:0;right:0;bottom:0;left:0}.a{background:linear-gradient(to top,#000,transparent)}.b{background:linear-gradient(to right,#fff,rgba(255,255,255,0));box-shadow:inset 0 0 3px 0#5a5a5a}.c,.d,.e{overflow:hidden;position:relative}.d{aspect-ratio:15/10}.c,.e{box-shadow:inset 0 0 3px 0#5a5a5a;height:25px}.c{background:linear-gradient(to right,red 0,#ff0 17%,#0f0 33%,#0ff 50%,#00f 67%,#f0f 83%,red 100%)}.e{background-image:url("${icons.transparent}")}.c *,.d *,.e *{pointer-events:none}.thumb{width:25px;height:25px;position:absolute;display:flex;align-items:center;justify-content:center}.c .thumb,.e .thumb{transform:translateX(-50%)}.d .thumb{transform:translate(-50%,-50%)}.thumb span{display:block;width:15px;height:15px;border-radius:13px;box-sizing:border-box;background:#ffffffe6;border:4px solid;outline:2px solid #fff;transition:all .1s linear}.c:hover .thumb span,.d:hover .thumb span,.e:hover .thumb span{width:20px;height:20px}.colorPicker .parent{display:grid;grid-template-columns:50px 1fr;padding:18px 0 3px;gap:15px}.colorNow{grid-column:1;grid-row:1/3;width:50px;height:50px;margin:auto;border-radius:25px;position:relative;box-shadow:0 0 3px 0#5a5a5a;background-image:url("${icons.transparent}")}.colorNow span{border-radius:25px;position:absolute;inset:0}.colorNow .copy{cursor:pointer;transition:opacity .2s linear;background:#0000006b url("${icons.copy}")center center no-repeat;opacity:0}.colorNow .copy:hover{opacity:.8}.rgba{width:100%;gap:10px;display:grid;grid-template-columns:repeat(4,1fr);grid-template-rows:repeat(2,auto)}.rgba input{width:100%;box-sizing:border-box;text-align:center;font-family:math;font-size:medium;line-height:1.6}.colorPicker button{margin-left:10px;flex-shrink:0;width:30px;height:30px;border:0;opacity:.6;background:#0000 url("${icons.unfold}")center center no-repeat}.colorPicker button:hover{opacity:1}.rgba input:focus-visible{outline:0}.rgba span{color:#838383;font-weight:700;text-align:center}input[type=number]::-webkit-inner-spin-button{-webkit-appearance:none}`;
    this.shadow.appendChild(style);
    this.colorTaker = null;
    this.createElementFromObject(PickerUI(this));
    this.valueHex.parentElement.remove();
    this.shadow.appendChild(this.mainContainer);
  }

  showPicker = (host,color, handler, style, dismissable) => {
    if (!this.shown) {
      this.value = color || "";
      this.colorTaker = handler;
      this.hex = null;
      let what = this.validateColor(color);
      if (!what) {
        this.color2 = this.color = [255, 0, 0];
        this.color2Alpha = 1;
        this.position = 0;
        this.position2 = [100, 0];
        this.mode = "rgb";
        this.value = "rgb(255, 0, 0)";
      } else this.mode = (color || "").includes("hex") ? "hex" : "rgb";
      this.positionToSelectedColor();
      this.mainContainer.style = style;
      this.setChanges();
      if (this.mode === "rgb") {
        if (!this.valueR.parentElement.parentElement) {
          this.valueHex.parentElement.parentElement.replaceChild(this.valueR.parentElement,this.valueHex.parentElement);
        }
      } else {
        if (!this.valueHex.parentElement.parentElement) {
          this.valueR.parentElement.parentElement.replaceChild(this.valueHex.parentElement,this.valueR.parentElement);
        }
      }

      (host || document.body).appendChild(this.container);
      document.addEventListener("mousemove", this.mouseMove);
      document.addEventListener("click", this.hidePicker, true);
      this.shown = true;
      if (!dismissable) {
        this.dismissable.dismiss = this.dismiss;
        return this.dismissable;
      }
    }
  };
  dismiss = ()=>{
    this.colorTaker = null;
    this.container.remove();
    this.sliding = null;
    document.removeEventListener("mousemove", this.mouseMove);
    document.removeEventListener("click", this.hidePicker,true);
    this.value = "";
    this.shown = false;
    this.dismissable.dismiss = null;
  }
  hidePicker = (event) => {
    if (this.shown && !this.container.contains(event.target)) {
      if (!this.sliding) {
        if (!this.dismissable.dismiss) {
          this.colorTaker = null;
          this.container.remove();
          this.sliding = null;
          document.removeEventListener("mousemove", this.mouseMove);
          document.removeEventListener("click", this.hidePicker,true);
          this.value = "";
          this.shown = false;
        }
      }else this.sliding = null;
    }
  };

  validateColor = (color) => {
    if (color && typeof color === "string") {
      if (/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/.test(color)
      ) {
        const hexWithoutHash = color.slice(1);
        const hasShortFormat =
          hexWithoutHash.length === 3 || hexWithoutHash.length === 4;
        const fullHex = hasShortFormat
          ? hexWithoutHash
              .split("")
              .map((char) => char + char)
              .join("")
          : hexWithoutHash;
        if (fullHex.length === 6 || fullHex.length === 8) {
          this.color2Alpha =
            fullHex.length === 8 ? parseInt(fullHex.slice(6), 16) / 255 : 1;
          this.color2 = hexToRgb(fullHex.slice(0, 6));
          return true;
        }
      } else if (/^rgba?\(.+\)$/.test(color)) {
        const match = color
          .match(/rgba?\(([^)]+)\)/)[1]
          .split(",")
          .map((trimmed) => trimmed.trim());
        const alphaStr = match.length === 4 ? match[3] : "1";
        this.color2Alpha = alphaStr.includes("%")
          ? parseFloat(alphaStr) / 100
          : parseFloat(alphaStr);
        this.color2 = match.slice(0, 3).map(Number);
        return true;
      }
    }
    return false;
  };
  positionToSelectedColor = () => {
    const minIndex = this.color2.indexOf(Math.min(...this.color2));
    const maxIndex = this.color2.indexOf(Math.max(...this.color2));
    const mediumIndex = [0, 1, 2].find((index) => index !== minIndex && index !== maxIndex);
    
    const minValue = this.color2[minIndex];
    const maxValue = this.color2[maxIndex];
    const mediumValue = this.color2[mediumIndex];

    if (minValue === mediumValue && mediumValue === maxValue) {
      this.color = [255,0,0];
      this.position2 = [0 ,((255 - maxValue) * 100) / 255];
      this.position = 0;
    }else{
      const normalizedValue = (mediumValue - minValue) / (maxValue - minValue);
  
      const color = [0, 0, 0];
      color[minIndex] = 0;
      color[maxIndex] = 255;
      color[mediumIndex] = Math.round(255 * normalizedValue);
      let position = positionInSlider(color);
  
      this.color = color;
      this.position2 = [((maxValue - minValue) / maxValue) * 100,((255 - maxValue) * 100) / 255];
      this.position = position;
    }
  };
  onSliderDrag = (thumbPosition) => {
    let color;
    for (let i = 0; i < colorStops.length - 1; i++) {
      if (
        thumbPosition >= colorStops[i].position &&
        thumbPosition <= colorStops[i + 1].position
      ) {
        const percentage =
          (thumbPosition - colorStops[i].position) /
          (colorStops[i + 1].position - colorStops[i].position);
        color = interpolateColors(
          colorStops[i].color,
          colorStops[i + 1].color,
          percentage
        );
        break;
      }
    }
    if (color) {
      this.position = thumbPosition;
      this.color = color;
      let color2 = interpolateColors(
        interpolateColors([255, 255, 255], this.color, this.position2[0] / 100),
        [0, 0, 0],
        this.position2[1] / 100
      );
      this.color2 = color2;
      this.setChanges();
    }
  };
  onMainDrag = (x, y, w, h) => {
    let color = interpolateColors(
      interpolateColors([255, 255, 255], this.color, x / w),
      [0, 0, 0],
      y / h
    );
    if (color) {
      this.position2 = [(x * 100) / w, (y * 100) / h];
      this.color2 = color;
      this.setChanges();
    }
  };

  mouseDown = (event) => {
    event.preventDefault();
    if (event.target === this.main) {
      const x = event.clientX - event.target.getBoundingClientRect().left;
      const y = event.clientY - event.target.getBoundingClientRect().top;
      const w = event.target.clientWidth,
        h = event.target.clientHeight;
      if (x >= 0 && x <= w && y >= 0 && y <= h) {
        this.sliding = event.target;
        this.onMainDrag(x, y, w, h);
      }
    } else if (event.target === this.slider) {
      const x = event.clientX - event.target.getBoundingClientRect().left;
      if (x >= 0 && x <= event.target.clientWidth) {
        const thumbPosition = (x * 100) / event.target.clientWidth;
        this.sliding = event.target;
        this.onSliderDrag(thumbPosition);
      }
    } else {
      const x = event.clientX - event.target.getBoundingClientRect().left;
      if (x >= 0 && x <= event.target.clientWidth) {
        this.color2Alpha = parseFloat(
          (x / event.target.clientWidth).toFixed(2)
        );
        this.sliding = event.target;
        this.setChanges();
      }
    }
  };
  touchDown = (touch) => {
    const event = touch.touches[0];
    if (event.target === this.main) {
      const cx = event.clientX,
        cy = event.clientY;
      let x = cx - event.target.getBoundingClientRect().left;
      let y = cy - event.target.getBoundingClientRect().top;
      if (
        x >= 0 &&
        x <= event.target.clientWidth &&
        y >= 0 &&
        y <= event.target.clientHeight
      ) {
        this.sliding = event.target;
        this.onMainDrag(
          x,
          y,
          this.sliding.clientWidth,
          this.sliding.clientHeight
        );
      }
    } else if (event.target === this.slider) {
      const x = event.clientX - event.target.getBoundingClientRect().left;
      if (x >= 0 && x <= event.target.clientWidth) {
        const thumbPosition = (x * 100) / event.target.clientWidth;
        this.sliding = event.target;
        this.onSliderDrag(thumbPosition);
      }
    } else {
      const x = event.clientX - event.target.getBoundingClientRect().left;
      if (x >= 0 && x <= event.target.clientWidth) {
        this.color2Alpha = parseFloat(
          (x / event.target.clientWidth).toFixed(2)
        );
        this.sliding = event.target;
        this.setChanges();
      }
    }
  };
  mouseMove = (event) => {
    if (this.sliding) {
      if (this.sliding === this.main) {
        const cx = event.clientX,
          cy = event.clientY;
        let x = cx - this.sliding.getBoundingClientRect().left;
        let y = cy - this.sliding.getBoundingClientRect().top;
        if (x < 0) x = 0;
        if (x > this.sliding.clientWidth) x = this.sliding.clientWidth;
        if (y < 0) y = 0;
        if (y > this.sliding.clientHeight) y = this.sliding.clientHeight;
        this.onMainDrag(
          x,
          y,
          this.sliding.clientWidth,
          this.sliding.clientHeight
        );
      } else if (this.sliding === this.slider) {
        const cx = event.clientX;
        let x = cx - this.sliding.getBoundingClientRect().left;
        if (x < 0) x = 0;
        if (x > this.sliding.clientWidth) x = this.sliding.clientWidth;
        const thumbPosition = (x * 100) / this.sliding.clientWidth;
        this.onSliderDrag(thumbPosition);
      } else {
        let x = event.clientX - this.sliding.getBoundingClientRect().left;
        if (x < 0) x = 0;
        if (x > this.sliding.clientWidth) x = this.sliding.clientWidth;
        this.color2Alpha = parseFloat((x / this.sliding.clientWidth).toFixed(2));
        this.setChanges();
      }
    }
  };
  touchMove = (touch) => {
    const event = touch.touches[0];
    if (this.sliding) {
      if (this.sliding === this.main) {
        const cx = event.clientX,
          cy = event.clientY;
        let x = cx - this.sliding.getBoundingClientRect().left;
        let y = cy - this.sliding.getBoundingClientRect().top;
        if (x < 0) x = 0;
        if (x > this.sliding.clientWidth) x = this.sliding.clientWidth;
        if (y < 0) y = 0;
        if (y > this.sliding.clientHeight) y = this.sliding.clientHeight;
        this.onMainDrag(
          x,
          y,
          this.sliding.clientWidth,
          this.sliding.clientHeight
        );
      } else if (this.sliding === this.slider) {
        const cx = event.clientX;
        let x = cx - this.sliding.getBoundingClientRect().left;
        if (x < 0) x = 0;
        if (x > this.sliding.clientWidth) x = this.sliding.clientWidth;
        const thumbPosition = (x * 100) / this.sliding.clientWidth;
        this.onSliderDrag(thumbPosition);
      } else {
        let x = event.clientX - this.sliding.getBoundingClientRect().left;
        if (x < 0) x = 0;
        if (x > this.sliding.clientWidth) x = this.sliding.clientWidth;
        this.color2Alpha = parseFloat(
          (x / this.sliding.clientWidth).toFixed(2)
        );
        this.setChanges();
      }
    }
  };
  mouseUp = () => {
    this.sliding = null;
  };

  copyClick = (event) => {
    let text = this.mode==="rgb"?`rgb(${this.color2[0]}, ${this.color2[1]}, ${this.color2[1]}, ${this.color2Alpha * 100}%)`:
    rgbaToHex(this.color2,this.color2Alpha);
    navigator.clipboard.writeText(text);
    event.target.setAttribute("style", `background-image:url("${icons.done}")`);
  };
  leave = (event) => {
    event.target.removeAttribute("style");
  };
  changeMode = () => {
    this.mode = this.mode === "rgb" ? "hex" : "rgb";
    if (this.mode === "rgb") {
      if (!this.valueR.parentElement.parentElement) {
        this.valueHex.parentElement.parentElement.replaceChild(this.valueR.parentElement,this.valueHex.parentElement);
      }
    } else {
      if (!this.valueHex.parentElement.parentElement) {
        this.valueR.parentElement.parentElement.replaceChild(this.valueHex.parentElement,this.valueR.parentElement);
      }
    }
  };
  onBlurHex = () => {
    if (this.hex) {
      let v = rgbaToHex(this.color2, this.color2Alpha);
      const hexWithoutHash = this.hex.slice(1);
      const hasShortFormat = hexWithoutHash.length === 3 || hexWithoutHash.length === 4;
      const fullHex = hasShortFormat ? hexWithoutHash.split("").map((char) => char + char).join("") : hexWithoutHash;
      if (v !== "#" + fullHex) {
        this.valueHex.value = v;
      }
      this.hex = null;
    }
  };
  changeHex = (event) => {
    const pv = this.hex || rgbaToHex(this.color2,this.color2Alpha);
    let cv = event.target.value;
    if (/^#[a-fA-F0-9]{0,8}$/.test(cv)) {
      this.hex = cv;
      let r = this.validateColor(cv);
      if (r) {
        this.positionToSelectedColor();
        this.setChanges();
      }
      return;
    }else event.target.value = pv;
  };
  changeCC = (event) => {
    let v = event.target.value;
    if (event.target === this.valueA) {
      if (v >= 0 && v <= 1) {
        if (this.color2Alpha !== +v) {
          if(v === "") event.target.value = "0";
          this.color2Alpha = +v;
          this.colorNow.setAttribute("style", `background:rgb(${this.color2[0]},${this.color2[1]},${this.color2[2]},${this.color2Alpha});`);
          this.aSliderThumb.setAttribute("style", `left: ${this.color2Alpha * 100}%;`);
          
          if (this.colorTaker && typeof this.colorTaker === "function") {
            let c = this.mode === "rgb" ? `rgb(${this.color2[0]}, ${this.color2[1]}, ${this.color2[2] + (this.color2Alpha === 1?"":(", "+this.color2Alpha*100+"%"))})` : hex; 
            if (c !== this.value) {
              this.value = c;
              this.colorTaker(c);
            }
          }
        }else if(v === "") event.target.value = "0";
      }else event.target.value = this.color2Alpha;
    } else {
      let i = event.target === this.valueR ? 0 : event.target === this.valueG ? 1 : 2;
      if (v >= 0 && v <= 255) {
        this.color2[i] = +v;
        this.positionToSelectedColor();
        this.setChanges();
      }else event.target.value = this.color2[i];
    }
  };
  setChanges = () => {
    const mainStyle = `background:rgb(${this.color[0]},${this.color[1]},${this.color[2]});`;
    const dThumbStyle = `left:${this.position2[0]}%; top:${this.position2[1]}%;`;
    const colorNowStyle = `background:rgb(${this.color2[0]},${this.color2[1]},${this.color2[2]},${this.color2Alpha});`;
    const cThumStyle = `left: ${this.position}%;`;
    const eStyle = `height:100%; background:linear-gradient(to right, #00000000, rgba(${this.color2[0]},${this.color2[1]},${this.color2[2]}));`;
    const eThumStyle = `left: ${this.color2Alpha * 100}%;`;
    const valueR = this.color2[0];
    const valueG = this.color2[1];
    const valueB = this.color2[2];
    const valueA = this.color2Alpha;
    const hex = this.hex || rgbaToHex(this.color2, this.color2Alpha);

    let pv;
    pv = this.main.getAttribute("style");
    if (pv !== mainStyle) this.main.setAttribute("style", mainStyle);

    pv = this.mainThumb.getAttribute("style");
    if (pv !== dThumbStyle) this.mainThumb.setAttribute("style", dThumbStyle);

    pv = this.colorNow.getAttribute("style");
    if (pv !== colorNowStyle)
      this.colorNow.setAttribute("style", colorNowStyle);

    pv = this.sliderThumb.getAttribute("style");
    if (pv !== cThumStyle) this.sliderThumb.setAttribute("style", cThumStyle);

    pv = this.aSlider.getAttribute("style");
    if (pv !== eStyle) this.aSlider.setAttribute("style", eStyle);

    pv = this.aSliderThumb.getAttribute("style");
    if (pv !== eThumStyle) this.aSliderThumb.setAttribute("style", eThumStyle);

    pv = this.valueR.value;
    if (pv !== valueR) this.valueR.value = valueR;

    pv = this.valueG.value;
    if (pv !== valueG) this.valueG.value = valueG;

    pv = this.valueB.value;
    if (pv !== valueB) this.valueB.value = valueB;

    pv = this.valueA.value;
    if (pv !== valueA) this.valueA.value = valueA;

    pv = this.valueHex.value;
    if (pv !== hex) this.valueHex.value = hex;

    if (this.colorTaker && typeof this.colorTaker === "function") {
      let c = this.mode === "rgb" ? `rgb(${this.color2[0]}, ${this.color2[1]}, ${this.color2[2] + (this.color2Alpha === 1?"":(", "+(this.color2Alpha*100)+"%"))})` : hex; 
      if (c !== this.value) {
        this.value = c;
        this.colorTaker(c);
      }
    }
  };
  createElementFromObject = (obj) => {
    var element = document.createElement(obj.type);
    if (obj.ref) this[obj.ref] = element;
    if (obj.events) {
      for (let event in obj.events) {
        element.addEventListener(event, obj.events[event]);
      }
    }
    if (obj.props && typeof obj.props === "object") {
      for (const prop in obj.props) {
        if (obj.props.hasOwnProperty(prop)) {
          if (prop === "children") {
            if (Array.isArray(obj.props.children)) {
              obj.props.children.forEach((child) => {
                const childElement = this.createElementFromObject(child);
                if (childElement) element.appendChild(childElement);
              });
            } else if (typeof obj.props.children === "object") {
              const childElement = this.createElementFromObject(
                obj.props.children
              );
              if (childElement) element.appendChild(childElement);
            } else if (typeof obj.props.children === "string") {
              const text = document.createTextNode(obj.props.children);
              element.appendChild(text);
            }
          } else if (!prop.startsWith("on")) {
            element.setAttribute(prop, obj.props[prop]);
          }
        }
      }
    }
    return element;
  };
}

export default function showColorPicker ({host,color, handler, pickerStyle,dismissable}) {
  if (!picker) picker = new ColorPicker();
  if (pickerStyle instanceof HTMLElement) {    
    let s = getPosition(pickerStyle);
    pickerStyle = `width:${s.width}px;height:${s.height}px;top:${s.top}px;left:${s.left}px;`;
  }
  return picker.showPicker(host instanceof HTMLElement ? host : undefined,color, handler, pickerStyle,(dismissable === undefined || dismissable === null) ? true : dismissable);
}
