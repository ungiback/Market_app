## 장바구니 앱

 ### 첫화면
  
  grid layout을 표현하기 위해 고민을 많이 했다. 

  ```
  [a,b,c,d,e,f] => [{a,b},{b,c},{e,f}]
  ```
  위와 같이 새로운 배열을 생성 해보자 라는 생각을 했고 
  <p float="left">
   arr|new_arr|
  ---|---|
  a |{a, b}|
  b |{c, d}|
  c |{e, f}|
  d | --- |
  e | --- |
  f | --- |
  <img src="https://user-images.githubusercontent.com/38012855/146504472-45789eb6-6307-49c6-9d2d-3f73a5cccf07.jpg" width="200" height="400"/>
  <p/>

  한줄에 하나씩 표현하는것을 한줄에 두개씩 표현하여 grid layout같은 느낌을 나타냈다.

 ### 바구니


담기 기능에서 __useState__ 로 사용하여 담겨진 리스트 상태를 유지를 하려 했으나 지역 상태이다보니깐 유지가 힘들었다. 즉, 다른 페이지 갔다 오면 리스트가 리셋이 되었다. 이를 고안 해낸 것이 __useReducer + useContext__ 를 하여 전역상태로 바꾸어 리셋이 되지 않도록 했다.


### DB연동

앱개발은 expo cli로 시작을 했고 
인증과 DB는 firebase를 사용하였다. Reactnative가 자바스크립트 언어 이다보니깐 firebase문서를 Web방식을 적용을 했는데 여기서 expo와 web방식에 firebase가 약간 문제가 있는다고 한다. __error__ 는 아니고 __Warning__ 이였는데 안되는 건 아니였다.

