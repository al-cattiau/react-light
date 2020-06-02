import { ReactElementType, ReactElement, ReactCustomElement } from "./type";

let rootFiber = null;
let currentFiber = rootFiber;
let firstMount = true;

window.getRootFiber = () => rootFiber;
window.getCurrentFiber = () => currentFiber;

const createFiber = (elementType) => ({
  elementType,
  children: [],
  state: [],
  stateIndex: 0, // 每次 useState 递增，以区分每一个存储的状态
});

const useState = (initialState) => {
  const fiberShadow = currentFiber;
  const { stateIndex, state } = fiberShadow;
  const value = state[stateIndex];

  const updateState = (newValue) => {
    fiberShadow.state[stateIndex] = newValue;
    // 重新渲染
    requestAnimationFrame(() => {
      const targetDom = document.querySelector("#root");
      targetDom.innerHTML = "";
      targetDom.append(mount(<TimerElement />, rootFiber));
    });
  };

  fiberShadow.stateIndex += 1;
  return [value || initialState, updateState];
};

const React = {
  createElement: (
    elementType: ReactElementType,
    props: any,
    children: ReactElement | ReactElement[] | undefined
  ): ReactElement => ({
    type: elementType,
    props,
    children:
      children instanceof Array
        ? children
        : children === undefined
        ? []
        : [children],
  }),
};

const checkIsCustomElement = (
  element: ReactElement
): element is ReactCustomElement => typeof element.type === "function";

const mount = (element: ReactElement, parentFiber, index = 0) => {
  // 为每一个 Element 分配一个 Fiber 元素，最终绑定到根元素上
  if (checkIsCustomElement(element)) {
    if (parentFiber.children[index]) {
      currentFiber = parentFiber.children[index];
    } else {
      currentFiber = createFiber(element.type);
      parentFiber.children.push(currentFiber);
    }
    const { type: elementType, props, children } = element;
    const child = elementType(props || {});
    currentFiber.stateIndex = 0;
    return mount(child, currentFiber);
  } else {
    const { type: elementType, props, children } = element;
    const rootDom = document.createElement(elementType);
    if (children) {
      children.forEach((c, i) => {
        let fiber = parentFiber;        
        if (typeof c === "string") {
          // 文字节点
          if (parentFiber.children[i] === undefined) {
            fiber = createFiber("string");
            parentFiber.children.push(fiber);
            currentFiber = fiber;
          }

          rootDom.innerHTML = rootDom.innerHTML + c;
        } else {
          rootDom.appendChild(mount(c, parentFiber, i));
        }
      });
    }

    return rootDom;
  }
};

const ReactDom = {
  render: (element: ReactElement, targetDom: Element) => {
    rootFiber = currentFiber = createFiber("root");
    targetDom.append(mount(element, rootFiber));
    firstMount = false;
  },
};

const ContentElement = () => {
  const [content, setContent] = useState("loading");
  setTimeout(() => {
    setContent('content');
  }, 1000);

  return <div>{content}</div>;
};

const TimerElement = () => {
  const [count, setCount] = useState(1);

  return <div>{count === 2 && <ContentElement />}</div>;
};

ReactDom.render(<TimerElement />, document.querySelector("#root"));
