<table>
  <tbody>
      <tr>
          <td>
              <h1 style="margin-bottom: 0;">Hello,There</h1>
          </td>
      </tr>
      <tr>
          <td>
              <a href="{{ url('') }}">{{ url('') }}</a>
          </td>
      </tr>
      <tr>
          <td>
              <hr>
          </td>
      </tr>
      <tr>
          <td>
              <p>
                  <b>{{ $user->name }}</b> would like to invite you to our planner management,
                  that found in the following url : <a href="{{ url('') }}">{{ url('') }}</a>
                </p>
          </td>
      </tr>
  </tbody>
  <tfoot>
      <tr>
          <td>For further information please visit <a href="{{ url('') }}">TeamZone</a></td>
      </tr>
      <tr>
        <p>TeamZone<sup>&copy;</sup> {{ date('20y-m-d') }}</p>
      </tr>
  </tfoot>
</table>
