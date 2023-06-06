# Dockerfile

FROM node:14

# 必要なパッケージのインストール
RUN apt-get update && apt-get install -y openssl

# SSL証明書のコピー
COPY server.key /etc/ssl/private/server.key
COPY server.crt /etc/ssl/certs/server.crt

# Next.jsプロジェクトのファイルをコピー
COPY . /usr/app
WORKDIR /usr/app/src

# 依存関係のインストール
RUN yarn install

# ビルド
RUN yarn build

# ポートのエクスポート
EXPOSE 3000

# サーバーの起動
CMD ["yarn", "start"]