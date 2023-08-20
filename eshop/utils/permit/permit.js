export function permit(neededPermission, userPermission) {
  // example:
  // needed permissions array of object:     
  // case 1:
  // [{resource: "user", actions: ["create"]}];
  // user permissions array of object:
  // [{resource: "user", actions: ["create"]}]
  // return true
  // case 2:
  // [{resource: "product", actions: ["create"]}];
  // user permissions array of object:
  // [{resource: "product", actions: ["update"]}]
  // return false
  // case 3:
  // [{resource: "product", actions: ["create"]}];
  // user permissions array of object:
  // [{resource: "product", actions: ["create", "update"]}]
  // return true
  console.log("neededPermission", neededPermission);
  console.log("userPermission", userPermission);
  if (Object.keys(userPermission).length === 0) {console.log(false); return false};
  if (Object.keys(neededPermission).length === 0) {console.log(true); return true};
  neededPermission.forEach(needed => {
    const user = userPermission.find(user => user.resource === needed.resource);
    if (!user) {
      console.log(false);
      return false}
    else if (!needed.actions.every(action => user.actions.includes(action))) {
      console.log(false);
      return false
    };
    console.log(true);
    return true;
  })


}