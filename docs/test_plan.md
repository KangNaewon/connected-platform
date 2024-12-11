# Michelin in TV TEST Plan

## Backend Unit Test Cases
Backend API 검증은 postman을 활용한 unit test를 사용한다.

API | Test Name | Test Case ID | Description | Test Data
--- | --- | --- | --- | ---
/restaurant/recommendations | 키워드 기반 레스토랑 추천 조회 | TC01-1 | <li>Status code 200: keyword로 레스토랑 목록 조회 성공 시 응답 타입 및 필드 타입 검증</li><li>Status code 500: Internal server error 메시지 검증</li> | GET /restaurant/recommendations?keyword=Italian
/restaurant/:restaurant_id | 레스토랑 상세 조회 | TC01-2 | <li>Status code 200: restaurant_id로 레스토랑 상세 정보(restaurant_name, location, rating, type, phone, description, price, media) 필드 타입 검증</li><li>Status code 500: Internal server error 메시지 검증</li> | GET /restaurant/673b6e6bd3c4f817b188af30
/restaurant | 레스토랑 검색 | TC01-3 | <li>Status code 200: query parameter(q, limit)로 검색 결과 응답 및 results 배열 필드 타입 검증</li><li>진행 중 상태 고려</li> | GET /restaurant?q=Italian&limit=10
/user/signup | 회원가입 | TC02-1 | <li>Status code 201: 회원가입 성공 시 message 필드 검증</li><li>Status code 400: 필수 필드 누락 또는 중복 id 시 에러 메시지 검증</li><li>Status code 500: Internal server error 검증</li> | POST /user/signup { "id": "id1", "password": "1234" }
/user/login | 로그인 | TC02-2 | <li>Status code 200: 로그인 성공 시 access_token, refresh_token 필드 검증</li><li>Status code 400: 필수 필드 누락 시 에러 메시지</li><li>Status code 401: 잘못된 id/pw 시 에러 메시지</li><li>Status code 500: Internal server error 검증</li> | POST /user/login { "id": "id1", "password": "1234" }
/user/logout | 로그아웃 | TC02-3 | <li>Status code 200: 로그아웃 성공 시 message 필드 검증</li><li>refresh_token 삭제 확인</li><li>진행 중 상태 고려</li> | POST /user/logout { "refresh_token": "<refresh_token>" }
/user/refresh | Access Token 재발급 | TC02-4 | <li>Status code 200: 유효한 refresh_token으로 access_token 재발급 확인</li><li>Status code 400: refresh token 누락 시 에러 메시지</li><li>Status code 401: invalid/expired token 시 에러 메시지</li><li>Status code 500: Internal server error 검증</li> | POST /user/refresh { "refresh_token": "<refresh_token>" }
/user/refresh-token | Refresh Token 만료 시 재발급 | TC02-5 | <li>Status code 200: 만료된 refresh token으로 새 access_token, refresh_token 발급 확인</li><li>Status code 400/401: invalid/expired token 시 에러 메시지</li><li>Status code 500: Internal server error 검증</li> | POST /user/refresh-token { "refresh_token": "<refresh_token>" }
/user/:id/profile | 프로필 목록 조회 | TC02-6 | <li>Status code 200: profiles 배열 필드(profile_id, profile_name) 타입 검증</li><li>Authorization(user access token) 필요</li> | GET /user/id1/profile (Authorization: user access token)
/profile (POST) | 프로필 생성 | TC03-1 | <li>Status code 200: 프로필 생성 성공 시 created_profile 필드 검증</li><li>Authorization(user access token) 필요</li><li>진행 중 상태 고려</li> | POST /profile { "profile_name": "kim" } (Authorization: user access token)
/profile/:profile_id (DELETE) | 프로필 삭제 | TC03-2 | <li>Status code 200: 프로필 삭제 성공 시 message 필드 검증</li><li>Authorization(user access token) 필요</li> | DELETE /profile/673b6e6bd3c4f817b188af3a (Authorization: user access token)
/profile/:profile_id (PATCH) | 프로필 이름 변경 | TC03-3 | <li>Status code 200: 프로필 이름 변경 성공 시 updated_profile 필드 검증</li><li>Authorization(user access token) 필요</li> | PATCH /profile/673b6e6bd3c4f817b188af30 { "profile_name": "kim" } (Authorization: user access token)
/profile/switch/:profile_id (POST) | 프로필 전환 | TC03-4 | <li>Status code 200: 프로필 전환 성공 시 token 필드 검증</li><li>Authorization(user access token) 필요</li> | POST /profile/switch/673b6e6bd3c4f817b188af31 (Authorization: user access token)
/profile/:profile_id (GET) | 프로필 상세 (좋아요/방문목록) 조회 | TC03-5 | <li>Status code 200: likes, visited 필드 배열 구조 및 필드 타입 검증</li><li>Authorization(profile token) 필요</li> | GET /profile/673b6e6bd3c4f817b188af30 (Authorization: profile token)
/profile/:profile_id/:restaurant_id (GET) | 특정 레스토랑 상태 조회 | TC03-6 | <li>Status code 200: liked, disliked, visited 필드 boolean 타입 검증</li><li>Authorization(profile token) 필요</li> | GET /profile/673b6e6bd3c4f817b188af30/674dcae082a4e5e80b2f3481 (Authorization: profile token)
/profile/:profile_id/like (POST) | 좋아요 목록 추가 | TC03-7 | <li>Status code 200: 좋아요 추가 성공 시 message 필드 검증</li><li>Authorization(profile token) 필요</li> | POST /profile/673b6e6bd3c4f817b188af30/like { "restaurant_id": 5 } (Authorization: profile token)
/profile/:profile_id/like (DELETE) | 좋아요 목록 삭제 | TC03-8 | <li>Status code 200: 좋아요 삭제 성공 시 message 필드 검증</li><li>Authorization(profile token) 필요</li> | DELETE /profile/673b6e6bd3c4f817b188af30/like { "restaurant_id": 5 } (Authorization: profile token)
/profile/:profile_id/dislike (POST) | 별로예요 목록 추가 | TC03-9 | <li>Status code 200: 별로예요 추가 성공 시 message 필드 검증</li><li>Authorization(profile token) 필요</li> | POST /profile/673b6e6bd3c4f817b188af30/dislike { "restaurant_id": 5 } (Authorization: profile token)
/profile/:profile_id/dislike (DELETE) | 별로예요 목록 삭제 | TC03-10 | <li>Status code 200: 별로예요 삭제 성공 시 message 필드 검증</li><li>Authorization(profile token) 필요</li> | DELETE /profile/673b6e6bd3c4f817b188af30/dislike { "restaurant_id": 5 } (Authorization: profile token)
/profile/:profile_id/visit (POST) | 방문목록 추가 | TC03-11 | <li>Status code 200: 방문목록 추가 성공 시 message 필드 검증</li><li>Authorization(profile token) 필요</li> | POST /profile/673b6e6bd3c4f817b188af30/visit { "restaurant_id": 5 } (Authorization: profile token)
/profile/:profile_id/visit (DELETE) | 방문목록 삭제 | TC03-12 | <li>Status code 200: 방문목록 삭제 성공 시 message 필드 검증</li><li>Authorization(profile token) 필요</li> | DELETE /profile/673b6e6bd3c4f817b188af30/visit { "restaurant_id": 5 } (Authorization: profile token)
/media/:media_id/master.m3u8 (GET) | 동영상 마스터파일 조회 | TC04-1 | <li>Status code 200: 마스터 m3u8 파일 응답 가능 여부 확인</li> | GET /media/anmok1/master.m3u8
/media/:media_id/:resolution/:segment (GET) | 동영상 segment 조회 | TC04-2 | <li>Status code 200: 해당 resolution, segment 파일 응답 가능 여부 확인</li> | GET /media/anmok1/720p/seg1.ts
/media/playback (GET) | 시청기록 조회 | TC04-3 | <li>Status code 200: progress 필드 타입 검증</li><li>Authorization(profile token) 필요</li><li>진행 중 상태 고려</li> | GET /media/playback?profileId=674dcae082a4e5e80b2f3482&mediaId=anmok1 (Authorization: profile token)
/media/playback (POST) | 시청기록 업데이트 | TC04-4 | <li>Status code 200: 시청기록 저장 성공 시 message 필드 검증</li><li>Authorization(profile token) 필요</li><li>진행 중 상태 고려</li> | POST /media/playback { "profile_id":"674dcae082a4e5e80b2f3482","media_id":"anmok1","progress":150 } (Authorization: profile token)


