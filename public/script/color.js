document.addEventListener("DOMContentLoaded", function () {
  updateColor();

  document.getElementById("redRange").addEventListener("input", updateColor);
  document.getElementById("greenRange").addEventListener("input", updateColor);
  document.getElementById("blueRange").addEventListener("input", updateColor);
  document.getElementById("alphaRange").addEventListener("input", updateColor); // New listener for alpha channel
});
document.addEventListener("DOMContentLoaded", function () {
  // Добавляем обработчик события click для каждой кнопки "Copy"
  const copyButtons = document.querySelectorAll('.copy-button');
  copyButtons.forEach(button => {
    button.addEventListener('click', copyColorText);
  });

  updateColor(); // Вызываем функцию обновления цвета
});

function copyColorText(event) {
  const colorText = event.target.previousElementSibling.textContent;
  copyToClipboard(colorText);
}

function copyToClipboard(text) {
  // Создаем временный элемент textarea
  const textarea = document.createElement('textarea');
  textarea.value = text;
  document.body.appendChild(textarea);

  // Выделяем текст в textarea
  textarea.select();
  textarea.setSelectionRange(0, 99999); /* Для мобильных устройств */

  // Копируем текст в буфер обмена
  document.execCommand('copy');

  // Удаляем временный элемент
  document.body.removeChild(textarea);
}
function updateColor() {
  const red = document.getElementById("redRange").value;
  const green = document.getElementById("greenRange").value;
  const blue = document.getElementById("blueRange").value;
  const alpha = document.getElementById("alphaRange").value / 255; // Alpha value

  const colorPreview = document.getElementById("colorPreview");
  colorPreview.style.backgroundColor = `rgba(${red}, ${green}, ${blue}, ${alpha})`;

  const hexValue = document.getElementById("hexValue");
  hexValue.textContent = `HEX: #${toHex(red)}${toHex(green)}${toHex(blue)}`;

  // RGB percentage format
  const rgbPercentageValue = document.getElementById("rgbPercentageValue");
  rgbPercentageValue.textContent = `RGB %: rgb(${((red / 255) * 100).toFixed(2)}%, ${((green / 255) * 100).toFixed(2)}%, ${((blue / 255) * 100).toFixed(2)}%)`;

  // RGBA percentage format
  const rgbaPercentageValue = document.getElementById("rgbaPercentageValue");
  rgbaPercentageValue.textContent = `RGBA %: rgba(${((red / 255) * 100).toFixed(2)}%, ${((green / 255) * 100).toFixed(2)}%, ${((blue / 255) * 100).toFixed(2)}%, ${(alpha * 100).toFixed(2)}%)`;

  const cmykValue = document.getElementById("cmykValue");
  const cmyk = rgbToCmyk(red, green, blue);
  cmykValue.textContent = `CMYK: cmyk(${cmyk[0]}%, ${cmyk[1]}%, ${cmyk[2]}%, ${cmyk[3]}%)`;

  const argbValue = document.getElementById("argbValue");
  argbValue.textContent = `ARGB: argb(${Math.round(alpha * 255)}, ${red}, ${green}, ${blue})`;

  const rgbaValue = document.getElementById("rgbaValue");
  rgbaValue.textContent = `RGBA: rgba(${red}, ${green}, ${blue}, ${alpha.toFixed(2)})`;

  // HSLA format
  const hslaValue = document.getElementById("hslaValue");
  const hsla = rgbToHsla(red, green, blue);
  hslaValue.textContent = `HSLA: hsla(${hsla[0]}, ${hsla[1]}%, ${hsla[2]}%, ${alpha.toFixed(2)})`;

  // XYZ format
  const xyzValue = document.getElementById("xyzValue");
  const xyz = rgbToXyz(red, green, blue);
  xyzValue.textContent = `XYZ: xyz(${xyz[0]}, ${xyz[1]}, ${xyz[2]})`;

  // LAB format
  const labValue = document.getElementById("labValue");
  const lab = xyzToLab(xyz[0], xyz[1], xyz[2]);
  labValue.textContent = `LAB: lab(${lab[0].toFixed(2)}, ${lab[1].toFixed(2)}, ${lab[2].toFixed(2)})`;

  // YIQ format
  const yiqValue = document.getElementById("yiqValue");
  const yiq = rgbToYiq(red, green, blue);
  yiqValue.textContent = `YIQ: yiq(${yiq[0].toFixed(2)}, ${yiq[1].toFixed(2)}, ${yiq[2].toFixed(2)})`;

  // RYB format
  const rybValue = document.getElementById("rybValue");
  const ryb = rgbToRyb(red, green, blue);
  rybValue.textContent = `RYB: ryb(${ryb[0].toFixed(2)}, ${ryb[1].toFixed(2)}, ${ryb[2].toFixed(2)})`;

  // Decimal format
  const decimalValue = document.getElementById("decimalValue");
  decimalValue.textContent = `Decimal: ${red}, ${green}, ${blue}, ${alpha.toFixed(2)}`;

  // Yxy format
  const yxyValue = document.getElementById("yxyValue");
  const yxy = rgbToYxy(red, green, blue);
  yxyValue.textContent = `Yxy: yxy(${yxy[0].toFixed(4)}, ${yxy[1].toFixed(4)}, ${yxy[2].toFixed(4)})`;

  // Android format
  const androidValue = document.getElementById("androidValue");
  androidValue.textContent = `Android: ARGB(${Math.round(alpha * 255)}, ${red}, ${green}, ${blue})`;

  // YUV format
  const yuvValue = document.getElementById("yuvValue");
  const yuv = rgbToYuv(red, green, blue);
  yuvValue.textContent = `YUV: yuv(${yuv[0].toFixed(2)}, ${yuv[1].toFixed(2)}, ${yuv[2].toFixed(2)})`;

  // Hunter-Lab format
  const hunterLabValue = document.getElementById("hunterLabValue");
  const hunterLab = rgbToHunterLab(red, green, blue);
  hunterLabValue.textContent = `Hunter-Lab: HP(${hunterLab[0].toFixed(2)}, ${hunterLab[1].toFixed(2)}, ${hunterLab[2].toFixed(2)})`;

  // UnityRGBA format
  const unityRgbaValue = document.getElementById("unityRgbaValue");
  unityRgbaValue.textContent = `UnityRGBA: UnityRGBA(${(red / 255).toFixed(2)}, ${(green / 255).toFixed(2)}, ${(blue / 255).toFixed(2)}, ${alpha.toFixed(2)})`;
}


  function toHex(value) {
    const hex = Number(value).toString(16).toUpperCase();
    return hex.length === 1 ? `0${hex}` : hex;
  }

  function rgbToHsl(r, g, b) {
    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);

    let h, s, l = (max + min) / 2;

    if (max === min) {
      h = s = 0;
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
      }

      h /= 6;
    }

    return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
  }
  function rgbToHsv(r, g, b) {
    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);

    let h, s, v = max;

    const d = max - min;
    s = max === 0 ? 0 : d / max;

    if (max === min) {
        h = 0; // achromatic
    } else {
        switch (max) {
            case r:
                h = (g - b) / d + (g < b ? 6 : 0);
                break;
            case g:
                h = (b - r) / d + 2;
                break;
            case b:
                h = (r - g) / d + 4;
                break;
        }
        h /= 6;
    }

    return [Math.round(h * 360), Math.round(s * 100), Math.round(v * 100)];
}

