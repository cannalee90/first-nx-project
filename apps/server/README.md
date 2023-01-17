### API 설명

- BASE_URL_LOCAL = http://localhost:8080/api
- BASE_URL_PROED = https://lobster-app-ttl6o.ondigitalocean.app/api

- GET foundation-version 모든 파운데이션 버젼 정보를 리턴
- GET foundation-version/:version 하나의 파운데이션 정보를 리턴
- POST foundation-version { version: string, status: boolean } 파운데이션 정보를 업데이트하거나 새로운 파운데이션 정보를 리턴
- POST foundation-version/deploy - github action을 트리거해서 파운데이션을 업데이트하고 배포까지(미정)

- GET foundation-detail/:foundation_id 파운데이션 디테일{ spacing } 정보를 리턴
- POST foundation-detail/ { version: string, typography: {[key: string]: string} , color: {[key: string]: string}, spacing: {[key: string]: string} }

