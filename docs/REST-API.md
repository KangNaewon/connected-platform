# Michhelin Backend REST API Reference

### 1. 키워드 기반 레스토랑 추천목록 가져오기

키워드 기반 레스토랑 추천목록 가져오기는 backend 서버의 데이터베이스에 저장되어 있는 레스토랑의 id, restaurant_name, rating, city, img를 가져오는 API입니다.

웹 애플리케이션의 메인 화면에서 frontend에서 backend 서버의 키워드 기반 레스토랑 추천목록 가져오기 API를 호출하면 데이터베이스에 저장된 레스토랑 중 랜덤하게 선택한 키워드를 기반으로 분류된 레스토랑들의 목록을 응답합니다.

#### Request

| ID     | URL                        | HOST                        | METHOD |
| ------ | -------------------------- | --------------------------- | ------ |
|        | /restaurants/recommendation|                             | GET    |

---

#### Response

| Name            | Type     | Description                     |
| --------------- | -------- | ------------------------------  |
| type            | String   | restaurant의 종류                |
| restaurants     | Object[] | restaurant_id, restaurant_name, rating, city, img  |
| restaurant_id   | ObjectId | restaurant document의 ObjectId  |
| restaurant_name | String   | restaurant의 이름                |
| rating          | Number   | restaurant의 미슐랭 등급            |
| city            | String   | restaurant이 위치한 도시          |
| img             | String   | restaurant의 이미지 주소          |
 

---

### 2. 레스토랑 상세 정보 가져오기

레스토랑 상세 정보 가져오기는 backend 서버의 데이터베이스에 저장되어 있는 레스토랑의 restaurant_name, location, rating, type, phone, price를 가져오는 API입니다.

웹 애플리케이션에서 하나의 레스토랑을 선택하여 frontend에서 backend 서버의 레스토랑 상세 정보 가져오기 API를 호출하면 데이터베이스에 저장된 해당 레스토랑의 상세 정보를 응답합니다.

#### Request

| ID     | URL                        | HOST                        | METHOD |
| ------ | -------------------------- | --------------------------- | ------ |
|        | /restaurants/:restaurant_id|                             | GET    |

---

#### Parameter

| Name | Type   | Description                      | Required |
| ---- | ------ | -------------------------------- | -------- |
| restaurant_id | String | 사용자가 요청한 restaurant의 Object id | TRUE     |

---

#### Response

| Name            | Type     | Description                     |
| --------------- | -------- | ------------------------------  |
| restaurant_name | String   | restaurant의 이름                |
| location        | String   | restaurant의 상세 주소            |
| rating          | Number   | restaurant의 미슐랭 등급            |
| type            | String   | restaurant의 종류               |
| phone            | String   | restaurant의 전화번호          |
| price            | String   | restaurant의 가격대          |

---

### 3. 레스토랑 검색하기

레스토랑 검색하기는 레스토랑 이름을 query로 받아 backend 서버의 데이터베이스에 저장되어있는 해당 레스토랑의 restaurant_id, restaurant_name, rating, city, img를 가져오는 API입니다.

#### Request

| ID     | URL                        | HOST                        | METHOD |
| ------ | -------------------------- | --------------------------- | ------ |
|        | /restaurants/:|            |                  | GET    |

---

#### Parameter

| Name | Type   | Description                      | Required |
| ---- | ------ | -------------------------------- | -------- |
| q | String | 사용자가 입력한 검색 키워드 | TRUE     |
| limit | Number | 반환할 최대 검색 결과 수 | FALSE |

---

#### Response

| Name            | Type     | Description                     |
| --------------- | -------- | ------------------------------  |
| results         | Object[] | restaurant_id, restaurant_name, rating, city, img |
| restaurant_id   | ObjectId | restaurant document의 ObjectId |
| restaurant_name | String   | restaurant의 이름                |
| rating          | Number   | restaurant의 미슐랭 등급            |
| city            | String   | restaurant이 위치한 도시          |
| img             | String   | restaurant의 이미지 주소          |

---

### 4. 회원가입

회원가입은 사용자로부터 입력받은 id와 password를 통해 회원가입을 하고 default profile을 생성하는 API입니다.

#### Request

