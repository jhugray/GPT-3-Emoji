OPENAI_API_KEY= "";
const apiSecret = OPENAI_API_KEY;
const promptButton = document.getElementById("submit");
const results = [];
console.log(apiSecret);

function apiCall() {
  event.preventDefault();
  console.log("api call function ran")
  const input = document.getElementById("prompt").value.trim();
  console.log(input);
  const data = {
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
        resultContainer.className = "container has-background-primary mb-5 px-3 rounded-corners";
        parent.prepend(resultContainer);
        const responsesPrompt = document.createElement("div");
        const responsesResponse = document.createElement("div");
        responsesPrompt.className = "columns";
        responsesResponse.className = "columns";
        resultContainer.appendChild(responsesPrompt);
        resultContainer.appendChild(responsesResponse);
        console.log(results);
        responsesPrompt.innerHTML = "<h3 class='subtitle column is-one-fifth'>Prompt:</h3> " + "<p class='column'>" + results[0].prompt + "</p><br />";
        responsesResponse.innerHTML = "<h3 class='subtitle column is-one-fifth'>Response:</h3> " + "<p class='column'>" + results[0].response + "</p><br />"; 
       });
     };
   });
};

promptButton.addEventListener("click", apiCall);