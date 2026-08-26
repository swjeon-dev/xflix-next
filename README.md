# Xflix

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Vercel-success)](https://xflix-next-ten.vercel.app/) [![previous Live](https://img.shields.io/badge/Previous-GitHub%20Pages-lightgrey)](https://swjeon-dev.github.io/Xflix--sw/) [![Figma](https://img.shields.io/badge/Figma-Design-orange)](https://www.figma.com/make/6gAd7XAT3ErQOj8xVDt8Cq/Movie-Detail-Page-Design?p=f&t=zVHKCNqmHkqM0ES3-0)

TMDB API 기반 영화·TV 탐색 서비스입니다.  
Vite SPA를 **Next.js App Router**로 옮기며, 검색·무한 스크롤·모달 같은 흐름을 라이브러리에 크게 기대지 않고 직접 맞춘 프로젝트입니다.

## 화면

![Home](src/shared/assets/screens/home-thumbnail.jpg)

![Search](src/shared/assets/screens/search-result-thumbnail.jpg)

![Detail](src/shared/assets/screens/movie-detail-thumbnail.jpg)

## Work

- **조회** — TMDB 요청을 `shared/api`에 모으고, 목록·상세·검색은 커스텀 훅에서 `loading` / `error` / `data`를 직접 다룹니다.
- **Next 경계** — 탐색·검색·모달은 클라이언트. 이메일 로그인·가입·비밀번호 변경은 Server Action입니다.
- **proxy** — Next 16에서 `middleware.ts` / `middleware()`가 `proxy.ts` / `proxy()`로 바뀌었습니다. Next가 파일 이름으로 찾아 요청 전에 실행하므로, 루트에 `middleware.ts`가 없어도 `src/proxy.ts`면 됩니다. `matcher: ['/mypage']`일 때만 돌고, Supabase 세션을 갱신한 뒤 비로그인이면 `/login-required`로 보냅니다.
- **무한 스크롤** — `IntersectionObserver`로 홈 캐러셀(가로)과 목록·검색(세로)을 공통 훅으로 처리합니다.
- **검색** — 헤더 모달 → `/search?query=` 로 상태를 URL에 두고, 영화 / TV 탭을 나눕니다.
- **모달** — Portal, body scroll lock, ESC 종료를 검색·예고편·모바일 메뉴에 같이 적용합니다.

## 코드 구조

FSD를 규모에 맞게 쓰고, Next `src/app`은 라우트·layout만 담당합니다.

```text
src/
  proxy.ts          /mypage 가드 · 세션 갱신 (Next 16 proxy)
  app/              Next 라우트 · layout · metadata
  application/      Providers, 세션
  widgets/          header, home, carousel, genre, movie-detail, tv-detail
  features/         search, trailer, episodes, auth
  entities/         movie, tv, media, person
  shared/           api, ui, config
```

```text
src/app → widgets → features → entities → shared
```

## 기능

- 홈 영화 / TV 섹션, 장르 목록·필터
- 영화 / TV 상세, 예고편·에피소드 모달
- 검색 모달·결과 무한 스크롤
- 로그인·마이페이지

## 스택

Next.js (App Router) · TypeScript · Tailwind CSS · TMDB API · Supabase (Auth)

## 실행

```bash
npm install
npm run dev
```
