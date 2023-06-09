import ReactDOM from "react-dom/client";
import { createGlobalStyle } from "styled-components";
import { ThemeProvider } from "styled-components";
import { theme } from "./theme";
import App from "./App";
import { RecoilRoot } from "recoil";

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans&display=swap');
  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, menu, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header, hgroup,
  main, menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }
  * {
    box-sizing:border-box;
  }
  body {
    font-family : 'Noto Sans', sans-serif;
    background:${(props) => props.theme.bgColor};
  }
  div::-webkit-scrollbar {
    width: 5px;
  }
  div::-webkit-scrollbar-thumb {
    background: #3e404476;
    border-radius: 5px; 
  }
  div::-webkit-scrollbar-track {
      background: rgba(33, 122, 244, .1);
  }
  a {
    text-decoration: none;
    color: inherit;
  }
  ul {
    list-style:none;
  }
`;

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <RecoilRoot>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <App />
    </ThemeProvider>
  </RecoilRoot>
);
