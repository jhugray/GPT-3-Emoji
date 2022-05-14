
const apiSecret = OPENAI_API_KEY;
const promptButton = document.getElementById("submit");

console.log(apiSecret);

function apiCall2() {
  event.preventDefault();
  console.log("hello")
}

function apiCall() {
  event.preventDefault();
  console.log("api call function ran")
  const input = document.getElementById("prompt").value.trim();
  console.log(input);
  const data = {
    prompt: input,
    temperature: 0.5,
    max_tokens: 64,
    top_p: 1.0,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
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
       })
     }
   })

}

promptButton.addEventListener("click", apiCall);