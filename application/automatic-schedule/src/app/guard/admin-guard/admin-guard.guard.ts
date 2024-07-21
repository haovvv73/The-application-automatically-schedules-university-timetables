import { CanActivateFn, Router } from '@angular/router';
import { TokenServiceService } from '../../services/session/token-service/token-service.service';
import { inject } from '@angular/core';
import { AuthServiceService } from '../../services/http/auth-service/auth-service.service';

export const adminGuardGuard: CanActivateFn = async (route, state) => {

  // inject 
  const router = inject(Router)
  const tokenService = inject(TokenServiceService)
  const authService = inject(AuthServiceService)

  // check token in local
  if( !tokenService.getToken() ){
    router.navigate(['app/auth/login'])
    return false
  }

  // check token is expired
  const token = tokenService.getToken()
  console.log(token);
  
  await authService.checkAdmin({token}).subscribe({
    next: (result : any) =>{
      if(result.data){
        // valid token
        console.log('admin success',result.data)
        router.navigate(['app/admin']);
      }else{
        // expired token
        // tokenService.removeToken()
        // tokenService.removeUser()
        router.navigate(['app/user']);
      }
    },
    error :(error : any)=>{
      // console.error('Error validating token:', error);
      // tokenService.removeToken()
      // tokenService.removeUser()
      router.navigate(['app/user']);
    }
  })

  return true
};
