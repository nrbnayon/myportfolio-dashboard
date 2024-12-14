import "./globals.css";
import "@/styles/globalStyle.css";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import LayoutWrapper from "./LayoutWrapper";

export const metadata = {
  title: "Nayon's Portfolio Dashboard",
  description: "Nayon's Portfolio Dashboard",
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body>
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
