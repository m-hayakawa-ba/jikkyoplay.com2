<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

  {{-- head情報 --}}
  <head>

    <title>{{ config('app.APP_NAME') }}</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <meta name="keywords" content="ゲーム,ゲーム実況,実況プレイ,part1,まとめ,実況プレイ動画,You Tube,ニコニコ動画">

    {{-- jsの読み込み --}}
    <script src="/js/user.js" defer></script>
    <script src="https://kit.fontawesome.com/bd92f5a39e.js" crossorigin="anonymous" defer></script>

    {{-- cssの読み込み --}}
    <link rel="stylesheet" href="/css/user.css"> 

  </head>

  {{-- body情報 --}}
  <body>
    
    {{-- 初回読み込み時のcssの動作を防止 --}}
    <script>console.log("css");</script>

    {{-- html --}}
    <div id="app">
    </div>

  </body>

</html>