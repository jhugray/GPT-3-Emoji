OPENAI_API_KEY=
const apiSecret = OPENAI_API_KEY;
const promptButton = document.getElementById("submit");

console.log(apiSecret);
const results = [];

function apiCall() {
  event.preventDefault();
  console.log("api call function ran")
  const input = document.getElementById("prompt").value.trim();
  console.log(input);
  const data = {
    prompt: input,
    temperature: 0.5,
    max_tokens: 60,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
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




       })
     }
   })

}

promptButton.addEventListener("click", apiCall);