| ID     | URL                        | HOST                        | METHOD |
| ------ | -------------------------- | --------------------------- | ------ |
|        | /user/signup               |               | POST    |

#### Request Body

| Name | Type   | Description                      | Required |
| ---- | ------ | -------------------------------- | -------- |
| id | String | 사용자의 아이디 | TRUE     |
| password | Number | 사용자의 비밀번호 | TRUE |

---

### 5. 로그인

로그인은 사용자로부터 입력받은 id와 password를 통해 로그인하고 사용자의 access token과 refresh token을 불러온다.

#### Request

| ID     | URL                        | HOST                        | METHOD |
| ------ | -------------------------- | --------------------------- | ------ |
|        | /user/login                |              | POST    |

---

#### Request Body

| Name | Type   | Description                      | Required |
| ---- | ------ | -------------------------------- | -------- |
| id | String | 사용자의 아이디 | TRUE     |
| password | Number | 사용자의 비밀번호 | TRUE |

---

#### Response

| Name            | Type     | Description                     |
| --------------- | -------- | ------------------------------  |
| access_token    | String | user access token 값 |
| refresh_token   | String | refresh token 값 |

---

### 6. 프로필 정보 가져오기

프로필 정보 가져오기는 사용자에 해당하는 모든 프로필의 profile_id, profile_name을 불러오는 API 입니다.

#### Request

| ID     | URL                        | HOST                        | METHOD |
| ------ | -------------------------- | --------------------------- | ------ |
|        | /user/:id/profile           |                   | GET    |

---

#### Parameter

| Name | Type   | Description                      | Required |
| ---- | ------ | -------------------------------- | -------- |
| id | String | 사용자가의 아이디 | TRUE     |

---

#### Request Header

| Header | Value   | Description                      | Required |
| ---- | ------ | -------------------------------- | -------- |
| Authorization | user access token | 로그인 시 발급 받은 user access token | TRUE     |

---

#### Response

| Name            | Type     | Description                     |
| --------------- | -------- | ------------------------------  |
| profiles    | Object[] | profile_id, profile_name |
| profile_id   | ObjectId | profile document의 ObjectId |
| profile_name | String | 프로필 명 |

---

### 7. 프로필 생성하기

프로필 생성하기는 프로필 명을 입력으로 받아 새로운 프로필을 생성하는 API 입니다.

#### Request

| ID     | URL                        | HOST                        | METHOD |
| ------ | -------------------------- | --------------------------- | ------ |
|        | /profile                   |           | POST    |

---

#### Request Body

| Name | Type   | Description                      | Required |
| ---- | ------ | -------------------------------- | -------- |
| profile_name | String | 프로필 명 | TRUE     |

---

#### Request Header

| Header | Value   | Description                      | Required |
| ---- | ------ | -------------------------------- | -------- |
| Authorization | user access token | 로그인 시 발급 받은 user access token | TRUE     |

---

### 8. 프로필 삭제하기

프로필 삭제하기는 profile_id를 입력으로 받아 해당하는 프로필을 삭제하는 API 입니다.

#### Request

| ID     | URL                        | HOST                        | METHOD |
| ------ | -------------------------- | --------------------------- | ------ |
|        | /profile/:profile_id       |                       | DELETE    |

---

#### Parameter

| Name | Type   | Description                      | Required |
| ---- | ------ | -------------------------------- | -------- |
| profile_id | ObjectId | profile document의 ObjectId | TRUE     |

---

#### Request Header

| Header | Value   | Description                      | Required |
| ---- | ------ | -------------------------------- | -------- |
| Authorization | user access token | 로그인 시 발급 받은 user access token | TRUE     |

---

### 9. 프로필 명 변경하기

프로필 명 변경하기는 profile_id를 입력으로 받아 해당하는 프로필의 프로필 명을 변경하는 API 입니다.

#### Request

| ID     | URL                        | HOST                        | METHOD |
| ------ | -------------------------- | --------------------------- | ------ |
|        | /profile/:profile_id       |                       | PATCH    |

---

#### Parameter

| Name | Type   | Description                      | Required |
| ---- | ------ | -------------------------------- | -------- |
| profile_id | ObjectId | profile document의 ObjectId | TRUE     |

---