---

## Frontend System Test Cases
Frontend의 사용자 interaction과 view는 use case를 기반으로한 system test를 수행한다.

### 1. 레스토랑 검색 시나리오 (TC10-1)
Test Step | Test Data | Expected Result
--- | --- | ---
사용자가 TV에서 Michelin in TV 앱을 실행한다. |  | 앱 메인 화면에 검색 인터페이스와 추천 레스토랑 목록 표시
사용자가 검색 인터페이스에 국밥 라고 입력한다. | "국밥" | "국밥" 키워드를 포함한 레스토랑 목록 표시
검색 결과가 없을 경우 "XYZQW" 입력 | "XYZQW" | "결과가 없습니다" 메시지 표시

---

### 2. 키워드 기반 레스토랑 추천 시나리오 (TC11-1)
Test Step | Test Data | Expected Result
--- | --- | ---
사용자가 앱 메인 페이지에서 "키워드 추천" 섹션을 확인한다. |  | 랜덤으로 선택된 5개 키워드 및 해당 키워드에 해당하는 레스토랑 카드 표시
각 레스토랑 카드를 스크롤한다. |  | 카드 형식 UI로 이름, 위치, 사진 정상 표시

---

### 3. 사용자 선호도 기반 추천 시나리오 (TC12-1)
Test Step | Test Data | Expected Result
--- | --- | ---
사용자가 앱에 접속하여 로그인한다. | {"username":"tttt","password":"1234"} | 로그인 성공 후 맞춤형 레스토랑 추천 목록 표시
"맞춤형 추천" 영역 확인 |  | 사용자 선호도 기반 추천 레스토랑 카드 표시

