## 목차

- [목차](#목차)
- [1. System Context](#1-system-context)
- [2. Static Perspective](#2-static-perspective)

---

## 1. System Context

<img src="./resource/system_context_diagram.png" width="500" height="300"/>

### 주요 구성 요소

**User**
- 애플리케이션을 사용하는 최종 사용자.
- 레스토랑 검색, 추천, 정보 조회와 같은 기능을 사용할 수 있다.

**Frontend**
- 사용자의 요청을 처리하고 인터페이스를 통해 데이터를 표시하는 시스템.
- 사용자의 요청에 따라 Backend 서버와 상호작용하여 필요한 데이터를 요청하거나 전송한다.

**Backend**
- Frontend에서 요청한 데이터를 처리하고, 데이터베이스와의 상호작용을 통해 필요한 정보를 제공한다.
- 주요 역할:
  - 레스토랑 데이터 처리
  - 사용자 선호도 및 방문 기록 관리
  - 추천 데이터 생성 및 제공

---

## 2. Static Perspective

<img src="./resource/component_diagram.png" width="1000"/>

### 주요 모듈

#### **Frontend**
- **기능**:
  - 사용자의 요청에 따라 Backend와 통신하고 결과를 화면에 표시.
  - 메인 페이지, 레스토랑 상세 페이지, 관심 목록, 방문 기록, 사용자 페이지, 프로필 전환, 시스템 자원 현황 등 다양한 UI를 제공.
- **하위 컴포넌트**:
  - `main page`: 검색 및 추천 레스토랑 목록을 표시.
  - `restaurant page`: 특정 레스토랑의 상세 정보를 제공.
  - `interest`: 관심 목록 레스토랑 조회 및 관리.
  - `visit history`: 사용자의 방문 기록 조회 및 관리.
  - `profile switch`: 사용자 프로필을 전환할 수 있는 기능 제공.
  - `media player`: 레스토랑 관련 미디어 콘텐츠 재생.
  - `system resource`: 시스템 자원 상태를 시각화.

#### **restaurant API**
- **기능**:
  - 특정 키워드나 조건에 따라 레스토랑 데이터를 검색 및 조회.
  - 데이터베이스와 상호작용하여 레스토랑 목록, 상세 정보 등을 제공.

- **인터페이스**:
  - `search`: 특정 키워드나 조건에 따라 레스토랑 데이터를 검색 및 반환.
  - `get_info`: 특정 레스토랑의 상세 정보를 반환.

#### **recommendation API**
- **기능**:
  - 사용자 선호도 기반 맞춤형 레스토랑 추천 데이터 생성.
  - 키워드 기반 레스토랑 추천 데이터 생성.
- **인터페이스**:
  - `get_recommendation`: 사용자 선호도 기반 맞춤형 레스토랑 추천 데이터를 반환.
  - `get_keyword_recommendation`: 키워드 기반 레스토랑 추천 데이터를 반환.

#### **media API**
- **기능**:
  - 레스토랑 관련 미디어 콘텐츠(사진, 동영상 등)의 스트리밍 제공.
  - 미디어 콘텐츠 재생 기록 저장.
- **인터페이스**:
  - `stream`: 미디어 콘텐츠 스트리밍 제공.
  - `save_playback_history`: 미디어 콘텐츠 재생 기록 저장.
  - `get_playback_history`: 미디어 콘텐츠 재생 기록 조회.

#### **user data API**
- **기능**:
  - 사용자 정보 및 데이터를 관리.
  - 관심 목록, 방문 기록 등 사용자와 관련된 데이터를 반환.
- **인터페이스**:
  - `get_profile_list` : 사용자 프로필 목록을 반환.
  - `get_user_info`: 사용자 정보를 반환.
  - `get_interest_list`: 사용자의 관심 목록을 반환.
  - `get_visit_history`: 사용자의 방문 기록을 반환.

#### **login API**
- **기능**:
  - 사용자 로그인 및 인증.
  - 사용자 세션을 관리하여 데이터 접근 제어.
- **인터페이스**:
  - `login`: 사용자 로그인 및 인증.

#### **database**
- **기능**:
  - MongoDB를 사용하여 레스토랑 정보, 사용자 정보, 방문 기록, 선호도 데이터 등을 저장.

## 3. Dynamic Perspective

### 3.1 State Diagram
<img src="./images/state.png" width="600" height="400"/>

-   로그인 이전 상태에서 **Login** 을 통해 로그인 이후 상태로 변경할 수 있다. 이 때, 서버에서 **Login** 에서 입력받은 id값이 등록되어 있어야 로그인 상태로 변경될 수 있다. 등록되지 않은 id인 경우 로그인에 실패한다.
-   로그인 이후 상태에서는 **Logout**을 통해 로그인 이전 상태가 된다.

### 3.2 Sequence Diagram


<img src="./images/rr_system.png" width="500" height="700"/>

사용자의 요청에 따라 서버와 통신을 필요로하는 경우 수행되는 동작이다. 
-   main_thread는 가장먼저 콜백함수를 등록하는 **init**을 수행한다.
-   main_thread에서 **send_to_server**를 통해 server에 필요한 정보를 요청하고, **g_cond_wait**을 통해 콜백함수에서 풀어주기를 기다린다.
-   **receive_from_server**를 통해 recv_thread가 server로부터 오는 데이터를  수신하고, **recv_response**를 호출한다.
-   **recv_response**는 수신한 데이터를 파싱하고, 필요한 정보를 콜백함수에 전달한다.
-   **callback_function**은 모듈 별 해야할 동작을 수행하고 **g_cond_signal**을 통해 main_thread에 걸려있던 **g_cond_wait**을 해제한다.
-   recv_thread는 다시 server로부터 오는 데이터 수신을 기다리고, main_thread는 이후 동작을 수행한다.


<!-->
### 3.3 Module

본 문서에서 모듈은 사용자에게 제공되는 기능을 수행하는 단위를 의미한다. 해당 문서에서는 총 8개의 모듈을 포함한다. 이는 [3.1 State Diagram](#31-state-diagram) 의 function과 일대일 대응된다. 
모든 기능은 사용자의 요청으로부터 시작한다.


1. Register
-  사용자 정보를 입력받아 서버로부터 ID를 발급받는 기능
-  사용자 정보의 포맷을 검증하고, 서버로 요청한다.
-  서버로부터 수신한 정보는 recv_thread에서 수행되는 callback 함수에서 사용자에게 출력한다.

<img src="./images/register_process.png" width="600" height="450"/>

2. Print userinfo
-  서버에 저장된 사용자의 정보를 요청 및 수신하고, 출력하는 기능
-  서버로부터 수신한 정보는 recv_thread에서 수행되는 callback 함수에서 사용자에게 출력한다.  

<img src="./images/request_userinfo.png" width="600" height="350"/>

3. Print recent list
-  서버에 저장된 사용자의 최근 재생 목록을 요청 및 수신하고, 출력하는 기능
-  서버로부터 수신한 정보는 recv_thread에서 수행되는 callback 함수에서 사용자에게 출력한다.  


<img src="./images/activity_print_recentlist.png" width="600" height="450"/>

4. Print popular list
-  서버에 저장된 모든 사용자의 데이터를 바탕으로 산출한 인기 목록을 요청 및 수신하고, 출력하는 기능
-  성별을 옵션으로 입력받아 인기 목록을 요청한다.
-  서버로부터 수신한 정보는 recv_thread에서 수행되는 callback 함수에서 사용자에게 출력한다.  


<img src="./images/activity_print_popularlist.png" width="600" height="450"/>


5. Login
-  ID를 입력받아 서버에 등록되어 있는 ID인 경우 로그인 이후 상태로 변경하는 기능
-  ID가 양의 정수인지 검증하고, 서버로 요청한다. 

<img src="./images/activity_login.png" width="600" height="450"/>


6. Playback media
-  재생을 원하는 미디어 이름을 입력받고, 미디어를 재생하는 기능
-  미디어가 재생가능한지 확인 후, 서버로 마지막 재생 위치를 요청한다.
-  미디어가 종료될 시, 서버로 마지막 재생 위치 갱신을 요청한다.

<img src="./images/activity_playback.png" width="600" height="450"/>



7. Print media info
-  원하는 미디어의 메타데이터를 출력하는 기능
-  서버와의 통신을 필요로하지 않으므로 main_thread에서만 사용자와 상호작용한다.

8. Logout
-  로그인 이후 상태에서 로그인 이전 상태로 변경한다.

-->