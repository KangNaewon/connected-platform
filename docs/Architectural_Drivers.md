# Michelin in TV 요구사항 명세서

## 목차
[1. 문서 설명(Document Description)](#1-문서-설명document-description)

  [1.1. 목적(Purpose)](#11-목적purpose)
  
  [1.2. 범위(Scope)](#12-범위scope)
  
  [1.3. 용어 및 정의(Terminologies and Definitions)](#13-용어-및-정의terminologies-and-definitions)
  
[2. 시스템 컨텍스트(System Context)](#2-시스템-컨텍스트system-context)

  [2.1. 시스템 인터페이스(System Interface)](#21-시스템-인터페이스-system-interface)
  
  [2.2. 시스템 컨텍스트(System Context)](#22-시스템-컨텍스트-system-context)
  
  [2.3. 사용자 인터페이스(User Interface)](#23-사용자-인터페이스-user-interface)
  
[3. 상세 요구사항(Specific Requirements)](#3-상세-요구사항-specific-requirements)

  [3.1. 기능 요구사항(Functional Requirements)](#31-기능-요구사항functional-requirements)
    
  [3.2. 품질 요구사항(Quality Attributes)](#32-품질-요구사항quality-attributes)
  
  [3.3. 제약 사항(Constraint Requirements)](#33-제약-사항constraint-requirements)


## 1. 문서 설명(Document Description)

### 1.1. 목적(Purpose)
본 문서는 LG전자의 무선 TV 제품인 「LG 스탠바이미」에서 작동하는 Media Web Application인 「Michelin in TV」의 소프트웨어 아키텍처 문서이다. 문서의 목적은 「Michelin in TV」의 개발 목적, 범위, 개발 환경 등을 기술하며, 시스템의 기능 및 비기능 요구사항, 구조 및 데이터베이스 스키마를 기술하는 것이다.

### 1.2. 범위(Scope)
본 문서의 범위는 제약사항(Constraints), 기능 요구사항(Functional Requirements), 품질 요구사항(Quality Attributes)을 포함하며, 이를 설명하기 위한 시스템 컨텍스트(System Context)와 용어 정의를 포함한다.

### 1.3. 용어 및 정의(Terminologies and Definitions)
- **HLS** : HTTP Live Streaming의 약자로, HTTP 기반의 스트리밍 프로토콜이다. 미디어 파일을 여러 개의 작은 파일로 분할하여 전송하고, 클라이언트는 이를 조합하여 스트리밍을 재생한다.
- **EnactJS** : LG전자에서 개발한 웹 애플리케이션 프레임워크로, ReactJS를 기반으로 하며 LG전자의 브랜드인 webOS에서 사용된다.
- **NodeJS** : Chrome V8 JavaScript 엔진으로 빌드된 JavaScript 런타임이다. 서버 사이드 플랫폼으로 확장성이 있는 네트워크 애플리케이션 개발에 사용된다.
- **ExpresJS** : Node.js를 위한 웹 프레임워크의 하나로, Node.js의 핵심 모듈인 http와 Connect 컴포넌트를 기반으로 하는 웹 프레임워크이다. 웹 어플리케이션, API 개발을 위해 설게되었다.
- **MongoDB** : 크로스 플랫폼 문서 지향 데이터베이스 시스템이다. NoSQL 데이터베이스로, JSON과 유사한 BSON 형식을 사용하여 데이터를 저장한다.

## 2. 종합 기술 (Overall Description)

### 2.1. 시스템 인터페이스 (System Interface)
- 시스템은 webOS 기반의 TV에서 동작하며, 사용자는 터치 인터페이스 및 리모컨을 통해 시스템을 제어할 수 있다.

### 2.2. 시스템 컨텍스트 (System Context)
![system context diagram](../resource/system_context_diagram.png)

**User**
- 클라이언트 프로그램을 사용하는 사용자를 의미한다. 사용자는 클라이언트 프로그램에서 제공하는 인터페이스를 통해 지원하는 기능을 사용할 수 있다.

**Client**
- 클라이언트 프로그램의 주 기능은 사용자에게 레스토랑 검색, 추천, 정보 조회 등의 기능을 제공하는 것이다. 클라이언트 프로그램은 사용자의 요청을 처리하고, 서버와의 통신을 통해 필요한 데이터를 요청하거나 전송한다.

**Server**
- 서버는 클라이언트 프로그램에서 요청한 데이터를 처리하고, 데이터베이스와의 상호작용을 통해 필요한 정보를 제공한다. 서버의 주요 역할은 레스토랑 데이터 처리, 사용자 선호도 및 방문 기록 관리, 추천 데이터 생성 및 제공이다.

**WebOS**
- webOS는 실시간 시스템 자원 현황을 제공하며, 사용자는 시스템 자원 현황을 실시간으로 확인할 수 있다.

**Database**
- 데이터베이스는 MongoDB를 사용하여 구축되며, 레스토랑 정보, 사용자 정보, 방문 기록, 선호도 데이터 등을 저장한다.

**외부 데이터 소스**
- 외부 데이터 소스는 레스토랑 정보의 업데이트, 미디어 콘텐츠의 제공 등을 위한 데이터를 제공한다.

### 2.3. 사용자 인터페이스 (User Interface)
- 넷플릭스, 유튜브 등 미디어 콘텐츠 어플리케이션의 UI/UX를 참고하여, 사용자가 레스토랑 정보를 검색하고, 추천받고, 관심 목록을 관리할 수 있는 UI를 제공한다.

## 3. 상세 요구사항 (Specific Requirements)

### 3.1. 기능 요구사항(Functional Requirements)

#### 3.1.1 Backend Server

##### 3.1.1.1. 레스토랑 검색
ID  | Requirement   | API ID | Test Case ID
--- | --- | --- | ---
B-FR01-1 | 시스템은 입력된 검색어를 부분문자열을 가지는 레스토랑 정보를 데이터베이스에서 조회하여 반환해야 한다. <br><br> 반환되는 값에는 다음 요소들이 포함되어야 한다.<br><ul> <li>이름</li><li>미슐랭 스타</li><li>위치</li><li>장르</li><li>가격대</li><li>대표 사진</li>| - | -  
B-FR01-2 | 검색 결과가 없을 경우, 입력된 결과가 없음을 나타내는 메세지를 반환해야 한다. | - | -  

##### 3.1.1.2. 키워드 기반 레스토랑 추천
ID  | Requirement   | API ID | Test Case ID
--- | --- | --- | ---
B-FR02-1 | 시스템은 사전에 지정된 키워드의 목록 중 5개의 키워드를 랜덤으로 선택한 후, 선택된 키워드의 목록과 각 키워드에 해당하는 레스토랑의 정보를 데이터베이스에서 조회하여 반환해야 한다. 반환되는 값은 B-FR01-1과 동일한 요소들을 포함한다. | - | -

##### 3.1.1.3. 사용자 선호도 기반 레스토랑 추천
ID  | Requirement   | API ID | Test Case ID
--- | --- | --- | ---
B-FR03-1 | 시스템은 사용자의 방문 기록과 선호도를 기반으로 맞춤형 레스토랑 목록을 생성하여 반환해야 한다. 반환되는 값은 B-FR01-1과 동일한 요소들을 포함한다. | - | -

##### 3.1.1.4. 레스토랑 정보 조회
ID  | Requirement   | API ID | Test Case ID
--- | --- | --- | ---
B-FR04-1 | 시스템은 특정 레스토랑의 상세 정보를 데이터베이스에서 조회하여 반환해야 한다. <br><br> 반환되는 값에는 포함되는 요소들은 다음과 같다.<br><ul> <li>이름</li><li>미슐랭 스타</li><li>위치</li><li>장르</li><li>가격대</li><li>대표 사진</li><li>영업 시간</li><li>전화번호</li><li>웹사이트</li><li>주요 메뉴</li><li>리뷰</li><li>미디어 콘텐츠</li>| - | - 

##### 3.1.1.5. 미디어 콘텐츠 재생
ID  | Requirement   | API ID | Test Case ID
--- | --- | --- | ---
B-FR05-1 | 시스템은 사용자가 선택한 미디어 콘텐츠를 스트리밍 형태로 제공해야 한다. | - | -
B-FR05-2 | 시스템은 미디어 콘텐츠 재생 기록을 저장해야 한다. | - | -  

##### 3.1.1.6. 관심 목록 관리
ID  | Requirement   | API ID | Test Case ID
--- | --- | --- | ---
B-FR06-1 | 시스템은 사용자가 관심 목록에 추가하거나 삭제 요청한 데이터를 업데이트하여 데이터베이스에 저장해야 한다. | - | -  

##### 3.1.1.7. 방문 기록 및 선호도 관리
ID  | Requirement   | API ID | Test Case ID
--- | --- | --- | ---
B-FR07-1 | 시스템은 사용자의 방문 기록 데이터를 저장 및 업데이트해야 한다. | - | -  
B-FR07-2 | 시스템은 사용자의 선호도 데이터를 저장 및 업데이트해야 한다. | - | -  

##### 3.1.1.8. 개인 데이터 불러오기
ID  | Requirement   | API ID | Test Case ID
--- | --- | --- | ---
B-FR08-1 | 시스템은 사용자 프로필 정보의 목록을 반환해야 한다. | - | -
B-FR08-2 | 시스템은 사용자의 관심 목록, 방문 기록, 선호도 데이터를 반환해야 한다. 각 관심 목록과 방문 기록은 레스토랑 정보의 목록으로 구성되며, 각 레스토랑의 정보는 B-FR01-1과 동일한 요소들을 포함한다. | - | -

#### 3.1.1.9. 로그인 및 인증
ID  | Requirement   | API ID | Test Case ID
--- | --- | --- | ---
B-FR09-1 | 시스템은 사용자의 로그인 요청을 받아 사용자의 정보를 인증해야 한다. | - | -

---

#### 3.1.2 Frontend Server

##### 3.1.2.1. 레스토랑 검색
ID  | Requirement   | Test Case ID
--- | --- | ---
F-FR01-1 | 사용자는 검색 인터페이스에 검색어를 입력할 수 있어야 한다. | -  
F-FR01-2 | 사용자가 입력한 검색어를 실시간으로 서버에 전달하여 검색 결과를 받아와야 하며, 검색 결과의 목록이 화면에 표시되어야 한다. | -
F-FR01-3 | 검색 결과가 없을 경우, "결과가 없습니다"라는 메시지를 표시해야 한다. | -  

##### 3.1.2.2. 키워드 기반 레스토랑 추천
ID  | Requirement   | Test Case ID
--- | --- | ---
F-FR02-1 | 추천된 레스토랑 목록이 사진, 이름, 위치 등의 정보를 포함하여 스크롤 가능한 카드 형태로 화면에 표시되어야 한다. | -  

##### 3.1.2.3. 사용자 선호도 기반 레스토랑 추천
ID  | Requirement   | Test Case ID
--- | --- | ---
F-FR03-1 | 추천된 맞춤형 레스토랑 목록이 스크롤 가능한 카드 형식으로 표시되어야 한다. | -  

##### 3.1.2.4. 레스토랑 정보 조회
ID  | Requirement   | Test Case ID
--- | --- | ---
F-FR04-1 | 사용자가 선택한 레스토랑의 상세 정보가 화면에 표시되어야 한다. | -  

##### 3.1.2.5. 미디어 콘텐츠 재생
ID  | Requirement   | Test Case ID
--- | --- | ---
F-FR05-1 | 사용자는 미디어 콘텐츠를 선택하여 재생할 수 있어야 한다. | -  
F-FR05-2 | 재생 중 일시정지, 재개, 중지 기능이 제공되어야 한다. | -  

##### 3.1.2.6. 관심 목록 관리
ID  | Requirement   | Test Case ID
--- | --- | ---
F-FR06-1 | 사용자가 관심 목록을 확인할 수 있어야 한다. | -  
F-FR06-2 | 사용자는 관심 목록에 레스토랑을 추가하거나 삭제할 수 있어야 한다. | -

##### 3.1.2.7. 방문 기록 및 선호도 관리
ID  | Requirement   | Test Case ID
--- | --- | ---
F-FR07-1 | 사용자가 방문 기록과 선호도를 확인할 수 있어야 한다. | -  
F-FR07-2 | 사용자는 방문 기록과 선호도를 확인하고 수정할 수 있어야 한다. | -

##### 3.1.2.8. 로그인 및 회원가입
ID  | Requirement   | Test Case ID
--- | --- | ---
F-FR08-1 | 사용자가 최초 접속 시 로그인 또는 회원가입을 할 수 있어야 한다. | -
F-FR08-2 | 최초 접속 시 로그인 또는 회원가입을 하지 않은 사용자는 서비스를 이용할 수 없어야 한다. | -
F-FR08-3 | 최초 로그인 이후 로그인 정보가 저장되어 다음 접속 시 자동 로그인이 되어야 한다. | -

##### 3.1.2.9. 개인 데이터 불러오기
ID  | Requirement   | Test Case ID
--- | --- | ---
F-FR08-1 | 로그인 후 개인 데이터가 화면에 표시되어야 한다. | -  

##### 3.1.2.10. 사용자 프로필 전환
ID  | Requirement   | Test Case ID
--- | --- | ---
F-FR09-1 | 프로필 전환 시 사용자 정보와 맞춤형 추천 콘텐츠가 업데이트되어 화면에 표시되어야 한다. | -

##### 3.1.2.11. 실시간 시스템 자원 현황 시각화
ID  | Requirement   | Test Case ID
--- | --- | ---
F-FR10-1 | 사용자가 시스템 자원 현황을 실시간으로 확인할 수 있어야 한다. | -

---

### 3.2. 품질 요구사항 (Quality Attribute)
ID | Requirement
--- | ---
QA01 | 시스템은 사용자의 요청에 대한 응답 시간이 1초 이내여야 한다.
QA02 | backend 서버는 동시에 최소 5명의 사용자 요청을 처리할 수 있어야 한다.

### 3.3. 제약 사항 (Constraint Requirement)
ID | Requirement
--- | ---
CR01 | 시스템은 webOS 기반의 TV에서 동작해야 한다.
CR02 | 시스템은 EnactJS 프레임워크를 사용하여 개발되어야 한다.
CR03 | backend 서버는 NodeJS와 ExpressJS를 사용하여 개발되어야 한다.
CR04 | 데이터베이스는 MongoDB를 사용하여 구축되어야 한다.