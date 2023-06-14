import { storage } from "../storage";
import prompt from "./prompt.js";
console.log("background.js loaded");

chrome.runtime.onInstalled.addListener(() => {
  storage.get().then(console.log);
});

chrome.runtime.onMessage.addListener(async function (
  message,
  sender,
  sendResponse
) {
  console.log(message);
  if (message.action === "prompt") {
    let inference;
    try {
      inference = await prompt(message);
      console.log("got inf", inference);
      chrome.runtime.sendMessage({
        action: "prompt-response",
        success: true,
        inference,
      });
    } catch (error) {
      chrome.runtime.sendMessage({
        action: "prompt-response",
        success: false,
        error,
      });
      console.log("got inf error", error);
    }
  }
});
