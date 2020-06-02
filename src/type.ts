type DomElements =
  | "address"
  | "applet"
  | "area"
  | "article"
  | "aside"
  | "base"
  | "basefont"
  | "bgsound"
  | "blockquote"
  | "body"
  | "br"
  | "button"
  | "caption"
  | "center"
  | "col"
  | "colgroup"
  | "dd"
  | "details"
  | "dir"
  | "div"
  | "dl"
  | "dt"
  | "embed"
  | "fieldset"
  | "figcaption"
  | "figure"
  | "footer"
  | "form"
  | "frame"
  | "frameset"
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "head"
  | "header"
  | "hgroup"
  | "hr"
  | "html"
  | "iframe"
  | "img"
  | "input"
  | "isindex"
  | "li"
  | "link"
  | "listing"
  | "main"
  | "marquee"
  | "menu"
  | "menuitem"
  | "meta"
  | "nav"
  | "noembed"
  | "noframes"
  | "noscript"
  | "object"
  | "ol"
  | "p"
  | "param"
  | "plaintext"
  | "pre"
  | "script"
  | "section"
  | "select"
  | "source"
  | "style"
  | "summary"
  | "table"
  | "tbody"
  | "td"
  | "template"
  | "textarea"
  | "tfoot"
  | "th"
  | "thead"
  | "title"
  | "tr"
  | "track"
  | "ul"
  | "wbr"
  | "xmp";

export type ReactElementType = (props: { [key: string]: any; }) => ReactDomElement | ReactCustomElement;

export interface ReactDomElement {
    type: DomElements,
    props?: { [key: string]: any; },
    children?: ReactElement[],
}

export interface ReactCustomElement {
    type: ReactElementType,
    props?: { [key: string]: any; },
    children?: ReactElement[],
}

export type ReactElement = ReactDomElement | ReactCustomElement;

export type Update = (elementToUpdate: ReactElement) => void

export interface Renderer  {
    update: Update,
    getCurrentElement: () => ReactElement
}

export type Effect = () => void;