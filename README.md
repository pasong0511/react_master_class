## 🥞 꿀팁

### 타입 편하게 만드는 방법

📌 5.6 Data Types (11:07)

VSCode 단축키

```
Ctrl(Command)+D: 같은 문자열 선택
Shift+Alt(Option)+i: 선택한 모든 문자열에 가장 우측 끝으로 포커싱
Ctrl(Command)+Shift+오른쪽 화살표: 현재 선택한 문자열을 기준으로 우측 끝까지 문자열 선택
```

```
노마드코더 코딩 인생 꿀템 VSC 단축키 5분 정리해드림
https://www.youtube.com/watch?v=Wn7j5dfbJF4

JSON데이터를 타입스크립트 타입으로 빠르게 변환시켜주는 사이트
https://app.quicktype.io/?l=ts
```

객체에 있는거 빠르게 키, 타입 꺼내는 방법

```
Object.keys(temp1).join();
Object.values(temp1).map(v => typeof v).join();
```



## React Query리액트 쿼리

📌 5.9-5.10 React Query

React 애플리케이션에서 서버 state를 fetching, caching, synchronizing, updating할 수 있도록 도와주는 라이브러리
"global state"를 건드리지 않고 React 및 React Native 애플리케이션에서 데이터를 가져오고, 캐시하고, 업데이트

```
// Create a client
const queryClient = new QueryClient()

// Provide the client to your App
QueryClientProvider client={queryClient}
```

https://react-query.tanstack.com/quick-start



### Queries

쿼리는 서버에서 데이터를 가져오기 위해 모든 Promise 기반 메서드(GET 및 POST 메서드 포함)와 함께 사용
제공한 고유 키는 애플리케이션 전체에서 쿼리를 다시 가져오고, 캐싱하고, 공유하는 데 내부적으로 사용
useQuery에서 반환된 쿼리 결과에는 템플릿 및 기타 데이터 사용에 필요한 쿼리에 대한 모든 정보가 포함
ex) const result = useQuery('todos', fetchTodoList)
https://react-query.tanstack.com/guides/queries
https://react-query.tanstack.com/reference/useQuery#_top



### Query Key

React Query는 쿼리 키를 기반으로 쿼리 캐싱을 관리
https://react-query.tanstack.com/guides/query-keys
