import {storeToRefs} from "pinia";
import {useAuth} from "@/stores/auth";



// Защита роут;
export default function (to: any, from: any, next: any) {
  const store = useAuth();
  const {isToken} = storeToRefs(store);
  if (isToken.value) {
    next()
  } else {
    next('/login')
  }
}

