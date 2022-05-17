
const apiSecret = process.env.OPENAI_API_KEY;
const promptButton = document.getElementById("submit");
const results = [];
const textArea = document.getElementById("prompt");
console.log(apiSecret);

function apiCall() {
  event.preventDefault();
  textArea.focus;
  console.log("api call function ran")
  const input = textArea.value.trim();
  textArea.value = "";
  console.log(input);
  const data = {
    //prompt contains instruction plus user input
    prompt: "Convert this into emojis\n\n" + input + ".",
    temperature: 0.1,
    max_tokens: 50,
   };
    
   fetch("https://api.openai.com/v1/engines/text-curie-001/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiSecret}`,
    },
    body: JSON.stringify(data),
   })
   .then(function (response) {
     if (response.ok) {
      response.json().then(function(data) {
        console.log(data);
        let newResult = {
          "prompt": input,
          "response": data.choices[0].text
        };
        console.log("the result is" + newResult.response);
        results.unshift(newResult);
        console.log(results);
        const parent = document.getElementById("response_parent_container");
        const responseHeader = document.getElementById("response_title");
        responseHeader.innerText = "✨Responses✨";
        const resultContainer = document.createElement("div");
        resultContainer.className = "container has-background-primary mt-6 p-3 rounded-corners";
        //prepend instead of appendChild to results go from newest to oldest
        parent.prepend(resultContainer);
        const responsesPrompt = document.createElement("div");
        const responsesResponse = document.createElement("div");
        responsesPrompt.className = "columns is-mobile has-text-white";
        responsesResponse.className = "columns is-mobile has-text-white";
        resultContainer.appendChild(responsesPrompt);
        resultContainer.appendChild(responsesResponse);
        console.log(results);
        const resultsPrompt = results[0].prompt;
        //regex w/ global match used to remove new lines/breaks and insert a space instead
        const resultsResponse = results[0].response.replace(/(\r\n|\n|\r)/g, " ");
        responsesPrompt.innerHTML = "<h3 class='subtitle column is-narrow has-text-white'>Prompt:</h3> " + "<p class='column'>" + resultsPrompt + "</p><br />";
        responsesResponse.innerHTML = "<h3 class='subtitle column is-narrow has-text-white'>Response:</h3> " + "<p class='column'>" + resultsResponse + "</p><br />"; 
        const twitterShare = document.createElement("button");
        responsesResponse.appendChild(twitterShare);
        twitterShare.className = "button is-hover is-info is-small m-2";
        const tweet = encodeURI(resultsResponse);
        console.log(tweet);
        twitterShare.innerHTML = "<i class='fa-brands fa-twitter-square fa-xl mr-2'></i> <a class='has-text-white' target='blank' href='https://twitter.com/intent/tweet?text=" + tweet + "'>" + "Tweet" + "</a>";
       });
     };
   });
};

promptButton.addEventListener("click", apiCall);

textArea.addEventListener("keypress", function onEvent(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    promptButton.click();
  }
});