function rgbToCmyk(r, g, b) {
    r /= 255;
    g /= 255;
    b /= 255;

    const k = 1 - Math.max(r, g, b);
    const c = (1 - r - k) / (1 - k);
    const m = (1 - g - k) / (1 - k);
    const y = (1 - b - k) / (1 - k);

    return [Math.round(c * 100), Math.round(m * 100), Math.round(y * 100), Math.round(k * 100)];
}

function rgbToXyz(r, g, b) {
  r /= 255;
  g /= 255;
  b /= 255;

  r = gammaCorrection(r);
  g = gammaCorrection(g);
  b = gammaCorrection(b);

  r = pivotXyz(r);
  g = pivotXyz(g);
  b = pivotXyz(b);

  const x = ((r * 0.4124564 + g * 0.3575761 + b * 0.1804375) * 100).toFixed(3);
  const y = ((r * 0.2126729 + g * 0.7151522 + b * 0.0721750) * 100).toFixed(3);
  const z = ((r * 0.0193339 + g * 0.1191920 + b * 0.9503041) * 100).toFixed(3);

  return [x, y, z];
}

function gammaCorrection(value) {
  if (value <= 0.04045) {
      return value / 12.92;
  } else {
      return Math.pow((value + 0.055) / 1.055, 2.4);
  }
}

