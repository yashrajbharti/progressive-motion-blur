# Progressive Blur Effect Visualizer  

The **Progressive Blur Effect Visualizer** is an interactive web tool that demonstrates the concept of **progressive motion blur**, where the blur value increments progressively in the direction of the effect. This tool serves as a proof-of-concept for incorporating motion blur as a CSS property, aiming to eliminate SVG dependencies for similar effects.  

> [!IMPORTANT]
> This project aligns with the ongoing discussion in the W3C CSS Working Group, specifically issue [#11134](https://github.com/w3c/csswg-drafts/issues/11134), and takes inspiration from the motion blur discussion initiated in issue [#3837](https://github.com/w3c/csswg-drafts/issues/3837) by [Adam Argyle](https://github.com/argyleink).  

---

## 🚀 Features  

1. **Progressive Motion Blur**: Simulates motion blur with an increasing blur value along a specified direction.  
2. **Partial Blur Effect**: Applies a static blur along specific offsets without progressive increments.  
3. **Interactive Tool**: Customize parameters like direction, offset, blur value, and increment through an intuitive interface.  
4. **Visual Representation**: Live preview of the progressive blur effect.  

---

## 🎯 Syntax and Parameters  

```css
filter: motion-blur(<Angle>, <Offset-X>, <Offset-Y>, <Initial-Blur-Value>, <Incremental-Value>, progressive);
```

Here is a breakdown of the parameters that drive the motion blur visualization:  

| **Parameter**       | **Description**                                                                                     | **Type**        | **Default** | **Allowed Values**                 |  
|----------------------|-----------------------------------------------------------------------------------------------------|-----------------|-------------|------------------------------------|  
| `direction`          | The angle or keyword specifying the direction of the blur effect.                                  | `string`/`int`  | `"to right"` | See the **Direction Keywords** section. |  
| `offsetX`            | The horizontal offset where the blur starts.                                                       | `number`        | `0`         | `0 - 1` (relative to canvas width) |  
| `offsetY`            | The vertical offset where the blur starts.                                                         | `number`        | `0`         | `0 - 1` (relative to canvas height)|  
| `value`              | The initial blur value in pixels.                                                                  | `number`        | `0`         | Any positive number.               |  
| `increment`          | The incremental blur value applied progressively along the direction.                              | `number`        | `0.02`      | Any positive number.               |  

---

### 🧭 Direction Keywords  

Instead of providing numerical angles (0-360°), you can use the following intuitive direction keywords:  

| **Keyword**      | **Angle** |  
|-------------------|-----------|  
| `to right`        | `0°`      |  
| `to bottom`       | `90°`     |  
| `to left`         | `180°`    |  
| `to top`          | `270°`    |  
| `top-right`       | `45°`     |  
| `top-left`        | `135°`    |  
| `bottom-left`     | `225°`    |  
| `bottom-right`    | `315°`    |  

---

## 🔧 How It Works  

1. **Image Setup**: The canvas is initialized with a base image.  
2. **Parameter Handling**: Input values (via sliders, text fields, or radio buttons) are passed to the blur function.  
3. **Blur Algorithm**:  
    - The direction is converted into a vector based on the angle (using `cos` and `sin`).  
    - The canvas is progressively blurred in strips, with each strip having an increasing blur value.  
4. **Preview Update**: Each change immediately updates the canvas to reflect the effect.  

---

## 🧩 Examples 

<img width="296" alt="No Blur" src="https://github.com/user-attachments/assets/519eb3f0-0e43-4901-9cfd-1ae5830776d7">
<img width="296" alt="Progressive Motion Blur of 0.02" src="https://github.com/user-attachments/assets/324bf733-6629-4bb3-b722-f5f4487ba2a8">
<img width="296" alt="Progressive Motion Blur of 0.045" src="https://github.com/user-attachments/assets/093b9f4f-f98d-4f3c-a180-46c348606bd7">
<img width="296" alt="Progressive Motion Blur of 0.045 with x-offset 0.6" src="https://github.com/user-attachments/assets/c2d01908-d53f-4fd5-a640-333f33e5c3e0">

The examples showcase: `No Blur effect`, `Progressive Motion Blur of 0.02`, `Progressive Motion Blur of 0.045` and `Progressive Motion Blur of 0.045 with x-offset 0.6` respectively, with direction of motion blur set as `to right` or `0deg`.


## 📌 Notes  

1. **Performance**: Progressive blur involves intensive canvas operations; optimize for smaller images.  
2. **Browser Support**: Ensure the browser supports `canvas`, and `CanvasRenderingContext2D API: filter` [Caniuse](https://caniuse.com/mdn-api_canvasrenderingcontext2d_filter).  

---

## 🙌 Contribute  

If you'd like to contribute:  

- Fork the repository and submit pull requests.  
- Share ideas or report issues via the [GitHub Issues page](https://github.com/yashrajbharti/progressive-motion-blur/issues).  

---

## 📜 License  

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.  
