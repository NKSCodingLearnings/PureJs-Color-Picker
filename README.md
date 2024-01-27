# Pure Js Color Picker
A Simple Color-picker for any type of JavaScript project with RGB and Hexadecimal color models.

* **Zero dependency** - Build with pure JavaScript without any dependency

* **Customization** - Open color picker with your own size, position and closing control

## Demo
### Watch the video below for a demonstration
https://www.canva.com/design/DAF63Yn2LHQ/watch

### Try the live demo at:
[NKS CODING LEARNINGS](https://code.nkslearning.com/blogs/pure-js-color-picker-home-page_65b208fd17df115bb28b)

## Installation & Usage

```sh
npm install purejs-color-picker
```

### Use in Code
```js
import showColorPicker from "..."; // relative path
// import showColorPicker from "purejs-color-picker"; // In bundler environment like in React App

const colorPicker = document.getElementById("colorPicker");

colorPicker.addEventListener("click", (event) => {
  // To show color picker just call showColorPicker function by passing an object with properties as required
  showColorPicker({
    color: event.target.style.background || "rgb(255,0,0)", // Default color
    handler: (color) => { // On Color Change handler
        event.target.style.background = color;
    },
    pickerStyle: event.target, // Pass an HTML element to open picker based on element position OR inline style for picker
  });
});
```

Links: 
* **GitHub Repository** - [PureJs-Color-Picker](https://github.com/NKSCodingLearnings/PureJs-Color-Picker)
* **Home Page** - [PureJs Color Picker on NKS CODING LEARNINGS](https://code.nkslearning.com/blogs/pure-js-color-picker-home-page_65b208fd17df115bb28b)