#### Request Header

| Header | Value   | Description                      | Required |
| ---- | ------ | -------------------------------- | -------- |
| Authorization | user access token | 로그인 시 발급 받은 user access token | TRUE     |

---

### 10. 프로필 전환하기

프로필 전환하기는 프로필을 전환하고 해당하는 profile access token을 받아오는 API 입니다.

#### Request

| ID     | URL                        | HOST                        | METHOD |
| ------ | -------------------------- | --------------------------- | ------ |
|        | /profile/switch/:profile_id |                       | POST    |

---

#### Parameter

| Name | Type   | Description                      | Required |
| ---- | ------ | -------------------------------- | -------- |
| profile_id | ObjectId | profile document의 ObjectId | TRUE     |

---

#### Request Header

| Header | Value   | Description                      | Required |
| ---- | ------ | -------------------------------- | -------- |
| Authorization | user access token | 로그인 시 발급 받은 user access token | TRUE     |

---

#### Response

| Name            | Type     | Description                     |
| --------------- | -------- | ------------------------------  |
| token    | String | profile access token 값 |

---

### 11. 좋아요 목록, 방문목록 가져오기

프로필의 좋아요 목록, 방문목록 가져오기는 프로필의 레스토랑 좋아요 목록, 방문목록을 가져오는 API 입니다.

#### Request

| ID     | URL                        | HOST                        | METHOD |
| ------ | -------------------------- | --------------------------- | ------ |
|        | /profile/:profile_id |                       | GET    |

---

#### Parameter

| Name | Type   | Description                      | Required |
| ---- | ------ | -------------------------------- | -------- |
| profile_id | ObjectId | profile document의 ObjectId | TRUE  |

---

#### Request Header

| Header | Value   | Description                      | Required |
| ---- | ------ | -------------------------------- | -------- |
| Authorization | profile access token | 프로필 전환 시 발급 받은 profile access token | TRUE     |

---

#### Response

| Name            | Type     | Description                     |
| --------------- | -------- | ------------------------------  |
| likes    | Object[] | restaurant_id, restaurant_name, rating, city, img |
| visited  | Object[] | restaurant_id, restaurant_name, rating, city, img |
| restaurant_id   | ObjectId | restaurant document의 ObjectId  |
| restaurant_name | String   | restaurant의 이름                |
| rating          | Number   | restaurant의 미슐랭 등급            |
| city            | String   | restaurant이 위치한 도시          |
| img             | String   | restaurant의 이미지 주소          |

---

### 12. 레스토랑 좋아요, 별로예요, 방문여부 불러오기

레스토랑 좋아요, 별로예요, 방문여부 불러오기는 사용자의 해당 레스토랑 좋아요, 별로예요, 방문여부를 불러오는 API 입니다.

#### Request

| ID     | URL                        | HOST                        | METHOD |
| ------ | -------------------------- | --------------------------- | ------ |
|        | /profile/:profile_id/:restaurant_id |                       | GET    |

---

#### Parameter

| Name | Type   | Description                      | Required |
| ---- | ------ | -------------------------------- | -------- |
| profile_id | ObjectId | profile document의 ObjectId | TRUE  |
| restaurant_id | ObjectId | restaurant document의 ObjectID | TRUE |

---

#### Request Header

| Header | Value   | Description                      | Required |
| ---- | ------ | -------------------------------- | -------- |
| Authorization | profile access token | 프로필 전환 시 발급 받은 profile access token | TRUE     |

---

#### Response

| Name            | Type     | Description                     |
| --------------- | -------- | ------------------------------  |
| likes    | Boolean | 프로필의 좋아요 목록에 포함되는지 여부 |
| disliked  | Boolean | 프로필의 별로예요 목록에 포함되는지 여부 |
| visited  | Boolean | 프로필의 방문목록에 포함되는지 여부  |

---

### 13. 레스토랑 좋아요 추가하기

레스토랑 좋아요 추가하기는 프로필의 좋아요 목록에 레스토랑을 추가하는 API 입니다.

#### Request

| ID     | URL                        | HOST                        | METHOD |
| ------ | -------------------------- | --------------------------- | ------ |
|        | /profile/:profile_id/like |                       | POST    |

---

#### Parameter

