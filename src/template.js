module.exports = {
  HTML: function (title, body, authStatusUI) {
    return `
    <!DOCTYPE html>
<html lang="en">
<head>
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta charset="UTF-8">
  <style>
  * {
  margin: 0px;
  padding: 0px;
  font: 12px 고딕;
}

ul, ol { list-style: none; }

a {
  text-decoration: none;
  color: #111;
}

input, textarea { outline: none; }

#wrapper { width: 100%; }

/* 헤더 */

header {
  width: 100%;
  height: 197px;
}

header > div {
  width: 100%;
  box-sizing: border-box;
}

header > .top {
  height: 35px;
  border-bottom: 1px solid #e9e9e9;
}

header > .top > div {
  width: 1200px;
  height: 100%;
  margin: 0 auto;
  text-align: right;
}

header > .top > div > a {
  display: inline-block;
  height: 100%;
  line-height: 35px;
  border-left: 1px solid #e9e9e9;
  padding: 0 10px;
  color: #646464;
}

header > .top > div > a:hover {
  color: #333;
  border-bottom: 1px solid #444;
}

header > .top > div > a:last-child {
  border-right: 1px solid #e9e9e9;
}

header > .logo {
  height: 115px;
  border-bottom: 1px solid #e9e9e9;
}

header > .logo > div {
  position: relative;
  width: 1200px;
  height: 100%;
  margin: 0 auto;
}

header > .logo > div > a {
  display: inline-block;
  margin-top: 30px;
}

header > .logo > div > form {
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -185px;
  margin-top: -22px;
  display: inline-block;
  width: 370px;
  height: 45px;
}

header > .logo > div > form > input {
  position: absolute;
  width: 100%;
  height: 100%;
  border: 1px solid #e9e9e9;
  border-radius: 5px;
  font-size: 20px;
  padding-left: 10px;
  padding-right: 30px;
  box-sizing: border-box;
}

header > .logo > div > form > button {
  position: absolute;
  right: 6px;
  top: 10px;
  background: #fff;
  border: none;
  font-size: 20px;
  color: #333;
  outline: none;
}

header > .menu {
  height: 46px;
  background: #f2f2f2;
  border-bottom: 1px solid #ddd;
  box-sizing: border-box;
}

header > .menu > div {
  width: 1200px;
  height: 100%;
  margin: 0 auto;
}

header > .menu > div > ul {
  display: inline-block;
  margin-top: 16px;
}

header > .menu > div > ul:nth-child(1) { float: left; }

header > .menu > div > ul:nth-child(2) { float: right; }

header > .menu > div > ul > li:last-child { border-right: 1px solid #e9e9e9; }

header > .menu > div > ul > li { float: left;}

header > .menu > div > ul > li > a {
  border-left: 1px solid #e9e9e9;
  padding: 0 10px;
}

/* 메인 */

main {
  width: 1200px;
  height: auto;
  margin: 0 auto;
  overflow: hidden;
}

main > aside {
  float: left;
  width: 215px;
  height: 100%;
}

main > section {
  float: middle;
  width: 1100px;
  height: auto;
  box-sizing: border-box;
}


/* 푸터 */

footer {
  width: 100%;
  height: 192px;
  background: #f8f8f8;
  border-top: 1px solid #e9e9e9;
  box-sizing: border-box;
}

footer > ul {
  width: 1200px;
  height: 39px;
  margin: 0 auto;
  padding: 15px 0;
  border-bottom: 1px solid #e9e9e9;
  box-sizing: border-box;
  text-align: center;
}

footer > ul > li {
  display: inline-block;
  font-weight: bold;
  border-right: 1px solid #d7d7d7;
  padding: 0 10px;
}

footer > ul > li:nth-child(1) { border-left: 1px solid #d7d7d7; }


footer > div {
  width: 1200px;
  height: auto;
  padding-top: 20px;
  box-sizing: border-box;
  margin: 0 auto;
}

footer > div > p {
  float: left;
  height: 100%;
  font-size: 11px;
  line-height: 15px;
  color: #676767;
}

footer > div > p:nth-of-type(2) {
  width: 300px;
  margin-left: 30px;
  margin-right: 30px;
}



footer > div > p > strong {
  display: inline-block;
  padding: 6px 15px 7px 0;
  font-size: 12px;
  font-weight: bold;
}

/* 하단 버튼 */

#top {
  position: fixed;
  left: 50%;
  bottom: 10px;
  margin-left: 600px;
  width: 42px;
  height: 42px;
  background-image: url(../img/top.png);
  border: none;
  font-size: 0;
  cursor: pointer;
}
  *{
    padding: 6;
    margin: 0;
    border: none;
}
body {
    font-size: 14px;
    font-family: 'Roboto', sans-serif;
    margin: 0;
    padding: 0;
}

.login-wrapper, .register-wrapper {
    width: 500px;
    margin: 50px auto;
    padding: 40px;
    box-sizing: border-box;
    background-color: #fff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

h2 {
    font-size: 24px;
    color: #333;
    margin-bottom: 20px;
}

form {
    margin-bottom: 20px;
}

.login, .register {
    width: 100%;
    height: 40px;
    padding: 10px;
    box-sizing: border-box;
    margin-bottom: 16px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

.btn {
    width: 100%;
    height: 40px;
    background-color: #7f8c8d;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

.btn:hover {
    background-color: #6c7a7b;
}

label {
    display: block;
    margin-bottom: 20px;
}

#remember-check {
    margin-right: 5px;
}

p {
    margin-bottom: 16px;
}

a {
    color: #3498db;
    text-decoration: none;
}

a:hover {
    text-decoration: underline;
}

/* 추가한 부분 */
header, footer {
    margin-bottom: 20px;
}

</style>
  <title>Kmarket::main layout</title>
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
  <script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js"></script>
  <script src="https://kit.fontawesome.com/20962f3e4b.js" crossorigin="anonymous"></script>
  <script src="https://cdn.jsdelivr.net/bxslider/4.2.12/jquery.bxslider.min.js"></script>
  <link rel="stylesheet" href="https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/themes/smoothness/jquery-ui.css">
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"/>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/bxslider/4.2.12/jquery.bxslider.css">
  <link rel="stylesheet" href="css/common.css">
</head>
<body>
  <div id="wrapper">
      <header>
          
          <div class="logo">
              <div>
                  <a href="/">
                      <img src="1.gif" alt="헤더로고">
                  </a>
                  
              </div>
          </div>
          <div class="menu">
              <div>
                  <ul>
                      <li><a href="#">게임정보</a></li>
                      <li><a href="/review">커뮤니티</a></li>
                      <li><a href="/shop">쇼핑</a></li>
                  </ul>
                  <ul>
                      <li><a href="#">고객센터</a></li>
                      <li><a href="#">FAQ</a></li>
                  </ul>
              </div>
          </div>
      </header>
      <body>
      ${title}
          <div class="background">
          ${authStatusUI}
          ${body}
        </div>
      </body>
</body>
      <footer>
          <div>
              <p><img src="2.png" alt="푸터로고"></p>
              <p>
                  <strong>KIT 경남정보대 2조 캡스톤디자인</strong>
                  <br>
                  조원: 김도형, 김환규, 김민서, 권용우, 서재우
                  <br>
                  Tel : 010-123-4567 | Mail : kit@gmail.com
              </p>
          </div>
      </footer>
  </div>
</html>
    `;
  }
}