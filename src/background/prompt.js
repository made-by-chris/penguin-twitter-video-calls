const apiKey = "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";
// we need to format the html as pug
import DOMLite from "./DOM-lite";

export default function main({ prompt, dom }) {
  const converted = DOMLite(dom);
  console.log("starting prompt", prompt, converted);
  return new Promise((resolve, reject) => {
    try {
      return fetch(`https://api.openai.com/v1/chat/completions`, {
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content: `you are a browser-plugin that that analyses html and provides summarisation, table>csv/json extraction.
          you will receive a "prompt" from the user, and DOM (in pug format) of the webpage to analyse.`,
            },
            {
              role: "user",
              content: `PROMPT: ${prompt} \n (DOM: ${converted}`,
            },
          ],
        }),
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: "Bearer " + apiKey,
        },
      })
        .then((response) => {
          if (response.ok) {
            response.json().then((json) => {
              console.log("in prompt.js >>> ", json);
              resolve(json.choices[0].message.content);
            });
          } else {
            console.log("in prompt.js >>> ", response);
            reject(response);
          }
        })
        .catch((e) => {
          console.log(">>>>>1", e);
        });
    } catch (e) {
      console.log(">>>>>2", e);
    }
  });
}
