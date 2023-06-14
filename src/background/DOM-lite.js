import { convert } from "html-to-text";
export default function encodeHTMLToPlainText(
  html,
  omitSvgTags = false,
  omitSpacesBetweenTags = false,
  omitHead = false
) {
  const a = convert(html, {
    wordwrap: false,
    ignoreHref: true,
    ignoreImage: true,
    preserveNewlines: false,
    uppercaseHeadings: true,
    unorderedListItemPrefix: " - ",
    orderedListItemPrefix: (index) => `${index}. `,
    unorderedListItemIndent: "  ",
    orderedListItemIndent: (index) => "  ",
    headingStyle: "setext",
    hr: "- - -",
    bulletListMarker: "-",
    listItemIndent: "  ",
    linkReferenceStyle: "full",
    linkStyle: "inlined",
    br: "",
    hrChar: "",
    hrWidth: 1,
    hrString: "",
  });
  // remove all the doublenewlines
  let b = a.replace(/\n\n/g, "\n");
  return b;
}
