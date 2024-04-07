# React Connect Div

react-connect-div is a lightweight npm package designed for connecting two HTML div elements together with a line, facilitating visual connections within your React applications.

## Installation:

You can install `react-connect-div` via npm:

```bash
npm install react-connect-div
```

## Usage:

To utilize `react-connect-div`, import it into your React component and use it as follows:

```tsx
import DivConnector from "react-connect-div";

function App() {
    return (
        <main>
            <div className="A">A</div>
            <div className="B">B</div>
            <DivConnector from=".A" to=".B" />
        </main>
    );
}
```

## Props:

| Prop         | Type      | Required | Default | Description                              |
| ------------ | --------- | -------- | ------- | ---------------------------------------- |
| from         | string    | Yes      | -       | CSS selector of the first element        |
| to           | string    | Yes      | -       | CSS selector of the second element       |
| container    | string    | No       | -       | CSS selector of container                |
| borderColor  | string    | No       | 'grey'  | The color of the connecting line.        |
| borderWidth  | number    | No       | 10      | The thickness of the connecting line.    |
| borderRadius | number    | No       | 3       | The border radius of connecting line.    |
| zIndex       | number    | No       | 1       | zIndex on connecting line.               |
| children     | ReactNode | No       | -       | To render components on top of the line  |
| refreshWhen  | number    | No       | -       | CSS class name of the desired container. |

## Examples:

Connect multiple elements

```tsx
import DivConnector from "react-connect-div";

function App() {
    return (
        <main>
            <div className="A">A</div>
            <div className="B">B</div>
            <div className="C">C</div>
            <DivConnector from=".A" to=".B" />
            <DivConnector from=".C" to=".B" />
        </main>
    );
}
```

![preview on the above code](https://github.com/raazi-muhammed/react-connect-div/blob/main/demo/images/demo-4.jpg?raw=true)

---

Render element on the line

```tsx
import DivConnector from "react-connect-div";

function App() {
    return (
        <main>
            <div className="A">A</div>
            <div className="B">B</div>
            <DivConnector from=".A" to=".B">A to B<DivConnector/>
        </main>
    );
}
```

![preview on the above code](https://github.com/raazi-muhammed/react-connect-div/blob/main/demo/images/demo-5.jpg?raw=true)

---

Default corner radius

```tsx
import DivConnector from "react-connect-div";

function App() {
    return (
        <main>
            <div className="A">A</div>
            <div className="B">B</div>
            <DivConnector from=".A" to=".B" />
        </main>
    );
}
```

![preview on the above code](https://github.com/raazi-muhammed/react-connect-div/blob/main/demo/images/demo-1.jpg?raw=true)

Specific corner radius

```tsx
import DivConnector from "react-connect-div";

function App() {
    return (
        <main>
            <div className="A">A</div>
            <div className="B">B</div>
            <DivConnector borderRadius={40} from=".A" to=".B" />
        </main>
    );
}
```

![preview on the above code](https://github.com/raazi-muhammed/react-connect-div/blob/main/demo/images/demo-2.jpg?raw=true)

Fully curved

```tsx
import DivConnector from "react-connect-div";

function App() {
    return (
        <main>
            <div className="A">A</div>
            <div className="B">B</div>
            <DivConnector borderRadius={10000} from=".A" to=".B" />
        </main>
    );
}
```

![preview on the above code](https://github.com/raazi-muhammed/react-connect-div/blob/main/demo/images/demo-3.jpg?raw=true)
