let navigationRef;

export function navigateTo(name, route) {
  navigationRef.navigate(name, route);
}

export function setNavigator(ref) {
  navigationRef = ref;
}
