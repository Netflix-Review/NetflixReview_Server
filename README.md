# Netflix review app
## Index
  - [RouterRule](#RouterRule)
  - [DatabaseStructure](#DatabaseStructure)
  - [Installing](#Installing)
  - [Authors](#Authors)
  - [License](#License)

## About RepositoryTemplate
IOS App Netflix tv, drama, movie etc recommend and User writes a review.

## RouterRule 
- 로그인 api.js
    
    미들웨어 user.js를 거쳐서 유저 검증을 하도록 작성하였다.
    
    💡/sign-up
    
    ```jsx
    router.post('/sign-up',validateRegister ,async function(req,res){
        console.log(req.body.email, req.body.password, req.body.username);
        searchID(req.body.email, req.body.username)
        .then(function(results){
            insertUser(req.body.email, req.body.password, req.body.username)
            .then(function(result){
                return res.status(201).send({
                    message: 'create ID success!',
                });
            })
            .catch(function(err){
                console.log(err);
                res.status(401).send({
                    message: 'create error please call manger',
                });
            })
        })
        .catch(function(err){
            console.log(err);
            res.status(401).send({
                message: 'already have person',
            });
        })
    });
    ```
    
    💬 validateRegister 
    
    - 데이터베이스에 넣기 전에 유효한 입력 값인지 검사한다.
    - username : min length 3 max length 15
    - password : min 6chars
    
    💡/login
    
    ```jsx
    router.post('/login', async function(req,res){
        loginID(req.body.email, req.body.password)
        .then(function(results){ 
            const username = results[0].username;
            const email=results[0].email;
            const token = jwt.sign({
                email: email,
            },'SECRETKEY',{expiresIn:"30d"});
            return res.status(201).send({
                message: "login success",
                username,
                token,
            });
        })
        .catch(function(err){
            console.log(err);
            res.status(401).send({
                message: 'not correct id or password',
            });
        }) 
    });
    ```
    
    - 회원 정보가 일치하면 기기의 토큰을 발행해준다.
    
    💡/auth
    
    ```jsx
    router.post('/auth', isLoggedIn ,async function(req,res){
        console.log(req.body);
        res.status(200).send({
            message:"correct secret",
        })
    });
    ```
    
    - 발행된 토큰과 일치해야 다른 기능들을 작동하도록 설정한 부분이다. 즉 로그인 유효성에 대한 검증을 해준다.
    
    💡/changename
    
    ```jsx
    router.post('/changename',validateUsername ,isLoggedIn, async function(req, res){
        searchUsername(req.body.cusername)
        .then(function(results){
            changeUsername(req.body.username, req.body.cusername)
            .then(function(results){
                return res.status(201).send({
                    message: "change success!",
                });
            })
            .catch(function(err){
                console.log(err);
                res.status(401).send({
                message: "change name error please contact manger",
            });
            })
        })
        .catch(function(err){
            res.status(401).send({
                message: "already exists name",
            });
        }) 
    });
    ```
    
- 데이터 불러오기
    
    drama.js
    
    movie.js
    
    tv.js
    
    - 데이터베이스 안의 데이터를 요청에 응답해준다.
- 추천 기능
    
    plusDrama.js
    
    plusMovie.js
    
    plusTv.js

## DatabaseStructure
1. 로직

<aside>
💡 node js를 이용하여 express 환경에서 MySQL을 사용한다.

</aside>

![Untitled](https://user-images.githubusercontent.com/81510864/141757433-0432fc59-5ab2-4c82-8ec9-3797afd46d22.png)

- http 요청을 받을 때 Route에서 DB를 요청하여 MySQL에 접속하여 필요한 데이터를 조회, 삽입, 수정, 삭제 등을 수행한 결과를 Route로 반환한다.
- 반환 받은 데이터를 앱으로 전송해준다.

1. 소스코드
- db.js
    
    ```jsx
    const mysql = require('mysql');
    
    const connection = mysql.createConnection({
        host:'localhost',
        user:'root',
        password:'slrlal1!',
        port:3306,
        database:'netflix'
    });
    
    function write(){
    // 함수 작성
    }
    
    module.exports = {
    	write // 함수 내보내기
    }
    ```
    
    - 접속 환경 세팅 및 요청에 맞는 SQL문 작성해주기.

```jsx
const con = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'slrlal1!',
    port:3306,
    database:'netflix',
    multipleStatements: true
});
```

- 데이터베이스 접속 con문
1. 테이블
- 영상 관련 데이터 테이블

  ![Untitled (1)](https://user-images.githubusercontent.com/81510864/141757984-8fad5e88-d220-4bfe-849f-e6744cc0e8ca.png)
   
    - id = 드라마, 영화의 고유 키 값
    - title = 제목
    - post = 포스트 사진
    - view = 디테일 사진
    - info = 상영 시간, 간략한 정보
    - des = 줄거리
    - rank = 초기값 0 → 추천시 +1
    - rankdown = 초기값0 → 추천시 -1
    
    추천 계산 공식 = (rank/rank+rankdown)*100
    
    - list = 메인화면 순위 get
    
- 유저 데이터 테이블
    
    ![Untitled (2)](https://user-images.githubusercontent.com/81510864/141758082-703b5b1f-438a-4918-a9cf-5efee85ee489.png)

    
    - id  - 이메일 아이디
    - password - 패스워드
    - username - 닉네임

### Installing
    npm install

Start Server

    npm start

## Authors
  - [kitten-master](https://github.com/kitten-master) - **DG** - <dgdev@naver.com>

See also the list of [contributors](https://github.com/Netflix-Review/netflix_review/graphs/contributors)
who participated in this project.


## License

```
MIT License

Copyright (c) 2021 always0ne

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
