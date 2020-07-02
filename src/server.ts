import server from "./infra/http/app";


let app = server.build();
app.listen(process.env.PORT || 3333)
