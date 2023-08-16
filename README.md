# wanted-pre-onboarding-frontend

## 지원자 성명 
 조수진

## 배포링크
<https://snazzy-snickerdoodle-150a2e.netlify.app>

## 프로젝트의 실행방법

    $ git clone https://github.com/sujinnnnnnnn/wanted-pre-onboarding-frontend.git
    $ cd wanted-pre-onboarding-frontend/
    $ npm install
    $ npm start

##폴더구조
```bash
📦src
 ┣ 📂api
 ┃ ┗ 📂auth
 ┃ ┃ ┣ 📜TodoData.tsx
 ┃ ┃ ┣ 📜Token.tsx
 ┃ ┃ ┗ 📜User.tsx
 ┣ 📂assets
 ┣ 📂components
 ┃ ┣ 📂Todo
 ┃ ┃ ┣ 📜TodoItem.tsx
 ┃ ┃ ┗ 📜TodoList.tsx
 ┃ ┣ 📜SignInform.tsx
 ┃ ┗ 📜SignUpForm.tsx
 ┣ 📂hooks
 ┃ ┗ 📜useInput.tsx
 ┣ 📂pages
 ┃ ┣ 📜SignIn.tsx
 ┃ ┣ 📜SignUp.tsx
 ┃ ┗ 📜Todo.tsx
 ┣ 📂styles
 ┣ 📂type
 ┃ ┣ 📜SignInType.ts
 ┃ ┣ 📜signUptype.ts
 ┃ ┗ 📜Todostype.ts
 ┣ 📂utils
 ┣ 📜.env
 ┣ 📜index.css
 ┣ 📜index.tsx
 ┣ 📜logo.svg
 ┣ 📜react-app-env.d.ts
 ┣ 📜reportWebVitals.ts
 ┗ 📜setupTests.ts
``` 
* api : axios CRUD통신 및 토큰 발급 관련 폴더 (로그인 & 회원가입 / 투두리스트)
* compoments : 페이지 하위 컴포넌트들
* hooks : 회원가입, 로그인 유효성 검증관련 커스텀 훅
* types : api요청시 요구되는 타입들 각 페이지 별로 분류
## Git 커밋 컨벤션


|제목|설명|
|:---|:---:|
|feat|새로운 기능 추가|
|fix|버그 수정|
|docs|문서 수정|
|design|UI 변경|
|test|테스트 코드, 리펙토링 테스트 코드 추가|

## 기술스택

[![stackticon](https://firebasestorage.googleapis.com/v0/b/stackticon-81399.appspot.com/o/images%2F1692168661947?alt=media&token=d736c615-c11c-4dc1-ab07-9d2a777402bd)](https://github.com/msdio/stackticon)

## 트러블 슈팅
#### 1 .배포시 라우팅 오류 
로컬에선 생기지 않았던 라우팅 오류가 경로를 찾을수 없는 오류가 생김
netlify.toml 파일을 루트경로에 만들어 아래 코드를 넣은 뒤 경로 오류 해결

    [[redirects]]
    from = "/*"
    to = "/index.html"
    status = 200
    
#### 2. 회원가입 api 요청시 400대에러
회원가입 요청 후 요청 body형식과 엔드포인트를 알맞게 넣었음에도 불구하고 api요청이 계속 400대 관련 에러가 일어남.
=> try catch문을 사용하여 회원가입 실패시에 나오는 에러메시지를 콘솔에 찍어본 결과 동일한 이메일이 존재하여 일어난 에러였으며, 중복되지않는 이메일을 이용하니 성공적으로 응답이 오게됨
어떤 오류인지 혼동하지 않기위해 해당 메세지를 알림창을 이용하여 동일한 아이디가 있을 경우 catch문을 통해서 오는 에러메시지가 alert창에 뜰 수 있게 처리함 

    try {
    const res = await signup({ email, password });
    if (res.status === 201) {
    alert('회원가입 성공');
    navigate('/signin');
    }
    } catch (err: any) {
    const { message } = err.response.data;
    alert(message);
      }
    }
  
