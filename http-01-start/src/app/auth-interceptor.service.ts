import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";

export class AuthInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log('request on the way');
        const modifiedRequest = req.clone({ headers: req.headers.append('Auth', 'xyz') })
        return next.handle(modifiedRequest).pipe(tap(event => {
            console.log(event);
            
        }))
    }
}