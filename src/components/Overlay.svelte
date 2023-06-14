<script lang="ts">
    let count = 0;
    function tweetCheck() {
        // check if the button is present in the DOM, if so return
        if (
            document.querySelector(
                "#penguin-button-video-call-twitter-extension-tweet"
            )
        ) {
            return;
        }
        let tagLocationButton = document.querySelector(
            '[aria-label="Tag Location"]'
        );

        // Select the emoji button and the chat input
        let targetNode = tagLocationButton;
        if (targetNode) {
            let videoCallButton = document.createElement("button");
            videoCallButton.id =
                "penguin-button-video-call-twitter-extension-tweet";
            videoCallButton.innerHTML = `📸🐧`;

            videoCallButton.style.border = "none";
            videoCallButton.style.backgroundColor = "transparent";
            (targetNode as Element).insertAdjacentElement(
                "afterend",
                videoCallButton
            );

            // Add an event listener to the button to set the chat input's value
            videoCallButton.addEventListener("click", () => {
                count++;
                let chatBox = document.querySelector(
                    ".public-DraftEditor-content"
                );
                if (chatBox && chatBox.textContent.length === 0) {
                    let textEvent = new InputEvent("textInput", {
                        data: `I started a penguin video call here : https://meet.jit.si/penguin-${Math.random()
                            .toString(36)
                            .substring(7)}`,
                        bubbles: true,
                        cancelable: true,
                    });
                    chatBox.dispatchEvent(textEvent);
                }
            });
        }
    }
    function DMCheck() {
        // check if the button is present in the DOM, if so return
        if (
            document.querySelector(
                "#penguin-button-video-call-twitter-extension-dm"
            ) ||
            document.querySelector(
                "#penguin-button-video-call-twitter-extension-tweet"
            )
        ) {
            return;
        }

        // Select the emoji button and the chat input
        let emojiButton = document.querySelector('[aria-label="Add emoji"]');
        let targetNode =
            emojiButton &&
            emojiButton.parentNode &&
            emojiButton.parentNode.parentNode;
        if (targetNode) {
            let videoCallButton = document.createElement("button");
            videoCallButton.id =
                "penguin-button-video-call-twitter-extension-dm";
            videoCallButton.innerHTML = `📸🐧`;

            videoCallButton.style.border = "none";
            videoCallButton.style.backgroundColor = "transparent";

            (targetNode as Element).insertAdjacentElement(
                "afterend",
                videoCallButton
            );

            // Add an event listener to the button to set the chat input's value
            videoCallButton.addEventListener("click", () => {
                count++;
                let chatBox = document.querySelector(
                    ".public-DraftEditor-content"
                );
                const conversationIdFromURL =
                    window.location.href.split("messages/")[1];
                if (chatBox && chatBox.textContent.length === 0) {
                    let message = `I started a private penguin video call here : https://meet.jit.si/penguin-${conversationIdFromURL}-${Math.random()
                        .toString(36)
                        .substring(7)}`;
                    if (count === 4) {
                        message = `penguin is @made_by_chris a very cool guy :^) go say hi! anyway.. ${message}`;
                    }

                    let textEvent = new InputEvent("textInput", {
                        data: message,
                        bubbles: true,
                        cancelable: true,
                    });
                    chatBox.dispatchEvent(textEvent);
                }
            });
        }
    }

    setInterval(() => {
        tweetCheck();
        DMCheck();
    }, 100);
</script>

<div class="overlay">
    <!-- <Options {count} /> -->
</div>

<style>
    .overlay {
        position: fixed;
        top: 16px;
        left: 16px;
    }
</style>