| Name | Type   | Description                      | Required |
| ---- | ------ | -------------------------------- | -------- |
| profile_id | ObjectId | profile document의 ObjectId | TRUE  |

---

#### Request Body

| Name | Type   | Description                      | Required |
| ---- | ------ | -------------------------------- | -------- |
| restaurant_id | ObjectId | restaurant document의 ObjectId | TRUE |

---

#### Request Header

| Header | Value   | Description                      | Required |
| ---- | ------ | -------------------------------- | -------- |
| Authorization | profile access token | 프로필 전환 시 발급 받은 profile access token | TRUE     |

---

### 14. 레스토랑 좋아요 취소하기

레스토랑 좋아요 취소하기는 프로필의 좋아요 목록에서 레스토랑을 삭제하는 API 입니다.

#### Request

| ID     | URL                        | HOST                        | METHOD |
| ------ | -------------------------- | --------------------------- | ------ |
|        | /profile/:profile_id/like |                       | DELETE |

---

#### Parameter

| Name | Type   | Description                      | Required |
| ---- | ------ | -------------------------------- | -------- |
| profile_id | ObjectId | profile document의 ObjectId | TRUE  |

---

#### Request Body

| Name | Type   | Description                      | Required |
| ---- | ------ | -------------------------------- | -------- |
| restaurant_id | ObjectId | restaurant document의 ObjectId | TRUE |

---

#### Request Header

| Header | Value   | Description                      | Required |
| ---- | ------ | -------------------------------- | -------- |
| Authorization | profile access token | 프로필 전환 시 발급 받은 profile access token | TRUE     |

---

---

### 15. 레스토랑 별로예요 추가하기

레스토랑 별로예요 추가하기는 프로필의 별로예요 목록에 레스토랑을 추가하는 API 입니다.

#### Request

| ID     | URL                        | HOST                        | METHOD |
| ------ | -------------------------- | --------------------------- | ------ |
|        | /profile/:profile_id/dislike |                       | POST    |

---

#### Parameter

| Name | Type   | Description                      | Required |
| ---- | ------ | -------------------------------- | -------- |
| profile_id | ObjectId | profile document의 ObjectId | TRUE  |

---

#### Request Body

| Name | Type   | Description                      | Required |
| ---- | ------ | -------------------------------- | -------- |
| restaurant_id | ObjectId | restaurant document의 ObjectId | TRUE |

---

#### Request Header

| Header | Value   | Description                      | Required |
| ---- | ------ | -------------------------------- | -------- |
| Authorization | profile access token | 프로필 전환 시 발급 받은 profile access token | TRUE     |

---

### 16. 레스토랑 별로예요 취소하기

레스토랑 별로예요 취소하기는 프로필의 별로예요 목록에서 레스토랑을 삭제하는 API 입니다.

#### Request

| ID     | URL                        | HOST                        | METHOD |
| ------ | -------------------------- | --------------------------- | ------ |
|        | /profile/:profile_id/dislike |                       | DELETE |

---

#### Parameter

| Name | Type   | Description                      | Required |
| ---- | ------ | -------------------------------- | -------- |
| profile_id | ObjectId | profile document의 ObjectId | TRUE  |

---

#### Request Body

| Name | Type   | Description                      | Required |
| ---- | ------ | -------------------------------- | -------- |
| restaurant_id | ObjectId | restaurant document의 ObjectId | TRUE |

---

#### Request Header

| Header | Value   | Description                      | Required |
| ---- | ------ | -------------------------------- | -------- |
| Authorization | profile access token | 프로필 전환 시 발급 받은 profile access token | TRUE     |

---

### 17. 레스토랑 방문 추가하기

레스토랑 방문 추가하기는 프로필의 방문목록에 레스토랑을 추가하는 API 입니다.

#### Request

| ID     | URL                        | HOST                        | METHOD |
| ------ | -------------------------- | --------------------------- | ------ |
|        | /profile/:profile_id/visit |                       | POST    |

---

#### Parameter

| Name | Type   | Description                      | Required |
| ---- | ------ | -------------------------------- | -------- |
| profile_id | ObjectId | profile document의 ObjectId | TRUE  |

---

#### Request Body

