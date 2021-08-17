@extends('layouts.app')


@section('content')
    @include('includes.navbar')
    <div class="container bg-white shadow wrapper">
        <div class="p-lg-5 p-2">
            <form action="{{ url('register') }}" method="POST" class="col-lg-5 mx-auto">
                @csrf
                <h2>Team Zone registration</h2>
                {{-- Error Session --}}
                @if (session()->has('error'))
                <div class="alert alert-warning font-weight-bold alert-dismissible">
                  <button class="close" data-dismiss="alert">&times;</button>
                  <p class="mb-0">{{ session()->get('error') }}</p>
                </div>
                @endif
                {{-- End of error session --}}
                <div class="form-group">
                    <label for="name">Name</label>
                    <input type="text" placeholder="Enter name"
                        class="form-control form-control-sm @error('name') border border-danger @enderror" id="name"
                        name="name" value="{{ old('name') }}">
                    @error('name')
                        <span class="text-danger small">* Name required</span>
                    @enderror
                </div>
                <div class="form-group">
                    <label for="email">E-mail</label>
                    <input type="email" id="email" name="email"
                        class="form-control form-control-sm @error('email') border border-danger @enderror"
                        placeholder="Enter E-mail" value="{{ old('email') }}">
                    <span id="email_error"></span>
                    @error('email')
                        <span class="text-danger small">* E-mail required and must be a valid email</span>
                    @enderror
                </div>
                <div class="form-group">
                    <label for="password">Password</label>
                    <input type="password" id="password" name="password" placeholder="Enter password"
                        class="form-control form-control-sm @error('password') border border-danger @enderror">
                    @error('password')
                        <ul class="small text-danger">
                            @foreach ($errors->get('password') as $passwordError)
                                <li class="">{{ $passwordError }}</li>
                            @endforeach
                        </ul>
                    @enderror
                </div>
                <div class="form-group">
                    <label for="password_confirmation">Password Confirmation</label>
                    <input type="password" id="password_confirmation" name="password_confirmation"
                        placeholder="Enter password confirmation"
                        class="form-control form-control-sm @error('password') border border-danger @enderror">

                </div>
                <div class="form-group text-center">
                    <button class="btn btn-sm btn-primary btn-block">
                        <span class="fa fa-check-circle"></span>
                        <span>Register</span>
                    </button>
                    <a href="{{ url("/") }}" class="my-2 small">
                        <span>log in instead ?</span>
                    </a>
                </div>
            </form>
        </div>
    </div>
@endsection



@section('scripts')

    <script>
        function showEmailError(err) {
            $('#email').addClass('border border-danger')
            $('#email_error').html(
                `<span class="text-danger fa fa-times-circle mx-1"></span><span class="text-danger small">${err}</span>`
            )
        }

        $(document).ready(function() {
            $('#email').change(function(e) {
                $('#email_error').html('')
                $('#email').removeClass('border border-danger')
                var val = $('#email').val();
                axios.post("{{ url('api/user/email/check') }}", {
                        email: val
                    })
                    .then(function(res) {
                        var data = res.data;
                        if (res.data.exists) {
                            showEmailError('Email Already registered')
                        }
                    }).catch(function(err) {
                        var response = err.response;
                        if (response.status === 422) {
                            showEmailError(response.data.errors.email[0])

                        }
                    })
            })

        })
    </script>

@endsection
