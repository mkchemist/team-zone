
export const plannerPermission = (permissions, planner, user) => {

  let can_update = false;
  let can_delete = false;

  /**
   * if current user is the owner
   *
   * @return {Object}
   */
  if(planner.user.id === user.id) {
    return {
      can_update:true,
      can_delete: true
    }
  }

  /**
   * if current user has a permission
   */
  permissions.map(permission => {
    if(permission.planner.id === planner.id) {
      /* if(permission.permission.toLowerCase() === "modify") {
        can_update = true;
      } else if(permission.permission.toLowerCase() === "delete") {
        can_delete = true;
        can_update = true;
      } */
      switch (permission.permission.toLowerCase()) {
        case 'modify':
          can_update = true;
          break;
        case 'delete' :
          can_update = true;
          can_delete = true;
          break;
        default :
          return
      }

    }
  })

  return {
    can_update,
    can_delete
  }
}


export const eventsPermissions = (calender, permissions, user) => {
  let can_update = false;


}
