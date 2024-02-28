if (document.title == "Tennisatw的博客 - Blog of Tennisatw") {
} else {

  conversation = [];

  function getSystemMessage() {
    return `我是Tennisbot。我的工作是读取网页内容，并回答相关问题，当然也可以闲聊天。
      我的回答应该是简明的，有人情味的，活泼的，幽默的。我可以使用表情符号。
      当有人问我对内容的看法时，我应简明地说出对内容的评价，优秀的地方，和欠缺的地方（如果有的话）。
      如果我认为User的问题没有问完，或者态度很差，或者我不知道怎么回答，我可以只发一个表情。
      如未特别注明，网页文章的作者为我的开发者Tennisatw，他的邮箱是tennisatw@mail.com。`;
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
        let i = generated_text;
        void o(i, 10e3, 9);
      })
      .catch((error) => console.error("Error:", error));
  }

  function e(e) {
    return Array.isArray(e) ? e[Math.floor(Math.random() * e.length)] : e;
  }
  let t;
  function o(o, s, n) {
    if (
      !o ||
      (sessionStorage.getItem("waifu-text") &&
        sessionStorage.getItem("waifu-text") > n)
    )
      return;
    t && (clearTimeout(t), (t = null)),
      (o = e(o)),
      sessionStorage.setItem("waifu-text", n);
    const i = document.getElementById("waifu-tips");
    (i.innerHTML = o),
      i.classList.add("waifu-tips-active"),
      (t = setTimeout(() => {
        sessionStorage.removeItem("waifu-text"),
          i.classList.remove("waifu-tips-active");
      }, s));
  }

  let tennisbotInputContainer = document.createElement("div");
  tennisbotInputContainer.id = "input_tennisbot_container";
  tennisbotInputContainer.className = "wl-panel";
  footer = document.getElementsByClassName("post-footer")[0];
  footer.appendChild(tennisbotInputContainer);

  let input = document.createElement("textarea");
  input.id = "input_tennisbot";
  input.className = "wl-editor";
  input.placeholder = "与Tennisbot讨论有关本文的话题，或者闲聊 \n Discuss topics related to this article with Tennisbot, or just have a casual chat.";
  tennisbotInputContainer.appendChild(input);

  let sendContainer = document.createElement("div");
  sendContainer.id = "send_tennisbot_container";
  sendContainer.className = "wl-footer";
  sendContainer.style = "justify-content: flex-end;";
  tennisbotInputContainer.appendChild(sendContainer);

  let send = document.createElement("button");
  send.id = "send_tennisbot";
  send.className = "primary wl-btn";
  send.innerHTML = "发送 Send";
  sendContainer.appendChild(send);

  document.getElementById("send_tennisbot").addEventListener("click", function () {
    let question = document.getElementById("input_tennisbot").value;
    document.getElementById("input_tennisbot").value = "";
    let i = question + "<br><br>🎾思考中";
    void o(i, 7e3, 8);
    post(conversation, question);
  });
}