<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <link rel="stylesheet" href="{{ asset('css/app.css') }}">
    <link rel="stylesheet" href="{{ asset('css/shared.css') }}">
    <link rel="stylesheet" href="{{ asset('libs/fontawesome-free-5.15.3-web/css/all.min.css') }}">
    <style>
        @font-face {
            font-family: 'Poppins';
            src: url('{{ asset('fonts/Poppins/Poppins-Regular.ttf') }}')
        }

        body {
            font-family: 'Poppins';
        }

    </style>
    @yield('styles')
    <title>{{ env('APP_NAME') }}</title>
</head>

<body>
    @yield('content')

    <script src="{{ asset('js/app.js') }}"></script>
    @yield('scripts')
</body>

</html>
