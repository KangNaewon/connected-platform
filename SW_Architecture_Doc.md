# Michelin in TV
## 목차
- [1. Introduction](#1-introduction)
    - [1.1. 문서 목적 (Purpose)](#11-문서-목적-document-purpose)
    - [1.2. 시스템 범위 (Scope)](#12-시스템-범위-system-scope)
        - [1.2.1. 개발 개요 (Development Overview)](#121-개발-개요-development-overview)
        - [1.2.2. 주요 기능 (Main Features)](#122-주요-기능-main-features)
    - [1.3. 개발 환경 (Development Environment)](#14-개발-환경-development-environment)
- [2. Architectural Drivers](#2-architectural-drivers)
    - [2.1. 유스케이스 다이어그램 (Use Case Diagram)](#21-유스케이스-다이어그램-use-case-diagram)
    - [2.2. 기능 요구사항 (Functional Requirements)](#22-기능-요구사항-functional-requirements)
    - [2.3. 비기능 요구사항 (Non-Functional Requirements)](#23-비기능-요구사항-non-functional-requirements)
- [3. Architectural Overview](#3-arthitectural-overview)
    - [3.1. 시스템 구조도 (System Context)](#31-시스템-구조도-system-context)
    - [3.2. Static Perspective](#32-static-perspective)
    - [3.2. Dynamic Perspective](#32-dynamic-perspective)
- [4. Data Design](#4-data-design)
    - [4.1. Database Schema](#41-database-schema)

## 1. Introduction
### 1.1. 문서 목적 (Document Purpose)
<div style='text-align: justify;'>
본 문서는 LG전자의 무선 TV 제품인 「LG 스탠바이미」에서 작동하는 Media Web Application 개발 과제인 「Michelin in TV」의 소프트웨어 아키텍처 문서이다. 본 문서는 「Michelin in TV」의 개발 목적, 범위, 개발 환경 등을 기술하며, 시스템의 기능 및 비기능 요구사항, 시스템의 구조 및 데이터베이스 스키마 등을 명확히 하여 문서화 하는 것을 목적으로 한다.
</div>

### 1.2. 시스템 범위 (System Scope)
#### 1.2.1. 개발 개요 (Development Overview)
<div style='text-align: justify;'>
본 과제에서는 LG전자의 무선 TV 제품인 「LG 스탠바이미」에서 작동하는 Media Web Application 개발 과제로서 「Michelin in TV」의 개발을 수행한다. 최근 넷플릭스에서 방영한 요리 경연 프로그램인 「흑백요리사」의 인기로 미쉐린 가이드에서 선정한 레스토랑에 대한 관심이 높아지고 있다. 이러한 트렌드를 반영하여, 「Michelin in TV」는 사용자들이 손쉽게 미쉐린 가이드에 등재된 레스토랑의 정보를 탐색할 수 있도록 개발한다.
</div>

#### 1.2.2. 주요 기능 (Main Features)
<div style='text-align: justify;'>

본 시스템에서 제공하는 주요 기능은 다음과 같다:

1. 🌟 **미쉐린 가이드 레스토랑 정보 제공**<br><br>
2. 🔍 **키워드 기반 레스토랑 추천**<br><br>
3. 📝 **키워드 중심 레스토랑 검색**<br><br>
4. 🎥 **레스토랑 관련 영상 컨텐츠 제공**<br><br>
5. 📌 **찜목록 및 방문 기록 관리 기능**<br><br>
6. 🎯 **사용자 데이터 기반 맞춤형 추천**<br><br>
7. 👤 **사용자 프로필 및 다중 사용자 지원**<br><br>
8. 🔒 **로그인을 통한 데이터 동기화**<br><br>

상세한 기능 요구사항은 [2. Architectural Drivers](#2-architectural-drivers)에서 확인할 수 있다.

</div>

### 1.3. 개발 환경 (Development Environment)

## 2. Architectural Drivers
### 2.1. 유스케이스 다이어그램 (Use Case Diagram)
### 2.2. 기능 요구사항 (Functional Requirements)
### 2.3. 비기능 요구사항 (Non-Functional Requirements)

## 3. Arthitectural Overview
### 3.1. 시스템 구조도 (System Context)
### 3.2. Static Perspective
### 3.2. Dynamic Perspective

## 4. Data Design
### 4.1. Database Schema