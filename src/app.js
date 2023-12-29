const express = require('express');
const mysql = require('mysql');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session'); // express-session 모듈을 가져옵니다.
const FileStore = require('session-file-store')(session);
const nunjucks = require('nunjucks');
const app = express();


var authRouter = require('./auth.js');
var authCheck = require('./authCheck.js');
var template = require('./template.js');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
  secret: 'hello', // 원하는 문자 입력
  resave: false,
  saveUninitialized: true,
  store: new FileStore(),
}));


// 인증 라우터
app.use('/auth', authRouter);


// MySQL 연결 정보를 설정합니다.
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'dbdb'
});

// MySQL 연결을 수립합니다.
connection.connect((err) => {
  if (err) {
    console.error('MySQL 연결 오류: ' + err.stack);
    return;
  }
  console.log('MySQL 데이터베이스와 연결되었습니다.');
});

app.set('view engine', 'html');
nunjucks.configure('views',{
  express: app,
  watch: true,
});

// 정적 파일(HTML, CSS, JavaScript 등)을 서빙할 경로를 설정합니다.
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.static('public'));
// POST 요청의 본문을 파싱하기 위한 미들웨어
app.use(bodyParser.urlencoded({ extended: true }));

// 루트 경로("/")에서 로그인 페이지 서빙
app.get('/', (req, res) => {
  res.render('main', {
    title: '보드게임 커뮤니티',
    is_logined: req.session.is_logined,
    nickname: req.session.nickname
  });
});
app.get('/review', (req, res) => {
  connection.query(`
    SELECT 
      game_review.*, usertable.username 
    FROM 
      game_review 
    JOIN 
      usertable ON game_review.user_id = usertable.id 
    ORDER BY 
      review_date DESC`, (error, results) => {
    if (error) throw error;
    results.forEach(review => {
      const date = new Date(review.review_date);
      review.review_date = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    });
    res.render('review', {
      title: '게임후기',
      is_logined: req.session.is_logined,
      nickname: req.session.nickname,
      reviews: results
    });
  });
});




app.get('/review_view', (req, res) => {
  const reviewId = req.query.review_id;
  connection.query('UPDATE game_review SET view_count = view_count + 1 WHERE review_id = ?', [reviewId], (error, results) => {
    if (error) throw error;
    connection.query('SELECT game_review.*, usertable.username, usertable.id as writer_id FROM game_review JOIN usertable ON game_review.user_id = usertable.id WHERE review_id = ?', [reviewId], (error, results) => {
      if (error) throw error;
      if (results.length > 0) {
        const review = results[0];
        const date = new Date(review.review_date);
        review.review_date = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
        res.render('review_view', {
          title: '게임후기 상세',
          is_logined: req.session.is_logined,
          user_id: req.session.user_id,  // 로그인한 사용자의 ID를 템플릿에 전달합니다
          nickname: req.session.nickname,
          review: review
        });
      } else {
        res.status(404).send('Not Found');
      }
    });
  });
});



app.post('/review/delete/:id', (req, res) => {
  const reviewId = req.params.id;
  connection.query('DELETE FROM game_review WHERE review_id = ?', [reviewId], (error, results) => {
    if (error) throw error;
    res.redirect('/review');
  });
});

app.get('/review_writer', (req, res) => {
  res.render('review_writer', {
    title: '보드게임 커뮤니티',
    is_logined: req.session.is_logined,
    nickname: req.session.nickname
  });
});

// 'review_writer'에서 POST 요청을 처리하는 라우트
app.post('/review_writer', (req, res) => {
  const { review_title, review_content } = req.body;
  const user_id = req.session.user_id;  // 세션에서 사용자 ID를 가져옵니다.

  // MySQL 쿼리를 실행하여 게임 리뷰를 데이터베이스에 저장합니다.
  connection.query('INSERT INTO game_review (user_id, review_title, review_content, review_date) VALUES (?, ?, ?, NOW())', [user_id, review_title, review_content], (error, results) => {
    if (error) {
      console.error('게임 리뷰 저장 오류: ' + error.stack);
      return;
    }
    console.log('게임 리뷰가 성공적으로 저장되었습니다.');

    // 저장이 완료되면 리뷰 페이지로 리다이렉트합니다.
    res.redirect('/review');
  });
});



app.get('/review_edit', (req, res) => {
  const reviewId = req.query.review_id;
  connection.query('SELECT * FROM game_review WHERE review_id = ?', [reviewId], (error, results) => {
    if (error) throw error;
    if (results.length > 0) {
      const review = results[0];
      res.render('review_edit', {
        title: '게임후기 수정',
        is_logined: req.session.is_logined,
        nickname: req.session.nickname,
        review: review
      });
    } else {
      res.status(404).send('Not Found');
    }
  });
});

app.post('/review_edit', (req, res) => {
  const { review_id, review_title, review_content } = req.body;

  connection.query('UPDATE game_review SET review_title = ?, review_content = ? WHERE review_id = ?', [review_title, review_content, review_id], (error, results) => {
    if (error) {
      console.error('게임 리뷰 수정 오류: ' + error.stack);
      return;
    }
    console.log('게임 리뷰가 성공적으로 수정되었습니다.');

    res.redirect('/review_view?review_id=' + review_id);
  });
});

app.get('/introduce', (req, res) => {
  res.render('introduce', {
    title: '보드게임 커뮤니티',
    is_logined: req.session.is_logined,
    nickname: req.session.nickname
  });
});

app.get('/shop', (req, res) => {
  res.render('shop', {
    title: '보드게임 커뮤니티',
    is_logined: req.session.is_logined,
    nickname: req.session.nickname
  });
});

app.get('/shop2', (req, res) => {
  res.render('shop2', {
    title: '보드게임 커뮤니티',
    is_logined: req.session.is_logined,
    nickname: req.session.nickname
  });
});

app.get('/login', (req, res) => {
  res.render('login', {
    title: '보드게임 커뮤니티',
    is_logined: req.session.is_logined,
    nickname: req.session.nickname
  });
});




app.get('/review', (req, res) => {
  connection.query('SELECT * FROM game_review ORDER BY review_date DESC', (error, results) => {
    if (error) throw error;
    res.render('review', {
      title: '게임후기',
      is_logined: req.session.is_logined,
      nickname: req.session.nickname,
      reviews: results
    });
  });
});


// 서버를 시작합니다.
const port = 3000;
app.listen(port, () => {
  console.log(`서버가 포트 ${port}에서 실행 중입니다.`);
});
