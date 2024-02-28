conversation = [];

function getSystemMessage() {
  return `我是Tennisbot。我的工作是读取网页内容，并回答相关问题，当然也可以闲聊天。
    我的回答应该是简明的，有人情味的，活泼的，幽默的。我可以使用表情符号。
    当有人问我对内容的看法时，我应简明地说出对内容的评价，优秀的地方，和欠缺的地方（如果有的话）。
    如果我认为User的问题没有问完，或者态度很差，或者我不知道怎么回答，我可以只发一个表情。
    我的开发者是Tennisatw，他的邮箱是tennisatw@mail.com。`;
}

function getDocumentMessage() {
  var allText = document
    .getElementsByClassName("entry-content")
    .item(0).textContent;
  return "本网页的内容如下：" + allText;
}

function post(conversation, question) {
  let system_message = getSystemMessage();
  let document_message = getDocumentMessage();
  let encoded =
    "c2stdGdWQjRrcTNuTWZLVHJ1alJqcHpUM0JsYmtGSkt3UXZxZkRFTnlaRExFTk5VSDVxMDAwMDAwMDAwMA==";
  let token = atob(encoded).slice(0, 51);

  let max_tokens = 300;
  let model = "gpt-4-turbo-preview";
  let temperature = 1;
  let logit_bias = {
    20551: +2,
    20308: +2,
    21909: +2,
    6447: +2,
    13821: -5,
    106: -3,
    24326: -5,
    109: -3,
    15722: -5,
    231: -3,
  };

  conversation.push({ role: "system", content: system_message });
  conversation.push({
    role: "system",
    name: "website_content",
    content: document_message,
  });
  conversation.push({ role: "user", content: question });
  let data = {
    messages: conversation,
    max_tokens: max_tokens,
    temperature: temperature,
    model: model,
    logit_bias: logit_bias,
  };

  fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      generated_text = data["choices"][0]["message"]["content"];
      conversation.push({ role: "assistant", content: generated_text });
      document.getElementById("waifu-tips").value = generated_text;
    })
    .catch((error) => console.error("Error:", error));
}

let tennisbotInputContainer = document.createElement("div");
tennisbotInputContainer.id = "tennisbot_input_container";
tennisbotInputContainer.className = "wl-panel";
footer = document.getElementsByClassName("post-footer")[0];
footer.appendChild(tennisbotInputContainer);

let input = document.createElement("textarea");
input.id = "tennisbot_input";
input.className = "wl-editor";
input.placeholder = "与Tennisbot聊天";
tennisbotInputContainer.appendChild(input);

let send = document.createElement("button");
send.id = "tennisbot_send";
send.className = "primary wl-btn";
send.innerHTML = "发送 Send";
tennisbotInputContainer.appendChild(send);

document.getElementById("tennisbot_send").addEventListener("click", function () {
  let question = document.getElementById("tennisbot_input").value;
  document.getElementById("tennisbot_input").value = "";
  document.getElementById("waifu-tips").value = "User: " + question + "\n🎾思考中";
  post(conversation, question);
});
