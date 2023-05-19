const http = require("http");

const { parse } = require("querystring");

const HOST = "127.0.0.1";
const PORT = 3000;


let user = { user_agent: 0 };
let body = "";

const server = http.createServer((req, res) => {
    if (req.method === "GET") {
        if (req.url === "/") {
            console.log(`Получен ${req.method} - запрос на корневой элемент`);
            res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
            res.end("Hello world!");
        }

         else if (req.url === "/stats") {
            console.log(`Получен ${req.method} - запрос на /stats`);
            res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
            user.user_agent++;
            res.end(`<table>
			<tr><td>User-agent:</td>
			<td>Request:</td></tr>
			<tr><td>${req.headers["user-agent"]}</td>
			<td>${user.user_agent}</td></tr>
			</table>`);
        }

        else {
          res.writeHead(400, { "Content-Type": "text/plain; charset=utf-8" });
          res.end("404 not found!");
        }
    } 
    
    else if (req.method === "POST") {
        if (req.url === "/comments") {
            console.log(`Получен ${req.method} - запрос на /comments`);
            res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
            //   req.on("data", (chunk) => {
            //     users += chunk.toString();
            //   });
            //   req.on("end", () => {
            //     let param = JSON.parse(users);
            //     com += JSON.stringify(param);
            //     console.log(param);
            //     res.end("Данные успешно отправлены!");
            //   });

            // let body = "";
            req.on('data', (chunk) => {
                body += chunk.toString();
            });
            req.on('end', () => {
                let params = parse(body);
                console.log(params);
                res.end("Данные успешно отправлены!");
            });
        } 
        else {
            res.writeHead(400, { "Content-Type": "text/plain; charset=utf-8" });
            res.end("400 not found!");
        }
    }
    else {
        res.writeHead(400, { "Content-Type": "text/plain; charset=utf-8" });
        res.end("404 not found!");
    }
});

server.listen(PORT, HOST, () => {
    console.log(`Сервер запущен http://${HOST}:${PORT}`);
});

server.on("connection", () => {
    console.log("Ошибка!");
});