function pivotXyz(value) {
  if (value > 0.04045) {
      return Math.pow(value, 1 / 2.4);
  } else {
      return value / 12.92;
  }
}

function rgbToHsla(r, g, b) {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const delta = max - min;

  let h, s, l = (max + min) / 2;

  if (delta === 0) {
      h = s = 0;
  } else {
      s = l > 0.5 ? delta / (2 - max - min) : delta / (max + min);

      switch (max) {
          case r:
              h = (g - b) / delta + (g < b ? 6 : 0);
              break;
          case g:
              h = (b - r) / delta + 2;
              break;
          case b:
              h = (r - g) / delta + 4;
              break;
      }

      h /= 6;
  }

  return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
}
function xyzToLab(x, y, z) {
  const refX = 95.047;
  const refY = 100.000;
  const refZ = 108.883;

  x /= refX;
  y /= refY;
  z /= refZ;

  x = pivotLab(x);
  y = pivotLab(y);
  z = pivotLab(z);

  const L = Math.max(0, (116 * y) - 16);
  const a = (x - y) * 500;
  const b = (y - z) * 200;

  return [L, a, b];
}

function pivotLab(value) {
  if (value > 0.008856) {
      return Math.pow(value, 1 / 3);
  } else {
      return (value * 903.3 + 16) / 116;
  }
}
function rgbToYiq(r, g, b) {
  const y = 0.299 * r + 0.587 * g + 0.114 * b;
  const i = 0.596 * r - 0.275 * g - 0.321 * b;
  const q = 0.212 * r - 0.523 * g + 0.311 * b;

  return [y, i, q];
}

function rgbToRyb(r, g, b) {
  const white = Math.min(r, g, b);
  r -= white;
  g -= white;
  b -= white;

  const maxGreen = Math.max(r, g, b);

  if (maxGreen !== 0) {
      const x = r / maxGreen;
      const y = g / maxGreen;
      const z = b / maxGreen;

      const n = Math.max(x, y, z);
      const min = Math.min(x, y, z);

      const blue = 1 - n;
      const red = (1 - x) / (1 - min);
      const yellow = (1 - y) / (1 - min);
      const green = (1 - z) / (1 - min);

      return [red, yellow, blue];
  } else {
      return [r, g, b];
  }
}

function rgbToYxy(r, g, b) {
  const sum = r + g + b;

  if (sum === 0) {
      return [0, 0, 0];
  }

  const x = r / sum;
  const y = g / sum;

  return [y, x, g / 255];
}

function rgbToYuv(r, g, b) {
  const y = 0.299 * r + 0.587 * g + 0.114 * b;
  const u = (b - y) * 0.493;
  const v = (r - y) * 0.877;

  return [y, u, v];
}

function rgbToHunterLab(r, g, b) {
  const k = 1 / 3294;
  const xn = 0.9642;
  const yn = 1.0000;
  const zn = 0.8251;

  const xr = r / 255;
  const yr = g / 255;
  const zr = b / 255;

  const xr2 = Math.pow(xr, 2.4);
  const yr2 = Math.pow(yr, 2.4);
  const zr2 = Math.pow(zr, 2.4);

  const x = k * (70.0 * xr2 + 145.0 * yr2 + 7.0 * zr2);
  const y = k * (299.0 * xr2 + 587.0 * yr2 + 114.0 * zr2);
  const z = k * (17.0 * xr2 + 35.0 * yr2 + 1.0 * zr2);

  return [x / xn, y / yn, z / zn];
}