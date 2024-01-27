export default function PickerUI(picker) {
  return PickerUI = {
    type: "div",
    ref: "mainContainer",
    events: {
      mouseup: picker.mouseUp
    },
    props: {
      class: "colorPicker",
      children: [
        {
          type: "div",
          ref: "main",
          events: {
            touchstart: picker.touchDown,
            mousedown: picker.mouseDown,
            touchmove: picker.touchMove,
            touchend: picker.mouseUp,
          },
          props: {
            class: "d",
            children: [
              {
                type: "div",
                props: {
                  class: "b",
                  children: {
                    type: "div",
                    props: {
                      class: "a",
                    },
                  },
                },
              },
              {
                type: "span",
                ref: "mainThumb",
                props: {
                  class: "thumb",
                  children: {
                    type: "span",
                  },
                },
              },
            ],
          },
        },
        {
          type: "div",
          props: {
            class: "parent",
            children: [
              {
                type: "span",
                props: {
                  class: "colorNow",
                  children: [
                    {
                      type: "span",
                      ref: "colorNow",
                    },
                    {
                      type: "span",
                      events: {
                        click: picker.copyClick,
                        mouseleave: picker.leave,
                      },
                      props: {
                        class: "copy",
                        title: "Copy color to clipboard",
                      },
                    },
                  ],
                },
              },
              {
                type: "div",
                ref: "slider",
                events: {
                  touchstart: picker.touchDown,
                  mousedown: picker.mouseDown,
                  touchmove: picker.touchMove,
                  touchend: picker.mouseUp,
                },
                props: {
                  class: "c",
                  children: {
                    type: "span",
                    ref: "sliderThumb",
                    props: {
                      class: "thumb",
                      children: {
                        type: "span",
                      },
                    },
                  },
                },
              },
              {
                type: "div",
                events: {
                  touchstart: picker.touchDown,
                  mousedown: picker.mouseDown,
                  touchmove: picker.touchMove,
                  touchend: picker.mouseUp,
                },
                props: {
                  class: "e",
                  children: {
                    type: "div",
                    ref: "aSlider",
                    props: {
                      children: {
                        type: "span",
                        ref: "aSliderThumb",
                        props: {
                          class: "thumb",
                          children: {
                            type: "span",
                          },
                        },
                      },
                    },
                  },
                },
              },
            ],
          },
        },
        {
          type: "div",
          props: {
            style: "display:flex;align-items:center;margin-top:12px",
            children: [
              {
                type: "div",
                props: {
                  class: "rgba",
                  children: [
                    {
                      type: "input",
                      ref: "valueR",
                      events: { input: picker.changeCC },
                      props: {
                        type: "number",
                      },
                    },
                    {
                      type: "input",
                      ref: "valueG",
                      events: { input: picker.changeCC },
                      props: {
                        type: "number",
                      },
                    },
                    {
                      type: "input",
                      ref: "valueB",
                      events: { input: picker.changeCC },
                      props: {
                        type: "number",
                      },
                    },
                    {
                      type: "input",
                      ref: "valueA",
                      events: { input: picker.changeCC },
                      props: {
                        type: "number",
                      },
                    },
                    {
                      type: "span",
                      props: {
                        children: "R",
                      },
                    },
                    {
                      type: "span",
                      props: {
                        children: "G",
                      },
                    },
                    {
                      type: "span",
                      props: {
                        children: "B",
                      },
                    },
                    {
                      type: "span",
                      props: {
                        children: "A",
                      },
                    },
                  ],
                },
              },
              {
                type: "div",
                props: {
                  class: "rgba",
                  children: [
                    {
                      type: "input",
                      ref: "valueHex",
                      events: { input: picker.changeHex, blur: picker.onBlurHex },
                      props: {
                        type: "text",
                        style: "grid-column:1/5",
                      },
                    },
                    {
                      type: "span",
                      props: {
                        style: "grid-column:1/5",
                        children: "HEX",
                      },
                    },
                  ],
                },
              },
              {
                type: "button",
                events: { click: picker.changeMode },
                props: {
                  class:"mode",
                },
              },
            ],
          },
        },
      ],
    },
  };
}