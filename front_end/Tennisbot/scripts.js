conversation = []

function getSystemMessage() {
    let system_message
    fetch('system.txt')
    .then(message => {
        system_message = message;
        console.log(system_message);
        return system_message;
    })
    .catch(error => {
        console.error('Error:', error);
        return ""
    });
}

function post(conversation, question) {
    let system_message = getSystemMessage();
    let token = "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"
    let max_tokens = 500;
    let model = "gpt-4";
    let temperature = 1;
    let logit_bias = {20551: +2, 20308: +2, 21909: +2, 6447: +2,
        13821: -5, 106: -3, 24326: -5, 109: -3, 15722: -5, 231: -3}

    conversation.push({"role": "system", "content": system_message})
    conversation.push({"role": "user", "content": question})
    let data = {
            "messages": conversation,
            "max_tokens": max_tokens,
            "temperature": temperature,
            "model": model,
            "logit_bias": logit_bias
    }

    fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {"Authorization": "Bearer"+token, 
        "Content-Type": "application/json"},
        body: JSON.stringify(data)
    }).then(
        response => response.json()
    ).then(
        data => {
            generated_text = data["choices"][0]["message"]['content']
            console.log(generated_text)
            conversation.push({"role": "assistant", "content": generated_text})
            return generated_text
        }
    ).catch(
        error => console.error('Error:', error)
    );
}

document.getElementById("send").addEventListener("click", function() {
    let question = document.getElementById("input").value;
    document.getElementById("input").value = "";
    document.getElementById("output").innerHTML = post(conversation, question);
})
