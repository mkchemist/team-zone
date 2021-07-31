@extends('layouts.app')


@section('content')
    <div class="bg-primary shadow">
        <nav class="navbar navbar-expand-lg navbar-dark container">
            <a href="{{ url('/') }}" class="navbar-brand font-weight-bold">TeamZone</a>
            <button class="navbar-toggler" data-toggle="collapse" data-target="#home_navbar">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="navbar-collapse collapse" id="home_navbar">
                <ul class="navbar-nav ml-auto">
                    <li class="nav-item active">
                        <a href="{{ url('/') }}" class="nav-link">Home</a>
                    </li>
                    <li class="nav-item active">
                        <a href="{{ url('/help') }}" class="nav-link">Help</a>
                    </li>
                </ul>
            </div>
        </nav>
    </div>
    <div class="container bg-white vh-100 shadow">
        <div class="row mx-auto">
            <div class="col-lg-6">

            </div>
            <div class="col-lg-6 p-3">
                <form action="{{ url('login') }}" method="POST" class="col-lg-10 mx-auto p-5">
                    @csrf

                    <h1 class="text-primary">TeamZone login</h1>

                    {{-- Error Session --}}
                    @if (session()->has('error'))
                    <div class="alert alert-warning font-weight-bold alert-dismissible">
                      <button class="close" data-dismiss="alert">&times;</button>
                      <p class="mb-0">{{ session()->get('error') }}</p>
                    </div>
                    @endif
                    {{-- End of error session --}}

                    {{-- Email section --}}
                    <div class="form-group">
                        <label for="email" class="text-primary font-weight-bold">E-mail</label>
                        <input type="email" id="email" name="email" placeholder="Enter user email"
                            class="form-control form-control-sm @error('email') border border-danger @enderror">
                        @error('email')
                            <span class="text-danger small">* {{ $errors->get('email')[0] }}</span>
                        @enderror`
                    </div>
                    {{-- End of email section --}}
                    {{-- Password section --}}
                    <div class="form-group">
                        <label for="password" class="text-primary font-weight-bold">Password</label>
                        <input type="password" id="password" name="password" placeholder="Enter user password"
                            class="form-control form-control-sm @error('password') border border-danger @enderror">
                        @error('password')
                            <span class="text-danger small">* {{ $errors->get('password')[0] }}</span>
                        @enderror
                    </div>
                    {{-- End of password section --}}
                    {{-- Controller section --}}
                    <div class="form-group">
                        <button class="btn btn-sm btn-primary btn-block">
                            <span>Login</span>
                        </button>
                    </div>
                    {{-- End of controller section --}}
                    {{-- Helpe section --}}
                    {{-- End of help section --}}
                </form>
            </div>
        </div>
    </div>
@endsection
