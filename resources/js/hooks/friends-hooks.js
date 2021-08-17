import { useSelector } from "react-redux";

const CAN_READ_ONLY = ["READ_ONLY"];

const CAN_CREATE = ["CREATE"];

const CAN_MODIFY_ONLY = ["MODIFY"];

const CAN_MODIFY_DELETE = ["MODIFY", "DELETE", "RESTORE DELETED"];

const DEFAULT_PERMISSION = {
  read: false,
  create: false,
  modify: false,
  delete: false,
  restore: false,
};

export const getPlannerPermission = (planner) => {
  let permissionsStore = useSelector((state) => state.PermissionsStore);
  let userPermissions = permissionsStore.userPermissions;
  let user = useSelector(state => state.UserStore.data)

  return {
    /**
     * get the give planner permission
     *
     * @param {int} id
     */
    getPermission: (id) => {
      let matchedPlanners = userPermissions.filter(
        (permission) => permission.planner.id === parseInt(id)
      );
      let permission = DEFAULT_PERMISSION;
      if (matchedPlanners.length) {
        let planner = matchedPlanners[0];

        if (CAN_READ_ONLY.includes(planner.permission)) {
          permission = {
            ...permission,
            read: true,
          };
        } else if (CAN_CREATE.includes(planner.permission)) {
          permission = {
            ...permission,
            read: true,
            create: true,
          };
        } else if (CAN_MODIFY_ONLY.includes(planner.permission)) {
          permission = {
            ...permission,
            read: true,
            create: true,
            modify: true,
          };
        } else if (CAN_MODIFY_DELETE.includes(planner.permission)) {
          permission = {
            read: true,
            create: true,
            modify: true,
            delete: true,
            restore: true,
          };
        }
      }

      return permission;

    },
  };
};
