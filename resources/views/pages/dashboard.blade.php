@extends('layouts.app')


@section('styles')
    <link rel="stylesheet" href="{{ asset('css/user/user.css') }}">
@endsection


@section('content')
    @php
    $user = auth()->user();
    @endphp
    <input type="hidden" id="user" value="{{ $user }}">
    <input type="hidden" id="api_token" value="{{ $user->api_token }}">
    <input type="hidden" id="csrf_token" value="{{ csrf_token() }}">
    {{-- <input type="hidden" id="app_base_api_url" value="{{ env('APP_BASE_API_URL') }}"> --}}
    <input type="hidden" id="app_base_api_url" value="{{ url("/")."/api" }}">
    <input type="hidden" id="app_base_uri" value="{{ env('APP_BASE_URI') }}">
    <div id="app"></div>
@endsection


@section('scripts')
    <script src="{{ asset('js/user/index.js') }}"></script>
@endsection