| Name | Type   | Description                      | Required |
| ---- | ------ | -------------------------------- | -------- |
| restaurant_id | ObjectId | restaurant document의 ObjectId | TRUE |

---

#### Request Header

| Header | Value   | Description                      | Required |
| ---- | ------ | -------------------------------- | -------- |
| Authorization | profile access token | 프로필 전환 시 발급 받은 profile access token | TRUE     |

---

### 18. 레스토랑 방문 취소하기

레스토랑 방문 취소하기는 프로필의 방문목록에서 레스토랑을 삭제하는 API 입니다.

#### Request

| ID     | URL                        | HOST                        | METHOD |
| ------ | -------------------------- | --------------------------- | ------ |
|        | /profile/:profile_id/visit |                       | DELETE |

---

#### Parameter

| Name | Type   | Description                      | Required |
| ---- | ------ | -------------------------------- | -------- |
| profile_id | ObjectId | profile document의 ObjectId | TRUE  |

---

#### Request Body

| Name | Type   | Description                      | Required |
| ---- | ------ | -------------------------------- | -------- |
| restaurant_id | ObjectId | restaurant document의 ObjectId | TRUE |

---

#### Request Header

| Header | Value   | Description                      | Required |
| ---- | ------ | -------------------------------- | -------- |
| Authorization | profile access token | 프로필 전환 시 발급 받은 profile access token | TRUE     |

---

### 19. 동영상 불러오기

동영상 불러오기는 동영상의 마스터 플레이리스트를 불러오는 API 입니다.

#### Request

| ID     | URL                        | HOST                        | METHOD |
| ------ | -------------------------- | --------------------------- | ------ |
|        | /media/:media_id/master.m3u8 |                       | GET |

---

#### Parameter

| Name | Type   | Description                      | Required |
| ---- | ------ | -------------------------------- | -------- |
| media_id | String | media의 id 명 | TRUE  |

---

### Response

| Name            | Type     | Description                     |
| --------------- | -------- | ------------------------------  |
| master.m3u8 | file | 화질 별 플레이리스트 정보를 담고있는 m3u8 파일 |

---

### 20. 동영상 화질 별로 불러오기

동영상 화질 별로 불러오기는 동영상의 화질 별 segment를 불러오는 API 입니다.

#### Request

| ID     | URL                        | HOST                        | METHOD |
| ------ | -------------------------- | --------------------------- | ------ |
|        | /media/:media_id/resolution/:segment |                       | GET |

---

#### Parameter

| Name | Type   | Description                      | Required |
| ---- | ------ | -------------------------------- | -------- |
| media_id | String | media의 id 명 | TRUE  |
| resolution | String | 화질 명 | TRUE |
| segment | String | 화질 별 .ts 파일 명 | TRUE |

---

### Response

| Name            | Type     | Description                     |
| --------------- | -------- | ------------------------------  |
| .ts | file | 화질 별 segment 파일 |

---

### 21. 시청기록 불러오기

시청기록 불러오기는 동영상의 이전 재생시점을 불러오는 API 입니다.

#### Request

| ID     | URL                        | HOST                        | METHOD |
| ------ | -------------------------- | --------------------------- | ------ |
|        | /media/playback |                       | GET |

---

#### Parameter

| Name | Type   | Description                      | Required |
| ---- | ------ | -------------------------------- | -------- |
| profile_id | ObjectId | profile documentd의 ObjectId | TRUE  |
| media_id | String | media의 id 명 | TRUE |

---

### Response

| Name            | Type     | Description                     |
| --------------- | -------- | ------------------------------  |
| progress | Number | 저장된 이전 재생시점 |

---

### 22. 시청기록 저장하기

시청기록 저장하기는 동영상의 이전 재생시점을 저장하는 API 입니다.

#### Request

| ID     | URL                        | HOST                        | METHOD |
| ------ | -------------------------- | --------------------------- | ------ |
|        | /media/playback |                       | POST |

---

#### Body

| Name | Type   | Description                      | Required |
| ---- | ------ | -------------------------------- | -------- |
| profile_id | ObjectId | profile documentd의 ObjectId | TRUE  |
| media_id | String | media의 id 명 | TRUE |
| progress | Number | 재생시점 | TRUE
