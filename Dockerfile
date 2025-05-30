# Build Stage
FROM node:20-alpine AS builder

WORKDIR /app

# 패키지 파일 복사 및 설치
COPY package*.json ./
RUN npm install

# 소스 코드 복사 및 빌드
COPY . .
RUN npm run build

# Production Stage
FROM node:20-alpine

WORKDIR /app

# 빌드된 파일과 필요한 파일들만 복사
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY package*.json ./

# 환경 변수 설정
ENV NODE_ENV=production

# 포트 설정
EXPOSE 3000

# 애플리케이션 실행
CMD ["npm", "run", "start:prod"] 