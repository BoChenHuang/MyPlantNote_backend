export const ensureToken = (req, res, next) => {
  const bearerHeader = req.headers.authorization;
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" "); // 字串切割
    const bearerToken = bearer[1]; // 取得 JWT
    req.token = bearerToken; // 在response中建立一個token參數
    next(); // 結束 Middleware 進入 articleCtrl.articlePersonalGet
  } else {
    res
      .status(403)
      .send(Object.assign({ code: 403 }, { message: "您尚未登入！" })); // Header 查無 Rearer Token
  }
};
