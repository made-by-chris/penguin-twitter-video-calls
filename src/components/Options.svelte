<script lang="ts">
    import { storage } from "../storage";

    export let count: number;
    let queryActive = false;
    let TTSActive = false;
    let STTActive = false;
    let textArea: HTMLTextAreaElement;
    let response: string;


    let successMessage: string = null;

    function increment() {
        count += 1;
    }

    function decrement() {
        count -= 1;
    }

    function save() {
        storage.set({ count }).then(() => {
            successMessage = "Options saved!";

            setTimeout(() => {
                successMessage = null;
            }, 1500);
        });
    }

    async function getCurrentTab() {
        const queryOptions = { active: true, currentWindow: true };
        const [tab] = await chrome.tabs.query(queryOptions);
        return tab;
    }

    async function handleSubmit() {
        if (queryActive) {
            handleCancel();
            return;
        }
        // submitButton.disabled = true;
        // cancelButton.classList.remove("hidden");
        // buttonText.classList.add("hidden");
        // buttonSpinner.classList.remove("hidden");

        queryActive = true;

        const tab = await getCurrentTab();

        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: sendPromptAndHTMLToBackground,
            args: [textArea.value],
        });
    }

    function sendPromptAndHTMLToBackground(val) {
        var prompt = val;
        var dom = document.documentElement.innerHTML;

        chrome.runtime.sendMessage(
            { action: "prompt", prompt, dom },
        );
    }

    // create a chrome listener thing for prompt-response
    chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
      response = request.inference
    });


  function handleCancel() {
      //   queryActive = false;

      //   submitButton.disabled = false;
      //   cancelButton.classList.add("hidden");
      //   buttonText.classList.remove("hidden");
      //   buttonSpinner.classList.add("hidden");
  }

  function handleDictation() {
    // Implement your dictation functionality here
    console.log("Starting dictation...");
  }

</script>

<div class="container ">
  <main class="flex flex-col items-center justify-center m-4">
      <form on:submit|preventDefault={handleSubmit} class="w-full max-w-lg">
        <textarea
          bind:this={textArea}
          placeholder="How can i help?"
          id="prompt-input"
          class="px-4 py-2 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          cols="20"
          rows="4"
        ></textarea>
        <div class="mt-4">
          <button
            type="submit"
            id="submit-button"
            class="relative px-4 py-2 text-white bg-blue-500 rounded-lg focus:outline-none hover:bg-blue-600"
          >
            <span id="button-text">Submit</span>
            <span
              id="button-spinner"
              class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 hidden w-4 h-4 border-2 border-t-2 rounded-full loader"
            ></span>
          </button>
          <button
            id="cancel-button"
            class="px-4 py-2 ml-4 text-white bg-red-500 rounded-lg focus:outline-none hover:bg-red-600 hidden"
          >
            Cancel
          </button>
          <button
            id="speak-button"
            class="px-4 py-2 ml-4 text-white bg-green-500 rounded-lg focus:outline-none hover:bg-green-600"
          >
            Speak
          </button>
        </div>
      </form>
      <!-- el to inject response into -->
      
      <div id="response" class="mt-4"
        >
          {response}
      </div>
      <p>Current count: <b>{count}</b></p>
      <div>
          <button on:click={decrement}>-</button>
          <button on:click={increment}>+</button>
          <button on:click={save}>Save</button>
          {#if successMessage}<span class="success">{successMessage}</span>{/if}
      </div>
    </main>
</div>
