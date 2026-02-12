// 这个文件运行在服务器后端，别人无法看到里面的代码逻辑
export default async function handler(req, res) {
  // 1. 从环境变量中读取你的 Key（刚才你在 Vercel 设置里填的名字）
  // 假设你在 Vercel 填的名字是 API_KEY
  const apiKey = process.env.API_KEY; 

  // 2. 检查前端发过来的请求（例如用户输入的话）
  const userMessage = req.body.message || "你好";

  try {
    // 3. 由后端代办员去请求 AI 接口
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: userMessage }]
      })
    });

    const data = await response.json();

    // 4. 把 AI 的回答传回给你的网页
    res.status(200).json(data);
  } catch (error) {
    // 如果出错了，告诉网页报错信息
    res.status(500).json({ error: "服务器开小差了" });
  }
}
