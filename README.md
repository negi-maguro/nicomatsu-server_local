# nicomatsu-server
nicomatsu-serverはnode.jsで動作する、Web会議での双方向コミュニケーションを目的としたコメント・アンケートツールです。


# Feature
### 1. 参加者画面で入力したコメント・スタンプが発表者の画面に流れる！ 
<img src="https://user-images.githubusercontent.com/70475693/131212479-e626a86e-152b-45e4-af38-c6c769a0ddf1.png" alt="スマホ画面" width="20%">  <img src="https://user-images.githubusercontent.com/70475693/131212323-a7b10eb9-0f5d-42d9-83f0-8d5e854fc585.gif" alt="コメントとスタンプ" width="60%">

* 発表やWebミーティングの際に、画面共有元で[nicomatsu-display](https://github.com/mochiokun/nicomatsu-display)を利用することで、資料上にコメントやスタンプを重ねて画面共有が可能となる。画面の共有はWeb会議システム(Teams,Zoom,Webexなど)にて全画面を選択して共有を行う。
* 参加者側のコメント・質問やリアクション（スタンプ）が画面上に流れるので、発表者側で拾うことができ、一体感のある双方向のコミュニケーションを実現する。


### 2. 参加者画面から投票でリアルタイムにアンケート結果を表示する！
<img src="https://user-images.githubusercontent.com/70475693/131212327-12d04927-3ba1-45f2-8f4a-56b12c7c5d92.gif" alt="アンケート" width="60%">

* ブラウザ側にデータを保持する作りであるため、ページを開く前に投票されたものは無効となる。
* 質問と選択肢を事前に入力して保存(Saveボタン)することが可能。保存済みの質問を選択することで選択肢が読み込まれる。
* 回答データを保存したい場合もSaveボタンで保存可能。保存した結果は質問を選択してLoadボタンを押すことで再描画される。
* 保存せずに画面更新やResetボタン、Loadボタンを押した場合や、誤って上書き保存した場合に戻すことはできないため注意されたい。
* タブを閉じると保存データは削除される。

# DEMO
[nicomatsu-demo](https://nicomatsu.herokuapp.com)
※ InternetExprorerでは動きません
1. 任意のルーム名でログイン
2. コメント投稿用の画面が開きます。
3. デスクトップアプリで同じルームに入ると、投稿したコメントやアンケート結果が見れます。
4. ブラウザで確認したい場合は、下記のURLとなる。(GoogleChrome推奨、InternetExprorer不可)
   * コントローラ(参加者向け): `https://nicomatsu.herokuapp.com/controller/[room]`
   * コメント表示ページ: `https://nicomatsu.herokuapp.com/display/[room]`
   * アンケートページ: `https://nicomatsu.herokuapp.com/survey/[room]`

5. 透明なウィンドウでコメントを重ねるデスクトップアプリ(nicomatsu-display)
[windows10用インストーラ](https://github.com/mochiokun/nicomatsu-display/archive/refs/tags/installer_win10_v2.0.0.zip)
接続先のHerokuアプリ名に`nicomatsu`と入れることでデモ用サーバに接続します。

# Requirement
node.jsとnpmのインストールが必要。
* node.js
* npm

インストール方法について、参考までに以下のサイトを紹介する。
* [Qiita:Node.js・npmのインストール方法 @mk185](https://qiita.com/mk185/items/7ad004bf202f400daea1)
* [Qiita:[Node.js] npm の proxy と registry 設定 @LightSpeedC](https://qiita.com/LightSpeedC/items/b273735e909bd381bcf1)

# Usage with Heroku
HerokuのWebDyno上にデプロイして動作可能な状態としている。

無償のFreeDynoでも100人前後の社内ミーティングで使用実績があるので、多少のイベントなら大丈夫と思います。

1. GitHubで本リポジトリをフォークするか、ソースをダウンロードして自身のプライベートリポジトリへ登録する。
2. [Heroku](https://id.heroku.com/login)よりSign Upを行う。
3. Create New App より新規アプリを作成する。このときApp Nameに入力したものがURLおよびnicomatsu-displayの接続先となる。
4. Deployタブを開き Deployment method で GitHub を選択する
5. GitHubと接続させてフォークしたリポジトリを選択する
6. masterブランチを選択してデプロイする
7. OpenAppよりアクセスする


# Usage without Heroku
Heroku以外のサーバで動作させたい場合は、下記を実行。

1. NodeJsをインストールする (version >= 12)
2. このアプリをクローンorソースをダウンロードする
3. クローンしたフォルダ内で `npm ci` を実行する
4. 同フォルダ内で `npm start` を実行する
5. http(s)://YOURIP:2525　へアクセスする　※本アプリはSSL対応していないため、LBなどでSSLアクセラレーションを実施されたい。

# Tips
## コメント表示（発表者用）ページへの認証機能追加
投稿されるコメントは発表者用ページへアクセスすることでインターネット上からも参照可能になっている。
情報が第三者に漏洩するリスクを軽減したい場合、ユーザID/PWを求めるBasic認証をONとすることが可能である。


1. `routes/display.js`ファイルにて認証のON/OFF、ユーザID・パスワードを設定する。
``` javascript
// コメント表示（発表者）ページ表示に認証を行うか設定
const authFlg = true;　// trueに設定すると認証を実施。認証しない場合はfalseを設定

// 認証ユーザIDとパスワードを設定
const user = 'user';
const password = 'password';
```
2. コメント表示ページへのアクセス時に認証が表示されるので、ユーザIDとパスワードを入力する。
※ ソースコードに認証情報を記載しているため、パブリックなリポジトリにしないよう注意すること。(Githubでフォークした場合はパブリックリポジトリとなるため、ソースをDLしてプライベートリポジトリにpushすることを推奨する)

## スタンプの追加
pngファイルをスタンプとして追加可能である。
pngファイルは背景透過、サイズ200px×200px程度までを推奨する。（背景有りや大きなサイズの場合、資料に重ねた際に非常に見辛いため）

1. 通常スタンプ`public/images/stamps` 、季節スタンプ`public/images/seasons` フォルダにpngファイルを追加する。
    * どちらのフォルダに追加するかでコントローラの表示位置が異なる
    * ファイル名の昇順に表示されるので、必要に応じてファイル名の先頭に数値などを付与して順番を指定すること
2. 追加したブランチをHerokuにデプロイする。

# Author
Takuya Komatsubara @mochiokun

# License
nicomatsu-server is under [MIT license](https://en.wikipedia.org/wiki/MIT_License).

