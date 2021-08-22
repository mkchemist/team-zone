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
    <link rel="icon" href="{{ asset('images/app/teamzone.svg') }}">
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

<body class="bg-light">
    @yield('content')
    <footer class="bg-primary text-light p-2 pt-5">
        <div class="text-center">
            <h2>
                <span class="far fa-calendar-check"></span>
                <span>TeamZone</span>
            </h2>
            <p>Make planning fun</p>
            <div>
                <ul class="nav justify-content-center">
                    <li class="nav-item">
                        <a href="" class="nav-link text-light">
                            <span>Home</span>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a href="" class="nav-link text-light">
                            <span>Help</span>
                        </a>
                    </li>
                    @guest
                        <li class="nav-item">
                            <a href="" class="nav-link text-light">
                                <span>Login</span>
                            </a>
                        </li>
                        <li class="nav-item">
                            <a href="" class="nav-link text-light">
                                <span>Register</span>
                            </a>
                        </li>
                    @endguest
                    @auth
                        <li class="nav-item">
                            <a href="{{ url('dashboard/calendars') }}" class="nav-link text-light">
                                <span>Calendars</span>
                            </a>
                        </li>
                        <li class="nav-item">
                            <a href="{{ url('dashboard/planners') }}" class="nav-link text-light">
                                <span>Planners</span>
                            </a>
                        </li>
                        <li class="nav-item">
                            <a href="{{ url('dashboard/profile') }}" class="nav-link text-light">
                                <span>Profile</span>
                            </a>
                        </li>
                        <li class="nav-item">
                            <a href="{{ url('logout') }}" class="nav-link text-light">
                                <span>Logout</span>
                            </a>
                        </li>
                    @endauth

                </ul>
                <p class="small">
                    Copyrights
                    <span>&copy;</span> {{ date('20y') }}
                    <span class="font-weight-bold far fa-calendar-check"></span>
                    <span class="font-weight-bold">TeamZone</span>.
                    All Rights Reserved
                </p>
            </div>
        </div>
    </footer>
    <script src="{{ asset('js/app.js') }}"></script>
    @yield('scripts')
</body>

</html>
