@extends('layouts.app')


@section('content')
  @include('includes.navbar')
  <div class="container bg-white">
    <div class="p-5 jumbotron">
      <h1>Hello,{{ auth()->user()->name }}</h1>
      <p>You don't verify your email address till now.</p>
      <p>Click verify now to activate your account</p>
      <div>
        <form action="{{ url("/email/verification-notification") }}" method="POST">
          @csrf

          <button class="btn btn-sm btn-primary">
            Verify Now
          </button>
        </form>
      </div>
      @if (session()->has('message'))
        <p class="alert alert-success my-2">
          <span class="fa fa-check-circle mx-1"></span>
          <span>{{ session()->get('message') }}</span>
        </p>
      @endif
    </div>
  </div>

@endsection
