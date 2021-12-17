## 장바구니 앱

### ~ing 진행중 
<br>
<br>
 ### 첫화면
  
  grid layout을 표현하기 위해 고민을 많이 했다. 

  ```
  [a,b,c,d,e,f] => [{a,b},{b,c},{e,f}]
  ```
  위와 같이 새로운 배열을 생성 해보자 라는 생각을 했고 
  
arr|new_arr|
---|---|
a|{a, b}|
b|{c, d}|
c|{e, f}|
d| --- |
e| --- |
f| --- |


<img src="https://user-images.githubusercontent.com/38012855/146524800-06b5c851-7971-4ba9-b38b-ba3e831507a4.png" width="170" height="340"/>

  한줄에 하나씩 표현하는것을 한줄에 두개씩 표현하여 grid layout같은 느낌을 나타냈다.

 ### 바구니

<img src="https://user-images.githubusercontent.com/38012855/146527417-0645d21d-383c-46d8-9ad3-2f50e0c1e0cd.png" width="170" height="340"/>

담기 기능에서 __useState__ 로 사용하여 담겨진 리스트 상태를 유지를 하려 했으나 지역 상태이다보니깐 유지가 힘들었다. 즉, 다른 페이지 갔다 오면 리스트가 리셋이 되었다. 이를 고안 해낸 것이 __useReducer + useContext__ 를 하여 전역상태로 바꾸어 리셋이 되지 않도록 했다. 새로운 hooks를 사용을 한 좋은 경험이였다. 다음은 hooks custom해봐야 겠다.


### DB연동

앱개발은 expo cli로 시작을 했고 
인증과 DB는 firebase를 사용하였다. Reactnative가 자바스크립트 언어 이다보니깐 firebase문서를 Web방식을 적용을 했는데 여기서 expo와 web방식에 firebase가 약간 문제가 있는다고 한다. __error__ 는 아니고 __Warning__ 이였는데 안되는 건 아니였다.

처음 데이터를 추가하는 방법에서 __addDoc()__ 사용을 했는데 이 방법은 
<br>
<img src="https://user-images.githubusercontent.com/38012855/146528660-3aedbe26-0d9d-4765-a200-10d13b29b031.JPG" width="700" height="350"/>
<br>
유저마다 컬렉션이 생기고 주문날에 문서가 생기는 방법인데 컬렉션 효율적을 사용하는 것 같지 않았다. 그래서

<img src="https://user-images.githubusercontent.com/38012855/146529080-acfe52d9-442c-44b0-8030-1e22c98d956d.JPG" width="700" height="350"/>

__updateDoc()__ 방법으로 변경을 했다.  *order* 라는 하나의 컬렉션에 여러 유저를 관리 할 수있게 됐다. 컬렉션을 더욱 효율적으로 바꾼 것 같다. 그리고 필드 안에 유저 정보와 주문날을 한번에 
볼 수 있게 되었다.


![bandicam-2021-12-17-19-50-27-246](https://user-images.githubusercontent.com/38012855/146534128-b582430f-2a07-4b67-ae61-957747f705dc.gif)