---

### 4. 레스토랑 상세 정보 조회 시나리오 (TC13-1)
Test Step | Test Data | Expected Result
--- | --- | ---
메인 페이지에서 특정 레스토랑 카드를 선택한다. | 레스토랑 카드 클릭 | 해당 레스토랑 상세 정보 페이지 표시(이름, 위치, 가격대, 전화번호, 미디어 콘텐츠)
탭 전환(메뉴, 리뷰) |  | 선택한 탭에 맞는 정보 정상 표시

---

### 5. 미디어 콘텐츠 재생 시나리오 (TC14-1)
Test Step | Test Data | Expected Result
--- | --- | ---
상세 페이지 내 미디어 콘텐츠 선택 | 미디어 콘텐츠 선택 | 영상 재생 플레이어 표시 및 영상 재생 시작
일시정지/재개 버튼 조작 |  | 해당 동작에 따라 영상 일시정지/재개
재생 종료 후 다시 페이지 접근 |  | 재생 기록 반영

---

### 6. 관심 목록 관리 시나리오 (TC15-1)
Test Step | Test Data | Expected Result
--- | --- | ---
로그인 후 "My Page" 이동 |  | 관심 목록 탭에 관심 레스토랑 목록 표시
레스토랑에 관심 추가/삭제 버튼 클릭 |  | 해당 레스토랑이 관심 목록에 추가/삭제됨, 변경 즉시 반영

---

### 7. 방문 기록 관리리 시나리오 (TC16-1)
Test Step | Test Data | Expected Result
--- | --- | ---
"My Page"에서 방문 기록 탭 오픈 |  | 방문한 레스토랑 목록 표시
방문한 레스토랑 카드 선택 |  | 해당 레스토랑 상세 정보 페이지 표시
방문한 레스토랑 추가/삭제 버튼 클릭 |  | 해당 레스토랑이 방문 목록에 추가/삭제됨, 변경 즉시 반영

---

### 8. 사용자 프로필 전환 시나리오 (TC17-1)
Test Step | Test Data | Expected Result
--- | --- | ---
여러 프로필 존재 시 프로필 전환 버튼 클릭 |  | 사용 가능한 프로필 목록 표시
다른 프로필 선택 |  | 해당 프로필 맞춤 데이터(관심 목록, 추천 목록, 방문 기록)로 화면 갱신

---

### 9. 시스템 자원 현황 시각화 시나리오 (TC18-1)
Test Step | Test Data | Expected Result
--- | --- | ---
시스템 자원 현황 페이지 오픈 |  | CPU, 메모리 사용량 등의 정보 실시간 그래프로 표시
시간 경과 관찰 |  | 그래프/차트 1~2초 단위 갱신
