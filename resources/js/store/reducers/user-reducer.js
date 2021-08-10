let user = JSON.parse(document.getElementById("user").value)
const InitialUserState = {
  data: user,
  token: user.api_token
}

export default function (state=InitialUserState, action) {
  return state;
}
