export default {
  calendars: "v1/calendars",
  planners: "v1/planners",
  events: "v1/events",
  profile: {
    picture: "v1/user/picture",
    removePicture: "v1/user/picture-remove",
    updateProfile: 'v1/user/update-profile',
    changePassword : 'v1/user/change-password'
  },
  friends: "v1/user/friends",
  friendsSearch: "v1/search/friends",
  friendRequests: "v1/user/friend-requests",
  permission: {
    planners: 'v1/user/permissions/planners',
    massAssign: 'v1/user/permissions/mass-assign'
  },
  invite: 'v1/user/invite'
};
